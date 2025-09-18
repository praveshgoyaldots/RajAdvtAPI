(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-lms-lms-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/action-history-report/action-history-report.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/action-history-report/action-history-report.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-report-advance-search (outputModel)=\"getAdvanceSearchReportData($event)\"></app-report-advance-search>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12\">\r\n    <table class=\"mat-elevation-z8 normal-table\">\r\n      <tr>\r\n        <th>S.No.</th>\r\n        <th>Ref No.<br />Entry Date</th>\r\n        <th>Department<br />Subject</th>\r\n        <th>Department Action</th>\r\n        <th>Department Status</th>\r\n        <th>CMO Action</th>\r\n        <th>CMO Status</th>\r\n      </tr>\r\n      <ng-container *ngFor=\"let row of actionHistoryReport; let i = index;\">\r\n        <tr>\r\n          <td [attr.rowspan]=\"row.ActionHistoryModelList.length\" class=\"center\">\r\n            {{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}</td>\r\n          <td [attr.rowspan]=\"row.ActionHistoryModelList.length\">\r\n            {{row.LetterId}}<br />{{row.LetterEntryDate | date: 'dd/MM/yyyy'}}</td>\r\n          <td [attr.rowspan]=\"row.ActionHistoryModelList.length\">\r\n            {{row.DepartmentTitle}}<br />{{row.LetterSubject}}</td>\r\n          <ng-container *ngIf=\"row.ActionHistoryModelList[0].IsDepartmentAction; else notDPT\">\r\n            <td>{{ row.ActionHistoryModelList[0].Action_Detail }}<br />{{ row.ActionHistoryModelList[0].Action_Date }}\r\n            </td>\r\n            <td>{{ row.ActionHistoryModelList[0].Action_Status }}</td>\r\n            <td></td>\r\n            <td></td>\r\n          </ng-container>\r\n          <ng-template #notDPT>\r\n            <td></td>\r\n            <td></td>\r\n            <td>{{ row.ActionHistoryModelList[0].Action_Detail }}<br />{{ row.ActionHistoryModelList[0].Action_Date }}\r\n            </td>\r\n            <td>{{ row.ActionHistoryModelList[0].Action_Status }}</td>\r\n          </ng-template>\r\n        </tr>\r\n        <ng-container *ngFor=\"let action of row.ActionHistoryModelList.slice(1); let j = index;\">\r\n          <tr>\r\n            <ng-container *ngIf=\"action.IsDepartmentAction; else notDPT\">\r\n              <td>{{ action.Action_Detail }}<br />{{ action.Action_Date }}</td>\r\n              <td>{{ action.Action_Status }}</td>\r\n              <td></td>\r\n              <td></td>\r\n            </ng-container>\r\n            <ng-template #notDPT>\r\n              <td></td>\r\n              <td></td>\r\n              <td>{{ action.Action_Detail }}<br />{{ action.Action_Date }}</td>\r\n              <td>{{ action.Action_Status }}</td>\r\n            </ng-template>\r\n          </tr>\r\n        </ng-container>\r\n      </ng-container>\r\n    </table>\r\n\r\n\r\n\r\n\r\n    <!-- <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" *ngIf=\"actionHistoryReport.length > 0\">\r\n            <ng-container matColumnDef=\"sNo\">\r\n                <th mat-header-cell *matHeaderCellDef> S.No. </th>\r\n                <td mat-cell *matCellDef=\"let row; let i = index;\">\r\n                    {{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"refNo_entryDate\">\r\n                <th mat-header-cell *matHeaderCellDef>Ref No. <br />Entry Date</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.LetterId}}<br />\r\n                    {{row.LetterEntryDate | date: 'dd/MM/yyyy'}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"department_subject\">\r\n                <th mat-header-cell *matHeaderCellDef>Department<br />Subject</th>\r\n                <td mat-cell *matCellDef=\"let row\">{{row.DepartmentTitle}}<br />{{row.LetterSubject}}</td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"deptAction\">\r\n                <th mat-header-cell *matHeaderCellDef>Department Action</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.Last_DepartmentActionDetail}}<br />\r\n                    {{row.Last_DepartmentActionDateTime | date: 'dd/MM/yyyy'}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"deptStatus\">\r\n                <th mat-header-cell *matHeaderCellDef>Department Status</th>\r\n                <td mat-cell *matCellDef=\"let row\">{{row.Last_DepartmentActionStatus}}</td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"cmoAction\">\r\n                <th mat-header-cell *matHeaderCellDef>CMO Action</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.Last_CMOActionDetail}}<br />\r\n                    {{row.Last_CMOActionDateTime | date: 'dd/MM/yyyy'}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"cmoStatus\">\r\n                <th mat-header-cell *matHeaderCellDef>CMO Status</th>\r\n                <td mat-cell *matCellDef=\"let row\">{{row.Last_CMOActionStatus}}</td>\r\n            </ng-container>\r\n\r\n            <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n            <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n        </table> -->\r\n\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n    </mat-paginator>\r\n\r\n    <ng-container *ngIf=\"actionHistoryReport.length === 0\">\r\n      No record found.\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"ageWiseReport!=null\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th rowspan=\"2\">S.No.</th>\r\n                <th rowspan=\"2\">Admin Department</th>\r\n                <th rowspan=\"2\">Total</th>\r\n                <th colspan=\"3\">&lt;7 Days</th>\r\n                <th colspan=\"3\">7-15 Days</th>\r\n                <th colspan=\"3\">15-30 Days</th>\r\n                <th colspan=\"3\">&gt;30 Days</th>\r\n            </tr>\r\n            <tr>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of ageWiseReport; let i = index;\">\r\n                <td class=\"center\">{{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}</td>\r\n                <td><a routerLink=\"/lms/department-age-wise-report/{{row.Code}}\">{{ row.Title }}</a></td>\r\n                <td class=\"center\">{{ row.Total }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_0to7_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_0to7_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_0to7_Disposed }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_7to15_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_7to15_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_7to15_Disposed }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_15to30_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_15to30_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_15to30_Disposed }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_30to_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_30to_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_30to_Disposed }}</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n            [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n        </mat-paginator>\r\n\r\n        <ng-container *ngIf=\"ageWiseReport.length === 0\">\r\n            No record found.\r\n        </ng-container>\r\n\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.html":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.html ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"last6MonthReport!=null\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th>S.No.</th>\r\n                <th>Admin Department</th>\r\n                <th>Total Entries</th>\r\n                <th>{{_commonService.getMonthYear(0)}}</th>\r\n                <th>{{_commonService.getMonthYear(-1)}}</th>\r\n                <th>{{_commonService.getMonthYear(-2)}}</th>\r\n                <th>{{_commonService.getMonthYear(-3)}}</th>\r\n                <th>{{_commonService.getMonthYear(-4)}}</th>\r\n                <th>{{_commonService.getMonthYear(-5)}}</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of last6MonthReport; let i = index;\">\r\n                <td class=\"center\">{{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}</td>\r\n                <td><a routerLink=\"/lms/department-last6month-report/{{row.Code}}\">{{ row.Title }}</a></td>\r\n                <td class=\"center\">\r\n                    {{ row.TotalReceived }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.Action_CurrentMonth }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.Action_Last1Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.Action_Last2Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.Action_Last3Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.Action_Last4Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.Action_Last5Month }}\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n            [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n        </mat-paginator>\r\n\r\n        <ng-container *ngIf=\"last6MonthReport.length === 0\">\r\n            No record found.\r\n        </ng-container>\r\n\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"ageWiseReport!=null\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th rowspan=\"2\">S.No.</th>\r\n                <th rowspan=\"2\">Department</th>\r\n                <th rowspan=\"2\">Total</th>\r\n                <th colspan=\"3\">&lt;7 Days</th>\r\n                <th colspan=\"3\">7-15 Days</th>\r\n                <th colspan=\"3\">15-30 Days</th>\r\n                <th colspan=\"3\">&gt;30 Days</th>\r\n            </tr>\r\n            <tr>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of ageWiseReport; let i = index;\">\r\n                <td class=\"center\">{{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}</td>\r\n                <td>{{ row.Title }}</td>\r\n                <td class=\"center\">{{ row.Total }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_0to7_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_0to7_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_0to7_Disposed }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_7to15_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_7to15_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_7to15_Disposed }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_15to30_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_15to30_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_15to30_Disposed }}</td>\r\n\r\n                <td class=\"center\">{{ row.Letter_30to_Pending }}</td>\r\n                <td class=\"center\">{{ row.Letter_30to_Interim }}</td>\r\n                <td class=\"center\">{{ row.Letter_30to_Disposed }}</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n            [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n        </mat-paginator>\r\n\r\n        <ng-container *ngIf=\"ageWiseReport.length === 0\">\r\n            No record found.\r\n        </ng-container>\r\n\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/department-last6month-report/department-last6month-report.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/department-last6month-report/department-last6month-report.component.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"last6MonthReport!=null\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th>S.No.</th>\r\n                <th>Department</th>\r\n                <th>Total Entries</th>\r\n                <th>{{_commonService.getMonthYear(0)}}</th>\r\n                <th>{{_commonService.getMonthYear(-1)}}</th>\r\n                <th>{{_commonService.getMonthYear(-2)}}</th>\r\n                <th>{{_commonService.getMonthYear(-3)}}</th>\r\n                <th>{{_commonService.getMonthYear(-4)}}</th>\r\n                <th>{{_commonService.getMonthYear(-5)}}</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of last6MonthReport; let i = index;\">\r\n                <td class=\"center\">{{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}</td>\r\n                <td>{{ row.Title }}</td>\r\n                <td class=\"center\">{{ row.TotalReceived }}</td>\r\n                <td class=\"center\">{{ row.Action_CurrentMonth }}</td>\r\n                <td class=\"center\">{{ row.Action_Last1Month }}</td>\r\n                <td class=\"center\">{{ row.Action_Last2Month }}</td>\r\n                <td class=\"center\">{{ row.Action_Last3Month }}</td>\r\n                <td class=\"center\">{{ row.Action_Last4Month }}</td>\r\n                <td class=\"center\">{{ row.Action_Last5Month }}</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n            [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n        </mat-paginator>\r\n\r\n        <ng-container *ngIf=\"last6MonthReport.length === 0\">\r\n            No record found.\r\n        </ng-container>\r\n\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/detail-report/detail-report.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/detail-report/detail-report.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-report-advance-search (outputModel)=\"getAdvanceSearchReportData($event)\"></app-report-advance-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\">\r\n        <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" *ngIf=\"detailReport.length > 0\">\r\n            <ng-container matColumnDef=\"sNo\">\r\n                <th mat-header-cell *matHeaderCellDef> S.No. </th>\r\n                <td mat-cell *matCellDef=\"let row; let i = index;\" class=\"center\">\r\n                    {{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"refNo_entryDate\">\r\n                <th mat-header-cell *matHeaderCellDef>Ref No.<br />Entry Date</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.LetterId}}<br />{{row.LetterEntryDate | date: 'dd/MM/yyyy'}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"subject\">\r\n                <th mat-header-cell *matHeaderCellDef>Subject</th>\r\n                <td mat-cell *matCellDef=\"let row\">{{row.LetterSubject}}</td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"referencee\">\r\n                <th mat-header-cell *matHeaderCellDef>Referencee</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.ReferenceeName}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"department\">\r\n                <th mat-header-cell *matHeaderCellDef>Department & Sent to Officer</th>\r\n                <td mat-cell *matCellDef=\"let row\">{{row.DepartmentTitle}}<br />{{row.GroupTitle}}</td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"senderDetail\">\r\n                <th mat-header-cell *matHeaderCellDef>Sender Details</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.LetterSenderName}}<br />{{row.LetterSenderAddress}}<br />\r\n                    {{row.LetterSender_Mobile}}<br />{{row.LetterSender_Email}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"deptAction\">\r\n                <th mat-header-cell *matHeaderCellDef>Department Action</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.Last_DepartmentActionDetail}}<br />\r\n                    {{row.Last_DepartmentActionDateTime | date: 'dd/MM/yyyy'}}<br />\r\n                    {{row.Last_DepartmentActionStatus}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"cmoAction\">\r\n                <th mat-header-cell *matHeaderCellDef>CMO Action</th>\r\n                <td mat-cell *matCellDef=\"let row\">\r\n                    {{row.Last_CMOActionDetail}}<br />\r\n                    {{row.Last_CMOActionDateTime | date: 'dd/MM/yyyy'}}<br />\r\n                    {{row.Last_CMOActionStatus}}\r\n                </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"cmntOfficer\">\r\n                <th mat-header-cell *matHeaderCellDef>Commenting Officer</th>\r\n                <td mat-cell *matCellDef=\"let row\">{{row.LetterCommentGroupTitle}}</td>\r\n            </ng-container>\r\n\r\n            <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n            <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n            [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n        </mat-paginator>\r\n\r\n        <ng-container *ngIf=\"detailReport.length === 0\">\r\n            No record found.\r\n        </ng-container>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/reports/reports.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/reports/reports.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"> <a routerLink=\"/lms/statistical-report\">\r\n        <mat-icon>file_copy</mat-icon> Statistical Report <mat-icon class=\"float-right\">keyboard_arrow_right</mat-icon>\r\n      </a></div>\r\n  </div>\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"><a routerLink=\"/lms/detail-report\">\r\n        <mat-icon>file_copy</mat-icon> Detail Report <mat-icon class=\"float-right\">keyboard_arrow_right</mat-icon>\r\n      </a> </div>\r\n  </div>\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"><a routerLink=\"/lms/action-history-report\">\r\n        <mat-icon>file_copy</mat-icon> Action History Report <mat-icon class=\"float-right\">keyboard_arrow_right\r\n        </mat-icon>\r\n      </a> </div>\r\n  </div>\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"><a routerLink=\"/lms/admin-department-age-wise-report\">\r\n        <mat-icon>file_copy</mat-icon> Admin Department - Age Wise Report <mat-icon class=\"float-right\">\r\n          keyboard_arrow_right</mat-icon>\r\n      </a> </div>\r\n  </div>\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"><a routerLink=\"/lms/department-age-wise-report\">\r\n        <mat-icon>file_copy</mat-icon> Department - Age Wise Report <mat-icon class=\"float-right\">keyboard_arrow_right\r\n        </mat-icon>\r\n      </a> </div>\r\n  </div>\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"><a routerLink=\"/lms/admin-department-last6month-report\">\r\n        <mat-icon>file_copy</mat-icon> Admin Department - Last 6 Month Report <mat-icon class=\"float-right\">\r\n          keyboard_arrow_right</mat-icon>\r\n      </a> </div>\r\n  </div>\r\n  <div class=\"col l4 x8 m4 s12\">\r\n    <div class=\"report_bx\"><a routerLink=\"/lms/department-last6month-report\">\r\n        <mat-icon>file_copy</mat-icon> Department - Last 6 Month Report <mat-icon class=\"float-right\">\r\n          keyboard_arrow_right</mat-icon>\r\n      </a> </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- <a routerLink=\"/lms/statistical-report\">Statistical Report</a>\r\n<br />\r\n<a routerLink=\"/lms/detail-report\">Detail Report</a>\r\n<br />\r\n<a routerLink=\"/lms/action-history-report\">Action History Report</a>\r\n<br />\r\n<a routerLink=\"/lms/admin-department-age-wise-report\">Admin Department - Age Wise Report</a>\r\n<br />\r\n<a routerLink=\"/lms/department-age-wise-report\">Department - Age Wise Report</a>\r\n<br />\r\n<a routerLink=\"/lms/admin-department-last6month-report\">Admin Department - Last 6 Month Report</a>\r\n<br />\r\n<a routerLink=\"/lms/department-last6month-report\">Department - Last 6 Month Report</a> -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/shared/report-advance-search/report-advance-search.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/shared/report-advance-search/report-advance-search.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col l12 m12 s12 mb-20\">\r\n        <section class=\"mat-typography\">\r\n            <h2 class=\"color-blue mb-0\">Advance Search</h2>\r\n        </section>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field appearance=\"outline\">\r\n            <mat-label>Ref. No. From </mat-label>\r\n            <input matInput placeholder=\"Ref. No. From\" [(ngModel)]=\"model.RefNoFrom\" maxlength=\"10\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Ref. No. To </mat-label>\r\n            <input matInput placeholder=\"Ref. No. To\" [(ngModel)]=\"model.RefNoTo\" maxlength=\"10\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Subject </mat-label>\r\n            <input matInput placeholder=\"Subject\" [(ngModel)]=\"model.Subject\" maxlength=\"200\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Sender Name </mat-label>\r\n            <input matInput placeholder=\"Sender Name\" [(ngModel)]=\"model.SenderName\" maxlength=\"50\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Address </mat-label>\r\n            <input matInput placeholder=\"Address\" [(ngModel)]=\"model.Address\" maxlength=\"100\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Mobile </mat-label>\r\n            <input matInput placeholder=\"Mobile\" [(ngModel)]=\"model.Mobile\" maxlength=\"10\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Action Taken By Department </mat-label>\r\n            <input matInput placeholder=\"Action Taken By Department\" [(ngModel)]=\"model.ActionTakenByDepartment\"\r\n                maxlength=\"100\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Action Taken By CMO </mat-label>\r\n            <input matInput placeholder=\"Action Taken By CMO\" [(ngModel)]=\"model.ActionTakenByCMO\" maxlength=\"100\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Commenting Officer</mat-label>\r\n            <mat-select [(ngModel)]=\"model.CommentingOfficerCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlUserGroup\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Referencee</mat-label>\r\n            <mat-select [(ngModel)]=\"model.ReferenceeCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlReferencee\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Department</mat-label>\r\n            <mat-select [(ngModel)]=\"model.DepartmentCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlDepartment\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Department Status</mat-label>\r\n            <mat-select [(ngModel)]=\"model.DepartmentStatusCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlLMS_LetterAction\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>CMO Status</mat-label>\r\n            <mat-select [(ngModel)]=\"model.CMOStatusCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlLMS_LetterAction\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Officer Group</mat-label>\r\n            <mat-select [(ngModel)]=\"model.OfficerGroupCode\">\r\n                <mat-option>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlUserGroup\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Entry Date From </mat-label>\r\n            <input matInput [(ngModel)]=\"model.EntryDateFrom\" [matDatepicker]=\"edfPicker\" (focus)=\"edfPicker.open()\"\r\n                placeholder=\"Entry Date From\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"edfPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #edfPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Entry Date To </mat-label>\r\n            <input matInput [(ngModel)]=\"model.EntryDateTo\" [matDatepicker]=\"edtPicker\" (focus)=\"edtPicker.open()\"\r\n                placeholder=\"Entry Date To\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"edtPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #edtPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Dept. Action Date From </mat-label>\r\n            <input matInput [(ngModel)]=\"model.DepartmentActionDateFrom\" [matDatepicker]=\"dadfPicker\"\r\n                (focus)=\"dadfPicker.open()\" placeholder=\"Dept. Action Date From\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"dadfPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dadfPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Dept. Action Date To </mat-label>\r\n            <input matInput [(ngModel)]=\"model.DepartmentActionDateTo\" [matDatepicker]=\"dadtPicker\"\r\n                (focus)=\"dadtPicker.open()\" placeholder=\"Dept. Action Date To\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"dadtPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dadtPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>CMO Action Date From </mat-label>\r\n            <input matInput [(ngModel)]=\"model.CMOActionDateFrom\" [matDatepicker]=\"cadfPicker\"\r\n                (focus)=\"cadfPicker.open()\" placeholder=\"CMO Action Date From\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"cadfPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #cadfPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>CMO Action Date To </mat-label>\r\n            <input matInput [(ngModel)]=\"model.CMOActionDateTo\" [matDatepicker]=\"cadtPicker\" (focus)=\"cadtPicker.open()\"\r\n                placeholder=\"CMO Action Date To\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"cadtPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #cadtPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-radio-group [(ngModel)]=\"model.LetterType\"\r\n            class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\">\r\n            <mat-label class=\"mr-5\">Letter Type </mat-label>\r\n            <mat-radio-button class=\"mr-5\" value=\"\">All</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"Receipt\">Receipt</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"Dispatch\">Dispatch</mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-radio-group [(ngModel)]=\"model.haveAttachment\"\r\n            class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\">\r\n            <mat-label class=\"mr-5\">Have Attachment </mat-label>\r\n            <mat-radio-button class=\"mr-5\" value=\"\">All</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"true\">Yes</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"false\">No</mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n\r\n    <div class=\"col l12 x12 m12 s12\">\r\n        <button mat-button class=\"btn-submit mr-5\" (click)=\"setSearchFilter()\">Search</button>\r\n        <button mat-button class=\"btn-submit\" (click)=\"resetAdvanceSearch()\">Refresh</button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.html ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Select Group By</h2>\r\n\r\n<mat-dialog-content class=\"mat-typography\">\r\n    <div class=\"row\">\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>Group By 1</mat-label>\r\n                <mat-select [(ngModel)]=\"data.groupBy1_Val\">\r\n                    <!-- <mat-option value>--Select--</mat-option> -->\r\n                    <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of groupByList\">{{item.Text}}\r\n                    </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>Group By 2</mat-label>\r\n                <mat-select [(ngModel)]=\"data.groupBy2_Val\">\r\n                    <mat-option value>--Select--</mat-option>\r\n                    <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of groupByList\">{{item.Text}}\r\n                    </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n        </div>\r\n\r\n    </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n    <button mat-button mat-dialog-close>Cancel</button>\r\n    <button mat-button class=\"btn-submit\" [mat-dialog-close]=\"data\" cdkFocusInitial>Submit</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lms/statistical-report/statistical-report.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lms/statistical-report/statistical-report.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-report-advance-search (outputModel)=\"getAdvanceSearchReportData($event)\"></app-report-advance-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th rowspan=\"2\">S.No.</th>\r\n                <th rowspan=\"2\">{{groupBy1_Txt}}</th>\r\n                <th rowspan=\"2\" *ngIf=\"groupBy2_Txt\">{{groupBy2_Txt}}</th>\r\n                <th rowspan=\"2\">Total</th>\r\n                <th colspan=\"3\">Department</th>\r\n                <th colspan=\"3\">CMO</th>\r\n            </tr>\r\n            <tr>\r\n                <th>Pending</th>\r\n                <th>Interim</th>\r\n                <th>Disposed</th>\r\n                <th>Pending</th>\r\n                <th>Interim</th>\r\n                <th>Disposed</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of statisticalReport; let i = index;\">\r\n                <td class=\"center\">{{(reportIndexModel.Page-1)*reportIndexModel.PageSize+(i+1)}}</td>\r\n                <td>{{row.GroupBy1_Title}}</td>\r\n                <td *ngIf=\"groupBy2_Txt\">{{row.GroupBy2_Title}}</td>\r\n                <td class=\"center\">{{ row.Total }}</td>\r\n                <td class=\"center\">{{ row.Department_Pending }}</td>\r\n                <td class=\"center\">{{ row.Department_Interim }}</td>\r\n                <td class=\"center\">{{ row.Department_Disposed }}</td>\r\n                <td class=\"center\">{{ row.CMO_Pending }}</td>\r\n                <td class=\"center\">{{ row.CMO_Interim }}</td>\r\n                <td class=\"center\">{{ row.CMO_Disposed }}</td>\r\n            </tr>\r\n            <tr *ngIf=\"statisticalReport.length === 0\">\r\n                <td colspan=\"10\" class=\"center\" *ngIf=\"groupBy2_Txt; else otherNoRecord\">No record found.</td>\r\n                <ng-template #otherNoRecord>\r\n                    <td colspan=\"9\" class=\"center\">No record found.</td>\r\n                </ng-template>\r\n            </tr>\r\n        </table>\r\n\r\n        <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"reportIndexModel.PageSize\"\r\n            [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n        </mat-paginator>\r\n\r\n    </div>\r\n\r\n    <div class=\"col l12 x8 m4 s12 clearfix mt-20\">\r\n        <button mat-button class=\"btn-submit\" (click)=\"openDialog();\">Group By</button>\r\n    </div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/Shared/Model/LMS/report-advance-search.model.ts":
/*!*****************************************************************!*\
  !*** ./src/app/Shared/Model/LMS/report-advance-search.model.ts ***!
  \*****************************************************************/
/*! exports provided: ReportAdvanceSearchModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportAdvanceSearchModel", function() { return ReportAdvanceSearchModel; });
var ReportAdvanceSearchModel = /** @class */ (function () {
    function ReportAdvanceSearchModel() {
    }
    return ReportAdvanceSearchModel;
}());



/***/ }),

/***/ "./src/app/Shared/Service/lms/report.service.ts":
/*!******************************************************!*\
  !*** ./src/app/Shared/Service/lms/report.service.ts ***!
  \******************************************************/
/*! exports provided: ReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportService", function() { return ReportService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var ReportService = /** @class */ (function () {
    function ReportService(_baseService) {
        this._baseService = _baseService;
    }
    ReportService.prototype.GetStatisticalReport = function (reportIndexModel, userId, groupBy1, groupBy2) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetStatisticalReportUrl + "?userId=" + userId + "&groupBy1=" + groupBy1 + "&groupBy2=" + groupBy2, reportIndexModel);
    };
    ReportService.prototype.GetDetailReport = function (reportIndexModel, userId) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetDetailReportUrl + "?userId=" + userId, reportIndexModel);
    };
    ReportService.prototype.GetAdminDepartmentAgeWiseCountReport = function (reportIndexModel, userId) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetAdminDepartmentAgeWiseCountReportUrl + "?userId=" + userId, reportIndexModel);
    };
    ReportService.prototype.GetDepartmentAgeWiseCountReport = function (reportIndexModel, userId, adminDepartmentCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetDepartmentAgeWiseCountReportUrl + "?userId=" + userId + "&adminDepartmentCode=" + adminDepartmentCode, reportIndexModel);
    };
    ReportService.prototype.GetActionHistoryReport = function (reportIndexModel, userId) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetActionHistoryReportUrl + "?userId=" + userId, reportIndexModel);
    };
    ReportService.prototype.GetAdminDepartmentLast6MonthCountReport = function (reportIndexModel, userId) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetAdminDepartmentLast6MonthCountReportUrl + "?userId=" + userId, reportIndexModel);
    };
    ReportService.prototype.GetDepartmentLast6MonthCountReport = function (reportIndexModel, userId, adminDepartmentCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].LMS_GetDepartmentLast6MonthCountReportUrl + "?userId=" + userId + "&adminDepartmentCode=" + adminDepartmentCode, reportIndexModel);
    };
    ReportService.prototype.GetStatisticalReportGroupList = function () {
        var arrGroup = [
            { Value: 'AdmDepartmentCode', Text: 'Admin Department' },
            { Value: 'Letter_DepartmentCode', Text: 'Department' },
            { Value: 'LetterSender_DistrictCode', Text: 'District' },
            { Value: 'Letter_LetterTypeCode', Text: 'Grievance Type' },
            { Value: 'LetterType', Text: 'Letter Type' },
            { Value: 'Letter_GroupCode', Text: 'Officer Group' },
            { Value: 'Letter_ReferenceeCode', Text: 'Referencee' }
        ];
        return arrGroup;
    };
    ReportService.prototype.GetGroupByText = function (grpByVal) {
        var arrGroup = this.GetStatisticalReportGroupList();
        var item = arrGroup.find(function (i) { return i.Value === grpByVal; });
        return (item) ? item.Text : '';
    };
    ReportService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    ReportService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], ReportService);
    return ReportService;
}());



/***/ }),

/***/ "./src/app/content/lms/action-history-report/action-history-report.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/content/lms/action-history-report/action-history-report.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL2FjdGlvbi1oaXN0b3J5LXJlcG9ydC9hY3Rpb24taGlzdG9yeS1yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/lms/action-history-report/action-history-report.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/content/lms/action-history-report/action-history-report.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ActionHistoryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionHistoryReportComponent", function() { return ActionHistoryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/LMS/report-advance-search.model */ "./src/app/Shared/Model/LMS/report-advance-search.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");











var ActionHistoryReportComponent = /** @class */ (function () {
    function ActionHistoryReportComponent(_appComponet, _commonService, _alertService, _reportService, _authService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this._authService = _authService;
        this.displayedColumns = ["sNo", "refNo_entryDate", "department_subject", "deptAction", "deptStatus", "cmoAction", "cmoStatus"];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.actionHistoryReport = [];
        this._appComponet.setpagelayout("Action History Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_8__["IndexModel"]();
        this.advanceSearch = new src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__["ReportAdvanceSearchModel"]();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    }
    ActionHistoryReportComponent.prototype.ngOnInit = function () {
        this.reportIndexModel.OrderByAsc = 0;
        this.getReportData();
    };
    ActionHistoryReportComponent.prototype.getAdvanceSearchReportData = function (event) {
        this.advanceSearch = event;
        this.actionHistoryReport = [];
        this.dataSource = [];
        this.totalRecords = 0;
        this.reportIndexModel.Page = 1;
        this.reportIndexModel.OrderByAsc = 0;
        this.reportIndexModel.IsPostBack = false;
        this.getReportData();
    };
    ActionHistoryReportComponent.prototype.getReportData = function () {
        var _this = this;
        this.reportIndexModel.AdvanceSearchModel = this.advanceSearch;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetActionHistoryReport(this.reportIndexModel, userId).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.actionHistoryReport = data.Data.Data;
                        _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.actionHistoryReport);
                    }
                    else {
                        _this.actionHistoryReport = [];
                        _this.dataSource = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.dataSource.paginator = _this.paginator;
                        _this.totalRecords = data.Data.TotalRecords;
                        _this.dataSource.sort = _this.sort;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.actionHistoryReport = [];
            this.dataSource = [];
        }
    };
    ActionHistoryReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.getReportData();
    };
    ActionHistoryReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.getReportData();
    };
    ActionHistoryReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"])
    ], ActionHistoryReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"])
    ], ActionHistoryReportComponent.prototype, "sort", void 0);
    ActionHistoryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-action-history-report',
            template: __webpack_require__(/*! raw-loader!./action-history-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/action-history-report/action-history-report.component.html"),
            styles: [__webpack_require__(/*! ./action-history-report.component.css */ "./src/app/content/lms/action-history-report/action-history-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]])
    ], ActionHistoryReportComponent);
    return ActionHistoryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.css":
/*!*************************************************************************************************************!*\
  !*** ./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.css ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL2FkbWluLWRlcGFydG1lbnQtYWdlLXdpc2UtcmVwb3J0L2FkbWluLWRlcGFydG1lbnQtYWdlLXdpc2UtcmVwb3J0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: AdminDepartmentAgeWiseReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminDepartmentAgeWiseReportComponent", function() { return AdminDepartmentAgeWiseReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");











var AdminDepartmentAgeWiseReportComponent = /** @class */ (function () {
    function AdminDepartmentAgeWiseReportComponent(_appComponet, _commonService, _alertService, _reportService, route, _authService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this.route = route;
        this._authService = _authService;
        this.ageWiseReport = [];
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this._appComponet.setpagelayout("Admin Department - Age Wise Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    AdminDepartmentAgeWiseReportComponent.prototype.ngOnInit = function () {
        this.bindAgeWiseCountReport();
    };
    AdminDepartmentAgeWiseReportComponent.prototype.bindAgeWiseCountReport = function () {
        var _this = this;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetAdminDepartmentAgeWiseCountReport(this.reportIndexModel, userId).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.ageWiseReport = data.Data.Data;
                    }
                    else {
                        _this.ageWiseReport = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.totalRecords = data.Data.TotalRecords;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ageWiseReport = [];
        }
    };
    AdminDepartmentAgeWiseReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.bindAgeWiseCountReport();
    };
    AdminDepartmentAgeWiseReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.bindAgeWiseCountReport();
    };
    AdminDepartmentAgeWiseReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], AdminDepartmentAgeWiseReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], AdminDepartmentAgeWiseReportComponent.prototype, "sort", void 0);
    AdminDepartmentAgeWiseReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-department-age-wise-report',
            template: __webpack_require__(/*! raw-loader!./admin-department-age-wise-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.html"),
            styles: [__webpack_require__(/*! ./admin-department-age-wise-report.component.css */ "./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"], src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]])
    ], AdminDepartmentAgeWiseReportComponent);
    return AdminDepartmentAgeWiseReportComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.css":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.css ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL2FkbWluLWRlcGFydG1lbnQtbGFzdDZtb250aC1yZXBvcnQvYWRtaW4tZGVwYXJ0bWVudC1sYXN0Nm1vbnRoLXJlcG9ydC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: AdminDepartmentLast6monthReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminDepartmentLast6monthReportComponent", function() { return AdminDepartmentLast6monthReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");










var AdminDepartmentLast6monthReportComponent = /** @class */ (function () {
    function AdminDepartmentLast6monthReportComponent(_appComponet, _commonService, _alertService, _reportService, _authService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this._authService = _authService;
        this.last6MonthReport = [];
        this._appComponet.setpagelayout("Admin Department - Last 6 Month Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    AdminDepartmentLast6monthReportComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.bindLast6MonthCountReport();
    };
    AdminDepartmentLast6monthReportComponent.prototype.bindLast6MonthCountReport = function () {
        var _this = this;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetAdminDepartmentLast6MonthCountReport(this.reportIndexModel, userId).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.last6MonthReport = data.Data.Data;
                    }
                    else {
                        _this.last6MonthReport = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.totalRecords = data.Data.TotalRecords;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.last6MonthReport = [];
        }
    };
    AdminDepartmentLast6monthReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.bindLast6MonthCountReport();
    };
    AdminDepartmentLast6monthReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.bindLast6MonthCountReport();
    };
    AdminDepartmentLast6monthReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], AdminDepartmentLast6monthReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], AdminDepartmentLast6monthReportComponent.prototype, "sort", void 0);
    AdminDepartmentLast6monthReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-department-last6month-report',
            template: __webpack_require__(/*! raw-loader!./admin-department-last6month-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.html"),
            styles: [__webpack_require__(/*! ./admin-department-last6month-report.component.css */ "./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"]])
    ], AdminDepartmentLast6monthReportComponent);
    return AdminDepartmentLast6monthReportComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".normal-table{\r\n    box-shadow: none;\r\n    border:1px solid rgba(0,0,0,0.12);\r\n}\r\n.normal-table th, .normal-table td.center{\r\n   text-align: center;\r\n}\r\n.normal-table td, .normal-table th{\r\n    border-right:1px solid rgba(0,0,0,0.12);\r\n}\r\n.normal-table td:last-child, .normal-table th:last-child{\r\n    border-right:none;\r\n}\r\n.normal-table .left{\r\n    text-align: left;\r\n }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9sbXMvZGVwYXJ0bWVudC1hZ2Utd2lzZS1yZXBvcnQvZGVwYXJ0bWVudC1hZ2Utd2lzZS1yZXBvcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixpQ0FBaUM7QUFDckM7QUFDQTtHQUNHLGtCQUFrQjtBQUNyQjtBQUNBO0lBQ0ksdUNBQXVDO0FBQzNDO0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7QUFDQTtJQUNJLGdCQUFnQjtDQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL2RlcGFydG1lbnQtYWdlLXdpc2UtcmVwb3J0L2RlcGFydG1lbnQtYWdlLXdpc2UtcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubm9ybWFsLXRhYmxle1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTtcclxufVxyXG4ubm9ybWFsLXRhYmxlIHRoLCAubm9ybWFsLXRhYmxlIHRkLmNlbnRlcntcclxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5ub3JtYWwtdGFibGUgdGQsIC5ub3JtYWwtdGFibGUgdGh7XHJcbiAgICBib3JkZXItcmlnaHQ6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XHJcbn1cclxuLm5vcm1hbC10YWJsZSB0ZDpsYXN0LWNoaWxkLCAubm9ybWFsLXRhYmxlIHRoOmxhc3QtY2hpbGR7XHJcbiAgICBib3JkZXItcmlnaHQ6bm9uZTtcclxufVxyXG4ubm9ybWFsLXRhYmxlIC5sZWZ0e1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuIH0iXX0= */"

/***/ }),

/***/ "./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.ts ***!
  \************************************************************************************************/
/*! exports provided: DepartmentAgeWiseReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentAgeWiseReportComponent", function() { return DepartmentAgeWiseReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");











var DepartmentAgeWiseReportComponent = /** @class */ (function () {
    function DepartmentAgeWiseReportComponent(_appComponet, _commonService, _alertService, _reportService, _route, _authService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this._route = _route;
        this._authService = _authService;
        this.ageWiseReport = [];
        this.adminDepartmentCode = 0;
        this._appComponet.setpagelayout("Department - Age Wise Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    DepartmentAgeWiseReportComponent.prototype.ngOnInit = function () {
        var params = this._route.snapshot.params;
        this.adminDepartmentCode = params.id;
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel; //this._authService.GetCurrentUserDetail().UserViewModel;
        this.bindAgeWiseCountReport();
    };
    DepartmentAgeWiseReportComponent.prototype.bindAgeWiseCountReport = function () {
        var _this = this;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetDepartmentAgeWiseCountReport(this.reportIndexModel, userId, this.adminDepartmentCode).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.ageWiseReport = data.Data.Data;
                    }
                    else {
                        _this.ageWiseReport = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.totalRecords = data.Data.TotalRecords;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ageWiseReport = [];
        }
    };
    DepartmentAgeWiseReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.bindAgeWiseCountReport();
    };
    DepartmentAgeWiseReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.bindAgeWiseCountReport();
    };
    DepartmentAgeWiseReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], DepartmentAgeWiseReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], DepartmentAgeWiseReportComponent.prototype, "sort", void 0);
    DepartmentAgeWiseReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-department-age-wise-report',
            template: __webpack_require__(/*! raw-loader!./department-age-wise-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.html"),
            styles: [__webpack_require__(/*! ./department-age-wise-report.component.css */ "./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"], src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]])
    ], DepartmentAgeWiseReportComponent);
    return DepartmentAgeWiseReportComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/department-last6month-report/department-last6month-report.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/content/lms/department-last6month-report/department-last6month-report.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL2RlcGFydG1lbnQtbGFzdDZtb250aC1yZXBvcnQvZGVwYXJ0bWVudC1sYXN0Nm1vbnRoLXJlcG9ydC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/lms/department-last6month-report/department-last6month-report.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/content/lms/department-last6month-report/department-last6month-report.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: DepartmentLast6monthReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentLast6monthReportComponent", function() { return DepartmentLast6monthReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");











var DepartmentLast6monthReportComponent = /** @class */ (function () {
    function DepartmentLast6monthReportComponent(_appComponet, _commonService, _alertService, _reportService, _route, _authService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this._route = _route;
        this._authService = _authService;
        this.last6MonthReport = [];
        this.adminDepartmentCode = 0;
        this._appComponet.setpagelayout("Department - Last 6 Month Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    DepartmentLast6monthReportComponent.prototype.ngOnInit = function () {
        var params = this._route.snapshot.params;
        this.adminDepartmentCode = params.id;
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.bindLast6MonthCountReport();
    };
    DepartmentLast6monthReportComponent.prototype.bindLast6MonthCountReport = function () {
        var _this = this;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetDepartmentLast6MonthCountReport(this.reportIndexModel, userId, this.adminDepartmentCode).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.last6MonthReport = data.Data.Data;
                    }
                    else {
                        _this.last6MonthReport = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.totalRecords = data.Data.TotalRecords;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.last6MonthReport = [];
        }
    };
    DepartmentLast6monthReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.bindLast6MonthCountReport();
    };
    DepartmentLast6monthReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.bindLast6MonthCountReport();
    };
    DepartmentLast6monthReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], DepartmentLast6monthReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], DepartmentLast6monthReportComponent.prototype, "sort", void 0);
    DepartmentLast6monthReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-department-last6month-report',
            template: __webpack_require__(/*! raw-loader!./department-last6month-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/department-last6month-report/department-last6month-report.component.html"),
            styles: [__webpack_require__(/*! ./department-last6month-report.component.css */ "./src/app/content/lms/department-last6month-report/department-last6month-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_5__["ReportService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"], src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]])
    ], DepartmentLast6monthReportComponent);
    return DepartmentLast6monthReportComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/detail-report/detail-report.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/lms/detail-report/detail-report.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-table{\r\n    box-shadow: none;\r\n    border:1px solid rgba(0,0,0,0.12);\r\n}\r\ntable.mat-table th {\r\n    font-size: 13px;\r\n    color: rgba(0,0,0,.87);\r\n    font-weight: bold;\r\n}\r\n.mat-table th, .mat-table td.center{\r\n   text-align: center;\r\n}\r\n.mat-table td, .mat-table th{\r\n    padding: 15px 5px;\r\n    border-left:1px solid rgba(0,0,0,0.12);\r\n}\r\n.mat-table td:first-child, .mat-table th:first-child{\r\n    border-left:none;\r\n}\r\n.mat-table .left{\r\n    text-align: left;\r\n }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9sbXMvZGV0YWlsLXJlcG9ydC9kZXRhaWwtcmVwb3J0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUNBQWlDO0FBQ3JDO0FBQ0E7SUFDSSxlQUFlO0lBQ2Ysc0JBQXNCO0lBQ3RCLGlCQUFpQjtBQUNyQjtBQUNBO0dBQ0csa0JBQWtCO0FBQ3JCO0FBQ0E7SUFDSSxpQkFBaUI7SUFDakIsc0NBQXNDO0FBQzFDO0FBQ0E7SUFDSSxnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLGdCQUFnQjtDQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL2RldGFpbC1yZXBvcnQvZGV0YWlsLXJlcG9ydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC10YWJsZXtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XHJcbn1cclxudGFibGUubWF0LXRhYmxlIHRoIHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGNvbG9yOiByZ2JhKDAsMCwwLC44Nyk7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4ubWF0LXRhYmxlIHRoLCAubWF0LXRhYmxlIHRkLmNlbnRlcntcclxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5tYXQtdGFibGUgdGQsIC5tYXQtdGFibGUgdGh7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDVweDtcclxuICAgIGJvcmRlci1sZWZ0OjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpO1xyXG59XHJcbi5tYXQtdGFibGUgdGQ6Zmlyc3QtY2hpbGQsIC5tYXQtdGFibGUgdGg6Zmlyc3QtY2hpbGR7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG59XHJcbi5tYXQtdGFibGUgLmxlZnR7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gfSJdfQ== */"

/***/ }),

/***/ "./src/app/content/lms/detail-report/detail-report.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/lms/detail-report/detail-report.component.ts ***!
  \**********************************************************************/
/*! exports provided: DetailReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailReportComponent", function() { return DetailReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/LMS/report-advance-search.model */ "./src/app/Shared/Model/LMS/report-advance-search.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");











var DetailReportComponent = /** @class */ (function () {
    function DetailReportComponent(_appComponet, _commonService, _alertService, _reportService, _authService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this._authService = _authService;
        this.displayedColumns = ["sNo", "refNo_entryDate", "subject", "referencee", "department", "senderDetail", "deptAction", "cmoAction", "cmntOfficer"];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.detailReport = [];
        this._appComponet.setpagelayout("Detail Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_8__["IndexModel"]();
        this.advanceSearch = new src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__["ReportAdvanceSearchModel"]();
    }
    DetailReportComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.reportIndexModel.OrderByAsc = 0;
        this.getReportData();
    };
    DetailReportComponent.prototype.getAdvanceSearchReportData = function (event) {
        this.advanceSearch = event;
        this.detailReport = [];
        this.dataSource = [];
        this.totalRecords = 0;
        this.reportIndexModel.Page = 1;
        this.reportIndexModel.OrderByAsc = 0;
        this.reportIndexModel.IsPostBack = false;
        this.getReportData();
    };
    DetailReportComponent.prototype.getReportData = function () {
        var _this = this;
        this.reportIndexModel.AdvanceSearchModel = this.advanceSearch;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetDetailReport(this.reportIndexModel, userId).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.detailReport = data.Data.Data;
                        _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.detailReport);
                    }
                    else {
                        _this.detailReport = [];
                        _this.dataSource = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.dataSource.paginator = _this.paginator;
                        _this.totalRecords = data.Data.TotalRecords;
                        _this.dataSource.sort = _this.sort;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.detailReport = [];
            this.dataSource = [];
        }
    };
    DetailReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.getReportData();
    };
    DetailReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.getReportData();
    };
    DetailReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"])
    ], DetailReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"])
    ], DetailReportComponent.prototype, "sort", void 0);
    DetailReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-detail-report',
            template: __webpack_require__(/*! raw-loader!./detail-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/detail-report/detail-report.component.html"),
            styles: [__webpack_require__(/*! ./detail-report.component.css */ "./src/app/content/lms/detail-report/detail-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]])
    ], DetailReportComponent);
    return DetailReportComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/lms-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/content/lms/lms-routing.module.ts ***!
  \***************************************************/
/*! exports provided: LmsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LmsRoutingModule", function() { return LmsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reports/reports.component */ "./src/app/content/lms/reports/reports.component.ts");
/* harmony import */ var _statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./statistical-report/statistical-report.component */ "./src/app/content/lms/statistical-report/statistical-report.component.ts");
/* harmony import */ var _detail_report_detail_report_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./detail-report/detail-report.component */ "./src/app/content/lms/detail-report/detail-report.component.ts");
/* harmony import */ var _admin_department_age_wise_report_admin_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin-department-age-wise-report/admin-department-age-wise-report.component */ "./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.ts");
/* harmony import */ var _department_age_wise_report_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./department-age-wise-report/department-age-wise-report.component */ "./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.ts");
/* harmony import */ var _action_history_report_action_history_report_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./action-history-report/action-history-report.component */ "./src/app/content/lms/action-history-report/action-history-report.component.ts");
/* harmony import */ var _admin_department_last6month_report_admin_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin-department-last6month-report/admin-department-last6month-report.component */ "./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.ts");
/* harmony import */ var _department_last6month_report_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./department-last6month-report/department-last6month-report.component */ "./src/app/content/lms/department-last6month-report/department-last6month-report.component.ts");












var routes = [
    {
        path: '',
        component: _reports_reports_component__WEBPACK_IMPORTED_MODULE_4__["ReportsComponent"],
    },
    {
        path: 'reports',
        component: _reports_reports_component__WEBPACK_IMPORTED_MODULE_4__["ReportsComponent"]
    },
    {
        path: 'statistical-report',
        component: _statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_5__["StatisticalReportComponent"]
    },
    {
        path: 'detail-report',
        component: _detail_report_detail_report_component__WEBPACK_IMPORTED_MODULE_6__["DetailReportComponent"]
    },
    {
        path: 'admin-department-age-wise-report',
        component: _admin_department_age_wise_report_admin_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_7__["AdminDepartmentAgeWiseReportComponent"]
    },
    {
        path: 'department-age-wise-report',
        component: _department_age_wise_report_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_8__["DepartmentAgeWiseReportComponent"]
    },
    {
        path: 'department-age-wise-report/:id',
        component: _department_age_wise_report_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_8__["DepartmentAgeWiseReportComponent"]
    },
    {
        path: 'action-history-report',
        component: _action_history_report_action_history_report_component__WEBPACK_IMPORTED_MODULE_9__["ActionHistoryReportComponent"]
    },
    {
        path: 'admin-department-last6month-report',
        component: _admin_department_last6month_report_admin_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_10__["AdminDepartmentLast6monthReportComponent"]
    },
    {
        path: 'department-last6month-report',
        component: _department_last6month_report_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_11__["DepartmentLast6monthReportComponent"]
    },
    {
        path: 'department-last6month-report/:id',
        component: _department_last6month_report_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_11__["DepartmentLast6monthReportComponent"]
    }
];
var LmsRoutingModule = /** @class */ (function () {
    function LmsRoutingModule() {
    }
    LmsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ]
        })
    ], LmsRoutingModule);
    return LmsRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/lms/lms.module.ts":
/*!*******************************************!*\
  !*** ./src/app/content/lms/lms.module.ts ***!
  \*******************************************/
/*! exports provided: LmsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LmsModule", function() { return LmsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _lms_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lms-routing.module */ "./src/app/content/lms/lms-routing.module.ts");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reports/reports.component */ "./src/app/content/lms/reports/reports.component.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _shared_report_advance_search_report_advance_search_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/report-advance-search/report-advance-search.component */ "./src/app/content/lms/shared/report-advance-search/report-advance-search.component.ts");
/* harmony import */ var _statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./statistical-report/statistical-report.component */ "./src/app/content/lms/statistical-report/statistical-report.component.ts");
/* harmony import */ var _detail_report_detail_report_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./detail-report/detail-report.component */ "./src/app/content/lms/detail-report/detail-report.component.ts");
/* harmony import */ var _admin_department_age_wise_report_admin_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin-department-age-wise-report/admin-department-age-wise-report.component */ "./src/app/content/lms/admin-department-age-wise-report/admin-department-age-wise-report.component.ts");
/* harmony import */ var _department_age_wise_report_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./department-age-wise-report/department-age-wise-report.component */ "./src/app/content/lms/department-age-wise-report/department-age-wise-report.component.ts");
/* harmony import */ var _action_history_report_action_history_report_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./action-history-report/action-history-report.component */ "./src/app/content/lms/action-history-report/action-history-report.component.ts");
/* harmony import */ var _admin_department_last6month_report_admin_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin-department-last6month-report/admin-department-last6month-report.component */ "./src/app/content/lms/admin-department-last6month-report/admin-department-last6month-report.component.ts");
/* harmony import */ var _department_last6month_report_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./department-last6month-report/department-last6month-report.component */ "./src/app/content/lms/department-last6month-report/department-last6month-report.component.ts");
/* harmony import */ var _shared_statistical_report_groupby_statistical_report_groupby_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/statistical-report-groupby/statistical-report-groupby.component */ "./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.ts");















var LmsModule = /** @class */ (function () {
    function LmsModule() {
    }
    LmsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_reports_reports_component__WEBPACK_IMPORTED_MODULE_4__["ReportsComponent"], _shared_report_advance_search_report_advance_search_component__WEBPACK_IMPORTED_MODULE_6__["ReportAdvanceSearchComponent"], _statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_7__["StatisticalReportComponent"], _detail_report_detail_report_component__WEBPACK_IMPORTED_MODULE_8__["DetailReportComponent"], _admin_department_age_wise_report_admin_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_9__["AdminDepartmentAgeWiseReportComponent"], _department_age_wise_report_department_age_wise_report_component__WEBPACK_IMPORTED_MODULE_10__["DepartmentAgeWiseReportComponent"], _action_history_report_action_history_report_component__WEBPACK_IMPORTED_MODULE_11__["ActionHistoryReportComponent"], _admin_department_last6month_report_admin_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_12__["AdminDepartmentLast6monthReportComponent"], _department_last6month_report_department_last6month_report_component__WEBPACK_IMPORTED_MODULE_13__["DepartmentLast6monthReportComponent"], _shared_statistical_report_groupby_statistical_report_groupby_component__WEBPACK_IMPORTED_MODULE_14__["StatisticalReportGroupbyComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _lms_routing_module__WEBPACK_IMPORTED_MODULE_3__["LmsRoutingModule"], src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"]],
            entryComponents: [_shared_statistical_report_groupby_statistical_report_groupby_component__WEBPACK_IMPORTED_MODULE_14__["StatisticalReportGroupbyComponent"]]
        })
    ], LmsModule);
    return LmsModule;
}());



/***/ }),

/***/ "./src/app/content/lms/reports/reports.component.css":
/*!***********************************************************!*\
  !*** ./src/app/content/lms/reports/reports.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".report_bx a {\r\n    padding: 20px;\r\n    display: block;\r\n    font-size: 16px;\r\n    box-shadow: 0px 0px 20px 0px rgba(73, 78, 92, 0.1);\r\n    border-top: 3px solid #f39c12;\r\n}\r\n.report_bx a mat-icon {\r\n    color: #3e3e3e;\r\n    display: inline-block;\r\n    position: relative;\r\n    top: 5px;\r\n    margin-right: 7px;\r\n    }\r\n.float-right{ float: right;}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9sbXMvcmVwb3J0cy9yZXBvcnRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsY0FBYztJQUNkLGVBQWU7SUFDZixrREFBa0Q7SUFDbEQsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsaUJBQWlCO0lBQ2pCO0FBQ0EsY0FBYyxZQUFZLENBQUMiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L2xtcy9yZXBvcnRzL3JlcG9ydHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXBvcnRfYnggYSB7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDIwcHggMHB4IHJnYmEoNzMsIDc4LCA5MiwgMC4xKTtcclxuICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCAjZjM5YzEyO1xyXG59XHJcbi5yZXBvcnRfYnggYSBtYXQtaWNvbiB7XHJcbiAgICBjb2xvcjogIzNlM2UzZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDogNXB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA3cHg7XHJcbiAgICB9XHJcbiAgICAuZmxvYXQtcmlnaHR7IGZsb2F0OiByaWdodDt9XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/content/lms/reports/reports.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/content/lms/reports/reports.component.ts ***!
  \**********************************************************/
/*! exports provided: ReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsComponent", function() { return ReportsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");



var ReportsComponent = /** @class */ (function () {
    function ReportsComponent(_appComponet) {
        this._appComponet = _appComponet;
        this._appComponet.setpagelayout("Reports", "", "", "");
    }
    ReportsComponent.prototype.ngOnInit = function () {
    };
    ReportsComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] }
    ]; };
    ReportsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reports',
            template: __webpack_require__(/*! raw-loader!./reports.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/reports/reports.component.html"),
            styles: [__webpack_require__(/*! ./reports.component.css */ "./src/app/content/lms/reports/reports.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/shared/report-advance-search/report-advance-search.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/lms/shared/report-advance-search/report-advance-search.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL3NoYXJlZC9yZXBvcnQtYWR2YW5jZS1zZWFyY2gvcmVwb3J0LWFkdmFuY2Utc2VhcmNoLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/lms/shared/report-advance-search/report-advance-search.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/content/lms/shared/report-advance-search/report-advance-search.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ReportAdvanceSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportAdvanceSearchComponent", function() { return ReportAdvanceSearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/LMS/report-advance-search.model */ "./src/app/Shared/Model/LMS/report-advance-search.model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/Common/format-datepicker */ "./src/app/Shared/Service/Common/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");








var ReportAdvanceSearchComponent = /** @class */ (function () {
    function ReportAdvanceSearchComponent(_commonService, _alertService) {
        this._commonService = _commonService;
        this._alertService = _alertService;
        this.outputModel = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.getDropdownList();
        this.resetAdvanceSearch();
    }
    ReportAdvanceSearchComponent.prototype.ngOnInit = function () {
    };
    ReportAdvanceSearchComponent.prototype.resetAdvanceSearch = function () {
        this.model = new src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__["ReportAdvanceSearchModel"]();
        this.model.EntryDateFrom = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].DefaultStartDate;
        this.model.EntryDateTo = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].DefaultEndDate;
        this.model.LetterType = this.model.haveAttachment = '';
    };
    ReportAdvanceSearchComponent.prototype.getDropdownList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].LMS_DDLKeyForReportAdvanceSearch).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dropdownList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ReportAdvanceSearchComponent.prototype.setSearchFilter = function () {
        this.outputModel.emit(this.model);
    };
    ReportAdvanceSearchComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ReportAdvanceSearchComponent.prototype, "outputModel", void 0);
    ReportAdvanceSearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-report-advance-search',
            template: __webpack_require__(/*! raw-loader!./report-advance-search.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/shared/report-advance-search/report-advance-search.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["DateAdapter"], useClass: src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_5__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_5__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./report-advance-search.component.css */ "./src/app/content/lms/shared/report-advance-search/report-advance-search.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"]])
    ], ReportAdvanceSearchComponent);
    return ReportAdvanceSearchComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.css":
/*!********************************************************************************************************!*\
  !*** ./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL3NoYXJlZC9zdGF0aXN0aWNhbC1yZXBvcnQtZ3JvdXBieS9zdGF0aXN0aWNhbC1yZXBvcnQtZ3JvdXBieS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: StatisticalReportGroupbyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticalReportGroupbyComponent", function() { return StatisticalReportGroupbyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");





var StatisticalReportGroupbyComponent = /** @class */ (function () {
    function StatisticalReportGroupbyComponent(_reportService, _alertService, dialogRef, data) {
        if (data === void 0) { data = null; }
        this._reportService = _reportService;
        this._alertService = _alertService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.groupByList = [];
    }
    StatisticalReportGroupbyComponent.prototype.ngOnInit = function () {
        this.groupByList = this._reportService.GetStatisticalReportGroupList();
    };
    StatisticalReportGroupbyComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    StatisticalReportGroupbyComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_4__["ReportService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    StatisticalReportGroupbyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-statistical-report-groupby',
            template: __webpack_require__(/*! raw-loader!./statistical-report-groupby.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.html"),
            styles: [__webpack_require__(/*! ./statistical-report-groupby.component.css */ "./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_4__["ReportService"], src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], StatisticalReportGroupbyComponent);
    return StatisticalReportGroupbyComponent;
}());



/***/ }),

/***/ "./src/app/content/lms/statistical-report/statistical-report.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/content/lms/statistical-report/statistical-report.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zL3N0YXRpc3RpY2FsLXJlcG9ydC9zdGF0aXN0aWNhbC1yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/lms/statistical-report/statistical-report.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/content/lms/statistical-report/statistical-report.component.ts ***!
  \********************************************************************************/
/*! exports provided: StatisticalReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticalReportComponent", function() { return StatisticalReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/LMS/report-advance-search.model */ "./src/app/Shared/Model/LMS/report-advance-search.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/lms/report.service */ "./src/app/Shared/Service/lms/report.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _shared_statistical_report_groupby_statistical_report_groupby_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/statistical-report-groupby/statistical-report-groupby.component */ "./src/app/content/lms/shared/statistical-report-groupby/statistical-report-groupby.component.ts");












var StatisticalReportComponent = /** @class */ (function () {
    function StatisticalReportComponent(_appComponet, _commonService, _alertService, _reportService, _authService, _dialog) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._reportService = _reportService;
        this._authService = _authService;
        this._dialog = _dialog;
        this.statisticalReport = [];
        this.groupBy1_Txt = "Letter Type";
        this.groupBy1_Val = "LetterType";
        this.groupBy2_Txt = "";
        this.groupBy2_Val = "";
        this._appComponet.setpagelayout("Statistical Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
        this.reportIndexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_9__["IndexModel"]();
        this.advanceSearch = new src_app_Shared_Model_LMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__["ReportAdvanceSearchModel"]();
    }
    StatisticalReportComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.reportIndexModel.OrderByAsc = 1;
        this.getReportData();
    };
    StatisticalReportComponent.prototype.getAdvanceSearchReportData = function (event) {
        this.advanceSearch = event;
        this.statisticalReport = [];
        this.dataSource = [];
        this.totalRecords = 0;
        this.reportIndexModel.Page = 1;
        this.reportIndexModel.OrderByAsc = 1;
        this.reportIndexModel.IsPostBack = false;
        this.getReportData();
    };
    StatisticalReportComponent.prototype.getReportData = function () {
        var _this = this;
        this.reportIndexModel.AdvanceSearchModel = this.advanceSearch;
        var userId = this.loginData.UserId.toString();
        if (!this._commonService.IsNullOrEmpty(userId)) {
            this._reportService.GetStatisticalReport(this.reportIndexModel, userId, this.groupBy1_Val, this.groupBy2_Val).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data.Data != null) {
                        _this.statisticalReport = data.Data.Data;
                        _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.statisticalReport);
                    }
                    else {
                        _this.statisticalReport = [];
                        _this.dataSource = [];
                    }
                    if (_this.reportIndexModel.IsPostBack == false) {
                        _this.dataSource.paginator = _this.paginator;
                        _this.totalRecords = data.Data.TotalRecords;
                        _this.dataSource.sort = _this.sort;
                    }
                }
            });
        }
        else {
            this.statisticalReport = [];
            this.dataSource = [];
        }
    };
    StatisticalReportComponent.prototype.SortData = function (event) {
        this.reportIndexModel.OrderBy = event.active;
        this.reportIndexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDsc;
        this.reportIndexModel.IsPostBack = true;
        this.getReportData();
    };
    StatisticalReportComponent.prototype.onPaginateChange = function (event) {
        this.reportIndexModel.Page = event.pageIndex + 1;
        this.reportIndexModel.PageSize = event.pageSize;
        this.reportIndexModel.IsPostBack = true;
        this.getReportData();
    };
    StatisticalReportComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this._dialog.open(_shared_statistical_report_groupby_statistical_report_groupby_component__WEBPACK_IMPORTED_MODULE_11__["StatisticalReportGroupbyComponent"], {
            width: "500px",
            data: { groupBy1_Val: this.groupBy1_Val, groupBy2_Val: this.groupBy2_Val }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.groupBy1_Txt = _this._reportService.GetGroupByText(result.groupBy1_Val);
            _this.groupBy1_Val = result.groupBy1_Val;
            _this.groupBy2_Txt = _this._reportService.GetGroupByText(result.groupBy2_Val);
            _this.groupBy2_Val = result.groupBy2_Val;
            _this.getReportData();
        });
    };
    StatisticalReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"])
    ], StatisticalReportComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"])
    ], StatisticalReportComponent.prototype, "sort", void 0);
    StatisticalReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-statistical-report",
            template: __webpack_require__(/*! raw-loader!./statistical-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lms/statistical-report/statistical-report.component.html"),
            styles: [__webpack_require__(/*! ./statistical-report.component.css */ "./src/app/content/lms/statistical-report/statistical-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"], src_app_Shared_Service_lms_report_service__WEBPACK_IMPORTED_MODULE_6__["ReportService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]])
    ], StatisticalReportComponent);
    return StatisticalReportComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-lms-lms-module.js.map