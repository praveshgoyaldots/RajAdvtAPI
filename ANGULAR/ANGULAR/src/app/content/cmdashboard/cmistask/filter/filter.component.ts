import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, Inject, OnInit } from "@angular/core";
import { DialogData } from "../cmistask.component";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  // startDate: Date;
  // endDate: Date;

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
