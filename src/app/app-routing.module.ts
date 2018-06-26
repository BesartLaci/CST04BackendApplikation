import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { IngredientsViewComponent } from './ingredients-view/ingredients-view.component';
import { CustomersViewComponent } from './customers-view/customers-view.component';
import { ChocolatesViewComponent } from './chocolates-view/chocolates-view.component';
import { OrderActivitiesViewComponent } from './order-activities-view/order-activities-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/app-ingredients-view', pathMatch: 'full' },
  { path: 'app-dashboard', component: DashboardComponent },
  { path: 'packages-view', component: PackageViewComponent },
  { path: 'app-ingredients-view', component: IngredientsViewComponent },
  { path: 'app-customers-view', component: CustomersViewComponent },
  { path: 'app-chocolates-view', component: ChocolatesViewComponent },
  { path: 'app-order-activities-view', component: OrderActivitiesViewComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
