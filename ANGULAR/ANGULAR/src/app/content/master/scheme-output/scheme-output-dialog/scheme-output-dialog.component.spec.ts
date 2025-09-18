import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeOutputDialogComponent } from './scheme-output-dialog.component';

describe('SchemeOutputDialogComponent', () => {
  let component: SchemeOutputDialogComponent;
  let fixture: ComponentFixture<SchemeOutputDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeOutputDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeOutputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
