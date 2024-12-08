import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const authReq=req.clone({
    setHeaders:{
      Authorization:'Bearer '
    }
   });
  return next(authReq);
};
