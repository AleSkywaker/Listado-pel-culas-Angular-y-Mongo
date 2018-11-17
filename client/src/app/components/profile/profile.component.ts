import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { Follow } from '../../models/follow';
import { FollowService } from './../../service/follow.service';
import { UserService } from './../../service/user.service';
import { GLOBAL } from '../../service/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: string;
  public url: string;
  public token: string;
  public identity: string;
  public stats: string;
  public follow: string;

  constructor(
    private _userService: UserService,
    private _followService: FollowService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this.url = GLOBAL.url;
    this.titulo = "Perfil de usuario";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log("Profile cargado")

    this._route.params.subscribe(params => {
      console.log("parametros", params)
      this._userService.seeCompatibility(params.id).subscribe(data => {
        console.log("que es data", data)
      })
    })
  }

}
