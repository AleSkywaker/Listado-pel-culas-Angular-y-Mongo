import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public titulo: String;
  public user: User;
  public status: String;
  public message: String;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {
    this.titulo = "Identificate";
    this.user = new User("", "", "", "", "", "", "", "", "", "", "", "ROLE_USER", "", "")
  }

  ngOnInit() {
    console.log("Login cargado")
  }
  onSubmit() {
    //logear usuario y conseguir datos
    this._userService.singUp(this.user).subscribe(response => {
      this.identity = response.user;
      if (!this.identity || !this.identity._id) {
        this.status = "error";
        this.message = "Usuario no existe o contraseña invalida"
      } else {
        this.status = "success";
        //TODO: Persistir datos en localStorage
        console.log("Datos a persistir", this.identity)
        localStorage.setItem('identity', JSON.stringify(this.identity))
        //TODO: Conseguir Token
        this.getToken();
        this.message = response.message;

      }
    },
      error => {
        var errorMessage = <any>error;
        console.log("errores", errorMessage)
        if (errorMessage = ! null) {
          this.status = "error";
          this.message = error.error.message;
        }
      })
  }
  logearte() {
    //logear usuario y conseguir datos
    this._userService.singUp(this.user).subscribe(response => {
      this.identity = response.user;
      if (!this.identity || !this.identity._id) {
        this.message = "Usuario no existe o contraseña invalida"
      } else {
        this.status = "success";
        //TODO: Persistir datos en localStorage
        localStorage.setItem('identity', JSON.stringify(this.identity))
        //TODO: Conseguir Token
        this.getToken();
        this.message = response.message;

      }
    },
      error => {
        var errorMessage = <any>error;
        console.log("errores", errorMessage)
        if (errorMessage = ! null) {
          this.status = "error";
          this.message = error.error.message;
        }
      })
  }

  getToken() {
    this._userService.singUp(this.user, 'true').subscribe(response => {
      this.token = response.token;
      if (this.token.length <= 0) {
        this.status = "error";
      } else {
        //TODO: Persistir token del usuario
        localStorage.setItem('token', JSON.stringify(this.token))
        //TODO: Conseguir las estadisticas del usuario
        this.message = response.message;
        //TODO: redireccionar a completar registro
        this.getCounters()
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log("errores", errorMessage)
        if (errorMessage = ! null) {
          this.status = "error";
          this.message = error.error.message;
        }
      })
  }

  getCounters() {
    this._userService.getCounters().subscribe((response) => {
      localStorage.setItem('stats', JSON.stringify(response))
      this.status = "success";
      this._router.navigate(['inicio'])
    }, (error) => {
      console.log(<any>error)
    })
  }

}
