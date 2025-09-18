import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadFileCategoryViewModel } from 'src/app/Shared/Model/Master/uploadfilecategory.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { SchemeUploadFileCategoryService } from 'src/app/Shared/Service/scheme-upload-file-category.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { SchemeUploadFileDialogComponent } from './scheme-upload-file-dialog/scheme-upload-file-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-scheme-upload-file',
  templateUrl: './scheme-upload-file.component.html',
  styleUrls: ['./scheme-upload-file.component.css']
})
export class SchemeUploadFileComponent implements OnInit {
  model: UploadFileCategoryViewModel[];
  dataSource: any;
  displayedColumns: string[] =  ['index', 'Name', 'NameHindi', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Scheme Upload file in English' }, { Value: 'NameHindi', Text: 'Scheme Upload file in Hindi' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: IndexModel;
  totalRecords: number;
  constructor( private readonly  _schemeUploadFileCategoryService: SchemeUploadFileCategoryService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,) {
    this._parentApi.setpagelayout(" Scheme Upload File :", "add", "Create", "master/scheme/schemeuploadfilecategory", true);
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
    
    this._schemeUploadFileCategoryService.GetList(this.indexModel).subscribe(
      data => {
        ;
        if (data.IsSuccess) {
          this.model = <UploadFileCategoryViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<UploadFileCategoryViewModel>(
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
    
    const _dialogRef = this._dialog.open(SchemeUploadFileDialogComponent, {
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
        this._schemeUploadFileCategoryService.DeleteSchemeUploadFileCategory(Id).subscribe(
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
