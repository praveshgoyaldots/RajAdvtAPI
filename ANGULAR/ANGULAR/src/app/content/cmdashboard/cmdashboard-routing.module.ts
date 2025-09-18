import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { CmdashboardComponent } from './cmdashboard.component';
import { CmoletterComponent } from './cmoletter/cmoletter.component';
import { CmistaskComponent } from './cmistask/cmistask.component';
import { RecruitmentStatusComponent } from './recruitmentstatus/recruitmentstatus.component';
import { ProjectMonitoringComponent } from './project-monitoring/project-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: CmdashboardComponent,
  }

  ,
  {
    path: 'cmoletter/:type',
    component: CmoletterComponent

  },
  {
    path: 'cmistask/:type',
    component: CmistaskComponent

  },
  {
    path: 'recruitmentstatus/:type',
    component: RecruitmentStatusComponent

  },
  {
    path: 'projectmonitoring/:type',
    component: ProjectMonitoringComponent

  },

];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CmdashboardRoutingModule {



}
