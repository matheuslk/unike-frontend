import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav.component';
import { MatListModule } from '@angular/material/list';

const components = [SidenavComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MatSidenavModule, MatListModule],
  exports: [...components, MatSidenavModule],
})
export class SidenavModule {}
