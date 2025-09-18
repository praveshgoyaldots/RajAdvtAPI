import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintSoftwareRoutingModule } from './complaint-software-routing.module';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ComplaintSoftwareComponent } from './complaint-software.component';
import { Routes } from '@angular/router';
import { AddUpdateComplaintComponent } from './add-update-complaint/add-update-complaint.component';
import { CompliantActionDialogComponent } from './compliant-action-dialog/compliant-action-dialog.component';
import { ComplaintSoftwareDetailComponent } from './complaint-software-detail/complaint-software-detail.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { EntryTypeComponent } from './Masters/entry-type/entry-type.component';
import { StatusComponent } from './Masters/status/status.component';
import { AddUpdateEntryTypeComponent } from './Masters/entry-type/add-update-entry-type/add-update-entry-type.component';
import { AddUpdateStatusComponent } from './Masters/status/add-update-status/add-update-status.component';


@NgModule({
  declarations: [ComplaintSoftwareComponent, AddUpdateComplaintComponent, CompliantActionDialogComponent, ComplaintSoftwareDetailComponent, EntryTypeComponent, StatusComponent, AddUpdateEntryTypeComponent, AddUpdateStatusComponent],
  entryComponents:[
    CompliantActionDialogComponent, AddUpdateEntryTypeComponent, AddUpdateStatusComponent
  ],
  imports: [
    CommonModule,
    ComplaintSoftwareRoutingModule,
    AppMaterialModule,
    CKEditorModule,
    AngularEditorModule
  ]
})
export class ComplaintSoftwareModule { }
