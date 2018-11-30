import { UserService } from "./../../service/user.service";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { PeliculaService } from "../../service/pelicula.service";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import "rxjs/add/operator/map";
import { DOCUMENT } from "@angular/common";
import * as $ from "jquery";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-mispeliculas",
  templateUrl: "./mispeliculas.component.html",
  styleUrls: ["./mispeliculas.component.css"]
})
export class MispeliculasComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  mispelis;
  starsTotal = 5;
  points;
  pelis;
  starsPercetaje;
  token;
  identity;
  pelicula;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private _peliculaService: PeliculaService,
    private _router: Router,
    private _userService: UserService,
    private _modalService: NgbModal,
    @Inject(DOCUMENT) private document: any
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 25,
      order: [[5, "desc"]]
    };
    this._peliculaService.getMisPeliculas(this.token).subscribe(data => {
      if (data) {
        this.mispelis = data.pelisbuenas;
        console.log(this.mispelis);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      }
    });
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    $("#myModal").on("shown.bs.modal", function() {
      $("#myInput").trigger("focus");
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getPelis() {
    this._peliculaService.getMisPeliculas(this.token).subscribe(data => {
      if (data) {
        this.mispelis = data.pelisbuenas;
        console.log(this.mispelis);
      }
    });
  }

  hazalgo(id) {
    // this.document.location.href = "https://www.imdb.com/title/" + id;
    this._router.navigate(["/inicio/mipelicula", id]);
  }

  borrarPeli(id) {
    this._peliculaService.deleteMovie(id).subscribe(data => {
      console.log(data);
    });
    this.getPelis();
    this._modalService.dismissAll();
  }
  open(peli, modal) {
    this.pelicula = peli;
    this._modalService.open(modal);
  }
  cierraModal() {
    this._modalService.dismissAll();
  }
}
