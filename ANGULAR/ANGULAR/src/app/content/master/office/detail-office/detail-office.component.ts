import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { OfficeService } from "src/app/Shared/Service/office.service";
import { OfficeModel } from "src/app/Shared/Model/office-model.model";
import { AlertService } from "src/app/Shared/Service/alert.service";

@Component({
  selector: "app-detail-office",
  templateUrl: "./detail-office.component.html",
  styleUrls: ["./detail-office.component.css"],
})
export class DetailOfficeComponent implements OnInit {
  model: OfficeModel;
  RecordId: number;
  constructor(
    private readonly _appComponent: AppComponent,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _officeService: OfficeService,
    private readonly _alertService: AlertService
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this.model = new OfficeModel();
    this._appComponent.setpagelayout(
      "Office Detail :",
      "keyboard_backspace",
      "Back To List",
      "master/office"
    );
  }

  ngOnInit() {
    this.getOfficeDetail();
  }

  getOfficeDetail() {
    
    this._officeService.Detail(this.RecordId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <OfficeModel>data.Data;
          this.model.AdmDepartmentCode = String(data.Data.AdmDepartmentCode);
          this.model.DepartmentCode = String(data.Data.DepartmentCode);
          this.model.DistrictCode = String(data.Data.DistrictCode);
          this.model.TehsilCode = String(data.Data.TehsilCode);
          this.model.BlockCode = String(data.Data.BlockCode);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }
}
