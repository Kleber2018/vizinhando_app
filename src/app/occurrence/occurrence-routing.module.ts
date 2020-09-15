//MÓDULO GERADO PELO FRAMEWORK ANGULAR PARA FAZER O ROTEAMENTO DAS URL
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccurrenceFormComponent } from './occurrence-form/occurrence-form.component';
import { OccurrenceListComponent } from './occurrence-list/occurrence-list.component';
/**Components.*/


//ROTAS DO MÓDULO OCURRENCE
const occurrenceRoutes: Routes = [
  { path: '', component: OccurrenceListComponent },
  { path: 'novo', component: OccurrenceFormComponent },
  { path: 'editar/:id', component: OccurrenceFormComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forChild(occurrenceRoutes)],
    exports: [RouterModule]
})
export class OccurrenceRoutingModule { }
