import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("loggedIn")?.value === "true"
  const pathname = request.nextUrl.pathname

  const protectedRoutes = [
    "/dashboard/ceo",
    "/dashboard/counsellor",
    "/dashboard/hr"  // ✅ added this line
  ]

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
