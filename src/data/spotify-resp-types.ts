export type TimeRange = "short_term" | "medium_term" | "long_term";

export type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifyUserProfile = {
  id: string;
  display_name: string | null;
  email?: string;
  images?: SpotifyImage[];
  external_urls: { spotify: string };
};

export type SpotifyArtist = {
  id: string;
  name: string;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
  external_urls: { spotify: string };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  album: {
    name: string;
    images: SpotifyImage[];
  };
  artists: { id: string; name: string }[];
  external_urls: { spotify: string };
};

export type SpotifyPlayHistoryItem = {
  track: SpotifyTrack;
  played_at: string;
};