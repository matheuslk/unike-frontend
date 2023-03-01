import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesInputComponent } from './sizes-input.component';

describe('SizesInputComponent', () => {
  let component: SizesInputComponent;
  let fixture: ComponentFixture<SizesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizesInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
