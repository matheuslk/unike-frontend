import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FileInputComponent } from './file-input/file-input.component';

interface IFileProps {
  urls?: string[];
  files?: File[];
  previewOnly?: boolean;
}

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
})
export class FilePreviewComponent implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  defaultProductImageUrl!: string;

  currentIndex$!: BehaviorSubject<number>;
  currentImageUrl$!: BehaviorSubject<string>;

  productImageFiles!: File[];
  productImageUrls!: string[];

  @Input() disabled: boolean = false;
  @Input() fileProps!: IFileProps;
  @Output() emitFiles = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInput!: FileInputComponent;
  constructor() {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.viewDestroyed$.next();
    this.viewDestroyed$.complete();
  }

  initData(): void {
    console.log('FILE PREVIEW - PROPS', this.fileProps);
    this.viewDestroyed$ = new Subject();
    this.defaultProductImageUrl = '../../../../assets/img/default.jpg';
    this.currentIndex$ = new BehaviorSubject(0);
    this.currentImageUrl$ = new BehaviorSubject('');
    this.initImageUrls();
  }

  initImageUrls(): void {
    this.productImageUrls = this.fileProps.urls ?? [];
    if (this.fileProps.previewOnly) {
      return;
    }
    this.productImageFiles = this.fileProps.files ?? [];
    if (this.productImageFiles.length) {
      this.generateImageUrlsFromFiles(this.productImageFiles);
      return;
    }
    this.productImageUrls.push(this.defaultProductImageUrl);
    this.currentIndex$.next(this.productImageUrls.length - 1);
  }

  setListeners(): void {
    this.setCurrentIndexListener();
  }

  setCurrentIndexListener(): void {
    this.currentIndex$
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe(currentIndex => {
        this.currentImageUrl$.next(this.productImageUrls[currentIndex]);
      });
  }

  handleSmallImageOnClick(index: number): void {
    if (this.disabled) {
      return;
    }
    this.currentIndex$.next(index);
  }

  //FILE UPLOAD METHODS

  async generateImageUrlsFromFiles(files: File[]): Promise<void> {
    this.productImageUrls = await Promise.all(
      files.map(async file => await this.generateFileUrl(file))
    );
  }

  openFileInput(): void {
    if (this.fileProps.previewOnly || this.disabled) {
      return;
    }
    this.fileInput.open();
  }

  async handleNewFiles(files: File[]): Promise<void> {
    this.productImageUrls = await Promise.all(
      files.map(async file => await this.generateFileUrl(file))
    );
    this.currentIndex$.next(this.productImageUrls.length - 1);

    this.productImageFiles = files;
    this.emitFiles.next(files);
  }

  removeFile(): void {
    const index = this.currentIndex$.getValue();
    if (this.productImageUrls.length === 1) {
      this.productImageUrls[0] = this.defaultProductImageUrl;
    } else {
      this.productImageUrls.splice(index, 1);
    }
    this.currentIndex$.next(index > 0 ? index - 1 : index);

    this.productImageFiles.splice(index, 1);
    this.emitFiles.next(this.productImageFiles);
  }

  async generateFileUrl(file: File): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (): void => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
