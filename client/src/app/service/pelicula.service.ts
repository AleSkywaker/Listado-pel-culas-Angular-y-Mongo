import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environmentt';



@Injectable()
export class PeliculaService implements OnInit {

  public apikey = environment.apikey;
  constructor() { }

  ngOnInit() {
    console.log(this.apikey);
  }

}
