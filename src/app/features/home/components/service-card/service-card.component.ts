import { Component, Input, OnInit } from '@angular/core';
import { IService } from '../../data/interfaces/service.interface';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service!: IService;

  constructor() {}

  ngOnInit(): void {}
}
