import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**Third party modules.*/
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient, HttpParams} from "@angular/common/http";
import {tryCatch} from "rxjs/internal-compatibility";
import {User} from "../shared/model/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  public login(eMail: string, password: string): Promise<any>  {
      const apiURL = localStorage.getItem('urlServidor')
          ? JSON.parse(localStorage.getItem('urlServidor'))
          : null;

       const autenticacao = {
          "email": eMail,
            "password": password
        }
        try {
            return this.http.post(`${apiURL}/login`, autenticacao).toPromise();
        } catch (e) {}
   }


  public logout(): void {
   // localStorage.removeItem('urlServidor');
    localStorage.removeItem('userEquipe2');
    sessionStorage.removeItem('userEquipe2');
    sessionStorage.removeItem('userEquipe2token');
    this.router.navigate(['/login']);
  }

  public redefinePassword(eMail: string){
      const apiURL = localStorage.getItem('urlServidor')
          ? JSON.parse(localStorage.getItem('urlServidor'))
          : null;

      let param: any = {'email': eMail};
      try {
          return this.http.get(`${apiURL}/forgotPassword`, {params: param}).toPromise();
      } catch (e) {}
  }
}
