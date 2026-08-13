"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard failed to load:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      {/* <Alert variant="destructive" className="text-left">
        <AlertTitle>Couldn&apos;t load your dashboard</AlertTitle>
        <AlertDescription>
          This is usually Spotify rate-limiting requests or a session that needs refreshing.
        </AlertDescription>
      </Alert> */}
      <div className="flex gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Log in again</Link>
        </Button>
      </div>
    </div>
  );
}
