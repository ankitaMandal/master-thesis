import { AnswerService } from './../answer.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-doughnut-bar-chart',
  templateUrl: './doughnut-bar-chart.component.html',
  styleUrls: ['./doughnut-bar-chart.component.css']
})
export class DoughnutBarChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Unannotated Answers','Annotated Answers'];
  public doughnutChartData =[];
  public doughnutChartType: ChartType = 'doughnut';
  constructor(private _answerService : AnswerService) { }
  public chartColors: any[] = [
    { 
      backgroundColor:["#9e0059", "#150578" ] 
    }];
  public errorMsg;
  ngOnInit() {
    this._answerService.getCount()
    .subscribe(data => {
      this.doughnutChartData=[data['unannotated'],data['annotated']]
    },
      error => this.errorMsg = error);
  }

}
