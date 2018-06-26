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

  selectedFile: File;

  ingredients: Ingredient[];
  @Input() selectedIngredient: Ingredient;
  isAlive: boolean;
  updateCheck: boolean;

  ingredientTypes: string[];

  constructor(
    private synchronizerService: SynchronizerService,
    
  ) {
    this.ingredientTypes = new Array<string>();
      console.error('IngredientsViewComponent constructor mit synchronizerService');
    }

  ngOnInit() {
    console.error('ngOnInit start');
    this.selectedIngredient = new Ingredient();
    this.ingredientTypes.push("Filling");
    this.ingredientTypes.push("Base");  
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

    this.ingredients.sort((a, b) => a.Name.localeCompare(b.Name));
    //this.ingredients.sort();
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

  }

  refresh(): void {
    window.location.reload();
   
  }

  

  //let you select a File from your local mashin
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]

    this.synchronizerService.onUpload(this.selectedFile);
  }


}


