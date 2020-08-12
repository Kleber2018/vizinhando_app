import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {


  private end: Subject<boolean> = new Subject();

  public usuario: Usuario;

  //executa uma vez no carregamento da página
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }


//executa constantemente
  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('usuario')
    ? JSON.parse(sessionStorage.getItem('usuario'))
    : null;

    if (this.usuario) {
      // logado ok
    } else {
      // this.authenticationService.logout();
    }
  }

}
