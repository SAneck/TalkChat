import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { CookieService } from "ngx-cookie-service";
import { catchError, switchMap, throwError } from "rxjs";

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
    
    return next(authReq).pipe(
        catchError(error => {
            if(error.status === 403) {
                return refreshAndProceed(authService, req, next)
            }

            return throwError(error)
        })
    )
}
const refreshAndProceed = (
    authService: AuthService, 
    req: HttpRequest<any>, 
    next: HttpHandlerFn) => {
    return authService.refreshAuthtoken().pipe(
        switchMap()
    )
}
