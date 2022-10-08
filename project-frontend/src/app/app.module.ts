import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './services/auth.interceptor';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { AdminBrowseProductsComponent } from './components/admin-browse-products/admin-browse-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    CartComponent,
    ProductDetailComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductsComponent,
    ProductComponent,
    AddProductComponent,
    AdminSignupComponent,
    AdminBrowseProductsComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi   : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
