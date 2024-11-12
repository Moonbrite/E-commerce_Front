import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environnement} from "../environement/environement";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "../models/user";
import {AuthResponse} from "../models/auth-response";
import {AuthRequest} from "../models/auth-request";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
    private router:Router,
  ) {

  }

  apiUrl: string = environnement.authUrl+"users"
  apiAuth:string =environnement.authUrl


  // Create a user with api
  registerUser(user: User | undefined): Observable<User>{
    return this.httpClient.post<User>(environnement.apiUrl + "register" , user).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Login a user with api
  loginUser(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.apiAuth, authRequest).pipe(
      retry(1),
      catchError(this.handleLoginError)
    );
  }

  // Log out a user on click on disconnect
  logOutUser():void {
    localStorage.clear();
    this.router.navigate(["/login"]).then(() =>localStorage.clear() )
    window.location.reload()
  }

  // Using to display if an error (all method)
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new ErrorEvent(error.error["hydra:description"]));
  }

  // Using to display if an error (for login)
  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new ErrorEvent(error.error["message"]));
  }

  //Using on Historique-commande
  getUserById(id: number | undefined): Observable<any> {
    return this.httpClient.get<User>(this.apiUrl+ "/" + id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getEmailToken():string{

    let isToken :any = window.localStorage.getItem("token")
    if (isToken) {
      let base64Url = isToken.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).sub;
    }else {
      return "Erreur Inconnu"
    }

  }

  // Return one user (All info of User)
  findUserByEmail(email:string) :Observable<User> {
    return this.httpClient.get<User>(this.apiUrl +"/email/"+ email).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
