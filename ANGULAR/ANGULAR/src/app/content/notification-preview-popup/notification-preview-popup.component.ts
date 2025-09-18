import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TemplateVerifyModel } from "src/app/Shared/Model/generate-order.model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import {
  NotificationModuleNameEnum,
  MessageTypeEnum
} from "src/app/Shared/Enum/order.enum";
import {
  NotificationFinalSubmissionModel,
  NotificationPreviewModel
} from "src/app/Shared/Model/general-model";

@Component({
  selector: "app-notification-preview-popup",
  templateUrl: "./notification-preview-popup.component.html",
  styleUrls: ["./notification-preview-popup.component.css"]
})
export class NotificationPreviewPopupComponent implements OnInit {
  notificationPreviewModel: NotificationPreviewModel;
  templateVerifyModel: TemplateVerifyModel;
  notificationModuleNameEnum = NotificationModuleNameEnum;
  messageTypeEnum = MessageTypeEnum;
  model: NotificationFinalSubmissionModel;
  errorMessage: string;
  constructor(
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    public dialogRef: MatDialogRef<NotificationPreviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.notificationPreviewModel = new NotificationPreviewModel();
    if (data) {
      
      this.templateVerifyModel = <TemplateVerifyModel>data;
      this.GetNotificationTemplete();
      this.model = new NotificationFinalSubmissionModel();
      this.model.NotificationType = this.templateVerifyModel.NotificationType;
    }
  }

  ngOnInit() {}

  GetNotificationTemplete() {
    
    this._commonService.VeriftTemplate(this.templateVerifyModel).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.notificationPreviewModel = <NotificationPreviewModel>data.Data;
          if (
            this.notificationModuleNameEnum.OrderGenerationNotification == 1
          ) {
          }
        }
      },
      error => {
        this.errorMessage=error.message;
        setTimeout(() => {
          this.errorMessage="";
        }, 5000);
      }
    );
  }

  selectAll(event) {
    
    if (
      (this.templateVerifyModel.NotificationType == this.messageTypeEnum.EmailType)
    ) {
      if (event.checked) {
        this.model.EmailList = this.notificationPreviewModel.DataList.Data.map(
          function(a) {
            if (a.Email1) {
              return a.Email1;
            }
          }
        );

        const list = this.notificationPreviewModel.DataList.Data.map(function(
          a
        ) {
          if (a.Email2) {
            return a.Email2;
          }
        });
        this.model.EmailList = this.model.EmailList.concat(list);
      } else {
        this.model.EmailList = [];
      }
    } else if (
      (this.templateVerifyModel.NotificationType == this.messageTypeEnum.SmsType)
    ) {
      if (event.checked) {
        this.model.MobileNumberList = this.notificationPreviewModel.DataList.Data.map(
          function(a) {
            if (a.MobileNumber1) {
              return a.MobileNumber1;
            }
          }
        );

        const list = this.notificationPreviewModel.DataList.Data.map(function(
          a
        ) {
          if (a.MobileNumber2) {
            return a.MobileNumber2;
          }
        });
        this.model.MobileNumberList = this.model.MobileNumberList.concat(list);
      } else {
        this.model.MobileNumberList = [];
      }
    }
  }

  selectItem(event, index) {
    
    if (
      (this.templateVerifyModel.NotificationType == this.messageTypeEnum.EmailType)
    ) {
      if (event.checked) {
        if (this.notificationPreviewModel.DataList.Data[index].Email1) {
          this.model.EmailList.push(
            this.notificationPreviewModel.DataList.Data[index].Email1
          );
        }
        if (this.notificationPreviewModel.DataList.Data[index].Email2) {
          this.model.EmailList.push(
            this.notificationPreviewModel.DataList.Data[index].Email2
          );
        }
      } else {
        this.model.EmailList = this.model.EmailList.filter(
          c => c !== this.notificationPreviewModel.DataList.Data[index].Email1
        );
        this.model.EmailList = this.model.EmailList.filter(
          c => c !== this.notificationPreviewModel.DataList.Data[index].Email2
        );
      }
    } else if (
      (this.templateVerifyModel.NotificationType == this.messageTypeEnum.SmsType)
    ) {
      if (event.checked) {
        if (this.notificationPreviewModel.DataList.Data[index].MobileNumber1) {
          this.model.MobileNumberList.push(
            this.notificationPreviewModel.DataList.Data[index].MobileNumber1
          );
        }
        if (this.notificationPreviewModel.DataList.Data[index].MobileNumber2) {
          this.model.MobileNumberList.push(
            this.notificationPreviewModel.DataList.Data[index].MobileNumber2
          );
        }
      } else {
        this.model.MobileNumberList = this.model.MobileNumberList.filter(
          c =>
            c !==
            this.notificationPreviewModel.DataList.Data[index].MobileNumber1
        );
        this.model.MobileNumberList = this.model.MobileNumberList.filter(
          c =>
            c !==
            this.notificationPreviewModel.DataList.Data[index].MobileNumber2
        );
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveClick(){
    
    if (this.templateVerifyModel.NotificationType == this.messageTypeEnum.SmsType) {
      if (this.model.MobileNumberList.length > 0) {
        this.model.Content = this.notificationPreviewModel.Content;
        this.SaveRecord();
      }else {
        this.errorMessage=GlobalMessagesModel.NotificationItemNotExist;
        setTimeout(() => {
          this.errorMessage="";
        }, 5000);
      }
    }else if (this.templateVerifyModel.NotificationType == this.messageTypeEnum.EmailType){
      if (this.model.EmailList.length > 0) {
      this.model.Content = this.notificationPreviewModel.Content;
      this.model.Subject = this.notificationPreviewModel.Subject;
      this.SaveRecord();
      }else {
        this.errorMessage=GlobalMessagesModel.NotificationItemNotExist;
        setTimeout(() => {
          this.errorMessage="";
        }, 5000);
      }
    }
  }

SaveRecord(){
  this._commonService.SendNotification(this.model).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.dialogRef.close();
        this._alertService.success(data.Message);
      }
    },
    error => {
      this.errorMessage=error.message;
      setTimeout(() => {
        this.errorMessage="";
      }, 5000);

    }
  );
}

}
