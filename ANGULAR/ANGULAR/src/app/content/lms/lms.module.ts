import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmsRoutingModule } from './lms-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { ReportAdvanceSearchComponent } from './shared/report-advance-search/report-advance-search.component';
import { StatisticalReportComponent } from './statistical-report/statistical-report.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { AdminDepartmentAgeWiseReportComponent } from './admin-department-age-wise-report/admin-department-age-wise-report.component';
import { DepartmentAgeWiseReportComponent } from './department-age-wise-report/department-age-wise-report.component';
import { ActionHistoryReportComponent } from './action-history-report/action-history-report.component';
import { AdminDepartmentLast6monthReportComponent } from './admin-department-last6month-report/admin-department-last6month-report.component';
import { DepartmentLast6monthReportComponent } from './department-last6month-report/department-last6month-report.component';
import { StatisticalReportGroupbyComponent } from './shared/statistical-report-groupby/statistical-report-groupby.component';

@NgModule({
  declarations: [ReportsComponent, ReportAdvanceSearchComponent, StatisticalReportComponent, DetailReportComponent, AdminDepartmentAgeWiseReportComponent, DepartmentAgeWiseReportComponent, ActionHistoryReportComponent, AdminDepartmentLast6monthReportComponent, DepartmentLast6monthReportComponent, StatisticalReportGroupbyComponent],
  imports: [CommonModule, LmsRoutingModule, AppMaterialModule],
  entryComponents: [StatisticalReportGroupbyComponent]
})

export class LmsModule { }
