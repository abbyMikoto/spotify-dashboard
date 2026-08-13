# Spotify Stats Dashboard

A Next.js dashboard that logs in with your Spotify account and shows your top artists, top tracks, recently played tracks, and listening activity.

## Features

- Spotify login via OAuth (PKCE)
- Top artists and top tracks, switchable by time range (last 4 weeks, 6 months, all time)
- Recently played tracks and artists
- Estimated listening time and a listening activity chart

## Prerequisites

- Node.js 18.18+ (Next.js 16 requirement)
- A Spotify account
- A Spotify Developer app (free to create)

## 1. Create a Spotify app

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and log in.
2. Click **Create app**.
3. Fill in a name/description (anything works).
4. Under **Redirect URIs**, add:
   ```
   http://127.0.0.1:3000/api/auth/callback
   ```
5. Save the app, then open **Settings** to find your **Client ID** and **Client Secret**.

## 2. Configure environment variables

Copy the example file (or create `.env.local` in the project root) with:

```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/auth/callback
SESSION_SECRET=a_long_random_string
```

- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — from the Spotify app you created above.
- `SPOTIFY_REDIRECT_URI` — must exactly match the redirect URI registered in the Spotify dashboard.
- `SESSION_SECRET` — any long random string, used to sign the session cookie. You can generate one with:
  ```bash
  openssl rand -hex 32
  ```

`.env.local` is already git-ignored, so your credentials won't be committed.

## 3. Install dependencies

```bash
npm install
```

## 4. Run the app

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser (use `127.0.0.1`, not `localhost`, so it matches the redirect URI you registered).

## 5. Log in

1. Click **Log in with Spotify** on the home page.
2. Approve the requested permissions (reading your top artists/tracks, recently played, and basic profile info).
3. You'll be redirected to `/dashboard`, which shows your stats.

Use the time range controls on the dashboard to switch between short-term, medium-term, and long-term top artists/tracks.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the app in development mode |
| `npm run build` | Build the app for production |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |

## Notes

- All Spotify API calls are made server-side; your access/refresh tokens are never exposed to the browser.
- If you see an authentication error, double-check that `SPOTIFY_REDIRECT_URI` matches the Redirect URI configured in your Spotify Developer Dashboard exactly (including protocol and trailing slashes).
