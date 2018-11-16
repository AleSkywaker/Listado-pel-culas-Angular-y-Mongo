import { Component, OnInit, AfterContentInit } from '@angular/core';
import { GLOBAL } from './../../service/global';
import { PeliculaService } from './../../service/pelicula.service';
import { UserService } from '../../service/user.service';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../service/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as d3 from "d3";

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  providers: [PublicationService]
})
export class PublicacionesComponent implements OnInit, AfterContentInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public peliFavorita;
  public publication: Publication;
  public publications: Publication[];
  public page;
  constructor(
    private _userService: UserService,
    private _peliculaService: PeliculaService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("", "", "", "", this.identity._id);
    this.page = 1;
  }
  ngAfterContentInit() {
    d3.select('.rolex').style('color', 'red');
  }

  ngOnInit() {
    this.getMyFavoriteMovie()
    this.getCounters()
    this.getMypublications()
  }
  getMyFavoriteMovie() {
    this._peliculaService.miMejorPelicula(this.token).subscribe(
      response => {
        this.peliFavorita = response.mipelifavorita[0];
      }
    )
  }
  onSubmit(form) {
    console.log(this.publication);
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publicacion) {
          this.publication = response.publicacion;
          form.reset();
          this._router.navigate(['/inicio/timeline'])
        } else {
          this.status = 'error';
          setTimeout(() => {
            this.status = ''
          }, 1000);
        }
        this.status = 'success'
        setTimeout(() => {
          this.status = ''
        }, 1000);
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
        if (errorMessage != null) {
          this.status = 'error';
          setTimeout(() => {
            this.status = ''
          }, 1000);
        }
      }
    )
  }
  getMypublications() {
    this._publicationService.getMyPublications(this.token, this.page).subscribe((response) => {
      this.publications = response.publications;
      console.log("this is it my friend", response.publications)
    })
  }


  getCounters() {
    this._userService.getCounters().subscribe((response) => {
      localStorage.setItem('stats', JSON.stringify(response))
    }, (error) => {
      console.log(<any>error)
    })
  }
}
