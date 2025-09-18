import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeBeneficialCategoryDialogComponent } from './scheme-beneficial-category-dialog.component';

describe('SchemeBeneficialCategoryDialogComponent', () => {
  let component: SchemeBeneficialCategoryDialogComponent;
  let fixture: ComponentFixture<SchemeBeneficialCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeBeneficialCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeBeneficialCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
