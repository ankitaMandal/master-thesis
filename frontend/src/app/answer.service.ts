import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, 
  HttpEventType, HttpErrorResponse} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import {IAnswer} from './answer';
import {Observable} from "rxjs/Observable";
import { map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  
  private SERVER_URL: string = 'http://localhost:5000/';

  constructor(private http: HttpClient) {
  }
    public getCount(): Observable<IAnswer[]> {
        return this.http.get<[IAnswer]>(this.SERVER_URL + 'getcount')
        .catch(this.errorHandler);
    }

    public getAnswers(): Observable<IAnswer[]> {
      return this.http.get<[IAnswer]>(this.SERVER_URL + 'getanswers')
      .catch(this.errorHandler);
  }
//   public getSortedAnswers(): Observable<IAnswer[]> {
//     return this.http.get<[IAnswer]>(this.SERVER_URL + 'getsortedanswers')
//     .catch(this.errorHandler);
// }

public postSearchPattern(value: string){
  return this.http.post<any>(this.SERVER_URL + `search`, value).catch(this.errorHandler);
}

public postLabelledAnswers(labelledanswer): Observable<IAnswer[]> {
  return this.http.post<any>(this.SERVER_URL + `labelanswers`,labelledanswer).catch(this.errorHandler);;

}

public getLabelledAnswers(): Observable<IAnswer[]> {
  return this.http.get<[IAnswer]>(this.SERVER_URL + 'getlabelledanswers')
  .catch(this.errorHandler);
}
public downloadFile(): Observable<any>{
  return this.http.get(this.SERVER_URL + 'download', {responseType: 'arraybuffer'});
}

    errorHandler(error: HttpErrorResponse){
      return Observable.throw(error.message || "Server Error");
    }

}
