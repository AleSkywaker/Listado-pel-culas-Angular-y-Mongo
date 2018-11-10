import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './../../service/global';
import { PeliculaService } from './../../service/pelicula.service';
import { UserService } from '../../service/user.service';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../service/publication.service';
@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  providers: [PublicationService]
})
export class PublicacionesComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public peliFavorita;
  public publication: Publication;
  constructor(
    private _userService: UserService,
    private _peliculaService: PeliculaService,
    private _publicationService: PublicationService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("", "", "", "", this.identity._id);
  }

  ngOnInit() {
    this.getMyFavoriteMovie()
    this.getCounters()
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

  getCounters() {
    this._userService.getCounters().subscribe((response) => {
      localStorage.setItem('stats', JSON.stringify(response))
    }, (error) => {
      console.log(<any>error)
    })
  }
}
