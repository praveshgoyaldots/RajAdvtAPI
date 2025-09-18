import { OTPDialogComponent } from './../../../otp-dialog/otp-dialog.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSubCategoryMasterViewModel } from 'src/app/Shared/Model/Master/project-sub-category.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { ProjectSubCategoryService } from 'src/app/Shared/Service/project-sub-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { ProjectSubCategoryAddupdateDialogComponent } from './project-sub-category-addupdate-dialog/project-sub-category-addupdate-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-sub-category',
  templateUrl: './project-sub-category.component.html',
  styleUrls: ['./project-sub-category.component.css']
})
export class ProjectSubCategoryComponent implements OnInit {
  //#region <Variable>

  listModel: ProjectSubCategoryMasterViewModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "Code",
    "CategoryName",
    "Name",
    "NameHindi",
    "LabelName",
    "IsNumeric",
    "TotalProjectsAdded",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Name", Text: "Name" },
    { Value: "NameHindi", Text: "Name Hindi" },
    { Value: "CategoryName", Text: "Category Name" },
    { Value: "LabelName", Text: "Label Name" },
    { Value: "TotalProjectsAdded", Text: "No. of Records" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/project-sub-category",
    "/master/project-sub-category/add",
    "",
    "/master/project-sub-category/edit",
    "/master/project-sub-category/delete"
  );
  indexModel: IndexModel;
  totalRecords: number;

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _projectSubCategoryService: ProjectSubCategoryService,
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
    
    this._projectSubCategoryService.GetList(this.indexModel).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.listModel = <ProjectSubCategoryMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
          ProjectSubCategoryMasterViewModel
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
      ProjectSubCategoryAddupdateDialogComponent,
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
              this._projectSubCategoryService
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

  DeleteProjectSubCategory(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Are you sure! You want to delete this record"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._projectSubCategoryService.DeleteProjectSubCategory(id).subscribe(
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
