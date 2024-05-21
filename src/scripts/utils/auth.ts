
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode'; 
interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}

export const isAuthenticated = (token : any) : boolean =>{
    if (token) {
      return true;
    }
    return false;
}   
export const isAuthenticatedAsAdmin = (token : any) : boolean =>{
    if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        if (decoded.admin){
            return true
        }
        else  return false;
    }
    return false;
}
