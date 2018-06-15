import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

import { Console } from '@angular/core/src/console';
import { SynchronizerService } from '../synchronizer.service';

import { Package } from 'src/app/models/package';
import { Chocolate } from 'src/app/models/chocolate';
import { Ingredient } from 'src/app/models/ingridient';

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

  constructor(
    private synchronizerService: SynchronizerService,

  ) {
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }


  ngOnInit() {
    //this.getIsAlive();
    this.getPackagesWithChocolates();
    //this.getIngredientsForAvailableIngredients();
  }

  ////////// Helper Methods - Eror Handling //////////

  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

  ////////// ngOnInit Methods //////////

  //+ getIsAlive()

  getPackagesWithChocolates(): void {
    this.synchronizerService.getPackagesWithChocolates()
      .subscribe(packages => this.packages = packages);
  }


  ////////// Package-View Buttons //////////

  setSelectedPackage(tempPackage: Package): void {

    if (tempPackage != null) {
      this.selectedPackage = tempPackage;
      this.selectedChocolates = tempPackage.Chocolates;

      this.getChocolatesForAvailableChocolates();

      this.setAvailableChocolates();
      this.setPackagePrice();
    }

  }


  putInSelectedChocolates(tempChocolate): void {

    this.selectedChocolates.push(tempChocolate);
    this.deleteFromAvailableChocolates(tempChocolate);
    this.setPackagePrice();

  }


  putInAivailableChocolates(tempChocolate): void {

    this.availableChocolates.push(tempChocolate);
    this.deleteFromSelectedChocolates(tempChocolate)
    this.setPackagePrice();

  }


  saveSelectedChocolate(): void {
    //TO DO
  }

  enableDisableSelecetedPackage(): void {

    this.selectedPackage.Available = !this.selectedPackage.Available;

  }


  ////////// Package-View Methods //////////

  getChocolatesForAvailableChocolates(): void {

    this.synchronizerService.getChocolatesWithIngredients()
      .subscribe(chocolates => this.tempChocolates = chocolates);

  }


  setAvailableChocolates(): void {
    for (var tempChocolate of this.selectedChocolates) {
      var index = this.tempChocolates.indexOf(tempChocolate);
      this.tempChocolates.splice(index, 1);
    };

    this.availableChocolates = this.tempChocolates;
  }


  deleteFromAvailableChocolates(tempChocolate): void {
    var index = this.availableChocolates.indexOf(tempChocolate);
    this.availableChocolates.splice(index, 1);
  }

  deleteFromSelectedChocolates(tempChocolate): void {
    var index = this.selectedChocolates.indexOf(tempChocolate);
    this.selectedChocolates.splice(index, 1);
  }


  setPackagePrice(): void {

    this.packagePrice = 0;

    for (var tempChocolate of this.selectedChocolates) {

      for (var tempIngredient of tempChocolate.Ingredients) {
        this.packagePrice += tempIngredient.Price;
      }

    }

  }

}
