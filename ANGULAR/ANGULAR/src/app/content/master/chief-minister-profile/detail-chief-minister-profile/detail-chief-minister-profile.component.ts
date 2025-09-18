import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { ChiefMinisterProfileViewModel } from 'src/app/Shared/Model/Master/chief-minister-profile.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ChiefMinisterProfileService } from 'src/app/Shared/Service/chief-minister-profile.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-detail-chief-minister-profile',
  templateUrl: './detail-chief-minister-profile.component.html',
  styleUrls: ['./detail-chief-minister-profile.component.css']
})
export class DetailChiefMinisterProfileComponent implements OnInit {

  //#region <<Variable>>

  model: ChiefMinisterProfileViewModel;
  recordId: number = 0;

  //#endregion

  constructor(

    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _chiefMinisterProfileService: ChiefMinisterProfileService,


  ) {
    if (!isNullOrUndefined(this._route.snapshot.params.id)) {
      this.recordId = this._route.snapshot.params.id;
    }


    var pageHeading = ("CM Profile Detail:");
    this.appComponnet.setpagelayout(pageHeading, "keyboard_backspace", "Back To List", "master/chief-minister-profile");


  }

  ngOnInit() {
    if (this.recordId != 0) {
      this.getDetail();

    } else {
      this._alertService.error(GlobalMessagesModel.NoRecord);

      this._router.navigate(["master/chief-minister-profile"]);


    }
  }

  getDetail() {
    this._chiefMinisterProfileService.GetById(this.recordId).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <ChiefMinisterProfileViewModel>data.Data;


        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

}
