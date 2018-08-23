import { Component, OnInit, ViewChild } from '@angular/core';
import { PeliculaService } from '../service/pelicula.service';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mispeliculas',
  templateUrl: './mispeliculas.component.html',
  styleUrls: ['./mispeliculas.component.css']
})

export class MispeliculasComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  mispelis;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;

  constructor(private _peliculaService: PeliculaService) {
  }

  ngOnInit() {
    this.getPelis()
  }

  getPelis() {
    this._peliculaService.getMisPeliculas().subscribe(data => {
      if (data) {
        // this.mispelis = data.pelisbuenas;
        this.dataSource = data.pelisbuenas;
        this.dataSource.sort = this.sort;
        console.log(this.mispelis);
      }
    });
  }
}
