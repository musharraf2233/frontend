import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "../_services/user-auth.service";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { LoaderService } from "../loader.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  isWebScreen: Observable<boolean>;
  isMobScreen: Observable<boolean>;
  show = false;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private breakpointObserver: BreakpointObserver,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isWebScreen = this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large])
      .pipe(map(({ matches }) => matches));

    this.isMobScreen = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));
  }
  toggleNav(nav: any) {
    if (nav.opened) {
      nav.close();
    } else {
      nav.open();
    }
  }

  onActive() {
    window.scroll(0, 0);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(["/"]);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }
}
