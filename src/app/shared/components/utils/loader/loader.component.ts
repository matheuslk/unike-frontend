import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() type: 'default' | 'dots' = 'default';

  loadingImageUrl!: string;

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loadingImageUrl =
      this.type === 'dots'
        ? '../../../../assets/img/gifs/loading-dots.gif'
        : '../../../../assets/img/gifs/loading-default.gif';
  }
}
