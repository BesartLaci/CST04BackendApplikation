import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { Console } from '@angular/core/src/console';

import { SynchronizerService } from '../synchronizer.service';
import { Ingredient } from 'src/app/models/ingridient';

@Component({
  selector: 'app-ingredients-view',
  templateUrl: './ingredients-view.component.html',
  styleUrls: ['./ingredients-view.component.css']
})
export class IngredientsViewComponent implements OnInit {

  ingredients: Ingredient[];
  @Input() selectedIngredient: Ingredient;
  isAlive: boolean;
  updateCheck: boolean;

  constructor(
    private synchronizerService: SynchronizerService,
    
    ) {
      console.error('IngredientsViewComponent constructor mit synchronizerService');
    }

  ngOnInit() {
    console.error('ngOnInit start');
    this.getIngredients();
    this.selectedIngredient = new Ingredient();
    this.getIsAlive();
    console.error('ngOnInit end');
  }

  ////////// Helper Methods - Eror Handling //////////

  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

    ////////// ngOnInit Methods //////////

  //+ getIsAlive()

  getIngredients(): void {
    console.error('getIngredients() start');
    this.synchronizerService.getIngredients()
      .subscribe(ingredients => this.ingredients = ingredients);
    console.error('getIngredients() durchgeführt');
  }

    ////////// Chocolate-View Methods //////////


  ////////// Chocolate-View Buttons //////////

  setSelectedIngredient(tempIngredient: Ingredient): void {
    if (tempIngredient != null) {
      this.selectedIngredient = tempIngredient;
    }
    this.getIngredients();

  }

  saveSelectedIngredient(): void {
      this.synchronizerService.updateIngredient(this.selectedIngredient)
        .subscribe(updateCheck => this.updateCheck = updateCheck);
      this.getIngredients();
  }

  createNewIngredient(): void {
    this.updateCheck = false;
    this.synchronizerService.createNewIngredient(this.selectedIngredient)
      .subscribe(updateCheck => this.updateCheck = updateCheck);
    this.getIngredients();

          
  }  

  enableDisableSelecetedIgredient(): void {

    this.selectedIngredient.Available = !this.selectedIngredient.Available;

    //if (this.selectedIngredient.Available === true)
    //{ this.selectedIngredient.Available = false }
    //else { this.selectedIngredient.Available = true }

  }



}
