import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { Component, OnInit, Inject } from "@angular/core";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import {
  CancellationLookupModel,
  DepartmentSetupCancellationModel
} from "src/app/Shared/Model/order-cancellation.model";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CommonService } from "src/app/Shared/Service/common.service";
import { OrderCancellationService } from "src/app/Shared/Service/order-cancellation.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-order-cancellation-dialog",
  templateUrl: "./order-cancellation-dialog.component.html",
  styleUrls: ["./order-cancellation-dialog.component.css"]
})
export class OrderCancellationDialogComponent implements OnInit {
  //#region << Variable >>
  dDLList: DDLModel;
  model: CancellationLookupModel;
  reason = new FormControl("", [Validators.required]);

  //#endregion

  //#region <<Constructor>>
  constructor(
    private _dialog: MatDialog,
    public readonly _dialogRef: MatDialogRef<OrderCancellationDialogComponent>,
    private readonly _orderCancellationService: OrderCancellationService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.model = new CancellationLookupModel();
    if (data) {
      this.model.OrderId = data;
    }
  }
  //#endregion

  //#region << Methods>>
  ngOnInit() {
    this.GetDDLList();
    this.GetByLoggedInDepartment();
  }

  GetByLoggedInDepartment() {
    this._orderCancellationService.GetByLoggedInDepartment().subscribe(
      data => {
        if (data.IsSuccess) {
          const temp = <DepartmentSetupCancellationModel>data.Data;
          if (temp.IsAutoSMS) {
            this.model.IsAutoSMS = temp.IsAutoSMS;
          }
          if (temp.IsAutoEmail) {
            this.model.IsAutoEmail = temp.IsAutoEmail;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ddlCancellationOrderKey).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.reason.markAsTouched();
    if (this.reason.valid) {
      if (this.model.OrderId) {
        this._orderCancellationService
          .SaveCancellationOrder(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._dialogRef.close(true);
              } else {
                this._alertService.error(data.Message);
              }
            },
            error => {
              console.log(error);
              this._alertService.error(error.message);
            }
          );
      } else {
        this._alertService.error(GlobalMessagesModel.CancellationIdNotExist);
      }
    }
  }

  onNoClick() {
    this._dialogRef.close();
  }
  //#endregion
}
