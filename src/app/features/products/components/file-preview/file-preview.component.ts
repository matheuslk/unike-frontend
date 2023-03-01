import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, skip, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
})
export class FilePreviewComponent implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  defaultProductImage!: string;

  imageUrls!: Array<{
    url: SafeUrl;
    uploaded: boolean;
  }>;
  currentImageUrl$!: BehaviorSubject<SafeUrl>;
  currentIndex$!: BehaviorSubject<number>;

  @Input() files!: Array<File | null>;
  @Output() emitFiles = new EventEmitter<Array<File | null>>();

  constructor(private sanitize: DomSanitizer) {}

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
    this.defaultProductImage = '../../../../assets/img/default.jpg';
    this.initImageUrls();
  }

  initImageUrls(): void {
    const imageUrl = {
      url: this.sanitizeFileUrl(this.defaultProductImage),
      uploaded: false,
    };
    this.imageUrls = [imageUrl];
    this.currentIndex$ = new BehaviorSubject(0);
    this.currentImageUrl$ = new BehaviorSubject(imageUrl.url);

    this.files.push(null);
    this.emitFiles.next(this.files);
    return;
  }

  setListeners(): void {
    this.setCurrentIndexListener();
  }

  setCurrentIndexListener(): void {
    this.currentIndex$
      .pipe(skip(1), takeUntil(this.viewDestroyed$))
      .subscribe(currentIndex => {
        this.currentImageUrl$.next(this.imageUrls[currentIndex].url);
      });
  }

  removeFile(): void {
    const index = this.currentIndex$.getValue();
    this.imageUrls.splice(index, 1);
    this.currentIndex$.next(index > 0 ? index - 1 : index);

    this.files.splice(index, 1);
    this.emitFiles.next(this.files);
  }

  addDefaultImage(): void {
    const imageUrl = {
      url: this.sanitizeFileUrl(this.defaultProductImage),
      uploaded: false,
    };
    this.imageUrls.push(imageUrl);
    this.currentIndex$.next(this.imageUrls.length - 1);

    this.files.push(null);
    this.emitFiles.next(this.files);
  }

  async handleNewFile(file: File): Promise<void> {
    const index = this.currentIndex$.getValue();
    const imageUrl = {
      url: await this.getImageUrl(file, index),
      uploaded: true,
    };
    this.imageUrls[index] = imageUrl;
    this.currentIndex$.next(index);

    this.files[index] = file;
    this.emitFiles.next(this.files);
  }

  async getImageUrl(file: File, index: number): Promise<SafeUrl> {
    return await new Promise<SafeUrl>((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (): void => {
        resolve(this.sanitize.bypassSecurityTrustUrl(reader.result as string));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  sanitizeFileUrl(url: string): SafeUrl {
    return this.sanitize.bypassSecurityTrustUrl(url);
  }
}
