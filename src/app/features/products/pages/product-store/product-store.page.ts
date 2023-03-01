import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.page.html',
  styleUrls: ['./product-store.page.scss'],
})
export class ProductStorePage implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  files$!: BehaviorSubject<Array<File | null>>;
  form!: FormGroup;

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.viewDestroyed$.next();
    this.viewDestroyed$.complete();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.files$ = new BehaviorSubject<Array<File | null>>([]);
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
      amount: ['', Validators.min(1), Validators.max(50)],
      sizes: [''],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  setListeners(): void {
    this.setFilesListener();
  }

  setFilesListener(): void {
    this.files$
      .pipe(skip(1), takeUntil(this.viewDestroyed$))
      .subscribe(files => {
        console.log('PRODUCT STORE FILES LISTENER', files);
      });
  }

  storeProduct(): void {}
}
