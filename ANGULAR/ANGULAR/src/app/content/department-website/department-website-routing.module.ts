import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuClassificationComponent } from './menu-classification/menu-classification.component';
import { AddupdateMenuClassificationComponent } from './menu-classification/addupdate-menu-classification/addupdate-menu-classification.component';
import { ClassificationPagetypeComponent } from './classification-pagetype/classification-pagetype.component';
import { AddupdateClassificationpagetypeComponent } from './classification-pagetype/addupdate-classificationpagetype/addupdate-classificationpagetype.component';
import { DepartmentMenuClassificationComponent } from './department-menu-classification/department-menu-classification.component';
import { AddupdateDepartmentMenuClassificationComponent } from './department-menu-classification/addupdate-department-menu-classification/addupdate-department-menu-classification.component';
import { DepartmentSubMenuClassificationComponent } from './department-sub-menu-classification/department-sub-menu-classification.component';
import { AddupdateDepartmentSubMenuClassificationComponent } from './department-sub-menu-classification/addupdate-department-sub-menu-classification/addupdate-department-sub-menu-classification.component';
import { AddupdatedeptSectionMappingComponent } from './department-section-mapping/addupdatedept-section-mapping/addupdatedept-section-mapping.component';
import { DepartmentSectionMappingComponent } from './department-section-mapping/department-section-mapping.component';
import { SectionMasterComponent } from './section-master/section-master.component';
import { AddupdateSectionMasterComponent } from './section-master/addupdate-section-master/addupdate-section-master.component';
import { ImportSectionMenuSubMenuComponent } from './import-section-menu-sub-menu/import-section-menu-sub-menu.component';

const routes: Routes = [
  {
    path: "menu-Classification",
    component: MenuClassificationComponent,
  },
  {
    path: "menu-Classification/add",
    component: AddupdateMenuClassificationComponent,
  },
  {
    path: "menu-Classification/update/:id",
    component: AddupdateMenuClassificationComponent,
  },
  {
    path: "classification-Pagetype",
    component: ClassificationPagetypeComponent,
  },
  {
    path: "classification-Pagetype/add",
    component: AddupdateClassificationpagetypeComponent,
  },
  {
    path: "classification-Pagetype/update/:id",
    component: AddupdateClassificationpagetypeComponent,
  },
  {
    path: "department-menu-Classification",
    component: DepartmentMenuClassificationComponent,
  },
  {
    path: "department-menu-Classification/add",
    component: AddupdateDepartmentMenuClassificationComponent,
  },
  {
    path: "department-menu-Classification/update/:id",
    component: AddupdateDepartmentMenuClassificationComponent,
  }
  ,
  {
    path: "department-submenu-Classification",
    component: DepartmentSubMenuClassificationComponent,
  },
  {
    path: "department-submenu-Classification/add",
    component: AddupdateDepartmentSubMenuClassificationComponent,
  },
  {
    path: "department-submenu-Classification/update/:id",
    component: AddupdateDepartmentSubMenuClassificationComponent,
  },
  {
    path: "department-section-mapping",
    component: DepartmentSectionMappingComponent,
  },
  {
    path: "department-section-mapping/add",
    component: AddupdatedeptSectionMappingComponent,
  },
  {
    path: "department-section-mapping/update/:id",
    component: AddupdatedeptSectionMappingComponent,
  },
  {
    path: "section-master",
    component: SectionMasterComponent,
  },
  {
    path: "section-master/add",
    component: AddupdateSectionMasterComponent,
  },
  {
    path: "section-master/update/:id",
    component: AddupdateSectionMasterComponent,
  },
  {
    path: "import-section-menu-submenu",
    component: ImportSectionMenuSubMenuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentWebsiteRoutingModule { }
