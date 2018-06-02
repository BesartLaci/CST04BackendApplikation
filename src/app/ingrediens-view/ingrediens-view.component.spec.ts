import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngrediensViewComponent } from './ingrediens-view.component';

describe('IngrediensViewComponent', () => {
  let component: IngrediensViewComponent;
  let fixture: ComponentFixture<IngrediensViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngrediensViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngrediensViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
