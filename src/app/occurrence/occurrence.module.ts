//MÓDULO GERADO PELO FRAMEWORK ANGULAR PARA IMPORTAR BIBLIOTECAS
import { NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

/**Routes.*/
import { OccurrenceRoutingModule } from './occurrence-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

/**Modules.*/
import { SharedModule } from '../shared/shared.module';
import { OccurrenceFormComponent } from './occurrence-form/occurrence-form.component';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { OccurrenceListComponent } from './occurrence-list/occurrence-list.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";


registerLocaleData(localeBr, 'pt')
//MÓDULO DE IMPORTAÇÃO DE BIBLIOTECAS TERCEIRAS DO FRAMEWORK
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OccurrenceRoutingModule,
        SharedModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMaterialTimepickerModule
    ],
  declarations: [
    OccurrenceFormComponent,
    OccurrenceListComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class OccurrenceModule { }
