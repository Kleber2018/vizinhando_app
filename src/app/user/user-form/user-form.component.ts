import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../../shared/model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public userLogado: any;
  public formUser: FormGroup;

  public user = {
    nome: "Kleber Santos" ,
    email: "klebers@alunos.utfpr.edu.br" ,
    senha: "1234",
    cep: "1234" ,
    coordenada: "12" ,
    cidade: "Ponta Grossa" ,
    bairro: "Jd Carvalho" ,
    rua: "São Jorde" ,
    numero: "24" ,
    complemento: "" ,
    telefone: "42 9 99999999" ,
    status: "1" ,
    privilegios: "adm"
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
      console.log('logado', this.userLogado);
      const retorno = this.userService.buscarUser().then(r => {
        console.log('retornado com sucesso', r);
      }).catch(error => {
            console.log('RECUSADO:',error.error)
          }
      )
    } else {
      console.log('usuário não logado')
        // this.router.navigate(['/login']);
    }

    console.log('activated rout', this.activatedRoute.snapshot.params)

    if(this.activatedRoute.snapshot.params.id){
      console.log('buscar dados do usuário');
    }
    this.construtorFormUser(this.user);


  }

  ngOnInit(): void {
  }


  private construtorFormUser(construtorFormUser: any): void {
    this.formUser = this.formBuilder.group({
      name: "Kleber Santos" ,
      email: "klebers@alunos.utfpr.edu.br" ,
      password: "1234",
      zip_code: "1234" ,
      latitude: 12 ,
      longitude: 12 ,
      city: "Ponta Grossa" ,
      neighborhood: "Jd Carvalho" ,
      street: "São Jorde" ,
      number: 24 ,
      complement: "" ,
      phone: "42 9 99999999"
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

  Logout(){
    this.authenticationService.logout();
  }
}
