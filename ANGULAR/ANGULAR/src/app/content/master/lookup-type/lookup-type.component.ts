import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { LookuptypeService } from 'src/app/Shared/Service/lookuptype.service';
import { LookupTypeViewModel } from 'src/app/Shared/Model/lookuptype.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { LookupTypeDialogComponent } from './lookup-type-dialog/lookup-type-dialog.component';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { PageManualComponent } from 'src/app/header/page-manual/page-manual.component';

@Component({
  selector: 'app-lookup-type',
  templateUrl: './lookup-type.component.html',
  styleUrls: ['./lookup-type.component.css']
})
export class LookupTypeComponent implements OnInit {
  LookUpTypeList: LookupTypeViewModel[];
  isMaster = false;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'LookupType', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'LookupType', Text: 'LookUpType Title' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _LookuptypeService: LookuptypeService,
  ) {

    this._parentApi.setpagelayout(" LookUpType :", "add", "Create", "master/lookupType", true);
    this.isMaster = this._parentApi.isMaster;
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._LookuptypeService.GetList().subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this.LookUpTypeList = <LookupTypeViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<LookupTypeViewModel>(this.LookUpTypeList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  openPageManual(lookupTypeId){
    this._dialog.open(PageManualComponent, {
       width: "800px",
       data: {LookupTypeId: lookupTypeId, SchemeTypeCode: 0}
     });
   }

  OpenDialog(Id) {

    const _dialogRef = this._dialog.open(LookupTypeDialogComponent, {
      width: "500px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
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
        this._LookuptypeService.DeleteLookUpType(Id).subscribe(
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



}
