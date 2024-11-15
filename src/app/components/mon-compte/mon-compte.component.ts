import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user";
import {User} from "../../models/user";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Order} from "../../models/order";
import {OrderDetailsComponentComponent} from "../order-details-component/order-details-component.component";

@Component({
  selector: 'app-mon-compte',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    CurrencyPipe,
    NgForOf,
    OrderDetailsComponentComponent
  ],
  templateUrl: './mon-compte.component.html',
  styleUrl: './mon-compte.component.scss'
})
export class MonCompteComponent implements OnInit{


  @ViewChild(OrderDetailsComponentComponent) orderDetailsModal?: OrderDetailsComponentComponent ;


  constructor(
    private userService: UserService
  ) {

  }

  user:User = new User();

  selectedOrder?: Order;

  ngOnInit(): void {

    this.userService.findUserByEmail(this.userService.getEmailToken()).subscribe({
      next:  data => {this.user = data;},
      error: err => {console.log(err)}
    })

  }

  showOrderDetails(order: Order) {
    this.selectedOrder = order;

  }







}
