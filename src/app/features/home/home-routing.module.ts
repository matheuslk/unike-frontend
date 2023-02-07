import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then(m => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
