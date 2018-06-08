import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { NavmenuComponent } from './navmenu/navmenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { IngredientsViewComponent } from './ingredients-view/ingredients-view.component';
import { CustomersViewComponent } from './customers-view/customers-view.component';
import { ChocolatesViewComponent } from './chocolates-view/chocolates-view.component';
import { OrderActivitiesViewComponent } from './order-activities-view/order-activities-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    DashboardComponent,   
    QuickViewComponent,
    PackageViewComponent,
    IngredientsViewComponent,
    CustomersViewComponent,
    ChocolatesViewComponent,
    OrderActivitiesViewComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
