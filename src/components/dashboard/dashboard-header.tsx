import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { SpotifyUserProfile } from "@/lib/spotify/types";
import LogoutButton from "../auth/logout-btn";

export default function DashboardHeader({ profile }: { profile: SpotifyUserProfile }) {
  const imageUrl = profile.images?.[0]?.url;
  const name = profile.display_name ?? profile.id;
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{name}&apos;s Dashboard</p>
          <p className="text-sm text-muted-foreground">Logged in via Spotify</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
