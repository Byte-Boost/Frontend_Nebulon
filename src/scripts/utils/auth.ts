import { JwtPayload,  jwtDecode } from 'jwt-decode';
import nextCookies from 'next-cookies';
import { NextRequest } from 'next/server';

interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}


export const isAuthenticated = (req: NextRequest) => {
    const headers = Object.fromEntries(req.headers.entries());
    const { token } = nextCookies({ req: { headers } });
    return token ? true : false;
}

export const isAuthenticatedAsAdmin = (req: NextRequest) => {
    const headers = Object.fromEntries(req.headers.entries());
    const { token } = nextCookies({ req: {headers} });
    if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        return decoded.admin ? true : false;
  }
  return false;
}