import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from './../../service/user.service';
import { UploadService } from './../../service/upload.service';
import { GLOBAL } from './../../service/global';
@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css'],
  providers: [UploadService]
})
export class EditarperfilComponent implements OnInit {

  public titulo: String;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;
  public urlsImagesDefault: Array<any>;
  public message: String;
  public url: string;
  public astronautmonkey: string;
  public astronauta3: string;


  public budista: string;
  public japo: string;

  public chico1: string;
  public chico2: string;
  public chica10: string;
  public chica8: string;
  public chica41: string;
  public chica22: string;
  public chica15: string;
  public unicorn: string;
  public mono: string;
  public chica19: string;
  public chica45: string;

  public virtualgirl: String;
  public morena: String;
  constructor(
    private _userSerivice: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.titulo = "Editar perfil";
    this.token = this._userSerivice.getToken();
    this.user = this._userSerivice.getIdentity();
    this.identity = this.user;
    this.url = GLOBAL.url;
    this.virtualgirl = "virtualgirl.jpg";
    this.morena = "morena.jpg";
    this.astronautmonkey = "astronautmonkey.jpg";
    this.astronauta3 = "astronauta3.jpg";
    this.budista = "budista.png";
    this.japo = "japo.jpg";

    this.chico1 = "chico1.jpg";
    this.chico2 = "chico2.png";
    this.chica10 = "chica10.jpg";
    this.chica8 = "chica8.jpg";
    this.chica41 = "chica41.png";
    this.chica22 = "chica22.jpg";
    this.chica15 = "chica15.jpg";
    this.unicorn = "unicorn.jpg";
    this.mono = "mono.jpg";
    this.chica19 = "chica19.png";
    this.chica45 = "chica45.jpg";








    this.urlsImagesDefault = [
      { 'urlImage': '../../../assets/userdefaultimage/chico2.png', 'value': 1 },
      { 'urlImage': '../../../assets/userdefaultimage/chico1.jpg', 'value': 2 },
      { 'urlImage': '../../../assets/userdefaultimage/astronautmonkey.jpg', 'value': 3 },
      { 'urlImage': '../../../assets/userdefaultimage/atronauta3.jpg', 'value': 4 },
      { 'urlImage': '../../../assets/userdefaultimage/budista.png', 'value': 5 },
      { 'urlImage': '../../../assets/userdefaultimage/chica42.png', 'value': 6 },
    ]
  }

  ngOnInit() {
    $('.img-check').click(function (e) {
      $('.img-check').not(this).removeClass('check')
        .siblings('input').prop('checked', false);
      $(this).addClass('check')
        .siblings('input').prop('checked', true);
    });
  }
  onSubmit(form) {
    console.log("usir", this.user);
    console.log("formis", form);
    this._userSerivice.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
          this.message = response.message;
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user))
          this.identity = this.user;
          this.message = response.message;
          console.log("pasa por aqui", response)
          this.user.image = response.user.image;
          localStorage.setItem('identity', JSON.stringify(this.user));
          //Subida imagen de usuario



        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
          this.message = error;
        }
      }
    )

  }
  clak(v) {
    console.log("clak", v)
    this.user.image = v;
  }

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log("this file", this.filesToUpload)



    this._uploadService.makeFileRequest(this.url + '/upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
      .then((result: any) => {
        console.log("resultado", result);
        this.user.image = result.user.image;
        localStorage.setItem('identity', JSON.stringify(this.user));
        // location.reload();
      })


  }

}
