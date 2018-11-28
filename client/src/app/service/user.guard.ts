import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private _router: Router, private _userService: UserService) {}
  canActivate() {
    let identity = this._userService.getIdentity();

    if (!identity) {
      this._router.navigate(["/login"]);
      return false;
    } else if (identity && identity.image == null) {
      this._router.navigate(["/inicio/editar-perfil"]);
      return false;
    } else {
      return true;
    }
  }
}
