import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentWebsiteRoutingModule } from './department-website-routing.module';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { SchemeModule } from '../scheme/scheme.module';
import { MenuClassificationComponent } from './menu-classification/menu-classification.component';
import { AddupdateMenuClassificationComponent } from './menu-classification/addupdate-menu-classification/addupdate-menu-classification.component';
import { ClassificationPagetypeComponent } from './classification-pagetype/classification-pagetype.component';
import { AddupdateClassificationpagetypeComponent } from './classification-pagetype/addupdate-classificationpagetype/addupdate-classificationpagetype.component';
import { DepartmentMenuClassificationComponent } from './department-menu-classification/department-menu-classification.component';
import { AddupdateDepartmentMenuClassificationComponent } from './department-menu-classification/addupdate-department-menu-classification/addupdate-department-menu-classification.component';
import { DepartmentSubMenuClassificationComponent } from './department-sub-menu-classification/department-sub-menu-classification.component';
import { AddupdateDepartmentSubMenuClassificationComponent } from './department-sub-menu-classification/addupdate-department-sub-menu-classification/addupdate-department-sub-menu-classification.component';
import { DepartmentSectionMappingComponent } from './department-section-mapping/department-section-mapping.component';
import { AddupdatedeptSectionMappingComponent } from './department-section-mapping/addupdatedept-section-mapping/addupdatedept-section-mapping.component';
import { SectionMasterComponent } from './section-master/section-master.component';
import { AddupdateSectionMasterComponent } from './section-master/addupdate-section-master/addupdate-section-master.component';
import { ImportSectionMenuSubMenuComponent } from './import-section-menu-sub-menu/import-section-menu-sub-menu.component';

@NgModule({
  declarations: [MenuClassificationComponent, AddupdateMenuClassificationComponent, ClassificationPagetypeComponent, AddupdateClassificationpagetypeComponent, DepartmentMenuClassificationComponent, AddupdateDepartmentMenuClassificationComponent, DepartmentSubMenuClassificationComponent, AddupdateDepartmentSubMenuClassificationComponent, DepartmentSectionMappingComponent, AddupdatedeptSectionMappingComponent, SectionMasterComponent, AddupdateSectionMasterComponent, ImportSectionMenuSubMenuComponent],
  imports: [
    CommonModule,
    DepartmentWebsiteRoutingModule,
    AppMaterialModule,
    SchemeModule
  ]
})
export class DepartmentWebsiteModule { }
