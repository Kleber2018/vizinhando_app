import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Usuario } from '../../shared/model/usuario.model';
import { Occurrence } from '../occurrence.model';
import { OccurrenceService } from '../occurrence.service';


import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, startWith, takeUntil} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.css']
})
export class OccurrenceListComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject(); 


  constructor(private router: Router,
              private deviceService: DeviceDetectorService,
              private occurrenceService: OccurrenceService,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) { }

  ngOnInit() {   }

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

