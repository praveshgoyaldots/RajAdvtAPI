import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  OrderEntryListModel,
  CustomDateSearchModel
} from "src/app/Shared/Model/orderlist.model";
import { OrderEntryService } from "src/app/Shared/Service/orderentry.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { MatTableDataSource, MatPaginator, MatSort, DateAdapter, MAT_DATE_FORMATS, MatDialog } from "@angular/material";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import {
  IndexModel,
  PermissionModel,
  CommonDocModel
} from "src/app/Shared/Model/general-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { OrderGenerateMasterListModel } from 'src/app/Shared/Model/generate-order.model';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { GenerateOrderService } from 'src/app/Shared/Service/generate-order.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
  //providers: [OrderEntryService]
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class OrderComponent implements OnInit {
  orderEntryList: OrderGenerateMasterListModel[];
  dataSource: any;
  preDate:Date|string;
  displayedColumns: string[] = ["index", "Title" , "DepartmentTitle" , "TypeName" , "ModifiedBy" , "Id" , "SectorName" , "BeneficiaryCategoryIds" , "Status" , "Lock" , "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "DepartmentTitle", Text: "Department" },
  // { Value: "Title", Text: "Title" },
  // { Value: "OrderNo", Text: "Document No." },
  { Value: "SectorName", Text: "Sector Name" },


];

  searchColumns: ColumnHeaderModel[] = [
     { Value: "DepartmentTitle", Text: "Department Title"},
    { Value: "Title", Text: "Title" },
    { Value: "TypeName", Text: "Type" },
    { Value: "OrderNo", Text: "Document No" },
    { Value: "Date", Text: " Issue Date" },
    { Value: "CreatedDate", Text: "Entry Date" },
   // { Value: "Id", Text: " Software Entry No" },
    // { Value: "Id", Text: " Order code" }
  ];
  ddlDepartment: UserDepartmentViewModel[];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  OrderPermission: PermissionModel = this._commonService.GetPagePermission(
    "/order",
    "/order/add",
    "/order/detail",
    "/order/update",
    "/order/delete",
    "/order/lock"
  );
  indexModel: CustomDateSearchModel;
  totalRecords: number;
  loginData: UserViewModel;

  // helpDocUrl: string;
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument:CommonDocModel;


  constructor(
    private _parentApi: AppComponent,
    private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    private _route: ActivatedRoute,
  ) {


    this.OrderPermission.AddPageAccess
      ? this._parentApi.setpagelayout(
          "Government Documents  :",
          "add",
          "Add",
          "order/addold"
        )
      : this._parentApi.setpagelayout("Orders :")


    this.indexModel = new CustomDateSearchModel();
  }

  ngOnInit() {
    this.GetList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetHelpDocument();
    this.getDepartment();
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetList() {
    

    if (this.indexModel.IsExportToExcel) {
      this._orderEntryService
      .ExportGovernmentDocumentData(
        this.indexModel
      )
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
              
              const linkSource = data.Data;
              const downloadLink = document.createElement("a");
              const fileName = "Report";
              downloadLink.href = linkSource;
              downloadLink.download = fileName;
              downloadLink.target = "blank";
              downloadLink.click();
          } else {
            this._alertService.error(data.Message);
          }
          this.indexModel.IsExportToExcel=false;
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }else{
    this._orderEntryService.GetOrderEntryList(this.indexModel).subscribe(
      data => {
      this.indexModel.SearchDate=this.preDate;
        if (data.IsSuccess) {
          this.orderEntryList = <OrderGenerateMasterListModel[]>data.Data.Data;
         // this.helpDocUrl = data.Data.HelpDocUrl;
          this.dataSource = new MatTableDataSource<OrderGenerateMasterListModel>(
            this.orderEntryList
          );
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.totalRecords = data.Data.TotalRecords;
        }
        this.indexModel.IsExportToExcel=false;
      },
      error => {
        this.indexModel.SearchDate=this.preDate;
        this._alertService.error(error.message);
      }
    );
    }
  }

  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(
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
  downloadPdf(Url,isHelpDoc : Boolean=false) {
    
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

  // downloadPdf(Url) {
  //   const linkSource = Url;
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = linkSource;
  //   downloadLink.download = "Help Document";
  //   downloadLink.click();
  // }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
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

  ChangeActiveStatusClick(id) {
    this._orderEntryService.SetStatus(id).subscribe(
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

  // ChangeActiveStatusClick(id) {
    
  //   this._commonService.GenerateOTP().subscribe(
  //     data => {
  //       if (data.IsSuccess) {

  //         const _dialogRef = this._dialog.open(OTPDialogComponent, {
  //           width: "500px",
  //           disableClose:true
  //         });
  //         _dialogRef.afterClosed().subscribe((result: boolean) => {

  //           if (result) {

  //             this._orderEntryService.SetStatus(id).subscribe(
  //               data => {
  //                 if (data.IsSuccess) {
  //                   this.GetList();
  //                   this._alertService.success(data.Message);
  //                 } else {
  //                   this._alertService.error(data.Message);
  //                 }
  //               },
  //               error => {
  //                 this._alertService.error(error.message);
  //               }
  //             );

  //           }
  //         });
  //       }else{
  //         this._alertService.error(data.Message);
  //       }
  //     },
  //     error => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  SearchByKeyword(searchValue) {
    

    this.indexModel.Search = searchValue;
    if (searchValue === null) {
      this.indexModel.SearchDate = null;
      this.preDate=null;
    }else{
      if(this.indexModel.SearchDate){
        this.preDate= this.indexModel.SearchDate;
        this.indexModel.SearchDate = this.indexModel.SearchDate.toLocaleString();
      }
    }

    if (this.indexModel.FromDate) {
      let uTCFromDate = new Date(
        Date.UTC(new Date( this.indexModel.FromDate).getFullYear(), new Date( this.indexModel.FromDate).getMonth(), new Date( this.indexModel.FromDate).getDate())
        ).toISOString();
        this.indexModel.FromDate=uTCFromDate;
    }

    if (this.indexModel.ToDate) {
      let uTCToDate = new Date(
        Date.UTC(new Date( this.indexModel.ToDate).getFullYear(), new Date( this.indexModel.ToDate).getMonth(), new Date( this.indexModel.ToDate).getDate())
        ).toISOString();
        this.indexModel.ToDate=uTCToDate;
    }

    this.GetList();
  }

  lockClick(id){
    this._orderEntryService.LockToggle(id).subscribe(
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

  OnDelete(id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._orderEntryService.DeleteOrder(id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this._alertService.success(data.Message);
              this.GetList();
              // this._router.navigate(["order"]);
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

  Reset(){
    this.indexModel=new CustomDateSearchModel();

    this.GetList();
  }

  downloadCsv(){
    this.indexModel.IsExportToExcel = true;
    this.GetList();
  }

}
