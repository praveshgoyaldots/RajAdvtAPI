import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { StatisticalReportComponent } from './statistical-report/statistical-report.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { AdminDepartmentAgeWiseReportComponent } from './admin-department-age-wise-report/admin-department-age-wise-report.component';
import { DepartmentAgeWiseReportComponent } from './department-age-wise-report/department-age-wise-report.component';
import { ActionHistoryReportComponent } from './action-history-report/action-history-report.component';
import { AdminDepartmentLast6monthReportComponent } from './admin-department-last6month-report/admin-department-last6month-report.component';
import { DepartmentLast6monthReportComponent } from './department-last6month-report/department-last6month-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'statistical-report',
    component: StatisticalReportComponent
  },
  {
    path: 'detail-report',
    component: DetailReportComponent
  },
  {
    path: 'admin-department-age-wise-report',
    component: AdminDepartmentAgeWiseReportComponent
  },
  {
    path: 'department-age-wise-report',
    component: DepartmentAgeWiseReportComponent
  },
  {
    path: 'department-age-wise-report/:id',
    component: DepartmentAgeWiseReportComponent
  },
  {
    path: 'action-history-report',
    component: ActionHistoryReportComponent
  },
  {
    path: 'admin-department-last6month-report',
    component: AdminDepartmentLast6monthReportComponent
  },
  {
    path: 'department-last6month-report',
    component: DepartmentLast6monthReportComponent
  },
  {
    path: 'department-last6month-report/:id',
    component: DepartmentLast6monthReportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class LmsRoutingModule { }
