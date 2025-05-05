import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { CookieService } from "ngx-cookie-service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const cookieService = inject(CookieService);
    
    const token = authService.token || cookieService.get('token');
    
    if (!token) {
        return next(req);
    }
    
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return next(authReq);
};