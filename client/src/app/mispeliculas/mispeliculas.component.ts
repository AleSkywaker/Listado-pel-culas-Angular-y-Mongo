import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PeliculaService } from '../service/pelicula.service';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';


@Component({
  selector: 'app-mispeliculas',
  templateUrl: './mispeliculas.component.html',
  styleUrls: ['./mispeliculas.component.css']
})

export class MispeliculasComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  mispelis;
  starsTotal = 5;
  points;
  pelis;
  starsPercetaje;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(private _peliculaService: PeliculaService,
    private _router: Router,
    @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    }
    this._peliculaService.getMisPeliculas().subscribe(data => {
      if (data) {
        this.mispelis = data.pelisbuenas;
        console.log(this.mispelis);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      }
    });
  };
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  getPelis() {
    this._peliculaService.getMisPeliculas().subscribe(data => {
      if (data) {
        this.mispelis = data.pelisbuenas;
        console.log(this.mispelis);
      }
    });
  }

  hazalgo(id) {
    // this.document.location.href = "https://www.imdb.com/title/" + id;
    this._router.navigate(['/pelicula', id])
  }

  borrarPeli(id) {
    console.log("Esto es el id", id);
    this._peliculaService.deleteMovie(id).subscribe(data => {
      console.log(data);
      this.getPelis()
    })
  }


}
