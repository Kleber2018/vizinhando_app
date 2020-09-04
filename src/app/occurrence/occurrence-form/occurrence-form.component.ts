import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Occurrence } from '../occurrence.model'
import { OccurrenceService } from '../occurrence.service'


import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['./occurrence-form.component.css']
})
export class OccurrenceFormComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();


  public formOcurrence: FormGroup;



  public title = "Nova Ocorrência";


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private occurrenceService: OccurrenceService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
) {
    if (this.activatedRoute.snapshot.params.id) { // caso venha um id é UPDATE
      this.title = 'editar Ocorrência';
      this.occurrenceService.getOccurrence(this.activatedRoute.snapshot.params.id).then(ocurrenceRetorno => {
        console.log('Retornou /ocurrence', ocurrenceRetorno);
        this.buildFormOcurrenceUpdate(ocurrenceRetorno);
      }).catch(error => {
            if (error.error){
              console.log('Retornou Erro:',error.error);
            } else {
              console.log('Retornou Erro:',error);
            }
          }
      )
    } else { //INSERT
      this.buildFormOccurrence();
    }
  }

  ngOnInit() {    }


   private buildFormOccurrence(): void {
    // console.log('construtor Form User', construtorUser.user);
    this.formOcurrence = this.formBuilder.group({
      description: [null, [Validators.required]] ,
      zip_code: [null, [ Validators.required]] ,
      latitude: 22,
      longitude: 22,
      city: [null, [ Validators.required]] ,
      neighborhood: [null, [ Validators.required]] ,
      street: [null, [ Validators.required]],
      number: [null, [ Validators.required]],
      complement: null,
      type: [null, [ Validators.required]]
    })
  }


  private buildFormOcurrenceUpdate(buildOcurrence: Occurrence): void {

    this.formOcurrence = this.formBuilder.group({
      description: buildOcurrence.description ,
      zip_code: [buildOcurrence.zip_code, [ Validators.required]] ,
      latitude: buildOcurrence.latitude,
      longitude: buildOcurrence.longitude,
      city: [buildOcurrence.city, [ Validators.required]] ,
      neighborhood: [buildOcurrence.neighborhood, [ Validators.required]] ,
      street: [buildOcurrence.street, [ Validators.required]],
      number: [buildOcurrence.number, [ Validators.required]],
      complement: buildOcurrence.complement,
      type: [buildOcurrence.type, [ Validators.required]]
    })
  }

  submitFormUser(){
    console.log(this.formOcurrence.value)
    if(this.formOcurrence.valid){
      if(this.activatedRoute.snapshot.params.id){
        const ocurrence: Occurrence = this.formOcurrence.value;
        this.occurrenceService.updateOccurrence(ocurrence)
            .then(r => {
          console.log('Atualizado com sucesso a ocorrencia:', r);
        }).catch(error => {
              if (error.error){
                console.log('Retornou Erro:',error.error);
              } else {
                console.log('Retornou Erro:',error);
              }
            }
        )
      } else {
        const ocurrence: Occurrence = this.formOcurrence.value;
        this.occurrenceService.createOccurrence(ocurrence).then(r => {
          console.log('Salvo com sucesso nova Ocorrencia:', r);
       //   this.router.navigate(['/login']);
        }).catch(error => {
            if (error.error){
              console.log('Retornou Erro:',error.error);
            } else {
              console.log('Retornou Erro:',error);
            }
          }
        )
      }
    }
  }

  Logout(){
    this.authenticationService.logout();
  }
  
  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }
}
