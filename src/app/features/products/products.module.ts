import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import * as ProductListReducer from './state/product-list/product-list.reducer';

const components = [ProductListComponent, ProductCardComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(
      ProductListReducer.productListFeatureKey,
      ProductListReducer.reducer
    ),
  ],
  exports: [...components],
})
export class ProductsModule {}
