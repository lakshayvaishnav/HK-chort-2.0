import { NextRequest, NextResponse } from "next/server";

let requestCount = 0;
export function middleware(req: NextRequest) {
  requestCount++;
  console.log(requestCount);
  const res = NextResponse.next();
  console.log("request count is : - ", requestCount);
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
