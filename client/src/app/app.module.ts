import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUITNG } from './app.routes'

// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { PeliculaService } from './service/pelicula.service';
import { PeliculaComponent } from './pelicula/pelicula.component';


@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    PeliculaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // cargamos el módulo en el array de imports
    FormsModule,
    APP_ROUITNG
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
