import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import {Router} from "@angular/router";
import {MatDrawer} from "@angular/material/sidenav";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  @Input() public title = '';
  @Input() public iconName = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {  }

  ngOnInit(): void {}



   

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }


  public abrirHome(){
    this.router.navigate(['/dashboard']);
  }

  public logout(): void {
    this.authenticationService.logout();
  }
}
