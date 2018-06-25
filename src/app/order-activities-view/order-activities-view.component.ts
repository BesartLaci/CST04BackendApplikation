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
  dateOfOrder: Date;
  dateOfDelivery: Date;


  constructor(
    private synchronizerService: SynchronizerService,
    //private location: Location
  ) {
    console.error('Order Activities constructor mit synchronizerService');
  }

  ngOnInit() {
    console.error('ngOnInit start');
    this.getOrders();
    
    console.error('ngOnInit end');
  }

  getOrders(): void {
    this.synchronizerService.getOrders()
      .subscribe(orders => this.tempOrders = orders);
  }

  setSelectedOrder(tempOrder: Order): void {

    if (tempOrder != null) {

      this.selectedOrder = tempOrder;
      console.error('selected');

      var temp1 = this.selectedOrder.DateOfDelivery.split('(');
      var temp2 = temp1[1].split('+');
      var DateOfDeliveryNumber = parseInt(temp2[0]);
      console.error(DateOfDeliveryNumber);
      this.dateOfDelivery = new Date(DateOfDeliveryNumber);
      console.error(this.dateOfDelivery);

      var temp1 = this.selectedOrder.DateOfOrder.split('(');
      var temp2 = temp1[1].split('+');
      var dateOfOrderNumber = parseInt(temp2[0]);
      this.dateOfOrder = new Date(dateOfOrderNumber);
      //console.error(this.selectedOrder);
      //this.setDefaultDemoData();
    }

  }
}
