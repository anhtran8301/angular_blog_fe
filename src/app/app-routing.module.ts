import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangeAvatarComponent } from './auth/change-avatar/change-avatar.component';
import { ListCategoriesComponent } from './pages/books-categories/list-categories/list-categories.component';
import { UsersPageComponent } from './pages/users/users-page/users-page.component';
import { authGuard, notAuthGuard } from './guard/auth.guard'
import { adminGuardGuard } from './guard/admin.guard'
import { ProductsListComponent } from './pages/products/list-products/list-products.component'
import { DetailsProductComponent } from './pages/products/details-product/details-product.component';
import { DetailsCartComponent } from './pages/carts/details-cart/details-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'change-avatar',
    component: ChangeAvatarComponent,
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    component: ListCategoriesComponent,
    canActivate: [adminGuardGuard]
  },
  {
    path: 'products/categories/:id',
    component: HomeComponent,
  },
  {
    path: 'products/:id',
    component: DetailsProductComponent,
  },
  {
    path: 'products/categories',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: HomeComponent,
  },
  {
    path: 'cart-details',
    component: DetailsCartComponent
  },
  {
    path: 'check-out',
    component: CheckOutComponent
  },
  {
    path: 'products/search/:keyword',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersPageComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
