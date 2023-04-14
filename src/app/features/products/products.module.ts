import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileInputComponent } from './components/file-preview/file-input/file-input.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductStorePage } from './pages/product-store/product-store.page';
import { ProductPage } from './pages/product/product.page';
import { ProductListEffects } from './state/product-list/product-list.effects';
import { ProductListFacade } from './state/product-list/product-list.facade';
import * as ProductListReducer from './state/product-list/product-list.reducer';
import { ProductStoreEffects } from './state/product-store/product-store.effects';
import { ProductStoreFacade } from './state/product-store/product-store.facade';
import * as ProductStoreReducer from './state/product-store/product-store.reducer';
import { ProductEffects } from './state/product/product.effects';
import { ProductFacade } from './state/product/product.facade';
import * as ProductReducer from './state/product/product.reducer';
import { ProductService } from './data/services/product.service';

const pages = [ProductStorePage, ProductPage];
const components = [ProductListComponent, ProductCardComponent];
const internalComponents = [FileInputComponent, FilePreviewComponent];
const services = [ProductService];
const facades = [ProductFacade, ProductListFacade, ProductStoreFacade];

@NgModule({
  declarations: [...pages, ...components, ...internalComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatBadgeModule,
    MatChipsModule,
    SharedModule,
    StoreModule.forFeature(
      ProductReducer.productFeatureKey,
      ProductReducer.reducer
    ),
    StoreModule.forFeature(
      ProductListReducer.productListFeatureKey,
      ProductListReducer.reducer
    ),
    StoreModule.forFeature(
      ProductStoreReducer.productStoreFeatureKey,
      ProductStoreReducer.reducer
    ),

    EffectsModule.forFeature([
      ProductEffects,
      ProductListEffects,
      ProductStoreEffects,
    ]),
  ],
  providers: [...services, ...facades],
  exports: [...components],
})
export class ProductsModule {}
