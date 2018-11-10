import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { GLOBAL } from './../../service/global';
import { UserService } from '../../service/user.service';
import { PublicationService } from '../../service/publication.service';
import { PeliculaService } from './../../service/pelicula.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit {
  public titulo: string;
  public identity;
  public token;
  public url: string;
  public status: string;
  public page;
  public pages;
  public total;
  public publications: Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.titulo = "Publicaciones de mis amigos";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit() {
    console.log("Timeline cargado")
    this.getPublications(this.page)
  }

  getPublications(page) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        console.log(response)
        if (response.publications) {
          this.publications = response.publications;
          this.pages = response.pages;
          this.total = response.total_items;

          if (page > this.pages) {
            this._router.navigate(['/inicio/timeline/1'])
          }
        } else {
          this.status = 'error'
        }
      },
      error => {
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

}
