import { Component, OnInit, ViewChild } from '@angular/core';
import { ModeOfDeliveryViewModel } from 'src/app/Shared/Model/modeOfDelivery.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { ModeOfDeliveryService } from 'src/app/Shared/Service/mode-of-delivery.service';
import { ModeOfDeliveryDialogComponent } from './mode-of-delivery-dialog/mode-of-delivery-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { PermissionModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-mode-of-delivery',
  templateUrl: './mode-of-delivery.component.html',
  styleUrls: ['./mode-of-delivery.component.css']
})
export class ModeOfDeliveryComponent implements OnInit {

  model: ModeOfDeliveryViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Mode Of Delivery Name in English' }, { Value: 'NameHindi', Text: 'Mode Of Delivery Name in Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/modeofdelivery",
    "/master/modeofdelivery/add",
    "",
    "/master/modeofdelivery/update"
  );

  constructor(private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _modeOfDeliveryService: ModeOfDeliveryService) {
    this._parentApi.setpagelayout(" Mode Of Delivery :", "add", "Create", "master/modeofdelivery", true);
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._modeOfDeliveryService.GetList().subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this.model = <ModeOfDeliveryViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ModeOfDeliveryViewModel>(this.model);
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

    const _dialogRef = this._dialog.open(ModeOfDeliveryDialogComponent, {
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
        this._modeOfDeliveryService.DeleteModeOfDelivery(Id).subscribe(
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
