import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { PeliculaService } from './service/pelicula.service';


@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // cargamos el módulo en el array de imports
    FormsModule
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
