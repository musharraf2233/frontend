import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ImageProcessingService } from "../image-processing.service";
import { Product } from "../_model/product.model";
import { ProductService } from "../_services/product.service";
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from "@angular/cdk/layout";
import { Observable, Subject, observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  pageNumber: number = 0;

  productDetails = [];

  showLoadButton = false;

  isWideScreen: Observable<boolean>;

  carouselSize: number;
  CarouselWidth: number;
  carouselheight: number;
  carouselMargin: number;
  cells: number;
  destroyed = new Subject<void>();
  currentScreenSize: string;
  displayNameMap = new Map([
    [Breakpoints.XSmall, "XSmall"],
    [Breakpoints.Small, "Small"],
    [Breakpoints.Medium, "Medium"],
    [Breakpoints.Large, "Large"],
    [Breakpoints.XLarge, "XLarge"],
  ]);

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
            console.log(result);

            if (
              this.breakpointObserver.isMatched(Breakpoints.Large) ||
              this.breakpointObserver.isMatched(Breakpoints.Medium)
            ) {
              this.carouselSize = 1000;
              this.CarouselWidth = 150;
              this.carouselheight = 150;
              this.carouselMargin = 65;
              this.cells = 5;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
              this.carouselSize = 700;
              this.CarouselWidth = 130;
              this.carouselheight = 130;
              this.carouselMargin = 60;
              this.cells = 4;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
              this.carouselSize = 1000;
              this.CarouselWidth = 150;
              this.carouselheight = 150;
              this.carouselMargin = 65;
              this.cells = 5;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
              this.carouselSize = 470;
              this.CarouselWidth = 110;
              this.carouselheight = 110;
              this.carouselMargin = 66;
              this.cells = 3;
            }
          }
        }
      });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.isWideScreen = this.breakpointObserver
      .observe(Breakpoints.Medium)
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
      .getAllProducts(this.pageNumber, searchKey)
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
          if (resp.length == 12) {
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

  image = [
    { path: "../../assets/images/brand/1.png" },
    { path: "../../assets/images/brand/2.png" },
    { path: "../../assets/images/brand/3.png" },
    { path: "../../assets/images/brand/4.png" },
    { path: "../../assets/images/brand/5.png" },
    { path: "../../assets/images/brand/6.png" },
    { path: "../../assets/images/brand/7.png" },
    { path: "../../assets/images/brand/8.png" },
    { path: "../../assets/images/brand/9.png" },
    { path: "../../assets/images/brand/10.png" },
    { path: "../../assets/images/brand/11.png" },
    { path: "../../assets/images/brand/12.png" },
  ];

  slides = [
    { id: 1, img: "../../assets/images/carousel/2.jpg" },
    { id: 2, img: "../../assets/images/carousel/1.jpg" },
    { id: 3, img: "../../assets/images/carousel/2.jpg" },
    { id: 4, img: "../../assets/images/carousel/1.jpg" },
    { id: 5, img: "../../assets/images/carousel/2.jpg" },
    { id: 6, img: "../../assets/images/carousel/1.jpg" },
    { id: 6, img: "../../assets/images/carousel/2.jpg" },
  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    stagePadding: 50,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    animateOut: "animate__animated animate__fadeOut",
    animateIn: "animate__animated animate__fadeIn",
    navText: [
      '<i class="bi bi-caret-left-fill"></i>',
      '<i class="bi bi-caret-right-fill"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
