import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSummaryReportComponent } from './project-summary-report.component';

describe('ProjectSummaryReportComponent', () => {
  let component: ProjectSummaryReportComponent;
  let fixture: ComponentFixture<ProjectSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
