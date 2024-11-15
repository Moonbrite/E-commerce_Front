import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Order} from "../../models/order";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-order-details-component',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './order-details-component.component.html',
  styleUrl: './order-details-component.component.scss'
})
export class OrderDetailsComponentComponent {

  @Input() order?: Order;


}
