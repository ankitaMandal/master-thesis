import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { LabelanswersService } from '../labelanswers.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
/** @title Virtual scrolling `<dl>` */
@Component({
  selector: 'app-labelled-answers',
  templateUrl: './labelled-answers.component.html',
  styleUrls: ['./labelled-answers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelledAnswersComponent {
  drop;
  constructor(private myservice: LabelanswersService) {}
  labels = [
            {labelName:"Correct", color:"#A6C48A"}, 
             {labelName:"Partially Correct", color:"#FFBA49"},
             {labelName:"Incorrect", color:"#EF5B5B"},
             {labelName:"Insult", color:"#f4c2c2"},
             {labelName:"Apathetic", color:"#A0D2DB"},
             {labelName:"Cry For Help", color:"#514D45"}
  ];
  ngOnInit() {
    
  }
 
}
