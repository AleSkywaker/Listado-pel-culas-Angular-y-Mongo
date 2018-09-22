import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { MispeliculasComponent } from './components/mispeliculas/mispeliculas.component';
import { ListadoPelisComponent } from './components/listado-pelis/listado-pelis.component';
import { MiPeliculaComponent } from './components/mi-pelicula/mi-pelicula.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio', component: InicioComponent, children: [
      { path: 'pelicula/:id', component: PeliculaComponent },
      { path: 'mipelicula/:id', component: MiPeliculaComponent },
      { path: 'listado/:pelicula', component: ListadoPelisComponent },
      { path: 'mispeliculas', component: MispeliculasComponent }

    ]
  },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: InicioComponent }

  // { path: '**', component: PageNotFoundComponent },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];


export const APP_ROUITNG: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
