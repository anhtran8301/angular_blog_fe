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
import { NewestComponent } from './pages/products/newest-products/newest-products.component'
import { DetailsProductComponent } from './pages/products/details-product/details-product.component';
import { DetailsCartComponent } from './pages/carts/details-cart/details-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';

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
    path: 'users',
    component: UsersPageComponent
  }, 
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuardGuard],
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
    path: 'products/categories',
    component: HomeComponent,
  },
  {
    path: 'products/categories/:categoryId',
    component: ListProductsComponent,
  },
  {
    path: 'products',
    component: ListProductsComponent,
  },
  {
    path: 'products/:id',
    component: DetailsProductComponent,
  },
  {
    path: 'products/authors',
    component: HomeComponent,
  },
  {
    path: 'products/authors/:authorId',
    component: ListProductsComponent,
  },
  {
    path: 'products/search/:keyword',
    component: ListProductsComponent,
  },
  {
    path: 'cart-details',
    component: DetailsCartComponent
  },
  {
    path: 'check-out',
    component: CheckOutComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
