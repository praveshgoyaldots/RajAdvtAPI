import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthenticationService } from "./../../../Shared/Service/authentication.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { NewspaperService } from "src/app/Shared/Service/newspaper.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NewspaperProgressMappingModel,
  NewspaperViewModal
} from "src/app/Shared/Model/newspaper-modal";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { Data } from "@angular/router";

@Component({
  selector: "app-news-progress-update",
  templateUrl: "./news-progress-update.component.html",
  styleUrls: ["./news-progress-update.component.css"]
})
export class NewsProgressUpdateComponent implements OnInit {
   //#region angular editor
   editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '1000px !important',
      minHeight: '300px',
      maxHeight: '0',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  //#endregion
  //#region << Variable >>

  formGroup: FormGroup;
  model: NewspaperProgressMappingModel;
  detailModel: NewspaperViewModal;
  dDLList: DDLModel;
  fileValidationMsgHowtoPay: string;
  fileSizeValidationMsg: string;
  ImagefileValidationMsg: string;
  isShow = true;

  //#endregion

  //#region << constructor >>

  constructor(
    public readonly _dialogRef: MatDialogRef<NewsProgressUpdateComponent>,
    private readonly _alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private readonly _newspaperService: NewspaperService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.model = new NewspaperProgressMappingModel();
    if (data && data.TransId) {
      this.model.NewspaperTransId = data.TransId;
      this.GetNewspaperShortDetailById(this.model.NewspaperTransId);
    }
    if (data && data.ProgrssId) {
      this.model.Id = data.ProgrssId;
      this.GetById();
    }
    this.fileSizeValidationMsg =
      "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.NewspaperUpdateNewsProgressDDLKey)
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

  GetNewspaperShortDetailById(id) {
    this._newspaperService.GetNewspaperShortDetailById(id).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.detailModel = <NewspaperViewModal>data.Data;
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
      if (this.model.Date) {
        const uTCDate = new Date(
          Date.UTC(
            new Date(this.model.Date).getFullYear(),
            new Date(this.model.Date).getMonth(),
            new Date(this.model.Date).getDate()
          )
        ).toISOString();
        this.model.Date = uTCDate;
      }
      if (this.model.Id > 0) {
        this._newspaperService.EditNewsProgress(this.model).subscribe(
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
        this._newspaperService.UpdateNewsProgress(this.model).subscribe(
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

  GetById() {
    this._newspaperService.GetNewsProgressById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <NewspaperProgressMappingModel>data.Data;
          if (this.model.EditionCode) {
            this.model.EditionCode = String(this.model.EditionCode);
          }
          if (this.model.NewspaperCode) {
            this.model.NewspaperCode = String(this.model.NewspaperCode);
          }
          if (this.model.PageNumberCode) {
            this.model.PageNumberCode = String(this.model.PageNumberCode);
          }
          if (this.model.PublicationTypeCode) {
            this.model.PublicationTypeCode = String(
              this.model.PublicationTypeCode
            );
          }
          if (this.model.NewsTypeCode) {
            this.model.NewsTypeCode = String(this.model.NewsTypeCode);
          }
          if (this.model.ClassificationCode) {
            this.model.ClassificationCode = String(
              this.model.ClassificationCode
            );
          }
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

  onNoClick(): void {
    this._dialogRef.close();
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      NewsHeadline: [null, Validators.required],
      PublicationTypeCode: [null],
      URL: [null],
      Caption: [null],
      NewspaperCode: [null, Validators.required],
      EditionCode: [null, Validators.required],
      PageNumberCode: [null],
      PDF: [null],
      NewsTypeCode: [null],
      ClassificationCode: [null],
      KeyPoint: [null],
      ActionRequiredIfAny: [null],
      Date: [null],
      IsVisibleToPublic: [null],
      CoverageTypes: [null],
      ImageFiles: [null],
      NewsContent: [null]
    });
  }

  handleFileForPdf(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.PDF = event.target.result;
          this.fileValidationMsgHowtoPay = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        this.fileValidationMsgHowtoPay = this.fileSizeValidationMsg;
      }
    } else {
      this.fileValidationMsgHowtoPay = "only pdf file accepted  ";
    }
  }

  RemovePDF() {
    this.model.PDF = null;
  }

  downloadOtherDocPdf(Url) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = "Docs";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();
  }

  handleImageFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match("image/*")) {
        if (
          files.item(index).size <
          this._commonService.ConvertMbintoByte(
            Number(localStorage.getItem("FileValidation"))
          )
        ) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.model.Images.push(<string>reader.result);
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.ImagefileValidationMsg = this.fileSizeValidationMsg;
        }
      } else {
        this.ImagefileValidationMsg = "only image/*";
        this.model.Images = [];
        return;
      }
    }
  }

  RemoveImageFile(i) {
    this.model.Images.splice(i, 1);
  }

  //#endregion
}
