import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {UserService} from "../../../services/user";
import {window} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService :UserService,
  ) {

  }

  isConnectesUser:any;

  ngOnInit(): void {

    setInterval(()=>{
      this.isConnectesUser = localStorage.getItem("token")
    },200)


  }



}
