import "server-only";
import { randomBytes, createHash } from "crypto";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

// determine what your application can access
// update this for when you want new sets of information
const SCOPES = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-private",
  "user-read-email",
].join(" ");

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// exported functions

// create random code verifier
export function generateCodeVerifier(): string {
  return base64url(randomBytes(32));
}

// create hashed code challenge from generated code verifier
export function generateCodeChallenge(verifier: string): string {
  return base64url(createHash("sha256").update(verifier).digest());
}

// create random state
export function generateState(): string {
  return base64url(randomBytes(16));
}

// use state, challenge, and env variables to create the url
// env variables MUST exist for this to work
export function buildAuthorizeUrl(state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    client_id: requireEnv("SPOTIFY_CLIENT_ID"),
    response_type: "code",
    redirect_uri: requireEnv("SPOTIFY_REDIRECT_URI"),
    state,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
};

export type ExchangeResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

function basicAuthHeader(): string {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

// get the initial token using constructed codes
export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string
): Promise<ExchangeResult> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: requireEnv("SPOTIFY_REDIRECT_URI"),
    code_verifier: codeVerifier,
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(),
    },
    body,
  });

  if (!response.ok) {
    throw new Error(
      `Spotify token exchange failed: ${response.status} ${await response.text()}`
    );
  }

  const data = (await response.json()) as SpotifyTokenResponse;

  if (!data.refresh_token) {
    throw new Error("Spotify did not return a refresh token");
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

export type RefreshResult = {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
};

// refresh an expired access token
export async function refreshAccessToken(refreshToken: string): Promise<RefreshResult> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(),
    },
    body,
  });

  if (!response.ok) {
    throw new Error(
      `Spotify token refresh failed: ${response.status} ${await response.text()}`
    );
  }

  const data = (await response.json()) as SpotifyTokenResponse;

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}
