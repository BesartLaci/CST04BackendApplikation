import { Component, OnInit, Inject } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Console } from '@angular/core/src/console';

import { SynchronizerService } from '../synchronizer.service';
import { Ingredient } from 'src/app/models/ingridient';

@Component({
  selector: 'app-ingrediens-view',
  templateUrl: './ingrediens-view.component.html',
  styleUrls: ['./ingrediens-view.component.css']
})
export class IngrediensViewComponent implements OnInit {
  
  ingrediens: Ingredient[];
  isAlive: boolean;

  constructor(private synchronizerService: SynchronizerService) {
    console.error('bevor querry ngOnit');
  }

  ngOnInit() {
    console.error('bevor ngOnInit');
    this.getIngrediens();
    this.getIsAlive();
  }


  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

  getIngrediens(): void {
    this.synchronizerService.getIngrediens().subscribe(ingrediens => this.ingrediens = ingrediens);
  }

 
}



