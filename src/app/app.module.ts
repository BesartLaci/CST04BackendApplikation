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


@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    DashboardComponent,   
    QuickViewComponent,
    PackageViewComponent,
    IngredientsViewComponent
   
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
