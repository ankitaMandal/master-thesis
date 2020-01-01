import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelledAnswersComponent } from './labelled-answers.component';

describe('LabelledAnswersComponent', () => {
  let component: LabelledAnswersComponent;
  let fixture: ComponentFixture<LabelledAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelledAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelledAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
