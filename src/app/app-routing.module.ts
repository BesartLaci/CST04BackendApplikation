import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { IngredientsViewComponent } from './ingredients-view/ingredients-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/app-dashboard', pathMatch: 'full' },
  { path: 'app-dashboard', component: DashboardComponent },
  { path: 'packages-view', component: PackageViewComponent },
  { path: 'app-ingredients-view', component: IngredientsViewComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
