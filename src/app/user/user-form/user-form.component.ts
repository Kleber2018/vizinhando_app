import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../../shared/model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public userLogado: any;
  public formUser: FormGroup;

  public user = {
    name: '' ,
    email: '' ,
    zip_code: '' ,
    latitude: -25.0945 ,
    longitude: -50.1633 ,
    city: '' ,
    neighborhood: '' ,
    street: '',
    number: 0,
    complement: '' ,
    phone: ''
  }

  constructor(
      private userService: UserService,
      private  authenticationService:  AuthenticationService,
      private router: Router,
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute
  ) {
    this.userLogado = sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    if (this.userLogado) {
      console.log('sessionStorage User', this.userLogado);
      setTimeout(() => {
            this.userService.buscarUser().then(userRetorno => {
              console.log('Retornou /me', userRetorno);
              this.construtorFormUser(userRetorno);
            }).catch(error => {
                  if (error.error){
                    console.log('Retornou Erro:',error.error);
                  } else {
                    console.log('Retornou Erro:',error);
                  }
                }
            )
          },
          1500);
    } else {
      console.log('Novo Usuário');
      this.construtorFormUser(this.user);
    }
  }

  ngOnInit(): void {
  }


  private construtorFormUser(construtorUser: any): void {
    if(construtorUser.user){
      this.user = construtorUser.user;
    } else {
      this.user = construtorUser;
    }
    // console.log('construtor Form User', construtorUser.user);
    this.formUser = this.formBuilder.group({
      name: this.user.name ,
      email: [this.user.email, [ Validators.required, Validators.email ]] ,
      password: ['', [ Validators.required]],
      zip_code: [this.user.zip_code, [ Validators.required]] ,
      latitude: this.user.latitude,
      longitude: this.user.longitude,
      city: [this.user.city, [ Validators.required]] ,
      neighborhood: [this.user.neighborhood, [ Validators.required]] ,
      street: [this.user.street, [ Validators.required]],
      number: [this.user.number, [ Validators.required]],
      complement: this.user.complement,
      phone: [this.user.phone, [ Validators.required]]
    })
  }

  submitFormUser(){
    console.log(this.formUser.value)
    if(this.formUser.valid){
      this.userService.criarUser(this.formUser.value).then(r => {
        console.log('Salvo com sucesso user:', r);
        // this.router.navigate(['/user']);
      }).catch(error => {
            console.log('RECUSADO:',error.error.error)
          }
      )
    }
  }

  public togglePasswordVisibility(input_password: MatInput): void {
    input_password.type = input_password.type === 'text' ? 'password' : 'text';
  }

  Logout(){
    this.authenticationService.logout();
  }
}
