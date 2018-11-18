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
  public identity: User;
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

    // this._route.params.subscribe(params => {
    //   console.log("parametros", params)
    //   this._userService.seeCompatibility(params.id).subscribe(data => {
    //     console.log("que es data", data)
    //   })
    // })

    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.verCompatibilidad(id);
    })
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          console.log(response)
          this.user = response.user;
        } else {
          this.status = 'error'
        }
      }, error => {
        console.log(<any>error)
        this.status = 'error'
        this._router.navigate(['/perfil', this.identity._id])
      }
    )
  }

  verCompatibilidad(id) {
    this._userService.seeCompatibility(id).subscribe(
      response => {
        console.log("ESTO ES COMPATIBLIDAD", response)
      }, error => {
        console.log(<any>error)
        this.status = 'error'
      })

  }

}
