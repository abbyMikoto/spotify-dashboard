
import DashboardHeader from "@/components/dashboard/dashboard-header";
import ListeningActivityChart from "@/components/dashboard/listening-activity-chart";
import ListeningTimeEstimateCard from "@/components/dashboard/listening-time-estimate-card";
import RecentlyPlayedArtistsCard from "@/components/dashboard/recently-played-artists-card";
import RecentlyPlayedTracksCard from "@/components/dashboard/recently-played-tracks-card";
import TopArtistsSection from "@/components/dashboard/top-artist-section";
import { SpotifyArtist, TimeRange } from "@/data/spotify-resp-types";
import { getAccessToken } from "@/lib/session";
import { getRecentlyPlayed, getTopArtists, getTopTracks, getUserProfile } from "@/lib/spotify/requests";

const VALID_RANGES: TimeRange[] = ["short_term", "medium_term", "long_term"];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const accessToken = await getAccessToken();
  const resolvedSearchParams = await searchParams;
  const rangeParam = Array.isArray(resolvedSearchParams.range)
    ? resolvedSearchParams.range[0]
    : resolvedSearchParams.range;
  const range: TimeRange = VALID_RANGES.includes(rangeParam as TimeRange)
    ? (rangeParam as TimeRange)
    : "medium_term";

  const [userProfile, topArtists, topTracks, recentlyPlayed] = await Promise.all([
    getUserProfile(accessToken),
    getTopArtists(accessToken, range),
    getTopTracks(accessToken, range),
    getRecentlyPlayed(accessToken),
  ]);
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-10 py-20">
      <DashboardHeader profile={userProfile} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <ListeningTimeEstimateCard recentlyPlayed={recentlyPlayed} />
        <RecentlyPlayedTracksCard recentlyPlayed={recentlyPlayed} />
        <RecentlyPlayedArtistsCard recentlyPlayed={recentlyPlayed} />
        {/* <GenreDistributionChart artists={topArtists} className="lg:col-span-2" /> */}
      </div>
      <div className="mb-6">
        <ListeningActivityChart items={recentlyPlayed} />
      </div>
      <TopArtistsSection artists={topArtists} />
    </div>
  );
}