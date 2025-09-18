import { LoginUserDepartmentListModel } from './../../../../Shared/Model/Master/department.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AppComponent } from 'src/app/app.component';
import { DepartmentService } from 'src/app/Shared/Service/department.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-department-user-profile-update',
  templateUrl: './department-user-profile-update.component.html',
  styleUrls: ['./department-user-profile-update.component.css']
})

export class DepartmentUserProfileUpdateComponent implements OnInit {

  formGroup: FormGroup;
  model: LoginUserDepartmentListModel;
  title: string;
  loginData: UserViewModel;
  dDLList: DDLModel;
  ImagefileValidationMsg: string;

  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentService: DepartmentService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _commonService: CommonService
  ) {
    this.model = new LoginUserDepartmentListModel();
    if (this._route.snapshot.params.id) {
      this.model.DepartmentId = this._route.snapshot.params.id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Department Website Details :",
        "keyboard_backspace",
        "Back To List",
        "master/departmentprofilelist"
      );
    }
  }

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForDepartmentMaster).subscribe(data => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  GetById() {
    this._departmentService.GetById(this.model.DepartmentId).subscribe(data => {
      if (data.IsSuccess) {
        this.model = <LoginUserDepartmentListModel>data.Data;
        if (!this.model.DefaultLanguage) {
          this.model.DefaultLanguage = 'hi';
        }
        if (this.model.CabinetMinisterCode) {
          this.model.CabinetMinisterCode = String(this.model.CabinetMinisterCode);
        }
        if (this.model.StateMinisterCode) {
          this.model.StateMinisterCode = String(this.model.StateMinisterCode);
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
      if (this.model.DepartmentId) {
        this._departmentService.UpdateLoginUserDepartment(this.model).subscribe(data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["master/departmentprofilelist"]);
          } else {
            this._alertService.error(data.Message);
          }
        }, error => {
          this._alertService.error(error.message);
        });
      }
    }
  }

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
      DepartmentTitle: [null],
      WebsiteName: [null, Validators.required],
      NodalOfficerName: [null, Validators.required],
      NodalOfficerDesignation: [null, Validators.required],
      MobileNo: [null, Validators.required],
      Email: [null],
      SSOID: [null],
      FacebookURL: [null, this.UrlValidator],
      TwitterURL: [null, this.UrlValidator],
      YoutubeURL: [null, this.UrlValidator],
      InstagramURL: [null, this.UrlValidator],
      DepartmentPassword: [null],
      StateMinisterCode: [null],
      CabinetMinisterCode: [null],
      WebsiteImage: [null],
      WebsiteDynamicCategory: [null],
      WebsiteDynamictransaction: [null],
      DefaultLanguage: [null],
    });
  }

  handleImageFileInput(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.WebsiteImage = event.target.result;
          this.ImagefileValidationMsg = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        this.ImagefileValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
      }
    } else {
      this.ImagefileValidationMsg = "only image/*";
    }
  }

  RemoveImageFile() {
    this.model.WebsiteImage = null;
  }

}
