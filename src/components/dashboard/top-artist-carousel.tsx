import { SpotifyArtist } from "@/data/spotify-resp-types";
import TopArtistCard from "./top-artist-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function TopArtistCarousel({ artists }: { artists: SpotifyArtist[] }) {

  return (
      <Carousel >
        <CarouselContent className="p-2">
          {artists.map((artist, index) => (
            <CarouselItem
                key={artist.id}
                className="basis-1/5 transition-transform duration-300 hover:scale-105"
              >
              <TopArtistCard artist={artist} index={index + 1} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  );
}
