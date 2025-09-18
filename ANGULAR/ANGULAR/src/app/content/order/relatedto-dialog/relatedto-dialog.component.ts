import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { ResponseServiceModel, ResponseListModel, ResponseDialogModel, RequestDialogModel } from 'src/app/Shared/Model/service.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ConnectWithCMISFilterModel, IndexModel, ConnectWithCMISListModel } from 'src/app/Shared/Model/general-model';
import { OrderRelatedToModelResult } from 'src/app/Shared/Model/orderlist.model';


@Component({
  selector: 'app-relatedto-dialog',
  templateUrl: './relatedto-dialog.component.html',
  styleUrls: ['./relatedto-dialog.component.css'],
  providers:[CommonService]
})

export class RelatedtoDialogComponent implements OnInit {

  responseReqModel: ConnectWithCMISFilterModel;
  responseListModel: ConnectWithCMISListModel[] = [];
  isRecord:boolean;
  dataSource :any;

  displayedColumns: string[] = [
    "index",
    "Para_No",
    "Announcement_Description",
    "File_Number",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Para_No", Text: "Para No" },
    { Value: "Announcement_Description", Text: "Description" },
    { Value: "File_Number", Text: "File Number" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  responseDialogModel:ResponseDialogModel;

  indexModel: IndexModel;

  constructor(    public _dialogRef: MatDialogRef<RelatedtoDialogComponent>,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.indexModel = new IndexModel();
    if (data) {
      this.responseReqModel = <ConnectWithCMISFilterModel>data;
      this.GetResultByParameterList();
    }

   }

  ngOnInit() {

  }

  GetResultByParameterList() {
    this._commonService.GetConnectWithCMISData(this.responseReqModel).subscribe(
      data => {
               if (data.IsSuccess) {
          if (data.Data.length>0) {
            this.isRecord=false;
            this.responseListModel= <ConnectWithCMISListModel[]>data.Data;
            this.dataSource = new MatTableDataSource<any>(this.responseListModel);
            this.dataSource.paginator = this.paginator;
          }else{
            this.isRecord=true;
          }
        }

      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  RelatedToSelectResult(data){
    const temp=data as ConnectWithCMISListModel
    this.responseDialogModel = new ResponseDialogModel();
    this.responseDialogModel.index = this.responseReqModel.Index;
    this.responseDialogModel.resultModel=new OrderRelatedToModelResult();
    this.responseDialogModel.resultModel.CMISNewTransCoreId = temp.CMISNewTransCoreId;
    this.responseDialogModel.resultModel.filenumber = temp.File_Number;
    this.responseDialogModel.resultModel.parano = temp.Para_No;
    this.responseDialogModel.resultModel.modulename = this.responseReqModel.ModuleName;
    this.responseDialogModel.resultModel.prj_description = temp.Announcement_Description;
    this.responseDialogModel.resultModel.prj_ndept=this.responseReqModel.DepartmentName;
    this.responseDialogModel.resultModel.prj_year=this.responseReqModel.YearText;
    this.responseDialogModel.resultModel.prj_dept = String(this.responseReqModel.Department);
    this._dialogRef.close(this.responseDialogModel);
  }


  onNoClick(): void {
    this._dialogRef.close();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
  }

}
