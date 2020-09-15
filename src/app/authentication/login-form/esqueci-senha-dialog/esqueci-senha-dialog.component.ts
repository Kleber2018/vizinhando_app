import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-esqueci-senha-dialog',
  templateUrl: './esqueci-senha-dialog.component.html',
  styleUrls: ['./esqueci-senha-dialog.component.css']
})
export class EsqueciSenhaDialogComponent {


 public email: string;

 public formEmail: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EsqueciSenhaDialogComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,) {
                //construtor
                this.email = data;
                if(data){
                  this.buildFormLogin(data)
                } else {
                  this.email = ''
                  this.buildFormLogin('')
                }
              }

  //carregando input de e-mail
  private buildFormLogin(email: string): void {
    this.formEmail = this.formBuilder.group({
      eMail: [email, [ Validators.required, Validators.email ]]
    });
  }

  //ao clicar no boitão de redefinir senha é submetido o e-mail do input
  public async submitFormEmail(): Promise<void> {
    if (this.formEmail.valid) {
      console.log(this.formEmail.value.eMail)
        var retorno = await this.authenticationService.redefinePassword(this.formEmail.value.eMail.toLowerCase())
            .then(r => {
            console.log('sucesso', r);
               
        }).catch(error => {
          console.log(error)
          }
        )
        this.dialogRef.close('enviado');
    }
  }       
}
