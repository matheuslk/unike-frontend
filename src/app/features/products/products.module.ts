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
import { FileInputComponent } from './components/file-input/file-input.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { SizesInputComponent } from './components/sizes-input/sizes-input.component';
import { ProductService } from './data/services/product.service';
import { ProductStorePage } from './pages/product-store/product-store.page';
import { ProductListEffects } from './state/product-list/product-list.effects';
import { ProductListFacade } from './state/product-list/product-list.facade';
import * as ProductReducer from './state/product/product.reducer';
import * as ProductListReducer from './state/product-list/product-list.reducer';
import { ProductPage } from './pages/product/product.page';
import { ProductFacade } from './state/product/product.facade';
import { ProductEffects } from './state/product/product.effects';

const pages = [ProductStorePage, ProductPage];
const components = [ProductListComponent, ProductCardComponent];
const internalComponents = [
  FileInputComponent,
  FilePreviewComponent,
  SizesInputComponent,
];
const services = [ProductService];
const facades = [ProductFacade, ProductListFacade];

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
    EffectsModule.forFeature([ProductEffects, ProductListEffects]),
  ],
  providers: [...services, ...facades],
  exports: [...components],
})
export class ProductsModule {}
