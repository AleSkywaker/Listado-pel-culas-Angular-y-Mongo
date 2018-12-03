import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

    d3.select("h1").style("color", "red");
    d3.selectAll("rect:nth-child(even)").style("fill", "cyan");
  }
  doit() {
    d3.selectAll("rect").style("fill", "red");
    d3.selectAll("rect").style("stroke-width", function(d, i) {
      return i * 3;
    });
  }
}
