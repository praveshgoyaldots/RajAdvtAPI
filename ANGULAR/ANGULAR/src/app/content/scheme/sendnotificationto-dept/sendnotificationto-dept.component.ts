import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { SendNotificationToDeptOfficerModel } from "src/app/Shared/Model/general-model";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-sendnotificationto-dept",
  templateUrl: "./sendnotificationto-dept.component.html",
  styleUrls: ["./sendnotificationto-dept.component.css"]
})
export class SendnotificationtoDeptComponent implements OnInit {
  //#region <Variable>

  model: SendNotificationToDeptOfficerModel;
  content = new FormControl("", [Validators.required]);

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<SendnotificationtoDeptComponent>,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model=new SendNotificationToDeptOfficerModel();
    if (data) {
      this.model.DepartmentCode = data;
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {}

  SaveClick() {
    this.content.markAsTouched();
    if (this.content.valid) {
      this._commonService
        .SendNotificationToDepartmentOfficer(this.model)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._dialogRef.close();
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
    }
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  //#endregion <Method>
}
