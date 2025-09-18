import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAdminDepartmentComponent } from './add-update-admin-department.component';

describe('AddUpdateAdminDepartmentComponent', () => {
  let component: AddUpdateAdminDepartmentComponent;
  let fixture: ComponentFixture<AddUpdateAdminDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAdminDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAdminDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
