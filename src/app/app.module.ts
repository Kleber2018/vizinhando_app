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
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

/**Modules.*/
import { SharedModule } from './shared/shared.module';

/**Components.*/
import { AppComponent } from './app/app.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ScreenTrackingService } from '@angular/fire/analytics';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
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
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    // AngularFireFunctionsModule,
    // AngularFireAuthModule,
    // AngularFireStorageModule,
    NgxMaterialTimepickerModule,
    NgxMaskModule.forRoot(options),
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    // AngularFireAuth,
    ScreenTrackingService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
