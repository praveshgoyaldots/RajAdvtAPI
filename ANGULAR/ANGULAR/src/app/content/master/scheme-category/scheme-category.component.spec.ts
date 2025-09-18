import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeCategoryComponent } from './scheme-category.component';

describe('SchemeCategoryComponent', () => {
  let component: SchemeCategoryComponent;
  let fixture: ComponentFixture<SchemeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
