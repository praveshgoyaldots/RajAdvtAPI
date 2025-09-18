import { AdvListForAdmindeptDptPlatformUserModel } from './../../../../Shared/Model/advertisement.model';
import { AlertService } from "./../../../../Shared/Service/alert.service";
import {
  DDLModel,
  DdlItemModel,
  ColumnHeaderModel
} from "src/app/Shared/Model/commonddl.model";
import {
  UserViewModel,
  UserDistrictViewModel
} from "./../../../../Shared/Model/user-model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  VCParticipantModel,
  VCParticipantDDLModel,
  VCParticipantViewModel
} from "src/app/Shared/Model/VC/vc-participant-model";
import { AppComponent } from "src/app/app.component";
import { VCParticipantService } from "src/app/Shared/Service/VC/vc-participant.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: "app-vc-participant-add-update",
  templateUrl: "./vc-participant-add-update.component.html",
  styleUrls: ["./vc-participant-add-update.component.css"]
})
export class VcParticipantAddUpdateComponent implements OnInit {
  //#region  List
  listModel: VCParticipantViewModel[];
  dataSource: MatTableDataSource<VCParticipantViewModel>;
  displayedColumns: string[] = [
    "index",
    "VcCreationTitle",
    "Name",
    "Designation",
    "DistrictTitle",
    "LocationName",
    "ParticipantCategoryEnglish",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "VcCreationTitle", Text: "VC Name" },
    { Value: "Name", Text: "Participant Name" },
    { Value: "Designation", Text: "Designation" },
    { Value: "DistrictTitle", Text: "District" },
    { Value: "LocationName", Text: "Location" },
    { Value: "ParticipantCategoryEnglish", Text: "Participant Category" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion List

  //#region AddUpdate Variable
  formGroup: FormGroup;
  model: VCParticipantModel;
  title: string;
  fileValidationMsgLogo1: string;
  fileValidationMsgLogo2: string;
  loginData: UserViewModel;
  ddlDistrict: UserDistrictViewModel[];
  dDLList: DDLModel;
  dDLLocationByDistrict: DdlItemModel[];
  dDLParticipant: VCParticipantDDLModel[];
  isEnableNameDesignation = true;
  isOtherLocation = false;
  //#endregion AddUpdate Variable

  //#region constructor
  constructor(
    private _parentApi: AppComponent,
    private readonly _vCParticipantService: VCParticipantService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    private readonly _dialog: MatDialog,
  ) {
    this.model = new VCParticipantModel();
    this.indexModel = new IndexModel();
    this._parentApi.setpagelayout(
      "Add Participant :",
      "",
      "",
      ""
    );
    this.title = "Add";
  }

  //#endregion constructor

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.FormGroupInit();
    this.GetDDLList();
    this.getDistrict();
  }

  //#region Add/Update Methods

  participantClick(data) {
    
    if (this.model.Id > 0) {
      if (Number(data) > 0) {
        this.isEnableNameDesignation = true;
        const item = this.dDLParticipant.find(x => x.Code === Number(data));
        this.model.Name = item.NameEnglish;
        this.model.Designation = item.DesignationEnglish;
        this.model.DisplayOrder = item.DisplayOrder;
      } else {
        this.model.Name = null;
        this.model.Designation = null;
        this.isEnableNameDesignation = false;
      }
    }

    if (this.model.Id === 0) {
const otherCode = data.findIndex(x => Number(x) === 0);
if (otherCode >= 0) {
  this.isEnableNameDesignation = false;
  this.formGroup.get("Name").setValidators([Validators.required]);
  this.formGroup.get("Name").updateValueAndValidity();
  this.formGroup.get("Designation").setValidators([Validators.required]);
  this.formGroup.get("Designation").updateValueAndValidity();
  this.model.ParticipantCode = 0;
}else{
  this.isEnableNameDesignation = true;
  this.formGroup.get("Name").clearValidators();
  this.formGroup.get("Name").updateValueAndValidity();
  this.formGroup.get("Designation").clearValidators();
  this.formGroup.get("Designation").updateValueAndValidity();
  this.model.ParticipantCode = null;
}
    }
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.ddlVCParticipantAddUpdateKey)
      .subscribe(
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

  GetParticipant(code) {
    
    if (this.model.VCCreateCode) {
      this._commonService
        .GetVCPaticipantByPaticipantCategory(
          code,
          Number(this.model.VCCreateCode),
          this.model.Id
        )
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this.dDLParticipant = <VCParticipantDDLModel[]>data.Data;
              if (this.model.ParticipantCode==0) {
                this.isEnableNameDesignation = false;
              }else{
                this.isEnableNameDesignation = true;
              }
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this._alertService.error(GlobalMessagesModel.VCNameNotExist);
    }
  }

  GetParticipantClick(code) {
    
    if (code) {
      this.GetParticipant(code);
    } else {
      this.dDLParticipant = [];
      this.model.Name = null;
      this.model.Designation = null;
      this.isEnableNameDesignation = true;
    }
    this.model.ParticipantCode = null;
  }

  GetLocation(code) {
    if (code) {
      this._commonService.GetLocationByDistrict(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLLocationByDistrict = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.dDLLocationByDistrict = [];
    }
  }

  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    
    this._vCParticipantService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <VCParticipantModel>data.Data;
          this.AddValidation();
          if (this.model.VCCreateCode) {
            this.model.VCCreateCode = String(this.model.VCCreateCode);
          }
          if (this.model.ParticipantCategoryCode) {
            this.GetParticipant(this.model.ParticipantCategoryCode);
            this.model.ParticipantCategoryCode = String(
              this.model.ParticipantCategoryCode
            );
          }
          if (this.model.DistrictCode) {
            this.GetLocation(this.model.DistrictCode);
            this.model.DistrictCode = String(this.model.DistrictCode);
          }
          if (this.model.LocationCode) {
            this.model.LocationCode = String(this.model.LocationCode);
          }
          if (this.model.ModeCode) {
            this.model.ModeCode = String(this.model.ModeCode);
          }
          if (this.model.ParticipantCode) {
             this.model.ParticipantCode = String(this.model.ParticipantCode);
          }
          this.otherLocationClick();
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.model.Id) {
        this._vCParticipantService.Edit(this.model).subscribe(
          data => {
            
            if (data.IsSuccess) {
              this.GetList();
              this.title = "Add";
              this._alertService.success(data.Message);
              this.RemoveValidation();
              this.markAsUnTouched();
              const vCCode =  this.model.VCCreateCode;
              this.model = new VCParticipantModel();
              this.dDLParticipant = [];
              this.dDLLocationByDistrict = [];
              this.model.VCCreateCode = vCCode;
              this.isOtherLocation = false;
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._vCParticipantService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this.GetList();
              this._alertService.success(data.Message);
              this.RemoveValidation();
              this.markAsUnTouched();
              const vCCode =  this.model.VCCreateCode;
              this.model = new VCParticipantModel();
              this.dDLParticipant = [];
              this.dDLLocationByDistrict = [];
              this.model.VCCreateCode = vCCode;
              this.isOtherLocation = false;
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }

    } else {
    }
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      VCCreateCode: [null, Validators.required],
      ParticipantCategoryCode: [null, Validators.required],
      ParticipantCode: [null],
      Name: [null],
      Designation: [null],
      DistrictCode: [null, Validators.required],
      LocationCode: [null, Validators.required],
      ParticipantCodeList: [null, Validators.required],
      LocationTextBox: [null],
      ModeCode: [null],
      MobileNo : [null]
    });
  }

markAsUnTouched()
{
  this.formGroup.controls["VCCreateCode"].markAsUntouched();
  this.formGroup.controls["ParticipantCategoryCode"].markAsUntouched();
  this.formGroup.controls["ParticipantCode"].markAsUntouched();
  this.formGroup.controls["Name"].markAsUntouched();
  this.formGroup.controls["MobileNo"].markAsUntouched();
  this.formGroup.controls["Designation"].markAsUntouched();
  this.formGroup.controls["DistrictCode"].markAsUntouched();
  this.formGroup.controls["LocationCode"].markAsUntouched();
  this.formGroup.controls["ParticipantCodeList"].markAsUntouched();
  this.formGroup.controls["LocationTextBox"].markAsUntouched();
  this.formGroup.controls["ModeCode"].markAsUntouched();
}

  AddValidation() {
    this.formGroup.get("Name").setValidators([Validators.required]);
    this.formGroup.get("Name").updateValueAndValidity();
    this.formGroup.get("Designation").setValidators([Validators.required]);
    this.formGroup.get("Designation").updateValueAndValidity();
    // this.formGroup.get("MobileNo").setValidators([Validators.required]);
    // this.formGroup.get("MobileNo").updateValueAndValidity();
    this.formGroup.get("ParticipantCode").setValidators([Validators.required]);
    this.formGroup.get("ParticipantCode").updateValueAndValidity();
    this.formGroup.get("ParticipantCodeList").clearValidators();
    this.formGroup.get("ParticipantCodeList").updateValueAndValidity();
  }

  RemoveValidation() {
    this.formGroup.get("Name").clearValidators();
    this.formGroup.get("Name").updateValueAndValidity();
    // this.formGroup.get("MobileNo").clearValidators();
    // this.formGroup.get("MobileNo").updateValueAndValidity();
    this.formGroup.get("Designation").clearValidators();
    this.formGroup.get("Designation").updateValueAndValidity();
    this.formGroup.get("ParticipantCodeList").setValidators([Validators.required]);
    this.formGroup.get("ParticipantCodeList").updateValueAndValidity();
    this.formGroup.get("ParticipantCode").clearValidators();
    this.formGroup.get("ParticipantCode").updateValueAndValidity();
  }

  editClick(data){
   this.AddValidation();
    if (data) {
      this.model.Id = Number(data);
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Participant :",
        "keyboard_backspace",
        "Back To List",
        "vc/participant"
      );
      this.title = "Update";
    }
  }

  otherLocationClick() {
    if (Number(this.model.LocationCode) === 0) {
      this.isOtherLocation = true;
      this.formGroup.get("ModeCode").setValidators([Validators.required]);
      this.formGroup.get("ModeCode").updateValueAndValidity();
    } else {
      this.isOtherLocation = false;
      this.formGroup.get("ModeCode").clearValidators();
      this.formGroup.get("ModeCode").updateValueAndValidity();
    }
  }

  //#endregion Add/Update Methods

//#region List Method

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

  if (this.model.VCCreateCode) {
  this._vCParticipantService.GetList(this.indexModel, Number(this.model.VCCreateCode)).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <VCParticipantViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<VCParticipantViewModel>(this.listModel);
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
} else {
  this.listModel = [];
}
}


onDelete(id) {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: "Do you sure! want to delete this record?"
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._vCParticipantService.Delete(id).subscribe(
        data => {

          if (
            (data.IsSuccess)
          ) {
            this._alertService.success(data.Message);
            this._commonService.ScrollingTop();
            this.GetList();
          }else{
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
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

markPresentAbsent(id) {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: "Do you sure! want to mark present/absent to this participant?"
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._vCParticipantService.MarkAsPresentAbsent(id).subscribe(
        data => {

          if (
            (data.IsSuccess)
          ) {
            this._alertService.success(data.Message);
            this._commonService.ScrollingTop();
            this.GetList();
          }else{
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
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

//#endregion List Method

}
