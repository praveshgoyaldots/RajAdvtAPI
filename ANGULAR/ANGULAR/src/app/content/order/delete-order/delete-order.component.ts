import { Component, OnInit } from '@angular/core';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrderEntryModel, OrderRelatedToModel, OrderWithRelatedToViewModel } from 'src/app/Shared/Model/orderlist.model';

import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css'],
  providers: [OrderEntryService, CommonService]
})
export class DeleteOrderComponent implements OnInit {
  id: number;
  model: OrderEntryModel;
  RelatedToOrderParameterList: OrderRelatedToModel[] = [];
  documentUrlList: DocumentUrlModel[] = [];
  constructor(private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private _parentApi: AppComponent,
    private readonly _commonService: CommonService,
  ) {
    this._parentApi.setpagelayout("Delete Order :", "keyboard_backspace", "Back To List", "order");
    this.id = this._route.snapshot.params.id;
  }

  ngOnInit() {
    this.GetById();
  }


  GetById() {
    this._orderEntryService.GetByID(this.id).subscribe(
      data => {
        ;
        if (data.IsSuccess) {
          var temp = data.Data;
          temp = <OrderWithRelatedToViewModel>data.Data;
          this.model = <OrderEntryModel>temp.OrderMasterData;
          this.model.RelatedToOrderParameterList = this.RelatedToOrderParameterList;

          if (this.model.MediaUrlList) {
            this.documentUrlList = this.model.MediaUrlList;
          }
          if (temp.RelatedToData.length > 0) {
            temp.RelatedToData.forEach(element => {

              var temp = new OrderRelatedToModel();
              temp.DepartmentId = element.DepartmentId;
              temp.ModuleName = element.ModuleName;
              temp.DepartmentName = element.DepartmentName;
              temp.ModuleId = element.ModuleId;
              temp.YearText = element.YearText;
              temp.YearValue = element.YearValue;
              temp.Id = element.Id;
              temp.RelatedToResult.filenumber = element.filenumber;
              temp.RelatedToResult.modulename = element.modulename;
              temp.RelatedToResult.parano = element.parano;
              temp.RelatedToResult.pm_projecthdrid = element.pm_projecthdrid;
              temp.RelatedToResult.prj_dept = element.prj_dept;
              temp.RelatedToResult.prj_description = element.prj_description;
              temp.RelatedToResult.prj_ndept = element.prj_ndept;
              temp.RelatedToResult.prj_year = element.pprj_year;
              temp.RelatedToResult.rowno = element.rowno;

              this.model.RelatedToOrderParameterList.push(temp);
            });
          }


        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  downloadPdf(Url, name) {
    
        const linkSource = Url;
        const downloadLink = document.createElement("a");
        const fileName = name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();

      }



  OnDelete() {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._orderEntryService.DeleteOrder(this.id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this._alertService.success(data.Message);
              this._router.navigate(["order"]);
            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });
  }
}
