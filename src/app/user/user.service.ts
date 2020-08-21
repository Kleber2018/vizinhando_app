import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiURL : string;
  private header = new Headers();

  constructor(
      private http : HttpClient
  ) {
    this.apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : 'http://localhost:3333';
  }

  public criarUser(user: any){
    // this.header.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(`${this.apiURL}/user`, user).toPromise();
  }

  public buscarUser(){

    const token =  sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token.token)
    // this.header.append('Content-Type', 'application/json')
    // this.header.append('Authorization', token)
      console.log(headers);
      return this.http.get(`${this.apiURL}/me`, {headers: headers}).toPromise();
  }

}
