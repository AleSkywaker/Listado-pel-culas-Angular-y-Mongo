import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Rutas
import { APP_ROUITNG } from './app.routes'

// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { PeliculaService } from './service/pelicula.service';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { MispeliculasComponent } from './mispeliculas/mispeliculas.component';
import { DataTableComponent } from './component/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    PeliculaComponent,
    MispeliculasComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // cargamos el módulo en el array de imports
    FormsModule,
    APP_ROUITNG,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
