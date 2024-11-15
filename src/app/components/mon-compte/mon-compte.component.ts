import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user";
import {User} from "../../models/user";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-mon-compte',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    CurrencyPipe,
    NgForOf,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './mon-compte.component.html',
  styleUrl: './mon-compte.component.scss'
})
export class MonCompteComponent implements OnInit{



  @ViewChild('orderDetailsDialog') orderDetailsDialog!: TemplateRef<any>;


  constructor(
    private userService: UserService
  ) {

  }

  user:User = new User();


  ngOnInit(): void {

    this.userService.findUserByEmail(this.userService.getEmailToken()).subscribe({
      next:  data => {this.user = data;},
      error: err => {console.log(err)}
    })

  }
  readonly dialog = inject(MatDialog);

  selectedOrder: any; // Variable pour stocker la commande sélectionnée

  openDialog(order: any, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.selectedOrder = order; // Stocker la commande sélectionnée
    this.dialog.open(this.orderDetailsDialog, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }








}
