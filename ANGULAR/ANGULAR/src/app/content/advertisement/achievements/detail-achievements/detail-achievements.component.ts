import { Component, OnInit } from "@angular/core";
import { AchievementModel } from "src/app/Shared/Model/achievement-model";
import { AchievementService } from "src/app/Shared/Service/achievement.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-detail-achievements",
  templateUrl: "./detail-achievements.component.html",
  styleUrls: ["./detail-achievements.component.css"],
})
export class DetailAchievementsComponent implements OnInit {
  //#region Variable
  recordId: number;
  detailModel: AchievementModel;
  //#endregion

  //#region constructor
  constructor(
    private readonly _achievementService: AchievementService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent
  ) {
    this.recordId = this._route.snapshot.params.id;
    this._parentApi.setpagelayout(
      "Details General-Multiple Entry",
      "keyboard_backspace",
      "Back to list",
      "advertisement/achievements"
    );
  }
  //#endregion

  //#region Method
  ngOnInit() {
    this.OnDataGetById(this.recordId);
  }
  OnDataGetById(id) {
    this._achievementService.Detail(id).subscribe(
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
