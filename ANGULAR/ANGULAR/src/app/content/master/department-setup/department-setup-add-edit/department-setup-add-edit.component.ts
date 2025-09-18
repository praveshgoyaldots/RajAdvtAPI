import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentSetupModel } from 'src/app/Shared/Model/Master/department-setup.model';
import { AppComponent } from 'src/app/app.component';
import { DepartmentSetupService } from 'src/app/Shared/Service/dpt-setup.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-department-setup-add-edit',
  templateUrl: './department-setup-add-edit.component.html',
  styleUrls: ['./department-setup-add-edit.component.css']
})
export class DepartmentSetupAddEditComponent implements OnInit {
  formGroup: FormGroup;
  model: DepartmentSetupModel;
  title:string;
  fileValidationMsgLogo1:string;
  fileValidationMsgLogo2:string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  public defaultColors: string[] = [ '#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', '#b7d5c4', '#bcd6e7', '#7c90c1', '#9d8594', '#dad0d8', '#4b4fce', '#4e0a77', '#a367b5',
    '#ee3e6d', '#d63d62', '#c6a670', '#f46600', '#cf0500', '#efabbd', '#8e0622', '#f0b89a', '#f0ca68', '#62382f', '#c97545', '#c1800b'];
  fileSizeValidationMsg: string;
  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentSetupService: DepartmentSetupService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
  ) {
    this.model = new DepartmentSetupModel();
    this.model.IsAutoEmail = false;
    this.model.IsAutoSMS = false;
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id=id;
      this.GetById();
      this._parentApi.setpagelayout("Update Department Setup :", "keyboard_backspace", "Back To List", "master/departmentsetup");
      this.title="Update";

    } else {
      this._parentApi.setpagelayout("Add Department Setup :", "keyboard_backspace", "Back To List", "master/departmentsetup");
      this.title="Add";
    }
    this.fileSizeValidationMsg="Attachment must be less than "+   localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DptSetupDDLKey).subscribe(
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


GetById(){
  this._departmentSetupService.GetById(this.model.Id)
          .subscribe(
            data => {
              if (data.IsSuccess) {
            this.model=<DepartmentSetupModel>data.Data;
            if (this.model.DepartmentCode) {
              this.model.DepartmentCode=String(this.model.DepartmentCode);
            }  if (this.model.OfficeCode) {
              this.model.OfficeCode=String(this.model.OfficeCode);
            }
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
        this._departmentSetupService.Edit(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/departmentsetup"]);
              } else {
                this._alertService.error(data.Message);
              }
            },
            error => {
              this._alertService.error(error.message);
            }
          );
      } else {
        this._departmentSetupService.Add(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/departmentsetup"]);
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

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.model.Logo1 = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsgLogo1="";
    }else{
      this.fileValidationMsgLogo1=this.fileSizeValidationMsg;
    }
    } else {
      this.fileValidationMsgLogo1 = "only *images file accepted ";
    }
  }
  handleFileInputLogo2(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.model.Logo2 = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsgLogo2="";
    }else{
      this.fileValidationMsgLogo2=this.fileSizeValidationMsg;
    }
    } else {
      this.fileValidationMsgLogo2 = "only *images file accepted ";
    }
  }

// Validates Url
UrlValidator(url): any {
  if (url.pristine) {
    return null;
  }
  const URL_REGEXP = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
  url.markAsTouched();
  if (URL_REGEXP.test(url.value)) {
    return null;
  }
  return {
    invalidUrl: true
  };
}

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      Address1: [null, Validators.required],
      AddressHindi1: [null],
      Address2: [null],
      AddressHindi2: [null],
      Address3: [null],
      AddressHindi3: [null],
      FooterLine1: [null, Validators.required],
      FooterLineHindi1: [null],
      FooterLine2: [null],
      FooterLineHindi2: [null],
      Logo1: [null],
      Logo2: [null],
      DepartmentCode: [null, Validators.required],
      OfficeCode: [null, Validators.required],
      FileSize: [null],
      FacebookUrl: [null,this.UrlValidator],
      Twitter: [null,this.UrlValidator],
      Youtube: [null,this.UrlValidator],
      Backgroundcolor: [null],
      IsAutoEmail: [null],
      IsAutoSMS: [null],
      SerialNumber: [null]
    });
  }

  setColor(data){
    
this.model.Backgroundcolor=data;
  }

  RemoveLogo(){
    this.model.Logo1 = null;
  }

  RemoveLogo1(){
    this.model.Logo2 = null;
  }
}
