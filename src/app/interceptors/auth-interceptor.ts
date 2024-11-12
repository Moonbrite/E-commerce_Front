import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = window.localStorage.getItem("token");
  let authReq = req.clone();


  if (token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    if (expiry * 1000 > Date.now()) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      localStorage.removeItem("token");
    }
  }


  return next(authReq);
};
