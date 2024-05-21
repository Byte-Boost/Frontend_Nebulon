import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, isAuthenticatedAsAdmin } from './scripts/utils/auth'
import Cookies from 'js-cookie';

const protectedRoutes = ["/home","/adicionar/cliente","/adicionar/comissao","/adicionar/produtos","/dashboard/comissao","/dashboard/produto","/dashboard/cliente"]
const adminProtectedRoutes = ["/adm/usuarios","/adm/usuarios/","/adm/usuarios/criar","/adm/usuarios/editar","/adm/usuarios/deletar","/adm/usuarios/visualizar"]

export default function middleware(req: NextRequest) {
  const token = Cookies.get('token');

  if (req.nextUrl.pathname == '/exit') {
    const response = NextResponse.rewrite(new URL('/', req.nextUrl.origin))
    response.cookies.set('token', '', { maxAge: -1 })
    return response
  }
  if (!isAuthenticated(token) && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
  if (!isAuthenticatedAsAdmin(token) && adminProtectedRoutes.includes(req.nextUrl.pathname)){
    const absoluteURL = new URL("/",req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}