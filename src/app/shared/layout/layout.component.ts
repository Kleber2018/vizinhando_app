import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**Angular Material. */
import { MatSidenav } from '@angular/material/sidenav';

/**Models.*/
import { SidenavItem } from '../model/sidenav-item.model';

/**Services.*/
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  @Input() public sidenavItems: SidenavItem[] = [];
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }


  public goTo(sidenavItem: SidenavItem, sidenav: MatSidenav): void {
    sidenav.close();
    this.router.navigate([sidenavItem.route]);
  }

  public logout(sidenav: MatSidenav): void {
    sidenav.close();
    this.authenticationService.logout();
  }
}
