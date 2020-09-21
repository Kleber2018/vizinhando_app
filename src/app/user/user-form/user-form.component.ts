import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../../shared/model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";
import {MatInput} from "@angular/material/input";
import {ValidateFn} from "codelyzer/walkerFactory/walkerFn";
import {Subject} from "rxjs";
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  private end: Subject<boolean> = new Subject();

  public userLogado: any;
  public formUser: FormGroup;

  //Populando um usuário com campos vazios para melhorar o carregamento do form
  public user = {
    name: '' ,
    email: '' ,
    zip_code: '' ,
    latitude: -25.0945 ,
    longitude: -50.1633 ,
    city: '' ,
    neighborhood: '' ,
    street: '',
    number: 0,
    complement: '' ,
    phone: '',
  }
  constructor(
      private userService: UserService,
      private  authenticationService:  AuthenticationService,
      private router: Router,
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      public dialog: MatDialog
  ) {
    //construtor
    this.userLogado = sessionStorage.getItem('userEquipe2token')
        ? JSON.parse(sessionStorage.getItem('userEquipe2token'))
        : null;

    //se não existir um token ele solicita os demais dados do usuário para o servidor, para popular os inputs do form
    if (this.userLogado) {
      console.log('sessionStorage User', this.userLogado);
      setTimeout(() => {
            this.userService.buscarUser().then(userRetorno => {
              console.log('Retornou /me', userRetorno);
              this.construtorFormUserUpdate(userRetorno);
            }).catch(error => {
                  if (error.error){
                    console.log('Retornou Erro:',error.error);
                  } else {
                    console.log('Retornou Erro:',error);
                  }
                }
            )
          },
          1000);
    } else {
      this.construtorFormUserCreate(this.user);
    }
  }

  //framework
  ngOnInit(): void {
  }


  //carregando o form com dados nulos para cadastrar novo usuário
  private construtorFormUserCreate(construtorUser: any): void {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required]] ,
      email: [null, [Validators.required, Validators.email]] ,
      password: [null, [Validators.required, Validators.minLength(3)]],
      zip_code: [null, [ Validators.required]] ,
      latitude: this.user.latitude,
      longitude: this.user.longitude,
      city: [null, [ Validators.required]] ,
      neighborhood: [null, [ Validators.required]] ,
      street: [null, [ Validators.required]],
      number: [null, [ Validators.required]],
      complement: null,
      phone: [null, [ Validators.required]]
    })
  }


  //carregando o form com dados do usuário logado
  private construtorFormUserUpdate(construtorUser: any): void {
    if(construtorUser.user){
      this.user = construtorUser.user;
    } else {
      this.user = construtorUser;
    }

    this.formUser = this.formBuilder.group({
      name: this.user.name ,
      email: [{value: this.user.email,  disabled: this.userLogado}, [Validators.required, Validators.email]] ,
      password: null,
      zip_code: [this.user.zip_code, [ Validators.required]] ,
      latitude: this.user.latitude,
      longitude: this.user.longitude,
      city: [this.user.city, [ Validators.required]] ,
      neighborhood: [this.user.neighborhood, [ Validators.required]] ,
      street: [this.user.street, [ Validators.required]],
      number: [this.user.number, [ Validators.required]],
      complement: this.user.complement,
      phone: [this.user.phone, [ Validators.required]]
    })
  }

// chamado pelo botão salvar para submeter um update ou criação de usuário
  submitFormUser(){
    console.log(this.formUser.value)
    if(this.formUser.valid){
      if(this.userLogado){
        let userLocal: User = this.formUser.value;
        if(this.formUser.value.password == null ||this.formUser.value.password == ''){
          delete userLocal['password'];
        }
        userLocal.email = this.user.email
        this.userService.updateUser(userLocal)
            .then(r => {
          console.log('Atualizado com sucesso o user:', r);
        }).catch(error => {
              if (error.error){
                console.log('Retornou Erro:',error.error);
              } else {
                console.log('Retornou Erro:',error);
              }
            }
        )
      } else {
        this.userService.criarUser(this.formUser.value).then(r => {
          console.log('Salvo com sucesso novo user:', r);
          const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
            data: {descricao:"Salvo com sucesso"}
          });
          dialogRefAlert.afterClosed().toPromise().then(() => {
            this.router.navigate(['/login']); 
          })
        }).catch(error => {
            if (error.error){
              console.log('Retornou Erro:', error.error);
              const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
                data: {descricao:error.error}
              });
              dialogRefAlert.afterClosed().toPromise()
            } else {
              const dialogRefAlert = this.dialog.open(AlertDialogComponent, {
                data: {descricao:error}
              });
              dialogRefAlert.afterClosed().toPromise()
              console.log('Retornou Erro:', error);
            }
          }
        )
      }
    }
  }

  //gerado pelo framework para ocultar os digitos da senha
  public togglePasswordVisibility(input_password: MatInput): void {
    input_password.type = input_password.type === 'text' ? 'password' : 'text';
  }

  //para chamar o correto logout do usuário
  Logout(){
    this.authenticationService.logout();
  }

  //gerado pelo framework - boas práticas para finalizar as funções quando a página não estiver sendo exibida
  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }
}
