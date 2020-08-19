import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**Components.*/
import { AuthenticationGuard } from './authentication/authentication.guard';

const appRoutes: Routes = [
  { path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  // { path: '', component: HomepageComponent, canActivate: [AuthenticationGuard] },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  // { path: '', redirectTo: '/login'},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
