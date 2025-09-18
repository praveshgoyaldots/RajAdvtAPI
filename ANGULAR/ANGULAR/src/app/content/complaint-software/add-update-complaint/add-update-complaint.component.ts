import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { MatDialog } from "@angular/material";
import { DDLModel, DocumentUrlModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { ComplaintListModel, ComplaintAttachmentModel } from 'src/app/Shared/Model/complaint.model';
import { ComplaintService } from 'src/app/Shared/Service/complaint.service';

@Component({
  selector: "app-add-update-complaint",
  templateUrl: "./add-update-complaint.component.html",
  styleUrls: ["./add-update-complaint.component.css"]
})
export class AddUpdateComplaintComponent implements OnInit {
  //#region   Variable
  frmGrp: FormGroup;
  dDLList: DDLModel;
  model: ComplaintListModel;
  ddlPageMasterDetails: DdlItemModel[]=[];
  title:string;
  documentUrlList: DocumentUrlModel[] = [];
  //Description = new FormControl('', [Validators.required]);
  fileValidationMsg: string;
  //ApplicationCode = new FormControl('', [Validators.required]);
  //PageCode = new FormControl('', [Validators.required]);
  //ScreenURL = new FormControl('', [Validators.required]);
  //#endregion
  editorConfig = AppSetting.editorConfig as AngularEditorConfig;
  constructor(private readonly fb: FormBuilder,
    private _parentApi: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _complaintService: ComplaintService
  ) {
    this._parentApi.setpagelayout('Add Suggestion-Feedback  :', 'keyboard_backspace', "Back To List", "compliant");
    this.model = new ComplaintListModel();
  }
  //#region Method
  ngOnInit() {
    this.formGroupInit();
    this.GetDDLList();
  }

  formGroupInit() {
    const reg = '(?:http(s)?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.frmGrp = this.fb.group({
      Description: [null, Validators.required],
      EntryTypeId: [null, Validators.required],
      PriorityId: [null, Validators.required],
      ApplicationCode: [null, Validators.required],
      PageCode: [null, Validators.required],
      ScreenURL: [null, [Validators.required, Validators.pattern(reg)]]
    });
  }
  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.GenerateComplaintDDLKey).subscribe(
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

  getPageByPageType(applicationCode='') {
    this._commonService.GetPageMasterByPageTypeCode(0, applicationCode).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlPageMasterDetails = <DdlItemModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  // Save complaint method

  Saveclick() {
    this.frmGrp.markAllAsTouched();




    if (this.frmGrp.valid) {

        this._complaintService.Add(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(['compliant']);
          } else {

            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => {
          this._commonService.ScrollingTop();
          console.log(error);
          this._alertService.error(error.error.ExceptionMessage);
        }
      );
    }
  }


  handleFileInput(files: FileList) {
    let count = 0;
    if (this.documentUrlList.length > 0) {
      count = this.documentUrlList.length;
    }
    // this.documentUrlList = [];
    // this.model.AttachmentList = [];
    for (let index = 0; index < files.length; index++) {

      if (files.item(index).type.match('application/pdf|image/jpeg|image/png')) {
        if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.documentUrlList.push(new DocumentUrlModel());

            this.documentUrlList[index + count].Url = <string>reader.result;
            //  this.documentUrlList[index + count].Extension = (files[index].name.split('.'))[1];
            this.documentUrlList[index + count].Extension = (files[index].type.split('/'))[1];
            // if (this.documentUrlList[index + count].Extension === 'pdf') {
            //if (this.documentUrlList[index + count].Extension.toLowerCase() === 'pdf') {
            if (this.documentUrlList[index + count].Extension.includes('pdf')) {
              this.documentUrlList[index + count].DisplayName = files[index].name;
            }
            //console.log(this.documentUrlList)
            this.model.AttachmentList.push(new ComplaintAttachmentModel());
            // this.model.AttachmentList[index].AttachmentsUrl = files[index].name;
            this.model.AttachmentList[index + count].AttachmentsUrl = <string>reader.result;
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.documentUrlList = [];
          this.model.AttachmentList = [];
          // this.fileValidationMsg = this.fileSizeValidationMsg;
          return;
        }

      } else {
        this.fileValidationMsg = 'only *pdf';
        this.documentUrlList = [];
        this.model.AttachmentList = [];
        return;
      }

    }

    this.fileValidationMsg = '';
    // this.model.File = files;

  }


  downloadPdf(Url, name) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }


  RemoveImageFile(i) {
        this.documentUrlList.splice(i, 1);
       // this.Imeges.slice(i, 1);
      }


  //#endregion
}
