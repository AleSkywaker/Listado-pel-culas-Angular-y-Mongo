import { PeliculaService } from './../service/pelicula.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public pelicula: any;
  public message: String;
  public status: String;

  constructor(private _activatedRoute: ActivatedRoute,
    private _peliculaService: PeliculaService) {
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
  }
  grabarPeli(id, puntos) {
    console.log("puntos", puntos)
    if (puntos == undefined || puntos == "" || puntos == null) {
      this.status = "error";
      this.message = "Debes puntuar la pelicula antes de guardar"
      return
    }
    this._peliculaService.getDetallePelicula(id).subscribe(data => {
      this.pelicula = data;
      this.pelicula.puntos = puntos;
      this._peliculaService.guardarPelicula(this.pelicula).subscribe(data => {
        console.log("que es::", data);
      })
      this.status = "success";
      this.message = "La pelicula se ha guardado correctamente!!!"
    })
  }
}


