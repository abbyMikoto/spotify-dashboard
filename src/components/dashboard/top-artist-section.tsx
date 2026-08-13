import { SpotifyArtist } from "@/data/spotify-resp-types";
import TopArtistCarousel from "./top-artist-carousel";

export default function TopArtistsSection({ artists }: { artists: SpotifyArtist[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>

          <h2 className="text-2xl font-semibold tracking-tight">
            Top {artists.length} Artists
          </h2>
        </div>

        <span className="text-sm text-muted-foreground">
          Last 6 months
        </span>
      </div>

      <TopArtistCarousel artists={artists} />
    </section>
  );
}