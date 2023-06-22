import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangeAvatarComponent } from './auth/change-avatar/change-avatar.component';
import { ListCategoriesComponent } from './pages/books-categories/list-categories/list-categories.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'change-avatar', component: ChangeAvatarComponent},
  {path: 'categories', component: ListCategoriesComponent},
  {path: 'users', component: UsersPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
