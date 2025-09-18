import { Component, Inject, OnInit } from '@angular/core';
import { DefaultPagePermissionListModel } from 'src/app/Shared/Model/user-permission.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import {
  MatPaginator,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialogRef,
} from "@angular/material";

@Component({
  selector: 'app-default-permission-dialog',
  templateUrl: './default-permission-dialog.component.html',
  styleUrls: ['./default-permission-dialog.component.css']
})
export class DefaultPermissionDialogComponent implements OnInit {
 //#region <Variables>
 defaultPagePermissionList: DefaultPagePermissionListModel[] = [];
 dataSource: any;
 Application: any;
 UserType: any;

 IsHeaderAddSelected: boolean = false;
 IsHeaderEditSelected: boolean = false;
 IsHeaderDeleteSelected: boolean = false;
 IsHeaderViewSelected: boolean = false;

 displayedColumns: string[] = [
   "s_no",
   "ApplicationCode",
   "PageTypeName",
   "permission_name",
   "add_permission",
   "edit_permission",
   "delete_permission",
   "view_permission",
 ];
 columnsToDisplay: string[] = this.displayedColumns.slice();
 //#endregion <Variables>

 //#region <Constructor>

 constructor(
   public _dialogRef: MatDialogRef<DefaultPermissionDialogComponent>,
   private readonly _alertService: AlertService,
   private readonly _userService: UserService,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {
   
   if (data) {
     this.defaultPagePermissionList = data as DefaultPagePermissionListModel[];
     this.dataSource = new MatTableDataSource<
     DefaultPagePermissionListModel
   >(this.defaultPagePermissionList);
   }
 }

 //#endregion <Constructor>

 //#region <Methods>

 ngOnInit() {}

 onNoClick(): void {
   this._dialogRef.close();
 }

 
 print() {

  if ( this.defaultPagePermissionList) {

    let printContents, popupWin;
    printContents = document.getElementById("print").outerHTML;
    popupWin = window.open(
      "",
      "_blank",
      "top=0,left=0,height=100%,width=auto"
    );
    popupWin.document.open();
    popupWin.document.write(`
<html>
<head>
<title>Default Permission</title>
<style>
.doNotPrint{display:none !important;}
table th,table td{
  border: 1px solid black;

  // padding:1px;
}
#print {
  border-collapse: collapse;
}
</style>
</head>
<body onload="window.print();window.close()">${printContents}</body>
</html>`);
    //popupWin.document.close();
  }
}
 //#endregion <Methods>
}
