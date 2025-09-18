(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-cmdashboard-cmdashboard-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmdashboard.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/cmdashboard.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg dashboard-btn\" >\r\n  <div class=\"col l12 xl12 m12 s12 mb-30\">\r\n    <h5 class=\"page-title\">Dashboard </h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12 mat-form-field-wrapper\">\r\n    <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n      appearance=\"outline\">\r\n      <mat-checkbox [(ngModel)]=\"modIsShowReport\" (ngModelChange)=\"getData($event)\" >Is Show Report\r\n      </mat-checkbox>\r\n    </section>\r\n  </div>\r\n  <div class=\"col l12 xl12 m12 s12\" style=\"margin-bottom: 40px !important;\" *ngIf=\"modIsShowReport\">\r\n    <h4 class=\"dash-new-title\"><mat-icon> insert_chart_outlined</mat-icon>\r\n       CMIS Compliance(Task Completed) Department And Module Wise Summary Report List</h4>\r\n    <div class=\"row\">\r\n      <div class=\"col l12 s12\" id=\"cmisprint\">\r\n\r\n\r\n        <div class=\"table-responsive table-header-fixed\" id=\"taskCompletedAreaId\">\r\n        <table mat-table [dataSource]=\"dataTaskCompletedSource\" *ngIf=\"listTaskCompletedModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n          <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>#</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{(i + 1) }}\r\n            </td>\r\n            <td mat-footer-cell *matFooterCellDef> Total </td>\r\n          </ng-container>\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedTaskCompletedColumns\" >\r\n\r\n                <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n                <td mat-cell *matCellDef=\"let element\" > {{element[column.Value]}} </td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n              </ng-container>\r\n              <ng-container matColumnDef=\"NoOfEntyInCMIS\" >\r\n                <th mat-header-cell *matHeaderCellDef> Number Of Entries CMIS </th>\r\n                <td mat-cell *matCellDef=\"let transaction\"><a class=\"cmis-ent-num\" (dblclick)=\"doubleTaskCompletedClick(transaction,transaction.ModuleID,transaction.Nodal_Department)\"> {{transaction.NoOfEntyInCMIS}} </a> </td>\r\n                <td mat-footer-cell *matFooterCellDef>{{totalTaskCompletedNoOfEntyInCMISCount}} </td>\r\n              </ng-container>\r\n          <ng-container matColumnDef=\"NumberOfCompliance\">\r\n            <th mat-header-cell *matHeaderCellDef> Number Of Compliance </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"><a class=\"cmis-ent-num\" (dblclick)=\"numberOfComplianceClick(transaction,transaction.ModuleID,transaction.Nodal_Department,transaction.modulename,transaction.DepartmentName,true)\"> {{transaction.NumberOfCompliance}} </a> </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalTaskCompletedNumberOfComplianceCount}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"NumberOfEntriesInJankalyan\">\r\n            <th mat-header-cell *matHeaderCellDef> Number Of Entries In Jankalyan </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"><a class=\"cmis-ent-num\" (dblclick)=\"numberOfEntriesInJankalyanClick(transaction,transaction.ModuleID,transaction.Nodal_Department,transaction.modulename,transaction.DepartmentName,transaction.NumberOfEntry,true)\">{{transaction.NumberOfEntriesInJankalyan}} </a>  </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalTaskCompletedNumberOfEntriesInJankalyanCount}} </td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"NumberofEntries\">\r\n            <th mat-header-cell *matHeaderCellDef> Expected Number Of Entries</th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.NumberOfEntry}}  </td>\r\n            <td mat-footer-cell *matFooterCellDef> {{totalTaskCompletedNumberofEntries}}</td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"columnsToTaskCompletedDisplay\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: columnsToTaskCompletedDisplay; let entry\" [ngClass]=\"{'bg-click-highlited': (entry?.ModuleID == dataItem?.ModuleID && entry?.Nodal_Department == dataItem?.Nodal_Department)}\"></tr>\r\n          <tr mat-footer-row *matFooterRowDef=\"displayedTaskCompletedColumns\"></tr>\r\n        </table>\r\n        </div>\r\n\r\n        <div *ngIf=\"listTaskCompletedModel?.length==0\"> Record Not Found</div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12\" *ngIf=\"modIsShowReport\" >\r\n    <h4 class=\"dash-new-title\"><mat-icon> insert_chart_outlined</mat-icon>\r\n       CMIS Compliance Department And Module Wise Summary Report List</h4>\r\n    <div class=\"row\" >\r\n      <div class=\"col l12 s12\" id=\"cmisprint\">\r\n\r\n\r\n        <div class=\"table-responsive table-header-fixed\" id=\"allModuleAreaId\">\r\n        <table mat-table [dataSource]=\"dataSource\" *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n          <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>#</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n            </td>\r\n            <td mat-footer-cell *matFooterCellDef> Total </td>\r\n          </ng-container>\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n                <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n                <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n              </ng-container>\r\n              <ng-container matColumnDef=\"NoOfEntyInCMIS\">\r\n                <th mat-header-cell *matHeaderCellDef> Number Of Entries CMIS </th>\r\n                <td mat-cell *matCellDef=\"let transaction\"><a class=\"cmis-ent-num\" (dblclick)=\"doubleClick(transaction,transaction.ModuleID,transaction.Nodal_Department)\"> {{transaction.NoOfEntyInCMIS}} </a> </td>\r\n                <td mat-footer-cell *matFooterCellDef>{{totalNoOfEntyInCMISCount}} </td>\r\n              </ng-container>\r\n          <ng-container matColumnDef=\"NumberOfCompliance\">\r\n            <th mat-header-cell *matHeaderCellDef> Number Of Compliance </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"><a class=\"cmis-ent-num\" (dblclick)=\"numberOfComplianceClick(transaction,transaction.ModuleID,transaction.Nodal_Department,transaction.modulename,transaction.DepartmentName)\"> {{transaction.NumberOfCompliance}} </a></td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalNumberOfComplianceCount}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"NumberOfEntriesInJankalyan\">\r\n            <th mat-header-cell *matHeaderCellDef> Number Of Entries In Jankalyan </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"><a class=\"cmis-ent-num\" (dblclick)=\"numberOfEntriesInJankalyanClick(transaction,transaction.ModuleID,transaction.Nodal_Department,transaction.modulename,transaction.DepartmentName,transaction.NumberOfEntry)\"> {{transaction.NumberOfEntriesInJankalyan}} </a> </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalNumberOfEntriesInJankalyanCount}} </td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"NumberofEntries\">\r\n            <th mat-header-cell *matHeaderCellDef> Expected Number Of Entries</th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.NumberOfEntry}}  </td>\r\n            <td mat-footer-cell *matFooterCellDef> {{totalNumberofEntries}}</td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;let entryT\" [ngClass]=\"{'bg-click-highlited': (entryT?.ModuleID == dataItem?.ModuleID && entryT?.Nodal_Department == dataItem?.Nodal_Department)}\"></tr>\r\n          <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n        </table>\r\n        </div>\r\n\r\n        <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n<!-- Region Start <Project Count> -->\r\n\r\n  <div class=\"col l12 xl12 m12 s12\" style=\"margin-bottom: 40px !important;\" *ngIf=\"modIsShowReport\">\r\n    <h4 class=\"dash-new-title\"><mat-icon> insert_chart_outlined</mat-icon>\r\n       Project Summary Report</h4>\r\n    <div class=\"row\">\r\n      <div class=\"col l12 s12\" id=\"projectprint\">\r\n\r\n\r\n        <div class=\"table-responsive table-header-fixed\">\r\n        <table mat-table [dataSource]=\"datataskProjectSource\" *ngIf=\"ProjectlistModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n          <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>#</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{(i + 1) }}\r\n            </td>\r\n            <td mat-footer-cell *matFooterCellDef> Total </td>\r\n          </ng-container>\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedProjectColumns\" >\r\n\r\n                <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n                <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n              </ng-container>\r\n\r\n              <ng-container matColumnDef=\"ProjectCount\">\r\n                <th mat-header-cell *matHeaderCellDef> Count</th>\r\n                <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ProjectCount}}  </td>\r\n                <td mat-footer-cell *matFooterCellDef> {{totalstatusCount}}</td>\r\n              </ng-container>\r\n              <!-- <tr mat-footer-row *matFooterRowDef>{{totalstatusCount}}</tr> -->\r\n\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"columnsToProjectDisplay\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: columnsToProjectDisplay\"></tr>\r\n          <tr mat-footer-row *matFooterRowDef=\"displayedProjectColumns\"></tr>\r\n        </table>\r\n        </div>\r\n\r\n        <div *ngIf=\"ProjectlistModel?.length==0\"> Record Not Found</div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n<!-- Project Region end -->\r\n\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" *ngIf=\"false\">\r\n\r\n\r\n    <a href=\"https://jankalyan.rajasthan.gov.in/#/scheme\" target=\"_blank\" (click)=\"schemeClick()\" class=\"enter-bx\">\r\n      <img class=\"enter-bx__box-img\" src=\"assets/images/Scheme_Icon_Big.png\">\r\n\r\n      <h5 class=\"bx-title\" style=\"color: #fff;\"> View All Department wise Scheme</h5>\r\n\r\n      <img class=\"next_arrow\" src=\"assets/images/right.png\"/>\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" *ngIf=\"false\">\r\n\r\n\r\n    <a href=\"https://jankalyan.rajasthan.gov.in/#/order\" target=\"_blank\" (click)=\"schemeClick()\" class=\"enter-bx\" style=\"background: #465a69;\">\r\n <img class=\"enter-bx__box-img\" src=\"assets/images/Document_Icon_Big.png\">\r\n      <h5 class=\"bx-title\" style=\"color: #fff;\"> View All Government Documents</h5>\r\n      <img class=\"next_arrow\" src=\"assets/images/right.png\"/>\r\n\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"col l9 xl9 m9 s9 text-right\" [ngClass]=\"this.IsCMOLatterVisible?'':'hide'\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"\r\n        cmoletter.chart('table');\r\n        cmistask.chart('table');\r\n        recruitmentstatus.chart('table');\r\n        projectmonitoring.chart('table');\r\n        schemedashboard.chart('table');\r\n        govtorderdashboard.chart('table')\r\n      \">\r\n      <mat-icon>view_module </mat-icon>\r\n    </a>\r\n\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"\r\n        cmoletter.chart('bar');\r\n        cmistask.chart('bar');\r\n        recruitmentstatus.chart('bar');\r\n        projectmonitoring.chart('bar');\r\n        schemedashboard.chart('bar');\r\n          govtorderdashboard.chart('bar')\r\n      \">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"\r\n        cmoletter.chart('pie');\r\n        cmistask.chart('pie');\r\n        recruitmentstatus.chart('pie');\r\n        projectmonitoring.chart('pie');\r\n        schemedashboard.chart('pie');\r\n          govtorderdashboard.chart('pie')\r\n      \">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"\r\n        cmoletter.chart('line');\r\n        cmistask.chart('line');\r\n        recruitmentstatus.chart('line');\r\n        projectmonitoring.chart('line');\r\n        schemedashboard.chart('line');\r\n          govtorderdashboard.chart('line')\r\n      \">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n\r\n    <!-- <a class=\"btn-submit mt-6\" >\r\n          <i class=\"fa fa-filter\"></i>\r\n        </a> -->\r\n\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"print()\">\r\n      <mat-icon>print</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row dashboard-counter\" [ngClass]=\"this.IsCMOLatterVisible?'':'hide'\">\r\n  <div class=\"col l3 x8 m4 s12\">\r\n    <mat-card class=\"example-card box-red color-white\">\r\n      <mat-card-header>\r\n        <div mat-card-avatar class=\"example-header-image\">\r\n          <mat-icon>person_add</mat-icon>\r\n        </div>\r\n        <mat-card-title>44+</mat-card-title>\r\n        <mat-card-subtitle>User Registrations</mat-card-subtitle>\r\n      </mat-card-header>\r\n    </mat-card>\r\n  </div>\r\n\r\n  <div class=\"col l3 x8 m6 s12\">\r\n    <mat-card class=\"example-card box-blue color-white\">\r\n      <mat-card-header>\r\n        <div mat-card-avatar class=\"example-header-image\">\r\n          <mat-icon>dashboard</mat-icon>\r\n        </div>\r\n        <mat-card-title>150+</mat-card-title>\r\n        <mat-card-subtitle>Advertisement</mat-card-subtitle>\r\n      </mat-card-header>\r\n    </mat-card>\r\n  </div>\r\n\r\n  <div class=\"col l3 x8 m6 s12\">\r\n    <mat-card class=\"example-card box-green color-white\">\r\n      <mat-card-header>\r\n        <div mat-card-avatar class=\"example-header-image\">\r\n          <mat-icon>person_add</mat-icon>\r\n        </div>\r\n        <mat-card-title>10</mat-card-title>\r\n        <mat-card-subtitle> Mode Of Delivery </mat-card-subtitle>\r\n      </mat-card-header>\r\n    </mat-card>\r\n  </div>\r\n\r\n  <div class=\"col l3 x8 m6 s12\">\r\n    <mat-card class=\"example-card box-yellow color-white\">\r\n      <mat-card-header>\r\n        <div mat-card-avatar class=\"example-header-image\">\r\n          <mat-icon>person_add</mat-icon>\r\n        </div>\r\n        <mat-card-title>102+</mat-card-title>\r\n        <mat-card-subtitle>Scheme </mat-card-subtitle>\r\n      </mat-card-header>\r\n    </mat-card>\r\n  </div>\r\n\r\n</div>\r\n\r\n<div class=\"row dashboard-data\">\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" [ngClass]=\"this.IsCMOLatterVisible?'':'hide'\">\r\n    <div class=\"dashboard-data-box\">\r\n      <app-cmoletter #cmoletter></app-cmoletter>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" [ngClass]=\"this.IsCMISTaskVisible?'':'hide'\">\r\n    <div class=\" dashboard-data-box\">\r\n      <app-cmistask #cmistask> </app-cmistask>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" [ngClass]=\"this.IsRecruitmentVisible?'':'hide'\">\r\n    <div class=\"dashboard-data-box\" >\r\n      <app-recruitmentstatus #recruitmentstatus> </app-recruitmentstatus>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" [ngClass]=\"this.IsProjectMoniteringVisible?'':'hide'\">\r\n    <div class=\"dashboard-data-box\">\r\n      <app-project-monitoring #projectmonitoring> </app-project-monitoring>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" [ngClass]=\"this.IsSchemeVisible?'':'hide'\">\r\n    <div class=\"dashboard-data-box\">\r\n      <app-schemedashboard #schemedashboard> </app-schemedashboard>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" [ngClass]=\"this.IsGovtorderVisible?'':'hide'\">\r\n    <div class=\"dashboard-data-box\">\r\n      <app-govt-order-dashboard #govtorderdashboard> </app-govt-order-dashboard>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmistask/cmistask.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/cmistask/cmistask.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #f39c12;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">CMIS Task</p>\r\n  </div>\r\n\r\n  <div class=\"col l xl9 m9 s9 text-right\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('table')\" title=\"Table View\">\r\n      <mat-icon>view_module</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('bar')\" title=\"Bar View\">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('pie')\" title=\"Pie View\">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('line')\" title=\"Line View\">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openZoomDialog()\" title=\"Zoom\">\r\n      <mat-icon>zoom_out_map</mat-icon>\r\n    </a>\r\n\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openDialog()\" title=\"Filter\">\r\n      <mat-icon>search</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12  m6 s12\">\r\n    <div id=\"cmistaskchartdiv\"></div>\r\n  </div>\r\n</div>\r\n\r\n<!-- <div class=\"col l12  m6 s12\" >\r\n\r\n                           <table mat-table [dataSource]=\"dataSource\" matSort class=\"ng-container mat-elevation-z8\" *ngIf=\"type=='table'\">\r\n\r\n                              <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n                                <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n                                <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n                              </ng-container>\r\n\r\n\r\n\r\n                              <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n                              <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n                            </table>\r\n\r\n            </div> -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmistask/filter/filter.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/cmistask/filter/filter.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Select Date Range</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  <div class=\"row\" style=\"margin: 0px;\">\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <input\r\n          matInput\r\n          [(ngModel)]=\"data.startDate\"\r\n          [matDatepicker]=\"picker1\"\r\n          placeholder=\"From date\"\r\n        />\r\n        <mat-datepicker-toggle\r\n          matSuffix\r\n          [for]=\"picker1\"\r\n        ></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <input\r\n          matInput\r\n          [(ngModel)]=\"data.endDate\"\r\n          [matDatepicker]=\"picker\"\r\n          placeholder=\"To date\"\r\n        />\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions style=\"float: right;\">\r\n  <button mat-button mat-dialog-close  class=\"btn-submit btn_orange\">Cancel</button>\r\n  <button mat-button [mat-dialog-close]=\"data\" cdkFocusInitial  class=\"btn-submit btn_green\">Submit</button>\r\n</mat-dialog-actions>\r\n<!--  -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">CMIS Task</p>\r\n  </div>\r\n  <div class=\"col l xl9 m9 s9 text-right\"><i class=\"material-icons\" (click)=\"oncloseClick()\" style=\"cursor: pointer;\">\r\n      clear\r\n    </i></div>\r\n</div>\r\n\r\n\r\n<div style=\"height:80%;\" id=\"cmistaskchartZoomdiv\"></div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmoletter/cmoletter.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/cmoletter/cmoletter.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">CMO Letter</p>\r\n  </div>\r\n\r\n  <div class=\"col l xl9 m9 s9 text-right\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('table')\" title=\"Table Chart\">\r\n      <mat-icon>view_module</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('bar')\" title=\"Bar chart\">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('pie')\" title=\"Pie chart\">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('line')\" title=\"Line Chart\">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openDialog()\" title=\"Zoom\">\r\n      <mat-icon>zoom_out_map</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12  m6 s12\">\r\n    <div id=\"cmoletterdiv\"></div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.html ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">CMO Letter</p>\r\n  </div>\r\n  <div class=\"col l xl9 m9 s9 text-right\"><i class=\"material-icons\" (click)=\"oncloseClick()\" style=\"cursor: pointer;\">\r\n      clear\r\n    </i></div>\r\n</div>\r\n\r\n\r\n<div style=\"height:80%;\" id=\"cmoletterZoomdiv\"></div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title> Select Date Range</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  \r\n\r\n    <div class=\"row\" style=\"margin: 0px;\">\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field>\r\n                <input matInput [matDatepicker] = \"picker1\" placeholder = \"From date\"  [max]=\"maxDate\" >\r\n                <mat-datepicker-toggle matSuffix [for] = \"picker1\"></mat-datepicker-toggle>\r\n                <mat-datepicker #picker1></mat-datepicker>\r\n             </mat-form-field>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field>\r\n                <input matInput [matDatepicker] = \"picker\"  placeholder = \"To date\"   [max]=\"maxDate\"   >\r\n                <mat-datepicker-toggle matSuffix [for] = \"picker\" ></mat-datepicker-toggle>\r\n                <mat-datepicker #picker ></mat-datepicker>\r\n                 \r\n             </mat-form-field>\r\n        </div>\r\n\r\n    </div>\r\n  \r\n\r\n\r\n</mat-dialog-content>\r\n<mat-dialog-actions style=\"float: right;\">\r\n  <button mat-button mat-dialog-close class=\"btn-submit btn_orange\">Cancel</button>\r\n  <button class=\"btn-submit btn_green\" mat-button [mat-dialog-close]=\"true\"  cdkFocusInitial>Submit</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.html ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color:blue;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Government Order</p>\r\n  </div>\r\n\r\n  <div class=\"col l xl9 m9 s9 text-right\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('table')\">\r\n      <mat-icon>view_module</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('bar')\">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('pie')\">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('line')\">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openZoomDialog()\" title=\"Zoom\">\r\n      <mat-icon>zoom_out_map</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12  m6 s12\">\r\n    <div id=\"govtorderdiv\"></div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.html":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.html ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Government Order</p>\r\n  </div>\r\n  <div class=\"col l xl9 m9 s9 text-right\"><i class=\"material-icons\" (click)=\"oncloseClick()\" style=\"cursor: pointer;\">\r\n      clear\r\n    </i></div>\r\n</div>\r\n\r\n<div style=\" height: 80%;\" id=\"govtorderdashboardzoomdiv\"></div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00c0ef;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Project Monitoring</p>\r\n  </div>\r\n\r\n  <div class=\"col l xl9 m9 s9 text-right\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('table')\">\r\n      <mat-icon>view_module</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('bar')\">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('pie')\">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('line')\">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openZoomDialog()\" title=\"Zoom\">\r\n      <mat-icon>zoom_out_map</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openDialog()\" title=\"Filter\">\r\n      <mat-icon>search</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12  m6 s12\">\r\n    <div id=\"projectmonitoringdiv\"></div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.html":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.html ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Select Date Range</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  <div class=\"row\" style=\"margin: 0px;\">\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <input\r\n          matInput\r\n          [(ngModel)]=\"data.startDate\"\r\n          [matDatepicker]=\"picker1\"\r\n          placeholder=\"From date\"\r\n        />\r\n        <mat-datepicker-toggle\r\n          matSuffix\r\n          [for]=\"picker1\"\r\n        ></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <input\r\n          matInput\r\n          [(ngModel)]=\"data.endDate\"\r\n          [matDatepicker]=\"picker\"\r\n          placeholder=\"To date\"\r\n        />\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions style=\"float: right;\">\r\n  <button mat-button mat-dialog-close class=\"btn-submit btn_orange\">Cancel</button>\r\n  <button mat-button [mat-dialog-close]=\"data\" cdkFocusInitial  class=\"btn-submit btn_green\">Submit</button>\r\n</mat-dialog-actions>\r\n<!--  -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Scheme</p>\r\n  </div>\r\n  <div class=\"col l xl9 m9 s9 text-right\"><i class=\"material-icons\" (click)=\"oncloseClick()\" style=\"cursor: pointer;\">\r\n      clear\r\n    </i></div>\r\n</div>\r\n\r\n<div style=\" height: 80%;\" id=\"projectmonitoringzoomdiv\"></div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.html ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Select Date Range</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  <div class=\"row\">\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <input\r\n          matInput\r\n          [(ngModel)]=\"data.startDate\"\r\n          [matDatepicker]=\"picker1\"\r\n          placeholder=\"From date\"\r\n        />\r\n        <mat-datepicker-toggle\r\n          matSuffix\r\n          [for]=\"picker1\"\r\n        ></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <input\r\n          matInput\r\n          [(ngModel)]=\"data.endDate\"\r\n          [matDatepicker]=\"picker\"\r\n          placeholder=\"To date\"\r\n        />\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button mat-dialog-close>Cancel</button>\r\n  <button mat-button [mat-dialog-close]=\"data\" cdkFocusInitial>Submit</button>\r\n</mat-dialog-actions>\r\n<!--  -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #dd4b39;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Recruitment Status</p>\r\n  </div>\r\n\r\n  <div class=\"col l xl9 m9 s9 text-right\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('table')\">\r\n      <mat-icon>view_module</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('bar')\">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('pie')\">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('line')\">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openZoomDialog()\" title=\"Zoom\">\r\n      <mat-icon>zoom_out_map</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openDialog()\" title=\"Filter\">\r\n      <mat-icon>search</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12  m6 s12\">\r\n    <div id=\"recruitmentstatusdiv\"></div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.html":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.html ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Scheme</p>\r\n  </div>\r\n  <div class=\"col l xl9 m9 s9 text-right\"><i class=\"material-icons\" (click)=\"oncloseClick()\" style=\"cursor: pointer;\">\r\n      clear\r\n    </i></div>\r\n</div>\r\n\r\n<div style=\" height: 80%;\" id=\"recruitmentstatuszoomdiv\"></div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color:deeppink;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Schemes</p>\r\n  </div>\r\n\r\n  <div class=\"col l xl9 m9 s9 text-right\">\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('table')\">\r\n      <mat-icon>view_module</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('bar')\">\r\n      <mat-icon>bar_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('pie')\">\r\n      <mat-icon>pie_chart</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"chart('line')\">\r\n      <mat-icon>trending_up</mat-icon>\r\n    </a>\r\n    <a mat-button class=\"btn-submit mt-6\" (click)=\"openZoomDialog()\" title=\"Zoom\">\r\n      <mat-icon>zoom_out_map</mat-icon>\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12  m6 s12\">\r\n    <div id=\"schemedashboarddiv\"></div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.html ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row dashboard-data-box-header\" style=\"border-color: #00a65a;\">\r\n  <div class=\"col l xl3 m3 s3\">\r\n    <p style=\"text-transform:none;\">Scheme</p>\r\n  </div>\r\n  <div class=\"col l xl9 m9 s9 text-right\"><i class=\"material-icons\" (click)=\"oncloseClick()\" style=\"cursor: pointer;\">\r\n      clear\r\n    </i></div>\r\n</div>\r\n\r\n<div style=\" height: 80%;\" id=\"schemedashboardzoomdiv\"></div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/master/dashboard-help-document/dashboard-help-document.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/master/dashboard-help-document/dashboard-help-document.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>Updated Document</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n\r\n<div class=\"col l12 s12 \">\r\n      <!-- <alert></alert> -->\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n\r\n        <object *ngIf=\"helpDocument?.Url\" width=\"100%\" height=\"650px\">\r\n\r\n          <iframe title=\"PDF\" [src]='PDFFile' type=\"application/pdf\" frameborder=\"0\" width=\"100%\"\r\n            height=\"650px\"></iframe>\r\n        </object>\r\n  </div>\r\n\r\n \r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Shared/Service/CMISTask.sercice.ts":
/*!****************************************************!*\
  !*** ./src/app/Shared/Service/CMISTask.sercice.ts ***!
  \****************************************************/
/*! exports provided: CMISTaskService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CMISTaskService", function() { return CMISTaskService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");




var CMISTaskService = /** @class */ (function () {
    function CMISTaskService(_baseService) {
        this._baseService = _baseService;
    }
    CMISTaskService.prototype.PostData = function (model, operationUrl) {
        var formData = new FormData();
        formData.append("data", JSON.stringify(model));
        formData.append("enctype", "multipart/form-data");
        this.result = this._baseService.post(operationUrl, formData);
        return this.result;
    };
    CMISTaskService.prototype.Get = function () {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CMISTaskGetUrl, null);
        return result;
    };
    CMISTaskService.prototype.GetById = function (id, startDate, endDate) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CMISTaskGetBYDepartmentIdUrl +
            "?Id=" +
            id +
            "&startDate=" +
            startDate +
            "&endDate=" +
            endDate, null);
        return result;
    };
    CMISTaskService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    CMISTaskService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], CMISTaskService);
    return CMISTaskService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/CMOLetter.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/Shared/Service/CMOLetter.service.ts ***!
  \*****************************************************/
/*! exports provided: CMOLetterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CMOLetterService", function() { return CMOLetterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");




var CMOLetterService = /** @class */ (function () {
    function CMOLetterService(_baseService) {
        this._baseService = _baseService;
    }
    CMOLetterService.prototype.PostData = function (model, operationUrl) {
        var formData = new FormData();
        formData.append('data', JSON.stringify(model));
        formData.append('enctype', 'multipart/form-data');
        this.result = this._baseService.post(operationUrl, formData);
        return this.result;
    };
    CMOLetterService.prototype.Get = function () {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CMOLetterGetUrl, null);
        return result;
    };
    CMOLetterService.prototype.GetById = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CMOLetterGetBYDepartmentIdUrl + id, null);
        return result;
    };
    CMOLetterService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    CMOLetterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], CMOLetterService);
    return CMOLetterService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/ProjectMonitoring.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/Shared/Service/ProjectMonitoring.service.ts ***!
  \*************************************************************/
/*! exports provided: ProjectMonitoringService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectMonitoringService", function() { return ProjectMonitoringService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");




var ProjectMonitoringService = /** @class */ (function () {
    function ProjectMonitoringService(_baseService) {
        this._baseService = _baseService;
    }
    ProjectMonitoringService.prototype.PostData = function (model, operationUrl) {
        var formData = new FormData();
        formData.append("data", JSON.stringify(model));
        formData.append("enctype", "multipart/form-data");
        this.result = this._baseService.post(operationUrl, formData);
        return this.result;
    };
    ProjectMonitoringService.prototype.GetById = function (departmentCodes, startDate, endDate) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ProjectMonitoringGetBYDepartmentIdUrl +
            "?DepartmentCode=" +
            departmentCodes +
            "&startDate=" +
            startDate +
            "&endDate=" +
            endDate, null);
        return result;
    };
    ProjectMonitoringService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    ProjectMonitoringService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], ProjectMonitoringService);
    return ProjectMonitoringService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/RecruitmentStatus.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/Shared/Service/RecruitmentStatus.service.ts ***!
  \*************************************************************/
/*! exports provided: RecruitmentStatusService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecruitmentStatusService", function() { return RecruitmentStatusService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");




var RecruitmentStatusService = /** @class */ (function () {
    function RecruitmentStatusService(_baseService) {
        this._baseService = _baseService;
    }
    RecruitmentStatusService.prototype.PostData = function (model, operationUrl) {
        var formData = new FormData();
        formData.append("data", JSON.stringify(model));
        formData.append("enctype", "multipart/form-data");
        this.result = this._baseService.post(operationUrl, formData);
        return this.result;
    };
    RecruitmentStatusService.prototype.Get = function () {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].RecruitmentStatusGetUrl, null);
        return result;
    };
    RecruitmentStatusService.prototype.GetById = function (id, startDate, endDate) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].RecruitmentStatusGetBYDepartmentIdUrl +
            id +
            "&startDate=" +
            startDate +
            "&endDate=" +
            endDate, null);
        return result;
    };
    RecruitmentStatusService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    RecruitmentStatusService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], RecruitmentStatusService);
    return RecruitmentStatusService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/SchemeDashboard.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/Shared/Service/SchemeDashboard.service.ts ***!
  \***********************************************************/
/*! exports provided: SchemeDashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemeDashboardService", function() { return SchemeDashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");




var SchemeDashboardService = /** @class */ (function () {
    function SchemeDashboardService(_baseService) {
        this._baseService = _baseService;
    }
    SchemeDashboardService.prototype.PostData = function (model, operationUrl) {
        var formData = new FormData();
        formData.append("data", JSON.stringify(model));
        formData.append("enctype", "multipart/form-data");
        this.result = this._baseService.post(operationUrl, formData);
        return this.result;
    };
    SchemeDashboardService.prototype.Get = function () {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].SchemeDashboardGetBYUrl, null);
        return result;
    };
    SchemeDashboardService.prototype.GetById = function (UserType, UserId) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].SchemeDashboardGetBYUrl +
            "?UserType=" +
            UserType +
            "&UserId=" +
            UserId);
        return result;
    };
    SchemeDashboardService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    SchemeDashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], SchemeDashboardService);
    return SchemeDashboardService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/google-chart.service.ts":
/*!********************************************************!*\
  !*** ./src/app/Shared/Service/google-chart.service.ts ***!
  \********************************************************/
/*! exports provided: GoogleChartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleChartService", function() { return GoogleChartService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var GoogleChartService = /** @class */ (function () {
    function GoogleChartService() {
        this.google = google;
    }
    GoogleChartService.prototype.getGoogle = function () {
        return this.google;
    };
    GoogleChartService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], GoogleChartService);
    return GoogleChartService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/govtorderdashboard.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/Shared/Service/govtorderdashboard.service.ts ***!
  \**************************************************************/
/*! exports provided: govtorderdashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "govtorderdashboardService", function() { return govtorderdashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");




var govtorderdashboardService = /** @class */ (function () {
    function govtorderdashboardService(_baseService) {
        this._baseService = _baseService;
    }
    govtorderdashboardService.prototype.PostData = function (model, operationUrl) {
        var formData = new FormData();
        formData.append("data", JSON.stringify(model));
        formData.append("enctype", "multipart/form-data");
        this.result = this._baseService.post(operationUrl, formData);
        return this.result;
    };
    govtorderdashboardService.prototype.GetById = function (departmentCodes, startDate, endDate) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].GovtOrderDashboardGetBYUrl +
            "?DepartmentCode=" +
            departmentCodes +
            "&startDate=" +
            startDate +
            "&endDate=" +
            endDate, null);
        return result;
    };
    govtorderdashboardService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    govtorderdashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], govtorderdashboardService);
    return govtorderdashboardService;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmdashboard-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmdashboard-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: CmdashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdashboardRoutingModule", function() { return CmdashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _cmdashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cmdashboard.component */ "./src/app/content/cmdashboard/cmdashboard.component.ts");
/* harmony import */ var _cmoletter_cmoletter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cmoletter/cmoletter.component */ "./src/app/content/cmdashboard/cmoletter/cmoletter.component.ts");
/* harmony import */ var _cmistask_cmistask_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cmistask/cmistask.component */ "./src/app/content/cmdashboard/cmistask/cmistask.component.ts");
/* harmony import */ var _recruitmentstatus_recruitmentstatus_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recruitmentstatus/recruitmentstatus.component */ "./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.ts");
/* harmony import */ var _project_monitoring_project_monitoring_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./project-monitoring/project-monitoring.component */ "./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.ts");









var routes = [
    {
        path: '',
        component: _cmdashboard_component__WEBPACK_IMPORTED_MODULE_4__["CmdashboardComponent"],
    },
    {
        path: 'cmoletter/:type',
        component: _cmoletter_cmoletter_component__WEBPACK_IMPORTED_MODULE_5__["CmoletterComponent"]
    },
    {
        path: 'cmistask/:type',
        component: _cmistask_cmistask_component__WEBPACK_IMPORTED_MODULE_6__["CmistaskComponent"]
    },
    {
        path: 'recruitmentstatus/:type',
        component: _recruitmentstatus_recruitmentstatus_component__WEBPACK_IMPORTED_MODULE_7__["RecruitmentStatusComponent"]
    },
    {
        path: 'projectmonitoring/:type',
        component: _project_monitoring_project_monitoring_component__WEBPACK_IMPORTED_MODULE_8__["ProjectMonitoringComponent"]
    },
];
var CmdashboardRoutingModule = /** @class */ (function () {
    function CmdashboardRoutingModule() {
    }
    CmdashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ]
        })
    ], CmdashboardRoutingModule);
    return CmdashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmdashboard.component.css":
/*!***************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmdashboard.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".next_arrow{\r\n  max-width: 50px;\r\n  margin-top: 25px;\r\n}\r\n\r\n.drawer-btn {\r\n    padding: 0px;\r\n    position: absolute;\r\n    left: -10px;\r\n    top: 5px;\r\n    }\r\n\r\n.drawer-btn .mat-icon\r\n    {\r\n      background: #175ea2;\r\n      border-radius: 100%;\r\n      padding: 4px;\r\n      display: inline;\r\n      color: #fff;\r\n\r\n    }\r\n\r\n.mat-drawer {\r\n        min-width: 250px;\r\n        box-shadow: 0 4px 7px 0 rgba(0, 0, 0, .2);\r\n    }\r\n\r\n.dash-new-title\r\n    {\r\n      font-size: 27px;\r\n      margin: 0px 0px 15px 0px;\r\n      background: #222d32;\r\n      padding: 12px 15px;\r\n      border-radius: 10px;\r\n      color: #fff;\r\n      text-align: center;\r\n    }\r\n\r\n.table-responsive.table-header-fixed a {\r\n\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n}\r\n\r\n.table-responsive.table-header-fixed td, .table-responsive.table-header-fixed th {\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n}\r\n\r\n@media (max-width:767px) {\r\n      .mat-drawer {\r\n        min-width: 55px;\r\n        width: 55px;\r\n\r\n    }\r\n    }\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9jbWRhc2hib2FyZC9jbWRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFFBQVE7SUFDUjs7QUFDQTs7TUFFRSxtQkFBbUI7TUFDbkIsbUJBQW1CO01BQ25CLFlBQVk7TUFDWixlQUFlO01BQ2YsV0FBVzs7SUFFYjs7QUFDQTtRQUNJLGdCQUFnQjtRQUNoQix5Q0FBeUM7SUFDN0M7O0FBRUE7O01BRUUsZUFBZTtNQUNmLHdCQUF3QjtNQUN4QixtQkFBbUI7TUFDbkIsa0JBQWtCO01BQ2xCLG1CQUFtQjtNQUNuQixXQUFXO01BQ1gsa0JBQWtCO0lBQ3BCOztBQUVGOztJQUVFLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBQ0U7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUNJO01BQ0U7UUFDRSxlQUFlO1FBQ2YsV0FBVzs7SUFFZjtJQUNBIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9jbWRhc2hib2FyZC9jbWRhc2hib2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5leHRfYXJyb3d7XHJcbiAgbWF4LXdpZHRoOiA1MHB4O1xyXG4gIG1hcmdpbi10b3A6IDI1cHg7XHJcbn1cclxuXHJcbi5kcmF3ZXItYnRuIHtcclxuICAgIHBhZGRpbmc6IDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IC0xMHB4O1xyXG4gICAgdG9wOiA1cHg7XHJcbiAgICB9XHJcbiAgICAuZHJhd2VyLWJ0biAubWF0LWljb25cclxuICAgIHtcclxuICAgICAgYmFja2dyb3VuZDogIzE3NWVhMjtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgcGFkZGluZzogNHB4O1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG5cclxuICAgIH1cclxuICAgIC5tYXQtZHJhd2VyIHtcclxuICAgICAgICBtaW4td2lkdGg6IDI1MHB4O1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDdweCAwIHJnYmEoMCwgMCwgMCwgLjIpO1xyXG4gICAgfVxyXG5cclxuICAgIC5kYXNoLW5ldy10aXRsZVxyXG4gICAge1xyXG4gICAgICBmb250LXNpemU6IDI3cHg7XHJcbiAgICAgIG1hcmdpbjogMHB4IDBweCAxNXB4IDBweDtcclxuICAgICAgYmFja2dyb3VuZDogIzIyMmQzMjtcclxuICAgICAgcGFkZGluZzogMTJweCAxNXB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gXHJcbiAgLnRhYmxlLXJlc3BvbnNpdmUudGFibGUtaGVhZGVyLWZpeGVkIGEge1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuICAudGFibGUtcmVzcG9uc2l2ZS50YWJsZS1oZWFkZXItZml4ZWQgdGQsIC50YWJsZS1yZXNwb25zaXZlLnRhYmxlLWhlYWRlci1maXhlZCB0aCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gICAgICAubWF0LWRyYXdlciB7XHJcbiAgICAgICAgbWluLXdpZHRoOiA1NXB4O1xyXG4gICAgICAgIHdpZHRoOiA1NXB4O1xyXG5cclxuICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/cmdashboard.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmdashboard.component.ts ***!
  \**************************************************************/
/*! exports provided: CmdashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdashboardComponent", function() { return CmdashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _master_dashboard_help_document_dashboard_help_document_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../master/dashboard-help-document/dashboard-help-document.component */ "./src/app/content/master/dashboard-help-document/dashboard-help-document.component.ts");
/* harmony import */ var src_app_Shared_Model_Master_jankalyanLogMaster_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/Master/jankalyanLogMaster.model */ "./src/app/Shared/Model/Master/jankalyanLogMaster.model.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_jankalyanlog_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/jankalyanlog.service */ "./src/app/Shared/Service/jankalyanlog.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");













var CmdashboardComponent = /** @class */ (function () {
    function CmdashboardComponent(_appComponet, _route, gChartService, _commonService, _alertService, _dialog, _jankalyanlogService, _router, _authService) {
        this._appComponet = _appComponet;
        this._route = _route;
        this.gChartService = gChartService;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._dialog = _dialog;
        this._jankalyanlogService = _jankalyanlogService;
        this._router = _router;
        this._authService = _authService;
        this.IsSchemeVisible = false;
        this.IsProjectMoniteringVisible = false;
        this.IsRecruitmentVisible = false;
        this.IsGovtorderVisible = false;
        this.IsCMISTaskVisible = false;
        this.IsCMOLatterVisible = false;
        this.CMISDetailbtn = true;
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_10__["IndexModel"]();
        this.filterModel = new src_app_Shared_Model_Master_jankalyanLogMaster_model__WEBPACK_IMPORTED_MODULE_9__["CMISReportFilterModel"]();
        this.displayedColumns = [
            "index",
            "DepartmentName",
            "modulename",
            "NoOfEntyInCMIS",
            "NumberOfCompliance",
            "NumberOfEntriesInJankalyan",
            "NumberofEntries",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentName", Text: "Department" },
            { Value: "modulename", Text: "Module" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.filterTaskCompletedModel = new src_app_Shared_Model_Master_jankalyanLogMaster_model__WEBPACK_IMPORTED_MODULE_9__["CMISReportFilterModel"]();
        this.displayedTaskCompletedColumns = [
            "index",
            "DepartmentName",
            "modulename",
            "NoOfEntyInCMIS",
            "NumberOfCompliance",
            "NumberOfEntriesInJankalyan",
            "NumberofEntries",
        ];
        this.ViewdisplayedTaskCompletedColumns = [
            { Value: "DepartmentName", Text: "Department" },
            { Value: "modulename", Text: "Module" },
        ];
        this.columnsToTaskCompletedDisplay = this.displayedColumns.slice();
        this.displayedProjectColumns = [
            "index",
            "ProjectStatus",
            "ProjectCount",
        ];
        this.ViewdisplayedProjectColumns = [
            { Value: "ProjectStatus", Text: "Project Status" },
        ];
        this.columnsToProjectDisplay = this.displayedProjectColumns.slice();
        this.modIsShowReport = false;
        //#endregion
        this.isAllModuleAreaIdFirst = false;
        this.isTaskCompletedAreaId = false;
        this._appComponet.setpagelayout("", "", "", "", false, true);
        this.type = this._route.snapshot.params.type ? this._route.snapshot.params.type : this.type;
    }
    CmdashboardComponent.prototype.ngOnInit = function () {
        this.dataItem = JSON.parse(sessionStorage.getItem("Transaction"));
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        //this.CheckVisibility();
        var isAuthenticated = JSON.parse(localStorage.getItem("IsLogin"));
        if (isAuthenticated) {
            localStorage.setItem("IsLogin", "false");
            this.openHelpDoc();
        }
        // const modIsShowReport = localStorage.getItem("modIsShowReport");
        // if (modIsShowReport) {
        //   this.modIsShowReport = JSON.parse(modIsShowReport);
        // } else {
        //   if (this.loginData.UserType == "SADM") {
        //     this.modIsShowReport = false;
        //   }
        // }
        // if (this.modIsShowReport) {
        //   if (!sessionStorage.getItem("AllStatusData") && !sessionStorage.getItem("TaskCompletedData")) {
        //     this.GetTaskCompletedList();
        //     this.GetList();
        //   } else {
        //     this.listModel = <ComplianceModuleAndDeptWiseSummaryReportModel[]>(
        //       JSON.parse(sessionStorage.getItem("AllStatusData"))
        //     );
        //     this.dataSource =
        //       new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
        //         this.listModel
        //       );
        //     this.dataSource.sort = this.sort;
        //     this.getTotalRecord();
        //     this.listTaskCompletedModel = <
        //       ComplianceModuleAndDeptWiseSummaryReportModel[]
        //       >(
        //         JSON.parse(sessionStorage.getItem("TaskCompletedData")))
        //     this.dataTaskCompletedSource =
        //       new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
        //         this.listTaskCompletedModel
        //       );
        //     this.dataTaskCompletedSource.sort = this.sort;
        //     this.getTotalTaskCompletedRecord();
        //   }
        //   this.GetProjectList();
        // }
    };
    CmdashboardComponent.prototype.numberOfComplianceClick = function (transaction, module, dept, modulename, departmentName, isStatus) {
        if (isStatus === void 0) { isStatus = false; }
        this.dataItem = transaction;
        sessionStorage.setItem("Transaction", JSON.stringify(transaction));
        var top = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem("DashboardYOffset", String(top));
        if (isStatus) {
            this._router.navigate([
                "master/no-of-ompliance-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/Task Completed" + "/dash-board",
            ]);
        }
        else {
            this._router.navigate(["master/no-of-ompliance-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/dash-board",
            ]);
        }
    };
    CmdashboardComponent.prototype.numberOfEntriesInJankalyanClick = function (transaction, module, dept, modulename, departmentName, numberOfEntry, isStatus) {
        if (isStatus === void 0) { isStatus = false; }
        this.dataItem = transaction;
        sessionStorage.setItem("Transaction", JSON.stringify(transaction));
        var top = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem("DashboardYOffset", String(top));
        if (isStatus) {
            this._router.navigate([
                "master/no-of-entry-in-jankalyan-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/Task Completed" + "/dash-board" + "/" + numberOfEntry,
            ]);
        }
        else {
            this._router.navigate([
                "master/no-of-entry-in-jankalyan-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/dash-board" + "/" + numberOfEntry,
            ]);
        }
    };
    CmdashboardComponent.prototype.getData = function (event) {
        this.modIsShowReport = event;
        if (event) {
            this.GetTaskCompletedList();
            this.GetList();
            this.GetProjectList();
        }
        localStorage.setItem("modIsShowReport", String(this.modIsShowReport));
    };
    CmdashboardComponent.prototype.print = function () {
        var printContents1, printContents2, printContents3, printContents4, printContents5, printContents6, popupWin;
        printContents1 = document.getElementById("cmoletterdiv").innerHTML;
        printContents2 = document.getElementById("cmistaskchartdiv").innerHTML;
        printContents3 = document.getElementById("recruitmentstatusdiv").innerHTML;
        printContents4 = document.getElementById("projectmonitoringdiv").innerHTML;
        printContents5 = document.getElementById("schemedashboarddiv").innerHTML;
        printContents6 = document.getElementById("govtorderdiv").innerHTML;
        popupWin = window.open("", "_blank", "width=auto,height=auto,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no");
        popupWin.document.open();
        popupWin.document
            .write("<html><head></head>    <body onload=\"window.print();window.close()\">\n     <div style=\"text-align:center;\"> <u><b>CMOLetter</b></u><br/></div><div style=padding-top: 20px;style=padding-bottom: 10px;\"> " + printContents1 + " </div><br/>\n     <div style=\"text-align:center;\"> <u><b>CMIS Task</b></u><br/></div><div style=padding-top: 20px;\">" + printContents2 + "</div><br/>\n     <div style=\"text-align:center;\"><u><b>Recruitment Status </b></u><br/> </div> <div style=padding-top:50px;\">" + printContents3 + "</div><br/>\n <div style=\"text-align:center;\"><u><b>Project Monitoring </b></u><br/> </div><div style=padding-top:50px;\"> " + printContents4 + "</div><br/>\n       <div style=\"text-align:center;\"><u><b>Scheme</b></u><br/> </div><div style=padding-top:50px;\"> " + printContents5 + "</div><br/>\n       <div style=\"text-align:center;\"><u><b>Government Order</b></u><br/> </div><div style=padding-top:50px;\"> " + printContents6 + "</div><br/>\n       </body>\n      </html>");
        popupWin.document.close();
    };
    CmdashboardComponent.prototype.CheckVisibility = function () {
        this.IsSchemeVisible =
            this._commonService.IsAccessibleUrl("cmdashboard/scheme");
        this.IsProjectMoniteringVisible = this._commonService.IsAccessibleUrl("cmdashboard/projectmonitering");
        this.IsRecruitmentVisible = this._commonService.IsAccessibleUrl("cmdashboard/recruitmentstatus");
        this.IsGovtorderVisible = this._commonService.IsAccessibleUrl("cmdashboard/Govtorder");
        this.IsCMISTaskVisible = this._commonService.IsAccessibleUrl("cmdashboard/cmistask");
        this.IsCMOLatterVisible = this._commonService.IsAccessibleUrl("cmdashboard/cmolatter");
    };
    CmdashboardComponent.prototype.schemeClick = function () {
        var _this = this;
        sessionStorage.setItem("IsAuthenticate", "true");
        this._commonService.SaveLoginUserLog().subscribe(function (data) { }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CmdashboardComponent.prototype.openHelpDoc = function () {
        this._dialog.open(_master_dashboard_help_document_dashboard_help_document_component__WEBPACK_IMPORTED_MODULE_8__["DashboardHelpDocumentComponent"], {
            width: "1000px",
            disableClose: true,
        });
    };
    //#region <Report>
    /** Gets the total record of all module */
    CmdashboardComponent.prototype.getTotalRecord = function () {
        this.totalNumberOfComplianceCount = this.listModel
            .map(function (t) { return t.NumberOfCompliance; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalNumberOfEntriesInJankalyanCount = this.listModel
            .map(function (t) { return t.NumberOfEntriesInJankalyan; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalNoOfEntyInCMISCount = this.listModel
            .map(function (t) { return t.NoOfEntyInCMIS; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalNumberofEntries = this.listModel
            .map(function (t) { return t.NumberOfEntry; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    CmdashboardComponent.prototype.GetList = function () {
        var _this = this;
        this._jankalyanlogService
            .GetComplianceModuleAndDeptWiseSummaryReport(this.filterModel)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data);
                _this.dataSource =
                    new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalRecord();
                sessionStorage.setItem("AllStatusData", JSON.stringify(_this.listModel));
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CmdashboardComponent.prototype.doubleClick = function (transaction, module, dept) {
        this.dataItem = transaction;
        sessionStorage.setItem("Transaction", JSON.stringify(transaction));
        var top = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem("DashboardYOffset", String(top));
        var dd = module;
        this.CMISDetailbtn = true;
        localStorage.setItem("CMISDetailbtn", JSON.stringify(this.CMISDetailbtn));
        this._router.navigate([
            "detail-report/" + module + "/" + dept + "/dashboard",
        ]);
    };
    //#endregion Methods
    //#region <Task Completed Report>
    /** Gets the total record of all module */
    CmdashboardComponent.prototype.getTotalTaskCompletedRecord = function () {
        this.totalTaskCompletedNumberOfComplianceCount = this.listTaskCompletedModel
            .map(function (t) { return t.NumberOfCompliance; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalTaskCompletedNumberOfEntriesInJankalyanCount =
            this.listTaskCompletedModel
                .map(function (t) { return t.NumberOfEntriesInJankalyan; })
                .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalTaskCompletedNoOfEntyInCMISCount = this.listTaskCompletedModel
            .map(function (t) { return t.NoOfEntyInCMIS; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalTaskCompletedNumberofEntries = this.listTaskCompletedModel
            .map(function (t) { return t.NumberOfEntry; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    CmdashboardComponent.prototype.GetTaskCompletedList = function () {
        var _this = this;
        this.filterTaskCompletedModel.DepartmentStatus = "Task Completed";
        this._jankalyanlogService
            .GetComplianceModuleAndDeptWiseSummaryReport(this.filterTaskCompletedModel)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listTaskCompletedModel = data.Data;
                _this.dataTaskCompletedSource =
                    new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listTaskCompletedModel);
                _this.dataTaskCompletedSource.sort = _this.sort;
                _this.getTotalTaskCompletedRecord();
                sessionStorage.setItem("TaskCompletedData", JSON.stringify(_this.listTaskCompletedModel));
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CmdashboardComponent.prototype.doubleTaskCompletedClick = function (transaction, module, dept) {
        this.dataItem = transaction;
        sessionStorage.setItem("Transaction", JSON.stringify(transaction));
        var top = window.pageYOffset || document.documentElement.scrollTop;
        sessionStorage.setItem("DashboardYOffset", String(top));
        var dd = module;
        this.CMISDetailbtn = true;
        localStorage.setItem("CMISDetailbtn", JSON.stringify(this.CMISDetailbtn));
        this._router.navigate([
            "detail-report/" + module + "/" + dept + "/Task Completed" + "/dashboard",
        ]);
    };
    CmdashboardComponent.prototype.GetProjectList = function () {
        var _this = this;
        this._jankalyanlogService.GetJankalyanProjectReport().subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ProjectlistModel = (data.Data);
                _this.datataskProjectSource =
                    new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.ProjectlistModel);
                _this.datataskProjectSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CmdashboardComponent.prototype.getTotalCost = function () {
        this.totalstatusCount = this.ProjectlistModel.map(function (t) { return t.ProjectCount; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    CmdashboardComponent.prototype.ngAfterViewInit = function () {
        if (Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInner"))) && !this.isAllModuleAreaIdFirst) {
            document.getElementById('allModuleAreaId').scrollTop = Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInner")));
            sessionStorage.removeItem("DashboardYOffsetInner");
            this.isAllModuleAreaIdFirst = true;
        }
        if (Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInnerTaskCompleted"))) && !this.isTaskCompletedAreaId) {
            document.getElementById('taskCompletedAreaId').scrollTop = Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInnerTaskCompleted")));
            sessionStorage.removeItem("DashboardYOffsetInnerTaskCompleted");
            this.isTaskCompletedAreaId = true;
        }
        document.getElementById('allModuleAreaId').addEventListener('scroll', function () {
            sessionStorage.setItem("DashboardYOffsetInner", String(this.scrollTop));
        });
        document.getElementById('taskCompletedAreaId').addEventListener('scroll', function () {
            sessionStorage.setItem("DashboardYOffsetInnerTaskCompleted", String(this.scrollTop));
        });
    };
    CmdashboardComponent.prototype.isdataMatch = function (rowData) {
        if (this.dataItem.Nodal_Department == rowData.Nodal_Department && this.dataItem.ModuleID == rowData.ModuleID) {
            return true;
        }
        return false;
    };
    CmdashboardComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_2__["GoogleChartService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] },
        { type: src_app_Shared_Service_jankalyanlog_service__WEBPACK_IMPORTED_MODULE_11__["JankalyanlogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CmdashboardComponent.prototype, "sort", void 0);
    CmdashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: "app-cmdashboard",
            template: __webpack_require__(/*! raw-loader!./cmdashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmdashboard.component.html"),
            providers: [],
            styles: [__webpack_require__(/*! ./cmdashboard.component.css */ "./src/app/content/cmdashboard/cmdashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_2__["GoogleChartService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"],
            src_app_Shared_Service_jankalyanlog_service__WEBPACK_IMPORTED_MODULE_11__["JankalyanlogService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"]])
    ], CmdashboardComponent);
    return CmdashboardComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmdashboard.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/content/cmdashboard/cmdashboard.module.ts ***!
  \***********************************************************/
/*! exports provided: CmdashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdashboardModule", function() { return CmdashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _cmoletter_cmoletter_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cmoletter/cmoletter.component */ "./src/app/content/cmdashboard/cmoletter/cmoletter.component.ts");
/* harmony import */ var _cmdashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cmdashboard.component */ "./src/app/content/cmdashboard/cmdashboard.component.ts");
/* harmony import */ var _cmdashboard_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cmdashboard-routing.module */ "./src/app/content/cmdashboard/cmdashboard-routing.module.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _cmistask_cmistask_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cmistask/cmistask.component */ "./src/app/content/cmdashboard/cmistask/cmistask.component.ts");
/* harmony import */ var _recruitmentstatus_recruitmentstatus_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./recruitmentstatus/recruitmentstatus.component */ "./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.ts");
/* harmony import */ var _project_monitoring_project_monitoring_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./project-monitoring/project-monitoring.component */ "./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.ts");
/* harmony import */ var _filter_dailog_filter_dailog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./filter-dailog/filter-dailog.component */ "./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _schemedashboard_schemedashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./schemedashboard/schemedashboard.component */ "./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.ts");
/* harmony import */ var _cmistask_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cmistask/filter/filter.component */ "./src/app/content/cmdashboard/cmistask/filter/filter.component.ts");
/* harmony import */ var _recruitmentstatus_recruitment_status_filter_recruitment_status_filter_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component */ "./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.ts");
/* harmony import */ var _project_monitoring_projectmonitoring_filter_projectmonitoring_filter_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component */ "./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.ts");
/* harmony import */ var _cmoletter_zoom_cmoletterdailog_zoom_cmoletterdailog_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component */ "./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.ts");
/* harmony import */ var _govt_order_dashboard_govt_order_dashboard_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./govt-order-dashboard/govt-order-dashboard.component */ "./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.ts");
/* harmony import */ var _cmistask_zoomcmistaskdailog_zoomcmistaskdailog_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component */ "./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.ts");
/* harmony import */ var _schemedashboard_schemedashboardzoomdailog_schemedashboardzoomdailog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component */ "./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.ts");
/* harmony import */ var _govt_order_dashboard_zoomgovtorderdashboard_zoomgovtorderdashboard_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component */ "./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.ts");
/* harmony import */ var _project_monitoring_zoomprojectmonitoring_zoomprojectmonitoring_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component */ "./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.ts");
/* harmony import */ var _recruitmentstatus_zoomrecruitmentstatus_zoomrecruitmentstatus_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component */ "./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.ts");
/* harmony import */ var _master_dashboard_help_document_dashboard_help_document_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../master/dashboard-help-document/dashboard-help-document.component */ "./src/app/content/master/dashboard-help-document/dashboard-help-document.component.ts");
























var CmdashboardModule = /** @class */ (function () {
    function CmdashboardModule() {
    }
    CmdashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _cmoletter_cmoletter_component__WEBPACK_IMPORTED_MODULE_3__["CmoletterComponent"],
                _cmdashboard_component__WEBPACK_IMPORTED_MODULE_4__["CmdashboardComponent"],
                _cmistask_cmistask_component__WEBPACK_IMPORTED_MODULE_7__["CmistaskComponent"],
                _recruitmentstatus_recruitmentstatus_component__WEBPACK_IMPORTED_MODULE_8__["RecruitmentStatusComponent"],
                _project_monitoring_project_monitoring_component__WEBPACK_IMPORTED_MODULE_9__["ProjectMonitoringComponent"],
                _filter_dailog_filter_dailog_component__WEBPACK_IMPORTED_MODULE_10__["FilterDailogComponent"],
                _schemedashboard_schemedashboard_component__WEBPACK_IMPORTED_MODULE_12__["SchemedashboardComponent"],
                _cmistask_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__["FilterComponent"],
                _cmistask_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__["FilterComponent"],
                _recruitmentstatus_recruitment_status_filter_recruitment_status_filter_component__WEBPACK_IMPORTED_MODULE_14__["RecruitmentStatusFilterComponent"],
                _project_monitoring_projectmonitoring_filter_projectmonitoring_filter_component__WEBPACK_IMPORTED_MODULE_15__["ProjectmonitoringFilterComponent"],
                _cmoletter_zoom_cmoletterdailog_zoom_cmoletterdailog_component__WEBPACK_IMPORTED_MODULE_16__["ZoomCMOLetterdailogComponent"],
                _govt_order_dashboard_govt_order_dashboard_component__WEBPACK_IMPORTED_MODULE_17__["GovtOrderDashboardComponent"],
                _cmistask_zoomcmistaskdailog_zoomcmistaskdailog_component__WEBPACK_IMPORTED_MODULE_18__["ZoomcmistaskdailogComponent"],
                _schemedashboard_schemedashboardzoomdailog_schemedashboardzoomdailog_component__WEBPACK_IMPORTED_MODULE_19__["SchemedashboardzoomdailogComponent"],
                _govt_order_dashboard_zoomgovtorderdashboard_zoomgovtorderdashboard_component__WEBPACK_IMPORTED_MODULE_20__["ZOOMgovtorderdashboardComponent"],
                _project_monitoring_zoomprojectmonitoring_zoomprojectmonitoring_component__WEBPACK_IMPORTED_MODULE_21__["ZOOMProjectmonitoringComponent"],
                _recruitmentstatus_zoomrecruitmentstatus_zoomrecruitmentstatus_component__WEBPACK_IMPORTED_MODULE_22__["ZoomrecruitmentstatusComponent"],
                _master_dashboard_help_document_dashboard_help_document_component__WEBPACK_IMPORTED_MODULE_23__["DashboardHelpDocumentComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _cmdashboard_routing_module__WEBPACK_IMPORTED_MODULE_5__["CmdashboardRoutingModule"],
                src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_6__["AppMaterialModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"]
            ],
            entryComponents: [
                _cmistask_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__["FilterComponent"],
                _recruitmentstatus_recruitment_status_filter_recruitment_status_filter_component__WEBPACK_IMPORTED_MODULE_14__["RecruitmentStatusFilterComponent"],
                _project_monitoring_projectmonitoring_filter_projectmonitoring_filter_component__WEBPACK_IMPORTED_MODULE_15__["ProjectmonitoringFilterComponent"],
                _cmoletter_zoom_cmoletterdailog_zoom_cmoletterdailog_component__WEBPACK_IMPORTED_MODULE_16__["ZoomCMOLetterdailogComponent"],
                _cmistask_zoomcmistaskdailog_zoomcmistaskdailog_component__WEBPACK_IMPORTED_MODULE_18__["ZoomcmistaskdailogComponent"],
                _schemedashboard_schemedashboardzoomdailog_schemedashboardzoomdailog_component__WEBPACK_IMPORTED_MODULE_19__["SchemedashboardzoomdailogComponent"],
                _govt_order_dashboard_zoomgovtorderdashboard_zoomgovtorderdashboard_component__WEBPACK_IMPORTED_MODULE_20__["ZOOMgovtorderdashboardComponent"],
                _project_monitoring_zoomprojectmonitoring_zoomprojectmonitoring_component__WEBPACK_IMPORTED_MODULE_21__["ZOOMProjectmonitoringComponent"],
                _recruitmentstatus_zoomrecruitmentstatus_zoomrecruitmentstatus_component__WEBPACK_IMPORTED_MODULE_22__["ZoomrecruitmentstatusComponent"],
                _master_dashboard_help_document_dashboard_help_document_component__WEBPACK_IMPORTED_MODULE_23__["DashboardHelpDocumentComponent"]
            ],
            exports: [],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]]
        })
    ], CmdashboardModule);
    return CmdashboardModule;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmistask/cmistask.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmistask/cmistask.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvY21pc3Rhc2svY21pc3Rhc2suY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/cmdashboard/cmistask/cmistask.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmistask/cmistask.component.ts ***!
  \********************************************************************/
/*! exports provided: CmistaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmistaskComponent", function() { return CmistaskComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../Shared/Service/CMISTask.sercice */ "./src/app/Shared/Service/CMISTask.sercice.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./filter/filter.component */ "./src/app/content/cmdashboard/cmistask/filter/filter.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _zoomcmistaskdailog_zoomcmistaskdailog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./zoomcmistaskdailog/zoomcmistaskdailog.component */ "./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.ts");











var CmistaskComponent = /** @class */ (function () {
    function CmistaskComponent(_appComponet, _cmistaskService, _route, gChartService, _authService, dialog, datepipe) {
        this._appComponet = _appComponet;
        this._cmistaskService = _cmistaskService;
        this._route = _route;
        this.gChartService = gChartService;
        this._authService = _authService;
        this.dialog = dialog;
        this.datepipe = datepipe;
        this.type = "table";
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Task",
            "Total Announcement",
            "No Action Taken",
            "Task Initiated",
            "Sanction Issued",
            "Task in Progress",
            "Not Feasible",
            "Continuous Nature",
            "Task Completed"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
        this._appComponet.setpagelayout("", "", "", "", true, true);
    }
    // events on slice click
    CmistaskComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    CmistaskComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    CmistaskComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    CmistaskComponent.prototype.ngOnInit = function () { };
    CmistaskComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    CmistaskComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    CmistaskComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "55%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("cmistaskchartdiv"));
        chart.draw(data, options);
    };
    CmistaskComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("cmistaskchartdiv"));
        chart.draw(data, options);
    };
    CmistaskComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("cmistaskchartdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    CmistaskComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("cmistaskchartdiv"));
        chart.draw(data, options);
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](this.CMISTaskList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    CmistaskComponent.prototype.GetList = function () {
        var _this = this;
        this._cmistaskService
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                _this.CMISTaskList = data.Data;
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Task,
                        element.TotalAnnouncement,
                        element.NoActionTaken,
                        element.TaskInitiated,
                        element.SanctionIssued,
                        element.TaskinProgress,
                        element.NotFeasible,
                        element.ContinuousNature,
                        element.TaskCompleted
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    CmistaskComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            is3D: true,
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6],
                        element[7],
                        element[8]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("cmistaskchartdiv"));
            chart.draw(data, options);
        }
    };
    CmistaskComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    CmistaskComponent.prototype.openZoomDialog = function () {
        var dialogRef = this.dialog.open(_zoomcmistaskdailog_zoomcmistaskdailog_component__WEBPACK_IMPORTED_MODULE_10__["ZoomcmistaskdailogComponent"], {
            width: "95%",
            height: "95%",
            data: this.type
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    CmistaskComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__["FilterComponent"], {
            width: "500px",
            data: { startDate: null, endDate: null }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.startDate = _this.datepipe.transform(result.startDate, "MM-dd-yyyy"); // <string>result.startDate;
            _this.endDate = _this.datepipe.transform(result.endDate, "MM-dd-yyyy"); //<string>result.endDate;
            _this.GetList();
        });
    };
    CmistaskComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: _Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_2__["CMISTaskService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], CmistaskComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], CmistaskComponent.prototype, "sort", void 0);
    CmistaskComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"])({
            selector: "app-cmistask",
            template: __webpack_require__(/*! raw-loader!./cmistask.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmistask/cmistask.component.html"),
            providers: [_Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_2__["CMISTaskService"]],
            styles: [__webpack_require__(/*! ./cmistask.component.css */ "./src/app/content/cmdashboard/cmistask/cmistask.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_2__["CMISTaskService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"]])
    ], CmistaskComponent);
    return CmistaskComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmistask/filter/filter.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmistask/filter/filter.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvY21pc3Rhc2svZmlsdGVyL2ZpbHRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/cmistask/filter/filter.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmistask/filter/filter.component.ts ***!
  \*************************************************************************/
/*! exports provided: FilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterComponent", function() { return FilterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



var FilterComponent = /** @class */ (function () {
    // startDate: Date;
    // endDate: Date;
    function FilterComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    FilterComponent.prototype.ngOnInit = function () { };
    FilterComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    FilterComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    FilterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-filter",
            template: __webpack_require__(/*! raw-loader!./filter.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmistask/filter/filter.component.html"),
            styles: [__webpack_require__(/*! ./filter.component.css */ "./src/app/content/cmdashboard/cmistask/filter/filter.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], FilterComponent);
    return FilterComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.css":
/*!**************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvY21pc3Rhc2svem9vbWNtaXN0YXNrZGFpbG9nL3pvb21jbWlzdGFza2RhaWxvZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: ZoomcmistaskdailogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomcmistaskdailogComponent", function() { return ZoomcmistaskdailogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/CMISTask.sercice */ "./src/app/Shared/Service/CMISTask.sercice.ts");







var ZoomcmistaskdailogComponent = /** @class */ (function () {
    function ZoomcmistaskdailogComponent(_cmistaskService, _route, gChartService, _authService, dialog, type) {
        this._cmistaskService = _cmistaskService;
        this._route = _route;
        this.gChartService = gChartService;
        this._authService = _authService;
        this.dialog = dialog;
        this.type = type;
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Task",
            "Total Announcement",
            "No Action Taken",
            "Task Initiated",
            "Sanction Issued",
            "Task in Progress",
            "Not Feasible",
            "Continuous Nature",
            "Task Completed"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
    }
    // events on slice click
    ZoomcmistaskdailogComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    ZoomcmistaskdailogComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ZoomcmistaskdailogComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    ZoomcmistaskdailogComponent.prototype.ngOnInit = function () { };
    ZoomcmistaskdailogComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    ZoomcmistaskdailogComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    ZoomcmistaskdailogComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.LineChart(document.getElementById("cmistaskchartZoomdiv"));
        chart.draw(data, options);
    };
    ZoomcmistaskdailogComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "90%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("cmistaskchartZoomdiv"));
        chart.draw(data, options);
    };
    ZoomcmistaskdailogComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("cmistaskchartZoomdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    ZoomcmistaskdailogComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("cmistaskchartZoomdiv"));
        chart.draw(data, options);
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.CMISTaskList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ZoomcmistaskdailogComponent.prototype.GetList = function () {
        var _this = this;
        this._cmistaskService
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                _this.CMISTaskList = data.Data;
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Task,
                        element.TotalAnnouncement,
                        element.NoActionTaken,
                        element.TaskInitiated,
                        element.SanctionIssued,
                        element.TaskinProgress,
                        element.NotFeasible,
                        element.ContinuousNature,
                        element.TaskCompleted
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    ZoomcmistaskdailogComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            is3D: true,
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6],
                        element[7],
                        element[8]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("cmistaskchartZoomdiv"));
            chart.draw(data, options);
        }
    };
    ZoomcmistaskdailogComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    ZoomcmistaskdailogComponent.prototype.oncloseClick = function () {
        this.dialog.close();
    };
    ZoomcmistaskdailogComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_6__["CMISTaskService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_4__["GoogleChartService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ZoomcmistaskdailogComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ZoomcmistaskdailogComponent.prototype, "sort", void 0);
    ZoomcmistaskdailogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-zoomcmistaskdailog",
            template: __webpack_require__(/*! raw-loader!./zoomcmistaskdailog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.html"),
            styles: [__webpack_require__(/*! ./zoomcmistaskdailog.component.css */ "./src/app/content/cmdashboard/cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_CMISTask_sercice__WEBPACK_IMPORTED_MODULE_6__["CMISTaskService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_4__["GoogleChartService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String])
    ], ZoomcmistaskdailogComponent);
    return ZoomcmistaskdailogComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmoletter/cmoletter.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmoletter/cmoletter.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvY21vbGV0dGVyL2Ntb2xldHRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/cmoletter/cmoletter.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmoletter/cmoletter.component.ts ***!
  \**********************************************************************/
/*! exports provided: CmoletterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmoletterComponent", function() { return CmoletterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/CMOLetter.service */ "./src/app/Shared/Service/CMOLetter.service.ts");
/* harmony import */ var _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _zoom_cmoletterdailog_zoom_cmoletterdailog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./zoom-cmoletterdailog/zoom-cmoletterdailog.component */ "./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.ts");










var CmoletterComponent = /** @class */ (function () {
    function CmoletterComponent(
    // private _appComponet: AppComponent,
    _cmoletterService, _route, gChartService, dialog, _authService) {
        this._cmoletterService = _cmoletterService;
        this._route = _route;
        this.gChartService = gChartService;
        this.dialog = dialog;
        this._authService = _authService;
        this.closable = true;
        this.type = "pie";
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Module Name",
            "Total Status",
            "Disposed Status",
            "Pending Status",
            "Age Wise Pendency Status"
        ];
        this.ViewdisplayedColumns = [
            { Value: "Module Name", Text: "Particular." },
            { Value: "TotalStatus", Text: "Total Cases" },
            { Value: "DisposedStatus", Text: "Disposed" },
            { Value: "PendingStatus", Text: "Pending" },
            { Value: "AgeWisePendencyStatus", Text: "Age Wise Pendency" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.pieChartLabels = [
            "TotalStatus",
            "DisposedStatus",
            "PendingStatus",
            "AgeWisePendencyStatus"
        ];
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
        // this._appComponet.setpagelayout("", "", " ", " ", true, true);
    }
    CmoletterComponent.prototype.ngOnInit = function () { };
    CmoletterComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    CmoletterComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type === "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type === "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type === "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type === "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    CmoletterComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = {
            chartArea: { width: "60%", height: "70%" }
        };
        chart = new this.gLib.visualization.LineChart(document.getElementById("cmoletterdiv"));
        chart.draw(data, options);
    };
    CmoletterComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = {
            chartArea: { width: "60%", height: "70%" }
        };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("cmoletterdiv"));
        chart.draw(data, options);
    };
    CmoletterComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("cmoletterdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    CmoletterComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        //options = { chartArea: { width: "90%", height: "100%" } };
        options = { width: 600, height: 200 };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("cmoletterdiv"));
        chart.draw(data, options);
    };
    CmoletterComponent.prototype.GetList = function () {
        var _this = this;
        this._cmoletterService
            .GetById(this.loginData.DepartmentCodes)
            .subscribe(function (data) {
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.ModuleName,
                        element.TotalStatus,
                        element.DisposedStatus,
                        element.PendingStatus,
                        element.AgeWisePendencyStatus
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    CmoletterComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            is3D: true,
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("cmoletterdiv"));
            chart.draw(data, options);
        }
    };
    CmoletterComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    CmoletterComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(_zoom_cmoletterdailog_zoom_cmoletterdailog_component__WEBPACK_IMPORTED_MODULE_9__["ZoomCMOLetterdailogComponent"], {
            width: "95%",
            height: "95%",
            data: this.type
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    CmoletterComponent.ctorParameters = function () { return [
        { type: _Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_1__["CMOLetterService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_8__["GoogleChartService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] },
        { type: _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CmoletterComponent.prototype, "closable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], CmoletterComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"])
    ], CmoletterComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
    ], CmoletterComponent.prototype, "sort", void 0);
    CmoletterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: "app-cmoletter",
            template: __webpack_require__(/*! raw-loader!./cmoletter.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmoletter/cmoletter.component.html"),
            providers: [_Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_1__["CMOLetterService"]],
            styles: [__webpack_require__(/*! ./cmoletter.component.css */ "./src/app/content/cmdashboard/cmoletter/cmoletter.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_1__["CMOLetterService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_8__["GoogleChartService"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"],
            _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], CmoletterComponent);
    return CmoletterComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvY21vbGV0dGVyL3pvb20tY21vbGV0dGVyZGFpbG9nL3pvb20tY21vbGV0dGVyZGFpbG9nLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: ZoomCMOLetterdailogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomCMOLetterdailogComponent", function() { return ZoomCMOLetterdailogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/CMOLetter.service */ "./src/app/Shared/Service/CMOLetter.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");







var ZoomCMOLetterdailogComponent = /** @class */ (function () {
    function ZoomCMOLetterdailogComponent(_cmoletterService, _route, gChartService, dialog, type, _authService) {
        this._cmoletterService = _cmoletterService;
        this._route = _route;
        this.gChartService = gChartService;
        this.dialog = dialog;
        this.type = type;
        this._authService = _authService;
        this.closable = true;
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Module Name",
            "Total Status",
            "Disposed Status",
            "Pending Status",
            "Age Wise Pendency Status"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.pieChartLabels = [
            "TotalStatus",
            "DisposedStatus",
            "PendingStatus",
            "AgeWisePendencyStatus"
        ];
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
    }
    ZoomCMOLetterdailogComponent.prototype.ngOnInit = function () { };
    ZoomCMOLetterdailogComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    ZoomCMOLetterdailogComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type === "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type === "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type === "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type === "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    ZoomCMOLetterdailogComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = {
            chartArea: { width: "60%", height: "90%" }
        };
        chart = new this.gLib.visualization.LineChart(document.getElementById("cmoletterZoomdiv"));
        chart.draw(data, options);
    };
    ZoomCMOLetterdailogComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = {
            chartArea: { width: "60%", height: "80%" }
        };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("cmoletterZoomdiv"));
        chart.draw(data, options);
    };
    ZoomCMOLetterdailogComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("cmoletterZoomdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    ZoomCMOLetterdailogComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        options = { width: 600, height: 200 };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("cmoletterZoomdiv"));
        chart.draw(data, options);
    };
    ZoomCMOLetterdailogComponent.prototype.GetList = function () {
        var _this = this;
        this._cmoletterService
            .GetById(this.loginData.DepartmentCodes)
            .subscribe(function (data) {
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.ModuleName,
                        element.TotalStatus,
                        element.DisposedStatus,
                        element.PendingStatus,
                        element.AgeWisePendencyStatus
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    ZoomCMOLetterdailogComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            is3D: true,
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("cmoletterZoomdiv"));
            chart.draw(data, options);
        }
    };
    ZoomCMOLetterdailogComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    ZoomCMOLetterdailogComponent.prototype.oncloseClick = function () {
        this.dialog.close();
    };
    ZoomCMOLetterdailogComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_3__["CMOLetterService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ZoomCMOLetterdailogComponent.prototype, "closable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ZoomCMOLetterdailogComponent.prototype, "visible", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ZoomCMOLetterdailogComponent.prototype, "visibleChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ZoomCMOLetterdailogComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ZoomCMOLetterdailogComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ZoomCMOLetterdailogComponent.prototype, "sort", void 0);
    ZoomCMOLetterdailogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-zoom-cmoletterdailog",
            template: __webpack_require__(/*! raw-loader!./zoom-cmoletterdailog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.html"),
            styles: [__webpack_require__(/*! ./zoom-cmoletterdailog.component.css */ "./src/app/content/cmdashboard/cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_CMOLetter_service__WEBPACK_IMPORTED_MODULE_3__["CMOLetterService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String, src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]])
    ], ZoomCMOLetterdailogComponent);
    return ZoomCMOLetterdailogComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvZmlsdGVyLWRhaWxvZy9maWx0ZXItZGFpbG9nLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.ts ***!
  \******************************************************************************/
/*! exports provided: FilterDailogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterDailogComponent", function() { return FilterDailogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FilterDailogComponent = /** @class */ (function () {
    function FilterDailogComponent() {
        this.maxDate = new Date();
    }
    FilterDailogComponent.prototype.ngOnInit = function () {
    };
    FilterDailogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-filter-dailog',
            template: __webpack_require__(/*! raw-loader!./filter-dailog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.html"),
            styles: [__webpack_require__(/*! ./filter-dailog.component.css */ "./src/app/content/cmdashboard/filter-dailog/filter-dailog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FilterDailogComponent);
    return FilterDailogComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvZ292dC1vcmRlci1kYXNoYm9hcmQvZ292dC1vcmRlci1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.ts ***!
  \********************************************************************************************/
/*! exports provided: GovtOrderDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GovtOrderDashboardComponent", function() { return GovtOrderDashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_govtorderdashboard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/govtorderdashboard.service */ "./src/app/Shared/Service/govtorderdashboard.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _zoomgovtorderdashboard_zoomgovtorderdashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./zoomgovtorderdashboard/zoomgovtorderdashboard.component */ "./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.ts");









var GovtOrderDashboardComponent = /** @class */ (function () {
    function GovtOrderDashboardComponent(_appComponet, _govtorderdashboardService, _route, gChartService, dialog, 
    // public datepipe: DatePipe,
    _authService) {
        this._appComponet = _appComponet;
        this._govtorderdashboardService = _govtorderdashboardService;
        this._route = _route;
        this.gChartService = gChartService;
        this.dialog = dialog;
        this._authService = _authService;
        this.type = "pie";
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Department",
            "Total",
            "CM Directions",
            "CM Announcements",
            "Budget Announcements",
            "Cabinet Decisions ",
            "Jan Ghoshna Patra",
            "General Office Order"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
        this._appComponet.setpagelayout("", "", "", "", true, true);
    }
    // events on slice click
    GovtOrderDashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    GovtOrderDashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    GovtOrderDashboardComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    GovtOrderDashboardComponent.prototype.ngOnInit = function () { };
    GovtOrderDashboardComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    GovtOrderDashboardComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    GovtOrderDashboardComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "60%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("govtorderdiv"));
        chart.draw(data, options);
    };
    GovtOrderDashboardComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("govtorderdiv"));
        chart.draw(data, options);
    };
    GovtOrderDashboardComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("govtorderdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    GovtOrderDashboardComponent.prototype.drawTableChart = function () {
        // const options = { chartArea: { width: "60%", height: "70%" } };
        var options = { width: "600", height: "220" };
        var data = this.gLib.visualization.arrayToDataTable(this.newArray);
        var chart = new this.gLib.visualization.Table(document.getElementById("govtorderdiv"));
        chart.draw(data, options);
    };
    GovtOrderDashboardComponent.prototype.GetList = function () {
        var _this = this;
        this._govtorderdashboardService
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Department,
                        element.Total,
                        element.CMDirections,
                        element.CMAnnouncements,
                        element.BudgetAnnouncements,
                        element.CabinetDecisions,
                        element.JanGhoshnaPatra,
                        element.JanGhoshnaPatra
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    GovtOrderDashboardComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            chartArea: { width: "100%", height: "100%" },
            is3D: true
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("govtorderdiv"));
            chart.draw(data, options);
        }
    };
    GovtOrderDashboardComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    GovtOrderDashboardComponent.prototype.openZoomDialog = function () {
        var dialogRef = this.dialog.open(_zoomgovtorderdashboard_zoomgovtorderdashboard_component__WEBPACK_IMPORTED_MODULE_8__["ZOOMgovtorderdashboardComponent"], {
            width: "95%",
            height: "95%",
            data: this.type
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    GovtOrderDashboardComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
        { type: src_app_Shared_Service_govtorderdashboard_service__WEBPACK_IMPORTED_MODULE_6__["govtorderdashboardService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_4__["GoogleChartService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], GovtOrderDashboardComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], GovtOrderDashboardComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], GovtOrderDashboardComponent.prototype, "sort", void 0);
    GovtOrderDashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-govt-order-dashboard",
            template: __webpack_require__(/*! raw-loader!./govt-order-dashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./govt-order-dashboard.component.css */ "./src/app/content/cmdashboard/govt-order-dashboard/govt-order-dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            src_app_Shared_Service_govtorderdashboard_service__WEBPACK_IMPORTED_MODULE_6__["govtorderdashboardService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_4__["GoogleChartService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], GovtOrderDashboardComponent);
    return GovtOrderDashboardComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.css":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvZ292dC1vcmRlci1kYXNoYm9hcmQvem9vbWdvdnRvcmRlcmRhc2hib2FyZC96b29tZ292dG9yZGVyZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: ZOOMgovtorderdashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZOOMgovtorderdashboardComponent", function() { return ZOOMgovtorderdashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_govtorderdashboard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/govtorderdashboard.service */ "./src/app/Shared/Service/govtorderdashboard.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");







var ZOOMgovtorderdashboardComponent = /** @class */ (function () {
    function ZOOMgovtorderdashboardComponent(_govtorderdashboardService, _route, gChartService, dialog, type, 
    // public datepipe: DatePipe,
    _authService) {
        this._govtorderdashboardService = _govtorderdashboardService;
        this._route = _route;
        this.gChartService = gChartService;
        this.dialog = dialog;
        this.type = type;
        this._authService = _authService;
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Department",
            "Total",
            "CM Directions",
            "CM Announcements",
            "Budget Announcements",
            "Cabinet Decisions ",
            "Jan Ghoshna Patra",
            "General Office Order"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
    }
    // events on slice click
    ZOOMgovtorderdashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    ZOOMgovtorderdashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ZOOMgovtorderdashboardComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    ZOOMgovtorderdashboardComponent.prototype.ngOnInit = function () { };
    ZOOMgovtorderdashboardComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    ZOOMgovtorderdashboardComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    ZOOMgovtorderdashboardComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "60%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("govtorderdashboardzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMgovtorderdashboardComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("govtorderdashboardzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMgovtorderdashboardComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("govtorderdashboardzoomdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    ZOOMgovtorderdashboardComponent.prototype.drawTableChart = function () {
        var options = { chartArea: { width: "60%", height: "70%" } };
        var data = this.gLib.visualization.arrayToDataTable(this.newArray);
        var chart = new this.gLib.visualization.Table(document.getElementById("govtorderdashboardzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMgovtorderdashboardComponent.prototype.GetList = function () {
        var _this = this;
        this._govtorderdashboardService
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Department,
                        element.Total,
                        element.CMDirections,
                        element.CMAnnouncements,
                        element.BudgetAnnouncements,
                        element.CabinetDecisions,
                        element.JanGhoshnaPatra,
                        element.JanGhoshnaPatra
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    ZOOMgovtorderdashboardComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            chartArea: { width: "100%", height: "100%" },
            is3D: true
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("govtorderdashboardzoomdiv"));
            chart.draw(data, options);
        }
    };
    ZOOMgovtorderdashboardComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    ZOOMgovtorderdashboardComponent.prototype.oncloseClick = function () {
        this.dialog.close();
    };
    ZOOMgovtorderdashboardComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_govtorderdashboard_service__WEBPACK_IMPORTED_MODULE_3__["govtorderdashboardService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ZOOMgovtorderdashboardComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ZOOMgovtorderdashboardComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ZOOMgovtorderdashboardComponent.prototype, "sort", void 0);
    ZOOMgovtorderdashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-zoomgovtorderdashboard",
            template: __webpack_require__(/*! raw-loader!./zoomgovtorderdashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.html"),
            styles: [__webpack_require__(/*! ./zoomgovtorderdashboard.component.css */ "./src/app/content/cmdashboard/govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_govtorderdashboard_service__WEBPACK_IMPORTED_MODULE_3__["govtorderdashboardService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String, src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]])
    ], ZOOMgovtorderdashboardComponent);
    return ZOOMgovtorderdashboardComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvcHJvamVjdC1tb25pdG9yaW5nL3Byb2plY3QtbW9uaXRvcmluZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ProjectMonitoringComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectMonitoringComponent", function() { return ProjectMonitoringComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _Shared_Service_ProjectMonitoring_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../Shared/Service/ProjectMonitoring.service */ "./src/app/Shared/Service/ProjectMonitoring.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _projectmonitoring_filter_projectmonitoring_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projectmonitoring-filter/projectmonitoring-filter.component */ "./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.ts");
/* harmony import */ var _zoomprojectmonitoring_zoomprojectmonitoring_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./zoomprojectmonitoring/zoomprojectmonitoring.component */ "./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.ts");











var ProjectMonitoringComponent = /** @class */ (function () {
    function ProjectMonitoringComponent(_appComponet, _projectmonitoringservice, _route, gChartService, dialog, datepipe, _authService) {
        this._appComponet = _appComponet;
        this._projectmonitoringservice = _projectmonitoringservice;
        this._route = _route;
        this.gChartService = gChartService;
        this.dialog = dialog;
        this.datepipe = datepipe;
        this._authService = _authService;
        this.type = "bar";
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Department",
            "Total No. Of Ongoing Projects",
            "Total Project Cost",
            "0-3 Month",
            "4-6 Month",
            "7-12 Month",
            "Projects Require High Level Intervention"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
        this._appComponet.setpagelayout("", "", "", "", true, true);
    }
    // events on slice click
    ProjectMonitoringComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    ProjectMonitoringComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ProjectMonitoringComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    ProjectMonitoringComponent.prototype.ngOnInit = function () { };
    ProjectMonitoringComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    ProjectMonitoringComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    ProjectMonitoringComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "60%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("projectmonitoringdiv"));
        chart.draw(data, options);
    };
    ProjectMonitoringComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("projectmonitoringdiv"));
        chart.draw(data, options);
    };
    ProjectMonitoringComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("projectmonitoringdiv"));
        chart.draw(data, options);
    };
    ProjectMonitoringComponent.prototype.drawTableChart = function () {
        // const options = { chartArea: { width: "60%", height: "70%" } };
        var options = { width: "600", height: "220" };
        var data = this.gLib.visualization.arrayToDataTable(this.newArray);
        var chart = new this.gLib.visualization.Table(document.getElementById("projectmonitoringdiv"));
        chart.draw(data, options);
    };
    ProjectMonitoringComponent.prototype.GetList = function () {
        var _this = this;
        this._projectmonitoringservice
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Department,
                        element.OnGoingProject,
                        element.TotalProjectCost,
                        element.WithinThreeMonth,
                        element.WithinSixMonth,
                        element.WithinYearMonth,
                        element.ProjectReqIntervention
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    ProjectMonitoringComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("projectmonitoringdiv"));
            chart.draw(data, options);
        }
    };
    ProjectMonitoringComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    ProjectMonitoringComponent.prototype.openZoomDialog = function () {
        var dialogRef = this.dialog.open(_zoomprojectmonitoring_zoomprojectmonitoring_component__WEBPACK_IMPORTED_MODULE_10__["ZOOMProjectmonitoringComponent"], {
            width: "95%",
            height: "95%",
            data: this.type
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    ProjectMonitoringComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_projectmonitoring_filter_projectmonitoring_filter_component__WEBPACK_IMPORTED_MODULE_9__["ProjectmonitoringFilterComponent"], {
            width: "500px",
            data: { startDate: null, endDate: null }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.startDate = _this.datepipe.transform(result.startDate, "MM-dd-yyyy"); // <string>result.startDate;
            _this.endDate = _this.datepipe.transform(result.endDate, "MM-dd-yyyy"); //<string>result.endDate;
            _this.GetList();
        });
    };
    ProjectMonitoringComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _Shared_Service_ProjectMonitoring_service__WEBPACK_IMPORTED_MODULE_2__["ProjectMonitoringService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ProjectMonitoringComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"])
    ], ProjectMonitoringComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"])
    ], ProjectMonitoringComponent.prototype, "sort", void 0);
    ProjectMonitoringComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: "app-project-monitoring",
            template: __webpack_require__(/*! raw-loader!./project-monitoring.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.html"),
            styles: [__webpack_require__(/*! ./project-monitoring.component.css */ "./src/app/content/cmdashboard/project-monitoring/project-monitoring.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _Shared_Service_ProjectMonitoring_service__WEBPACK_IMPORTED_MODULE_2__["ProjectMonitoringService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"]])
    ], ProjectMonitoringComponent);
    return ProjectMonitoringComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.css":
/*!************************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvcHJvamVjdC1tb25pdG9yaW5nL3Byb2plY3Rtb25pdG9yaW5nLWZpbHRlci9wcm9qZWN0bW9uaXRvcmluZy1maWx0ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.ts ***!
  \***********************************************************************************************************************/
/*! exports provided: ProjectmonitoringFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectmonitoringFilterComponent", function() { return ProjectmonitoringFilterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



var ProjectmonitoringFilterComponent = /** @class */ (function () {
    function ProjectmonitoringFilterComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ProjectmonitoringFilterComponent.prototype.ngOnInit = function () { };
    ProjectmonitoringFilterComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ProjectmonitoringFilterComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ProjectmonitoringFilterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-projectmonitoring-filter",
            template: __webpack_require__(/*! raw-loader!./projectmonitoring-filter.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.html"),
            styles: [__webpack_require__(/*! ./projectmonitoring-filter.component.css */ "./src/app/content/cmdashboard/project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], ProjectmonitoringFilterComponent);
    return ProjectmonitoringFilterComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.css":
/*!******************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.css ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvcHJvamVjdC1tb25pdG9yaW5nL3pvb21wcm9qZWN0bW9uaXRvcmluZy96b29tcHJvamVjdG1vbml0b3JpbmcuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: ZOOMProjectmonitoringComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZOOMProjectmonitoringComponent", function() { return ZOOMProjectmonitoringComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_ProjectMonitoring_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/ProjectMonitoring.service */ "./src/app/Shared/Service/ProjectMonitoring.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");







var ZOOMProjectmonitoringComponent = /** @class */ (function () {
    function ZOOMProjectmonitoringComponent(_projectmonitoringservice, _route, gChartService, dialog, type, _authService) {
        this._projectmonitoringservice = _projectmonitoringservice;
        this._route = _route;
        this.gChartService = gChartService;
        this.dialog = dialog;
        this.type = type;
        this._authService = _authService;
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Department",
            "Total No. Of Ongoing Projects",
            "Total Project Cost",
            "0-3 Month",
            "4-6 Month",
            "7-12 Month",
            "Projects Require High Level Intervention"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
    }
    // events on slice click
    ZOOMProjectmonitoringComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    ZOOMProjectmonitoringComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ZOOMProjectmonitoringComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    ZOOMProjectmonitoringComponent.prototype.ngOnInit = function () { };
    ZOOMProjectmonitoringComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    ZOOMProjectmonitoringComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
    };
    ZOOMProjectmonitoringComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "60%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("projectmonitoringzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMProjectmonitoringComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("projectmonitoringzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMProjectmonitoringComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("projectmonitoringzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMProjectmonitoringComponent.prototype.drawTableChart = function () {
        var options = { chartArea: { width: "60%", height: "70%" } };
        var data = this.gLib.visualization.arrayToDataTable(this.newArray);
        var chart = new this.gLib.visualization.Table(document.getElementById("projectmonitoringzoomdiv"));
        chart.draw(data, options);
    };
    ZOOMProjectmonitoringComponent.prototype.GetList = function () {
        var _this = this;
        this._projectmonitoringservice
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Department,
                        element.OnGoingProject,
                        element.TotalProjectCost,
                        element.WithinThreeMonth,
                        element.WithinSixMonth,
                        element.WithinYearMonth,
                        element.ProjectReqIntervention
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    ZOOMProjectmonitoringComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("projectmonitoringzoomdiv"));
            chart.draw(data, options);
        }
    };
    ZOOMProjectmonitoringComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    ZOOMProjectmonitoringComponent.prototype.oncloseClick = function () {
        this.dialog.close();
    };
    ZOOMProjectmonitoringComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_ProjectMonitoring_service__WEBPACK_IMPORTED_MODULE_3__["ProjectMonitoringService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ZOOMProjectmonitoringComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ZOOMProjectmonitoringComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ZOOMProjectmonitoringComponent.prototype, "sort", void 0);
    ZOOMProjectmonitoringComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-zoomprojectmonitoring",
            template: __webpack_require__(/*! raw-loader!./zoomprojectmonitoring.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.html"),
            styles: [__webpack_require__(/*! ./zoomprojectmonitoring.component.css */ "./src/app/content/cmdashboard/project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_ProjectMonitoring_service__WEBPACK_IMPORTED_MODULE_3__["ProjectMonitoringService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String, src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]])
    ], ZOOMProjectmonitoringComponent);
    return ZOOMProjectmonitoringComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.css":
/*!*************************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvcmVjcnVpdG1lbnRzdGF0dXMvcmVjcnVpdG1lbnQtc3RhdHVzLWZpbHRlci9yZWNydWl0bWVudC1zdGF0dXMtZmlsdGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.ts ***!
  \************************************************************************************************************************/
/*! exports provided: RecruitmentStatusFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecruitmentStatusFilterComponent", function() { return RecruitmentStatusFilterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



var RecruitmentStatusFilterComponent = /** @class */ (function () {
    function RecruitmentStatusFilterComponent(dialogRef, data) {
        if (data === void 0) { data = null; }
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RecruitmentStatusFilterComponent.prototype.ngOnInit = function () { };
    RecruitmentStatusFilterComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    RecruitmentStatusFilterComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    RecruitmentStatusFilterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-recruitment-status-filter",
            template: __webpack_require__(/*! raw-loader!./recruitment-status-filter.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.html"),
            styles: [__webpack_require__(/*! ./recruitment-status-filter.component.css */ "./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], RecruitmentStatusFilterComponent);
    return RecruitmentStatusFilterComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvcmVjcnVpdG1lbnRzdGF0dXMvcmVjcnVpdG1lbnRzdGF0dXMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.ts ***!
  \**************************************************************************************/
/*! exports provided: RecruitmentStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecruitmentStatusComponent", function() { return RecruitmentStatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _Shared_Service_RecruitmentStatus_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../Shared/Service/RecruitmentStatus.service */ "./src/app/Shared/Service/RecruitmentStatus.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _recruitment_status_filter_recruitment_status_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./recruitment-status-filter/recruitment-status-filter.component */ "./src/app/content/cmdashboard/recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component.ts");
/* harmony import */ var _zoomrecruitmentstatus_zoomrecruitmentstatus_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./zoomrecruitmentstatus/zoomrecruitmentstatus.component */ "./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.ts");











var RecruitmentStatusComponent = /** @class */ (function () {
    function RecruitmentStatusComponent(_appComponet, _recruitmentstatusservice, _route, gChartService, _authService, dialog, datepipe) {
        this._appComponet = _appComponet;
        this._recruitmentstatusservice = _recruitmentstatusservice;
        this._route = _route;
        this.gChartService = gChartService;
        this._authService = _authService;
        this.dialog = dialog;
        this.datepipe = datepipe;
        this.type = "line";
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Department",
            "Total Vacancy",
            "Requisition Sent to Recruitment Institution",
            "Advertisement Published",
            "Examination Conducted",
            "Appointment Letters Issued",
            "Court Cases"
        ];
        this.ViewdisplayedColumns = [
            { Value: "Department", Text: "Department." },
            { Value: "TotalVacancy", Text: "Total Vacancy" },
            {
                Value: "Recruitment_Institution",
                Text: "Requisition Sent to Recruitment Institution"
            },
            { Value: "Advertisement_Published", Text: "Advertisement Published" },
            { Value: "Examination_Conducted", Text: "Examination_Conducted" },
            { Value: "Appointment_Letters_Issued", Text: "Appointment Letters Issued" },
            { Value: "Court_Cases", Text: "Court Cases" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
        this._appComponet.setpagelayout("", "", "", "", true, true);
    }
    // events on slice click
    RecruitmentStatusComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    RecruitmentStatusComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    RecruitmentStatusComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    RecruitmentStatusComponent.prototype.ngOnInit = function () { };
    RecruitmentStatusComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    RecruitmentStatusComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
        // this.Getswaparray("VIP");
    };
    RecruitmentStatusComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "60%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("recruitmentstatusdiv"));
        chart.draw(data, options);
    };
    RecruitmentStatusComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("recruitmentstatusdiv"));
        chart.draw(data, options);
    };
    RecruitmentStatusComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("recruitmentstatusdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    RecruitmentStatusComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        // options = { chartArea: { width: "60%", height: "70%" } };
        options = { width: 600, height: 200 };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("recruitmentstatusdiv"));
        chart.draw(data, options);
    };
    RecruitmentStatusComponent.prototype.GetList = function () {
        var _this = this;
        this._recruitmentstatusservice
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Department,
                        element.TotalVacancy,
                        element.Recruitment_Institution,
                        element.Advertisement_Published,
                        element.Examination_Conducted,
                        element.Appointment_Letters_Issued,
                        element.Court_Cases
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    RecruitmentStatusComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            chartArea: { width: "100%", height: "100%" },
            is3D: true
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("recruitmentstatusdiv"));
            chart.draw(data, options);
        }
    };
    RecruitmentStatusComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    RecruitmentStatusComponent.prototype.openZoomDialog = function () {
        var dialogRef = this.dialog.open(_zoomrecruitmentstatus_zoomrecruitmentstatus_component__WEBPACK_IMPORTED_MODULE_10__["ZoomrecruitmentstatusComponent"], {
            width: "95%",
            height: "95%",
            data: this.type
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    RecruitmentStatusComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_recruitment_status_filter_recruitment_status_filter_component__WEBPACK_IMPORTED_MODULE_9__["RecruitmentStatusFilterComponent"], {
            width: "500px",
            data: { startDate: null, endDate: null }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.startDate = _this.datepipe.transform(result.startDate, "MM-dd-yyyy"); // <string>result.startDate;
            _this.endDate = _this.datepipe.transform(result.endDate, "MM-dd-yyyy"); //<string>result.endDate;
            _this.GetList();
        });
    };
    RecruitmentStatusComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _Shared_Service_RecruitmentStatus_service__WEBPACK_IMPORTED_MODULE_2__["RecruitmentStatusService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], RecruitmentStatusComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"])
    ], RecruitmentStatusComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"])
    ], RecruitmentStatusComponent.prototype, "sort", void 0);
    RecruitmentStatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: "app-recruitmentstatus",
            template: __webpack_require__(/*! raw-loader!./recruitmentstatus.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.html"),
            styles: [__webpack_require__(/*! ./recruitmentstatus.component.css */ "./src/app/content/cmdashboard/recruitmentstatus/recruitmentstatus.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _Shared_Service_RecruitmentStatus_service__WEBPACK_IMPORTED_MODULE_2__["RecruitmentStatusService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"]])
    ], RecruitmentStatusComponent);
    return RecruitmentStatusComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.css":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.css ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvcmVjcnVpdG1lbnRzdGF0dXMvem9vbXJlY3J1aXRtZW50c3RhdHVzL3pvb21yZWNydWl0bWVudHN0YXR1cy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: ZoomrecruitmentstatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomrecruitmentstatusComponent", function() { return ZoomrecruitmentstatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_RecruitmentStatus_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/RecruitmentStatus.service */ "./src/app/Shared/Service/RecruitmentStatus.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");







var ZoomrecruitmentstatusComponent = /** @class */ (function () {
    function ZoomrecruitmentstatusComponent(_recruitmentstatusservice, _route, gChartService, _authService, dialog, type) {
        this._recruitmentstatusservice = _recruitmentstatusservice;
        this._route = _route;
        this.gChartService = gChartService;
        this._authService = _authService;
        this.dialog = dialog;
        this.type = type;
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Department",
            "Total Vacancy",
            "Requisition Sent to Recruitment Institution",
            "Advertisement Published",
            "Examination Conducted",
            "Appointment Letters Issued",
            "Court Cases"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
    }
    // events on slice click
    ZoomrecruitmentstatusComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    ZoomrecruitmentstatusComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ZoomrecruitmentstatusComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    ZoomrecruitmentstatusComponent.prototype.ngOnInit = function () { };
    ZoomrecruitmentstatusComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    ZoomrecruitmentstatusComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
        // this.Getswaparray("VIP");
    };
    ZoomrecruitmentstatusComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = { chartArea: { width: "60%", height: "70%" } };
        chart = new this.gLib.visualization.LineChart(document.getElementById("recruitmentstatuszoomdiv"));
        chart.draw(data, options);
    };
    ZoomrecruitmentstatusComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("recruitmentstatuszoomdiv"));
        chart.draw(data, options);
    };
    ZoomrecruitmentstatusComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("recruitmentstatuszoomdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    ZoomrecruitmentstatusComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "100%", height: "70%" } };
        //options = { width: 600, height: 200 };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("recruitmentstatuszoomdiv"));
        chart.draw(data, options);
    };
    ZoomrecruitmentstatusComponent.prototype.GetList = function () {
        var _this = this;
        this._recruitmentstatusservice
            .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.newArray = [];
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.Department,
                        element.TotalVacancy,
                        element.Recruitment_Institution,
                        element.Advertisement_Published,
                        element.Examination_Conducted,
                        element.Appointment_Letters_Issued,
                        element.Court_Cases
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    ZoomrecruitmentstatusComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            chartArea: { width: "100%", height: "100%" },
            is3D: true
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3],
                        element[4],
                        element[5],
                        element[6]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("recruitmentstatuszoomdiv"));
            chart.draw(data, options);
        }
    };
    ZoomrecruitmentstatusComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];
        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    ZoomrecruitmentstatusComponent.prototype.oncloseClick = function () {
        this.dialog.close();
    };
    ZoomrecruitmentstatusComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_RecruitmentStatus_service__WEBPACK_IMPORTED_MODULE_3__["RecruitmentStatusService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ZoomrecruitmentstatusComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ZoomrecruitmentstatusComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ZoomrecruitmentstatusComponent.prototype, "sort", void 0);
    ZoomrecruitmentstatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-zoomrecruitmentstatus",
            template: __webpack_require__(/*! raw-loader!./zoomrecruitmentstatus.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.html"),
            styles: [__webpack_require__(/*! ./zoomrecruitmentstatus.component.css */ "./src/app/content/cmdashboard/recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_RecruitmentStatus_service__WEBPACK_IMPORTED_MODULE_3__["RecruitmentStatusService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String])
    ], ZoomrecruitmentstatusComponent);
    return ZoomrecruitmentstatusComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvc2NoZW1lZGFzaGJvYXJkL3NjaGVtZWRhc2hib2FyZC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.ts ***!
  \**********************************************************************************/
/*! exports provided: SchemedashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemedashboardComponent", function() { return SchemedashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_SchemeDashboard_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/SchemeDashboard.service */ "./src/app/Shared/Service/SchemeDashboard.service.ts");
/* harmony import */ var _schemedashboardzoomdailog_schemedashboardzoomdailog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./schemedashboardzoomdailog/schemedashboardzoomdailog.component */ "./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.ts");









var SchemedashboardComponent = /** @class */ (function () {
    function SchemedashboardComponent(_appComponet, _schemedashboardservice, _route, gChartService, _authService, dialog) {
        this._appComponet = _appComponet;
        this._schemedashboardservice = _schemedashboardservice;
        this._route = _route;
        this.gChartService = gChartService;
        this._authService = _authService;
        this.dialog = dialog;
        this.type = "bar";
        this.newArray = [];
        this.piechartArray = [];
        //@Output() IsDashboardVisible = new EventEmitter<boolean>();
        this.displayedColumns = [
            "Scheme Name",
            "Target",
            "Achievement",
            "No of benificiary"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
        this._appComponet.setpagelayout("", "", "", "", true, true);
    }
    SchemedashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    SchemedashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    SchemedashboardComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    SchemedashboardComponent.prototype.ngOnInit = function () { };
    SchemedashboardComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    SchemedashboardComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
        // this.Getswaparray("VIP");
    };
    SchemedashboardComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = {
            chartArea: { width: "60%", height: "70%" }
        };
        chart = new this.gLib.visualization.LineChart(document.getElementById("schemedashboarddiv"));
        chart.draw(data, options);
    };
    SchemedashboardComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "70%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("schemedashboarddiv"));
        chart.draw(data, options);
    };
    SchemedashboardComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("schemedashboarddiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    SchemedashboardComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        //options = { chartArea: { width: "60%", height: "70%" } };
        options = { width: "50", height: "200" };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("schemedashboarddiv"));
        chart.draw(data, options);
    };
    SchemedashboardComponent.prototype.GetList = function () {
        var _this = this;
        this._schemedashboardservice
            .GetById(this.loginData.UserType, this.loginData.UserId)
            .subscribe(function (data) {
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.SchemeName,
                        element.Target,
                        element.Achievement,
                        element.NoofBenificiary
                    ]);
                });
                _this.chartcall();
                // this.isDataExist(true);
            }
            else {
                // this.isDataExist(false);
            }
        });
    };
    SchemedashboardComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            is3D: true,
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data.IsSuccess) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("schemedashboarddiv"));
            chart.draw(data, options);
        }
    };
    SchemedashboardComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        var i, j, t = [];
        for (i = 0; i < h; i++) {
            t[i] = [];
            for (j = 0; j < w; j++) {
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    SchemedashboardComponent.prototype.openZoomDialog = function () {
        var dialogRef = this.dialog.open(_schemedashboardzoomdailog_schemedashboardzoomdailog_component__WEBPACK_IMPORTED_MODULE_8__["SchemedashboardzoomdailogComponent"], {
            width: "95%",
            height: "95%",
            data: this.type
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    SchemedashboardComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_SchemeDashboard_service__WEBPACK_IMPORTED_MODULE_7__["SchemeDashboardService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SchemedashboardComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], SchemedashboardComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], SchemedashboardComponent.prototype, "sort", void 0);
    SchemedashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"])({
            selector: "app-schemedashboard",
            template: __webpack_require__(/*! raw-loader!./schemedashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.html"),
            styles: [__webpack_require__(/*! ./schemedashboard.component.css */ "./src/app/content/cmdashboard/schemedashboard/schemedashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_SchemeDashboard_service__WEBPACK_IMPORTED_MODULE_7__["SchemeDashboardService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], SchemedashboardComponent);
    return SchemedashboardComponent;
}());



/***/ }),

/***/ "./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.css":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.css ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY21kYXNoYm9hcmQvc2NoZW1lZGFzaGJvYXJkL3NjaGVtZWRhc2hib2FyZHpvb21kYWlsb2cvc2NoZW1lZGFzaGJvYXJkem9vbWRhaWxvZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: SchemedashboardzoomdailogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemedashboardzoomdailogComponent", function() { return SchemedashboardzoomdailogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_SchemeDashboard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/SchemeDashboard.service */ "./src/app/Shared/Service/SchemeDashboard.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/google-chart.service */ "./src/app/Shared/Service/google-chart.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");







var SchemedashboardzoomdailogComponent = /** @class */ (function () {
    function SchemedashboardzoomdailogComponent(_schemedashboardservice, _route, gChartService, _authService, dialog, type) {
        this._schemedashboardservice = _schemedashboardservice;
        this._route = _route;
        this.gChartService = gChartService;
        this._authService = _authService;
        this.dialog = dialog;
        this.type = type;
        this.newArray = [];
        this.piechartArray = [];
        this.displayedColumns = [
            "Scheme Name",
            "Target",
            "Achievement",
            "No of benificiary"
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        //#endregion
        this.chartOptions = {
            responsive: true
        };
        this.barChartType = "bar";
        this.lineChartType = "line";
        this.barChartLegend = true;
        this.lineChartLegend = true;
        this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
        this.type =
            this._route.snapshot.params.type == undefined
                ? this.type
                : this._route.snapshot.params.type;
        this.GetList();
    }
    SchemedashboardzoomdailogComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    // event on pie chart slice hover
    SchemedashboardzoomdailogComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    SchemedashboardzoomdailogComponent.prototype.onChartClick = function (event) {
        console.log(event);
    };
    SchemedashboardzoomdailogComponent.prototype.ngOnInit = function () { };
    SchemedashboardzoomdailogComponent.prototype.chart = function (type) {
        this.type = type;
        this.chartcall();
    };
    SchemedashboardzoomdailogComponent.prototype.chartcall = function () {
        this.gLib = this.gChartService.getGoogle();
        this.gLib.charts.load("current", { packages: ["corechart", "table"] });
        if (this.type == "pie") {
            this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
        }
        if (this.type == "line") {
            this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
        }
        if (this.type == "bar") {
            this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
        }
        if (this.type == "table") {
            this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
        }
        // this.Getswaparray("VIP");
    };
    SchemedashboardzoomdailogComponent.prototype.drawLineChart = function () {
        var data, chart;
        var options;
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        options = {
            chartArea: { width: "60%", height: "65%" }
        };
        chart = new this.gLib.visualization.LineChart(document.getElementById("schemedashboardzoomdiv"));
        chart.draw(data, options);
    };
    SchemedashboardzoomdailogComponent.prototype.drawBarChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "65%" } };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.ColumnChart(document.getElementById("schemedashboardzoomdiv"));
        chart.draw(data, options);
    };
    SchemedashboardzoomdailogComponent.prototype.drawPieChart = function () {
        var data, chart;
        var options;
        var selectmodule = "";
        options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.PieChart(document.getElementById("schemedashboardzoomdiv"));
        chart.draw(data, options);
        this.gLib.visualization.events.addListener(chart, "select", selectHandler);
        var callthis = this;
        function selectHandler() {
            var selection = chart.getSelection();
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null) {
                    selectmodule = data.getFormattedValue(item.row, 0);
                }
            }
            callthis.GetSelectedData(selectmodule);
        }
    };
    SchemedashboardzoomdailogComponent.prototype.drawTableChart = function () {
        var data, chart;
        var options;
        options = { chartArea: { width: "60%", height: "65%" } };
        // options = { width: "50", height: "200" };
        data = this.gLib.visualization.arrayToDataTable(this.newArray);
        chart = new this.gLib.visualization.Table(document.getElementById("schemedashboardzoomdiv"));
        chart.draw(data, options);
    };
    SchemedashboardzoomdailogComponent.prototype.GetList = function () {
        var _this = this;
        this._schemedashboardservice
            .GetById(this.loginData.UserType, this.loginData.UserId)
            .subscribe(function (data) {
            _this.newArray.push(_this.displayedColumns);
            if (data.IsSuccess) {
                var resultData = data.Data;
                resultData.forEach(function (element) {
                    _this.newArray.push([
                        element.SchemeName,
                        element.Target,
                        element.Achievement,
                        element.NoofBenificiary
                    ]);
                });
                _this.chartcall();
            }
        });
    };
    SchemedashboardzoomdailogComponent.prototype.GetSelectedData = function (selectModule) {
        var _this = this;
        var data, chart, options;
        options = {
            title: selectModule,
            titleTextStyle: {
                color: "#26389b",
                fontSize: 15
            },
            is3D: true,
            chartArea: { width: "100%", height: "100%" }
        };
        data = this.newArray;
        if (data) {
            var resultData = data;
            resultData.forEach(function (element) {
                if (element[0] == selectModule) {
                    _this.piechartArray = [];
                    _this.piechartArray.push(_this.displayedColumns);
                    _this.piechartArray.push([
                        element[0],
                        element[1],
                        element[2],
                        element[3]
                    ]);
                }
            });
            data = this.gLib.visualization.arrayToDataTable(this.Transpose2DArray(this.piechartArray));
            chart = new this.gLib.visualization.PieChart(document.getElementById("schemedashboardzoomdiv"));
            chart.draw(data, options);
        }
    };
    SchemedashboardzoomdailogComponent.prototype.Transpose2DArray = function (selectArray) {
        var w = selectArray.length || 0;
        var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;
        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) {
            return [];
        }
        var i, j, t = [];
        for (i = 0; i < h; i++) {
            t[i] = [];
            for (j = 0; j < w; j++) {
                t[i][j] = selectArray[j][i];
            }
        }
        return t;
    };
    SchemedashboardzoomdailogComponent.prototype.oncloseClick = function () {
        this.dialog.close();
    };
    SchemedashboardzoomdailogComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_SchemeDashboard_service__WEBPACK_IMPORTED_MODULE_3__["SchemeDashboardService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SchemedashboardzoomdailogComponent.prototype, "charttype", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], SchemedashboardzoomdailogComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], SchemedashboardzoomdailogComponent.prototype, "sort", void 0);
    SchemedashboardzoomdailogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-schemedashboardzoomdailog",
            template: __webpack_require__(/*! raw-loader!./schemedashboardzoomdailog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.html"),
            styles: [__webpack_require__(/*! ./schemedashboardzoomdailog.component.css */ "./src/app/content/cmdashboard/schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_SchemeDashboard_service__WEBPACK_IMPORTED_MODULE_3__["SchemeDashboardService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_Shared_Service_google_chart_service__WEBPACK_IMPORTED_MODULE_5__["GoogleChartService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String])
    ], SchemedashboardzoomdailogComponent);
    return SchemedashboardzoomdailogComponent;
}());



/***/ }),

/***/ "./src/app/content/master/dashboard-help-document/dashboard-help-document.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/master/dashboard-help-document/dashboard-help-document.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbWFzdGVyL2Rhc2hib2FyZC1oZWxwLWRvY3VtZW50L2Rhc2hib2FyZC1oZWxwLWRvY3VtZW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/master/dashboard-help-document/dashboard-help-document.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/content/master/dashboard-help-document/dashboard-help-document.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: DashboardHelpDocumentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardHelpDocumentComponent", function() { return DashboardHelpDocumentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");








var DashboardHelpDocumentComponent = /** @class */ (function () {
    //#endregion
    function DashboardHelpDocumentComponent(_commonService, _alertService, sanitizer, _router, _dialogRef) {
        this._commonService = _commonService;
        this._alertService = _alertService;
        this.sanitizer = sanitizer;
        this._router = _router;
        this._dialogRef = _dialogRef;
        //#region 
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_3__["HelpDocumentEnum"];
    }
    DashboardHelpDocumentComponent.prototype.ngOnInit = function () {
        this.GetHelpDocument();
    };
    DashboardHelpDocumentComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.DashBoard).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
                _this.PDFFile = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.helpDocument.Url);
                if (!_this.helpDocument.Url) {
                    _this._dialogRef.close();
                }
            }
            else {
                _this._dialogRef.close();
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._dialogRef.close();
            _this._alertService.error(error.message);
        });
    };
    DashboardHelpDocumentComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    DashboardHelpDocumentComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }
    ]; };
    DashboardHelpDocumentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-dashboard-help-document',
            template: __webpack_require__(/*! raw-loader!./dashboard-help-document.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/master/dashboard-help-document/dashboard-help-document.component.html"),
            providers: [src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]],
            styles: [__webpack_require__(/*! ./dashboard-help-document.component.css */ "./src/app/content/master/dashboard-help-document/dashboard-help-document.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]])
    ], DashboardHelpDocumentComponent);
    return DashboardHelpDocumentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-cmdashboard-cmdashboard-module.js.map