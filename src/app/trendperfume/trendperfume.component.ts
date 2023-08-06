import { Component, OnInit } from "@angular/core";
import { Product } from "../_model/product.model";
import { HttpErrorResponse } from "@angular/common/http";
import { map, takeUntil } from "rxjs/operators";
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from "@angular/cdk/layout";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { ImageProcessingService } from "../image-processing.service";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-trendperfume",
  templateUrl: "./trendperfume.component.html",
  styleUrls: ["./trendperfume.component.css"],
})
export class TrendperfumeComponent implements OnInit {
  pageNumber: number = 0;

  productDetails = [];

  brands = [];

  pages: Array<number>;

  cols: string;
  slide: string;
  destroyed = new Subject<void>();
  showLoadButton = false;

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

  setPage(i, event: any) {
    event.preventDefault();
    this.pages = i;
    this.getAllProducts;
  }

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
    this.isMobScreen = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));
  }
  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKey: string = "") {
    this.productService
      .getByTrends()
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
          console.log(resp.length);

          if (resp.length == 8) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
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
    this.getAllProducts();
  }

  showProductDetails(productId) {
    this.router.navigate(["/productViewDetails", { productId: productId }]);
  }

  public getAllBrands() {
    this.productService.getAllBrands().subscribe(
      (res: Product[]) => {
        console.log(res);

        res.forEach((p) => this.brands.push(p));
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
