import { Component, OnInit, ViewChild } from '@angular/core';
import { SchemeBeneficialCategoryViewModel } from 'src/app/Shared/Model/Master/schemebeneficialcategory.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { SchemeBeneficialCategoryService } from 'src/app/Shared/Service/scheme-beneficial-category.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { SchemeBeneficialCategoryDialogComponent } from './scheme-beneficial-category-dialog/scheme-beneficial-category-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-scheme-beneficial-category',
  templateUrl: './scheme-beneficial-category.component.html',
  styleUrls: ['./scheme-beneficial-category.component.css']
})
export class SchemeBeneficialCategoryComponent implements OnInit {

  model: SchemeBeneficialCategoryViewModel[];
  dataSource: any;
  displayedColumns: string[] =  ['index', 'Name', 'NameHindi', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Scheme Beneficial Category in English' }, { Value: 'NameHindi', Text: 'Scheme Beneficial Category in Hindi' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: IndexModel;
  totalRecords: number;

  constructor(   private readonly  _schemeBeneficialCategoryService: SchemeBeneficialCategoryService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,) {
    this._parentApi.setpagelayout(" Scheme Type :", "add", "Create", "master/scheme/schemebeneficialcategory", true);
    this.indexModel = new IndexModel();
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

  GetList() {

    this._schemeBeneficialCategoryService.GetList(this.indexModel).subscribe(
      data => {
       ;
        if (data.IsSuccess) {
          this.model = <SchemeBeneficialCategoryViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<SchemeBeneficialCategoryViewModel>(
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

    const _dialogRef = this._dialog.open(SchemeBeneficialCategoryDialogComponent, {
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
        this._schemeBeneficialCategoryService.DeleteSchemeBeneficialCategory(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this.GetList();
              this._alertService.success(data.Message);

            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

}
