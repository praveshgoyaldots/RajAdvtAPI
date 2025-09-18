import { SchemeUploadFileCategoryService } from './../../../Shared/Service/scheme-upload-file-category.service';
import { Component, OnInit } from '@angular/core';
import {
  AdvertisementEditModel,
  AdvertisementRedesignRequestIdModel,
  RedesignDetailModel
} from 'src/app/Shared/Model/advertisement.model';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { RedesignRequestModel } from 'src/app/Shared/Model/redesignrequest.model';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-redesign-request-by-platform-user',
  templateUrl: './redesign-request-by-platform-user.component.html',
  styleUrls: ['./redesign-request-by-platform-user.component.css']
})
export class RedesignRequestByPlatformUserComponent implements OnInit {
  resultModel: RedesignDetailModel;
  model: RedesignRequestModel;
  detailModel: AdvertisementEditModel;
  documentUrlList: DocumentUrlModel[] = [];
  isUpload = false;
  fileValidationMsg: string;
  imageValidation = new FormControl('', [Validators.required]);
  idModel: AdvertisementRedesignRequestIdModel;
  constructor(
    private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent
  ) {
    const ids = String(this._route.snapshot.params.id).split(',');

    this.idModel = new AdvertisementRedesignRequestIdModel();
    this.idModel.AdvId = Number(ids[0]);
    this.idModel.RedesignId = Number(ids[1]);
    this._parentApi.setpagelayout(
      'Redesign request By User :',
      'keyboard_backspace',
      'Back to List',
      '/advertisement/advforadmindepartmentuserdepartment'
    );
    this.model = new RedesignRequestModel();
    this.model.RedesignPlatformUserLookupId = Number(ids[1]);
  }

  ngOnInit() {
    this.OnDataGetById();
  }

  OnDataGetById() {
    this._advertisementService
      .GetRedesignDetailForAdmin(this.idModel)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this.resultModel = <RedesignDetailModel>data.Data;
            this.detailModel = this.resultModel.AdvertisementList;

            if (this.resultModel.RequestImageList) {
              this.documentUrlList = this.resultModel.RequestImageList;
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

  handleFileInput(files: FileList) {
    this.isUpload = true;
    while (this.documentUrlList.findIndex(item => item.IsNew === true) >= 0) {
      this.documentUrlList.find(item => item.IsNew === true).IsNew = false;
    }

    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match('image/*')) {
        if (files.item(index).size < 5000000) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            let temp = new DocumentUrlModel();

            temp.Url = <string>reader.result;
            temp.IsNew = true;
            temp.Extension = files[index].name.split('.')[1];
            if (temp.Extension == 'pdf') {
              temp.DisplayName = files[index].name;
            }
            this.documentUrlList.push(temp);
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.fileValidationMsg = 'File size must be less than 5MB...!';
          return;
        }
      } else {
        this.fileValidationMsg = 'only image/*';
        return;
      }
    }

    this.fileValidationMsg = '';
    this.model.File = files;
  }

  Saveclick() {
    this.imageValidation.markAllAsTouched();

    // // stop here if form is invalid
    if (this.imageValidation.valid && this.isUpload) {
      this._advertisementService
        .RedesignRequestByPlatformUser(this.model)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this.isUpload = false;
              this.OnDataGetById();
              this._alertService.success(data.Message);
            } else {
           this.documentUrlList.splice(this.documentUrlList.length-1, 1);
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
