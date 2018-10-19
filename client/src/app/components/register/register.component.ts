import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public titulo: String;
  public user: User;
  public status: String;
  public message: String;
  public showHelp: Boolean;
  public texto: String;
  @ViewChild('input1') inputEl: ElementRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.titulo = "Registrate"
    this.user = new User("", "", "", "", "", "", "", "", "", "", "", "ROLE_USER", "")
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(response => {
      if (response.user && response.user._id) {
        this.status = 'success';
        this.message = response.message;
        form.reset();
      } else {
        this.status = 'error';
        this.message = response.message;
      }
    }, error => {
      console.log(<any>error)
    })
  }

  registrate() {
    console.log(this.inputEl)
    console.log("Usuario a registrar", this.user)

  }


  onfireContrasena() {
    this.showHelp = true;
    this.texto = "Escriba contraseña"
  }
  onfireContrasena2() {
    this.showHelp = true;
    this.texto = "Repita contraseña"
  }
  onfireNombre() {
    this.showHelp = true;
    this.texto = "Escriba su nombre"
  }
  onfireEmail() {
    this.showHelp = true;
    this.texto = "Escriba su email"
  }
  limpiar() {
    this.showHelp = false;
  }


}
