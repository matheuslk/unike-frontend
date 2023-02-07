import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStorePage } from './product-store.page';

describe('ProductStorePage', () => {
  let component: ProductStorePage;
  let fixture: ComponentFixture<ProductStorePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductStorePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
