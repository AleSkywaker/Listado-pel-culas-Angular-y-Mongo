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
  public data;

  constructor(private _userService: UserService) {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.getCounters(this.id);
    d3.select("h1").style("color", "red");
    d3.selectAll("rect:nth-child(even)").style("fill", "cyan");
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        this.data = response.stats;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
