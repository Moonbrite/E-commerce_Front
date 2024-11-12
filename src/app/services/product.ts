import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {environnement} from "../environement/environement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,) {

  }

  apiUrl: string = environnement.apiUrl+"products";


  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl)
  }

  getOne(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl +"/" + id)
  }



}
