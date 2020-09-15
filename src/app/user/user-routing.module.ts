//MÓDULO DE ROTEAMENTO DA URL
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from "../authentication/authentication.guard";
import {UserFormComponent} from "./user-form/user-form.component";


//Verifica o conteúdo da url depois de user, para realizar o roteamento
const routes: Routes = [
  { path: 'perfil/:id', component: UserFormComponent },
  { path: '', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
