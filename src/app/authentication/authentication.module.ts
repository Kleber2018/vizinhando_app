//MÓDULO GERADO PELO FRAMEWORK ANGULAR

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**Routes.*/
import { AuthenticationRoutingModule } from './authentication-routing.module';

/**Modules.*/
import { SharedModule } from '../shared/shared.module';

/**Components.*/
import { LoginFormComponent } from './login-form/login-form.component';

import { EsqueciSenhaDialogComponent } from './login-form/esqueci-senha-dialog/esqueci-senha-dialog.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    LoginFormComponent,
    EsqueciSenhaDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AuthenticationModule { }
