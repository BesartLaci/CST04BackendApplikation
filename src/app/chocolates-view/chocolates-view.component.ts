import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

import { Console } from '@angular/core/src/console';
import { SynchronizerService } from '../synchronizer.service';

import { Chocolate } from 'src/app/models/chocolate';
import { Ingredient } from 'src/app/models/ingridient';
import { Shape } from 'src/app/models/shape';
import { CustomStyle } from 'src/app/models/customStyle';
import { Wrapping } from 'src/app/models/wrapping';
import { Customer } from 'src/app/models/customer';

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

  shapes: Shape[];




  constructor(
    private synchronizerService: SynchronizerService
        
  ) {

    this.availableIngredients = new Array<Ingredient>();
    console.error('ChocolatesViewComponent constructor mit synchronizerService');
  }

  ngOnInit() {  
    //this.getIsAlive();
    this.selectedChocolate = new Chocolate();
    this.getChocolatesWithIngredients();
    //this.getShapes();
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
    //console.error(this.chocolates.entries);

    //for (var tempChocolate of this.chocolates) {
    //  tempChocolate.calculatePrice();
    //  console.error("Calculate Price for " + tempChocolate.Name + " --> € " + tempChocolate.Price);
    //};

  }

  getShapes(): void {
    this.synchronizerService.getShapes()
      .subscribe(shapes => this.shapes = shapes);
    //console.error(this.shapes.entries);
  }


  ////////// Chocolate-View Buttons //////////

  setSelectedChocolate(tempChocolate: Chocolate): void {

    if (tempChocolate != null) {
      
      this.selectedChocolate = tempChocolate;
      this.setDefaultDemoData();
      this.selectedIngredients = this.selectedChocolate.Ingredients;

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
    this.updateCheck = false;
    this.selectedChocolate.Ingredients = this.selectedIngredients;

    console.error("--------  TRY TO Update Chocolate ------")

    this.synchronizerService.updateChocolate(this.selectedChocolate)
      .subscribe(updateCheck => this.updateCheck = updateCheck);

    this.getChocolatesWithIngredients();

  }

  createNewChocolate(): void {

    this.updateCheck = false;
    this.selectedChocolate.Ingredients = this.selectedIngredients;

    console.error("--------  TRY TO Create new Chocolate ------")

    this.synchronizerService.createNewChocolate(this.selectedChocolate)
      .subscribe(updateCheck => this.updateCheck = updateCheck);

    this.getChocolatesWithIngredients();
  }

  enableDisableSelecetedChocolate(): void {

    this.selectedChocolate.Available = !this.selectedChocolate.Available;
  }


  ////////// Chocolate-View Methods //////////

  getIngredientsForAvailableIngredients(): void {
    console.error("getIngredientsForAvailableIngredients()");

    this.synchronizerService.getIngredients()
      .subscribe(ingredients => this.tempIngredients = ingredients);
    console.error(this.tempIngredients);
  
  }


  setAvailableIngredients(): void {

    console.error("setAvailableIngredients");
    
    for (var availableIngredient of this.tempIngredients) {
      
      for (var tempIngredient of this.selectedIngredients) {

        //console.error("availableIngredientName -->" + availableIngredient.Name + "  === " + tempIngredient.Name + " <-- tempIngredienName" )
        //console.error("availableIngredientId -->" + availableIngredient.IngredientId + " === " + tempIngredient.IngredientId +" <-- tempIngredientId" )        
        this.isInChocolate = (availableIngredient.IngredientId === tempIngredient.IngredientId);

        //console.error("isInChocolate -->  " + this.isInChocolate);
        if (this.isInChocolate) break;
        
      };

      //console.error("isInChocolate bevor try to push -> " + this.isInChocolate)
      if (!this.isInChocolate) {
        //console.error("try to push Not in Chocolate ingredient" + tempIngredient.Name);
        this.availableIngredients.push(availableIngredient);   
      }
         
    }
    
  }

  deleteFromAvailableIngredients(tempIngredient: Ingredient): void {
     
    var index = this.availableIngredients.indexOf(tempIngredient); 
    this.availableIngredients.splice(index, 1);
    
  }


  deleteFromSelectedIngredients(tempIngredient: Ingredient): void {

    var index = this.selectedIngredients.indexOf(tempIngredient);
    this.selectedIngredients.splice(index, 1);

  }

      //generate Demo Date to push new Chocolate
  setDefaultDemoData(): void {
  //-TempData
  //CustumStyle: CustumStyle 9417ea8a-fa2e-4172-83f4-00d2b400a1b9
  //Image: string; http://
  //Wrapping: Wrapping;  d526f03a-29c5-4331-b536-49bf4f3d4cf3
  //Customer e71a6869-7927-4c6d-ac1d-71858cb9f641 / Backend
  //ShapeID e26aa70b-cee9-4eee-8690-c1ebe98f1aeb

    this.selectedChocolate.CustomStyle = new CustomStyle();
    this.selectedChocolate.CustomStyle.CustomStyleId = "59030bdb-8420-4f78-b750-506a702b8eef";

    this.selectedChocolate.Image = "http://";

    this.selectedChocolate.Wrapping = new Wrapping();
    this.selectedChocolate.Wrapping.WrappingId = "d526f03a-29c5-4331-b536-49bf4f3d4cf3";

    this.selectedChocolate.Shape = new Shape();
    this.selectedChocolate.Shape.ShapeId = "e26aa70b-cee9-4eee-8690-c1ebe98f1aeb";

    this.selectedChocolate.CreatedBy = new Customer();
    this.selectedChocolate.CreatedBy.CustomerId = "e71a6869-7927-4c6d-ac1d-71858cb9f641";


  }


  setChocolatePrice(): void {

    this.chocolatePrice = 0;

    for (var tempIngredient of this.selectedIngredients) {
      this.chocolatePrice += tempIngredient.Price;
    }

  }


 

}
