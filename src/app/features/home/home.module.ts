import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsModule } from '../products/products.module';
import { ServicesComponent } from './components/services/services.component';
import { HomePage } from './pages/home.page';
import { ServiceCardComponent } from './components/service-card/service-card.component';

const pages = [HomePage];
const components = [ServicesComponent, ServiceCardComponent];

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    HomeRoutingModule,
    SharedModule,
    ProductsModule,
  ],
})
export class HomeModule {}
