import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { SchemeOutputViewModel } from 'src/app/Shared/Model/Master/schemeoutput.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { SchemeOutputService } from 'src/app/Shared/Service/scheme-output.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { SchemeOutputDialogComponent } from './scheme-output-dialog/scheme-output-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel, PermissionModel, SearchListModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-scheme-output',
  templateUrl: './scheme-output.component.html',
  styleUrls: ['./scheme-output.component.css']
})
export class SchemeOutputComponent implements OnInit {
  model: SchemeOutputViewModel[];
  dataSource: any;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi','IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Scheme Output in English' }, { Value: 'NameHindi', Text: 'Scheme Output in Hindi' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/schemeoutput", "/master/schemeoutput/add", "","/master/schemeoutput/edit");
  indexModel: SearchListModel;
  totalRecords: number;
  constructor(private readonly _schemeOutputService: SchemeOutputService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService, ) {
    this._parentApi.setpagelayout(" Scheme Ouput :", "add", "Create", "master/scheme/schemeoutput", true);
    this.indexModel = new SearchListModel();
  }
  ngOnInit() {
    this.GetList();
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

  SearchByKeyword(){
    
    this.indexModel.SearchField
    this.GetList();
  }

  Reset(){
    this.indexModel.SearchField = '';
    this.GetList();
  }

  GetList() {

    this._schemeOutputService.GetList(this.indexModel).subscribe(
      data => {
        ;
        if (data.IsSuccess) {
          this.model = <SchemeOutputViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<SchemeOutputViewModel>(
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

    const _dialogRef = this._dialog.open(SchemeOutputDialogComponent, {
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
  //       this._schemeOutputService.DeleteSchemeOutput(Id).subscribe(
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

              this._schemeOutputService.ChangeActiveStatus(id).subscribe(
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
