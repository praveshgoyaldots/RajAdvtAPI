import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeRequiredDocumentCategoryComponent } from './scheme-required-document-category.component';

describe('SchemeRequiredDocumentCategoryComponent', () => {
  let component: SchemeRequiredDocumentCategoryComponent;
  let fixture: ComponentFixture<SchemeRequiredDocumentCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeRequiredDocumentCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeRequiredDocumentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
