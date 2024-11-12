import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn =
  (route, state) => {

    const router: Router = inject(Router);
    let token = window.localStorage.getItem("token");

    if(!token){
      router.navigate(["login"]);
      return false
    }
    return true;
  };
