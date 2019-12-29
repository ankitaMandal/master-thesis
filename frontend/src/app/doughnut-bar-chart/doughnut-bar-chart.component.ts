import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-bar-chart',
  templateUrl: './doughnut-bar-chart.component.html',
  styleUrls: ['./doughnut-bar-chart.component.css']
})
export class DoughnutBarChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Unannotated Answers','Annotated Answers'];
  public doughnutChartData = [200,  500];
  public doughnutChartType: ChartType = 'doughnut';
  constructor() { }
  public chartColors: any[] = [
    { 
      backgroundColor:["#9e0059", "#150578" ] 
    }];
  ngOnInit() {
  }

}
