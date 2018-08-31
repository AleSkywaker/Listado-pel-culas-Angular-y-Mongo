import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


import { PeliculaComponent } from './pelicula/pelicula.component';
import { MispeliculasComponent } from './mispeliculas/mispeliculas.component';
import { ListadoPelisComponent } from './listado-pelis/listado-pelis.component';



const routes: Routes = [
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'listado/:pelicula', component: ListadoPelisComponent },
  { path: 'mispeliculas', component: MispeliculasComponent },
  { path: "**", component: MispeliculasComponent }

  // { path: '**', component: PageNotFoundComponent },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];


export const APP_ROUITNG: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
