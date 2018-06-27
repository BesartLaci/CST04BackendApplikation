import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SynchronizerService } from 'src/app/synchronizer.service';
import { Package } from 'src/app/models/package';
import { OrderContent } from 'src/app/models/ordercontent';
import { Ingredient } from 'src/app/models/ingridient';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  today = new Date();
  startDate = new Date();
  todayNumber: number;
  startDateNumber: number;
  countOpenOrders: number;
  countPausedOrders: number;
  SumSales: number;
  countInProgressOrders: number;
  countDelayedOrders: number;
  Orders: Order[];
  packages: Package[];
  OrderContentList: OrderContent[];
  IngredientList: Ingredient[];
  packagePrice: number;
  SumSalesString: string;
 

  constructor(private synchronizerService: SynchronizerService)
  {
    this.OrderContentList = new Array<OrderContent>();
    this.Orders = new Array<Order>();
    this.IngredientList = new Array<Ingredient>();
    this.packages = new Array<Package>();
  }

  ngOnInit() {
    this.OrderContentList = new Array<OrderContent>();
    this.Orders = new Array<Order>();
    this.IngredientList = new Array<Ingredient>();
    this.packages = new Array<Package>();
    this.setSales();
    this.getStartDate();
    this.getDateNumbers();
    this.countOpenOrders = 0;
    this.countPausedOrders = 0;
    this.countInProgressOrders = 0;
    this.countDelayedOrders = 0;
    this.SumSales = 0;
    this.getDateNumbers();
    this.refresh();
  }

  setSales(): void {

    for (var tempOrder of this.Orders) {
      var temp1 = tempOrder.DateOfOrder.split('(');
      var temp2 = temp1[1].split('+');
      var dateOfOrder: number = parseInt(temp2[0]);
      //console.error(dateOfOrder);
      console.error('drinnen1');

      if ((dateOfOrder >= this.startDateNumber) && (dateOfOrder <= this.todayNumber)) {
        console.error('drinnen2');
        this.getOrderContentChocolates(tempOrder.OrderId);
        //console.error(this.OrderContentList)

        for (var tempOrderContent of this.OrderContentList) {
 
          console.error(tempOrderContent.Chocolate.ChocolateId);
          if (tempOrderContent.Chocolate.ChocolateId) {
            this.getIngredientsByChocolateId(tempOrderContent.Chocolate.ChocolateId);
            console.error('drinnen3')

            for (var tempIngredient of this.IngredientList) {
              console.error('drinnen4')
              this.SumSales += tempIngredient.Price;
              console.error(this.SumSales)
            }
            this.SumSales = this.SumSales * tempOrderContent.Amount;
            this.SumSalesString = this.SumSales.toFixed(2);
            
          }
        }  
      }
    }
  }

  getIngredientsByChocolateId(id): void {
    this.synchronizerService.getIngredientsWithChocoladeId(id)
      .subscribe(ingredients => this.IngredientList = ingredients);
  }

  getOrderContentChocolates(id): void {
    this.synchronizerService.getOrdersContentChocolateWithOrderId(id)
      .subscribe(ordercontent => this.OrderContentList = ordercontent);
  }

  getDateNumbers(): void {
    var todayString = this.today.toUTCString();
    this.todayNumber = Date.parse(todayString);

    var startDateString = this.startDate.toUTCString();
    this.startDateNumber = Date.parse(startDateString);

  }

  getStartDate(): void {
    var dd = this.today.getDate();
    var x = this.startDate.setDate(dd - 30);
  }

  refresh(): void {
    console.error('refresh button gedrückt')
    this.countOpenOrders = 0;
    this.countPausedOrders = 0;
    this.countInProgressOrders = 0;
    this.countDelayedOrders = 0;
    this.SumSales = 0;
    //this.getDateNumbers();
    this.getOrders();
    this.setCounterOpenorders();
    this.setCounterPausedorders();
    this.setCounterInProgressorders();
    this.setCounterDelayedorders();
    this.setSales();
  }


  setCounterOpenorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'New') {
        var temp1 = tempOrder.DateOfOrder.split('(');
        var temp2 = temp1[1].split('+');
        var dateOfOrder: number = parseInt(temp2[0]);
        //console.error(dateOfOrder);

        if ((dateOfOrder >= this.startDateNumber) && (dateOfOrder <= this.todayNumber)) {
          this.countOpenOrders += 1;
        }
      }
    }
  }

  setCounterPausedorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'Paused') {

        var temp1 = tempOrder.DateOfOrder.split('(');
        var temp2 = temp1[1].split('+');
        var dateOfOrder: number = parseInt(temp2[0]);
        //console.error(dateOfOrder);

        if ((dateOfOrder >= this.startDateNumber) && (dateOfOrder <= this.todayNumber)) {
          this.countPausedOrders += 1;
        }
      }
    }
  }

  setCounterInProgressorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'InProgress') {

        var temp1 = tempOrder.DateOfOrder.split('(');
        var temp2 = temp1[1].split('+');
        var dateOfOrder: number = parseInt(temp2[0]);
        //console.error(dateOfOrder);

        if ((dateOfOrder >= this.startDateNumber) && (dateOfOrder <= this.todayNumber)) {
          this.countInProgressOrders += 1;
        }
      }
    }
  }

  setCounterDelayedorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'Delayed') {
        var temp1 = tempOrder.DateOfOrder.split('(');
        var temp2 = temp1[1].split('+');
        var dateOfOrder: number = parseInt(temp2[0]);
        //console.error(dateOfOrder);

        if ((dateOfOrder >= this.startDateNumber) && (dateOfOrder <= this.todayNumber)) {
          this.countDelayedOrders += 1;
          }
        }
      }
    }

  getOrders(): void {
    this.synchronizerService.getOrders()
      .subscribe(orders => this.Orders = orders);
    //console.error(this.tempIngredients);
  }

  selectNewStartDate(event: any) {
    console.error('date changed');
    this.startDateNumber = Date.parse(event.target.value);
  }

  selectNewtoday(event: any) {
    console.error('date changed');
    this.todayNumber = Date.parse(event.target.value);
  }

}
