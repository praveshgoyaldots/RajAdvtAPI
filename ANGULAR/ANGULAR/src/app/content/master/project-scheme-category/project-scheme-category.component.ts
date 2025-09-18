import { ProjectSchemeCategoryService } from './../../../Shared/Service/project-scheme-category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSchemeCategoryMasterViewModel } from 'src/app/Shared/Model/Master/project-scheme-category-master-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ProjectSchemeCategoryAddupdateComponent } from './project-scheme-category-addupdate/project-scheme-category-addupdate.component';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-project-scheme-category',
  templateUrl: './project-scheme-category.component.html',
  styleUrls: ['./project-scheme-category.component.css']
})
export class ProjectSchemeCategoryComponent implements OnInit {
//#region <Variable>

listModel: ProjectSchemeCategoryMasterViewModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  "Code",
  "DepartmentTitle",
  "ProgramSchemeTypeName",
  "ProgramSchemeName",
  "TotalProjectsAdded",
  "IsActive",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Nodal Department" },
  { Value: "ProgramSchemeTypeName", Text: "Program Scheme Type" },
  { Value: "ProgramSchemeName", Text: "Program Scheme Name" },
  { Value: "TotalProjectsAdded", Text: "No. of Records" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/project-scheme-category",
  "/master/project-scheme-category/add",
  "",
  "/master/project-scheme-category/edit"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _projectSchemeCategoryService: ProjectSchemeCategoryService,
  private readonly _commonService: CommonService,
  private readonly _alertService: AlertService,
  private _parentApi: AppComponent,
  private _dialog: MatDialog
) {
  this._parentApi.setpagelayout("", "", "", "", true);
  this.indexModel = new IndexModel();
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.GetList();
}

GetList() {
  
  this._projectSchemeCategoryService.GetList(this.indexModel).subscribe(
    data => {
      
      if (data.IsSuccess) {
        this.listModel = <ProjectSchemeCategoryMasterViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<
        ProjectSchemeCategoryMasterViewModel
        >(this.listModel);
        this.totalRecords = data.Data.TotalRecords;
        if (!this.indexModel.IsPostBack) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

onPaginateChange(event) {
  this.indexModel.Page = event.pageIndex + 1;
  this.indexModel.PageSize = event.pageSize;
  this.indexModel.IsPostBack = true;
  this.GetList();
}

sortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc =
    event.direction == AppSetting.orderByDscAsc
      ? AppSetting.orderByAsc
      : AppSetting.orderByDsc;
      this.indexModel.IsPostBack = true;
  this.GetList();
}

openDialog(Id) {
  
  const _dialogRef = this._dialog.open(
    ProjectSchemeCategoryAddupdateComponent,
    {
      width: "500px",
      data: Id
    }
  );
  _dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.GetList();
    }
  });
}

onActiveStatus(id) {
  
  // this._commonService.GenerateOTP().subscribe(
  //   data => {
  //     if (data.IsSuccess) {
  //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
  //         width: "500px",
  //         disableClose: true
  //       });
  //       _dialogRef.afterClosed().subscribe((result: boolean) => {
  //         if (result) {
            this._projectSchemeCategoryService
              .ChangeActiveStatus(id)
              .subscribe(
                data => {
                  if (data.IsSuccess) {
                    this.GetList();
                    this._alertService.success(data.Message);
                  } else {
                    this._alertService.error(data.Message);
                  }
                },
                error => {
                  this._alertService.error(error.message);
                }
              );
  //         }
  //       });
  //     } else {
  //       this._alertService.error(data.Message);
  //     }
  //   },
  //   error => {
  //     this._alertService.error(error.message);
  //   }
  // );
}

//#endregion <Method>
}
