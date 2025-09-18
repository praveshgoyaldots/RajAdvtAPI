import { CommonService } from 'src/app/Shared/Service/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { GovermentAchivementService } from 'src/app/Shared/Service/goverment-achivement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { GovermentAchivementlistModel } from 'src/app/Shared/Model/Master/GovermentAchivement.Model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-goverment-achivement',
  templateUrl: './goverment-achivement.component.html',
  styleUrls: ['./goverment-achivement.component.css']
})
export class GovermentAchivementComponent implements OnInit {
  GovermentAchivementlist:GovermentAchivementlistModel[];
  dataSource: any;
  displayedColumns: string[] = ["index",  "DetailText", "DepartmentTitle", "description1", "Status","Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department Title" },
    { Value: "description1", Text: "Description" }
  ];
  Permission = this._commonService.GetPagePermission("/master/GenerateAchivement", "/master/AddupdateGenerateAchivement", "/master/AddupdateGenerateAchivement/detail", "/master/AddupdateGenerateAchivement/update");
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;

  constructor(  private readonly _govermentAchivementService: GovermentAchivementService,

    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private _router: Router) {
      
      this.Permission.AddPageAccess ? this._parentApi.setpagelayout('Generate Achivement :', 'add', 'Create', '/master/AddupdateGenerateAchivement') : this._parentApi.setpagelayout("Generate Achivement :");
    this.indexModel = new IndexModel();
    //this.id = this._route.snapshot.params.id;

  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    
    this._govermentAchivementService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.GovermentAchivementlist = <GovermentAchivementlistModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<GovermentAchivementlistModel>(this.GovermentAchivementlist);
          if (this.indexModel.IsPostBack === false) {
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


  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  OnStatusClick(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to Update Status of this record?",
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._govermentAchivementService.ChangeActiveStatus(Id).subscribe(
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
