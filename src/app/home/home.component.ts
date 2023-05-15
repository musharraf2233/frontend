import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ImageProcessingService } from "../image-processing.service";
import { Product } from "../_model/product.model";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  pageNumber: number = 0;

  productDetails = [];

  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
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

  mainCarousel = [
    { path: "../../assets/images/carousel/2.jpg" },
    { path: "../../assets/images/carousel/1.jpg" },
    { path: "../../assets/images/carousel/2.jpg" },
    { path: "../../assets/images/carousel/2.jpg" },
  ];
}
