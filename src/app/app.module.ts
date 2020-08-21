import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

/**Routes.*/
import { AppRoutingModule } from './app-routing.module';

/**Environment.*/
import { environment } from '../environments/environment';

/**Third party modules.*/
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AngularFireModule } from '@angular/fire';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

/**Modules.*/
import { SharedModule } from './shared/shared.module';

/**Components.*/
import { AppComponent } from './app/app.component';

import { ScreenTrackingService } from '@angular/fire/analytics';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {HttpClientModule} from "@angular/common/http";

/**Configurations.*/
export const options: Partial<IConfig> | (() => Partial<IConfig>) = { };


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxMaterialTimepickerModule,
    NgxMaskModule.forRoot(options),
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    ScreenTrackingService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
