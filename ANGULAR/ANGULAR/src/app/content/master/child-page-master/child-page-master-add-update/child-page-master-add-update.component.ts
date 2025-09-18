import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ChildPageMasterModel, PageMasterDetailModel } from "src/app/Shared/Model/Master/child-page-master.model";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { ChildPageMasterService } from "src/app/Shared/Service/child-page-master.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { ChildPageMasterPageCodeEnum } from 'src/app/Shared/Enum/child-page-master.enum';
import { ManualTypeEnum } from 'src/app/Shared/Enum/Common.enum';

@Component({
  selector: "app-child-page-master-add-update",
  templateUrl: "./child-page-master-add-update.component.html",
  styleUrls: ["./child-page-master-add-update.component.css"]
})

export class ChildPageMasterAddUpdateComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: '100px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    // defaultFontName: 'Mangal',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'Mangal', name: 'Mangal' }
    ],
    sanitize: true,
    toolbarPosition: 'top',
  };

  formGroup: FormGroup;
  title: string;
  dDLList: DDLModel;
  ddlPageMasterDetails: DdlItemModel[] = [];
  pageDetailModel: PageMasterDetailModel;
  fileValidationMsgHowtoPay: string;
  fileSizeValidationMsg: string;
  ImagefileValidationMsg: string;
  model: ChildPageMasterModel = new ChildPageMasterModel();
  childPageMasterPageCodeEnum = ChildPageMasterPageCodeEnum;
  readonly manualType = ManualTypeEnum;

  constructor(
    private _parentApi: AppComponent,
    private readonly _childPageMasterService: ChildPageMasterService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _commonService: CommonService
  ) {
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout("Child Page Master Update:", "keyboard_backspace", "Back To List", "master/childpagemaster");
      this.title = "Update";
    }
    else {
      this.model.ManualTypeCode = String(this.manualType.UserManual_Val);
      this._parentApi.setpagelayout("Child Page Master Add:", "keyboard_backspace", "Back To List", "master/childpagemaster");
      this.title = "Add";
    }
    this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ChildPageMasterDDLKey).subscribe(data => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;

        //let ddl = <DDLModel>data.Data;
        // this.dDLList.ddlPageType = ddl.ddlPageType;
        // this.dDLList.ddlLookUpType = ddl.ddlLookUpType;
        // this.dDLList.ddlCommonMaster = ddl.ddlCommonMaster;
        // this.dDLList.ddlApplicationType = ddl.ddlApplicationType;
        // this.dDLList.ddlManualType = ddl.ddlManualType;
        // this.dDLList.ddlChildPageDescriptionCategory = ddl.ddlChildPageDescriptionCategory;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  getPageByPageType(code) {
    this._commonService.GetPageMasterByPageTypeCode(Number(code), '').subscribe(data => {
      if (data.IsSuccess) {
        this.ddlPageMasterDetails = <DdlItemModel[]>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  getPageDetail(code) {
    if (code) {
      this._childPageMasterService.GetPageDetailByPageCode(code).subscribe(data => {
        if (data.IsSuccess) {
          this.pageDetailModel = <PageMasterDetailModel>data.Data;
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  GetById() {
    this._childPageMasterService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <ChildPageMasterModel>data.Data;
          if (this.model.PageCode) {
            this.model.PageCode = String(this.model.PageCode);
            this.getPageDetail(this.model.PageCode);
          }
          if (this.model.PageDescriptionCategory) {
            this.model.PageDescriptionCategory = String(this.model.PageDescriptionCategory);
          }
          if (this.model.PageTypeCode) {
            this.getPageByPageType(this.model.PageTypeCode);
            this.model.PageTypeCode = String(this.model.PageTypeCode);
          }
          if (this.model.LookupTypeId) {
            this.model.LookupTypeId = String(this.model.LookupTypeId);
          }
          if (this.model.SchemeTypeCode) {
            this.model.SchemeTypeCode = String(this.model.SchemeTypeCode);
          }
          if (this.model.ManualTypeCode) {
            this.model.ManualTypeCode = String(this.model.ManualTypeCode);
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
        this._childPageMasterService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/childpagemaster"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._childPageMasterService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/childpagemaster"]);
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
      PageCode: [null, Validators.required],
      PageDescriptionCategory: [null, Validators.required],
      Description: [null, Validators.required],
      PDFURL: [null],
      ImageURL: [null],
      PageTypeCode: [null],
      LookupTypeId: [null],
      SchemeTypeCode: [null],
      Url: [undefined, Validators.compose([Validators.maxLength(1000), this.UrlValidator])],
      ManualTypeCode: [null]
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
          this.model.PDFURL = event.target.result;
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
    this.model.PDFURL = null;
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

  handleImageFileInput(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.ImageURL = event.target.result;
          this.ImagefileValidationMsg = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        this.ImagefileValidationMsg = this.fileSizeValidationMsg;
      }
    } else {
      this.ImagefileValidationMsg = "only image/*";
    }
  }

  RemoveImageFile() {
    this.model.ImageURL = null;
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

}
