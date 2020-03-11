
import {ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit,ViewChild} from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { AnswerService } from './../answer.service';
import { MatListOption } from '@angular/material/list'
import { IAnswer } from './../answer';
import {SelectionModel} from '@angular/cdk/collections';
import { DoughnutBarChartComponent } from '../doughnut-bar-chart/doughnut-bar-chart.component';
import swal from 'sweetalert';
@Component({
  selector: 'app-annotation-workbench',
  templateUrl: './annotation-workbench.component.html',
  styleUrls: ['./annotation-workbench.component.css']
})
export class AnnotationWorkbenchComponent implements OnInit {
  
  selectAllChecked=false;
  selectedLabel = "";
  searchPattern ="";
  searchPatternDist="";
  POSLemmaOverlap = 0;
  spellingVariance=0;
  semanticSimilarity=0;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  labels = [
    {labelName:"Correct", color:"#A6C48A",answers:["Correct Dummy ans1","Correct Dummy ans 2","Correct Dummy ans3","Correct Dummy ans 4"]}, 
     {labelName:"Partially Correct", color:"#FFBA49",answers:["PC Dummy ans1","PC Dummy ans 2","PC Dummy ans1","PC Dummy ans 2"]},
     {labelName:"Incorrect", color:"#EF5B5B",answers:["Incorrect Dummy ans1","Incorrect Dummy ans 2","Incorrect Dummy ans1","Incorrect Dummy ans 2"]},
     {labelName:"Insult", color:"#f4c2c2",answers:["Insult Dummy ans1","Insult Dummy ans 2"]},
     {labelName:"Apathetic", color:"#A0D2DB",answers:["Apathetic Dummy ans1","Apathetic Dummy ans 2","Apathetic Dummy ans1","Apathetic Dummy ans 2"]},
     {labelName:"Cry For Help", color:"#514D45",answers:["Help Dummy ans1","Help Dummy ans 2","Help Dummy ans3","Help Dummy ans 4"]}
];
  constructor(private ref: ChangeDetectorRef,private _answerService : AnswerService) {}
  @ViewChild(DoughnutBarChartComponent, { static: false }) childC: DoughnutBarChartComponent;
  changeStatus(): void {
    setTimeout(() => {
      this.ref.detectChanges()
    }, 1500);
  }
  chipControl = new FormControl(new Set());
  toggleChip = (chip: any) => {
    const addChip = () => { this.chips.add(chip); };
    const removeChip = () => { this.chips.delete(chip); };

    this.chips.has(chip) ? removeChip() : addChip();
  }

  get chips() { return this.chipControl.value; }
  public errorMsg;
  public NoMatchMsg="No Matches";
  public answers = [];
  public sortedanswers = [];
  public selectedAnswers: IAnswer[]= [];
  ngOnInit() {
    this._answerService.getAnswers()
    .subscribe(data => {
     this.answers = data;
     console.log(this.answers)
    },
      error => this.errorMsg = error); 
  }
onPOSLemmaInputChange(event: any) {
    this.POSLemmaOverlap=event.value; 
}
onSpellingVarianceInputChange(event: any) {
  this.spellingVariance=event.value;
}
onSemanticSimilarityInputChange(event: any) {
  this.semanticSimilarity=event.value; 
}
search(value) {
  this.searchPattern=value;
  this.searchPatternDist=value.replace(' ','_')+'_dist'
  this._answerService.postSearchPattern(this.searchPattern)
  .subscribe(search => {
    this.searchPattern;
  });
    this._answerService.getSortedAnswers()
    .subscribe(data => {
     this.sortedanswers = data;
    },
      error => this.NoMatchMsg = "No matches");   
}
get filterBySemantic() {
  return this.sortedanswers.filter( x => x._dist >=(this.semanticSimilarity/100));
}
public selectMe(item) {
  this.selectedAnswers.push(item);
}

markAs(pText :string,list)
  {
    this.selectedLabel= pText;
    this.selectedAnswers.forEach(element => {
      element['label']=this.selectedLabel;
      
    });
    this._answerService.postLabelledAnswers(this.selectedAnswers)
    .subscribe(search => {
      this.searchPattern;
    },
      error => this.errorMsg = error);
    swal("Annotated \u2713", "Selected answer(s) labelled as '"+pText+"'. Press OK to continue annotation process.");  
    this.ngOnInit();
    this.childC.refresh();
    
  }
 
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }


}


