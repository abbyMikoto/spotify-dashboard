import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";

export default function ListeningTimeEstimateCard({
  recentlyPlayed,
}: {
  recentlyPlayed: SpotifyPlayHistoryItem[];
}) {
  const totalMs = recentlyPlayed.reduce((sum, item) => sum + item.track.duration_ms, 0);
  const totalHours = totalMs / 1000 / 60 / 60;
  const totalMins = totalMs / 1000 / 60;
  const totalSecs = totalMs / 1000;

  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle>Estimated listening time</CardTitle>
        <CardDescription>
          Based on your last {recentlyPlayed.length} plays - not a historical total (Spotify
          doesn&apos;t expose one live)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{totalHours.toFixed(1)} hrs</p>
        <p className="text-2xl text-muted font-bold">{totalMins.toFixed(1)} mins</p>
        <p className="text-2xl text-muted font-bold">{totalSecs.toFixed(1)} secs</p>
      </CardContent>
    </Card>
  );
}
