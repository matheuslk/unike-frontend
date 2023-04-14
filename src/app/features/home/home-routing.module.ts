import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from 'src/app/core/data/guards/guest.guard';
import { ProductStorePage } from '../products/pages/product-store/product-store.page';
import { ProductPage } from '../products/pages/product/product.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'products/store',
    component: ProductStorePage,
    // canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    component: ProductPage,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then(m => m.LoginModule),
    canLoad: [GuestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
