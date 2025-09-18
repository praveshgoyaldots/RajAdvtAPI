import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "../../cmistask/cmistask.component";
import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-projectmonitoring-filter",
  templateUrl: "./projectmonitoring-filter.component.html",
  styleUrls: ["./projectmonitoring-filter.component.css"]
})
export class ProjectmonitoringFilterComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProjectmonitoringFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
