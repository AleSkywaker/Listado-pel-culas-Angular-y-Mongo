import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.titulo = "Registrate"
    this.user = new User("", "", "", "", "", "", "", "", "", "", "", "ROLE_USER", "")
  }

  ngOnInit() {
    console.log("registro cargado");
  }
  onSubmit(form) {
    this._userService.register(this.user).subscribe(response => {
      if (response.user && response.user._id) {
        console.log("data", response.user)
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

}
