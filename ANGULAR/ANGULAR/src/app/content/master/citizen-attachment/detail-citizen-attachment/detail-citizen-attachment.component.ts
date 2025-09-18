import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CitizenAttachmentModel } from 'src/app/Shared/Model/Master/citizen-attachment.model';
import { CitizenAttachmentService } from 'src/app/Shared/Service/citizen-attachment.service';

@Component({
  selector: 'app-detail-citizen-attachment',
  templateUrl: './detail-citizen-attachment.component.html',
  styleUrls: ['./detail-citizen-attachment.component.css']
})
export class DetailCitizenAttachmentComponent implements OnInit {
  model: CitizenAttachmentModel;
  RecordId: number;
  constructor(
    private readonly _appComponent: AppComponent,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _attachmentService: CitizenAttachmentService,
    private readonly _alertService: AlertService
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this.model = new CitizenAttachmentModel();
    this._appComponent.setpagelayout(
      "Attachment Detail :",
      "keyboard_backspace",
      "Back To List",
      "master/citizen-attachment"
    );
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this._attachmentService.Detail(this.RecordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <CitizenAttachmentModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

}
