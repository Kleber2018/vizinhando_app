//MÓDULO GERADO PELO FRAMEWORK ANGULAR PARA CRIAR O COMPONENTE FOOTER QUE REPETE NAS PRINCIPAIS PÁGINAS
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }
}
