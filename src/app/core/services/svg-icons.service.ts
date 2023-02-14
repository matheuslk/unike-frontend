import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgIconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.register();
  }

  register(): void {
    this.matIconRegistry.addSvgIcon(
      `product`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/img/icons/shopping_bag_white.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `services`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/img/icons/local_shipping_white.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `signin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/img/icons/lock_person_white.svg'
      )
    );
  }
}
