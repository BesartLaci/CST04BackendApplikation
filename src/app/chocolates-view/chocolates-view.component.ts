import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { Console } from '@angular/core/src/console';

import { SynchronizerService } from '../synchronizer.service';
import { Ingredient } from 'src/app/models/ingridient';
import { Chocolate } from 'src/app/models/chocolate';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-chocolates-view',
  templateUrl: './chocolates-view.component.html',
  styleUrls: ['./chocolates-view.component.css']
})
export class ChocolatesViewComponent implements OnInit {

  chocolates: Chocolate[];
  @Input() selectedChocolate: Chocolate;
  chocolatePrice: number;

  tempIngredients: Ingredient[]
  availableIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  
  isAlive: boolean;
  updateCheck: boolean;

  constructor(
    private synchronizerService: SynchronizerService,
    
  ) {
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }

  ngOnInit() {  
    //this.getIsAlive();
    this.getChocolatesWithIngredients();    
    //this.getIngredientsForAvailableIngredients();
  }

    ////////// Helper Methods - Eror Handling //////////

  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

     ////////// ngOnInit Methods //////////

  //+ getIsAlive()

  getChocolatesWithIngredients(): void {   
    this.synchronizerService.getChocolatesWithIngredients()
      .subscribe(chocolates => this.chocolates = chocolates);   
  }


  ////////// Chocolate-View Buttons //////////

  setSelectedChocolate(tempChoclate: Chocolate): void {

    if (tempChoclate != null) {
      this.selectedChocolate = tempChoclate;
      this.selectedIngredients = tempChoclate.Ingredients;
      this.getIngredientsForAvailableIngredients();
      this.setAvailableIngredients();
      this.setChocolatePrice();
    }

  }


  putInSelectedIngredients(tempIngredient): void {

    this.selectedIngredients.push(tempIngredient);
    this.deleteFromAvailableIngredients(tempIngredient);
    this.setChocolatePrice();

  }


  putInAivailableIngredients(tempIngredient): void {

    this.availableIngredients.push(tempIngredient);
    this.deleteFromSelectedIngredients(tempIngredient)
    this.setChocolatePrice();

  }


  saveSelectedChocolate():void {
    //TO DO
  }

  enableDisableSelecetedChocolate(): void {
    if (this.selectedChocolate.Available === true)
      { this.selectedChocolate.Available = false }
    else { this.selectedChocolate.Available = true }
  }


  ////////// Chocolate-View Methods //////////

  getIngredientsForAvailableIngredients(): void {

    this.synchronizerService.getIngredients()
      .subscribe(ingredients => this.tempIngredients = ingredients);

  }


  setAvailableIngredients(): void {
    for (var tempIngredient of this.selectedIngredients) {
      var index = this.tempIngredients.indexOf(tempIngredient);
      this.tempIngredients.splice(index, 1);
    };

    this.availableIngredients = this.tempIngredients;
  }
  

  deleteFromAvailableIngredients(tempIngredient): void {
    var index = this.availableIngredients.indexOf(tempIngredient);
    this.availableIngredients.splice(index, 1);
  }

  deleteFromSelectedIngredients(tempIngredient): void {
    var index = this.selectedIngredients.indexOf(tempIngredient);
    this.selectedIngredients.splice(index, 1);
  }


  setChocolatePrice(): void {

    this.chocolatePrice = 0;

    for (var tempIngredient of this.selectedIngredients) {
      this.chocolatePrice += tempIngredient.Price;
    }

  }

}
