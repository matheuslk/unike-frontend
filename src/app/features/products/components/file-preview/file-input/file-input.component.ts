import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/core/data/services/alert.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent {
  viewDestroyed$!: Subject<void>;

  @Output() emitFile = new EventEmitter<File[]>();
  @HostListener('change', ['$event.target.files'])
  emitFiles(fileList: FileList): void {
    const files = this.validate(fileList);
    if (files) {
      this.emitFile.next(files);
    }
    this.clearValue();
  }
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private alertService: AlertService) {}

  open(): void {
    (this.fileInput?.nativeElement as HTMLInputElement).click();
  }

  clearValue(): void {
    (this.fileInput?.nativeElement as HTMLInputElement).value = '';
  }

  validate(fileList: FileList): File[] | null {
    if (fileList.length === 0) {
      return null;
    }
    const files: File[] = [];
    let hasError = true;
    for (let fileIndex = 0; fileIndex < fileList.length; fileIndex++) {
      const file = fileList.item(fileIndex) as File;
      if (!['image/jpg', 'image/png', 'image/jpeg'].includes(file.type)) {
        this.onError(
          'Imagens devem possuir um formato entre: jpg, png e jpeg.'
        );
        break;
      }
      files.push(file);
      if (fileIndex === fileList.length - 1) {
        hasError = false;
      }
    }
    return hasError ? null : files;
  }

  onError(message: string): void {
    this.alertService.showToast('warning', message);
  }
}
