import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { CookieService } from "ngx-cookie-service";
import { catchError, switchMap, throwError } from "rxjs";

let isrefreshing: boolean = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const cookieService = inject(CookieService);
    
    const token = authService.token || cookieService.get('token');
    
    if (!token) {
        return next(req);
    }
    
    if(isrefreshing){
        return refreshAndProceed(authService, req, next)
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return next(addToken(req, token)).pipe(
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
        if(!isrefreshing){
            isrefreshing = true
            return authService.refreshAuthtoken().pipe(
                switchMap(res => {
                    isrefreshing = false
                    return next(addToken(req, res.access_token))
                })
            )
        }
    return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    })
}