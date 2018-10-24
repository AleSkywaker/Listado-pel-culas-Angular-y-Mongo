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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Gente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {

  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if (!page) {
        page = 1;
      } else {
         this.next_page = page +1;
         this.prev_page = page-1;

         if(this.prev_page <= 0){
           this.prev_page =1;
         }
      }


      //Devolver listado usuarios
    })
  }

}
