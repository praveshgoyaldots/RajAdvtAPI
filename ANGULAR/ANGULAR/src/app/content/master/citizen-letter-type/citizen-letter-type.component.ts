import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { MatTableDataSource, MatDialog, MatSort, MatPaginator} from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { CitizenLetterTypeModel } from 'src/app/Shared/Model/Master/citizen-letter-type.model';
import { CitizenLetterTypeService } from 'src/app/Shared/Service/citizen-letter-type.service';

@Component({
  selector: 'app-citizen-letter-type',
  templateUrl: './citizen-letter-type.component.html',
  styleUrls: ['./citizen-letter-type.component.css']
})

export class CitizenLetterTypeComponent implements OnInit {
  model: CitizenLetterTypeModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "LetterType",
    "LetterTypeHindi",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "LetterType", Text: "Letter Type" },
    { Value: "LetterTypeHindi", Text: "Letter Type(Hindi)" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  Permission = this._commonService.GetPagePermission(
    "/master/citizen-letter-type",
    "/master/citizen-letter-type/add",
    "/master/citizen-letter-type/detail",
    "/master/citizen-letter-type/update",
    "/master/citizen-letter-type/delete"
  );

  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _letterTypeService: CitizenLetterTypeService,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService
  ) {
    this.Permission.AddPageAccess
      ? this.appComponnet.setpagelayout(
          "Letter Type :",
          "add",
          "Create",
          "master/citizen-letter-type/add"
        )
      : this.appComponnet.setpagelayout("Letter Type :");
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._letterTypeService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <CitizenLetterTypeModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<CitizenLetterTypeModel>(this.model);
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
        this._letterTypeService.ChangeDeleteStatus(id).subscribe(
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
        this._letterTypeService.ChangeActiveStatus(id).subscribe(
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
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
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
