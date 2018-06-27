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

  wrappings: Wrapping[];

  constructor(
    private synchronizerService: SynchronizerService,

  ) {
    this.wrappings = new Array<Wrapping>();
    this.availableChocolates = new Array<Chocolate>();
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }


  ngOnInit() {
    //this.getIsAlive();
    this.selectedPackage = new Package();
    this.selectedPackage.Wrapping = new Wrapping();
    this.selectedPackage.Wrapping.WrappingId = "d526f03a-29c5-4331-b536-49bf4f3d4cf3";
    this.selectedPackage.Wrapping.Name = "wrap no. 1";
    this.setDefaultDemoData();
    this.getWrappings();
    this.packages = new Array<Package>();
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

      //this.availableChocolates = new Array<Chocolate>()

      this.getChocolatesForAvailableChocolates();
      this.setAvailableChocolates();
      this.setPackagePrice();
    }

  }

  getWrappings(): void {
    this.synchronizerService.getWrappings()
      .subscribe(wrappings => this.wrappings = wrappings);

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


  saveSelectedPackage(): void {
    console.error("createNewPackage()");
    this.updateCheck = false;
    this.selectedPackage.Chocolates = this.selectedChocolates;

    console.error("--------  TRY TO Update Package ------")

    this.synchronizerService.updatePackage(this.selectedPackage)
      .subscribe(updateCheck => this.updateCheck = updateCheck);

    this.packages = new Array<Package>();
    this.getPackagesWithChocolates();
  }

  createNewPackage(): void {
    console.error("createNewPackage()");
    this.updateCheck = false;
    this.selectedPackage.Chocolates= this.selectedChocolates;

    console.error("--------  TRY TO Create new Package ------")

    this.synchronizerService.createNewPackage(this.selectedPackage)
      .subscribe(updateCheck => this.updateCheck = updateCheck);

    //this.packages = new Array<Package>();
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

        //console.error("availableChocolateName -->" + availableChocolate.Name + "  === " + tempChocolate.Name + " <-- tempIngredienName" )
        //console.error("availableChocolateID -->" + availableChocolate.ChocolateId + " === " + tempChocolate.ChocolateId +" <-- tempIngredientId" )        
        this.isInPackage = (availableChocolate.ChocolateId === tempChocolate.ChocolateId);

        //console.error("isInChocolate -->  " + this.isInChocolate);
        if (this.isInPackage) break;

      };

      //console.error("isInPackage bevor try to push -> " + this.isInPackage)
      if (!this.isInPackage) {
       // console.error("try to push Not in Package Chocolate" + availableChocolate.Name);
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
    // Wrapping Name = wrap no. 1
    //Customer_ID = p.Customer.CustomerId, e71a6869-7927-4c6d-ac1d-71858cb9f641
    //Image = p.Image, http://
  
    this.selectedPackage.Image = "http://";

    //this.selectedPackage.Wrapping = new Wrapping();
    //this.selectedPackage.Wrapping.WrappingId = "d526f03a-29c5-4331-b536-49bf4f3d4cf3";
    //this.selectedPackage.Wrapping.Name = "default";

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
    this.packagePrice += 3;

  }

}
