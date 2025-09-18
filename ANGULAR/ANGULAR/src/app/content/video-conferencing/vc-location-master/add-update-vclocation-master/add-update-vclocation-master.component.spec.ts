import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateVCLocationMasterComponent } from './add-update-vclocation-master.component';

describe('AddUpdateVCLocationMasterComponent', () => {
  let component: AddUpdateVCLocationMasterComponent;
  let fixture: ComponentFixture<AddUpdateVCLocationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateVCLocationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateVCLocationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
