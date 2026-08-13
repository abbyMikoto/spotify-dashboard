import LoginButton from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex max-w-lg flex-col gap-3">
        <h1 className="text-4xl font-bold">Spotify Stats Dashboard</h1>
        <p className="text-muted-foreground">
          Log in with your Spotify account to see your top artists, top tracks, and recent
          listening activity.
        </p>
        
      </div>
      <div>
        <LoginButton />
      </div>

    </main>
  );
}