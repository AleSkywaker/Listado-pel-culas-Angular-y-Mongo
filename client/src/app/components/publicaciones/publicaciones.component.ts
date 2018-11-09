import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './../../service/global';
import { PeliculaService } from './../../service/pelicula.service';
import { UserService } from '../../service/user.service';
import { Publication } from '../../models/publication';
@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public peliFavorita;

  constructor(
    private _userService: UserService,
    private _peliculaService: PeliculaService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;

  }

  ngOnInit() {


    this._peliculaService.miMejorPelicula(this.token).subscribe(
      response => {
        this.peliFavorita = response.mipelifavorita[0];
        console.log("desde controller", this.peliFavorita);
      }
    )
  }



}
