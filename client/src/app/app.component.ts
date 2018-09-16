import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public titulo: String;
  public identity;

  constructor(private _userService: UserService) {
    this.titulo = "Peliculas"
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    console.log("Peliculas", this.identity)
  }
}
