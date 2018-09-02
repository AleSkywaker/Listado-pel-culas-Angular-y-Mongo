import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUITNG } from './app.routes'

// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

//DataTable
import { DataTablesModule } from 'angular-datatables';

//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PeliculaService } from './service/pelicula.service';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { MispeliculasComponent } from './mispeliculas/mispeliculas.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoPelisComponent } from './listado-pelis/listado-pelis.component';
import { MiPeliculaComponent } from './mi-pelicula/mi-pelicula.component';


@NgModule({
  declarations: [
    AppComponent,
    PeliculaComponent,
    MispeliculasComponent,
    InicioComponent,
    ListadoPelisComponent,
    MiPeliculaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // cargamos el módulo en el array de imports
    FormsModule,
    APP_ROUITNG,
    DataTablesModule,
    NgbModule
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
