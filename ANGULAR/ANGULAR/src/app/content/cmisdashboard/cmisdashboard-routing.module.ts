import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentDashboardComponent } from './department-dashboard/department-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentDashboardComponent,
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

export class CMISDashboardRoutingModule { }
