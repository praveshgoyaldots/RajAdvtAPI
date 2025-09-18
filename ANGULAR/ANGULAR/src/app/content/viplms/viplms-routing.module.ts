import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from '../viplms/reports/reports.component';
import { StatisticalReportComponent } from '../viplms/statistical-report/statistical-report.component';

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

export class ViplmsRoutingModule { }
