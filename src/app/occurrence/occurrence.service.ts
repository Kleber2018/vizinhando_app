import { Injectable } from '@angular/core';
import { Occurrence } from './occurrence.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OccurrenceService {

//construtor
  constructor( private http : HttpClient) {  }


    //Requisição POST para criar nova ocorrência
  createOccurrence(occurrence: Occurrence) {
      console.log('criando ocorrencia', occurrence)

      const apiURL = localStorage.getItem('urlServidor')
      ? JSON.parse(localStorage.getItem('urlServidor'))
      : null;


      const token =  sessionStorage.getItem('userEquipe2token')
      ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
      : null;

      const headers = new HttpHeaders()
                      .set('Content-Type', 'application/json')
                      .set('Authorization', token.token);

      return this.http.post(`${apiURL}/ocurrences`, occurrence, {headers: headers}).toPromise();
  }


    //requisição PUT para alterar ocorrência
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

  return this.http.put(`${apiURL}/ocurrences`, occurrence, {headers: headers}).toPromise();
    }



//requisição get para recuperar os dados de uma ocorrência pelo id
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

      return this.http.get(`${apiURL}/ocurrences`, {headers: headers}).toPromise();
    }


    //requisição get para recuperar array de ocorrências
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

      return this.http.get(`${apiURL}/ocurrences`, {headers: headers}).toPromise();
    }


    //requisição para deletar ocorrências
    deleteOccurrence(id: string) {
      console.log('delete ocorrencia', id)
      return true
    }

}
