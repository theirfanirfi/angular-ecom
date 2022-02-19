import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';


import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  { path: 'login', component: LoginScreenComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'signup', component: SignUpScreenComponent, ...canActivate(redirectLoggedInToHome) },
  { path: '', component: HomeComponent, },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'cart', component: CartComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'checkout', component: CheckoutComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'payment', component: PaymentComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'resetpassword', component: ResetpasswordComponent, ...canActivate(redirectLoggedInToHome), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginScreenComponent, SignUpScreenComponent, HomeComponent,
  TopbarComponent, ProductListComponent, FooterComponent, ProductComponent, CartComponent,
  CheckoutComponent, PaymentComponent, ProfileComponent, ResetpasswordComponent]
