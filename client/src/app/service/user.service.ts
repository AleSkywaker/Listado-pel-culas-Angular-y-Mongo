import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService implements OnInit {

  public url: String;
  public identity: any;
  public token: any;
  public stats: String;
  private image = new BehaviorSubject<any>('');
  cost = this.image.asObservable()

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  changeNav(image) {
    this.image.next(image);
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

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));

    if (stats != undefined) {
      this.stats = stats;
    } else {
      this.stats = null;
    }
    return this.stats;
  }

  getCounters(userId = null) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken())

    if (userId != null) {
      return this._http.get(this.url + '/counters/' + userId, { headers: headers })
    } else {
      return this._http.get(this.url + '/counters/', { headers: headers })
    }
  }
  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken())

    return this._http.put(this.url + '/update-user/' + user._id, params, { headers: headers })
  }

  getUsers(page = null): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken())
    return this._http.get(this.url + '/users/' + page, { headers: headers })
  }
  getUser(id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken())
    return this._http.get(this.url + '/get-user/' + id, { headers: headers })
  }
  seeCompatibility(id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken())
    return this._http.get(this.url + '/compatibilidad/' + id, { headers: headers })
  }

}
