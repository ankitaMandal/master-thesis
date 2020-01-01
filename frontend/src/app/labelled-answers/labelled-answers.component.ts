import {ChangeDetectionStrategy, Component} from '@angular/core';

/** @title Virtual scrolling `<dl>` */
@Component({
  selector: 'app-labelled-answers',
  templateUrl: './labelled-answers.component.html',
  styleUrls: ['./labelled-answers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelledAnswersComponent {
  labels = [
            {labelName:"Correct", color:"#A6C48A"}, 
             {labelName:"Partially Correct", color:"#FFBA49"},
             {labelName:"Incorrect", color:"#EF5B5B"},
             {labelName:"Insult", color:"#f4c2c2"},
             {labelName:"Apathetic", color:"#A0D2DB"},
             {labelName:"Cry For Help", color:"#514D45"}
  ];
}
