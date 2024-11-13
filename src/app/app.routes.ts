import { Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {ContactComponent} from "./components/contact/contact.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path:'contact', component: ContactComponent},
];
