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
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { MispeliculasComponent } from './components/mispeliculas/mispeliculas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoPelisComponent } from './components/listado-pelis/listado-pelis.component';
import { MiPeliculaComponent } from './components/mi-pelicula/mi-pelicula.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { EditarperfilComponent } from './components/editarperfil/editarperfil.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MomentModule } from 'angular2-moment';



@NgModule({
  declarations: [
    AppComponent,
    PeliculaComponent,
    MispeliculasComponent,
    InicioComponent,
    ListadoPelisComponent,
    MiPeliculaComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    EditarperfilComponent,
    PublicacionesComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // cargamos el módulo en el array de imports
    FormsModule,
    APP_ROUITNG,
    DataTablesModule,
    NgbModule,
    MomentModule
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
