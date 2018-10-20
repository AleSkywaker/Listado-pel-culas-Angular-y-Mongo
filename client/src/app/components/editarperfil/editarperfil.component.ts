import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent implements OnInit {

  public titulo: String;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;

  constructor(
    private _userSerivice: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = "Editar perfil";
    this.token = this._userSerivice.getToken();
    this.user = this._userSerivice.getIdentity();
    this.identity = this.user;
  }

  ngOnInit() {
    // console.log("this user", this.user)

    $('.img-check').click(function (e) {
      $('.img-check').not(this).removeClass('check')
        .siblings('input').prop('checked', false);
      $(this).addClass('check')
        .siblings('input').prop('checked', true);
    });
  }
  onSubmit(form) {
    console.log("usir", this.user);
    console.log("formis", form);
  }
  clak(v) {
    console.log("clak", v.name)
    this.user.image = v.name;
  }

}
