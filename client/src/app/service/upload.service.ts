import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class UploadService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      if (files) {
        for (var i = 0; i < files.length; i++) {
          formData.append(name, files[i], files[i].name)
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(JSON.parse(xhr.response))
            } else {
              reject(xhr.response)
            }
          }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData)
      }
    })
  }

  // makeFilesRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string): Observable<any> {
  //   const formData: FormData = new FormData();

  //   for (var i = 0; i < files.length; i++) {
  //     formData.append(name, files[i], files[i].name);
  //   }
  //   let headers = new HttpHeaders().set('Authorization', token);
  //   return this._http.post(url, formData, { headers: headers });
  // }

}