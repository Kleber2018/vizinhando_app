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

import { Usuario } from 'src/app/shared/model/usuario.model';
import { EsqueciSenhaDialogComponent } from './esqueci-senha-dialog/esqueci-senha-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  public formLogin: FormGroup;


  constructor(
    private authenticationService: AuthenticationService,
    // private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    public dialog: MatDialog
  ) {
    const usuarioSession: Usuario = sessionStorage.getItem('usuario')
    ? JSON.parse(sessionStorage.getItem('usuario'))
    : null;


    if (usuarioSession) {
      this.router.navigate(['/user']);
    }
   }

  ngOnInit(): void {
    this.buildFormLogin();
  }

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }

  private buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      eMail: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]]
    });
  }

  private getUsuarioByEMail(eMail: string): void {

    console.log('buscando usuario')
    // this.usuarioService
    //   .getUsuarioByEMail(eMail.toLowerCase())
    //   .pipe(takeUntil(this.end))
    //   .subscribe(
    //     (response: Usuario[]) => {
    //       localStorage.setItem('usuario', JSON.stringify(response[0]));
    //       sessionStorage.setItem('usuario', JSON.stringify(response[0]));
    //       this.router.navigate(['/solicitacao']);
    //     },
    //     (error: string) => {
    //       console.error('tt1', error);
    //       this.logout();
    //     }
    //   );
  }

  private login(eMail: string, password: string): void {
    this.authenticationService.login(eMail.toLowerCase(), password)

  }

  // private login(eMail: string, password: string): void {
  //   this.authenticationService
  //     .login(eMail.toLowerCase(), password)
  //     .then(
  //       response => {
  //         this.getUsuarioByEMail(eMail.toLowerCase());
  //       }
  //     ).catch(error => {
  //         // this.formLogin.get('eMail').setValue('');
  //         this.formLogin.get('password').setValue('');
  //       }
  //     )
  //   ;
  // }

  public submitFormLogin(): void {

    if (this.formLogin.valid) {
      console.log('submetendo')
      this.login(
        this.formLogin.get('eMail').value,
        this.formLogin.get('password').value
      );
    }
  }

  async esqueciMinhaSenha(){
    const dialogRefRedefinicao = this.dialog.open(EsqueciSenhaDialogComponent, {
      minWidth: 301,
      // minWidth: 400,
      data: this.formLogin.value.eMail
    });
    var retornoRedefinicao =  await dialogRefRedefinicao.afterClosed().toPromise()
    if(retornoRedefinicao == 'enviado'){
      const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
        data: {descricao:"Verifique sua caixa de e-mail o link de redefinição da senha"}
      });
      dialogRefAlert.afterClosed().toPromise()
    } else {
      const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
        data: {descricao:"E-mail não encontrado"}
      });
      dialogRefAlert.afterClosed().toPromise()
    }
  }

  public togglePasswordVisibility(input_password: MatInput): void {
    input_password.type = input_password.type === 'text' ? 'password' : 'text';
  }

  public comeBack(): void {
    this.location.back();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    }
}
