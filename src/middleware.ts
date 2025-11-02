import { withAuth } from "next-auth/middleware";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

const onlyAdmin: string[] = ["/admin"];
const onlyUser: string[] = ["/game", "/game/new"];

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const { pathname } = req.nextUrl;
  if (!onlyAdmin.includes(pathname) && !onlyUser.includes(pathname)) {
    return NextResponse.next();
  }
  if (!token) {
    signIn();
    return NextResponse.error();
  }
  if ((token.role == "ADMIN") || (token.role == "USER" && onlyUser.includes(pathname))) {
    return NextResponse.next();
  }
  return NextResponse.rewrite(new URL("/404", req.url));
});

export const config = {
  matcher: ["/admin", "/game", "/game/new", "/game/[id]"],
};
