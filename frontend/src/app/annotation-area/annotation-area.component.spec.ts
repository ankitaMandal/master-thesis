import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationAreaComponent } from './annotation-area.component';

describe('AnnotationAreaComponent', () => {
  let component: AnnotationAreaComponent;
  let fixture: ComponentFixture<AnnotationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
