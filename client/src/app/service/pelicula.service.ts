import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';


@Injectable()
export class PeliculaService implements OnInit {

  public apikey = environment.apikey;
  public urlOMDB = 'http://www.omdbapi.com/?s=';
  public urlOMDBDetail = 'http://www.omdbapi.com/?i=';
  public token;
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.urlOMDB = GLOBAL.urlOMDB;
    this.urlOMDBDetail = GLOBAL.urlOMDBDetail;
  }

  ngOnInit() {
    console.log(this.apikey);
  }

  getPeliculas(pelis): Observable<any> {
    return this._http.get(this.urlOMDB + pelis + '&apikey=' + this.apikey);
  }

  getDetallePelicula(id) {
    return this._http.get(this.urlOMDBDetail + id + '&apikey=' + this.apikey);
  }

  guardarPelicula(token, pelicula): Observable<any> {

    let params = JSON.stringify(pelicula);
    let headers = new HttpHeaders().set("Content-type", "application/json")
      .set('authorization', token)

    return this._http.post('http://localhost:3600/api/grabarpeli', params, { headers: headers });
  }
  miMejorPelicula(token): Observable<any> {

    let headers = new HttpHeaders().set("Content-type", "application/json")
      .set('authorization', token)

    return this._http.get(this.url + '/mejor-pelicula', { headers: headers });
  }

  getMisPeliculas(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', token)
    return this._http.get(this.url + '/pelis', { headers: headers })
  }
  deleteMovie(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.delete(this.url + '/eliminarpeli/' + id, { headers: headers })
  }
  getMiPelicula(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(this.url + '/pelicula/' + id, { headers: headers })
  }
  getPeliculasSeguido(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', token);
    return this._http.get(this.url + '/peliculas-seguidos/' + id, { headers: headers })
  }
}
