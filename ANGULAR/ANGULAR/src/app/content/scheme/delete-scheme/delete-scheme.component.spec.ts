import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSchemeComponent } from './delete-scheme.component';

describe('DeleteSchemeComponent', () => {
  let component: DeleteSchemeComponent;
  let fixture: ComponentFixture<DeleteSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
