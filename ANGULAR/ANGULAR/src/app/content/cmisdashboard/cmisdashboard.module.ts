import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMISDashboardRoutingModule } from './cmisdashboard-routing.module';
import { DepartmentDashboardComponent } from './department-dashboard/department-dashboard.component';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';

@NgModule({
  declarations: [DepartmentDashboardComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    CMISDashboardRoutingModule
  ]
})
export class CMISDashboardModule { }
