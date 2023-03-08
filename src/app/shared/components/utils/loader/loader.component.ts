import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loadingImageUrl!: string;
  constructor() {}

  ngOnInit(): void {
    this.loadingImageUrl = '../../../../assets/img/gifs/loading.gif';
  }
}
