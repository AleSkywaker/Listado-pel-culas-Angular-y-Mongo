import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';
import { Follow } from '../models/follow';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FollowService implements OnInit {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  ngOnInit(): void {
    console.log("follow component load");
    // throw new Error("Method not implemented.");
  }
  addFollow(token, follow): Observable<any> {
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token)

    return this._http.post(this.url + '/seguir-usuario', params, { headers: headers });
  }

  deleteFollow(token, id) {
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token)

  }
}