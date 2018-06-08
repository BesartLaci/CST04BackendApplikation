import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderActivitiesViewComponent } from './order-activities-view.component';

describe('OrderActivitiesViewComponent', () => {
  let component: OrderActivitiesViewComponent;
  let fixture: ComponentFixture<OrderActivitiesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderActivitiesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderActivitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
