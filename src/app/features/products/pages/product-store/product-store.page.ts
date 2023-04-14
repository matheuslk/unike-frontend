import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';
import { PRODUCT_STORE_FORM_ERROR_MESSAGES } from '../../data/consts/form-error-messages.const';
import {
  ICategory,
  IProduct,
  IProductFormBody,
} from '../../data/interfaces/product.interface';
import { ProductStoreFacade } from '../../state/product-store/product-store.facade';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';
import { getFormErrorMessage } from 'src/app/shared/data/functions/get-form-error-message.function';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.page.html',
  styleUrls: ['./product-store.page.scss'],
})
export class ProductStorePage implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;

  files$!: BehaviorSubject<Array<File>>;
  categories$!: Observable<INGRXData<ICategory[]>>;

  storedProduct$!: Observable<INGRXData<IProduct>>;

  form!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private productStoreFacade: ProductStoreFacade
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.productStoreFacade.viewDestroyed();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.files$ = new BehaviorSubject<Array<File>>([]);
    this.storedProduct$ = this.productStoreFacade
      .selectProduct$()
      .pipe(takeUntil(this.viewDestroyed$));
    this.categories$ = this.productStoreFacade
      .selectCategories$()
      .pipe(takeUntil(this.viewDestroyed$));
    this.initForm();
  }

  initForm(): void {
    this.form = this.builder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(45),
        ],
      ],
      price: [
        '',
        [Validators.required, Validators.min(1), Validators.max(7000)],
      ],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  fetchData(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.productStoreFacade.fetchCategories();
  }

  setListeners(): void {
    this.setViewDestroyedListener();
    this.setStoredProductListener();
    this.setFilesListener();
  }

  setViewDestroyedListener(): void {
    this.productStoreFacade.selectViewDestroyed$().pipe(
      tap(() => {
        this.viewDestroyed$.next();
        this.viewDestroyed$.complete();
      }),
      takeUntil(this.viewDestroyed$)
    );
  }

  setStoredProductListener(): void {
    this.storedProduct$
      .pipe(skip(1), takeUntil(this.viewDestroyed$))
      .subscribe(product => {
        product.isLoading ? this.form.disable() : this.form.enable();
        if (product.data) {
          //MOSTRAR ALERTA DE SUCESSO
          //LIMPAR AS IMAGENS
          this.form.reset('');
          return;
        }
        if (product.error) {
          //MOSTRAR ALERTA DE ERRO
        }
      });
  }

  setFilesListener(): void {
    this.files$
      .pipe(skip(1), takeUntil(this.viewDestroyed$))
      .subscribe(files => {
        console.log('PRODUCT STORE FILES LISTENER', files);
      });
  }

  getFormError(field: string, errors: ValidationErrors | null): string {
    return (
      getFormErrorMessage(field, errors, PRODUCT_STORE_FORM_ERROR_MESSAGES) ??
      ''
    );
  }

  storeProduct(): void {
    const body = {
      ...this.form.value,
      files: this.files$.getValue(),
    } as IProductFormBody;
    this.productStoreFacade.storeProduct(body);
  }
}
