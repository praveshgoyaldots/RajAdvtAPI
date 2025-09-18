import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { GalleryModel } from 'src/app/Shared/Model/Master/gallery.model';
import { GalleryService } from 'src/app/Shared/Service/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  model: GalleryModel[];
  dataSource: any;
  indexModel: IndexModel;
  totalRecords: number;

  displayedColumns: string[] = ["index", "Caption", "SchemeName", "DepartmentTitle", "UploadType", "IsActive", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Caption", Text: "Title" },
    { Value: "SchemeName", Text: "Scheme" },
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "UploadType", Text: "Upload Type" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission = this._commonService.GetPagePermission("/master/gallery", "/master/gallery/add", "/master/gallery/detail", "/master/gallery/update", "/master/gallery/delete");

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _galleryService: GalleryService,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService
  ) {
    var pageTitle = "Photo / Vedio / Document :";
    this.Permission.AddPageAccess ? this.appComponnet.setpagelayout(pageTitle, "add", "Create", "master/gallery/add") : this.appComponnet.setpagelayout(pageTitle);
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._galleryService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <GalleryModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<GalleryModel>(this.model);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  updateDeleteStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._galleryService.ChangeDeleteStatus(id).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._commonService.ScrollingTop();
              this.getList();
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  updateActiveStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._galleryService.ChangeActiveStatus(id).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this.getList();
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.getList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.getList();
  }

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.getList();
  }

}