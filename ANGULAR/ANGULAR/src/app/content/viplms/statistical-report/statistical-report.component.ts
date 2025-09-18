import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ReportAdvanceSearchModel } from 'src/app/Shared/Model/VIPLMS/report-advance-search.model';

@Component({
  selector: 'app-statistical-report',
  templateUrl: './statistical-report.component.html',
  styleUrls: ['./statistical-report.component.css']
})

export class StatisticalReportComponent implements OnInit {
  reportAdvanceSearchModel: ReportAdvanceSearchModel;
  reportName: string = "Letter Type";

  constructor(private readonly _appComponet: AppComponent) {
    this._appComponet.setpagelayout("Statistical Report", "keyboard_backspace", "Back to Reports", "/viplms/reports");
  }

  ngOnInit() {
  }

  getRecord(event) {
    this.reportAdvanceSearchModel = event;
  }

}
