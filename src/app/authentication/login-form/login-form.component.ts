import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**Angular Material.*/
import { MatInput } from '@angular/material/input';

/**Services.*/
// import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from '../authentication.service';

import { EsqueciSenhaDialogComponent } from './esqueci-senha-dialog/esqueci-senha-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import {User} from "../../shared/model/user.model";
import {UserService} from "../../user/user.service";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  public formLogin: FormGroup;
  public urlServidor: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    //construtor: executa ao carregar a página

    //buscando usuário armazenado no session storage
    const usuarioLogado: User = sessionStorage.getItem('userEquipe2')
    ? JSON.parse(sessionStorage.getItem('userEquipe2'))
    : null;

    //se existir um usuário significa que já está logado, então direciona para a tela user
    if (usuarioLogado) {
      this.router.navigate(['/user']);
    }

    this.urlServidor = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : 'https://vizinhando-backend.herokuapp.com';
   }

  //framework
  ngOnInit(): void {
    this.buildFormLogin();
  }

  //framework
  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }

  //construtor do form login
  private buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      eMail: ['klebers@alunos.utfpr.edu.br', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]],
      url: [this.urlServidor, [ Validators.required ]]
    });
  }

   //chamado pelo botão Acessar Sistema para dar continuidade no login
   public submitFormLogin(): void {
    if (this.formLogin.valid) {
      localStorage.setItem('urlServidor', JSON.stringify(this.formLogin.get('url').value));
      this.login(
        this.formLogin.get('eMail').value,
        this.formLogin.get('password').value
      );
    }
  }

  //chamado pelo submitFormLogin()
  private login(eMail: string, password: string): void {
    try {
      this.authenticationService.login(eMail.toLowerCase(), password)
        .then(r => {
          console.log('retorno login', r);
          sessionStorage.setItem('userEquipe2token', JSON.stringify(r));
          this.carregarDadosUser()
        }).catch(error => {
            console.log('senha inválida', error)
            this.formLogin.get('password').setValue('');
          }
        )
    }  catch (e) {}
  }

  carregarDadosUser(){
          this.userService.buscarUser().then(userRetorno => {
            console.log('Retornou /me', userRetorno);
            sessionStorage.setItem('userEquipe2', JSON.stringify(userRetorno));
            this.router.navigate(['/ocorrencia']);
          }).catch(error => {
                if (error.error){
                  console.log('Retornou Erro:',error.error);
                } else {
                  console.log('Retornou Erro:',error);
                }
                this.router.navigate(['/ocorrencia']);
              }
          )
  }


  // chamado pelo botão novo Usuario para direcionar para a pafina de form de usuário
  abrirFormNovoUser(){
    if(this.formLogin.value.url !== ''){
      localStorage.setItem('urlServidor', JSON.stringify(this.formLogin.value.url));
      this.router.navigate(['/user']);
    }
  }

  //para carregar a url do servidor da equipe selecionada no input do login
  selecionandoServidor(url: string){
    localStorage.setItem('urlServidor', JSON.stringify(url));
    this.urlServidor = url;
    this.buildFormLogin()
  }

  //chamado pelo botão esqueci a senha para abrir a caixa de esqueci a senha
  async esqueciMinhaSenha(){
    localStorage.setItem('urlServidor', JSON.stringify(this.formLogin.get('url').value));
    const dialogRefRedefinicao = this.dialog.open(EsqueciSenhaDialogComponent, {
      minWidth: 301,
      data: this.formLogin.value.eMail
    });
    var retornoRedefinicao =  await dialogRefRedefinicao.afterClosed().toPromise()

      const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
        data: {descricao:"Verifique sua caixa de e-mail o link de redefinição da senha"}
      });
      dialogRefAlert.afterClosed().toPromise()
  }

  // gerado pelo framework
  public togglePasswordVisibility(input_password: MatInput): void {
    input_password.type = input_password.type === 'text' ? 'password' : 'text';
  }

  //chama o a funcção logout que se encarrega de fazer o correto logout do usuário
  public logout(): void {
    this.authenticationService.logout();
  }
}
