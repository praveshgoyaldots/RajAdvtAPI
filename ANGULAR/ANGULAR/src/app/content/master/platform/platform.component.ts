import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformListModel } from 'src/app/Shared/Model/Master/platform-master.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { PlatformService } from 'src/app/Shared/Service/platform.service';
import {  ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { PlatformDialogComponent } from './platform-dialog/platform-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  platformList: PlatformListModel[];
  dataSource: any;
  displayedColumns: string[] = ['index','Name', 'NameHindi','IsActive','Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Platform Name in English' }, { Value: 'NameHindi', Text: 'Platform Name in Hindi' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/platform", "/platform/add", "/platform/detail", "/platform/update", "/platform/delete");
  indexModel:IndexModel;
  totalRecords:number;
  constructor(private readonly _platformService: PlatformService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,) {

    this._parentApi.setpagelayout(" Platform List :", "add", "Create", "master/platform",true);
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    this._platformService.GetList(this.indexModel).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.platformList = <PlatformListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<PlatformListModel>(this.platformList);
          this.dataSource.paginator = this.paginator;
          this.totalRecords=data.Data.TotalRecords
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  onPaginateChange(event) {

    this.indexModel.Page=event.pageIndex+1;
    this.indexModel.PageSize=event.pageSize;
   this.GetListByEvent();
  }

  GetListByEvent()
  {

    this._platformService.GetList(this.indexModel).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.platformList = <PlatformListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<PlatformListModel>(this.platformList);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  SortData(event){

    this.indexModel.OrderBy=event.active;
    this.indexModel.OrderByAsc=event.direction==AppSetting.orderByDscAsc?AppSetting.orderByAsc:AppSetting.orderByDsc;
    this.GetListByEvent();
  }

  OpenDialog(Id) {

    const _dialogRef = this._dialog.open(PlatformDialogComponent, {
      width: "500px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }

  OnDelete(Id){

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this._platformService.DeletePlatform(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            )
            {
              this.GetList();
                this._alertService.success(data.Message);

            }
          },
          error => {
          // this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });
  }


  OnActiveStatus(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {

          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose:true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._platformService.ChangeActiveStatus(id).subscribe(
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
  // OnActiveStatus(Id) {

  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: "Do you sure! want to Update this record?",
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this._platformService.ChangeActiveStatus(Id).subscribe(
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

}
