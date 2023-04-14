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
import { NavbarLogoComponent } from './components/navbar/navbar-logo/navbar-logo.component';
import { NavbarMenuComponent } from './components/navbar/navbar-menu/navbar-menu.component';
import { CapitalizePipe } from './data/pipes/capitalize.pipe';

const components = [NavbarComponent, LoaderComponent];
const internalComponents = [NavbarLogoComponent, NavbarMenuComponent];
const pipes = [CapitalizePipe];

@NgModule({
  declarations: [...internalComponents, ...components, ...pipes],
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
  exports: [...components, ...pipes],
})
export class SharedModule {}
