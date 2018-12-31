import { Component, OnInit } from "@angular/core";

import { UserService } from "./../../service/user.service";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}
}
