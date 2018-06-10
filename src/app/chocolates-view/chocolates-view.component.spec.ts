import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatesViewComponent } from './chocolates-view.component';

describe('ChocolatesViewComponent', () => {
  let component: ChocolatesViewComponent;
  let fixture: ComponentFixture<ChocolatesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChocolatesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChocolatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
