import { Component, OnInit, Inject } from '@angular/core';
import { ComplaintActionModel } from 'src/app/Shared/Model/complaint.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router, Event } from '@angular/router';
import { DDLModel, DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { ComplaintService } from 'src/app/Shared/Service/complaint.service';

@Component({
  selector: 'app-compliant-action-dialog',
  templateUrl: './compliant-action-dialog.component.html',
  styleUrls: ['./compliant-action-dialog.component.css']
})
export class CompliantActionDialogComponent implements OnInit {

//#region   Variable
	frmGrp: FormGroup;
dDLList: DDLModel;
//Status = new FormControl('', [Validators.required]);
//Comment = new FormControl('', [Validators.required]);
//ttachment = new FormControl('', null);
model:ComplaintActionModel;
fileValidationMsg: string;
documentUrlList: DocumentUrlModel[] = [];
	editorConfig = AppSetting.editorConfig as AngularEditorConfig;
//#endregion

  constructor(
  private readonly fb: FormBuilder,
    public _dialogRef: MatDialogRef<CompliantActionDialogComponent>,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _complaintService: ComplaintService
  ) {
    this.model = new ComplaintActionModel();
    if(data){
      this.model.ComplaintEntryId = data;
     }
  }

  ngOnInit() {
					 this.formGroupInit()
    this.GetDDLList();
  }
//#region  method
formGroupInit() {

    this.frmGrp = this.fb.group({
      Status: [null, Validators.required],
      Comment: [null, Validators.required],
      Attachment: [null, null],

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


  onNoClick(): void {
    this._dialogRef.close();
  }

  Saveclick() {
    
  //  this.Status.markAsTouched();
  //  this.Comment.markAsTouched();
  //  this.Attachment.markAsTouched();
 //   if (this.Status.valid && this.Comment.valid && this.Attachment.valid) {

		 this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
        this._complaintService.AddAction(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            
            this._alertService.success(data.Message);
            this._dialogRef.close(true);
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


  // handleFileInput(files: FileList) {
  
  //   let count = 0;
  //   if (this.documentUrlList.length > 0) {
  //     count = this.documentUrlList.length;
  //   }
  //   // this.documentUrlList = [];
  //   // this.model.AttachmentList = [];
  //   for (let index = 0; index < files.length; index++) {

  //     if (files.item(index).type.match('application/pdf|image/jpeg')) {
  //       if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
  //         const reader = new FileReader();

  //         reader.onload = (e: any) => {
  //           this.documentUrlList.push(new DocumentUrlModel());

  //           this.documentUrlList[index + count].Url = <string>reader.result;
  //           this.documentUrlList[index + count].Extension = (files[index].name.split('.'))[1];
  //           if (this.documentUrlList[index + count].Extension === 'pdf') {
  //             this.documentUrlList[index + count].DisplayName = files[index].name;
  //           }

  //           this.model.AttachmentsUrl.push(new ComplaintAttachmentModel());
  //           // this.model.AttachmentList[index].AttachmentsUrl = files[index].name;
  //           this.model.AttachmentList[index + count].AttachmentsUrl = <string>reader.result;
  //         };
  //         reader.readAsDataURL(files[index]);
  //       } else {
  //         this.documentUrlList = [];
  //         this.model.AttachmentList = [];
  //         // this.fileValidationMsg = this.fileSizeValidationMsg;
  //         return;
  //       }

  //     } else {
  //       this.fileValidationMsg = 'only *pdf';
  //       this.documentUrlList = [];
  //       this.model.AttachmentList = [];
  //       return;
  //     }

  //   }

  //   this.fileValidationMsg = '';
  //   // this.model.File = files;

  // }



  handleFileInput(files) {
    
    if (files.item(0).type.match('application/pdf|image/jpeg|image/png')) {
      if (files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.model.AttachmentURL =  event.target.result;
            this.model.Extension = (files.item(0).name.split('.'))[1];
        };
        reader.readAsDataURL(files.item(0));
      }
    } else {
        this.fileValidationMsg = "only pdf/Image file accepted  ";
      }
    }



  download(URL) {
    const linkSource = URL;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
   // downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }


  RemoveImageFile() {
    
        this.model.AttachmentURL = null;
        this.model.Extension = null;
       // this.Imeges.slice(i, 1);
      }


  //#endregion


}
