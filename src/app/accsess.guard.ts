import { inject } from "@angular/core"
import { TalkService } from "./talk-service.service"
import { Router, CanActivateFn, UrlTree } from "@angular/router"
import { map, Observable } from "rxjs";

export const canActivateAuth: CanActivateFn = (): 
  boolean | UrlTree | Observable<boolean | UrlTree> => {
    const talkService = inject(TalkService);
    const router = inject(Router);
    
    return talkService.isAuth.pipe(
      map(isAuthenticated => isAuthenticated ? true : router.createUrlTree(['/signIn']))
    );
};