import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../service/pelicula.service';


@Component({
  selector: 'app-mi-pelicula',
  templateUrl: './mi-pelicula.component.html',
  styleUrls: ['./mi-pelicula.component.css']
})
export class MiPeliculaComponent implements OnInit {

  public pelicula: any;
  public message: String;
  public status: String;
  public errorClass;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _peliculaService: PeliculaService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._peliculaService.getMiPelicula(params.id).subscribe(peli => {
        this.pelicula = peli.pelicula;
        console.log("pelicula type", this.pelicula);
        if (this.pelicula.type == 'series') {
          this.pelicula.type = 'de la serie'
        }
        if (this.pelicula.type == 'movie') {
          this.pelicula.type = 'de la pelicula'
        }
        if (this.pelicula.type == 'game') {
          this.pelicula.type = 'del juego'
        }
      })
    })

  }

  ngOnInit() {
  }

}
