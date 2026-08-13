"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EmptyState from "./empty-state";
import type { SpotifyPlayHistoryItem } from "@/lib/spotify/types";

export default function ListeningActivityAreaChart({ items }: { items: SpotifyPlayHistoryItem[] }) {
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
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="label" interval={2}tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} width={30} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="plays"
                  stroke="var(--color-chart-2)"
                  fill="var(--color-chart-2)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
