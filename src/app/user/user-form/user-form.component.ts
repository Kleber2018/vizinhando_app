import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../../shared/model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public userLogado: any;

  constructor(
      private userService: UserService,
      private router: Router,
  ) {
    this.userLogado = sessionStorage.getItem('userEquipe2')
        ? JSON.parse(sessionStorage.getItem('userEquipe2'))
        : null;

    if (this.userLogado) {
      console.log('logado', this.userLogado);
    } else {
      console.log('usuário não logado')
        // this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
