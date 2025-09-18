import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonService } from "src/app/Shared/Service/common.service";
import { Component, OnInit } from "@angular/core";
import { GovermentAchivementModel } from "src/app/Shared/Model/Master/GovermentAchivement.Model";
import { GovermentAchivementService } from "src/app/Shared/Service/goverment-achivement.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: "app-add-update-goverment-achivement",
  templateUrl: "./add-update-goverment-achivement.component.html",
  styleUrls: ["./add-update-goverment-achivement.component.css"]
})
export class AddUpdateGovermentAchivementComponent implements OnInit {
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
  model: GovermentAchivementModel;

  // ImagesUrl = new FormControl("", [Validators.required]);
  // Departmenttitle = new FormControl("", [Validators.required]);
  ImagesUrl = new FormControl("", null); //TODO
  Departmenttitle = new FormControl("", null); //TODO

  UploadAttachment = new FormControl("", null);
  // Description1 = new FormControl("", [Validators.required]);
  Description1 = new FormControl("", null); //TODO

  fileValidationMsgImage:string;
  fileValidationMsgPdf:string;
  fileSizeValidationMsg: string;
  id: number;
  dDLList: DDLModel;
  constructor(
    private readonly _govermentAchivementService: GovermentAchivementService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private _router: Router,
    private readonly _route: ActivatedRoute,
  ) {
    this.model = new GovermentAchivementModel();
    this.model.DetailText = '';

    this.id = this._route.snapshot.params.id;
    
    if (this.id) {
      this._parentApi.setpagelayout("Update Goverment Achivement :", "keyboard_backspace", "Back to List", "master/GenerateAchivement")
      
      this.GetById();
    }else{
      this._parentApi.setpagelayout("Create Goverment Achivement :", "keyboard_backspace", "Back to List", "master/GenerateAchivement");
    }
    this.fileSizeValidationMsg="Attachment must be less than "+   localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.GetDDLList();
  }


  GetById() {
    this._govermentAchivementService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <GovermentAchivementModel>data.Data;
        }
      },
      error => {
        this.model = new GovermentAchivementModel();
        this._alertService.error(error.message);
      }
    );
  }

  downloadMyFile(temp) {
    
    const link = document.createElement("a");
    link.setAttribute("href", temp);
    link.setAttribute("download", `Documents`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  handleFileInput(event: any, ispdf: boolean = false) {
    
    if (ispdf) {
      if (event.target.files.item(0).type.match("application/pdf")) {
        if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.UploadAttachment = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.fileValidationMsgPdf = "";
        this.model.UploadAttachment = event.target.files.item(0);
      }else{
        this.fileValidationMsgPdf=this.fileSizeValidationMsg;
      }
      } else {
        this.fileValidationMsgPdf = "only *pdf file accepted ";
      }
    } else {
      if (event.target.files.item(0).type.match("image/*")) {
        if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.ImageUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.fileValidationMsgImage = "";
        this.model.ImageUrl = event.target.files.item(0);
      }else{
        this.fileValidationMsgImage=this.fileSizeValidationMsg;
      }
      } else {
        this.fileValidationMsgImage = "only *images file accepted ";
      }
    }
  }

  saveClick() {
    
    this.ImagesUrl.markAsTouched();
    this.Departmenttitle.markAsTouched();
    this.Description1.markAsTouched();
    if (
      this.Departmenttitle.valid &&
      this.Description1.valid
    ) {
      if (this.model.Id > 0) {
        if (

          this.Departmenttitle.valid &&
          this.Description1.valid
        ) {
          this._govermentAchivementService.Edit(this.model).subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/GenerateAchivement"]);
              } else {
                this._alertService.error(data.Message);
              }
            },
            error => {
              this._alertService.error(error.error.ExceptionMessage);
            }
          );
          this.ImagesUrl.markAsUntouched();
          this.Departmenttitle.markAsUntouched();
          this.Description1.markAsUntouched();
        }
      } else {
        this._govermentAchivementService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/GenerateAchivement"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    }
  }


  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForAdvertisement).subscribe(
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

  RemoveImage(){
    this.model.ImageUrl = null;
  }

  RemovePdf(){
    this.model.UploadAttachment = null;
  }
}
