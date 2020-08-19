import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**Angular Material.*/
import { AngularMaterialModule } from './angular-material/angular-material.module';

/**Third party modules.*/
import { FlexLayoutModule } from '@angular/flex-layout';


/**Components.*/
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    FooterComponent, // rodapé das páginas
    LayoutComponent, // página principal, os demais componentes são abertos dentro desse componente
    AlertDialogComponent // caixa de alerta
  ],
  imports: [
    CommonModule, // estrutura do angular
    RouterModule, // para fazer o roteamento das telas do angular
    AngularMaterialModule, //componentes do Material Designer
    FlexLayoutModule // para utilizar na responsívidade da tela
  ],
  exports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FooterComponent,
    LayoutComponent
  ]
})
export class SharedModule { }
