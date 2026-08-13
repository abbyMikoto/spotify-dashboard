import "server-only";
import { getAccessToken } from "@/lib/session";
import { SpotifyApiError, SpotifyRateLimitError, SpotifySessionExpiredError } from "./errors";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

/**
 * Fetches with the given access token. On a 401 (expired token slipped through
 * the proactive refresh in getValidAccessToken), refreshes once via
 * getValidAccessToken() and retries once before giving up.
 */
export async function spotifyFetch<T>(
  path: string,
  accessToken: string,
  retryOnAuthError = true
): Promise<T> {

  // get response using base, path, headers
  const response = await fetch(`${SPOTIFY_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  // 401 - expiration, try to refresh
  if (response.status === 401) {
    // if set to not retry, throw error
    if (!retryOnAuthError) {
      throw new SpotifySessionExpiredError();
    }

    // force refresh, if there is no session, throw error
    const refreshedToken = await getAccessToken();
    // forces retry with the refreshedToken
    return spotifyFetch<T>(path, refreshedToken, false);
  }

  // 429 rate error
  if (response.status === 429) {
    const retryAfterSeconds = Number(response.headers.get("Retry-After") ?? "1");
    throw new SpotifyRateLimitError(retryAfterSeconds);
  }

  // all other not ok errors
  if (!response.ok) {
    throw new SpotifyApiError(response.status, await response.text());
  }

  // return response as json
  return (await response.json()) as T;
}

