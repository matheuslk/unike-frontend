import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent {
  viewDestroyed$!: Subject<void>;

  @Output() emitFile = new EventEmitter<File>();
  @HostListener('change', ['$event.target.files'])
  emitFiles(fileList: FileList): void {
    const file = fileList.item(0);
    if (!file) {
      this.onError('Selecione uma imagem!');
      return;
    }
    if (fileList.length > 1) {
      this.onError('Selecione no máximo 1 imagem!');
      return;
    }
    if (!['image/jpg', 'image/png', 'image/jpeg'].includes(file.type)) {
      this.onError('Imagens devem possuir um formato entre: jpg, png e jpeg.');
      return;
    }

    this.emitFile.next(file);
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

  onError(message: string): void {
    this.alertService.showToast('warning', message);
    this.clearValue();
  }
}
