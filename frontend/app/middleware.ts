import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect unauthenticated users
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!); // Replace with your secret
    return NextResponse.next(); // User is authenticated
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (err: any) {
    return NextResponse.redirect(new URL("/login", req.url)); // Invalid token
  }
}

export const config = {
  matcher: ["/protected/:path*"], // Protect specific routes
};
