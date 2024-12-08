import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(FirebaseAuthService);
  const authToken = 'Your auth token';
  //#region 11111
  const authReq = req.clone({
    setHeaders: {
      Authroization1: `Bearer ${authToken}`,
    },
  });
  //#endregion
  console.log('auth interceptor', authReq);
  return next(req);
};
