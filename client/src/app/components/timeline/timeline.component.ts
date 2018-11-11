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
  public itemsPerPage;

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

  getPublications(page, adding = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        console.log(response)
        if (response.publications) {
          this.itemsPerPage = response.items_per_page;
          this.pages = response.pages;
          this.total = response.total_items;

          if (!adding) {
            this.publications = response.publications;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({ scrollTop: $('body').prop('scrollHeight') }, 500)
          }

          if (page > this.pages) {
            this._router.navigate(['/inicio/timeline'])
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

  public noMore = false;
  viewMore() {
    this.page += 1;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getPublications(this.page, true)
  }

}
