import { Injectable } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/users';
import { Follow } from '../models/follow';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FollowService {

  public url: string;

  constructor(private _http: HttpClient) {

  }

}