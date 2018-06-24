import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

import { Console } from '@angular/core/src/console';
import { SynchronizerService } from '../synchronizer.service';

import { Package } from 'src/app/models/package';
import { Chocolate } from 'src/app/models/chocolate';
import { Ingredient } from 'src/app/models/ingridient';
import { Wrapping } from 'src/app/models/wrapping';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent implements OnInit {

  isAlive: boolean;
  updateCheck: boolean;

  packages: Package[];
  @Input() selectedPackage: Package;
  packagePrice: number;

  tempChocolates: Chocolate[];
  availableChocolates: Chocolate[];
  selectedChocolates: Chocolate[];
  isInPackage: boolean;

  constructor(
    private synchronizerService: SynchronizerService,

  ) {
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }


  ngOnInit() {
    //this.getIsAlive();
    this.selectedPackage = new Package();
    this.getPackagesWithChocolates();
    this.availableChocolates = new Array<Chocolate>();
    this.getChocolatesForAvailableChocolates();
    
  }

  ////////// Helper Methods - Eror Handling //////////

  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

  ////////// ngOnInit Methods //////////

  //+ getIsAlive()

  getPackagesWithChocolates(): void {
    console.error("getPackagesWithChocolates()");
    this.synchronizerService.getPackagesWithChocolates()
      .subscribe(packages => this.packages = packages);
  }


  ////////// Package-View Buttons //////////

  setSelectedPackage(tempPackage: Package): void {
    console.error("setSelectedPackage()");
    if (tempPackage != null) {
      this.selectedPackage = tempPackage;
      this.setDefaultDemoData();
      this.selectedChocolates = this.selectedPackage.Chocolates;

      this.getChocolatesForAvailableChocolates();
      this.setAvailableChocolates();
      this.setPackagePrice();
    }

  }


  putInSelectedChocolates(tempChocolate): void {
    console.error("putInSelectedChocolates()");
    this.selectedChocolates.push(tempChocolate);
    this.deleteFromAvailableChocolates(tempChocolate);
    this.setPackagePrice();

  }


  putInAivailableChocolates(tempChocolate): void {
    console.error("putInAivailableChocolates()");
    this.availableChocolates.push(tempChocolate);
    this.deleteFromSelectedChocolates(tempChocolate)
    this.setPackagePrice();

  }


  saveSelectedChocolate(): void {
    //TO DO
  }

  createNewPackage(): void {
    console.error("createNewChocolate()");
    this.updateCheck = false;
    this.selectedPackage.Chocolates= this.selectedChocolates;

    console.error("--------  TRY TO Create new Package ------")

    this.synchronizerService.createNewPackage(this.selectedPackage)
      .subscribe(updateCheck => this.updateCheck = updateCheck);

    this.getPackagesWithChocolates();
  }


  enableDisableSelecetedPackage(): void {

    this.selectedPackage.Available = !this.selectedPackage.Available;

  }


  ////////// Package-View Methods //////////

  getChocolatesForAvailableChocolates(): void {
    console.error("getChocolatesForAvailableChocolates()");

    this.synchronizerService.getChocolatesWithIngredients()
      .subscribe(chocolates => this.tempChocolates = chocolates);

  }


  setAvailableChocolates(): void {
    console.error("setAvailableChocolates()");

    for (var availableChocolate of this.tempChocolates) {

      for (var tempChocolate of this.selectedChocolates) {

        //console.error("availableIngredientName -->" + availableIngredient.Name + "  === " + tempIngredient.Name + " <-- tempIngredienName" )
        //console.error("availableIngredientId -->" + availableIngredient.IngredientId + " === " + tempIngredient.IngredientId +" <-- tempIngredientId" )        
        this.isInPackage = (availableChocolate.ChocoalteId === tempChocolate.ChocoalteId);

        //console.error("isInChocolate -->  " + this.isInChocolate);
        if (this.isInPackage) break;

      };

      //console.error("isInChocolate bevor try to push -> " + this.isInChocolate)
      if (!this.isInPackage) {
        //console.error("try to push Not in Chocolate ingredient" + tempIngredient.Name);
        this.availableChocolates.push(availableChocolate);
      }

    }





  }


  deleteFromAvailableChocolates(tempChocolate): void {
    var index = this.availableChocolates.indexOf(tempChocolate);
    this.availableChocolates.splice(index, 1);

  }


  deleteFromSelectedChocolates(tempChocolate): void {

    var index = this.selectedChocolates.indexOf(tempChocolate);
    this.selectedChocolates.splice(index, 1);

  }

  //generate Demo Date to push new Chocolate
  setDefaultDemoData(): void {
    console.error("setDefaultDemoData()");
    //-TempData
    //WrappingID = p.Wrapping.WrappingId, d526f03a - 29c5 - 4331 - b536 - 49bf4f3d4cf3   
    //Customer_ID = p.Customer.CustomerId, 9417ea8a - fa2e - 4172 - 83f4 - 00d2b400a1b9
    //Image = p.Image, http://
  
    this.selectedPackage.Image = "http://";

    this.selectedPackage.Wrapping = new Wrapping();
    this.selectedPackage.Wrapping.WrappingId = "d526f03a-29c5-4331-b536-49bf4f3d4cf3";

    this.selectedPackage.CreatedBy = new Customer();
    this.selectedPackage.CreatedBy.CustomerId = "e71a6869-7927-4c6d-ac1d-71858cb9f641";
    
  }


  setPackagePrice(): void {
    console.error("setPackagePrice()");
    this.packagePrice = 0;

    for (var tempChocolate of this.selectedChocolates) {

      for (var tempIngredient of tempChocolate.Ingredients) {
        this.packagePrice += tempIngredient.Price;
      }

    }

  }

}
