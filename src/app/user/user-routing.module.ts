import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from "../authentication/authentication.guard";
import {UserFormComponent} from "./user-form/user-form.component";


const routes: Routes = [
  { path: '', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
