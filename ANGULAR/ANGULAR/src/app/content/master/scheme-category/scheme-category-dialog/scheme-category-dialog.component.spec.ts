import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeCategoryDialogComponent } from './scheme-category-dialog.component';

describe('SchemeCategoryDialogComponent', () => {
  let component: SchemeCategoryDialogComponent;
  let fixture: ComponentFixture<SchemeCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
