import { AppMaterialModule } from './../../Shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViplmsRoutingModule } from './viplms-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { ReportAdvanceSearchComponent } from './shared/report-advance-search/report-advance-search.component';
import { StatisticalReportComponent } from './statistical-report/statistical-report.component';


@NgModule({
  declarations: [ReportsComponent, ReportAdvanceSearchComponent, StatisticalReportComponent],
  imports: [CommonModule, ViplmsRoutingModule, AppMaterialModule ]
})

export class ViplmsModule { }
