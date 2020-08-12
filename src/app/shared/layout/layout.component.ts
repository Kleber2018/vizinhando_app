import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**Angular Material. */
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';

/**Services.*/
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public opened = true; //inicializar aberto
  public mode="side"//over para celualr
  private end: Subject<boolean> = new Subject();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }


  // public goTo(sidenavItem: SidenavItem, sidenav?: MatDrawer): void {
  //   this.router.navigate([sidenavItem.route]);
  //   //sidenav.close();
  // }

  public logout(sidenav: MatDrawer): void {
    this.authenticationService.logout();
    // sidenav.close();
  }
}
