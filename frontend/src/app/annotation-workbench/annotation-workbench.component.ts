import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { AnswerService } from './../answer.service';
import { IAnswer } from './../answer';
@Component({
  selector: 'app-annotation-workbench',
  templateUrl: './annotation-workbench.component.html',
  styleUrls: ['./annotation-workbench.component.css']
})
export class AnnotationWorkbenchComponent implements OnInit {
  selectAllChecked=false;
  searchPattern ="";
  POSLemmaOverlap = 0;
  spellingVariance=0;
  semanticSimilarity=0;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  considerSemantics=false;
  labels = [
    {labelName:"Correct", color:"#A6C48A",answers:["Correct Dummy ans1","Correct Dummy ans 2","Correct Dummy ans3","Correct Dummy ans 4"]}, 
     {labelName:"Partially Correct", color:"#FFBA49",answers:["PC Dummy ans1","PC Dummy ans 2","PC Dummy ans1","PC Dummy ans 2"]},
     {labelName:"Incorrect", color:"#EF5B5B",answers:["Incorrect Dummy ans1","Incorrect Dummy ans 2","Incorrect Dummy ans1","Incorrect Dummy ans 2"]},
     {labelName:"Insult", color:"#f4c2c2",answers:["Insult Dummy ans1","Insult Dummy ans 2"]},
     {labelName:"Apathetic", color:"#A0D2DB",answers:["Apathetic Dummy ans1","Apathetic Dummy ans 2","Apathetic Dummy ans1","Apathetic Dummy ans 2"]},
     {labelName:"Cry For Help", color:"#514D45",answers:["Help Dummy ans1","Help Dummy ans 2","Help Dummy ans3","Help Dummy ans 4"]}
];
  constructor(private _answerService : AnswerService) {}
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
    this._answerService.postPOSLemmaSliderValue(this.POSLemmaOverlap)
    .subscribe(poslemmaoverlap => {
      this.POSLemmaOverlap;
    },
      error => this.errorMsg = error); 
}
onSpellingVarianceInputChange(event: any) {
  this.spellingVariance=event.value;
  this._answerService.postSpellingVarianceSliderValue(this.spellingVariance)
  .subscribe(spellingvariance => {
    this.spellingVariance;
  },
    error => this.errorMsg = error); 
}
onSemanticSimilarityInputChange(event: any) {
  this.semanticSimilarity=event.value;
  this._answerService.postSemanticSimilaritySliderValue(this.semanticSimilarity)
  .subscribe(semanticsimilarity => {
    this.semanticSimilarity;
  },
    error => this.errorMsg = error); 
}
search(value) {
  this.searchPattern=value;
  console.log(this.searchPattern)
  this._answerService.postSearchPattern(this.searchPattern)
  .subscribe(search => {
    this.searchPattern;
  },
    error => this.errorMsg = error); 
    this._answerService.getSortedAnswers()
    .subscribe(data => {
     this.sortedanswers = data;
     console.log(this.sortedanswers)
    },
      error => this.NoMatchMsg = "No matches");

    
}



}


