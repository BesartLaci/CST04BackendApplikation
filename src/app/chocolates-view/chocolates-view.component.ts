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

  chocolates$: Observable<Chocolate[]>;
  @Input() selectedChocolate: Chocolate;
  chocolatePrice: number;

  tempIngredients$: Observable<Ingredient[]>;
  availableIngredients$: Observable<Ingredient[]>;
  selectedIngredients$: Observable<Ingredient[]>;
  


  constructor(
    private synchronizerService: SynchronizerService,
    
  ) {
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }

  ngOnInit() {  
    //this.getIsAlive();
    this.selectedChocolate = new Chocolate();
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
      .subscribe(chocolates => this.chocolates$ = chocolates);   
  }


  ////////// Chocolate-View Buttons //////////

  setSelectedChocolate(tempChocolate: Chocolate): void {

    if (tempChocolate != null) {
      this.getChocolatesWithIngredients();
      this.selectedChocolate = tempChocolate;
      this.selectedIngredients$ = this.selectedChocolate.Ingredients;
      this.getIngredientsForAvailableIngredients();
      this.setAvailableIngredients();
      this.setChocolatePrice();
    }

  }


  putInSelectedIngredients(tempIngredient): void {

    this.selectedIngredients$.push(tempIngredient);
    this.deleteFromAvailableIngredients(tempIngredient);
    this.setChocolatePrice();

  }


  putInAivailableIngredients(tempIngredient): void {

    this.availableIngredients$.push(tempIngredient);
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
      .subscribe(ingredients => this.tempIngredients$ = ingredients);
  
  }


  setAvailableIngredients(): void {
    for (var availableIngredient of this.tempIngredients$ {

      for (var tempIngredient of this.selectedIngredients$) {
        if (tempIngredient.IngredientId == availableIngredient.IngredientId) {

        } else {

          this.availableIngredients$.push(availableIngredient);
        }


      };

      //this.availableIngredients = this.tempIngredients;
    }
  }

  deleteFromAvailableIngredients(tempIngredient): void {
    console.error(tempIngredient.IngredientId);
    
    var index = this.availableIngredients$.indexOf(tempIngredient);
    console.error(index)
    console.error(this.availableIngredients$.splice(index, 1));
    
  }

  deleteFromSelectedIngredients(tempIngredient): void {
    var index = this.selectedIngredients$.indexOf(tempIngredient);
    this.selectedIngredients$.splice(index, 1);
  }


  setChocolatePrice(): void {

    this.chocolatePrice = 0;

    for (var tempIngredient of this.selectedIngredients$) {
      this.chocolatePrice += tempIngredient.Price;
    }

  }

}
