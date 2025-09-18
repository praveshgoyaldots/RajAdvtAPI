import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentContactDetailsModel, DepartmentWebsiteDetailsModel } from 'src/app/Shared/Model/Master/department-contact-details.model';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentContactDetailsService } from 'src/app/Shared/Service/dpt-contact-details.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { LookupService } from 'src/app/Shared/Service/lookup.service';
import { LookupModel } from 'src/app/Shared/Model/lookup.model';
import { LookupDataTypeEnum } from 'src/app/Shared/Enum/Common.enum';

@Component({
  selector: 'app-dpt-contact-details-add-update',
  templateUrl: './dpt-contact-details-add-update.component.html',
  styleUrls: ['./dpt-contact-details-add-update.component.css']
})

export class DptContactDetailsAddUpdateComponent implements OnInit {

  //#region <Variable>

  formGroup: FormGroup;
  model: DepartmentContactDetailsModel;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  ImagefileValidationMsg: string = "";
  readonly dataTypeEnum = LookupDataTypeEnum;
  selCatDataType: string = LookupDataTypeEnum.DATA;

  //#endregion <Variable>

  //#region <constructor>

  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentContactService: DepartmentContactDetailsService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    private readonly _lookupService: LookupService,
  ) {
    this.model = new DepartmentContactDetailsModel();
    if (this._route.snapshot.params.id) {
      this.model.Id = this._route.snapshot.params.id;
      this.GetById();
      this._parentApi.setpagelayout("Update Department Contact Details :", "keyboard_backspace", "Back To List", "master/dptcontactdetails");
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout("Add Department Contact Details :", "keyboard_backspace", "Back To List", "master/dptcontactdetails");
      this.title = "Add";
    }
  }

  //#endregion <constructor>

  //#region <Methods>

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }

  GetById() {
    this._departmentContactService.GetById(this.model.Id).subscribe(data => {
      if (data.IsSuccess) {
        this.model = <DepartmentContactDetailsModel>data.Data;
        this.getWebsite();
        if (this.model.DepartmentCode) {
          this.model.DepartmentCode = String(this.model.DepartmentCode);
        }
        if (this.model.ContactCategory) {
          this.model.ContactCategory = String(this.model.ContactCategory);
          this.GetContactCategoryDetail();
        }
        if (this.model.DesignationCode) {
          this.model.DesignationCode = String(this.model.DesignationCode);
        }
      } else {
        this._alertService.error(data.Message);
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  SaveClick() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this._departmentContactService.AddUpdate(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._router.navigate(["master/dptcontactdetails"]);
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
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

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      DepartmentCode: [null, Validators.required],
      DesignationCode: [null, null],
      OfficerName: [null, null],
      MobileNo: [null],//[null, Validators.required],
      Email: [null],
      SSOID: [null],
      IsVisibleOnFront: [null],
      WebsiteName: [null],
      ContactCategory: [null],
      Place: [null],
      Address: [null],
      AttachmentUrl: [null],
      Url: [null],
      DisplayOrderNo: [null, Validators.compose([Validators.required, Validators.maxLength(3)])],
    });
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DepartmentContactDetailsDDLKey).subscribe(data => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  getWebsite() {
    if (this.model.DepartmentCode) {
      this._departmentContactService.GetDepartmentByCode(Number(this.model.DepartmentCode)).subscribe(
        data => {
          if (data.IsSuccess) {
            const temp = <DepartmentWebsiteDetailsModel>data.Data;
            this.model.WebsiteName = temp.WebsiteName;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.model.WebsiteName = null;
    }
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.model.AttachmentUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.ImagefileValidationMsg = "";
    } else {
      this.ImagefileValidationMsg = "only accept PDF file ";
    }
  }

  Removepdf() {
    this.model.AttachmentUrl = undefined;
  }

  downloadMyFile(temp) {
    const link = document.createElement('a');
    link.setAttribute('href', temp);
    link.setAttribute('download', `Documents`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  GetContactCategoryDetail() {
    this.selCatDataType = this.dataTypeEnum.DATA;
    if (this.model.ContactCategory) {
      this._lookupService.GetById(this.model.ContactCategory).subscribe(data => {
        if (data.IsSuccess) {
          let record = <LookupModel>data.Data;
          if (record && record.Desc) {
            this.selCatDataType = record.Desc;
          }
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  //#endregion <Methods>
}
