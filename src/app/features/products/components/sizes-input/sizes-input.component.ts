import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-sizes-input',
  templateUrl: './sizes-input.component.html',
  styleUrls: ['./sizes-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SizesInputComponent,
      multi: true,
    },
  ],
})
export class SizesInputComponent implements ControlValueAccessor {
  onChange: (value: string[]) => void = (value: string[]): void => {};

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  sizes!: string[];

  @ViewChild('sizeInput') sizeInput!: ElementRef;
  constructor() {}

  writeValue(obj: any): void {
    this.sizes = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    return;
  }
  setDisabledState?(isDisabled: boolean): void {
    const input = this.sizeInput.nativeElement as HTMLInputElement;
    input.disabled = isDisabled;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.sizes.push(value);
      this.onChange(this.sizes);
    }
    event.chipInput!.clear();
  }

  remove(size: string): void {
    const index = this.sizes.indexOf(size);
    if (index >= 0) {
      this.sizes.splice(index, 1);
      this.onChange(this.sizes);
    }
  }
}
