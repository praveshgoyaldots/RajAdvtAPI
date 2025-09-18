import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeRequiredDocumentCategoryDialogComponent } from './scheme-required-document-category-dialog.component';

describe('SchemeRequiredDocumentCategoryDialogComponent', () => {
  let component: SchemeRequiredDocumentCategoryDialogComponent;
  let fixture: ComponentFixture<SchemeRequiredDocumentCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeRequiredDocumentCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeRequiredDocumentCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
