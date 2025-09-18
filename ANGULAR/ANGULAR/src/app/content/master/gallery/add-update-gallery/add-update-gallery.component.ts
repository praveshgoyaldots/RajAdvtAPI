import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { GalleryModel, GalleryFileModel } from 'src/app/Shared/Model/Master/gallery.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { GalleryService } from 'src/app/Shared/Service/gallery.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { GalleryUploadType, FileType } from "src/app/Shared/Enum/scheme.enum";

@Component({
  selector: 'app-add-update-gallery',
  templateUrl: './add-update-gallery.component.html',
  styleUrls: ['./add-update-gallery.component.css']
})

export class AddUpdateGalleryComponent implements OnInit {

  ddlList: DDLModel;
  frmGrp: FormGroup;
  recordId: number = 0;
  loginUserId: number;
  fileValidationMsg: string;
  model: GalleryModel = new GalleryModel();
  tempFileList: GalleryFileModel[] = [];
  tempDeletedFileCodes: string[] = [];
  uploadType_URL = GalleryUploadType.URL;
  uploadType_Video = GalleryUploadType.Video;
  uploadType_Photo = GalleryUploadType.Photo;
  uploadType_PDF = GalleryUploadType.PDF;
  valid_FileType: string = FileType.Photo;
  thumbnailSizeValidationMsg: string;
  thumbnailValidationMsg: string;
  baseApiUrl: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _galleryService: GalleryService,
    private readonly _authService: AuthenticationService
  ) {
    this.GetDDLList();
    if (!isNullOrUndefined(this._route.snapshot.params.id)) {
      this.recordId = this._route.snapshot.params.id;
    }
    else {
      this.model.UploadType = GalleryUploadType.Photo;
    }
    this.model.Type = 'SCHEME';
    var pageHeading = (this.recordId == 0 ? "Add" : "Update") + " Photo / Vedio / Document :";
    this.appComponnet.setpagelayout(pageHeading, "keyboard_backspace", "Back To List", "master/gallery");
    var loginUserDetail = this._authService.GetCurrentUserDetail().UserViewModel;
    this.loginUserId = loginUserDetail.UserId;
    this.thumbnailSizeValidationMsg = "Size must be less than " + AppSetting.ThumbnailSize + " MB.";
    this.baseApiUrl = AppSetting.BaseApiUrl;
  }

  ngOnInit() {
    this.formGroupInit();
    if (this.recordId != 0) {
      this.getDetail();
      this.frmGrp.get('UploadType').disable();
    }
    else {
      this.resetUploadType();
    }
  }

  formGroupInit() {
    const urlRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
    this.frmGrp = this.fb.group({
      DepartmentCode: [null, Validators.required],
      TypeCode: [null, Validators.required],
      Caption: [null],
      UploadType: [null, Validators.required],
      Thumbnail: [null, (this.recordId == 0) ? Validators.required : null],
      // Url: [null, Validators.compose([Validators.required, Validators.pattern(urlRegExp)])],
      // MultipleAttachment: [null, Validators.required],
      Url: [null, Validators.pattern(urlRegExp)],
      MultipleAttachment: [null]
    });
  }

  get IsUploadTypeUrl(): boolean {
    return (this.model.UploadType == GalleryUploadType.URL
      || this.model.UploadType == GalleryUploadType.VIDEO_URL);
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.GalleryDropdownKeys).subscribe(
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

  GetSchemes() {
    if (!isNullOrUndefined(this.model.DepartmentCode)) {
      this._commonService.GetDDL(AppSetting.ddlSchemes, this.model.DepartmentCode).subscribe(
        data => {
          if (data.IsSuccess) {
            var ddl = <DDLModel>data.Data;
            this.ddlList.ddlSchemes = ddl.ddlSchemes;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
    else {
      this.ddlList.ddlSchemes = null;
    }
  }

  getDetail() {
    this._galleryService.Detail(this.recordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <GalleryModel>data.Data;
          this.model.ThumbnailViewLink = this.model.Thumbnail;  //isNullOrUndefined(this.model.Thumbnail) ? this.model.Thumbnail : this.baseApiUrl + this.model.Thumbnail;
          this.model.Thumbnail = undefined;
          this.model.DepartmentCode = this.model.DepartmentCode.toString();
          this.GetSchemes();
          this.model.TypeCode = this.model.TypeCode.toString();
          this.resetUploadType();
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      if (this.recordId == 0) {
        this.model.CreatedBy = this.loginUserId;
      }
      else {
        this.model.ModifiedBy = this.loginUserId;
      }
      this.model.GalleryFileList = this.tempFileList;
      this.model.DeletedFileCodes = this.tempDeletedFileCodes.toString();
      this._galleryService.AddUpdate(this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(this.recordId == 0 ? GlobalMessagesModel.saveSuccess : GlobalMessagesModel.updateSuccess);
              this._router.navigate(["master/gallery"]);
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

  handleFileInput(files: FileList) {
    this.tempFileList = [];
    this.fileValidationMsg = "";

    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match(this.valid_FileType)) {
        if (files.item(index).size < 5000000) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.tempFileList.push(new GalleryFileModel());
            this.tempFileList[index].FileName = <string>reader.result;
            this.tempFileList[index].FilePath = <string>reader.result;

            this.tempFileList[index].FileName = files[index].name;
            this.tempFileList[index].Extension = files[index].name.split(".")[1];
            this.tempFileList[index].FilePath = <string>reader.result;
          };
          reader.readAsDataURL(files[index]);
        }
        else {
          this.tempFileList = [];
          this.frmGrp.get("MultipleAttachment").setValue = undefined;
          this.frmGrp.get("MultipleAttachment").updateValueAndValidity();
          this.fileValidationMsg = "File size must be less than 5MB.";
          return;
        }
      }
      else {
        this.tempFileList = [];
        this.frmGrp.get("MultipleAttachment").setValue = undefined;
        this.frmGrp.get("MultipleAttachment").updateValueAndValidity();
        let fileType = (this.model.UploadType == GalleryUploadType.PDF) ? 'PDF' : this.valid_FileType;
        this.fileValidationMsg = "Only upload " + fileType + " files!";
        return;
      }
    }
  }

  handleThumbnailInput(event: any) {
    if (event.target.files.item(0).type.match('image/*')) {
      if (event.target.files.item(0).size > this._commonService.ConvertMbintoByte(Number(AppSetting.ThumbnailSize))) {
        this.thumbnailValidationMsg = this.thumbnailSizeValidationMsg;
        this._commonService.ScrollingTop();
      } else {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.Thumbnail = event.target.result;
          this.thumbnailValidationMsg = "";
        }
        reader.readAsDataURL(event.target.files.item(0));
      }
    } else {
      this.thumbnailValidationMsg = 'only *images file accepted!';
    }
  }

  deleteFile(documentCode: number, index: number) {
    this.tempDeletedFileCodes.push(documentCode.toString());
    this.model.GalleryFileList.splice(index, 1);
    this.resetUploadType();
  }

  resetUploadType() {
    if (this.model.UploadType == GalleryUploadType.URL || this.model.UploadType == GalleryUploadType.VIDEO_URL) {
      this.frmGrp.get("MultipleAttachment").setValidators(null);
      this.frmGrp.get("MultipleAttachment").updateValueAndValidity();

      const urlRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
      this.frmGrp.get("Url").setValidators([Validators.required, Validators.pattern(urlRegExp)]);
      //this.frmGrp.get("Url").setValidators([Validators.required]);
      this.frmGrp.get("Url").updateValueAndValidity();
    }
    else {
      this.frmGrp.get("Url").setValidators(null);
      this.frmGrp.get("Url").updateValueAndValidity();

      if (this.recordId == 0 || isNullOrUndefined(this.model.GalleryFileList) || (this.model.GalleryFileList != null && this.model.GalleryFileList.length == 0)) {
        this.frmGrp.get("MultipleAttachment").setValidators([Validators.required]);
        this.frmGrp.get("MultipleAttachment").updateValueAndValidity();
      }

      if (this.model.UploadType == GalleryUploadType.Photo) {
        this.valid_FileType = FileType.Photo;
      }
      else if (this.model.UploadType == GalleryUploadType.Video) {
        this.valid_FileType = FileType.Video;
      }
      else if (this.model.UploadType == GalleryUploadType.PDF) {
        this.valid_FileType = FileType.PDF;
      }
    }
  }

}

