////MÓDULO GERADO PELO FRAMEWORK ANGULAR PARA FAZER A PONTE COM O SERVIDOR
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../shared/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private http : HttpClient
  ) { }

  //Requisição POST para criar usuário
  public criarUser(user: any){
    //buscando a url do servidor no localstorage
    const apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : null;

    return this.http.post(`${apiURL}/user`, user).toPromise();
  }

  //Requisição GET para buscar as informações do usuário
  public buscarUser(){
    const apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : null;

    const token =  sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token.token);

      return this.http.get(`${apiURL}/me`, {headers: headers}).toPromise();
  }

  //requisição PUT para enviar os dados do usuário que vai ser atualizado
  public updateUser(user: User){
    const apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : null;

    const token =  sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token.token);

    return this.http.put(`${apiURL}/user`, user, {headers: headers}).toPromise();
  }
}
