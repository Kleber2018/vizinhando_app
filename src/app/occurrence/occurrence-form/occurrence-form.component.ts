import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Occurrence } from '../occurrence.model'
import { OccurrenceService } from '../occurrence.service'


import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['./occurrence-form.component.css']
})
export class OccurrenceFormComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  //instanciando as variáveis
  public formOcurrence: FormGroup;
  public ocurred_at_data = new FormControl((new Date()),[Validators.required]);
  public ocurred_at_time = new FormControl('01:03', [Validators.required]);
  public types = ['assalto', 'agressao', 'covid', 'perturbacao', 'homicidio', 'atividade_suspeita', 'acidente', 'desaparecimento', 'animal_perdido']
  public formType = new FormControl(null, [Validators.required]);
  public title = "Nova Ocorrência";
  public formCheckboxAnonymous = new FormControl(false);

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private occurrenceService: OccurrenceService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
) {
  //construtor
  //se existir um parâmetro id na url significa que é uma edição de ocorrencia, caso contrário é insert
    if (this.activatedRoute.snapshot.params.id) { //UPDATE
      this.title = 'editar Ocorrência';
      //buscando dados da ocorrencia que vai ser alterada
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

  //framework
  ngOnInit() {    }


  //carregando com dados nulos para criar uma nova ocorrência
   private buildFormOccurrence(): void {
    this.ocurred_at_time.setValue(new Date().getHours()+':'+new Date().getMinutes())

    this.formOcurrence = this.formBuilder.group({
      description: [null, [Validators.required]] ,
      zip_code: [null, [ Validators.required]] ,
      latitude: 22,
      longitude: 22,
      city: ['Ponta Grossa', [ Validators.required]] ,
      neighborhood: [null, [ Validators.required]] ,
      street: [null, [ Validators.required]],
      number: [null, [ Validators.required]],
      complement: null,
      type: ['null', [ Validators.required]]
    })
  }


  //Carregando com dados da ocorrencia para alteração
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
      complement: buildOcurrence.complement
    })
  }


  //Chamado pelo botão salvar da ocorrência
  submitFormUser(){
    console.log(this.formOcurrence.value)
    if(this.formOcurrence.valid){ //verificando se todos os campos obrigatórios foram preenchidos
      if(this.activatedRoute.snapshot.params.id){ //se veio um id na url significa que é uma requisição de update
        const ocurrence: Occurrence = this.formOcurrence.value;

        //requisição de update no banco
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
      } else { // caso contrário é um insert
        const ocurrence: Occurrence = this.formOcurrence.value; //atribuindo valor do form

        //convertendo data e hora
        var dia = this.ocurred_at_data.value.getDate()
        var mes = this.ocurred_at_data.value.getMonth();
        var ano = this.ocurred_at_data.value.getFullYear();

        var time = this.ocurred_at_time.value.split(':');
        var hora = time[0];
        var minuto = time[1];
        ocurrence.ocurred_at = new Date( ano, mes, dia, hora, minuto).getTime();

        //atribuindo tipo de ocorrência da caixa de seleção
        ocurrence.type = this.formType.value;
        //atribuindo seleção do checkbox anonymous
        ocurrence.anonymous = this.formCheckboxAnonymous.value;

        //requisição de insert no banco
        this.occurrenceService.createOccurrence(ocurrence).then(r => {
          console.log('Salvo com sucesso nova Ocorrencia:', r);

          const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
            data: {descricao:"Salvo com sucesso"}
          });
          dialogRefAlert.afterClosed().toPromise().then(() => {
            this.buildFormOccurrence(); 
            this.router.navigate(['/ocorrencia']); 
          })

        }).catch(error => {
            if (error.error){
              const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
                data: {descricao:error.error}
              });
              dialogRefAlert.afterClosed().toPromise()
              console.log('Retornou Erro:',error.error);
            } else {
              const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
                data: {descricao:error}
              });
              dialogRefAlert.afterClosed().toPromise()
              console.log('Retornou Erro:',error);
            }
          }
        )
      }
    }
  }

  //para executar o correto logout do usuário
  Logout(){
    this.authenticationService.logout();
  }
  
  //gerado pelo framework, boas práticas
  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }
}
