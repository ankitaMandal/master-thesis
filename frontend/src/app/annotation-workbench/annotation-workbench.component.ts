
import {ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit,ViewChild} from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { AnswerService } from './../answer.service';
import { MatListOption } from '@angular/material/list'
import { IAnswer } from './../answer';
import {SelectionModel} from '@angular/cdk/collections';
import { DoughnutBarChartComponent } from '../doughnut-bar-chart/doughnut-bar-chart.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import swal from 'sweetalert';
@Component({
  selector: 'app-annotation-workbench',
  templateUrl: './annotation-workbench.component.html',
  styleUrls: ['./annotation-workbench.component.css']
})
export class AnnotationWorkbenchComponent implements OnInit {
  file="";
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
    {labelName:"Correct", color:"#A6C48A"}, 
     {labelName:"Partially Correct", color:"#FFBA49"},
     {labelName:"Incorrect", color:"#EF5B5B"},
     {labelName:"Insult", color:"#f4c2c2"},
     {labelName:"Apathetic", color:"#A0D2DB"},
     {labelName:"Cry For Help", color:"#514D45"}
];
  constructor(private spinnerService: Ng4LoadingSpinnerService,private ref: ChangeDetectorRef,private _answerService : AnswerService,) {}
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
  public labelledanswers = [];
  public selectedAnswers: IAnswer[]= [];
  ngOnInit() {
    this.spinnerService.show();
    this.sortedanswers = [];
    this._answerService.getAnswers()
    .subscribe(data => {
     this.answers = data;
    },
      error => this.errorMsg = error); 
      this._answerService.getLabelledAnswers()
      .subscribe(data => {
       this.labelledanswers = data;
       console.log(this.labelledanswers)
      }); 
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
  this.spinnerService.show();
  this.searchPattern=value;
  this.searchPatternDist=value.replace(' ','_')+'_dist'
  this._answerService.postSearchPattern(this.searchPattern)
  .subscribe(data => {
    this.sortedanswers = data;
    this.spinnerService.hide();
  },
    error => this.NoMatchMsg = "No matches"); 
    // this.spinnerService.show();
    // this._answerService.getSortedAnswers()
    // .subscribe(data => {
    //  this.sortedanswers = data;
    //  this.spinnerService.hide();
    // },
    //   error => this.NoMatchMsg = "No matches");   
}
get filterBySemantic() {
  return this.sortedanswers.filter( x => x._dist >=(this.semanticSimilarity/100));
}
filterByLabel(labelname) {
  return this.labelledanswers.filter( x => x.label ===(labelname));
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
    this.selectedAnswers =[];
    this.sortedanswers =[];
    this.ngOnInit();
    this.childC.refresh();
    
  }
 
  downloadLabelledData(){
    this._answerService.downloadFile()
    .subscribe(data => {
     this.file= data;
    },
      error => this.errorMsg);  
      let blob = new Blob([this.file], { type: 'csv'});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      } 
  }


}


