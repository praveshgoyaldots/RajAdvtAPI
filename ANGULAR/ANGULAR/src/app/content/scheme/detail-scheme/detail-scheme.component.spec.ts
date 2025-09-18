import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSchemeComponent } from './detail-scheme.component';

describe('DetailSchemeComponent', () => {
  let component: DetailSchemeComponent;
  let fixture: ComponentFixture<DetailSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
