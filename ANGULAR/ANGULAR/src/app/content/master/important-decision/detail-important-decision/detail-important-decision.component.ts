import { Component, OnInit } from "@angular/core";
import { AchievementModel } from "src/app/Shared/Model/achievement-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { importantdesicionservice } from 'src/app/Shared/Service/important-desicion-service';

@Component({
  selector: "app-detail-important-decision",
  templateUrl: "./detail-important-decision.component.html",
  styleUrls: ["./detail-important-decision.component.css"],
})
export class DetailImportantDecisionComponent implements OnInit {
  //#region Variable
  recordId: number;
  detailModel: AchievementModel;
  //#endregion

  //#region constructor
  constructor(
    private readonly _importantDecision: importantdesicionservice,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent
  ) {
    this.recordId = this._route.snapshot.params.id;
    this._parentApi.setpagelayout(
      "Important Decision Details:",
      "keyboard_backspace",
      "Back to list",
      "master/ImportantDecision"
    );
  }
  //#endregion

  //#region Method
  ngOnInit() {
    this.OnDataGetById(this.recordId);
  }
  OnDataGetById(id) {
    this._importantDecision.Detail(id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.detailModel = <AchievementModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  downloadMyFile(temp) {
    const link = document.createElement("a");
    link.setAttribute("href", temp);
    link.setAttribute("download", `Documents`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  //#endregion
}
