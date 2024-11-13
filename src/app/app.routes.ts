import { Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";
import {ContactComponent} from "./components/contact/contact.component";
import {CondGenVenteComponent} from "./components/cond-gen-vente/cond-gen-vente.component";
import {MentionsLegalesComponent} from "./components/mentions-legales/mentions-legales.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  {path:'contact', component: ContactComponent},
  {path:'conditions', component: CondGenVenteComponent},
  {path:'mentions-legales', component: MentionsLegalesComponent},
];
