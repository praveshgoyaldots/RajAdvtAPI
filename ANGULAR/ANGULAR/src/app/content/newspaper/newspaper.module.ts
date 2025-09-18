import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperRoutingModule } from './newspaper-routing.module';
import { NewspaperComponent } from './newspaper.component';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { NewspaperAddUpdateComponent } from './newspaper-add-update/newspaper-add-update.component';
import { SchemeModule } from '../scheme/scheme.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { NewsProgressUpdateComponent } from './news-progress-update/news-progress-update.component';
import { NewspaperDetailWithProgresslistComponent } from './newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component';

@NgModule({
  declarations: [NewspaperComponent, NewspaperAddUpdateComponent, NewsProgressUpdateComponent, NewspaperDetailWithProgresslistComponent],
  imports: [
    CommonModule,
    NewspaperRoutingModule,
    AppMaterialModule,
    SchemeModule,
    CKEditorModule,
    AngularEditorModule
  ],
  entryComponents:[NewsProgressUpdateComponent]
})
export class NewspaperModule { }
