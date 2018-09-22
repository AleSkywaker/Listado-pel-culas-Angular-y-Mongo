import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../service/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-pelis',
  templateUrl: './listado-pelis.component.html',
  styleUrls: ['./listado-pelis.component.css']
})
export class ListadoPelisComponent implements OnInit {

  private peliculas = [];
  constructor(
    private _peliService: PeliculaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this._peliService.getPeliculas(params.pelicula).subscribe(data => {
        this.peliculas = data.Search;
        console.log("Peliculas", this.peliculas)
      })
    })
  }
  detalles(id) {
    this._router.navigate(['/inicio/pelicula', id])
  }
}
