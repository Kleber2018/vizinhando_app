import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**Third party modules.*/
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../shared/model/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  //para fazer a requisição de login no servidor
  public login(eMail: string, password: string): Promise<any>  {
    //buscando url do servidor no localstorage
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


   //executando a correto logout do usuário no sistema
  public logout(): void {
    localStorage.removeItem('userEquipe2');
    sessionStorage.removeItem('userEquipe2');
    sessionStorage.removeItem('userEquipe2token');
    this.router.navigate(['/login']);
  }

  
  //solicitando redefinição de password para o servidor
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
