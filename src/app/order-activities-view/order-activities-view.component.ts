import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SynchronizerService } from 'src/app/synchronizer.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Ingredient } from 'src/app/models/ingridient';
import { Input } from '@angular/core';

@Component({
  selector: 'app-order-activities-view',
  templateUrl: './order-activities-view.component.html',
  styleUrls: ['./order-activities-view.component.css']
})

export class OrderActivitiesViewComponent implements OnInit {
  tempOrders: Order[];
  tempIngredients: Ingredient[];
  @Input() selectedOrder: Order;
  //newOrders: Order[];
  //pausedOrders: Order[];
  //delayOrders: Order[];
  ////tempOrder: Order;
  ////@Input() selectedOrder: Order;
  //isAlive: boolean;
  //updateCheck: boolean;
  //newId = '0c16612c-9ad3-4ffe-bb58-3ea434e0f91f';
  //pausedId = "e9ea67d5-bee2-4372-9abb-408a2afe3640";
  //delayId = "83d176ef-0c09-4fdb-9e8e-3f422bed7867";

  constructor(
    private synchronizerService: SynchronizerService,
    //private location: Location
  ) {
    console.error('Order Activities constructor mit synchronizerService');
  }

  ngOnInit() {
    console.error('ngOnInit start');

    //this.getIngredientsForAvailableIngredients();
    this.getOrders();

    
    console.error('ngOnInit end');
  }

  ////////// Helper Methods - Eror Handling //////////

  //getIsAlive(): void {
  //  this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  //}

  ////////// ngOnInit Methods //////////

  getOrders(): void {
    this.synchronizerService.getOrders()
      .subscribe(orders => this.tempOrders = orders);
  }

  setSelectedOrder(tempOrder: Order): void {

    if (tempOrder != null) {

      this.selectedOrder = tempOrder;
      console.error('selected');
      console.error(this.selectedOrder);
      //this.setDefaultDemoData();
      //this.selectedIngredients = this.selectedChocolate.Ingredients;

      //this.availableIngredients = new Array<Ingredient>();

      //this.getIngredientsForAvailableIngredients();
      //this.setAvailableIngredients();
      //this.setChocolatePrice();
    }

  }

  getIngredientsForAvailableIngredients(): void {
    console.error("getIngredientsForAvailableIngredients()");

    this.synchronizerService.getIngredients()
      .subscribe(ingredients => this.tempIngredients = ingredients);
    console.error(this.tempIngredients);

  }


  //getAnotherOrders(): void {

  //  console.error('getAnotherOrders() start');
  //  this.newOrders = new Array<Order>();
  //  console.error(this.allOrders.entries);

  //  for (var tempOrder of this.allOrders) {
  //    console.error('x');
  //    this.newOrders.push(tempOrder);


  //    //if (tempOrder.Status.OrderStatusId.match(this.newId)) {
  //    //  console.error(tempOrder);
  //    //  this.newOrders.push(tempOrder);
  //    //}
  //    //else if (tempOrder.Status.OrderStatusId.match(this.pausedId)) {
  //    //  this.pausedOrders.push(tempOrder);
  //    //}
  //    //else if (tempOrder.Status.OrderStatusId.match(this.delayId)) {
  //    //  this.delayOrders.push(tempOrder);
  //    //}
  //  }
  //  //console.error(this.newOrders);
  //}

}
