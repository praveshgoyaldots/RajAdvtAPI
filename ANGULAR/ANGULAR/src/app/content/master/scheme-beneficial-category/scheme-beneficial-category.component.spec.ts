import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeBeneficialCategoryComponent } from './scheme-beneficial-category.component';

describe('SchemeBeneficialCategoryComponent', () => {
  let component: SchemeBeneficialCategoryComponent;
  let fixture: ComponentFixture<SchemeBeneficialCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeBeneficialCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeBeneficialCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
