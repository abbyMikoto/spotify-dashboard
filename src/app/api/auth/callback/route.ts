// src/app/api/spotify/callback/route.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const basic = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri:
          "http://127.0.0.1:3000/api/auth/callback",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    return Response.json(data, { status: response.status });
  }

  return Response.json({
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  });
}



// {
//   "refreshToken": "AQD8E-MJECq4oMZBaSMhg-W5mRyCZBiCvnVl3VccwCTfQpcSnYhJ8RfV-WISmxEJTwkbzN9kve2Z481TE38R77tBaKNkQZXRZlHwG1V3_mt0SNYB-PhfAATn5r1NgLNARN0",
//   "accessToken": "BQBxwSHIiQI2h4GijiPrFATW6DMkRogrfKy-oT8s-e82Qyg332YOV9CPXsDzomTFuypnwKmCnOSBww3GFv0FQDGvU_HaQML3qY9MwnXjLl7xbNKckBaF0kWE00TIlY2ImEfQHAT6MSnPgJ-Q6raL6-OlY8-5Hv4ocBeL0uWVIa6PaViJCudl7VG4k4aU3xOdGDTOVWQ-sK7WDvYMArPfcfbhhqZA1ElHq_vLQvAF",
//   "expiresIn": 3600
// }