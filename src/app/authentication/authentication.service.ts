import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**Third party modules.*/
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";
import {tryCatch} from "rxjs/internal-compatibility";
import {User} from "../shared/model/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly apiURL : string;

  constructor(
    private http : HttpClient,
    private router: Router
  ) {

      this.apiURL = localStorage.getItem('urlServidor')
          ? JSON.parse(localStorage.getItem('urlServidor'))
          : 'http://localhost:3333';
  }

  public login(eMail: string, password: string): Promise<any>  {
   const autenticacao = {
      "email": eMail,
        "password": password
    }
    try {
        return this.http.post(`${this.apiURL}/login`, autenticacao).toPromise();
    } catch (e) {}

   }


  public logout(): void {
    console.log('deslogar');
    localStorage.removeItem('urlServidor');
    localStorage.removeItem('userEquipe2');
    sessionStorage.removeItem('userEquipe2');
      sessionStorage.removeItem('userEquipe2token');
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
