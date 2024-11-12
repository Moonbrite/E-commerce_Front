import {throwError} from "rxjs";

export const environnement= {
  production:false,
  authUrl:"http://localhost:8081/api/auth",
  apiUrl:"http://localhost:8081/api/",


  errorHandler(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


}
