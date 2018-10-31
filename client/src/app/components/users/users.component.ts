import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../models/users';
import { GLOBAL } from './../../service/global';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status;
  public total;
  public pages;
  public users: User[];
  public url;
  public follows;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Gente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.actualPage()
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if (!page) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }
      //Devolver listado usuarios
      this.getUsers(page)
    })
  }

  getUsers(page) {
    this._userService.getUsers(page).subscribe(
      response => {
        if (!response.usuarios) {
          this.status = "error"
        } else {
          this.total = response.totalusuarios;
          this.users = response.usuarios;
          this.pages = response.paginas;
          this.follows = response.usuariosSeguidos;
          console.log(this.follows)
          if (page > this.pages) {
            this._router.navigate(['/inicio/usuarios', 1])
          }

          // response.usuarioMeSiguen
          // response.usuariosSeguidos
        }

      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = "error"
        }
      }
    )
  }

  public followUserOver;

  mouseEnter(user) {
    this.followUserOver = user;
  }
  mouseLeave(user) {
    this.followUserOver = 0;
  }

}
