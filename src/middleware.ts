import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, isAuthenticatedAsAdmin } from './scripts/utils/auth'

const protectedRoutes = ["/home","/adicionar/cliente","/adicionar/comissao","/adicionar/produtos","/dashboard/comissao","/dashboard/produto","/dashboard/cliente"]
const adminProtectedRoutes = ["/adm/usuarios"]

export default function middleware(req: NextRequest, res : NextResponse) {

  if (req.nextUrl.pathname == '/') {
    const response = NextResponse.rewrite(new URL('/', req.nextUrl.origin))
    response.cookies.set('token', '', { maxAge: -1 })
    return response
  }

  // console.log('Is authenticated :', isAuthenticated(req));
  // console.log('Protected routes:', protectedRoutes )
  // console.log('Requested path:', req.nextUrl.pathname);

  if (!isAuthenticated(req) && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log('Not authenticated for protected route');
    const absoluteURL = new URL("/", req.nextUrl.origin)
    console.log('Redirecting to:', absoluteURL.toString());
    return NextResponse.redirect(absoluteURL.toString())
  }
  // console.log('Is authenticated as admin:', isAuthenticatedAsAdmin(req));
  // console.log('Admin protected routes:', adminProtectedRoutes);
  // console.log('Requested path:', req.nextUrl.pathname);
  
  if (!isAuthenticatedAsAdmin(req) && adminProtectedRoutes.includes(req.nextUrl.pathname)){
      console.log('Not authenticated as admin for protected route');
      const absoluteURL  = new URL("/",req.nextUrl.origin)
      if (isAuthenticated(req)){
        absoluteURL.pathname = '/home'
      }
      console.log('Redirecting to:', absoluteURL.toString());
      return NextResponse.redirect(absoluteURL.toString())
  }
  return NextResponse.next();
}