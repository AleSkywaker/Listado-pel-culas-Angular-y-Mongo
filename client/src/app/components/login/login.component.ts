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
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {
    this.titulo = "Identificate";
    this.user = new User("", "", "", "", "", "", "", "", "", "", "", "ROLE_USER")
  }

  ngOnInit() {
    console.log("Login cargado")
  }
  onSubmit() {
    console.log("login user", this.user);
  }
}
