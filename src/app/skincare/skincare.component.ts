import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ProductService } from "../_services/product.service";
import { ImageProcessingService } from "../image-processing.service";
import { Router } from "@angular/router";
import { map, takeUntil } from "rxjs/operators";
import { Product } from "../_model/product.model";
import { HttpErrorResponse } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-skincare",
  templateUrl: "./skincare.component.html",
  styleUrls: ["./skincare.component.css"],
})
export class SkincareComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 4;

  productDetails = [];

  showLoadButton = false;

  cols: string;
  slide: string;
  destroyed = new Subject<void>();

  colsMap = new Map([
    [Breakpoints.XSmall, "2"],
    [Breakpoints.Small, "2"],
    [Breakpoints.Medium, "4"],
    [Breakpoints.Large, "4"],
    [Breakpoints.XLarge, "5"],
  ]);

  sideMap = new Map([
    [Breakpoints.XSmall, "over"],
    [Breakpoints.Small, "over"],
    [Breakpoints.Medium, "side"],
    [Breakpoints.Large, "side"],
    [Breakpoints.XLarge, "side"],
  ]);
  isMobScreen: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.cols = this.colsMap.get(query);
            this.slide = this.sideMap.get(query);
          }
        }
      });
  }
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  ngOnInit(): void {
    this.getAllProductsType();
    this.isMobScreen = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));
  }
  nextPage(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.productDetails = [];
    this.getAllProductsType();
  }
  toggleNav(nav: any) {
    if (nav.opened) {
      nav.close();
    } else {
      nav.open();
    }
  }
  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProductsType(searchkeyword);
  }

  public getAllProductsType(searchKey: string = "") {
    this.productService
      .getAllProductsType(this.pageNumber, this.pageSize, searchKey, "skincare")
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          if (resp.length != 0) {
            this.pageNumber = this.pageNumber + this.pageSize + resp.length;
          }
          resp.forEach((p) => this.productDetails.push(p));
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProductsType();
  }

  showProductDetails(productId) {
    this.router.navigate(["/productViewDetails", { productId: productId }]);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
