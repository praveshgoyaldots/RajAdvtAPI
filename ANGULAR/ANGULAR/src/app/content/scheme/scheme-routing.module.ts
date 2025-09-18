import { DataEntryComponent } from './monitoring-parameters-scheme/data-entry/data-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SchemeComponent } from './scheme.component';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { UpdateSchemeComponent } from './update-scheme/update-scheme.component';
import { DetailSchemeComponent } from './detail-scheme/detail-scheme.component';
import { DeleteSchemeComponent } from './delete-scheme/delete-scheme.component';
import { FaqSchemeComponent } from './faq-scheme/faq-scheme.component';
import { MonitoringParametersSchemeComponent } from './monitoring-parameters-scheme/monitoring-parameters-scheme.component';
import { MPCountWithSchemeComponent } from './monitoring-parameters-scheme/m-p-count-with-scheme/m-p-count-with-scheme.component';
import { MPMonthlyCountBySchemeComponent } from './monitoring-parameters-scheme/m-p-monthly-count-by-scheme/m-p-monthly-count-by-scheme.component';
import { AssignSchemeComponent } from './assign-scheme/assign-scheme.component';
import { SetPriorityComponent } from './set-priority/set-priority.component';
import { AssignSchemeToUserComponent } from './assign-scheme/assign-scheme-to-user/assign-scheme-to-user.component';
import { UpdateGroupSchemeComponent } from './update-group-scheme/update-group-scheme.component';

const routes: Routes = [
  {
    path: '',
    component: SchemeComponent,
  },
      {
        path: 'add',
        component: AddSchemeComponent
      },
      {
        path: 'update/:id',
        component: UpdateSchemeComponent
      },
      {
        path: 'update/:id/:report',
        component: UpdateSchemeComponent
      },
      {
        path: 'update-group/:id',
        component: UpdateGroupSchemeComponent
      },
      {
        path: 'detail/:id',
        component: DetailSchemeComponent
      },
      {
        path: 'delete/:id',
        component: DeleteSchemeComponent
      },
      {
        path: 'faq',
        component: FaqSchemeComponent
      }, {
        path: 'faq/:id',
        component: FaqSchemeComponent
      },
      {
        path: 'monitoringparameter',
        component: MonitoringParametersSchemeComponent
      },

      {
        path: 'monitoringparameter/:id',
        component: MonitoringParametersSchemeComponent
      }, {
        path: 'monitoringparameterdataenty/:id',
        component: DataEntryComponent
      },
      {
        path: 'monitoringparametercountwithscheme',
        component: MPCountWithSchemeComponent

      },{
        path: 'assignscheme',
        component: AssignSchemeComponent

      }
      ,{
        path: 'setpriority',
        component: SetPriorityComponent

      }
      ,
      {
        path: 'mpcountbyscheme/:id',
        component: MPMonthlyCountBySchemeComponent

      },
      {
        path: 'mpcountbyscheme',
        component: MPMonthlyCountBySchemeComponent

      },
      {
        path: 'assignschemetouser',
        component: AssignSchemeToUserComponent

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
export class SchemeRoutingModule { }
