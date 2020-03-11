import { AnswerService } from './../answer.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-doughnut-bar-chart',
  templateUrl: './doughnut-bar-chart.component.html',
  styleUrls: ['./doughnut-bar-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoughnutBarChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Unannotated Answers','Annotated Answers'];
  public doughnutChartData =[];
  public doughnutChartType: ChartType = 'doughnut';
  constructor(private ref: ChangeDetectorRef,private _answerService : AnswerService) {    
    setInterval(() => {
      this.ref.detectChanges();
     }, 1000);
    }
  public chartColors: any[] = [
    { 
      backgroundColor:["#9e0059", "#150578" ] 
    }];
  public errorMsg;
  ngOnInit() {
    this._answerService.getCount()
    .subscribe(data => {
      this.doughnutChartData=[data['unannotated'],data['annotated']]
      console.log(data)
    },
      error => this.errorMsg = error);
  }

  refresh(){
    this._answerService.getCount()
    .subscribe(data => {
      this.doughnutChartData=[data['unannotated'],data['annotated']]
      console.log(data)
    },
      error => this.errorMsg = error);
  }

}
