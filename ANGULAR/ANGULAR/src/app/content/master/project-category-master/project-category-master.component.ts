import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectCategoryMaster } from 'src/app/Shared/Model/Master/project-category-master-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { ProjectCategoryService } from 'src/app/Shared/Service/project-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ProjectCategoryAddUpdateComponent } from './project-category-add-update/project-category-add-update.component';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-project-category-master',
  templateUrl: './project-category-master.component.html',
  styleUrls: ['./project-category-master.component.css']
})
export class ProjectCategoryMasterComponent implements OnInit {
//#region <Variable>

listModel: ProjectCategoryMaster[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  'Code',
  "Name",
  "NameHindi",
  "TotalProjectsAdded",
  "IsActive",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Name", Text: "Category Name" },
  { Value: "NameHindi", Text: "Category Name in Hindi" },
  { Value: "TotalProjectsAdded", Text: "No. of Records" }
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/project-category",
  "/master/project-category/add",
  "",
  "/master/project-category/edit"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _projectCategoryService: ProjectCategoryService,
  private readonly _commonService: CommonService,
  private readonly _alertService: AlertService,
  private _parentApi: AppComponent,
  private _dialog: MatDialog
) {
  this._parentApi.setpagelayout(
    "",
    "",
    "",
    "",
    true
  );
  this.indexModel = new IndexModel();
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.GetList();
}

GetList() {
  
  this._projectCategoryService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <ProjectCategoryMaster[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<ProjectCategoryMaster>(
          this.listModel
        );
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
  const _dialogRef = this._dialog.open(ProjectCategoryAddUpdateComponent, {
    width: "500px",
    data: Id
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.GetList();
    }
  });
}

onActiveStatus(id) {
  
  this._commonService.GenerateOTP().subscribe(
    data => {
      if (data.IsSuccess) {
        const _dialogRef = this._dialog.open(OTPDialogComponent, {
          width: "500px",
          disableClose: true
        });
        _dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this._projectCategoryService.UpdateStatus(id).subscribe(
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
          }
        });
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

//#endregion <Method>
}
