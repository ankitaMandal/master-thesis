import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { AnswerService } from './../answer.service';
@Component({
  selector: 'app-annotation-workbench',
  templateUrl: './annotation-workbench.component.html',
  styleUrls: ['./annotation-workbench.component.css']
})
export class AnnotationWorkbenchComponent implements OnInit {
  disabled=false;
  hideSliders=false;
  disableMarkAs=true;
  ds = new MyDataSource();
  morphologicalVariance = 0;
  spellingVariance=0;
  syntacticalVariance=0;
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
  constructor() {}
  chipControl = new FormControl(new Set());
  toggleChip = (chip: any) => {
    const addChip = () => { this.chips.add(chip); };
    const removeChip = () => { this.chips.delete(chip); };

    this.chips.has(chip) ? removeChip() : addChip();
  }

  get chips() { return this.chipControl.value; }
  ngOnInit() {
  }
  
}


export class MyDataSource extends DataSource<string | undefined> {
  private _length = 100;
  private _pageSize = 100;
  private _cachedData = Array.from<string>({length: this._length});
  private _fetchedPages = new Set<number>();
  private _dataStream = new BehaviorSubject<(string | undefined)[]>(this._cachedData);
  private _subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this._cachedData.splice(page * this._pageSize, this._pageSize,
          ...Array.from({length: this._pageSize})
              .map((_, i) => `steigerung der fettleibkeit menschen essen zu viel zucker wenn gesundes essen gnstiger ist dann werd #${page * this._pageSize + i}`));
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }
}
