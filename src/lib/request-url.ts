import type { NextRequest } from "next/server";

export function getRequestUrl(request: NextRequest, path: string): URL {
  const host = request.headers.get("host") ?? request.nextUrl.host;
  return new URL(path, `${request.nextUrl.protocol}//${host}`);
}
