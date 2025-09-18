import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './add-order/add-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { RelatedtoDialogComponent } from './relatedto-dialog/relatedto-dialog.component';
import { AddOldOrderComponent } from './add-old-order/add-old-order.component';
import { UploadAttachmentComponent } from './upload-attachment/upload-attachment.component';
import { SchemeModule } from '../scheme/scheme.module';
import { GenerateOrderComponent } from './generate-order/generate-order.component';
import { GenerateOrderAddUpdateComponent } from './generate-order/generate-order-add-update/generate-order-add-update.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { GenerateOrderPreviewComponent } from './generate-order/generate-order-preview/generate-order-preview.component';
import { GenerateOrderAuthorityListComponent } from './generate-order/generate-order-authority-list/generate-order-authority-list.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { OrderCancellationDialogComponent } from './order-cancellation-dialog/order-cancellation-dialog.component';
import { ESignDialogComponent } from './generate-order/e-sign-dialog/e-sign-dialog.component';
import { OrderFinalApprovalListComponent } from './generate-order/order-final-approval-list/order-final-approval-list.component';
import { DispatchDialogComponent } from './generate-order/dispatch-dialog/dispatch-dialog.component';
import { OrderDetailReportComponent } from './order-detail-report/order-detail-report.component';
import { OrderSummaryReportComponent } from './order-report/order-summary-report/order-summary-report.component';
import { OrderDepartmentReportComponent } from './order-report/order-department-report/order-department-report.component';
import { OrderSummaryWithLasttransdateReportComponent } from './order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component';
import { OrderDocumenttypeSummaryReportComponent } from './order-report/order-documenttype-summary-report/order-documenttype-summary-report.component';

@NgModule({
  declarations: [OrderComponent,OrderReportComponent, AddOrderComponent, UpdateOrderComponent, DeleteOrderComponent, DetailOrderComponent,RelatedtoDialogComponent, AddOldOrderComponent, UploadAttachmentComponent, GenerateOrderComponent, GenerateOrderAddUpdateComponent, GenerateOrderPreviewComponent, GenerateOrderAuthorityListComponent, OrderCancellationDialogComponent, ESignDialogComponent, OrderFinalApprovalListComponent, DispatchDialogComponent, OrderDetailReportComponent, OrderSummaryReportComponent, OrderDepartmentReportComponent, OrderSummaryWithLasttransdateReportComponent, OrderDocumenttypeSummaryReportComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SchemeModule,

    AppMaterialModule,
    CKEditorModule
  ],
  entryComponents:[
    RelatedtoDialogComponent,
    OrderCancellationDialogComponent,
    ESignDialogComponent,
    DispatchDialogComponent
  ]
})
export class OrderModule { }
