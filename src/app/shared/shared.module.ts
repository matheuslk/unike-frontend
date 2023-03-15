import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoaderComponent } from './components/utils/loader/loader.component';
import { NavbarLogoComponent } from './components/navbar-logo/navbar-logo.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';

const components = [NavbarComponent, LoaderComponent];
const internalComponents = [NavbarLogoComponent];
@NgModule({
  declarations: [...components, ...internalComponents, NavbarMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [...components],
})
export class SharedModule {}
