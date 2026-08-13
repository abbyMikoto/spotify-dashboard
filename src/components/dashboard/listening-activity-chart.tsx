"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EmptyState from "./empty-state";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";

export default function ListeningActivityChart({ items }: { items: SpotifyPlayHistoryItem[] }) {
  const hourCounts = Array.from({ length: 24 }, (_, hour) => ({ hour, plays: 0 }));

  for (const item of items) {
    const hour = new Date(item.played_at).getHours();
    hourCounts[hour].plays += 1;
  }

  const data = hourCounts.map((entry) => ({
    label: `${entry.hour}:00`,
    plays: entry.plays,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listening Activity by Hour</CardTitle>
        <CardDescription>Based on your last {items.length} plays, by hour of day</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <EmptyState message="No recent listening activity found." />
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" interval={2} tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} width={30} />
                <Tooltip />
                <Bar dataKey="plays" fill="var(--color-chart-2)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
