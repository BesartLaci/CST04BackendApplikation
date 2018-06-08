import { Component, OnInit, Inject } from '@angular/core';

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
  isAlive: boolean;

  constructor(private synchronizerService: SynchronizerService) {
    console.error('bevor querry ngOnit');
  }

  ngOnInit() {
    console.error('bevor ngOnInit');
    this.getIngredients();
    //this.getIsAlive();
  }


  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

  getIngredients(): void {
    this.synchronizerService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
  }

}
