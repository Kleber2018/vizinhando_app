import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**Third party modules.*/
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    // private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  public login(eMail: string, password: string): boolean {
    this.router.navigate(['/user']);
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
