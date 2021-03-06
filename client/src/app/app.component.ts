import { UserService } from "./service/user.service";
import { Component, OnInit, DoCheck } from "@angular/core";
import { WebsocketService } from "./service/websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: String;
  public identity;

  constructor(
    private _userService: UserService,
    public _wsService: WebsocketService
  ) {
    this.title = "Red Social";
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();

    // console.log("identidad desde app.component", this.identity);
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    // console.log("algo cambio", this.identity);
  }
}
