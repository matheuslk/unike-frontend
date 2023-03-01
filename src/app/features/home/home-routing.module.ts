import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { GuestGuard } from 'src/app/core/guards/guest.guard';
import { ProductStorePage } from '../products/pages/product-store/product-store.page';
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
