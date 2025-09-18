import { GeneratedPdfModel } from './../../../../Shared/Model/generate-order.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderFinalAProvalListModel } from 'src/app/Shared/Model/generate-order.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel, CommonDocModel } from 'src/app/Shared/Model/general-model';
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { GenerateOrderService } from 'src/app/Shared/Service/generate-order.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { DispatchDialogComponent } from '../dispatch-dialog/dispatch-dialog.component';

@Component({
  selector: 'app-order-final-approval-list',
  templateUrl: './order-final-approval-list.component.html',
  styleUrls: ['./order-final-approval-list.component.css']
})
export class OrderFinalApprovalListComponent implements OnInit {
//#region << Variable >>
listModel: OrderFinalAProvalListModel[];
dataSource: MatTableDataSource<OrderFinalAProvalListModel>;
displayedColumns: string[] = ["index","DepartmentTitle", "Title", "TypeName","OrderNo","Date","CreatedDate","DepartmentCode","Id", "Action"];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "TypeName", Text: "Type" },
  { Value: "Title", Text: "Title" },
  { Value: "OrderNo", Text: "Document No." },
];
columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
generateOrderPermission: PermissionModel = this._commonService.GetPagePermission("/order/generateorder", "/order/generateorder/add", "/order/generateorder/preview", "/order/generateorder/edit","/order/generateorder/Lock");
helpDocumentEnum = HelpDocumentEnum;
helpDocument:CommonDocModel;
searchColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department"},
  { Value: "Title", Text: "Title" },
  { Value: "TypeName", Text: "Type" },
  { Value: "OrderNo", Text: "Document No" },
  { Value: "Date", Text: " Date of Issue" },
  { Value: "CreatedDate", Text: " Date of Entry" },
  { Value: "DepartmentCode", Text: " Department Code" },
  { Value: "Id", Text: " Order code" }
];
//#endregion

//#region << constructor >>

constructor(
  private readonly _generateOrderService: GenerateOrderService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private _parentApi: AppComponent,
  private readonly _dialog: MatDialog,) {

this.generateOrderPermission.AddPageAccess
? this._parentApi.setpagelayout("List Of Document For Final Approval :","add","Add New","order/generateorderadd")
: this._parentApi.setpagelayout("List Of Document For Final Approval :");

  this.indexModel = new IndexModel();
}
//#endregion

//#region << Method >>
ngOnInit() {
  this.GetList();
  this.GetHelpDocument();
}

SortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc = event.direction === AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
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
  this._generateOrderService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <OrderFinalAProvalListModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<OrderFinalAProvalListModel>(this.listModel);
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

downloadPdf(Url) {
  const linkSource = Url;
  const downloadLink = document.createElement("a");

  downloadLink.href = linkSource;
  downloadLink.download = "Help Document";
  downloadLink.click();
}

statusClick(id) {
  this._commonService.GenerateOTP().subscribe(
    data => {
      if (data.IsSuccess) {
        const _dialogRef = this._dialog.open(OTPDialogComponent, {
          width: "500px",
          disableClose: true
        });
        _dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {

            const _dialogRef = this._dialog.open(DispatchDialogComponent, {
              width: "500px",
              disableClose: true
            });
            _dialogRef.afterClosed().subscribe((dispatchResult: boolean) => {
              if (dispatchResult) {

            this._generateOrderService.SetStatus(id,dispatchResult).subscribe(
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


        });
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

SearchByKeyword(searchValue) {
  this.indexModel.Search = searchValue;
  this.GetList();
}

previewClick(id){
  
  this._generateOrderService.GeneratePdf(id).subscribe(
    data => {
      if (data.IsSuccess) {
        const result = <GeneratedPdfModel>data.Data;
       // --------generate pdf without esign
        const linkSource = result.Url;
        const downloadLink = document.createElement("a");
        const fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

approveClick(id){
  this._generateOrderService.GenerateUINumber(id).subscribe(
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


GetHelpDocument() {
  this._commonService.GetHelpDocument(this.helpDocumentEnum.GenerateOrder).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.helpDocument=<CommonDocModel>data.Data;
      }else{
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

downloadDoc(Url,isHelpDoc : Boolean=false) {
  
  const linkSource = Url;
  const downloadLink = document.createElement("a");
    if (isHelpDoc) {
      downloadLink.href = linkSource;
      downloadLink.download = "Help Document";
      downloadLink.click();
    }else{
      downloadLink.href = linkSource;
      downloadLink.download = "Blank Document";
      downloadLink.click();
    }

}


//#endregion

}
