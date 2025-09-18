import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AdvertisementEditModel, Advertisement } from 'src/app/Shared/Model/advertisement.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';

import { AppComponent } from 'src/app/app.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.css'],
  //providers: [CommonService],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class UpdateAdvertisementComponent implements OnInit {

  id: number;
  model: Advertisement;
  advmodel: AdvertisementEditModel;
  dDLList: DDLModel;
  Districts: any[] = [];
  fileValidationMsg: string;
  fileValidationMsg1: string;
  bannerForm: FormGroup;
  prevUrl: string;
  minDate = new Date();
  fileSizeValidationMsg: string;

  constructor(private _route: ActivatedRoute,
    private readonly _advertisementService: AdvertisementService,
    private _router: Router,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private _parentApi: AppComponent) {
    this.id = this._route.snapshot.params.id;
    this.GetDDLList();
    this.model = new Advertisement();
    this._parentApi.setpagelayout("Update Advertisement :", "keyboard_backspace", "Back to list", "advertisement/");
    this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.GetById(this.id);
  }

  GetById(id) {

    this._advertisementService.GetById(id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.advmodel = <AdvertisementEditModel>data.Data;
          this.model = <Advertisement>data.Data;
          if (data.Data.Category) {
            this.model.Category = String(data.Data.Category);
          }
          if (this.advmodel.SubCategory) {
            this.model.SubCategory = String(this.advmodel.SubCategory);
          }

          if (this.advmodel.BeneficiaryCategories) {
            this.model.BeneficiaryCategories = this.advmodel.BeneficiaryCategories.split(',');
          }
          if (this.advmodel.DistrictIds) {
            this.model.Districts = this.advmodel.DistrictIds.split(',');
          }
          if (this.advmodel.AdminDepartments) {
            this.model.AdminDepartment = this.advmodel.AdminDepartments.split(',');
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  downloadMyFile(temp) {

    const link = document.createElement('a');
    link.setAttribute('href', temp);
    link.setAttribute('download', `Documents`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // handleFileInput(event: any) {
  //   if (event.target.files.item(0).type.match('image/*')) {

  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.model.DocumentUrl = event.target.result;
  //     }
  //     reader.readAsDataURL(event.target.files.item(0));
  //     this.fileValidationMsg = "";
  //     this.model.File = event.target.files.item(0);
  //   }
  //   else {
  //     this.fileValidationMsg = "only *images file accepted ";
  //   }
  // }


  handleFileInput(event: any, ispdf: boolean = false) {
    if (ispdf) {
      if (event.target.files.item(0).type.match("application/pdf")) {
        if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.model.PdfUrl = event.target.result;
          };
          reader.readAsDataURL(event.target.files.item(0));
          this.fileValidationMsg1 = "";
          this.model.File = event.target.files.item(0);
        } else {
          this.fileValidationMsg1 = this.fileSizeValidationMsg;
        }
      } else {
        this.fileValidationMsg1 = "only *pdf file accepted ";
      }
    } else {
      if (event.target.files.item(0).type.match("image/*")) {
        if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(0.2))) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.model.DocumentUrl = event.target.result;
          };
          reader.readAsDataURL(event.target.files.item(0));
          this.fileValidationMsg = "";
          this.model.File = event.target.files.item(0);
        } else {
          this.fileValidationMsg = "Attachment must be less than 200 KB";
        }
      } else {
        this.fileValidationMsg = "only *images file accepted ";
      }
    }
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForAdvertisement).subscribe(
      data => {
        this.dDLList = <DDLModel>data.Data;
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    const prevDate = this.model.AdvDate;
    const prevExpDate = this.model.ExpiryDate;
    if (this.model.AdvDate) {
      this.model.AdvDate = this.model.AdvDate.toLocaleString();
    }

    if (this.model.ExpiryDate) {
      this.model.ExpiryDate = this.model.ExpiryDate.toLocaleString();
    }
    this._advertisementService.AddAdvertisement(this.model).subscribe(data => {
      console.log(data);
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this.model = new Advertisement();
        this._router.navigate(['advertisement/']);
      } 
      else {
        this.model.AdvDate = prevDate;
        this.model.ExpiryDate = prevExpDate;
        this._alertService.error(data.Message);
        console.error(data.Exception);
      }
    }, error => {
      console.log(error);
      this.model.AdvDate = prevDate;
      this.model.ExpiryDate = prevExpDate;
      this._alertService.error(error.message);
    });


  }

  Numberonly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  RemoveImage() {
    this.model.DocumentUrl = null;
  }

  RemovePdf() {
    this.model.PdfUrl = null;
  }

}
