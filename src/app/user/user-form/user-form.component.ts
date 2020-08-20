import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../../shared/model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      private router: Router,
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute
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

}
