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
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'change-avatar',
    component: ChangeAvatarComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'categories',
    component: ListCategoriesComponent,
    canActivate: [adminGuardGuard]
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
