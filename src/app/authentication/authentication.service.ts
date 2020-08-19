import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**Third party modules.*/
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly apiURL : string;

  constructor(
    // private angularFireAuth: AngularFireAuth,
    private http : HttpClient,
    private router: Router
  ) {
    this.apiURL = 'http://localhost:3333';
  }

  public login(eMail: string, password: string): boolean {
   const autenticacao = {
      "email": eMail,
        "senha": password
    }
    console.log('http', this.apiURL, autenticacao)
    this.http.post(`${this.apiURL}/session`, autenticacao)
        .subscribe(
            resultado => {
              console.log('retorno', resultado)
            },
            erro => {
              console.log('retorno', erro);
              if(erro.status == 400) {
                console.log(erro);
              }
            }
        );

    // this.router.navigate(['/user']);
    return true;
  }

  // public login(eMail: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return this.angularFireAuth.auth.signInWithEmailAndPassword(eMail, password);
  // }
  //
  public logout(): void {
    console.log('deslogar');
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  // public generateCredential(eMail: string, password: string): void {
  //   this.angularFireAuth
  //     .auth
  //     .createUserWithEmailAndPassword(eMail, password)
  //     .then(
  //       response => { console.log(response); }
  //     )
  //     .catch(
  //       error => { console.error(error); }
  //     )
  //   ;
  // }


  public redefinePassword(eMail: string){
    return 'enviado email';
  }



  // public redefinePassword(eMail: string): Promise<any> {
  //   return this.angularFireAuth
  //     .auth
  //     .sendPasswordResetEmail(eMail)
  //     .then(
  //       response => {
  //         console.log(response);
  //       return 'enviado'
  //     })
  //     .catch(
  //       error => { console.error(error);
  //       return error
  //     })
  //   ;
  // }
}
