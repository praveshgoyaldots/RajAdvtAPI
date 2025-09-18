import { Component, OnInit, ViewChild } from '@angular/core';
import { SectorModel } from 'src/app/Shared/Model/sector.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { SectorService } from 'src/app/Shared/Service/sector.service';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SectorDialogComponent } from './sector-dialog/sector-dialog.component';
import { PermissionModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],

})
export class SectorComponent implements OnInit {
  sector: SectorModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index','Code', 'Name', 'NameHindi','Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Sector Name' }, { Value: 'NameHindi', Text: 'Sector Name in Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  Permission: PermissionModel = this._commonService.GetPagePermission("/master/sector", "/master/sector/add", "", "/master/sector/update", "");

  constructor(
    private readonly _SectorService:SectorService,
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
  ) {
    this._parentApi.setpagelayout(" Sector :", "add", "Create", "master/sector", true);
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._SectorService.GetList().subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this.sector = <SectorModel[]>data.Data;
          this.dataSource = new MatTableDataSource<SectorModel>(this.sector);
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

    const _dialogRef = this._dialog.open(SectorDialogComponent, {
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
        this._SectorService.DeleteSector(Id).subscribe(
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
           this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });



  }

}
