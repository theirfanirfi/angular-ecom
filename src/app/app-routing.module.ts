import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginScreenComponent} from './login-screen/login-screen.component';
import {SignUpScreenComponent} from './sign-up-screen/sign-up-screen.component';
import { HomeComponent } from './home/home.component';
import {TopbarComponent} from './topbar/topbar.component';
import {ProductListComponent} from './product-list/product-list.component';
import { FooterComponent } from './footer/footer.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  {path: 'login', component: LoginScreenComponent, ...canActivate(redirectLoggedInToHome)},
  {path: 'signup', component: SignUpScreenComponent,  ...canActivate(redirectLoggedInToHome)},
  {path: '', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin),},
  {path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin),},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginScreenComponent, SignUpScreenComponent, HomeComponent, TopbarComponent, ProductListComponent, FooterComponent]
