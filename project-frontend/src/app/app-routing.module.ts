import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminBrowseProductsComponent } from './components/admin-browse-products/admin-browse-products.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopComponent } from './components/shop/shop.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'admin-register', component: AdminSignupComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'admin-browse-products',
    component: AdminBrowseProductsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
