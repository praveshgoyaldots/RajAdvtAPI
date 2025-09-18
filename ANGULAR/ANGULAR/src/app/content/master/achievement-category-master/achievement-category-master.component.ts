import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { AchievementCategoryMasterModel } from 'src/app/Shared/Model/Master/achievement-category-master-model';
import { AddUpdateAchievementCategoryMasterComponent } from './add-update-achievement-category-master/add-update-achievement-category-master.component';
import { AchievementCategoryMasterService } from 'src/app/Shared/Service/achievement-category-master.service';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: 'app-achievement-category-master',
  templateUrl: './achievement-category-master.component.html',
  styleUrls: ['./achievement-category-master.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class AchievementCategoryMasterComponent implements OnInit {
  //#region Variable
  model: AchievementCategoryMasterModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index','CategoryCode', 'Title', 'TitleHindi','IsVisible','CategoryIsVisible','IsVisibleToEndUser',"ClassificationPageTypeName","MenuClassificationName", 'IsActive','CreatedByName', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    // { Value: 'Title', Text: 'Title' },
    // { Value: 'TitleHindi', Text: 'Title Hindi' }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/achievement-category", "/master/achievement-category/add", "/master/achievement-category/detail", "/master/achievement-category/update", "/master/achievement-category/delete");
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion

  //#region constructor
  constructor(private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _achievementCategoryService: AchievementCategoryMasterService) {
    // this._parentApi.setpagelayout("General Entry Category:", "add", "Create", "/master/achievement-category/add");

    this.Permission.AddPageAccess
      ? this._parentApi.setpagelayout(
        "General Entry Category:",
        "add",
        "Create",
        "/master/achievement-category/add"
        )
      : this._parentApi.setpagelayout("General Entry Category :");

    // this._parentApi.setpagelayout(
    //       "General Entry Category:",
    //       "add",
    //       "Create",
    //       "/master/achievement-category/add"
    //       )

    this.indexModel = new IndexModel();

  }
  //#endregion

  //#region  Method

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._achievementCategoryService.GetList(this.indexModel).subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this.model = <AchievementCategoryMasterModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AchievementCategoryMasterModel>(this.model);
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


  OpenDialog(Id) {

    const _dialogRef = this._dialog.open(AddUpdateAchievementCategoryMasterComponent, {
      width: "1200px",
      data: Id,
      disableClose:true
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }

  OnActiveStatus(id) {
    
    // this._commonService.GenerateOTP().subscribe(
    //   data => {
    //     if (data.IsSuccess) {

    //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //         width: "500px",
    //         disableClose:true
    //       });
    //       _dialogRef.afterClosed().subscribe((result: boolean) => {

    //         if (result) {

              this._achievementCategoryService.ChangeActiveStatus(id).subscribe(
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
    //     }else{
    //       this._alertService.error(data.Message);
    //     }
    //   },
    //   error => {
    //     this._alertService.error(error.message);
    //   }
    // );
  }


  // OnActiveStatus(Id) {

  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: "Do you sure! want to Update this record?",
  //     disableClose:true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this._achievementCategoryService.ChangeActiveStatus(Id).subscribe(
  //         data => {

  //           if (
  //             (data.IsSuccess)
  //           ) {
  //             this.GetList();
  //             this._alertService.success(data.Message);

  //           }
  //         },
  //         error => {
  //           this._commonService.ScrollingTop();
  //           this._alertService.error(error.message);
  //         }
  //       );
  //     }
  //   });

  // }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }
  //#endregion
}



