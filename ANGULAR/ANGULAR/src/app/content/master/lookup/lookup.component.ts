import { Component, OnInit, ViewChild } from '@angular/core';
import { LookupService } from 'src/app/Shared/Service/lookup.service';
import { LookupModel, LookupViewModel , LookUpFilterModel} from 'src/app/Shared/Model/lookup.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { debug } from 'util';
import { LookupDialogComponent } from './lookup-dialog/lookup-dialog.component';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonService } from 'src/app/Shared/Service/common.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { LookuptypeService } from 'src/app/Shared/Service/lookuptype.service';
import { PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
  LookUp: LookupModel[];
  dDLList: DDLModel;
  LookUpList: LookupViewModel[];
  filterModel: LookUpFilterModel;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index','Code', 'lookup', 'NameHindi', 'lookupTypeName', 'sortOrder','CreatedModifiedByName', 'IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'lookup', Text: 'LookUp Title' }, { Value: 'NameHindi', Text: 'LookUp Hindi' }, { Value: 'lookupTypeName', Text: 'LookUp Type' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/lookup", "/master/lookup/add", "/master/lookup/detail", "/master/lookup/edit", "/master/lookup/delete");
  constructor(private readonly _lookUpService: LookupService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _LookuptypeService: LookuptypeService,
  ) {

    this._parentApi.setpagelayout(" LookUp :", "add", "Create", "master/lookup", true);
    this.id = this._route.snapshot.params.id;
this.filterModel = new LookUpFilterModel();
  }

  ngOnInit() {
this.GetDDLList();
    if (this.id) {
      this.GetListByTypeId();
    }
    else {
      this.GetList();
    }
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForLookUp).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetList(data= 0) {
if (data){
  this.filterModel.lookupTypeId = data;
}
    this._lookUpService.GetList(this.filterModel).subscribe(
      data => {
        
        if (
          (data.IsSuccess)
        ) {
          this.LookUpList = <LookupViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<LookupViewModel>(this.LookUpList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OpenDialog(Id) {

    let Typeid = this.id;
    const _dialogRef = this._dialog.open(LookupDialogComponent, {
      width: "500px",
      data: { Id, Typeid },

    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        if (this.id) {
          this.GetListByTypeId();
        }
        else {
          this.GetList();
        }
      }
    });
  }

  OnDelete(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._lookUpService.DeleteLookUp(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this.GetList();
              this._alertService.success(data.Message);

            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });

  }


  OnActiveStatus(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to Update status of this record?",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._lookUpService.ChangeActiveStatus(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this.GetList();
              this._alertService.success(data.Message);

            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });

  }

  GetListByTypeId() {

    this._LookuptypeService.GetByTypeId(this.id).subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this.LookUpList = <LookupViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<LookupViewModel>(this.LookUpList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

}
