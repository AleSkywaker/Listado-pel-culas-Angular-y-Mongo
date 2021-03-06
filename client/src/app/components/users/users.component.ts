import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FollowService } from './../../service/follow.service';
import { User } from '../../models/users';
import { Follow } from '../../models/follow';
import { GLOBAL } from './../../service/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, FollowService]
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
    private _userService: UserService,
    private _followService: FollowService
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

  followUser(userSeguido) {
    let follow = new Follow('', this.identity._id, userSeguido)

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response.follow) {
          this.status = 'error'
        } else {
          this.status = 'success'
          this.follows.push(userSeguido)
          this.getCounters()
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

  unFollowUser(userSeguido) {
    this._followService.deleteFollow(this.token, userSeguido).subscribe(
      response => {
        console.log("ere", response)
        let search = this.follows.indexOf(userSeguido)
        if (search != -1) {
          this.follows.splice(search, 1)
        }
        this.getCounters()
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = "error"
        }
      }
    )
  }

  getCounters() {
    this._userService.getCounters().subscribe((response) => {
      localStorage.setItem('stats', JSON.stringify(response))
    }, (error) => {
      console.log(<any>error)
    })
  }

}
