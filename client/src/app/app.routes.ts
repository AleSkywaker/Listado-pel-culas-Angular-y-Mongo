import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


import { BuscadorComponent } from '../app/buscador/buscador.component';
import { PeliculaComponent } from './pelicula/pelicula.component';



const routes: Routes = [
  { path: 'buscador', component: BuscadorComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: "**", component: BuscadorComponent }

  // { path: '**', component: PageNotFoundComponent },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];


export const APP_ROUITNG: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
