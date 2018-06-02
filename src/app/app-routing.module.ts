import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { IngrediensViewComponent } from './ingrediens-view/ingrediens-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/app-dashboard', pathMatch: 'full' },
  { path: 'app-dashboard', component: DashboardComponent },
  { path: 'quick-view', component: QuickViewComponent },
  { path: 'packages-view', component: PackageViewComponent },
  { path: 'app-ingrediens-view', component: IngrediensViewComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
