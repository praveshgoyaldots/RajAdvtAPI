import { Component, OnInit, Inject } from "@angular/core";
import { ParticipantCategoryMasterModel } from "src/app/Shared/Model/Master/participant-category-master.model";
import { Validators, FormControl } from "@angular/forms";
import { ParticipantCategoryMasterService } from "src/app/Shared/Service/participant-category-master.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";

@Component({
  selector: "app-vc-participant-add-update-dialog",
  templateUrl: "./vc-participant-add-update-dialog.component.html",
  styleUrls: ["./vc-participant-add-update-dialog.component.css"]
})
export class VcParticipantAddUpdateDialogComponent implements OnInit {
  //#region <Variable>

  id: number;
  model: ParticipantCategoryMasterModel;
  Name = new FormControl("", [Validators.required]);
  NameHindi = new FormControl("", [Validators.required]);
  DisplayOrder = new FormControl("", [Validators.required]);
  title: string = "Add";

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<
      VcParticipantAddUpdateDialogComponent
    >,
    private readonly _alertService: AlertService,
    private readonly _participantCategoryMasterService: ParticipantCategoryMasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    } else {
      this.model = new ParticipantCategoryMasterModel();
      this.title = "Add";
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {}

  GetById() {
    this._participantCategoryMasterService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <ParticipantCategoryMasterModel>data.Data;
        }
      },
      error => {
        this.model = new ParticipantCategoryMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    this.DisplayOrder.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid && this.DisplayOrder.valid) {
      if (this.model.Id) {
        this._participantCategoryMasterService.Edit(this.model).subscribe(
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
        this._participantCategoryMasterService.Add(this.model).subscribe(
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
      }
    }
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  //#endregion <Method>
}
