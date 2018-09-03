import { Component, OnInit } from '@angular/core';
import { PeliculaService } from './../service/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public pelicula: any;
  public message: String;
  public status: String;
  public errorClass;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _peliculaService: PeliculaService,
    private _router: Router
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._peliculaService.getDetallePelicula(params.id).subscribe(data => {
        this.pelicula = data;
        if (this.pelicula.Type == 'series') {
          this.pelicula.Type = 'de la serie'
        }
        if (this.pelicula.Type == 'movie') {
          this.pelicula.Type = 'de la pelicula'
        }
        if (this.pelicula.Type == 'game') {
          this.pelicula.Type = 'del juego'
        }
        console.log("Constructor", this.pelicula);
      })

    })
  }

  ngOnInit() {
    this.errorClass = false;
  }
  grabarPeli(id, puntos) {
    this._peliculaService.getDetallePelicula(id).subscribe(data => {
      this.pelicula = data;
      this.pelicula.puntos = puntos;
      this._peliculaService.guardarPelicula(this.pelicula).subscribe((data) => {
        this.status = "success";
        this.message = data.message;
        this._router.navigate(['mispeliculas'])
      },
        err => {
          this.status = "error";
          this.message = err.error.message;
          if (this.message == 'Debes indicar tu puntos') {
            this.errorClass = true;
          }
        })
    })
  }
}


