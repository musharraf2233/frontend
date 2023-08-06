import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { map } from "rxjs/operators";
import { URL } from "url";
// import { MediaObserver, MediaChange } from "@angular/flex-layout";
// import { Subscription } from "rxjs";
// import { map } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ThePerfumeStore";

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title + this.titleService.getTitle());
    console.log(URL);
  }
}
