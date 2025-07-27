import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../api-services/auth/auth.service';
import { AUTH_ROUTE } from '../constants/routes/routes.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  if(authService.isLoggedIn()){
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.getToken()}`)
    })

    return next(clonedReq).pipe(
      tap({
        error: (err:any) => {
          if(err.status == 401){
            authService.logoutUser();
            // TODO: trigger a toast/message
            router.navigateByUrl(`/${AUTH_ROUTE.login}`);
          }else if(err.status == 403){
            // TODO: trigger a toast/message
          }
        }
      })
    );
  }

  return next(req);
};
