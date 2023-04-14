import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { endpoints } from 'src/app/shared/data/consts/endpoints.const';
import { IFilteredProductResponse } from '../../data/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: IFilteredProductResponse;
  productImageUrl!: SafeUrl;
  constructor(private sanitize: DomSanitizer) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.productImageUrl = this.sanitize.bypassSecurityTrustUrl(
      endpoints.guest.products.image + `/${this.product.images[0].file_name}`
    );
  }
}
