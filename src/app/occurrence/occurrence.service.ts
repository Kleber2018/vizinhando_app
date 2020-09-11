import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { take, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Occurrence } from './occurrence.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OccurrenceService {


  constructor( private http : HttpClient) {  }

    getTimeZone() {
      return new Date().toString()
    }

    // LOCAL
    setLocalOccurrence(occurrence: Occurrence) {
      if(occurrence.createdAt == ''){ //para ter o horário do inicio do pedido
        occurrence.createdAt = this.getTimeZone();  
      }
      localStorage.setItem('occurrence', JSON.stringify(occurrence));
    }



    createOccurrence(occurrence: Occurrence) {
      console.log('criando ocorrencia', occurrence)

      const apiURL = localStorage.getItem('urlServidor')
      ? JSON.parse(localStorage.getItem('urlServidor'))
      : null;

      return this.http.post(`${apiURL}/occurrence`, occurrence).toPromise();
    }



    updateOccurrence(occurrence: Occurrence) {
      console.log('update ocorrencia', occurrence)

      const apiURL = localStorage.getItem('urlServidor')
      ? JSON.parse(localStorage.getItem('urlServidor'))
      : null;

  const token =  sessionStorage.getItem('userEquipe2token')
      ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
      : null;

  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token.token);

  return this.http.put(`${apiURL}/occurrence`, occurrence, {headers: headers}).toPromise();
    }



    getOccurrence(id: string) {
      const apiURL = localStorage.getItem('urlServidor')
        ? JSON.parse(localStorage.getItem('urlServidor'))
        : null;

    const token =  sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token.token);

      return this.http.get(`${apiURL}/occurrence`, {headers: headers}).toPromise();
    }

    getOccurrences() {
      const apiURL = localStorage.getItem('urlServidor')
          ? JSON.parse(localStorage.getItem('urlServidor'))
          : null;

      const token =  sessionStorage.getItem('userEquipe2token')
          ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
          : null;

      const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', token.token);

      return this.http.get(`${apiURL}/occurrences`, {headers: headers}).toPromise();
    }



    deleteOccurrence(id: string) {
      console.log('delete ocorrencia', id)
      return true
    }

}
