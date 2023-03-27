import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { endpoints } from '../../../../core/data/consts/endpoints.const';
import {
  IImage,
  IProductResponse,
} from '../../data/interfaces/product.interface';
import { ProductFacade } from '../../state/product/product.facade';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  id!: string;
  product$!: Observable<INGRXData<IProductResponse>>;
  imageUrls!: string[];

  constructor(
    private route: ActivatedRoute,
    private productFacade: ProductFacade
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.viewDestroyed$.next();
    this.viewDestroyed$.complete();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.product$ = this.productFacade
      .selectProduct$()
      .pipe(takeUntil(this.viewDestroyed$));
  }

  setListeners(): void {
    this.setProductListener();
  }

  fetchData(): void {
    this.productFacade.findProduct(this.id);
  }

  setProductListener(): void {
    this.product$
      .pipe(
        filter(product => !!product.data),
        take(1)
      )
      .subscribe(product => {
        console.log('PRODUCT PAGE - PRODUCT', product);
        this.generateImageUrls(product.data?.images ?? []);
        console.log('PRODUCT PAGE - IMAGE URLS', this.imageUrls);
      });
  }

  generateImageUrls(images: IImage[]): void {
    this.imageUrls = images.map(
      image => endpoints.guest.products.image + `/${image.file_name}`
    );
  }
}
