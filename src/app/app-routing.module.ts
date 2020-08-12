import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**Components.*/
import { HomepageComponent } from './homepage/homepage.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  // { path: 'relatorio', loadChildren: './relatorio/relatorio.module#RelatorioModule', canActivate: [AuthenticationGuard]},
  { path: 'dashboard', loadChildren: './dash/dash.module#DashModule'},
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
