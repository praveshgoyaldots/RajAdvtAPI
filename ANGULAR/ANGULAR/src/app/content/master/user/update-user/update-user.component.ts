import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import {
  FilterDDlModel,
  DDLModel,
  DdlItemModel,
} from "src/app/Shared/Model/commonddl.model";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import {
  SSOUserModel,
  UserModel,
  UserViewModel,
  UserDistrictViewModel,
  UserDepartmentViewModel,
  UserTehsilViewModel,
  UserBlockViewModel,
} from "src/app/Shared/Model/user-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { UserService } from "src/app/Shared/Service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserTypeEnum } from "src/app/Shared/Enum/user-type.enum";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserTypeService } from "src/app/Shared/Service/user-type.service";
import { UserTypeModel } from "src/app/Shared/Model/user-type.model";
import { MatDialog } from '@angular/material';
import { DepartmentListDialogComponent } from '../department-list-dialog/department-list-dialog.component';

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent implements OnInit {
  //#region <<Variable>>
  RecordId: number;
  userTypes = UserTypeEnum;
  model: UserModel;
  IsExists: number = 0;
  responceModel: UserViewModel;
  loginUser: UserViewModel;
  SSOUserDetail: SSOUserModel;
  AdminDepartment: any;
  dDLList: DDLModel;
  filterDDlModel: FilterDDlModel[] = [];
  UserForm: FormGroup;
  oldSso: string;
  oldUserName: string;
  ddlUserType: DdlItemModel[] = [];
  fileSizeValidationMsg: string;
  fileValidationMsg: string;
  ddlDistrict: UserDistrictViewModel[];
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[] = [];
  ddlloginDepartment: DdlItemModel[];
  ddlTehsil: UserTehsilViewModel[] = [];
  ddlBlock: UserBlockViewModel[] = [];
  ddlBlockByDistrict: DdlItemModel[] = [];
  ddlTahsilByBlock: DdlItemModel[] = [];
  ddlDistricByOffice: DdlItemModel[] = [];
  ddlAdminDepartment: UserDepartmentViewModel[] = [];
  selectedAll = -1;
  selectedDptAll = -1;
  //#endregion

  //#region <<constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private readonly _userTypeService: UserTypeService,
    private readonly _authService: AuthenticationService,
    private readonly _dialog: MatDialog,
  ) {
    this.model = new UserModel();
    this.appComponnet.setpagelayout(
      "Update User :",
      "keyboard_backspace",
      "Back To List",
      "master/user"
    );
    this.RecordId = this._route.snapshot.params.id;
    this.dDLList = new DDLModel();
    this.getDDLList();
    this.loginUser = _authService.GetCurrentUserDetail().UserViewModel;
    this.fileSizeValidationMsg =
      "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";
  }
  //#endregion

  //#region <<Method>>
  ngOnInit() {

    this.formGroupInit();

    this.getBlockByDistrict(0);
    setTimeout(() => {
      this.getDownLevelUserType();
      this.getUserDetail();
    }, 500);
    this.getDistrictByoffice(0);
    this.getDepartment();
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }

  getDistrictByoffice(code) {
    this._commonService.GetDistrictByOffice(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDistricByOffice = <DdlItemModel[]>data.Data;
          if (
            this.ddlDistricByOffice != undefined &&
            this.ddlDistricByOffice.length > 0
          ) {
            this.model.District = String(this.ddlDistricByOffice[0].Value);
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }
  getDistrict() {
    this._userService.GetUserDistrict(this.loginUser.UserId).subscribe(
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

  getDDLList() {
    this._commonService
      .GetAllDDL(
        AppSetting.DDlKeyForUser,
        this.model.UserType,
        this.model.UserId
      )
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

  getUserDetail() {
    
    this._userService.Detail(this.RecordId).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.responceModel = <UserViewModel>data.Data;

          if (this.responceModel.DepartmentCodes) {
            this.responceModel.DepartmentCodes = String(
              this.responceModel.DepartmentCodes
            );
            this.getOfficeList(this.responceModel.DepartmentCodes,true);
          }
          // else {
          //   this.getDepartment();
          // }
          if (this.responceModel.AdminDepartmentCodes) {
            this.responceModel.AdminDepartmentCodes = String(
              this.responceModel.AdminDepartmentCodes
            );
            this.getDepartmentByadmDepartment(this.responceModel.AdminDepartmentCodes);
            //this.getFilterdDDL(this.responceModel.AdminDepartmentCodes,'ddlDepartment','ddlAdminDepartment');
          }

          if (this.responceModel.GroupCode) {
            this.responceModel.GroupCode = String(this.responceModel.GroupCode);
          }

          if (this.responceModel.DistrictCodes) {
            this.getDistrictByoffice(this.responceModel.OfficeCode);
            this.responceModel.DistrictCodes = String(
              this.responceModel.DistrictCodes
            );
          }
          if (this.responceModel.UserType == "BLO") {
            this.getTahsilByDistrict(
              this.responceModel.DistrictCodes != null
                ? this.responceModel.DistrictCodes
                : 0
            );
            this.getBlockByDistrict(
              this.responceModel.DistrictCodes != null
                ? this.responceModel.DistrictCodes
                : 0
            );
          }

          // this.getDistrict();
          this.fillUserDetail();
          this.setUserTypeValidators();
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    
    this.UserForm.markAllAsTouched();
    if (this.UserForm.valid) {
      if (this.IsExists == 0) {
        this.model.ModifiedBy = this.loginUser.UserId;
        this._userService.Edit(this.RecordId, this.model).subscribe(
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
                this._alertService.error(data.Message);
              }
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(GlobalMessagesModel.saveFaild);
            }
          },
          (error) => {
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
    if (Event.currentTarget.value != this.oldSso) {
      this._userService.UserSSOIDExist(Event.currentTarget.value).subscribe(
        (result) => {
          if (result.IsSuccess) {
            let SsoId = result.Data != null ? <boolean>result.Data : null;
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
  }

  IsExistUser(Event) {
    if (this.oldUserName != Event.currentTarget.value) {
      this._userService.UserNameExist(Event.currentTarget.value).subscribe(
        (result) => {
          if (result.IsSuccess) {
            let UserName = <boolean>result.Data;
            if (UserName == true) {
              this.model.UserName = null;
              this._alertService.error("User Name is already exist!");
            }
          }
        },
        (error) => {
          this._commonService.ScrollingTop();
          this._alertService.error(error.message);
        }
      );
    }
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
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
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

      item.Value= "[" + event + "]";
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
             // this.model.Department = null;
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
    //this.model.District = undefined;
    this.model.Tehsil = undefined;
    this.model.Block = undefined;
    this.model.Department = undefined;
    this.model.AssConstituancy = undefined;
    this.model.ParConstituancy = undefined;
    this.model.Group = undefined;
    this.setUserTypeValidators();
    this.getDDLList();
    this.getOfficeList(0);
    this.getDistrictList(0);
  }

  getOfficeList(code,isEdit=false) {
    
    if (code) {
      this._commonService.GetOfficeList(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            if(!isEdit)
            {this.model.OfficeCode=null;}
            this.dDLList.ddlOffice = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getDepartment() {

    this._userService.GetUserDepartment(this.loginUser.UserId).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
          let temp = <UserDepartmentViewModel[]>data.Data;
          if (!this.dDLList &&  !this.dDLList.ddlDepartment) {
            this.dDLList = new DDLModel();
          }
                    this.dDLList.ddlDepartment = this.ddlDepartment.map((val) => ({
                      Value: val.DepartmentCode,
                      Text: val.DepartmentTitle,
                    }));
console.log("this.dDLList.ddlDepartment"+ this.dDLList.ddlDepartment);
          // 
          // this.ddlDepartment = this.ddlDepartment.filter(
          //   (UserDepartmentViewModel, i, arr) =>
          //     arr.findIndex(
          //       (t) =>
          //         t.AdmDepartmentCode ===
          //         UserDepartmentViewModel.AdmDepartmentCode
          //     ) === i
          // );


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
          console.log("this.ddlAdminDepartment"+this.ddlAdminDepartment);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }
  getDistrictList(code) {
    if (code) {
      this._commonService.GetDistrictList(code).subscribe(
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
  getTahsilByDistrict(code) {
    this._commonService.GetTahsilByMultipleDistrict(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlTahsilByBlock = <DdlItemModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getBlockByDistrict(code) {
    this.getTahsilByDistrict(code);
    this._commonService.GetBlockByMultipleDistrict(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlBlockByDistrict = <DdlItemModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDownLevelUserType() {
    this._userTypeService
      .GetDownLevelUserType(this.loginUser.UserType)
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
      //  districtControl.setValidators([Validators.required]);
    }

    if (
      this.model.UserType == UserTypeEnum.CMOO ||
      this.model.UserType == this.userTypes.CMOS
    ) {
      groupControl.setValidators([Validators.required]);
      departmentControl.setValidators(null);
      districtControl.setValidators([Validators.required]);
    }
    if (this.model.UserType == UserTypeEnum.COLL) {
      divisionControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }

    if (this.model.UserType == UserTypeEnum.DLO) {
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }

    if (this.model.UserType == UserTypeEnum.DLS) {
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }

    if (this.model.UserType == UserTypeEnum.DCOM) {
      divisionControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
    }
    if (
      this.model.UserType == UserTypeEnum.DPTO ||
      this.model.UserType == UserTypeEnum.DPTS ||
      this.model.UserType == UserTypeEnum.TLO
    ) {
      adminDepartmentControl.setValidators([Validators.required]);
      departmentControl.setValidators([Validators.required]);
      districtControl.setValidators([Validators.required]);
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

  fillUserDetail() {
    this.model.UserId =
      this.responceModel.UserId == null
        ? this.RecordId
        : this.responceModel.UserId;
    this.model.UserType =
      this.responceModel.UserType == null
        ? undefined
        : this.responceModel.UserType;
    this.model.SSOID =
      this.responceModel.SSOID == null ? undefined : this.responceModel.SSOID;
    this.oldSso = this.model.SSOID;
    this.model.Title =
      this.responceModel.Title == null ? undefined : this.responceModel.Title;
    
      this.model.OfficeCode =
      this.responceModel.OfficeCode == null
        ? undefined
        : String(this.responceModel.OfficeCode);

    if (this.responceModel.OfficeCode != undefined) {
      this.getDistrictByoffice(this.responceModel.OfficeCode);
    }

    this.model.OfficeName =
      this.responceModel.OfficeName == null
        ? undefined
        : this.responceModel.OfficeName;
    this.model.UserName =
      this.responceModel.UserName == null
        ? undefined
        : this.responceModel.UserName;
    this.oldUserName = this.model.UserName;
    this.model.UserEmail =
      this.responceModel.UserEmail == null
        ? undefined
        : this.responceModel.UserEmail;
    this.model.Gender =
      this.responceModel.Gender == null
        ? undefined
        : this.responceModel.Gender.toUpperCase();
    this.model.Group =
      this.responceModel.GroupCode == null
        ? undefined
        : this.responceModel.GroupCode;
    this.model.LandlineNo =
      this.responceModel.LandlineNo == null
        ? undefined
        : this.responceModel.LandlineNo;
    this.model.IPNo =
      this.responceModel.IPNo == null ? undefined : this.responceModel.IPNo;
    this.model.Mobile =
      this.responceModel.Mobile == null ? undefined : this.responceModel.Mobile;
    this.model.Designation =
      this.responceModel.DesignationCode == null
        ? undefined
        : String(this.responceModel.DesignationCode);
    this.AdminDepartment =
      this.responceModel.AdminDepartmentCodes == null
        ? undefined
        : this.responceModel.AdminDepartmentCodes.split(",");
        
    this.model.Department =
      this.responceModel.DepartmentCodes == null
        ? undefined
        : this.responceModel.DepartmentCodes.split(",");
    this.model.Division =
      this.responceModel.DivisionCodes == null
        ? undefined
        : this.responceModel.DivisionCodes.split(",");
    // this.model.District =
    //   this.responceModel.DistrictCodes == null
    //     ? undefined
    //     : this.responceModel.DistrictCodes.split(",");

    this.model.District =
      this.responceModel.DistrictCodes == null
        ? undefined
        : this.responceModel.DistrictCodes;
    this.model.Block =
      this.responceModel.BlockCodes == null
        ? undefined
        : this.responceModel.BlockCodes.split(",");
    this.model.Tehsil =
      this.responceModel.TehsilCodes == null
        ? undefined
        : this.responceModel.TehsilCodes.split(",");
    this.model.ParConstituancy =
      this.responceModel.PCCodes == null
        ? undefined
        : this.responceModel.PCCodes.split(",");
    this.model.AssConstituancy =
      this.responceModel.ACCodes == null
        ? undefined
        : this.responceModel.ACCodes.split(",");
    this.model.ProfilePic =
      this.responceModel.ProfilePic == null
        ? undefined
        : this.responceModel.ProfilePic;
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size >
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        this.fileValidationMsg = this.fileSizeValidationMsg;
        this._commonService.ScrollingTop();
      } else {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.ProfilePic = event.target.result;
          this.fileValidationMsg = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      }
    } else {
      this.fileValidationMsg = "only *images file accepted!";
    }
  }

  openDepartmentDialog(){
  this._dialog.open(DepartmentListDialogComponent, {
      width: "800px",
      disableClose:true
    });
  }

  //#endregion
}
