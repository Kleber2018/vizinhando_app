import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiURL : string;

  constructor(
      private http : HttpClient
  ) {
    this.apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : 'http://localhost:3333';
  }

  public criarUser(user: any){
    return this.http.post(`${this.apiURL}/user`, user).toPromise();
  }

  public buscarUser(){
    const token =  sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;
    const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token.token)
      console.log('headers', headers);
      return this.http.get(`${this.apiURL}/me`, {headers: headers}).toPromise();
  }

}
