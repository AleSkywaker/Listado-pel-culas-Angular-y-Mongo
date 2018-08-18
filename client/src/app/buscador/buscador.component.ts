import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../service/pelicula.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  private peliculas = [];

  constructor(private _peliService: PeliculaService) { }

  ngOnInit() {
  }

  onFormSubmit(f) {
    let pelicula = f.value.pelis;
    this._peliService.getPeliculas(pelicula).subscribe(data => {
      this.peliculas = data.Search;
      console.log("Peliculas", this.peliculas)
    })

  }
}
