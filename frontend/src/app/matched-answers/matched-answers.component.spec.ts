import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedAnswersComponent } from './matched-answers.component';

describe('MatchedAnswersComponent', () => {
  let component: MatchedAnswersComponent;
  let fixture: ComponentFixture<MatchedAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
