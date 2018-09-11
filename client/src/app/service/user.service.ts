import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';


@Injectable()
export class UserService implements OnInit {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {

  }
  register(user_to_register){
    console.log("usuario a registrar", user_to_register);
  }

}
