import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Occurrence } from '../occurrence.model';
import { OccurrenceService } from '../occurrence.service';


import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, startWith, takeUntil} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.css']
})
export class OccurrenceListComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject(); 

  public title = 'Lista de Ocorrências';
  public ocorrencias = [{status: 22}, {status: 33},{status: 22}, {status: 33}];
  public ocurrences: any;
  constructor(private router: Router,
              private occurrenceService: OccurrenceService,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) { this.buildOccurrences()}

  ngOnInit() {   }

  buildOccurrences(){
      this.occurrenceService.getOccurrences().then(occurrencesRetorno => {
        console.log('Retornou Occurrences', occurrencesRetorno);
        this.ocurrences = occurrencesRetorno
            }).catch(error => {
            if (error.error){
              console.log('Retornou Erro de Ocorrências:',error.error);
            } else {
              console.log('Retornou Erro de Ocorrências:',error);
            }
      })
  }


  async alertaDialog(data: any) {
    // data: {
    //   descricao: descricao,
    //   opcao1: 'Excluir',
    // }
    const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
      data
    });
    const retorno =  await dialogRefAlert.afterClosed().toPromise();
    return retorno;
  }


  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }
}

