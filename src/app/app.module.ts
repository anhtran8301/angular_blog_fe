import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatDividerModule } from "@angular/material/divider"
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { NgConfirmModule } from 'ng-confirm-box';
import {MatRadioModule} from '@angular/material/radio';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment.prod';
import { UploadAvatarComponent } from './upload/upload-avatar/upload-avatar.component';
import { ChangeAvatarComponent } from './auth/change-avatar/change-avatar.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { ListCategoriesComponent } from './pages/books-categories/list-categories/list-categories.component';
import { CreateCategoryComponent } from './pages/books-categories/create-category/create-category.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsersPageComponent } from './pages/users/users-page/users-page.component';
import { authGuard } from './guard/auth.guard';
import { NewestComponent } from './pages/products/newest-products/newest-products.component';
import { SearchComponent } from './shared/search/search.component';
import { DetailsProductComponent } from './pages/products/details-product/details-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './pages/carts/cart-status/cart-status.component';
import { DetailsCartComponent } from './pages/carts/details-cart/details-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TrendingProductsComponent } from './pages/products/trending-products/trending-products.component';
import { AdsComponent } from './pages/products/ads/ads.component';
import { DropdownMenuComponent } from './shared/dropdown-menu/dropdown-menu.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { UpCommingProductsComponent } from './pages/products/up-comming-products/up-comming-products.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollTopBtnComponent } from './shared/scroll-top-btn/scroll-top-btn.component';
import { CreateProductComponent } from './pages/admin/create-product/create-product.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ThankYouComponent } from './shared/thank-you/thank-you.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UploadAvatarComponent,
    ChangeAvatarComponent,
    ListCategoriesComponent,
    CreateCategoryComponent,
    UsersPageComponent,
    NewestComponent,
    SearchComponent,
    DetailsProductComponent,
    CartStatusComponent,
    DetailsCartComponent,
    CheckOutComponent,
    AdminComponent,
    TrendingProductsComponent,
    AdsComponent,
    DropdownMenuComponent,
    ListProductsComponent,
    UpCommingProductsComponent,
    ScrollTopBtnComponent,
    CreateProductComponent,
    PaymentComponent,
    ThankYouComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    AngularEditorModule,
    MatRadioModule,
    MatListModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgToastModule,
    NgbModule,
    MatProgressSpinnerModule,
    NgConfirmModule,
    MatDatepickerModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatDialogModule,
    NgxPaginationModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatCheckboxModule,
    NgFor,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
