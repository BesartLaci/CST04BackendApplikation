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
    //private location: Location
    ) {
      console.error('IngredientsViewComponent constructor mit synchronizerService');
    }

  ngOnInit() {
    console.error('ngOnInit start');
    this.getIngredients();
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

  }

    saveSelectedIngredient(): void {
      this.synchronizerService.updateIngredient(this.selectedIngredient)
        .subscribe(updateCheck => this.updateCheck = updateCheck);
      //this.getIngredients();
  }

  createNewIngredient(): void {
    this.selectedIngredient.Available = true;
    this.selectedIngredient.Description = 'new Ingredient created';
          
  }  

  enableDisableSelecetedIgredient(): void {
    if (this.selectedIngredient.Available === true)
    { this.selectedIngredient.Available = false }
    else { this.selectedIngredient.Available = true }
  }



}
