import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';


@Injectable()
export class PeliculaService implements OnInit {

  public apikey = environment.apikey;
  public url = 'http://www.omdbapi.com/?s=';
  public urlDetail = 'http://www.omdbapi.com/?i=';
  public token;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    console.log(this.apikey);
  }

  getPeliculas(pelis): Observable<any> {
    return this._http.get(this.url + pelis + '&apikey=' + this.apikey);
  }

  getDetallePelicula(id) {
    return this._http.get(this.urlDetail + id + '&apikey=' + this.apikey);
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

    return this._http.get('http://localhost:3600/api/mejor-pelicula', { headers: headers });
  }

  getMisPeliculas(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', token)
    return this._http.get('http://localhost:3600/api/pelis', { headers: headers })
  }
  deleteMovie(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.delete('http://localhost:3600/api/eliminarpeli/' + id, { headers: headers })
  }
  getMiPelicula(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get('http://localhost:3600/api/pelicula/' + id, { headers: headers })
  }
  getPeliculasSeguido(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', token);
    return this._http.get('/peliculas-seguidos/' + id, { headers: headers })
  }
}
