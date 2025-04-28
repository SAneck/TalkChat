import { inject } from '@angular/core';
import { TalkService } from './talk.service';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

// export const canActivateAuth: CanActivateFn = () => {
//   const talkService = inject(TalkService);
//   const router = inject(Router);

//   return talkService.isAuth.pipe(
//     map(isAuth => {
//       if (isAuth) return true;
//       return router.createUrlTree(['/signIn']);
//     })
//   );
// };
