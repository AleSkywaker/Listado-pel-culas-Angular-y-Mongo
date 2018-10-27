import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../service/global'
import * as $ from 'jquery';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public tooltip: boolean;
  public tooltipName;
  public identity;
  public url: String;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.tooltip = true;
    this.tooltipName = "cerrar";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this._userService.cost.subscribe(image => {
      this.identity = this._userService.getIdentity();
    })
  }

  abrirSidebar() {
    this.tooltip ? this.tooltip = false : this.tooltip = true;
    if (this.tooltip) {
      this.tooltipName = "cerrar"
    } else {
      this.tooltipName = "abrir"
    }

    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');
    $(this).toggleClass('active');
    console.log("object", this.tooltip);
  }

  onFormSubmit(f) {
    let pelicula = f.value.nombrePeli;
    this._router.navigate(['/inicio/listado', pelicula])
  }

  detalles(id) {
    this._router.navigate(['/inicio/pelicula', id])
    console.log("hola", id);
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate([''])
  }

}
