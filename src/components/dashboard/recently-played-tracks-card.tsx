import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";

export default function RecentlyPlayedTracksCard({
  recentlyPlayed,
}: {
  recentlyPlayed: SpotifyPlayHistoryItem[];
}) {
  const totalMs = recentlyPlayed.reduce((sum, item) => sum + item.track.duration_ms, 0);
  const totalHours = totalMs / 1000 / 60 / 60;

  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle>Recently Played Tracks</CardTitle>
        <CardDescription>
          Note that Spotify does not expose full history, 50 is the maximum return.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{recentlyPlayed.length} tracks</p>
      </CardContent>
    </Card>
  );
}
