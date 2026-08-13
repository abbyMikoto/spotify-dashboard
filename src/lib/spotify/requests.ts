import { spotifyFetch } from "./client";
import type {
  SpotifyArtist,
  SpotifyPlayHistoryItem,
  SpotifyTrack,
  SpotifyUserProfile,
  TimeRange,
} from "./types";

export async function getUserProfile(accessToken: string): Promise<SpotifyUserProfile> {
  return spotifyFetch<SpotifyUserProfile>("/me", accessToken);
}

export async function getTopArtists(
  accessToken: string,
  timeRange: TimeRange,
  limit = 20
): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<{ items: SpotifyArtist[] }>(
    `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
    accessToken
  );
  return data.items;
}

export async function getTopTracks(
  accessToken: string,
  timeRange: TimeRange,
  limit = 20
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<{ items: SpotifyTrack[] }>(
    `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    accessToken
  );
  return data.items;
}

export async function getRecentlyPlayed(
  accessToken: string,
  limit = 50
): Promise<SpotifyPlayHistoryItem[]> {
  const data = await spotifyFetch<{ items: SpotifyPlayHistoryItem[] }>(
    `/me/player/recently-played?limit=${limit}`,
    accessToken
  );
  return data.items;
}
