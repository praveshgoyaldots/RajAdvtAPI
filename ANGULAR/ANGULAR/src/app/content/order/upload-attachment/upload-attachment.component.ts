import { OrderEntryModel } from "./../../../Shared/Model/orderlist.model";
import { Component, OnInit } from "@angular/core";
import {
  UploadAttachmentModel,
  OrderAttachmentModel,

} from "src/app/Shared/Model/orderlist.model";
import { Validators, FormControl } from "@angular/forms";
import { OrderEntryService } from "src/app/Shared/Service/orderentry.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  DDLModel,
  DocumentUrlModel
} from "src/app/Shared/Model/commonddl.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-upload-attachment",
  templateUrl: "./upload-attachment.component.html",
  styleUrls: ["./upload-attachment.component.css"]
})
export class UploadAttachmentComponent implements OnInit {
  model: UploadAttachmentModel;
  dDLList: DDLModel;
  fileValidationMsg: string;
  uploadId: number;
  newmodel: OrderEntryModel;
  documentUrlList: DocumentUrlModel[] = [];
  file = new FormControl("", [Validators.required]);
  orderId = new FormControl("", [Validators.required]);
  tempDocumentUrlList: DocumentUrlModel[] = [];
  fileSizeValidationMsg: string;
  constructor(
    private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private readonly _route: ActivatedRoute
  ) {
    
    this._parentApi.setpagelayout("Upload Order Attachment :", "", "", "");
    this.model = new UploadAttachmentModel();
    this.uploadId = this._route.snapshot.params.id;
    this.model.OrderId = String(this.uploadId);
    this.fileSizeValidationMsg="Attachment must be less than "+   localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.getDDLList();
    if (this.model.OrderId) {
      this.GetById();
    }

  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyUploadAttachment).subscribe(
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

  handleFileInput(files: FileList) {
    this.tempDocumentUrlList = [];
    this.model.AttachmentList = [];
    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match("application/pdf")) {
        if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.tempDocumentUrlList.push(new DocumentUrlModel());
            this.tempDocumentUrlList[index].Url = <string>reader.result;
            this.tempDocumentUrlList[index].Extension = files[index].name.split(
              "."
            )[1];
            if (this.tempDocumentUrlList[index].Extension === "pdf") {
              this.tempDocumentUrlList[index].DisplayName = files[index].name;
            }
            this.model.AttachmentList.push(new OrderAttachmentModel());
            this.model.AttachmentList[index].AttachmentsName =
              files[index].name;
            this.model.AttachmentList[index].Path = <string>reader.result;
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.model.AttachmentList = [];
          this.fileValidationMsg = this.fileSizeValidationMsg;
          return;
        }
      } else {
        this.model.AttachmentList = [];
        this.fileValidationMsg = "only *pdf";
        return;
      }
    }
    this.documentUrlList = [];
    this.model.AttachmentList = [];
    this.documentUrlList = this.tempDocumentUrlList;
    this.fileValidationMsg = "";
    // this.model.File = files;
  }


  saveclick() {
    this.file.markAsTouched();
    this.orderId.markAsTouched();
    // // stop here if form is invalid
    if (this.file.valid && this.orderId.valid) {
      this._orderEntryService.UploadAttachment(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          this._alertService.error(error.error.ExceptionMessage);
        }
      );
    }
  }

  GetById() {
    
    this._orderEntryService.GetByID(this.uploadId).subscribe(
      data => {
        if (data.IsSuccess) {
          
          var temp = data.Data;
          this.newmodel = <OrderEntryModel>data.Data.OrderMasterData;
          this.documentUrlList= this.newmodel.MediaUrlList;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
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

}
