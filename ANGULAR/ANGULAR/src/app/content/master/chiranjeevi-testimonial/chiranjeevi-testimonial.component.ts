import { stringify } from 'querystring';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { TestimonialViewModel } from 'src/app/Shared/Model/Master/chiranjeevi-testimonial-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-chiranjeevi-testimonial',
  templateUrl: './chiranjeevi-testimonial.component.html',
  styleUrls: ['./chiranjeevi-testimonial.component.css']
})
export class ChiranjeeviTestimonialComponent implements OnInit {
//#region << Variable >>
listModel: TestimonialViewModel[];
dataSource: MatTableDataSource<TestimonialViewModel>;
displayedColumns: string[] = [
  "index",
  "Name",
  "Description",
  "ImageUrl",
  "PdfUrl",
  "IsActive",
  // "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Description", Text: "Description" },
  { Value: "Name", Text: "Name" },

];

searchColumns: ColumnHeaderModel[] = [
  { Value: "Description", Text: "Description" },
  { Value: "Name", Text: "Name" },

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
TestimonialPermission: PermissionModel = this._commonService.GetPagePermission(
  "/master/testimonial-list",
  "",
  "",
  ""
);

//#endregion

//#region << constructor >>
  constructor(
    private _parentComponent: AppComponent,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog
  ) {
    this.TestimonialPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Testimonial List:",
        "",
        "",
        ""
      )
    : this._parentComponent.setpagelayout("Testimonial List:");
  this.indexModel = new IndexModel();
   }

//#region << Method >>

ngOnInit() {
  this.GetList();
}

sortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc =
    event.direction === AppSetting.orderByDscAsc
      ? AppSetting.orderByAsc
      : AppSetting.orderByDsc;
  this.indexModel.IsPostBack = true;
  this.GetList();
}


onPaginateChange(event) {
  this.indexModel.Page = event.pageIndex + 1;
  this.indexModel.PageSize = event.pageSize;
  this.indexModel.IsPostBack = true;
  this.GetList();
}

GetList() {
  
  this._commonService.GetAllTestimonialForBackend(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <TestimonialViewModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<TestimonialViewModel>(
          this.listModel
        );
        this.totalRecords = data.Data.TotalRecords;
        if (!this.indexModel.IsPostBack) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}


onActiveStatus(id) {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: "350px",
    data: GlobalMessagesModel.ConfirmStatusChanged,
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this._commonService.UpdateStatus(id).subscribe(
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
}

SearchByKeyword(event) {
  
  this.indexModel.Search = event;
  this.GetList();
}

Reset() {
  this.indexModel = new IndexModel();
  this.GetList();
}

downloadPdf(Url) {
  if (Url) {
    const link = document.createElement("a");
    link.setAttribute("href", Url);
    link.setAttribute("download", "Testinomial" + ".pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

//#endregion

}
