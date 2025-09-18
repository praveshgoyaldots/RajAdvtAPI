import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { ChiefMinisterProfilePostModel } from 'src/app/Shared/Model/Master/chief-minister-profile.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { ChiefMinisterProfileService } from 'src/app/Shared/Service/chief-minister-profile.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-add-update-chief-minister-profile',
  templateUrl: './add-update-chief-minister-profile.component.html',
  styleUrls: ['./add-update-chief-minister-profile.component.css']
})
export class AddUpdateChiefMinisterProfileComponent implements OnInit {


  //#region <<Variable>>
  ddlList: DDLModel;
  frmGrp: FormGroup;
  model: ChiefMinisterProfilePostModel;
  recordId: number = 0;
  loginUserId: number;
  fileValidationMsg: string;
  //valid_FileType: string = FileType.Photo;
  PhotoSizeValidationMsg: string = "Size must be less than 3 MB.";
  PhotoValidationMsg: string;
  valid_MinWidth: number = 100;
  valid_MinHeight: number = 100;
  // valid_MinWidth: number = 400;//Change by Designer
  // valid_MinHeight: number = 400;//Change by Designer
  valid_MaxWidth: number = 800;
  valid_MaxHeight: number = 1200;
  //#endregion

  //#region <<Constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _chiefMinisterProfileService: ChiefMinisterProfileService,
    private readonly _authService: AuthenticationService
  ) {
    this.GetDDLList();
    this.model = new ChiefMinisterProfilePostModel();
    if (!isNullOrUndefined(this._route.snapshot.params.id)) {
      this.recordId = this._route.snapshot.params.id;
    }


    var pageHeading = (this.recordId == 0 ? "Add" : "Update") + " CM Profile :";
    this.appComponnet.setpagelayout(pageHeading, "keyboard_backspace", "Back To List", "master/chief-minister-profile");
    var loginUserDetail = this._authService.GetCurrentUserDetail().UserViewModel;
    this.loginUserId = loginUserDetail.UserId;

  }
  //#endregion

  ngOnInit() {
    this.formGroupInit();

    if (this.recordId != 0) {
      this.getDetail();
    }

  }

  formGroupInit() {

    this.frmGrp = this.fb.group({
      DesignationCode: [null, Validators.required],
   //   TitleCode: [null, Validators.required],
   TitleCode: [null,null],

      Name: [null, Validators.required],
      NameHindi: [null, Validators.required],
      Message: [undefined, Validators.maxLength(4000)],
      MessageHindi: [undefined, Validators.maxLength(4000)],
      Photo: ["", null],
      PathUrl: [null,this.UrlValidator]
    });
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

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLkeyForCMProfile).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.ddlList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  getDetail() {
    this._chiefMinisterProfileService.GetById(this.recordId).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <ChiefMinisterProfilePostModel>data.Data;
          this.model.DesignationCode = String(this.model.DesignationCode);
          this.model.TitleCode = String(this.model.TitleCode);

        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    
    if (this.model.PhotoPath && this.model.PhotoPath.length > 0) {
      const photoControl = this.frmGrp.get("Photo");
      photoControl.clearValidators(); // or clearValidators()
      photoControl.updateValueAndValidity();
    }
    else {
      const photoControl = this.frmGrp.get("Photo");
      photoControl.setValidators([Validators.required]);
      photoControl.updateValueAndValidity();
    }
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      if (this.recordId == 0) {
        this.model.CreatedBy = this.loginUserId;
      }
      else {
        this.model.ModifiedBy = this.loginUserId;
      }

      this._chiefMinisterProfileService.AddUpdate(this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(this.recordId == 0 ? GlobalMessagesModel.saveSuccess : GlobalMessagesModel.updateSuccess);
              this._router.navigate(["master/chief-minister-profile"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(this.recordId == 0 ? GlobalMessagesModel.saveError : GlobalMessagesModel.updateError);
            }
          } else {
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        },
        error => {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.InternalError);
        }
      );
    }
  }



  handlePhotoInput(event: any) {
    
    this.PhotoValidationMsg = ""
    if (event.target.files.item(0).type.match('image/*')) {
      if (event.target.files.item(0).size > this._commonService.ConvertMbintoByte(Number(3))) {
        this.PhotoValidationMsg = this.PhotoSizeValidationMsg;
        this.model.PhotoPath = undefined;
        this._commonService.ScrollingTop();
      }

      else {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          let img = new Image();
          img.src = <string>reader.result;
          img.onload = () => {
            
            let imgWidth = img.width, imgHeight = img.height;

            // Image dimension validation.
            if (imgHeight <= this.valid_MinHeight && imgWidth <= this.valid_MinWidth) {

              this.PhotoValidationMsg = "Image must have minimum " + this.valid_MinHeight + "X" +
                this.valid_MinWidth + "px (H*W).";
              this.model.PhotoPath = undefined;
            }
            else if (imgWidth >= this.valid_MaxWidth) {
              this.PhotoValidationMsg = "Image width not more then " + this.valid_MaxWidth + "px.";
              this.model.PhotoPath = undefined;
            }
            else {
              this.model.PhotoPath = <string>reader.result;
              this.PhotoValidationMsg = "";

            }
          };


        }
        reader.readAsDataURL(event.target.files.item(0));
      }
    } else {
      this.PhotoValidationMsg = 'only *images file accepted!';
    }
  }

}
