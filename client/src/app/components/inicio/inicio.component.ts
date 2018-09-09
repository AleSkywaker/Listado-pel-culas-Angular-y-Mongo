import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public tooltip: boolean;
  public tooltipName;

  constructor(
    private _router: Router) {
    this.tooltip = true;
    this.tooltipName = "cerrar"
  }

  ngOnInit() {

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
    this._router.navigate(['/listado', pelicula])
  }

  detalles(id) {
    this._router.navigate(['/pelicula', id])
    console.log("hola", id);
  }

}
