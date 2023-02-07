import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.page.html',
  styleUrls: ['./product-store.page.scss'],
})
export class ProductStorePage implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('ON INIT');
  }
}
