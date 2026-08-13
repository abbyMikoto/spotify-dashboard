import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Button asChild size="lg">
      <a href="/dashboard">Log in with Spotify</a>
    </Button>
  );
}