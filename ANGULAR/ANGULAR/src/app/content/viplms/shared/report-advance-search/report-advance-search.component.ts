import { Component, Output, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ReportAdvanceSearchModel } from 'src/app/Shared/Model/VIPLMS/report-advance-search.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Service/Common/format-datepicker';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';

@Component({
  selector: 'app-report-advance-search',
  templateUrl: './report-advance-search.component.html',
  styleUrls: ['./report-advance-search.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class ReportAdvanceSearchComponent {
  @Output() outputModel = new EventEmitter<ReportAdvanceSearchModel>();
  model: ReportAdvanceSearchModel;
  dropdownList: DDLModel;

  constructor(private readonly _commonService: CommonService, private readonly _alertService: AlertService) {
    this.getDropdownList();
    this.resetAdvanceSearch();
  }

  ngOnInit() {
  }

  resetAdvanceSearch() {
    var defaultStartDate = AppSetting.DefaultStartDate;
    var defaultEndDate = AppSetting.DefaultEndDate;

    this.model = new ReportAdvanceSearchModel();
    this.model.EntryDateFrom = this.model.DepartmentActionDateFrom = this.model.CMOActionDateFrom = defaultStartDate;
    this.model.EntryDateTo = this.model.DepartmentActionDateTo = this.model.CMOActionDateTo = defaultEndDate;
    this.model.LetterType = this.model.ReferenceeType = this.model.haveAttachment = '';
  }

  getDropdownList() {
    this._commonService.GetAllDDL(AppSetting.VIPLMS_DDLKeyForReportAdvanceSearch).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dropdownList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  setSearchFilter() {
    this.outputModel.emit(this.model);
  }

}
