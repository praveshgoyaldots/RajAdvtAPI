import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GroupByData } from '../../statistical-report/statistical-report.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ReportService } from 'src/app/Shared/Service/lms/report.service';
import { DdlItemModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-statistical-report-groupby',
  templateUrl: './statistical-report-groupby.component.html',
  styleUrls: ['./statistical-report-groupby.component.css']
})

export class StatisticalReportGroupbyComponent implements OnInit {
  groupByList: DdlItemModel[] = [];

  constructor(private readonly _reportService: ReportService, private readonly _alertService: AlertService,
    public dialogRef: MatDialogRef<StatisticalReportGroupbyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupByData = null
  ) { }

  ngOnInit() {
    this.groupByList = this._reportService.GetStatisticalReportGroupList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
