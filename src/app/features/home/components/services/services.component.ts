import { Component, OnInit } from '@angular/core';
import { IService } from '../../data/interfaces/service.interface';
import { SERVICES } from '../../data/mocks/services.mock';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services!: IService[];

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.services = SERVICES;
  }
}
