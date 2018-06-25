import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SynchronizerService } from 'src/app/synchronizer.service';

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
 

  constructor(private synchronizerService: SynchronizerService)
  {
  }

  ngOnInit() {
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

  setSales(): void {
    for (var tempOrder of this.Orders) {
      this.SumSales += 0;
    }
  }

  setCounterOpenorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'New') {
        this.countOpenOrders += 1;
      }
    }
  }

  setCounterPausedorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'Paused') {

        var temp1 = tempOrder.DateOfOrder.split('(');
        var temp2 = temp1[1].split('+');
        var dateOfOrder: number = parseInt(temp2[0]);
        console.error(dateOfOrder);

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
        console.error(dateOfOrder);

        if ((dateOfOrder >= this.startDateNumber) && (dateOfOrder <= this.todayNumber)) {
          this.countInProgressOrders += 1;
        }
      }
    }
  }

  setCounterDelayedorders(): void {
    for (var tempOrder of this.Orders) {
      if (tempOrder.Status.Decription === 'Delayed') {
        this.countDelayedOrders += 1;
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

  //getDate(): string {
  //  var dd = this.today.getDate();
  //  var mm = this.today.getMonth() + 1; //January is 0!
  //  var yyyy = this.today.getFullYear();

  //  var startDate = yyyy + '-0' + mm + '-' + dd;
  //  return startDate;
  //}

  //getendDate(): string {
  //  var dd = this.today.getDate();

  //  var x = this.today.setDate(dd - 30);
  //  var endDays = this.today.getDate();
  //  var endMonth = this.today.getMonth()+1;
  //  var endYear = this.today.getFullYear();

  //  var endDate = endYear + '-0' + endMonth + '-' + endDays;
  //  return endDate;
  //}

  //getShortDate(): void {

  //  if (this.dd < 10) {
  //    this.dd = '0' + this.dd;
  //  }
  //  if (this.mm < 10) {
  //    this.mm = '0' + this.mm;
  //  }

  //  var shortDate = this.dd + '/' + this.mm + '/' + this.yyyy;
  //}

}
