import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }
  ngOnInit() {
  }

}
