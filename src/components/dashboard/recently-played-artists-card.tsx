import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SpotifyArtist, SpotifyPlayHistoryItem } from "@/data/spotify-resp-types";

export default function RecentlyPlayedArtistsCard({
    recentlyPlayed,
  }: {
    recentlyPlayed: SpotifyPlayHistoryItem[];
  }) {
  const uniqueArtistCount = Array.from(
    new Map(
      recentlyPlayed.flatMap((play) =>
        play.track.artists.map((artist) => [artist.id, artist])
      )
    ).values()
  ).length;

  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle>Recently Played Artists</CardTitle>
        <CardDescription>
          Note that Spotify does not expose full history. 50 plays is the maximum returned.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">
          {uniqueArtistCount} artists
        </p>
      </CardContent>
    </Card>
  );
}