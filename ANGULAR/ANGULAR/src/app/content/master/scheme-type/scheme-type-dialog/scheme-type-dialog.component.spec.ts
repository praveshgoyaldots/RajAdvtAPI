import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeTypeDialogComponent } from './scheme-type-dialog.component';

describe('SchemeTypeDialogComponent', () => {
  let component: SchemeTypeDialogComponent;
  let fixture: ComponentFixture<SchemeTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
