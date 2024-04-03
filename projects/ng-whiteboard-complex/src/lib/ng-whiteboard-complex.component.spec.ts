import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWhiteboardComplexComponent } from './ng-whiteboard-complex.component';

describe('NgWhiteboardComplexComponent', () => {
  let component: NgWhiteboardComplexComponent;
  let fixture: ComponentFixture<NgWhiteboardComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgWhiteboardComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWhiteboardComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
