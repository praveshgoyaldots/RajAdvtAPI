import { error } from 'util';
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  GeneratedPdfModel,
  OrderGenerateAuthorityListModel,
  ReferencyNotificationResponseModel,
  ESignPdfModel,
  TemplateVerifyModel
} from "src/app/Shared/Model/generate-order.model";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  IndexModel,
  PermissionModel
} from "src/app/Shared/Model/general-model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { GenerateOrderService } from "src/app/Shared/Service/generate-order.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { OrderCancellationDialogComponent } from "../../order-cancellation-dialog/order-cancellation-dialog.component";
import { ESignDialogComponent } from "../e-sign-dialog/e-sign-dialog.component";
import { DispatchDialogComponent } from '../dispatch-dialog/dispatch-dialog.component';
import { SendNotificationContentEnum, MessageTypeEnum, NotificationModuleNameEnum } from 'src/app/Shared/Enum/order.enum';
import { NotificationPreviewPopupComponent } from 'src/app/content/notification-preview-popup/notification-preview-popup.component';

@Component({
  selector: "app-generate-order-authority-list",
  templateUrl: "./generate-order-authority-list.component.html",
  styleUrls: ["./generate-order-authority-list.component.css"]
})
export class GenerateOrderAuthorityListComponent implements OnInit {
  //#region << Variable >>
  listModel: OrderGenerateAuthorityListModel[];
  dataSource: MatTableDataSource<OrderGenerateAuthorityListModel>;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "Title",
    "TypeName",
    "OrderNo",
    "Date",
    "CreatedDate",
    "AllowToEdit",
    "Action"
  ]; //"Status",
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "TypeName", Text: "Type" },
    { Value: "Title", Text: "Title" },
    { Value: "OrderNo", Text: "Document No." }
    // { Value: "Date", Text: "Date of Issue" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  // generateOrderPermission: PermissionModel = this._commonService.GetPagePermission("/order/generateorderauthoritylist", "/order/generateorder/add", "/order/generateorder/preview", "/order/generateorder/edit", "/order/generateorder/Lock");
  generateOrderPermission: PermissionModel = this._commonService.GetPagePermission(
    "/order/generateorderauthoritylist",
    "/order/generateorderauthoritylist/add",
    "",
    "/order/generateorderauthoritylist/edit",
    "/order/generateorder/Lock",
    "/order/generateorder/cancel"
  );
  searchColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "Title", Text: "Title" },
    { Value: "TypeName", Text: "Type" },
    { Value: "OrderNo", Text: "Document No" },
    { Value: "Date", Text: " Date of Issue" },
    { Value: "CreatedDate", Text: " Date of Entry" }
  ];
  esignModel: ESignPdfModel;
  esignData: string;
  //#endregion
  SendNotificationContentEnum = SendNotificationContentEnum;
  messageTypeEnum = MessageTypeEnum;
  notificationModuleNameEnum = NotificationModuleNameEnum;
  //#region << constructor >>
  TemplateVerifyModel: TemplateVerifyModel;
  constructor(
    private readonly _generateOrderService: GenerateOrderService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private _parentApi: AppComponent,
    private readonly _dialog: MatDialog
  ) {
    
    this._parentApi.setpagelayout(
      "List Of Document Generated Online For Authority:",
      "",
      "",
      ""
    );

    this.indexModel = new IndexModel();
    this.esignModel = new ESignPdfModel();
  }
  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.GetList();
  }

  SortData(event) {
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
    this._generateOrderService.GetAuthorityList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <OrderGenerateAuthorityListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
            OrderGenerateAuthorityListModel
          >(this.listModel);
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
    downloadLink.download = "Download";
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

              this._generateOrderService.SetStatus(id, dispatchResult).subscribe(
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

  lockClick(id) {
    this._generateOrderService.Lock(id).subscribe(
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

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.GetList();
  }

  DocumentESign(id) {
    const _dialogRef = this._dialog.open(ESignDialogComponent, {
      width: "500px",
      disableClose: true
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        
        this.esignModel.AdharNo = String(result);
        this.esignModel.Id = id;
        localStorage.setItem("IsEsign", "true");
        this._generateOrderService
          .GenerateWithEsignPdf(this.esignModel)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                // const result = <GeneratedPdfModel>data.Data;

                // // --------generate pdf with esign
                // this.esignData = result.Url;
                // document.getElementById("esignDatasss").innerHTML =
                //   "<input type='text' id='esignData' name='esignData' value='" +
                //   this.esignData +
                //   "'>";
                // document.getElementById("btnESign").click();

                this.GetList();
              }
            },
            error => {
              this._alertService.error(error.message);
            }
          );
      }
    });
  }

  approveClick(id) {
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

  // sendNotificationClick(id: number, isEmail: boolean = false) {

  //   const model = new ReferencyNotificationResponseModel();
  //   model.IsEmail = isEmail;
  //   model.OrderId = id;
  //   this._generateOrderService.SendNotification(model).subscribe(
  //     data => {
  //       if (data.IsSuccess) {
  //         this.GetList();
  //         this._alertService.success(data.Message);
  //       } else {
  //         this._alertService.error(data.Message);
  //       }
  //     },
  //     error => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }


    //
  sendNotificationClick( id: number, isEmail: boolean = false) {

          const model = new ReferencyNotificationResponseModel();
          model.IsEmail = isEmail;
          model.OrderId = id;
          this.TemplateVerifyModel = new TemplateVerifyModel();
          this.TemplateVerifyModel.TypeCode = SendNotificationContentEnum.MailtoCCReferencyaboutOrder;
          this.TemplateVerifyModel.FilterId = id;
          this.TemplateVerifyModel.ModuleName = this.notificationModuleNameEnum.OrderGenerationNotification;
        if (isEmail == true) {
          this.TemplateVerifyModel.NotificationType = MessageTypeEnum.EmailType;
        }
        else{
          this.TemplateVerifyModel.NotificationType = MessageTypeEnum.SmsType;
        }


          const _dialogRef = this._dialog.open(NotificationPreviewPopupComponent, {
            width: "1000px",
            data:  this.TemplateVerifyModel
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {

            }
          });
        }



  orderCancellationClick(data) {
    const _dialogRef = this._dialog.open(OrderCancellationDialogComponent, {
      width: "500px",
      data: data
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  previewClick(id) {
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
  //#endregion
}
