import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Occurrence } from '../occurrence.model';
import { OccurrenceService } from '../occurrence.service';

import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import {User} from "../../shared/model/user.model";
import {FormControl} from "@angular/forms";
import {isBoolean} from "util";


@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.css']
})
export class OccurrenceListComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject(); 

  public title = 'Lista de Ocorrências';
  public minhasOcorrencias = false;
  public ocurrences: any;
  public adm: boolean = false;

    public formCheckboxMinhasOcorrencias = new FormControl(false);

//Populando um usuário com campos vazios para melhorar o carregamento do form
    public user = {
        _id: '',
        name: '' ,
        email: '' ,
        zip_code: '' ,
        latitude: -25.0945 ,
        longitude: -50.1633 ,
        city: '' ,
        neighborhood: '' ,
        street: '',
        number: 0,
        complement: '' ,
        phone: '',
        role: ''
    }

  //construtor das bibliotecas de terceiros e aplicação
  constructor(private router: Router,
              private occurrenceService: OccurrenceService,
              public dialog: MatDialog) { 
                //construtor
              //buscando usuário armazenado no session storage
              this.user = sessionStorage.getItem('userEquipe2')
                  ? JSON.parse(sessionStorage.getItem('userEquipe2'))
                  : this.user;

              if(this.user.role){
                  if(this.user.role == 'admin'){
                      this.adm = true;
                  }
              }

                this.buildOccurrences()
              }

  //framework
  ngOnInit() {   }

  //carregando lista de ocorrencias do banco
  buildOccurrences(){
        this.minhasOcorrencias = false
      this.occurrenceService.getOccurrences().then(occurrencesRetorno => {
        console.log('Retornou Todas Occurrences', occurrencesRetorno);
        this.ocurrences = occurrencesRetorno
            }).catch(error => {
            if (error.error){
              console.log('Retornou Erro de Ocorrências:',error.error);
            } else {
              console.log('Retornou Erro de Ocorrências:',error);
            }
      })
  }

    //carregando lista de ocorrencias do banco
    buildMyOccurrences(){
        this.minhasOcorrencias = true
        this.occurrenceService.getMyOccurrences().then(occurrencesRetorno => {
            console.log('Retornou Minhas Occurrences', occurrencesRetorno);
            if(occurrencesRetorno){
                this.ocurrences = occurrencesRetorno
            } else {
                this.ocurrences = [];
            }
        }).catch(error => {
            if (error.error){
                console.log('Retornou Erro de Ocorrências:',error.error);
            } else {
                console.log('Retornou Erro de Ocorrências:',error);
            }
        })
    }

    //chamado pelo botão delete, para deletar e recarregar o array
    async delete(id: string){
        const retornoDialog =  await this.alertaDialog({descricao: 'Você tem certeza que deseja excluir a Ocorrência?', opcao1: 'Excluir'});
        if (retornoDialog) {
            if (retornoDialog.retorno === 'opcao1') {
                this.occurrenceService.deleteOccurrence(id).then(deleteRetorno => {
                    this.alertaDialog({descricao: "Deletado com Sucesso"}).then(() => {
                        if (this.formCheckboxMinhasOcorrencias.value) {
                            this.buildMyOccurrences()
                        } else {
                            this.buildOccurrences()
                        }
                    })
                }).catch(error => {
                    if (error.error) {
                        console.log('Retornou Erro de Ocorrências:', error.error);
                    } else {
                        console.log('Retornou Erro de Ocorrências:', error);
                    }
                })
            }
        }
    }


      // para abrir dialog de alerta
      async alertaDialog(data: any) { //{descricao:"textoi"}
        const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
          data
        });
        const retorno =  await dialogRefAlert.afterClosed().toPromise();
        return retorno;
      }

      //chamado quando o checkbox minhas ocorrencias for marcada
        verMinhasOcorrencias(){
            if(this.formCheckboxMinhasOcorrencias.value){
                this.buildOccurrences()
            } else {
                this.buildMyOccurrences()
            }
        }


    //framework - boas práticas
      ngOnDestroy(): void {
        this.end.next();
        this.end.complete();
      }
}

