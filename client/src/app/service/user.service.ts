import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';


@Injectable()
export class UserService implements OnInit {

  public url: String;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {

  }
  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    console.log("usuario a registrar", user);

    return this._http.post(this.url + '/save-user', params, { headers: headers })
  }
  singUp(user: User, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/login', params, { headers: headers })
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token != undefined) {
      this.token = token;
    } else {
      this.token = null;
    }
    return token;
  }
}
