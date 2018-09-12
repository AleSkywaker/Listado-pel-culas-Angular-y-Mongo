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
  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    console.log("usuario a registrar", user);

    return this._http.post(this.url + '/save-user', params, { headers: headers })
  }

}
