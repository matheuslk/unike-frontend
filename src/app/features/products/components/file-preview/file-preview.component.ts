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
import { FileInputComponent } from '../file-input/file-input.component';

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

  productFiles!: File[];
  productImageUrls!: string[];

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
    this.productFiles = this.fileProps.files ?? [];
    this.productFiles.length
      ? this.generateImageUrlsFromFiles()
      : this.addDefaultImageUrl();
  }

  setListeners(): void {
    this.setCurrentIndexListener();
  }

  setCurrentIndexListener(): void {
    this.currentIndex$
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe(currentIndex => {
        console.log('FILE PREVIEW - CURRENT INDEX LISTENER', currentIndex);
        this.currentImageUrl$.next(
          this.productImageUrls ? this.productImageUrls[currentIndex] : ''
        );
      });
  }

  //FILE UPLOAD METHODS

  addDefaultImageUrl(): void {
    console.log('FILE PREVIEW - ADD DEFAULT IMAGE');
    this.productImageUrls.push(this.defaultProductImageUrl);
    this.currentIndex$.next(this.productImageUrls.length - 1);
  }

  async generateImageUrlsFromFiles(): Promise<void> {
    this.productImageUrls = await Promise.all(
      this.productFiles.map(async file => await this.generateFileUrl(file))
    );
  }

  openFileInput(): void {
    if (this.fileProps.previewOnly) {
      return;
    }
    this.fileInput.open();
  }

  async handleNewFile(file: File): Promise<void> {
    console.log('HANDLE NEW FILE');
    // const index = this.currentIndex$.getValue();

    // const imageUrl = await this.generateFileUrl(file);
    // this.imageUrls?[index] = imageUrl;
    // this.currentIndex$.next(index);

    // this.files[index] = file;
    // this.emitFiles.next(this.files);
  }

  removeFile(): void {
    console.log('REMOVE FILE');
    // const index = this.currentIndex$.getValue();
    // this.imageUrls.splice(index, 1);
    // this.currentIndex$.next(index > 0 ? index - 1 : index);

    // this.files.splice(index, 1);
    // this.emitFiles.next(this.files);
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
