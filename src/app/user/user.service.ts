import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiURL : string;
  private header = new Headers();

  constructor(
      private http : HttpClient
  ) {
    this.apiURL = 'http://localhost:3333';
  }

  public criarUser(user: any){
    // this.header.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(`${this.apiURL}/user`, user).toPromise();
  }


}
