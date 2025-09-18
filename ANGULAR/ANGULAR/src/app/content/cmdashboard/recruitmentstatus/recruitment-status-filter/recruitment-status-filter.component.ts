import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "../recruitmentstatus.component";
import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-recruitment-status-filter",
  templateUrl: "./recruitment-status-filter.component.html",
  styleUrls: ["./recruitment-status-filter.component.css"]
})
export class RecruitmentStatusFilterComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RecruitmentStatusFilterComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData = null
  ) {}
  ngOnInit() {}
  onNoClick(): void {
    
    this.dialogRef.close();
  }
}
