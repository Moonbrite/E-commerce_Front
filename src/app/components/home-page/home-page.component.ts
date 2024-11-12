import { Component } from '@angular/core';
import {ProductComponent} from "../blocks/product/product.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
