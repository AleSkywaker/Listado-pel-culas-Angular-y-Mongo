import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class PeliculaService implements OnInit {

  public apikey = environment.apikey;
  public url = 'http://www.omdbapi.com/?s=';
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    console.log(this.apikey);
  }

  getPeliculas(pelis): Observable<any> {

    return this._http.get(this.url + pelis + '&apikey=' + this.apikey);

  }

}
