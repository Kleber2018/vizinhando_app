import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiURL : any;

  constructor(
      private http : HttpClient
  ) {
    this.apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : null;
  }

  public criarUser(user: any){
    return this.http.post(`${this.apiURL}/user`, user).toPromise();
  }

  public buscarUser(){
    const token =  sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    if(!this.apiURL){
    }

    const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token.token);

      return this.http.get(`${this.apiURL}/me`, {headers: headers}).toPromise();
  }

}
