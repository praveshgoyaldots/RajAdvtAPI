import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeOutputComponent } from './scheme-output.component';

describe('SchemeOutputComponent', () => {
  let component: SchemeOutputComponent;
  let fixture: ComponentFixture<SchemeOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
