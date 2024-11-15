import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Order} from "../../models/order";
import {CurrencyPipe, NgForOf} from "@angular/common";


@Component({
  selector: 'app-order-details-component',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './order-details-component.component.html',
  styleUrl: './order-details-component.component.scss'
})
export class OrderDetailsComponentComponent {

  @Input() order?: Order;


}
