import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {
  date = new Date();
  shortDate = this.date.getDay() + '.' + this.date.getMonth() + '.' + this.date.getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
