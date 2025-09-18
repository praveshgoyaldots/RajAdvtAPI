import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeUploadFileComponent } from './scheme-upload-file.component';

describe('SchemeUploadFileComponent', () => {
  let component: SchemeUploadFileComponent;
  let fixture: ComponentFixture<SchemeUploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeUploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
