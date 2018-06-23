import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

import { Console } from '@angular/core/src/console';
import { SynchronizerService } from '../synchronizer.service';

import { Chocolate } from 'src/app/models/chocolate';
import { Ingredient } from 'src/app/models/ingridient';

@Component({
  selector: 'app-chocolates-view',
  templateUrl: './chocolates-view.component.html',
  styleUrls: ['./chocolates-view.component.css']
})
export class ChocolatesViewComponent implements OnInit {

  isAlive: boolean;
  updateCheck: boolean;

  chocolates: Chocolate[];
  @Input() selectedChocolate: Chocolate;
  chocolatePrice: number;

  tempIngredients: Ingredient[];
  availableIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  isInChocolate: boolean;
  


  constructor(
    private synchronizerService: SynchronizerService
        
  ) {
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }

  ngOnInit() {  
    //this.getIsAlive();
    this.selectedChocolate = new Chocolate();
    this.getChocolatesWithIngredients();
    this.availableIngredients = new Array<Ingredient>();
    this.getIngredientsForAvailableIngredients();
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

  setSelectedChocolate(tempChocolate: Chocolate): void {

    if (tempChocolate != null) {
      //this.getChocolatesWithIngredients();
      this.selectedChocolate = tempChocolate;
      this.selectedIngredients = this.selectedChocolate.Ingredients;

      //this.tempIngredients = new Array<Ingredient>();
      this.availableIngredients = new Array<Ingredient>();

      this.getIngredientsForAvailableIngredients();
      this.setAvailableIngredients();
      this.setChocolatePrice();
    }

  }


  putInSelectedIngredients(tempIngredient): void {

    //this.selectedIngredients$.push(tempIngredient);
    this.selectedChocolate.Ingredients.push(tempIngredient)
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
    console.error("getIngredientsForAvailableIngredients");

    this.synchronizerService.getIngredients()
      .subscribe(ingredients => this.tempIngredients = ingredients);
  
  }


  setAvailableIngredients(): void {

    console.error("setAvailableIngredients");
    
    for (var availableIngredient of this.tempIngredients) {
      
      for (var tempIngredient of this.selectedIngredients) {

        console.error("availableIngredientName -->" + availableIngredient.Name + "  === " + tempIngredient.Name + " <-- tempIngredienName" )
        console.error("availableIngredientId -->" + availableIngredient.IngredientId + " === " + tempIngredient.IngredientId +" <-- tempIngredientId" )        
        this.isInChocolate = (availableIngredient.IngredientId === tempIngredient.IngredientId);

        console.error("isInChocolate -->  " + this.isInChocolate);
        if (this.isInChocolate) break;
        
      };

      console.error("isInChocolate bevor try to push -> " + this.isInChocolate)
      if (!this.isInChocolate) {
        console.error("try to push Not in Chocolate ingredient" + tempIngredient.Name);
        this.availableIngredients.push(availableIngredient);   
      }
         
    }
    //this.availableIngredients = this.tempIngredients;
  }

  deleteFromAvailableIngredients(tempIngredient: Ingredient): void {
    console.error(tempIngredient.IngredientId);
    
    var index = this.availableIngredients.indexOf(tempIngredient);
    console.error(index)
    console.error(this.availableIngredients.splice(index, 1));
    
  }

  deleteFromSelectedIngredients(tempIngredient: Ingredient): void {
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
