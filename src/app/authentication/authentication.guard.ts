//MÓDULO GERADO PELO FRAMEWORK ANGULAR PARA GUARDA DE ROTAS - NÃO ESTAMOS UTILIZANDO NO PROJETO PARA FACILITAR NOS TESTES

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

/**Services.*/
import { AuthenticationService } from './authentication.service';
import {User} from "../shared/model/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const usuario: User = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : null;

      if (usuario) {
        return true;
      } else {
        this.authenticationService.logout();
        return false;
      }

  }

  public canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const usuario: User = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : null;

    if (usuario) {
      return true;
    } else {
      this.authenticationService.logout();
      return false;
    }
  }
}
