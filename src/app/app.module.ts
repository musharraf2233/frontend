import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { InterceptorService } from "./interceptor.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./_auth/auth.guard";
import { AuthInterceptor } from "./_auth/auth.interceptor";
import { UserService } from "./_services/user.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { DragDirective } from "./drag.directive";
import { ShowProductDetailsComponent } from "./show-product-details/show-product-details.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { ShowProductImagesDialogComponent } from "./show-product-images-dialog/show-product-images-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ProductViewDetailsComponent } from "./product-view-details/product-view-details.component";
import { BuyProductComponent } from "./buy-product/buy-product.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { RegisterComponent } from "./register/register.component";
import { CartComponent } from "./cart/cart.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FooterComponent } from "./footer/footer.component";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { MatSidenavModule } from "@angular/material/sidenav";
import { StoreComponent } from "./store/store.component";
import {
  NgbModule,
  NgbCarouselModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { MatSelectModule } from "@angular/material/select";
import { MenComponent } from "./men/men.component";
import { WomenComponent } from "./women/women.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LayoutModule } from "@angular/cdk/layout";
import { MatMenuModule } from "@angular/material/menu";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { UnisexComponent } from "./unisex/unisex.component";
import { SkincareComponent } from "./skincare/skincare.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BestsellerComponent } from "./bestseller/bestseller.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TrendperfumeComponent } from "./trendperfume/trendperfume.component";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ShowProductImagesDialogComponent,
    ProductViewDetailsComponent,
    BuyProductComponent,
    OrderConfirmationComponent,
    RegisterComponent,
    CartComponent,
    MyOrdersComponent,
    OrderDetailsComponent,
    FooterComponent,
    StoreComponent,
    MenComponent,
    WomenComponent,
    AboutusComponent,
    UnisexComponent,
    SkincareComponent,
    BestsellerComponent,
    TrendperfumeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    IvyCarouselModule,
    MatSidenavModule,
    NgbModule,
    NgbCarouselModule,
    MatSelectModule,
    MatProgressBarModule,
    LayoutModule,
    MatMenuModule,
    MatTabsModule,
    CarouselModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgbPaginationModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  entryComponents: [ShowProductImagesDialogComponent],
  bootstrap: [AppComponent, HomeComponent],
  exports: [HomeComponent],
})
export class AppModule {}
