import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SynchronizerService } from 'src/app/synchronizer.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-order-activities-view',
  templateUrl: './order-activities-view.component.html',
  styleUrls: ['./order-activities-view.component.css']
})
export class OrderActivitiesViewComponent implements OnInit {
  orders: Order[];
  newOrders: Order[];
  pausedOrders: Order[];
  delayOrders: Order[];
  tempOrder: Order;
  //@Input() selectedOrder: Order;
  isAlive: boolean;
  updateCheck: boolean;
  newId = '0c16612c-9ad3-4ffe-bb58-3ea434e0f91f';
  pausedId = "e9ea67d5-bee2-4372-9abb-408a2afe3640";
  delayId = "83d176ef-0c09-4fdb-9e8e-3f422bed7867";

  constructor(
    private synchronizerService: SynchronizerService,
    //private location: Location
  ) {
    console.error('Order Activities constructor mit synchronizerService');
  }

  ngOnInit() {
    console.error('ngOnInit start');
    this.getOrders();
    this.getIsAlive();
    this.newOrders = this.orders;
    //this.getAnotherOrders();
    console.error(this.newOrders);
    console.error('ngOnInit end');
  }

  ////////// Helper Methods - Eror Handling //////////

  getIsAlive(): void {
    this.synchronizerService.getIsAlive().subscribe(isAlive => this.isAlive = isAlive);
  }

  ////////// ngOnInit Methods //////////

  getOrders(): void {
    console.error('getOrders() start');
    this.synchronizerService.getOrders()
      .subscribe(orders => this.orders = orders);
    console.error('getOrders() durchgeführt');
  }

  getAnotherOrders(): void {
    console.error('getAnotherOrders() start');
    for (var tempOrder of this.orders) {
      if (tempOrder.Status.StatusId == this.newId) {
        console.error(tempOrder);
        this.newOrders.push(tempOrder);
      }
      else if (tempOrder.Status.StatusId == this.pausedId) {
        this.pausedOrders.push(tempOrder);
      }
      else if (tempOrder.Status.StatusId == this.delayId) {
        this.delayOrders.push(tempOrder);
      }
    }
  }

}
