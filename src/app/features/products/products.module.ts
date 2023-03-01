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
import { SharedModule } from 'src/app/shared/shared.module';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductStorePage } from './pages/product-store/product-store.page';
import { SizesInputComponent } from './components/sizes-input/sizes-input.component';

const pages = [ProductStorePage];
const components = [ProductListComponent, ProductCardComponent];
const internalComponents = [
  FileInputComponent,
  FilePreviewComponent,
  SizesInputComponent,
];

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
  ],
  exports: [...components],
})
export class ProductsModule {}
