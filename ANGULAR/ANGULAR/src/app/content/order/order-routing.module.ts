import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { AddOldOrderComponent } from './add-old-order/add-old-order.component';
import { UploadAttachmentComponent } from './upload-attachment/upload-attachment.component';
import { GenerateOrderComponent } from './generate-order/generate-order.component';
import { GenerateOrderAddUpdateComponent } from './generate-order/generate-order-add-update/generate-order-add-update.component';
import { GenerateOrderPreviewComponent } from './generate-order/generate-order-preview/generate-order-preview.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { GenerateOrderAuthorityListComponent } from './generate-order/generate-order-authority-list/generate-order-authority-list.component';
import { OrderFinalApprovalListComponent } from './generate-order/order-final-approval-list/order-final-approval-list.component';
import { OrderDetailReportComponent } from './order-detail-report/order-detail-report.component';
import { OrderSummaryReportComponent } from './order-report/order-summary-report/order-summary-report.component';
import { OrderDepartmentReportComponent } from './order-report/order-department-report/order-department-report.component';
import { OrderSummaryWithLasttransdateReportComponent } from './order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component';
import { OrderDocumenttypeSummaryReportComponent } from './order-report/order-documenttype-summary-report/order-documenttype-summary-report.component';
const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },

  {
    path: 'add',
    component: AddOrderComponent
  },
  {
    path: 'addold',
    component: AddOldOrderComponent
  },
  {
    path: 'uploadattachment',
    component: UploadAttachmentComponent
  },
  {
    path: 'uploadattachment/:id',
    component: UploadAttachmentComponent
  },
  {
    path: 'update/:id',
    component: UpdateOrderComponent
  },
  {
    path: 'update/:id/:report',
    component: UpdateOrderComponent
  },
  {
    path: 'detail/:id',
    component: DetailOrderComponent
  },
  {
    path: 'delete/:id',
    component: DeleteOrderComponent
  },
  {
    path: 'generateorder',
    component: GenerateOrderComponent
  },
   {
    path: 'generateorderadd/:id',
    component: GenerateOrderAddUpdateComponent
  },
  {
    path: 'generateorderadd',
    component: GenerateOrderAddUpdateComponent
  },
  {
   path: 'generateorderpreview/:id',
   component: GenerateOrderPreviewComponent
 },
 {
  path: 'orderReport',
  component: OrderReportComponent
},
{

  path: 'generateorderauthoritylist',
  component: GenerateOrderAuthorityListComponent
}
,
{
 path: 'generateorderauthoritylistesign',
 component: GenerateOrderAuthorityListComponent
}
,
{
 path: 'generateauthoritylistesignex',
 component: GenerateOrderAuthorityListComponent
},
{
 path: 'generateaorderfinalapproval',
 component: OrderFinalApprovalListComponent
}
,
{
 path: 'orderDetailReport/:dept',
 component: OrderDetailReportComponent
},
{
  path: 'orderDetailReport',
  component: OrderDetailReportComponent
 },
{
 path: 'summaryreport',
 component: OrderSummaryReportComponent
},
{
  path: 'summaryreport/:dpt',
  component: OrderSummaryReportComponent
 },
{
 path: 'orderdepartmentcountreport',
 component: OrderDepartmentReportComponent
},
{
  path: 'summaryreportwithlasttrans',
  component: OrderSummaryWithLasttransdateReportComponent
 },
 {
   path: 'summaryreportwithlasttrans/:dpt',
   component: OrderSummaryWithLasttransdateReportComponent
  }
  ,
{
  path: 'DepartmentTypesummaryreportwithlasttrans',
  component: OrderDocumenttypeSummaryReportComponent
 },
 {
   path: 'DepartmentTypesummaryreportwithlasttrans/:dpt',
   component: OrderDocumenttypeSummaryReportComponent
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
export class OrderRoutingModule { }
