export class SpotifySessionExpiredError extends Error {
  constructor() {
    super("Spotify session expired");
    this.name = "SpotifySessionExpiredError";
  }
}

export class SpotifyRateLimitError extends Error {
  retryAfterSeconds: number;
  constructor(retryAfterSeconds: number) {
    super(`Spotify rate limit hit, retry after ${retryAfterSeconds}s`);
    this.name = "SpotifyRateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class SpotifyApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "SpotifyApiError";
    this.status = status;
  }
}