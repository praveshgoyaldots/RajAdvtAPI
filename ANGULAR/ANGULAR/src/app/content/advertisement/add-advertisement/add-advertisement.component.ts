import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Advertisement } from "src/app/Shared/Model/advertisement.model";
import { AdvertisementService } from "src/app/Shared/Service/advertisement.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: "app-add-advertisement",
  templateUrl: "./add-advertisement.component.html",
  styleUrls: ["./add-advertisement.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AddAdvertisementComponent implements OnInit {
  model: Advertisement;
  fileValidationMsg: string;
  fileValidationMsg1:string;
  dDLList: DDLModel;
  minDate = new Date();
  fileSizeValidationMsg: string;
  constructor(
    private readonly _alertService: AlertService,
    private _router: Router,
    private readonly _advertismentService: AdvertisementService,
    private readonly _commonService: CommonService,
    private _parentApi: AppComponent
  ) {
    this.model = new Advertisement();
    this._parentApi.setpagelayout(
      "Add Advertisement :",
      "keyboard_backspace",
      "Back to List",
      "advertisement/"
    );
    this.fileSizeValidationMsg="Attachment must be less than "+   localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.GetDDLList();
  }

  downloadMyFile(temp){
    
    const link = document.createElement('a');
    link.setAttribute('href',temp);
    link.setAttribute('download', `Documents`);
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
          this.model.PdfUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.fileValidationMsg1 = "";
        this.model.File = event.target.files.item(0);
      }else{
        this.fileValidationMsg1=this.fileSizeValidationMsg;
      }
      } else {
        this.fileValidationMsg1 = "only *pdf file accepted ";
      }
    } else {
      if (event.target.files.item(0).type.match("image/*")) {
        if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(0.1)) ) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.DocumentUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.fileValidationMsg = "";
        this.model.File = event.target.files.item(0);
      }else{
        this.fileValidationMsg="Attachment must be less than 100 KB";
      }
      } else {
        this.fileValidationMsg = "only *images file accepted ";
      }
    }
  }

  SaveClick() {
    
    let prevDate = this.model.AdvDate;
    let prevExpDate = this.model.ExpiryDate;
    if (this.model.AdvDate) {
      this.model.AdvDate = this.model.AdvDate.toLocaleString();
    }

    if (this.model.ExpiryDate) {
      this.model.ExpiryDate = this.model.ExpiryDate.toLocaleString();
    }

    this._advertismentService.AddAdvertisement(this.model).subscribe(
      data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this.model = new Advertisement();
          this._router.navigate(["advertisement/"]);
        } else {
          this.model.AdvDate = prevDate;
          this.model.ExpiryDate = prevExpDate;
          this._alertService.error(data.Message);
        }
      },
      error => {
        console.log(error);
        this.model.AdvDate = prevDate;
        this.model.ExpiryDate = prevExpDate;
        this._alertService.error(error.message);
      }
    );
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

  Numberonly(event): boolean {
    return this._commonService.numberOnly(event);
  }

  RemoveImage(){
    this.model.DocumentUrl = null;
  }

  RemovePdf(){
    this.model.PdfUrl = null;
  }
}
