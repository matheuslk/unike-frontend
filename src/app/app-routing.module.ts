import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanRenderGuard } from './core/guards/can-render.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
    canLoad: [CanRenderGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
