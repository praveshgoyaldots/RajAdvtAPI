import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSubCategoryMasterViewModel } from 'src/app/Shared/Model/Master/projectsub-sub-category-master-model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { ProjectSubSubCategoryService } from 'src/app/Shared/Service/project-sub-sub-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ProjectSubSubCategoryAddUpdateComponent } from './project-sub-sub-category-add-update/project-sub-sub-category-add-update.component';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { SubSubCategoryForDptDialogComponent } from './sub-sub-category-for-dpt-dialog/sub-sub-category-for-dpt-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-sub-sub-category-master',
  templateUrl: './project-sub-sub-category-master.component.html',
  styleUrls: ['./project-sub-sub-category-master.component.css']
})
export class ProjectSubSubCategoryMasterComponent implements OnInit {
//#region <Variable>

listModel: SubSubCategoryMasterViewModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  "Code",
  "CategoryName",
  "SubCategoryName",
  "Name",
  "NameHindi",
  "IsApplicableToAll",
  "TotalProjectsAdded",
  "IsActive",
  "created",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Name", Text: "Name" },
  { Value: "NameHindi", Text: "Name Hindi" },
  { Value: "CategoryName", Text: "Category" },
  { Value: "SubCategoryName", Text: "Sub Category" },
  { Value: "IsApplicableToAll", Text: "Is Applicable To All Sub-Category" },
  { Value: "TotalProjectsAdded", Text: "No. of Records" }

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/project-sub-subcategory",
  "/master/project-sub-subcategory/add",
  "",
  "/master/project-sub-subcategory/edit",
  "/master/project-sub-subcategory/delete/"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _projectSubSubCategoryService: ProjectSubSubCategoryService,
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
  
  this._projectSubSubCategoryService.GetList(this.indexModel).subscribe(
    data => {
      
      if (data.IsSuccess) {
        this.listModel = <SubSubCategoryMasterViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<
        SubSubCategoryMasterViewModel
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
    ProjectSubSubCategoryAddUpdateComponent,
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

openSubSubCategoryDialog() {
 this._dialog.open(
    SubSubCategoryForDptDialogComponent,
    {
      width: "1000px",
    }
  );
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
            this._projectSubSubCategoryService
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

DeleteProjectSubSubCategory(id) {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: "350px",
    data: "Are you sure! You want to delete this record"
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._projectSubSubCategoryService.DeleteProjectSubSubCategory(id).subscribe(
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
}


//#endregion <Method>

}
