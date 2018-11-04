import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './../../service/global';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  constructor(
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Componente publicaciones cargado", this.identity)
  }

}
