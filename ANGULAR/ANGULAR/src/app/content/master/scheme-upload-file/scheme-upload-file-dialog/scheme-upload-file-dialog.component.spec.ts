import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeUploadFileDialogComponent } from './scheme-upload-file-dialog.component';

describe('SchemeUploadFileDialogComponent', () => {
  let component: SchemeUploadFileDialogComponent;
  let fixture: ComponentFixture<SchemeUploadFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeUploadFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeUploadFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
