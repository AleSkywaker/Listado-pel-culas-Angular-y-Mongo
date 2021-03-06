import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/users";
import { Follow } from "../../models/follow";
import { Pelicula } from "../../models/pelicula";
import { FollowService } from "./../../service/follow.service";
import { UserService } from "./../../service/user.service";
import { PeliculaService } from "./../../service/pelicula.service";
import { GLOBAL } from "../../service/global";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: string;
  public url: string;
  public token: string;
  public identity: User;
  public stats;
  public follow: string;
  public peliculasSeguido: Pelicula[];
  public counters;
  public compatibilidad;
  public seguido;
  public siguiendo;
  public id;

  constructor(
    private _userService: UserService,
    private _followService: FollowService,
    private _peliculaService: PeliculaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.titulo = "Perfil de ";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.seguido = false;
    this.siguiendo = false;
  }

  ngOnInit() {
    // this._route.params.subscribe(params => {
    //   console.log("parametros", params)
    //   this._userService.seeCompatibility(params.id).subscribe(data => {
    //     console.log("que es data", data)
    //   })
    // })

    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params["id"];
      this.id = params["id"];
      this.getUser(id);
      this.verCompatibilidad(id);
      this.peliculaSeguido(id, this.token);
      this.getCounters(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
          if (response.siguiendo && response.siguiendo._id) {
            this.siguiendo = true;
          } else {
            this.siguiendo = false;
          }
          if (response.seguido && response.seguido._id) {
            this.seguido = true;
          } else {
            this.seguido = false;
          }
        } else {
          this.status = "error";
        }
      },
      error => {
        console.log(<any>error);
        this.status = "error";
        this._router.navigate(["/perfil", this.identity._id]);
      }
    );
  }

  verCompatibilidad(id) {
    this._userService.seeCompatibility(id).subscribe(
      response => {
        // console.log("ESTO ES COMPATIBLIDAD", response);
      },
      error => {
        console.log(<any>error);
        this.status = "error";
      }
    );
  }

  peliculaSeguido(id, token) {
    this._peliculaService.getPeliculasSeguido(id, token).subscribe(response => {
      this.peliculaSeguido = response.peliculasUsuario;
      // console.log("pelis seguido", this.peliculaSeguido);
    });
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        this.stats = response;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  seguirUsuario(seguido) {
    let seguir = new Follow("", this.identity._id, seguido);

    this._followService.addFollow(this.token, seguir).subscribe(
      response => {
        this.siguiendo = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  dejarDeSeguir(seguido) {
    this._followService.deleteFollow(this.token, seguido).subscribe(
      response => {
        this.siguiendo = false;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  public seguirUsuarioOver;

  mouseEnter(userId) {
    this.seguirUsuarioOver = userId;
  }
  mouseLeave() {
    this.seguirUsuarioOver = 0;
  }
}
