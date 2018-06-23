import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {
  //date = Date.now();

  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1; //January is 0!
  yyyy = this.today.getFullYear();

  startDate = this.yyyy + '-0' + this.mm + '-' + this.dd;

  x = this.today.setDate(this.dd + 30);
  endDays = this.today.getDate();
  endMonth = this.today.getMonth();
  endYear = this.today.getFullYear();

  endDate = this.endYear + '-0' + this.endMonth + '-' + this.endDays;

  //shortDate = this.date.getFullYear() + '-0' + this.date.getMonth() + '-0' + this.date.getDay();

  constructor() { }

  ngOnInit() {
    //this.getShortDate();
  }

  getShortDate(): void {

    //if (this.dd < 10) {
    //  this.dd = '0' + this.dd;
    //}
    //if (this.mm < 10) {
    //  this.mm = '0' + this.mm;
    //}

    //var shortDate = this.dd + '/' + this.mm + '/' + this.yyyy;
  }

}
