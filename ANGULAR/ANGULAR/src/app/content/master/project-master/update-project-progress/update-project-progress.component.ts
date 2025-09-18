import { ProjectMasterService } from 'src/app/Shared/Service/project-master.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ProjectUpdateProgressMappingModel, ProjectMasterShorDetailModel } from 'src/app/Shared/Model/Master/project-master-model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ProjectMileStoneService } from 'src/app/Shared/Service/project-mile-stone.service';
import { ProjectMileStoneMasterModel } from 'src/app/Shared/Model/Master/project-mile-stone.model';

@Component({
  selector: 'app-update-project-progress',
  templateUrl: './update-project-progress.component.html',
  styleUrls: ['./update-project-progress.component.css']
})
export class UpdateProjectProgressComponent implements OnInit {
//#region <Variable>

projectModel: ProjectMasterShorDetailModel;
model: ProjectUpdateProgressMappingModel;
mileStoneModel: ProjectMileStoneMasterModel;
dDLList: DDLModel;
fileValidationMsgHowtoPay: string;
fileSizeValidationMsg: string;
ImagefileValidationMsg: string;
title = "Add";
MileStoneCode = new FormControl('', [Validators.required]);
StatusCode = new FormControl('', [Validators.required]);

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<UpdateProjectProgressComponent>,
  private readonly _alertService: AlertService,
  private readonly _projectMasterService: ProjectMasterService,
  private readonly _projectMileStoneService: ProjectMileStoneService,
  private readonly _commonService: CommonService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  this.model = new ProjectUpdateProgressMappingModel();
  if (data) {
    this.model.ProjectId = data;
    this.GetById();
  }
  this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";

  if (data && data.progressID) {
    this.model.Id = data.progressID;
    this.GetByprojectProgressId();//sub
    this.title = "Update";
  } else {
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.GetDDLList();
}

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.ProjectUpdateProgressDDLKey).subscribe(
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

GetMilestoneByMilestoneCode(code) {
  if (code) {
    this._projectMileStoneService.GetMilestoneByMilestoneCode(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.mileStoneModel = <ProjectMileStoneMasterModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }
}

GetById() {
  this._projectMasterService.GetProjectShtDetailById(this.model.ProjectId).subscribe(
    data => {
      if (data.IsSuccess) {
        this.projectModel = <ProjectMasterShorDetailModel>data.Data;
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

GetByprojectProgressId() {
  this._projectMasterService.GetByprojectProgressId(this.model.Id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.model = <ProjectUpdateProgressMappingModel>data.Data;
        if (this.model.MileStoneCode) {
          this.model.MileStoneCode = String(this.model.MileStoneCode);
        }
        if (this.model.StatusCode) {
          this.model.StatusCode = String(this.model.StatusCode);
        }
        this.GetById();
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
  
  this.MileStoneCode.markAsTouched();
  this.StatusCode.markAsTouched();
  if (this.MileStoneCode.valid && this.StatusCode.valid) {
    if (this.model.Date) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.model.Date).getFullYear(),
          new Date(this.model.Date).getMonth(),
          new Date(this.model.Date).getDate()
        )
      ).toISOString();
      this.model.Date = uTCDate;
    }
    if (this.model.Id) {
      this._projectMasterService.EditUpdateProgress(this.model).subscribe(
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
      this._projectMasterService.UpdateProgress(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this._dialogRef.close(true);
      } else {
        this._alertService.error(data.Message);
      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }

  }
}

onNoClick(): void {
  this._dialogRef.close();
}


handleFileForPdf(event: any) {

  if (event.target.files.item(0).type.match('application/pdf')) {
    if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
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
  const fileName = 'Docs';

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.target = "blank";
  downloadLink.click();

}

handleImageFileInput(files: FileList) {
  for (let index = 0; index < files.length; index++) {
    if (files.item(index).type.match("image/*")) {
      if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
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

//#endregion <Method>

}
