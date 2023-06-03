import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
// import { MediaObserver, MediaChange } from "@angular/flex-layout";
// import { Subscription } from "rxjs";
// import { map } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "jwt-youtube-ui";
}
