import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";
import { UserService } from "./../../service/user.service";
@Component({
  selector: "chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  providers: [UserService]
})
export class ChartComponent implements OnInit {
  @Input() id;
  public stats;

  constructor(private _userService: UserService) {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    d3.select("h1").style("color", "red");
    d3.selectAll("rect:nth-child(even)").style("fill", "cyan");
    this.getCounters(this.id);
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        this.stats = response;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
