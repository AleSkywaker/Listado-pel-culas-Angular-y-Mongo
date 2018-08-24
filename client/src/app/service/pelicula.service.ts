import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class PeliculaService implements OnInit {

  public apikey = environment.apikey;
  public url = 'http://www.omdbapi.com/?s=';
  public urlDetail = 'http://www.omdbapi.com/?i=';
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

  guardarPelicula(pelicula): Observable<any> {

    let params = JSON.stringify(pelicula);
    let headers = new HttpHeaders().set("Content-type", "application/json");

    return this._http.post('http://localhost:3600/api/grabarpeli', params, { headers: headers });
  }

  getMisPeliculas(): Observable<any> {
    return this._http.get('http://localhost:3600/api/pelis')
  }

}
