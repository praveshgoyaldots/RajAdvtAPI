import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { SchemeTypeService } from 'src/app/Shared/Service/scheme-type.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { SchemeTypeViewModel } from 'src/app/Shared/Model/Master/SchemeType.model';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SchemeTypeDialogComponent } from './scheme-type-dialog/scheme-type-dialog.component';
import { IndexModel, PermissionModel, SearchListModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { PageManualComponent } from 'src/app/header/page-manual/page-manual.component';

@Component({
  selector: 'app-scheme-type',
  templateUrl: './scheme-type.component.html',
  styleUrls: ['./scheme-type.component.css']
})
export class SchemeTypeComponent implements OnInit {
  model: SchemeTypeViewModel[];
  dataSource: any;
  displayedColumns: string[] =  ['index', 'Name', 'NameHindi' , 'IsActive' , 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Scheme Type in English' }, { Value: 'NameHindi', Text: 'Scheme Type in Hindi' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/schemetype", "/master/schemetype/add", "","/master/schemetype/edit");
  indexModel: SearchListModel;
  totalRecords: number;

  constructor(   private readonly  _schemeTypeService: SchemeTypeService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,) {
    this._parentApi.setpagelayout(" Scheme Type :", "add", "Create", "master/scheme/schemetype", true);
    this.indexModel = new SearchListModel();
  }

  ngOnInit() {
    this.GetList();
  }

  SearchByKeyword(){
    
    this.indexModel.SearchField
    this.GetList();
  }

  Reset(){
    this.indexModel.SearchField = '';
    this.GetList();
  }

  openPageManual(schemeTypeCode){
    this._dialog.open(PageManualComponent, {
       width: "800px",
       data: {LookupTypeId: 0, SchemeTypeCode: schemeTypeCode}
     });
   }

  onPaginateChange(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.GetList();
  }

  SortData(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.GetList();
  }

  GetList() {

    this._schemeTypeService.GetList(this.indexModel).subscribe(
      data => {
        ;
        if (data.IsSuccess) {
          this.model = <SchemeTypeViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<SchemeTypeViewModel>(
            this.model
          );
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
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

    const _dialogRef = this._dialog.open(SchemeTypeDialogComponent, {
      width: "500px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }

  // OnDelete(Id) {

  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: "Do you sure! want to delete this record?"
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this._schemeTypeService.DeleteSchemeType(Id).subscribe(
  //         data => {

  //           if (
  //             (data.IsSuccess)
  //           ) {
  //             this.GetList();
  //             this._alertService.success(data.Message);

  //           }
  //         },
  //         error => {
  //           this._alertService.error(error.message);
  //         }
  //       );
  //     }
  //   });
  // }

  OnStatusClick(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {

          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose:true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._schemeTypeService.ChangeActiveStatus(id).subscribe(
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
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


}
