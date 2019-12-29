import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutBarChartComponent } from './doughnut-bar-chart.component';

describe('DoughnutBarChartComponent', () => {
  let component: DoughnutBarChartComponent;
  let fixture: ComponentFixture<DoughnutBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
