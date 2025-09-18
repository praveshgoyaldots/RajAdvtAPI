import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeCommonDialogComponent } from './scheme-common-dialog.component';

describe('SchemeCommonDialogComponent', () => {
  let component: SchemeCommonDialogComponent;
  let fixture: ComponentFixture<SchemeCommonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeCommonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeCommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
