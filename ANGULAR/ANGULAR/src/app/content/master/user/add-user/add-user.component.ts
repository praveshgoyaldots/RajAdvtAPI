import { AuthenticationService } from "./../../../../Shared/Service/authentication.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {
  UserModel,
  SSOUserModel,
  UserViewModel,
  UserDistrictViewModel,
  UserDepartmentViewModel,
  UserTehsilViewModel,
  UserBlockViewModel,
} from "src/app/Shared/Model/user-model";
import { AppComponent } from "src/app/app.component";
import {
  DDLModel,
  FilterDDlModel,
  DdlItemModel,
} from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserTypeEnum } from "src/app/Shared/Enum/user-type.enum";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { Router } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { UserTypeService } from "src/app/Shared/Service/user-type.service";
import { UserTypeModel } from "src/app/Shared/Model/user-type.model";
import { DepartmentListDialogComponent } from '../department-list-dialog/department-list-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
  // providers: [{provide: MatFormFieldControl} ],
})
export class AddUserComponent implements OnInit {
  //#region <<Variable>>
  userTypes = UserTypeEnum;
  model: UserModel;
  SSOUserDetail: SSOUserModel;
  IsExists: number = 0;
  AdminDepartment: any;
  dDLList: DDLModel;
  filterDDlModel: FilterDDlModel[] = [];
  UserForm: FormGroup;
  loginData: UserViewModel;
  ddlDistrict: UserDistrictViewModel[];
  ddlTehsil: UserTehsilViewModel[];
  ddlBlock: UserBlockViewModel[];
  ddlUserType: DdlItemModel[] = [];
  ddlDepartment: UserDepartmentViewModel[] = [];

  ddlloginDepartment: DdlItemModel[];
  ddlAdminDepartment: UserDepartmentViewModel[] = [];
  ddlBlockByDistrict: DdlItemModel[] = [];
  ddlTahsilByBlock: DdlItemModel[] = [];
  ddlDistricByOffice: DdlItemModel[] = [];
  BlockItems: { [index: string]: string } = {};
  TahsilItems: { [index: string]: string } = {};
  selectedAll = -1;
  selectedDptAll = -1;
  //#endregion

  //#region <<Constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _userTypeService: UserTypeService,
    private readonly _dialog: MatDialog,
  ) {
    this.model = new UserModel();

    this.dDLList = new DDLModel();
    this.appComponnet.setpagelayout(
      "Add User :",
      "keyboard_backspace",
      "Back To List",
      "master/user"
    );

    this.getDDLList();
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  //#region <<Method>>

  ngOnInit() {
    setTimeout(() => {
      this.getDownLevelUserType();
    }, 300);
    this.formGroupInit();
    this.getDistrict();
    this.getDepartment();
    this.getTehsil();
    this.getBlock();
    this.getTahsilByDistrict(0);
    this.getBlockByDistrict(0);
    this.getDistrictByoffice(0);
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }
  selectAll() {
    
    if (this.selectedAll < 0) {
      // this.model.Department = this.dDLList.ddlDepartment.map(function (a) {
      //   return a.Value;
      // });
      this.model.Department = this.ddlloginDepartment.map(function (a) {
        return a.Value;
      });
      this.selectedAll = 1;
    } else {
      this.selectedAll = -1;
      this.model.Department = [];
    }
  }

  selectADMAll() {
    
    if (this.selectedDptAll < 0) {
      // this.AdminDepartment = this.ddlAdminDepartment.map(function (a) {
      //   return String(a.AdmDepartmentCode);
      // });
      this.AdminDepartment = this.dDLList.ddlUserAdminDepartment.map(function (a) {
        return String(a.Value);
      });
      this.selectedDptAll = 1;
    } else {
      this.selectedDptAll = -1;
      this.AdminDepartment = [];
    }
  }

  getDistrictByoffice(code) {
    
    this._commonService.GetDistrictByOffice(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDistricByOffice = <DdlItemModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }
  getDepartment() {
    
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
          let temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            temp.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  (t) =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
          if (this.ddlAdminDepartment) {
            this.ddlAdminDepartment= this.ddlAdminDepartment.sort((a, b) => {
              return this._commonService.compare(a.AdmDepartmentTitle, b.AdmDepartmentTitle, true);
            });
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getTahsilByDistrict(code) {
    this._commonService.GetTahsilByMultipleDistrict(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlTahsilByBlock = <DdlItemModel[]>data.Data;
          this.ddlTahsilByBlock.forEach((obj) => {
            this.TahsilItems[obj.Value] = obj.Text;
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }
  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getTehsil() {
    this._userService.GetUserTehsil(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlTehsil = <UserTehsilViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getBlock() {
    this._userService.GetUserBlock(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlBlock = <UserBlockViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForUser, this.model.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  saveClick() {
    
    if (this.model.UserType == "BLO") {
      if (this.model.Block || this.model.Tehsil) {
        // tehsilControl.setValidators(null);
        // blockControl.setValidators(null);
        this.UserForm.get("Block").setValidators(null);
        this.UserForm.get("Block").updateValueAndValidity();
        this.UserForm.get("Tehsil").setValidators(null);
        this.UserForm.get("Tehsil").updateValueAndValidity();
      } else {
        this.UserForm.get("Block").setValidators([Validators.required]);
        this.UserForm.get("Block").updateValueAndValidity();
      }
    }
    // this.UserForm.controls["UserType"].markAsTouched();
    this.UserForm.markAllAsTouched();
    if (this.UserForm.valid) {
      if (this.IsExists == 0) {
        this.model.CreatedBy = this.loginData.UserId;
        this._userService.Add(this.model).subscribe(
          (data) => {
            if (data) {
              if (data.IsSuccess) {
                this._alertService.success(
                  GlobalMessagesModel.saveSuccess,
                  true
                );
                this._router.navigate(["master/user"]);
              } else {
                this._commonService.ScrollingTop();
                this._alertService.error(GlobalMessagesModel.saveFaild);
              }
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(GlobalMessagesModel.saveFaild);
            }
          },
          (error) => {
            //   ;
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.saveError);
          }
        );
      } else {
        this._commonService.ScrollingTop();
        this._alertService.error(GlobalMessagesModel.ExistError);
      }
    }
  }

  getSSODetail(Event) {
    this._userService.UserSSOIDExist(Event.currentTarget.value).subscribe(
      (result) => {
        if (result.IsSuccess) {
          
          const SsoId = result.Data != null ? <boolean>result.Data : null;

          if (SsoId != null && SsoId == true) {
            this.model.UserEmail = undefined;
            this.model.Mobile = undefined;
            this.model.LandlineNo = undefined;
            this.model.Gender = undefined;
            this.model.ProfilePic = "";
            this._commonService.ScrollingTop();
            this._alertService.error(result.Message);
            this.IsExists = 1;
          } else {
            this.fillDetailBySSO(this.model.SSOID);
            this.IsExists = 0;
          }
        }
      },
      (error) => {
        this._commonService.ScrollingTop();
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }

  isExistUser(Event) {
    this._userService.UserNameExist(Event.currentTarget.value).subscribe(
      (result) => {
        if (result.IsSuccess) {
          const UserName = <boolean>result.Data;
          if (UserName == true) {
            this.model.UserName = null;

            this._alertService.error("User Name is already exist!");
          }
        }
      },
      (error) => {
        this._commonService.ScrollingTop();
      }
    );
  }

  fillDetailBySSO(SsoId: string) {
    this._userService.GetUserDetailBySSOFromSSO(SsoId).subscribe(
      (result) => {
        this._alertService.blank();
        if (result.IsSuccess) {
          this.SSOUserDetail = <SSOUserModel>result.Data;
          this.model.UserName = this.SSOUserDetail.DisplayName;
          this.model.UserEmail = this.SSOUserDetail.MailPersonal;
          this.model.Mobile = this.SSOUserDetail.Mobile;
          this.model.LandlineNo = this.SSOUserDetail.TelephoneNumber;
          this.model.Gender = this.SSOUserDetail.Gender;
          this.model.ProfilePic =
            this.SSOUserDetail.Photo != null &&
            this.SSOUserDetail.Photo.length > 0
              ? this.SSOUserDetail.Photo
              : "";
        } else {
          this.model.UserEmail = undefined;
          this.model.Mobile = undefined;
          this.model.LandlineNo = undefined;
          this.model.Gender = undefined;
          this.model.ProfilePic = "";
          this._commonService.ScrollingTop();
          this._alertService.error(SsoId + " SSO Not Found!");
        }
      },
      (error) => {
        this._commonService.ScrollingTop();
      }
    );
  }

  getBlockByDistrict(code) {
    
    this.getTahsilByDistrict(code);
    this._commonService.GetBlockByMultipleDistrict(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlBlockByDistrict = <DdlItemModel[]>data.Data;
          this.ddlBlockByDistrict.forEach((obj) => {
            this.BlockItems[obj.Value] = obj.Text;
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDepartmentByadmDepartment(code) {
    if (code) {
     this.model.Department=[];
      this._commonService.GetLoginUserDepartmentListByAdminDepartment(code).subscribe(
        data => {
          
          if (data) {
            this.ddlloginDepartment = <DdlItemModel[]>data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getFilterdDDL(event, key, filterFrom) {
    
    const item = new FilterDDlModel();
    item.FilterFor = key;
    item.Value =
      event.multiple == true
        ? JSON.stringify(event.value)
        : event.value == undefined || event.value == null || event.value == ""
        ? ""
        : "[" + event.value + "]";
    item.FilterFrom = filterFrom;
    this.filterDDlModel = [];
    this.filterDDlModel.push(item);

    if (item.Value == "") {
      //const frmControl = this.UserForm.get(ctrlchield);
    }

    this._commonService
      .GetFilterdDDL(this.filterDDlModel, this.model.UserType)
      .subscribe(
        (data) => {
          
          if (data.IsSuccess) {
            if (key == "ddlDistrict") {
              this.model.District = null;
              this.dDLList.ddlDistrict = data.Data.ddlDistrict;
            } else if (key == "ddlDepartment") {
              this.model.Department = null;
              this.dDLList.ddlDepartment = data.Data.ddlDepartment;
            } else if (key == "ddlParliamentConstituency") {
              this.model.AssConstituancy = null;
              this.dDLList.ddlParliamentConstituency =
                data.Data.ddlParliamentConstituency;
            } else if (key == "ddlAssemblyConstituency") {
              this.model.AssConstituancy = null;
              this.dDLList.ddlAssemblyConstituency =
                data.Data.ddlAssemblyConstituency;
            } else if (key == "ddlBlock") {
              this.model.Block = null;
              this.dDLList.ddlBlock = data.Data.ddlBlock;
            } else if (key == "ddlTehsil") {
              this.model.Tehsil = null;
              this.dDLList.ddlTehsil = data.Data.ddlTehsil;
            } else if (key == "ddlOffice") {
              this.model.OfficeName = null;
              this.dDLList.ddlOffice = data.Data.ddlOffice;
            }
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  resetModel() {
    this.model.Division = undefined;
    this.model.District = undefined;
    this.model.Tehsil = undefined;
    this.model.Block = undefined;
    this.model.Department = undefined;
    this.model.AssConstituancy = undefined;
    this.model.ParConstituancy = undefined;
    this.model.Group = undefined;
    this.setUserTypeValidators();
    this.getDDLList();
    this.getOfficeList(0);
  }

  formGroupInit() {
    this.UserForm = this.fb.group({
      UserType: ["", Validators.required],
      SSOID: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      Title: [null, Validators.compose([Validators.required])],
      Office: [null, Validators.compose([Validators.required])],
      UserName: [null, Validators.required],
      Designation: [null, Validators.required],
      Gender: [null, Validators.required],
      UserEmail: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      Mobile: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(12)]),
      ],
      IPNo: [null, Validators.maxLength(10)],
      LandlineNo: [null, Validators.maxLength(50)],

      AdminDepartment: [null],
      Group: [null],
      Department: [null],
      Division: [null],
      District: [null, Validators.compose([Validators.required])],
      Block: [null],
      Tehsil: [null],
      ParConstituancy: [null],
      AssConstituancy: [null],
    });
  }

  setUserTypeValidators() {
    const groupControl = this.UserForm.get("Group");
    const departmentControl = this.UserForm.get("Department");
    const divisionControl = this.UserForm.get("Division");
    const districtControl = this.UserForm.get("District");
    const blockControl = this.UserForm.get("Block");
    const tehsilControl = this.UserForm.get("Tehsil");
    const parConstituancyControl = this.UserForm.get("ParConstituancy");
    const assConstituancyControl = this.UserForm.get("AssConstituancy");
    const designationControl = this.UserForm.get("Designation");
    const adminDepartmentControl = this.UserForm.get("AdminDepartment");

    groupControl.setValidators(null);
    adminDepartmentControl.setValidators(null);
    departmentControl.setValidators(null);
    divisionControl.setValidators(null);
    districtControl.setValidators(null);
    blockControl.setValidators(null);
    tehsilControl.setValidators(null);
    parConstituancyControl.setValidators(null);
    assConstituancyControl.setValidators(null);

    if (this.model.UserType == UserTypeEnum.BDO) {
      divisionControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
      blockControl.setValidators([Validators.required]);
    }
    if (
      this.model.UserType == UserTypeEnum.ADM ||
      this.model.UserType == this.userTypes.MNSTR
    ) {
      designationControl.setValidators(null);
    }

    if (
      this.model.UserType == UserTypeEnum.CMOO ||
      this.model.UserType == this.userTypes.CMOS
    ) {
      groupControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
    }
    if (this.model.UserType == UserTypeEnum.COLL) {
      divisionControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }
    if (this.model.UserType == UserTypeEnum.DCOM) {
      divisionControl.setValidators([Validators.required]);
    }
    if (
      this.model.UserType == UserTypeEnum.DPTO ||
      this.model.UserType == UserTypeEnum.DPTS ||
      this.model.UserType == UserTypeEnum.TLO
    ) {
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
    }
    if (this.model.UserType == UserTypeEnum.TEHDR) {
      divisionControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
      tehsilControl.setValidators([Validators.required]);
    }
    if (this.model.UserType == this.userTypes.MNSTR) {
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
      designationControl.setValidators(null);
    }
    if (this.model.UserType == this.userTypes.MLAMP) {
      divisionControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
      parConstituancyControl.setValidators([Validators.required]);
      designationControl.setValidators(null);
    }
    if (this.model.UserType == UserTypeEnum.DLO) {
      // adminDepartmentControl.setValidators([Validators.required]);
      // departmentControl.setValidators([Validators.required]);
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }

    if (this.model.UserType == UserTypeEnum.DLS) {
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }

    if (this.model.UserType == UserTypeEnum.BLO) {
      departmentControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }

    adminDepartmentControl.updateValueAndValidity();
    groupControl.updateValueAndValidity();
    departmentControl.updateValueAndValidity();
    divisionControl.updateValueAndValidity();
    districtControl.updateValueAndValidity();
    blockControl.updateValueAndValidity();
    tehsilControl.updateValueAndValidity();
    parConstituancyControl.updateValueAndValidity();
    assConstituancyControl.updateValueAndValidity();
    designationControl.updateValueAndValidity();
  }

  getDownLevelUserType() {
    this._userTypeService
      .GetDownLevelUserType(this.loginData.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            const usertypes = <UserTypeModel[]>data.Data;
            usertypes.forEach((element) => {
              this.ddlUserType.push({
                Value: element.UserType,
                Text: element.UserTypeTitle,
              });
            });
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  getOfficeList(code) {
    if (code) {
      this._commonService.GetOfficeList(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList.ddlOffice = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  toggleAllSelection(event) {}


  openDepartmentDialog(){
    this._dialog.open(DepartmentListDialogComponent, {
        width: "800px",
        disableClose:true
      });
    }

  //#endregion
}
