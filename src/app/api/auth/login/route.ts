export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: "user-top-read",
    redirect_uri:
      "http://127.0.0.1:3000/api/auth/callback",
  });

  return Response.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}