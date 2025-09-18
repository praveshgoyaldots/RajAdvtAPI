import { Component, OnInit } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { OrderEntryModel, OrderRelatedToModel, OrderWithRelatedToViewModel } from 'src/app/Shared/Model/orderlist.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { ColumnHeaderModel, DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
  providers: [OrderEntryService]
})
export class DetailOrderComponent implements OnInit {
  model: OrderEntryModel;
  id: number;
  RelatedToOrderParameterList: OrderRelatedToModel[] = [];
  documentUrlList: DocumentUrlModel[] = [];
  constructor(private _parentApi: AppComponent,
    private readonly _orderEntryService: OrderEntryService,
    private readonly _route: ActivatedRoute,
    private readonly _alertService: AlertService, ) {
    this._parentApi.setpagelayout("Government Detail :", "keyboard_backspace", "Back To List", "order");
    this.id = this._route.snapshot.params.id;

  }

  ngOnInit() {
    this.GetById();
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


}
