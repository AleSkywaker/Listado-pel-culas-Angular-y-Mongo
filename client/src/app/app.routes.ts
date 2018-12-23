import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { PeliculaComponent } from "./components/pelicula/pelicula.component";
import { MispeliculasComponent } from "./components/mispeliculas/mispeliculas.component";
import { ListadoPelisComponent } from "./components/listado-pelis/listado-pelis.component";
import { MiPeliculaComponent } from "./components/mi-pelicula/mi-pelicula.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { UsersComponent } from "./components/users/users.component";
import { EditarperfilComponent } from "./components/editarperfil/editarperfil.component";
import { PublicacionesComponent } from "./components/publicaciones/publicaciones.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ProfileComponent } from "./components/profile/profile.component";

import { UserService } from "./service/user.service";
import { UserGuard } from "./service/user.guard";
import { ChatComponent } from "./components/chat/chat.component";

const routes: Routes = [
  {
    path: "inicio",
    component: InicioComponent,
    children: [
      { path: "", component: MispeliculasComponent, canActivate: [UserGuard] },
      {
        path: "pelicula/:id",
        component: PeliculaComponent,
        canActivate: [UserGuard]
      },
      {
        path: "timeline",
        component: TimelineComponent,
        canActivate: [UserGuard]
      },
      { path: "editar-perfil", component: EditarperfilComponent },
      {
        path: "mipelicula/:id",
        component: MiPeliculaComponent,
        canActivate: [UserGuard]
      },
      {
        path: "listado/:pelicula",
        component: ListadoPelisComponent,
        canActivate: [UserGuard]
      },
      {
        path: "mispeliculas",
        component: MispeliculasComponent,
        canActivate: [UserGuard]
      },
      { path: "usuarios", component: UsersComponent, canActivate: [UserGuard] },
      { path: "chat", component: ChatComponent, canActivate: [UserGuard] },
      {
        path: "publicaciones",
        component: PublicacionesComponent,
        canActivate: [UserGuard]
      },
      { path: "usuarios/:page", component: UsersComponent },
      { path: "perfil/:id", component: ProfileComponent }
    ]
  },
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: InicioComponent, canActivate: [UserGuard] }

  // { path: '**', component: PageNotFoundComponent },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUITNG: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
