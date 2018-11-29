import { UserService } from "./../../service/user.service";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { PeliculaService } from "../../service/pelicula.service";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import "rxjs/add/operator/map";
import { DOCUMENT } from "@angular/common";
import * as $ from "jquery";

import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-modal-confirm",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Profile deletion</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >Are you sure you want to delete
          <span class="text-primary">"John Doe"</span> profile?</strong
        >
      </p>
      <p>
        All information associated to this user profile will be permanently
        deleted.
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: "ngbd-modal-confirm-autofocus",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Profile deletion</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >Are you sure you want to delete
          <span class="text-primary">"John Doe"</span> profile?</strong
        >
      </p>
      <p>
        All information associated to this user profile will be permanently
        deleted.
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-danger"
        (click)="modal.close('Ok click'); dowaht()"
      >
        Okis
      </button>
    </div>
  `
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
  dowaht() {
    alert("hola");
  }
}

const MODALS = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};
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
    console.log("Balssss", this.identity);
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
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
    console.log("Esto es el id", id);
    this._peliculaService.deleteMovie(id).subscribe(data => {
      console.log(data);
      this.getPelis();
    });
  }

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
}
