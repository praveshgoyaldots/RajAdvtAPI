import { DDLModel } from "./../../../../Shared/Model/commonddl.model";
import { Component, OnInit, Inject } from "@angular/core";
import { NewspaperMasterModel } from "src/app/Shared/Model/Master/news-newspaper-model";
import { Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { NewsNewspaperMasterService } from "src/app/Shared/Service/news-newspaper-master.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";

@Component({
  selector: "app-news-newspaper-master-addupdate",
  templateUrl: "./news-newspaper-master-addupdate.component.html",
  styleUrls: ["./news-newspaper-master-addupdate.component.css"]
})
export class NewsNewspaperMasterAddupdateComponent implements OnInit {
  //#region <Variable>

  id: number;
  model: NewspaperMasterModel;
  dDLList: DDLModel;
  Name = new FormControl("", [Validators.required]);
  NameHindi = new FormControl("", [Validators.required]);
  title: string = "Add";

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<
      NewsNewspaperMasterAddupdateComponent
    >,
    private readonly _alertService: AlertService,
    private readonly _newsNewspaperMasterService: NewsNewspaperMasterService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    } else {
      this.model = new NewspaperMasterModel();
      this.title = "Add";
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.NewspaperMasterDDLKey).subscribe(
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

  GetById() {
    this._newsNewspaperMasterService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <NewspaperMasterModel>data.Data;
          if (this.model.ModeCode) {
            this.model.ModeCode = String(this.model.ModeCode);
          }
          if (this.model.NewsTypeCode) {
            this.model.NewsTypeCode = String(this.model.NewsTypeCode);
          }
        }
      },
      error => {
        this.model = new NewspaperMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid) {
      if (this.model.Id) {
        this._newsNewspaperMasterService.Edit(this.model).subscribe(
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
        this._newsNewspaperMasterService.Add(this.model).subscribe(
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
