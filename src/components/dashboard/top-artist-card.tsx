
import { SpotifyArtist } from "@/data/spotify-resp-types";
import { Card, CardContent } from "../ui/card";

export default function TopArtistCard({ artist, index }: { artist: SpotifyArtist, index: number }) {
  const image = artist.images[0]?.url; 
  return (
    <Card key={artist.id} className="gap-3">
      {image ? (
        <img src={image} alt={artist.name} className="aspect-square w-full object-cover" />
          ) : (
        <div className="aspect-square w-full bg-muted" />
      )}
      <CardContent className="flex flex-col  gap-1.5">
        <p className="text-xs text-muted-foreground">#{index}</p>
        <p className="truncate text-sm font-medium">{artist.name}</p>
      </CardContent>
    </Card>
  );
}
