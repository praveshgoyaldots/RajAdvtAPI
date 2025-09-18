import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CitizenLetterTypeModel } from 'src/app/Shared/Model/Master/citizen-letter-type.model';
import { CitizenLetterTypeService } from 'src/app/Shared/Service/citizen-letter-type.service';

@Component({
  selector: 'app-detail-letter-type',
  templateUrl: './detail-letter-type.component.html',
  styleUrls: ['./detail-letter-type.component.css']
})

export class DetailLetterTypeComponent implements OnInit {
  model: CitizenLetterTypeModel;
  RecordId: number;
  constructor(
    private readonly _appComponent: AppComponent,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _letterTypeService: CitizenLetterTypeService,
    private readonly _alertService: AlertService
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this.model = new CitizenLetterTypeModel();
    this._appComponent.setpagelayout(
      "Letter Type Detail :",
      "keyboard_backspace",
      "Back To List",
      "master/citizen-letter-type"
    );
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this._letterTypeService.Detail(this.RecordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <CitizenLetterTypeModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

}
