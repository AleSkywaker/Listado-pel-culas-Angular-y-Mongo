import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';
import { Publication } from '../models/publication';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PublicationService implements OnInit {
  public url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }
  ngOnInit() {

  }
  addPublication(token, publi): Observable<any> {
    let params = JSON.stringify(publi);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token)

    return this.http.post(this.url + '/guardar-publi', params, { headers: headers })
  }
  getPublications(token, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token)
    return this.http.get(this.url + '/publications/' + page, { headers: headers })
  }
  getMyPublications(token, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token)
    return this.http.get(this.url + '/mis-publications/' + page, { headers: headers })
  }
  deletePublication(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token)
    return this.http.delete(this.url + '/publication/' + id, { headers: headers })

  }
}