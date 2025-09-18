import { NotificationTemplateTypeModel } from './../../../../Shared/Model/Master/notificationtemplatetype.model';
import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationTemplateTypeService } from 'src/app/Shared/Service/notification-template-type.service';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css']
})
export class AddEditDialogComponent implements OnInit {

  model: NotificationTemplateTypeModel;

  constructor(
    private readonly _alertService: AlertService,
    private _router: Router,
    public _dialogRef: MatDialogRef<AddEditDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _notificationTemplateTypeService: NotificationTemplateTypeService,
     @Inject(MAT_DIALOG_DATA) public data: any) {
      this.model = new NotificationTemplateTypeModel();
    if (data) {
      this.model.Id = data;
      this.GetById();
    }


  }

  ngOnInit() {
  }


  GetById() {
    this._notificationTemplateTypeService.GetById(this.model.Id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <NotificationTemplateTypeModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {

    if (this.model.Id) {

      this._notificationTemplateTypeService.Edit(this.model).subscribe(data => {
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

  onNoClick(): void {
    this._dialogRef.close();
  }
}
