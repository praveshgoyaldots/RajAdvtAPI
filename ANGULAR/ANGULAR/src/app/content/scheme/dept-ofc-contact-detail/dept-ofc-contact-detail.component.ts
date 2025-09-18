import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemResponseModel } from 'src/app/Shared/Model/scheme-model';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { DepartmentContactOfficerModel } from 'src/app/Shared/Model/Master/department-contact-details.model';
import { DepartmentContactDetailsService } from 'src/app/Shared/Service/dpt-contact-details.service';

@Component({
  selector: 'app-dept-ofc-contact-detail',
  templateUrl: './dept-ofc-contact-detail.component.html',
  styleUrls: ['./dept-ofc-contact-detail.component.css']
})
export class DeptOfcContactDetailComponent implements OnInit {

  RecordId: number;
  model: DepartmentContactOfficerModel[];
  constructor(
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _departmentContactDetailsService: DepartmentContactDetailsService,
    private _router: Router,
    private _route: ActivatedRoute,
    public readonly _dialogRef: MatDialogRef<DeptOfcContactDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      if (data) {
        this.RecordId = data;
      }

   }

  ngOnInit() {
    this.GetById(this.RecordId);
  }


  GetById(id) {
    
    this._departmentContactDetailsService.GetDepartmentOfficerByDepartment(id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <DepartmentContactOfficerModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
}
