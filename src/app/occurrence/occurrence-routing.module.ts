import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccurrenceFormComponent } from './occurrence-form/occurrence-form.component';
import { OccurrenceListComponent } from './occurrence-list/occurrence-list.component';
/**Components.*/


const occurrenceRoutes: Routes = [
  { path: 'novo', component: OccurrenceFormComponent },
  { path: 'editar/:id', component: OccurrenceFormComponent },
  { path: 'relatorio', component: OccurrenceListComponent},
  { path: '**', redirectTo: '/occurrence/novo'}
];

@NgModule({
    imports: [RouterModule.forChild(occurrenceRoutes)],
    exports: [RouterModule]
})
export class OccurrenceRoutingModule { }
