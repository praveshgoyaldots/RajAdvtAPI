(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-video-conferencing-video-conferencing-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.html ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>From Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\"\r\n        [(ngModel)]=\"filterModel.FromDate\" [max]=\"filterModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>To Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\"\r\n        [(ngModel)]=\"filterModel.ToDate\" [min]=\"filterModel.FromDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker2></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>VC Type</mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.Type\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCType\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson Category </mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.ChairPersonCategoryCode\" (ngModelChange)=\"getParticipantList($event)\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson</mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.ChairPersonCode\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>VC Category</mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.VCCategoryCode\" multiple>\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\">Clear Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12\">\r\n\r\n    <div class=\"table-responsive table-header-fixed\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\"\r\n      style=\"vertical-align:top !important\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index\">\r\n          {{  (i + 1) }}\r\n        </td>\r\n        <td mat-footer-cell *matFooterCellDef> Total </td>\r\n      </ng-container>\r\n\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n        <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n        <td mat-footer-cell *matFooterCellDef> </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"VCCount\">\r\n        <th mat-header-cell *matHeaderCellDef> Vc Count </th>\r\n        <td mat-cell *matCellDef=\"let transaction\"> {{transaction.VCCount}}\r\n        </td>\r\n        <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n    </table>\r\n  </div>\r\n    <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.html":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.html ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20 mb-0\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>From Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\"\r\n        [(ngModel)]=\"filterModel.FromDate\" [max]=\"filterModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>To Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\"\r\n        [(ngModel)]=\"filterModel.ToDate\" [min]=\"filterModel.FromDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker2></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>VC Type</mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.Type\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCType\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson Category </mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.ChairPersonCategoryCode\" (ngModelChange)=\"getParticipantList($event)\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson</mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.ChairPersonCode\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>VC Category</mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.VCCategoryCode\" multiple>\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n    <div class=\"col l6 xl6 m6 s6\">\r\n        <mat-label class=\"d-block text-blue\" style=\"margin-bottom: 4px;\">Order by</mat-label>\r\n        <mat-radio-group class=\"radio_grp\" aria-label=\"Select an option\" [(ngModel)]=\"filterModel.OrderByDptOrVCCat\">\r\n          <mat-radio-button [value]=\"0\">Department</mat-radio-button>\r\n          <mat-radio-button [value]=\"1\">VC Category</mat-radio-button>\r\n        </mat-radio-group>\r\n      </div>\r\n  <div class=\"col l6 xl6 m6 s6 text-right\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\">Clear Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12\">\r\n\r\n    <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\"\r\n      style=\"vertical-align:top !important\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index\">\r\n          {{  (i + 1) }}\r\n        </td>\r\n        <td mat-footer-cell *matFooterCellDef> Total </td>\r\n      </ng-container>\r\n\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n        <td mat-footer-cell *matFooterCellDef> </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"VCCount\">\r\n        <th mat-header-cell *matHeaderCellDef> Vc Count </th>\r\n        <td mat-cell *matCellDef=\"let transaction\"> {{transaction.VCCount}} <strong>({{transaction.VCDates}})</strong>\r\n        </td>\r\n        <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n    </table>\r\n\r\n    <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.html":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.html ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20 mb-0\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson Category </mat-label>\r\n      <mat-select [(ngModel)]=\"indexModel.ChairPersonCategoryCode\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\" >Clear Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\">\r\n\r\n      <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n\r\n             <!-- Cost Column -->\r\n        <ng-container matColumnDef=\"VCCount\">\r\n          <th mat-header-cell *matHeaderCellDef> Vc Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.VCCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Participant_Count\">\r\n          <th mat-header-cell *matHeaderCellDef> Participant Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Participant_Count}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalParticipantCount}} </td>\r\n        </ng-container>\r\n\r\n\r\n        <ng-container matColumnDef=\"TotalTimeInHours\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          Total Time in Hours\r\n          </th>\r\n          <td mat-cell *matCellDef=\"let element\">\r\n          <span *ngIf=\"element.TotalTimeInHours\"> {{element.TotalTimeInHours}} Hours</span> <span *ngIf=\"element.TotalTimeInHours && element.TotalTimeInMinutes\"> and </span> <span *ngIf=\"element.TotalTimeInMinutes\"> {{element.TotalTimeInMinutes}} Minutes</span>\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Action\">\r\n          <th mat-header-cell *matHeaderCellDef> Action </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n              <a  routerLink=\"/vc/reportsummary/{{group.ChairPersonCategoryCode}}\" title=\"View all chairperson list\">\r\n                <mat-icon>visibility</mat-icon>\r\n              </a>\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/district-report/district-report.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/report/district-report/district-report.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n        <div class=\"row m-20 \">\r\n            <div class=\"col l12 xl12 m12 s12\">\r\n                <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                  <mat-label> VC Name </mat-label>\r\n                  <mat-select [(ngModel)]=\"model.VCCode\" >\r\n                    <mat-option value=\"{{ k.Code }}\" *ngFor=\"let k of dDLList?.ddlCurrentDateVC\">{{ k.ShortDescription }}\r\n                        <span>(</span> {{ k.Date| date: 'dd/MM/yyyy' }}<span *ngIf=\"k.Date && k.Time\"> / </span>{{ k.Time }} <span>)</span>\r\n                     </mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n              </div>\r\n            <div class=\"col l12 xl12 m12 s12 text-center\">\r\n              <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n              <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\" >Clear Search</button>\r\n              <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-left: 10px;\">Print</button>\r\n            </div>\r\n  </div >\r\n<div id=\"test\">\r\n      <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n\r\n             <!-- Cost Column -->\r\n        <ng-container matColumnDef=\"ParticipantCount\">\r\n          <th mat-header-cell *matHeaderCellDef> Participant Count</th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ParticipantCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n        </ng-container>\r\n\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n    </div>\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/report-summary/report-summary.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/report/report-summary/report-summary.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20 mb-0\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson Category </mat-label>\r\n      <mat-select [(ngModel)]=\"indexModel.ChairPersonCategoryCode\" (ngModelChange)=\"getParticipantList($event)\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Chairperson</mat-label>\r\n        <mat-select [(ngModel)]=\"indexModel.ChairPersonCode\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\" >Clear Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\">\r\n\r\n      <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n\r\n             <!-- Cost Column -->\r\n        <ng-container matColumnDef=\"VCCount\">\r\n          <th mat-header-cell *matHeaderCellDef> Vc Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.VCCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Participant_Count\">\r\n          <th mat-header-cell *matHeaderCellDef> Participant Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Participant_Count}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalParticipantCount}} </td>\r\n        </ng-container>\r\n\r\n\r\n        <ng-container matColumnDef=\"TotalTimeInHours\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          Total Time in Hours\r\n          </th>\r\n          <td mat-cell *matCellDef=\"let element\">\r\n          <span *ngIf=\"element.TotalTimeInHours\"> {{element.TotalTimeInHours}} Hours</span> <span *ngIf=\"element.TotalTimeInHours && element.TotalTimeInMinutes\"> and </span> <span *ngIf=\"element.TotalTimeInMinutes\"> {{element.TotalTimeInMinutes}} Minutes</span>\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Action\">\r\n          <th mat-header-cell *matHeaderCellDef> Action </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n              <a  routerLink=\"/vc/report/{{group.ChairPersonCode}}\" title=\"View Video Conferencing List\">\r\n                <mat-icon>visibility</mat-icon>\r\n              </a>\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/report.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/report/report.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <iframe src=\"https://jankalyan.rajasthan.gov.in/admin/DynamicReport.aspx\" style=\"min-height: 800px;\" width=\"100%\"></iframe> -->\r\n<!-- <a href=\"https://jankalyan.rajasthan.gov.in/admin/DynamicReport.aspx\" target=\"_blank\">Get Report</a> -->\r\n<div class=\"row m-20 mb-0\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson Category </mat-label>\r\n      <mat-select [(ngModel)]=\"indexModel.ChairPersonCategoryCode\" (ngModelChange)=\"getParticipantList($event)\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Chairperson</mat-label>\r\n        <mat-select [(ngModel)]=\"indexModel.ChairPersonCode\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n      <mat-label class=\"d-block\" style=\"margin-bottom: 1px;\">Order by</mat-label>\r\n      <mat-radio-group class=\"radio_grp\" aria-label=\"Select an option\" [(ngModel)]=\"indexModel.OrderByDateDptVCCat\">\r\n        <mat-radio-button [value]=\"0\">Date(Descending)</mat-radio-button>\r\n        <mat-radio-button [value]=\"1\">Department</mat-radio-button>\r\n        <mat-radio-button [value]=\"2\">VC Category</mat-radio-button>\r\n      </mat-radio-group>\r\n    </div>\r\n    <div class=\"col l4 m6 s12 \">\r\n      <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label mb-10\" appearance=\"outline\">\r\n        <mat-label>Is Show Rest of the fields </mat-label>\r\n        <mat-checkbox  Id=\"IsShilanyas\" #IsShilanyas (change)=\"showData($event)\">Is Show Rest of the fields</mat-checkbox>\r\n      </section>\r\n    </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\" >Clear Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12\">\r\n\r\n    <div class=\"table-responsive\" *ngIf=\"isShowAll\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index\">\r\n          {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"StartEndTime\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t<table class=\"table-in-data-head\">\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>Start Time </td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>End Time</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let element\">\r\n\t\t\t\t\t<table class=\"table-in-data\">\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>{{ element.StartTime }}</td>\r\n\t\t\t\t\t\t\t</tr>\r\n              <tr>\r\n\t\t\t\t\t\t\t\t<td>{{ element.EndTime }}</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"ChairPersonCategoryName\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t<table class=\"table-in-data-head\">\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>Chairperson Category </td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>Chairperson Name</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let element\">\r\n\t\t\t\t\t<table class=\"table-in-data\">\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>{{ element.ChairPersonCategoryName }}</td>\r\n\t\t\t\t\t\t\t</tr>\r\n              <tr>\r\n\t\t\t\t\t\t\t\t<td>{{ element.ChairPersonName }}</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t</ng-container>\r\n      <ng-container matColumnDef=\"Date\">\r\n          <th mat-header-cell *matHeaderCellDef> Date </th>\r\n          <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n            {{ element.Date | date: 'dd/MM/yyyy' }}\r\n          </td>\r\n        </ng-container>\r\n        <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n          </ng-container>\r\n      <ng-container matColumnDef=\"TimeInHrs\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Total Time in Hours\r\n        </th>\r\n        <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.NoOfHours\"> {{element.NoOfHours}}</span> <span *ngIf=\"element.NoOfMinutes && element.NoOfHours\">:</span> <span *ngIf=\"element.NoOfMinutes\"> {{element.NoOfMinutes}}</span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n            <a  routerLink=\"/vc/participant/{{group.Code}}\" title=\"View Participant List\">\r\n              <mat-icon>visibility</mat-icon>\r\n            </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n    </table>\r\n  </div>\r\n\r\n\r\n  <div class=\"table-responsive\" *ngIf=\"!isShowAll\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index\">\r\n          {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Date\">\r\n          <th mat-header-cell *matHeaderCellDef> Date </th>\r\n          <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n            {{ element.Date | date: 'dd/MM/yyyy' }}\r\n          </td>\r\n        </ng-container>\r\n        <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n          </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n            <a  routerLink=\"/vc/participant/{{group.Code}}\" title=\"View Participant List\">\r\n              <mat-icon>visibility</mat-icon>\r\n            </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n    </table>\r\n  </div>\r\n    <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>{{pagetitle}} </p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"row mb-0\">\r\n    <div class=\"col l6 xl6 m6 s6\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label> VC Category  <span style=\"color: red\">*</span> </mat-label>\r\n            <mat-select   [(ngModel)]=\"model.VCCategoryCode\" [formControl]=\"VCCategory\" name=\"VCCategory\" id=\"VCCategory\">\r\n                <mat-option>--VC Category--</mat-option>\r\n                <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCCategory\">{{ k.Text }} </mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"VCCategory.invalid && VCCategory.touched\">\r\n            VC Category is <strong>required</strong>\r\n        </mat-error>\r\n     </div>\r\n     <div class=\"col l6 xl6 m6 s6\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\" >\r\n            <mat-label> Department <span style=\"color: red\">*</span> </mat-label>\r\n            <mat-select   [(ngModel)]=\"model.DepartmentCode\" [formControl]=\"Department\" id=\"Department\" name=\"Department\">\r\n                <mat-option>--Department--</mat-option>\r\n                <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartment\">{{ k.Text }} </mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"Department.invalid && Department.touched\">\r\n            Department is <strong>required</strong>\r\n        </mat-error>\r\n     </div>\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Title <span style=\"color: red\">*</span>\r\n          </mat-label>\r\n          <input matInput placeholder=\"Title\" [formControl]=\"ShortDescription\" name=\"ShortDescription\"\r\n            [(ngModel)]=\"model.ShortDescription\" id=\"ShortDescription\">\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"ShortDescription.invalid && ShortDescription.touched\">\r\n          Title is <strong>required</strong>\r\n        </mat-error>\r\n      </div>\r\n  <div class=\"col l12 xl12 m12 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Agenda<span style=\"color: red\">*</span> </mat-label>\r\n      <!-- <input matInput placeholder=\"VC Title\" [formControl]=\"Title\" name=\"Title\" [(ngModel)]=\"model.Title\" id=\"title\"> -->\r\n      <textarea  matInput placeholder=\"Agenda\" #title\r\n      [formControl]=\"Title\" name=\"Title\" [(ngModel)]=\"model.Title\" id=\"title\" ></textarea>\r\n    </mat-form-field>\r\n    <!-- <mat-error *ngIf=\"Title && Title.touched\">\r\n  Title is <strong>required</strong>\r\n  </mat-error> -->\r\n\r\n    <mat-error *ngIf=\"Title.invalid && Title.touched\">\r\n        Short Description is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> Meeting Participant </mat-label>\r\n        <!-- <input matInput placeholder=\"VC Title\" [formControl]=\"Title\" name=\"Title\" [(ngModel)]=\"model.Title\" id=\"title\"> -->\r\n        <textarea  matInput placeholder=\"Meeting Participant\" #MeetingParticipant\r\n         name=\"MeetingParticipant\" [(ngModel)]=\"model.MeetingParticipant\" id=\"MeetingParticipant\" ></textarea>\r\n      </mat-form-field>\r\n      <!-- <mat-error *ngIf=\"Title && Title.touched\">\r\n    Title is <strong>required</strong>\r\n    </mat-error> -->\r\n<!--\r\n      <mat-error *ngIf=\"Title.invalid && Title.touched\">\r\n          Short Description is <strong>required</strong>\r\n      </mat-error> -->\r\n\r\n    </div>\r\n\r\n\r\n  <div class=\"col l6 xl6 m6 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Date <span style=\"color: red\">*</span>\r\n\r\n      </mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Issue Date\" name=\"Date\"\r\n        id=\"Date\" [(ngModel)]=\"model.Date\" [formControl]=\"date\" (ngModelChange)=\"DateHide()\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"date.invalid && date.touched\">\r\n      Date is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s6\" *ngIf=\"this.isDate\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Time\r\n      </mat-label>\r\n      <input matInput placeholder=\"Time\" name=\"Time\" [(ngModel)]=\"model.Time\" id=\"Time\" [formControl]=\"Time\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Time.invalid && Time.touched\">\r\n      Time is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> Type <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select  #VCCreateCode [(ngModel)]=\"model.TypeCode\" [formControl]=\"Type\">\r\n            <mat-option>--Type--</mat-option>\r\n            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCType\">{{ k.Text }} </mat-option>\r\n        </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Type.invalid && Type.touched\">\r\n      Type is <strong>required</strong>\r\n    </mat-error>\r\n </div>\r\n\r\n<div class=\"col l6 xl6 m6 s6\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label> Chairperson Category  <span style=\"color: red\">*</span>:</mat-label>\r\n        <mat-select name=\"Participant Category\" [(ngModel)]=\"model.ChairPersonCategoryCode\"\r\n          (ngModelChange)=\"getParticipantList($event)\" [formControl]=\"ChairpersonCategory\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"ChairpersonCategory.invalid && ChairpersonCategory.touched\">\r\n        Chairperson Category <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s6\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label> Chairperson <span style=\"color: red\">*</span>:</mat-label>\r\n        <mat-select name=\"Office\" [(ngModel)]=\"model.ChairPersonCode\" [formControl]=\"Chairperson\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"Chairperson.invalid && Chairperson.touched\">\r\n       Chair Person <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s6\" *ngIf=\"!isDate\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Start Time\r\n        </mat-label>\r\n        <input matInput placeholder=\"Start Time\" name=\"StartTime\" [(ngModel)]=\"model.StartTime\" id=\"StartTime\">\r\n      </mat-form-field>\r\n      <!-- <mat-error *ngIf=\"Time.invalid && Time.touched\">\r\n        Time is <strong>required</strong>\r\n      </mat-error> -->\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s6\" *ngIf=\"!isDate\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>End Time\r\n        </mat-label>\r\n        <input matInput placeholder=\"End Time\" name=\"EndTime\" [(ngModel)]=\"model.EndTime\" id=\"EndTime\">\r\n      </mat-form-field>\r\n      <!-- <mat-error *ngIf=\"Time.invalid && Time.touched\">\r\n        Time is <strong>required</strong>\r\n      </mat-error> -->\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>No Of Hours\r\n        </mat-label>\r\n        <input matInput placeholder=\"No Of Hours\" name=\"NoOfHours\" type=\"number\"\r\n        onKeyPress=\"if(this.value.length==5) return false;\" [(ngModel)]=\"model.NoOfHours\" id=\"NoOfHours\">\r\n      </mat-form-field>\r\n      <!-- <mat-error *ngIf=\"Time.invalid && Time.touched\">\r\n        Time is <strong>required</strong>\r\n      </mat-error> -->\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>No Of Minutes\r\n        </mat-label>\r\n        <input matInput placeholder=\"No Of Minutes\" name=\"NoOfMinutes\" type=\"number\"\r\n        onKeyPress=\"if(this.value.length==5) return false;\" [(ngModel)]=\"model.NoOfMinutes\" id=\"NoOfMinutes\">\r\n      </mat-form-field>\r\n      <!-- <mat-error *ngIf=\"Time.invalid && Time.touched\">\r\n        Time is <strong>required</strong>\r\n      </mat-error> -->\r\n    </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-creation/vc-creation.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-creation/vc-creation.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg\">\r\n  <div class=\"col l6 xl6 m6 s6 \">\r\n    <h5 class=\"page-title\">VC Report :</h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6  text-right\">\r\n    <button mat-button class=\"btn-submit mt-6\" (click)=\"OpenDialog(null)\">\r\n      <mat-icon>add</mat-icon>Create\r\n    </button>\r\n\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n\r\n      <div class=\"row m-20 mb-0\">\r\n          <div class=\"col l6 xl4 m4 s6\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>From Date</mat-label>\r\n                <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n              <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n              <mat-datepicker #picker1></mat-datepicker>\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"col l6 xl4 m4 s4\">\r\n                <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                  <mat-label>To Date</mat-label>\r\n                  <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n                  <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                  <mat-datepicker #picker2></mat-datepicker>\r\n                </mat-form-field>\r\n              </div>\r\n            <div class=\"col l6 xl4 m4 s4\">\r\n                <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                  <mat-label>VC Type</mat-label>\r\n                  <mat-select [(ngModel)]=\"indexModel.TypeCode\">\r\n                    <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCType\">{{k.Text}}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n              </div>\r\n          <div class=\"col l6 xl4 m4 s4\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label>Chairperson Category </mat-label>\r\n              <mat-select [(ngModel)]=\"indexModel.ChairPersonCategoryCode\" (ngModelChange)=\"getParticipantList($event)\">\r\n                <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n          </div>\r\n          <div class=\"col l6 xl4 m4 s4\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>Chairperson</mat-label>\r\n                <mat-select [(ngModel)]=\"indexModel.ChairPersonCode\">\r\n                  <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n          <div class=\"col l6 xl4 m4 s4\">\r\n            <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n            <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\" >Clear Search</button>\r\n          </div>\r\n        </div>\r\n\r\n    <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\" (matSortChange)=\"sortData($event)\">\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Date\">\r\n        <th mat-header-cell *matHeaderCellDef> Date </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          {{ element.Date | date: 'dd/MM/yyyy' }}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <!-- <ng-container matColumnDef=\"Time\">\r\n        <th mat-header-cell *matHeaderCellDef> Time </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\"  >\r\n          <span *ngIf=\"element.Time\">{{ element.Time  }}</span><span *ngIf=\"!element.Time\">--</span>\r\n        </td>\r\n       </ng-container> -->\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(group.Id)\" title=\"edit\">\r\n            <mat-icon>edit</mat-icon>\r\n          </a>\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" routerLink=\"/vc/participant/{{group.Code}}\" title=\"View Participant List\">\r\n              <mat-icon>visibility</mat-icon>\r\n            </a>\r\n            <a (click)=\"onDelete(group.Id);\" title=\"Delete\" class=\"btn_delete\" href=\"javascript:void(0)\">\r\n              <mat-icon>delete</mat-icon>\r\n            </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[10, 20, 50,100]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons\r\n      *ngIf=\"totalRecords!=0\">\r\n    </mat-paginator>\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.html":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.html ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>Add VC Location Master</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n  <div class=\"col l6 xl6 m6 s12 mb-20\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\"\r\n      [(ngModel)]=\"model.VCTypeCode\" [formControl]=\"VCTypeCode\" name=\"VCTypeCode\">\r\n      <mat-label>Vc Type </mat-label>\r\n      <mat-radio-button class=\"mr-5\" value=\"{{ item.Value }}\" *ngFor=\"let item of dDLList?.RadioVcLocationType\">\r\n        {{ item.Text }}</mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\" *ngIf=\"this.model.VCTypeCode == vCLocationTypeEnum.HardVC\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>District</mat-label>\r\n      <mat-select name=\"DistrictCode\" [(ngModel)]=\"model.DistrictCode\" [formControl]=\"DistrictCode\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlDistrict\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <!-- <mat-error *ngIf=\"(fromGroup.get('DistrictCode').hasError('required') && fromGroup.get('DistrictCode').touched)\">\r\n    District is <strong>Required!</strong>\r\n  </mat-error> -->\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12 \">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>VC Location<span style=\"color: red\">*</span>\r\n      </mat-label>\r\n      <input matInput placeholder=\"VC Location\" name=\"Location\" [formControl]=\"Location\" [(ngModel)]=\"model.Location\"\r\n        id=\"Location\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Location.invalid && Location.touched\">\r\n      Location is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\" *ngIf=\"this.model.VCTypeCode == vCLocationTypeEnum.HardVC\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Incharge</mat-label>\r\n      <mat-select name=\"InchargeCode\" [(ngModel)]=\"model.InchargeCode\" [formControl]=\"InchargeCode\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlUser\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <!-- <mat-error *ngIf=\"(fromGroup.get('DistrictCode').hasError('required') && fromGroup.get('DistrictCode').touched)\">\r\n    District is <strong>Required!</strong>\r\n  </mat-error> -->\r\n  </div>\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.html ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg\">\r\n  <div class=\"col l6 xl6 m6 s6 \">\r\n    <h5 class=\"page-title\">VC Location :</h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6  text-right\" *ngIf=\"this.Permission.AddPageAccess\">\r\n    <button mat-button class=\"btn-submit mt-6\" (click)=\"OpenDialog(null)\">\r\n      <mat-icon>add</mat-icon>Create\r\n    </button>\r\n\r\n  </div>\r\n</div>\r\n<!-- <alert ></alert> -->\r\n\r\n<div class=\"col l3 xl3 m6 s12\">\r\n  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> District </mat-label>\r\n      <mat-select  #DistrictCode  [(ngModel)]=\"indexModel.DistrictCode\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDistrict\">{{ k.Text }} </mat-option>\r\n\r\n      </mat-select>\r\n  </mat-form-field>\r\n</div>\r\n\r\n<div class=\"col l6 xl6 m6 s12\">\r\n  <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n  <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Clear Search</button>\r\n  <!-- <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button> -->\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\" (matSortChange)=\"sortData($event)\">\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n\r\n\r\n<!--\r\n      <ng-container matColumnDef=\"IsActive\">\r\n        <th mat-header-cell *matHeaderCellDef> Active Status </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" title=\"Update Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container> -->\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(group.Id)\" title=\"edit\">\r\n            <mat-icon>edit</mat-icon>\r\n          </a>\r\n          <a (click)=\"onDelete(group.Id);\" title=\"Delete\" class=\"btn_delete\" href=\"javascript:void(0)\">\r\n            <mat-icon>delete</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[10, 20, 50,100]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons\r\n      *ngIf=\"totalRecords!=0\">\r\n    </mat-paginator>\r\n\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.html":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.html ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div style=\"float: right;\" class=\"col l12 s12 download_pdf\"> <a (click)=\"downloadExcelFile(model.BlankDocUrl)\"\r\n    href=\"JavaScript:Void(0);\">\r\n    <mat-icon>picture_as_pdf</mat-icon>\r\n    Click to download Demo Excel File\r\n  </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 xl12 m12 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> VC Name </mat-label>\r\n      <mat-select [(ngModel)]=\"participantTempBulkModel.VCCreateCode\" >\r\n        <mat-option value=\"{{ k.Code }}\" *ngFor=\"let k of dDLList?.ddlCurrentDateVC\">{{ k.ShortDescription }}\r\n          <span>(</span> {{ k.Date| date: 'dd/MM/yyyy' }}<span *ngIf=\"k.Date && k.Time\"> / </span>{{ k.Time }} <span>)</span>\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> District </mat-label>\r\n        <mat-select  #DistrictCode  (selectionChange)=\"GetLocation($event.value)\" [(ngModel)]=\"participantTempBulkModel.DistrictCode\">\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{ k.DistrictCode }}\" *ngFor=\"let k of ddlDistrict\">{{ k.DistrictTitle }} </mat-option>\r\n\r\n        </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6\">\r\n  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Location</mat-label>\r\n      <mat-select  #LocationCode  [(ngModel)]=\"participantTempBulkModel.LocationCode\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLLocationByDistrict\">{{ k.Text }} </mat-option>\r\n      </mat-select>\r\n  </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"w-100\" *ngIf=\"participantTempBulkModel.VCCreateCode > 0 && participantTempBulkModel.LocationCode > 0 && participantTempBulkModel.DistrictCode > 0\">\r\n<div class=\"col l6 m6 s12\" >\r\n  <div class=\"upload-btn-wrapper\">\r\n\r\n      <label>Upload Excel File</label>\r\n      <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event)\" accept=\"application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\" />\r\n\r\n      </div>\r\n\r\n      <div class=\"show-file\">\r\n        <!-- <ul class=\"image-list\"> -->\r\n          <a *ngIf=\"displayURL\" href=\"JavaScript:Void(0);\" (click)=\"downloadOtherDocPdf(displayURL)\" class=\"mt-20 mb-20\">\r\n            {{ displayName}}\r\n          </a>\r\n          <!-- <li *ngFor=\"let url of documentUrlList; let i=index;\">\r\n\r\n\r\n            <a *ngIf=\"url?.Url\" href=\"JavaScript:Void(0);\">\r\n                {{ url.DisplayName}}\r\n              </a>\r\n\r\n           <div *ngIf=\"url?.Url'\"> <img [src]=\"url?.Url\" /></div>\r\n     -->\r\n          <!-- </li>\r\n        </ul> -->\r\n      </div>\r\n\r\n</div>\r\n\r\n<div class=\"col l6 m6 s12\" style=\"margin-bottom: 20px !important;\" >\r\n<button class=\"btn-submit btn btn-info\"  type=\"submit\" (click)=\"clickToPreview();\">Click To Preview</button>\r\n</div>\r\n</div>\r\n\r\n<div class=\"col l12\">\r\n<table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\"\r\n  class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n  <ng-container matColumnDef=\"index\">\r\n    <th mat-header-cell *matHeaderCellDef>s.no</th>\r\n    <td mat-cell *matCellDef=\"let element; let i = index\">\r\n      {{ i + 1 }}\r\n    </td>\r\n  </ng-container>\r\n\r\n  <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n      {{ column.Text }}\r\n    </th>\r\n    <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n  </ng-container>\r\n\r\n  <ng-container matColumnDef=\"Action\">\r\n    <th mat-header-cell *matHeaderCellDef> Action </th>\r\n    <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n      <a (click)=\"deleteClick(group.Id)\" title=\"Delete\">\r\n        <mat-icon>delete</mat-icon>\r\n      </a>\r\n          </td>\r\n  </ng-container>\r\n\r\n<tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n<tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n</table>\r\n<button class=\"btn-submit btn btn-info mt-20\" type=\"submit\" *ngIf=\"listModel?.length>0\" (click)=\"finalSubmit();\">Final Submit</button>\r\n</div>\r\n</div >\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.html":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.html ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formGroup\">\r\n\r\n  <div class=\"row\">\r\n\r\n      <div class=\"col l12 xl12 m12 s12\">\r\n\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> VC Name </mat-label>\r\n              <mat-select formControlName=\"VCCreateCode\" #VCCreateCode [(ngModel)]=\"model.VCCreateCode\" (ngModelChange)=\"GetList()\">\r\n                  <mat-option>--Select VC Name--</mat-option>\r\n                <mat-option value=\"{{ k.Code }}\" *ngFor=\"let k of dDLList?.ddlCurrentDateVC\">{{ k.ShortDescription }}\r\n                  <span>(</span> {{ k.Date| date: 'dd/MM/yyyy' }}<span *ngIf=\"k.Date && k.Time\">/</span>{{ k.Time }} <span>)</span></mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n          <mat-error\r\n              *ngIf=\"formGroup.get('VCCreateCode').hasError('required') && (formGroup.get('VCCreateCode').touched && formGroup.get('VCCreateCode').invalid)\">\r\n              VC Name is <strong>required!</strong>\r\n          </mat-error>\r\n      </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Participant Category <span style=\"color: red\">*</span> </mat-label>\r\n          <mat-select formControlName=\"ParticipantCategoryCode\" #ParticipantCategoryCode (selectionChange)=\"GetParticipantClick($event.value)\" [(ngModel)]=\"model.ParticipantCategoryCode\">\r\n              <mat-option>--Select--</mat-option>\r\n              <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{ k.Text }} </mat-option>\r\n          </mat-select>\r\n      </mat-form-field>\r\n      <mat-error\r\n          *ngIf=\"formGroup.get('ParticipantCategoryCode').hasError('required') && (formGroup.get('ParticipantCategoryCode').touched && formGroup.get('ParticipantCategoryCode').invalid)\">\r\n          Participant Category is <strong>required!</strong>\r\n      </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> Participant <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select *ngIf=\"model.Id\" formControlName=\"ParticipantCode\" #ParticipantCode (selectionChange)=\"participantClick($event.value)\" [(ngModel)]=\"model.ParticipantCode\">\r\n            <mat-option value=\"{{ k.Code }}\" *ngFor=\"let k of dDLParticipant\">{{ k.NameEnglish }} </mat-option>\r\n            <mat-option [value]=\"0\">Others</mat-option>\r\n        </mat-select>\r\n        <mat-select *ngIf=\"!model.Id\" formControlName=\"ParticipantCodeList\" #ParticipantCodeList (selectionChange)=\"participantClick($event.value)\" [(ngModel)]=\"model.ParticipantCodeList\" multiple>\r\n            <mat-option value=\"{{ k.Code }}\" *ngFor=\"let k of dDLParticipant\">{{ k.NameEnglish }} </mat-option>\r\n            <mat-option [value]=\"0\">Others</mat-option>\r\n        </mat-select>\r\n    </mat-form-field>\r\n    <mat-error\r\n        *ngIf=\"formGroup.get('ParticipantCode').hasError('required') && (formGroup.get('ParticipantCode').touched && formGroup.get('ParticipantCode').invalid)\">\r\n        Participant is <strong>required!</strong>\r\n    </mat-error>\r\n\r\n    <mat-error\r\n    *ngIf=\"formGroup.get('ParticipantCodeList').hasError('required') && (formGroup.get('ParticipantCodeList').touched && formGroup.get('ParticipantCodeList').invalid)\">\r\n    Participant is <strong>required!</strong>\r\n</mat-error>\r\n</div>\r\n      <div class=\"col l12 m12 s12\" *ngIf=\"(model.Id==0 && !isEnableNameDesignation) || model.Id>0\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label>Name <span style=\"color: red\">*</span>\r\n              </mat-label>\r\n              <input matInput placeholder=\"Name\" *ngIf=\"isEnableNameDesignation\" [(ngModel)]=\"model.Name\" formControlName=\"Name\" name=\"Name\" readonly>\r\n              <input matInput placeholder=\"Name\" *ngIf=\"!isEnableNameDesignation\" [(ngModel)]=\"model.Name\" formControlName=\"Name\" name=\"Name\">\r\n          </mat-form-field>\r\n          <mat-error\r\n              *ngIf=\"formGroup.get('Name').hasError('required') && (formGroup.get('Name').touched && formGroup.get('Name').invalid)\">\r\n              Name is <strong>required!</strong>\r\n          </mat-error>\r\n      </div>\r\n      <div class=\"col l12 m12 s12\" *ngIf=\"(model.Id==0 && !isEnableNameDesignation) || model.Id>0\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Designation <span style=\"color: red\">*</span>\r\n            </mat-label>\r\n            <!-- <input matInput placeholder=\"Designation\" *ngIf=\"isEnableNameDesignation\" [(ngModel)]=\"model.Designation\" formControlName=\"Designation\" name=\"Designation\" readonly> -->\r\n            <input matInput placeholder=\"Designation\" *ngIf=\"isEnableNameDesignation\" [(ngModel)]=\"model.Designation\" formControlName=\"Designation\" name=\"Designation\">\r\n            <input matInput placeholder=\"Designation\" *ngIf=\"!isEnableNameDesignation\" [(ngModel)]=\"model.Designation\" formControlName=\"Designation\" name=\"Designation\" >\r\n          </mat-form-field>\r\n        <mat-error\r\n            *ngIf=\"formGroup.get('Designation').hasError('required') && (formGroup.get('Designation').touched && formGroup.get('Designation').invalid)\">\r\n            Designation is <strong>required!</strong>\r\n        </mat-error>\r\n    </div>\r\n    <div class=\"col l12 m12 s12\" *ngIf=\"(model.Id==0 && !isEnableNameDesignation) || model.Id>0\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Mobile No.\r\n            </mat-label>\r\n            <!-- <input matInput placeholder=\"Mobile No.\" *ngIf=\"isEnableNameDesignation\" [(ngModel)]=\"model.MobileNo\" formControlName=\"MobileNo\" name=\"MobileNo\" readonly> -->\r\n            <input matInput placeholder=\"Mobile No.\" [(ngModel)]=\"model.MobileNo\" formControlName=\"MobileNo\" name=\"MobileNo\" >\r\n        </mat-form-field>\r\n        <mat-error\r\n            *ngIf=\"formGroup.get('MobileNo').hasError('required') && (formGroup.get('MobileNo').touched && formGroup.get('MobileNo').invalid)\">\r\n            Mobile No. is <strong>required!</strong>\r\n        </mat-error>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label> District <span style=\"color: red\">*</span> </mat-label>\r\n          <mat-select formControlName=\"DistrictCode\" #DistrictCode  (selectionChange)=\"GetLocation($event.value)\" [(ngModel)]=\"model.DistrictCode\">\r\n              <mat-option>--Select--</mat-option>\r\n              <mat-option value=\"{{ k.DistrictCode }}\" *ngFor=\"let k of ddlDistrict\">{{ k.DistrictTitle }} </mat-option>\r\n\r\n          </mat-select>\r\n      </mat-form-field>\r\n      <mat-error\r\n          *ngIf=\"formGroup.get('DistrictCode').hasError('required') && (formGroup.get('DistrictCode').touched && formGroup.get('DistrictCode').invalid)\">\r\n          District is <strong>required!</strong>\r\n      </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Location <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select formControlName=\"LocationCode\" #LocationCode  (selectionChange)=\"otherLocationClick()\" [(ngModel)]=\"model.LocationCode\">\r\n            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLLocationByDistrict\">{{ k.Text }} </mat-option>\r\n            <mat-option [value]=\"0\" >Others</mat-option>\r\n        </mat-select>\r\n    </mat-form-field>\r\n    <mat-error\r\n        *ngIf=\"formGroup.get('LocationCode').hasError('required') && (formGroup.get('LocationCode').touched && formGroup.get('LocationCode').invalid)\">\r\n        Location is <strong>required!</strong>\r\n    </mat-error>\r\n</div>\r\n<div class=\"col l6 xl6 m6 s12\" *ngIf=\"isOtherLocation\">\r\n  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Mode <span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select formControlName=\"ModeCode\" #ModeCode [(ngModel)]=\"model.ModeCode\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCMode\">{{ k.Text }} </mat-option>\r\n      </mat-select>\r\n  </mat-form-field>\r\n  <mat-error\r\n      *ngIf=\"formGroup.get('ModeCode').hasError('required') && (formGroup.get('ModeCode').touched && formGroup.get('ModeCode').invalid)\">\r\n      Mode is <strong>required!</strong>\r\n  </mat-error>\r\n</div>\r\n<div class=\"col l6 xl6 m6 s12\" *ngIf=\"isOtherLocation\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Location  </mat-label>\r\n        <input matInput placeholder=\"Location\" [(ngModel)]=\"model.LocationTextBox\" formControlName=\"LocationTextBox\" name=\"LocationTextBox\" >\r\n    </mat-form-field>\r\n     </div>\r\n      <div class=\"col l12 x8 m4 s6 clearfix\">\r\n          <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">{{title}}</button>\r\n      </div>\r\n  </div>\r\n</form>\r\n\r\n<div class=\"row light-bg\">\r\n    <div class=\"col l6 xl6 m6 s6 \">\r\n      <h5 class=\"page-title\">Participant List By VC :</h5>\r\n    </div>\r\n  </div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\">\r\n      <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\" (matSortChange)=\"SortData($event)\"\r\n        class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n          </td>\r\n        </ng-container>\r\n        <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n            {{ column.Text }}\r\n          </th>\r\n          <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"NodalDepartmentTitle\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n            Nodel Department Name~\r\n          </th>\r\n          <td mat-cell *matCellDef=\"let element\">\r\n            <span innerHTML=\"{{element.NodalDepartmentTitle}}\"></span>\r\n          </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Action\">\r\n          <th mat-header-cell *matHeaderCellDef>Action</th>\r\n          <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n            <a (click)=\"editClick(element.Id);\" title=\"Edit\" class=\"btn_edit\" href=\"javascript:void(0)\">\r\n              <mat-icon>edit</mat-icon>\r\n            </a>\r\n            <a (click)=\"onDelete(element.Id);\" title=\"Delete\" class=\"btn_delete\" href=\"javascript:void(0)\">\r\n              <mat-icon>delete</mat-icon>\r\n            </a>\r\n            <a class=\"prestntabsent-btn\" (click)=\"markPresentAbsent(element.Id);\" title=\"PrestntAbsent\"href=\"javascript:void(0)\">\r\n              <span class=\"badget\" *ngIf=\"element.IsPresent\" style=\"background-color: green;\">Present</span>\r\n              <span class=\"badget\" *ngIf=\"!element.IsPresent\" style=\"background-color: red;\">Absent</span>\r\n            </a>\r\n          </td>\r\n        </ng-container>\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n      </table>\r\n      <mat-paginator #paginator *ngIf=\"listModel?.length>0\" [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n        [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.html":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.html ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"modal-header\">\r\n  <p>VC Participant List</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon></button>\r\n\r\n  </div>\r\n           <div class=\"col l12 s12 \" >\r\n\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" *ngIf=\"listModel?.length>0\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"NodalDepartmentTitle\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n         Nodel Department Name~\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span innerHTML=\"{{element.NodalDepartmentTitle}}\"></span>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n  <mat-paginator #paginator [length]=\"totalRecords\" *ngIf=\"listModel?.length>0\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n\r\n          </div>\r\n\r\n<div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/vc-participant.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/video-conferencing/vc-participant/vc-participant.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n      <div class=\"row m-20 mb-0\">\r\n\r\n          <div class=\"col l4 xl4 m6 s12\" style=\"margin-bottom: 20px !important;\">\r\n              <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n              aria-label=\"Select an option\" [(ngModel)]=\"vCCustomFilter.IsAllVC\">\r\n              <mat-radio-button class=\"mr-5 mb-10\" [value]=\"false\" (change)=\"VCRadioClick($event.value)\" >Show All</mat-radio-button>\r\n              <mat-radio-button class=\"mr-5\" [value]=\"true\" (change)=\"VCRadioClick($event.value)\" >Active(Current + Future)</mat-radio-button>\r\n              </mat-radio-group>\r\n              </div>\r\n\r\n          <div class=\"col l4 xl4 m6 s12\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>Date</mat-label>\r\n                <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" (dateChange)=\"FillVCNameClick()\" readonly placeholder=\"Date\" [(ngModel)]=\"vCCustomFilter.Date\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                <mat-datepicker #picker2></mat-datepicker>\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"col l4 xl4 m6 s12\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>VC Type</mat-label>\r\n                <mat-select [(ngModel)]=\"vCCustomFilter.TypeCode\" (selectionChange)=\"FillVCNameClick()\">\r\n                  <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCType\">{{k.Text}}</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n            <!-- <div class=\"col l6 xl2 m2 s2\">\r\n                <button (click)=\"FillVCNameClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Fill VC Name</button>\r\n              </div> -->\r\n    <div class=\"col l12 xl12 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> VC Name </mat-label>\r\n        <mat-select [(ngModel)]=\"vCCustomFilter.VcCode\" >\r\n          <mat-option value=\"{{ k.Code }}\" *ngFor=\"let k of ddlCreateVCList\">{{ k.ShortDescription }}\r\n              <span>(</span> {{ k.Date| date: 'dd/MM/yyyy' }}<span *ngIf=\"k.Date && k.Time\"> / </span>{{ k.Time }} <span>)</span>\r\n           </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label> District </mat-label>\r\n            <mat-select  #DistrictCode  (selectionChange)=\"GetLocation($event.value)\" [(ngModel)]=\"vCCustomFilter.DistrictCode\">\r\n                <mat-option>--Select--</mat-option>\r\n                <mat-option value=\"{{ k.DistrictCode }}\" *ngFor=\"let k of ddlDistrict\">{{ k.DistrictTitle }} </mat-option>\r\n\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Location  </mat-label>\r\n          <mat-select  #LocationCode  [(ngModel)]=\"vCCustomFilter.LocationCode\">\r\n              <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLLocationByDistrict\">{{ k.Text }} </mat-option>\r\n          </mat-select>\r\n      </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl6 m4 s12\">\r\n    <mat-radio-group class=\"radio_grp mt-10 radio-bx-custom\" aria-label=\"Select an option\" [(ngModel)]=\"vCCustomFilter.IsPresent\">\r\n      <mat-radio-button [value]=\"1\" (change)=\"gePresentAbsentData(1)\">Present\r\n      </mat-radio-button>\r\n      <mat-radio-button [value]=\"0\" (change)=\"gePresentAbsentData(0)\">Absent</mat-radio-button>\r\n      <mat-radio-button [value]=\"-1\" (change)=\"gePresentAbsentData(-1)\">Both</mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12\">\r\n    <mat-radio-group class=\"example-full-width\r\n    radio_grp radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\" [(ngModel)]=\"vCCustomFilter.IsOrderByDLPCorPCDL\">\r\n      <mat-label>Display Order</mat-label>\r\n      <mat-radio-button [value]=\"1\" (change)=\"geDistrictLocationOrderNoData(1)\"> Present/Absent + District + Location + Order No. of Participant Category + Entry Number\r\n      </mat-radio-button>\r\n      <mat-radio-button [value]=\"0\" (change)=\"geDistrictLocationOrderNoData(0)\"> Present/Absent + Order No. of Participant Category + District + Location + Entry Number</mat-radio-button>\r\n\r\n    </mat-radio-group>\r\n  </div>\r\n<!-- <div class=\"col l6 xl4 m4 s4\">DistrictCode LocationCode\r\n  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n    <mat-label>Chairperson Category </mat-label>\r\n    <mat-select [(ngModel)]=\"vCCustomFilter.ChairPersonCategoryCode\" (ngModelChange)=\"getParticipantList($event)\">\r\n      <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{k.Text}}</mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n</div>\r\n<div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Chairperson</mat-label>\r\n      <mat-select [(ngModel)]=\"vCCustomFilter.ChairPersonCode\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlParticipant\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div> -->\r\n  <div class=\"col l6 xl6 m4 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Category  </mat-label>\r\n          <mat-select  [(ngModel)]=\"vCCustomFilter.ParticipantCategoryCode\">\r\n              <mat-option>--Select--</mat-option>\r\n              <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{ k.Text }} </mat-option>\r\n          </mat-select>\r\n      </mat-form-field>\r\n       </div>\r\n\r\n  <div class=\"col l4 m6 s12 \">\r\n      <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label mb-10\" appearance=\"outline\">\r\n        <mat-label>Is Show Category </mat-label>\r\n        <mat-checkbox  Id=\"IsShilanyas\" #IsShilanyas (change)=\"showData($event)\">Is Show Category</mat-checkbox>\r\n      </section>\r\n    </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12 text-right\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Clear Search</button>\r\n    <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button>\r\n    <button class=\"btn btn-danger\" *ngIf=\"vCCustomFilter.VcCode>0\"  routerLink=\"/vcreport/vcagendareport/{{vCCustomFilter.VcCode}}\">Graphical Report</button>\r\n  </div>\r\n</div>\r\n<div  id=\"test\">\r\n<div class=\"row\">\r\n    <div  class=\"col l12 xl12 m12 s12 \" style=\"text-align: center;\">\r\n        <span *ngIf=\"vCCustomFilter?.VcCode\" > {{ CreateVCItems[(vCCustomFilter?.VcCode)] }}</span>\r\n        <span *ngIf=\"vCCustomFilter?.VcCode\" > {{ CreateChairPersonCategoryVCItems[(vCCustomFilter?.VcCode)] }}</span>\r\n        <span *ngIf=\"vCCustomFilter?.VcCode\" > {{ CreateChairPersonVCItems[(vCCustomFilter?.VcCode)]}}</span>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n      <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\"\r\n          class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n          <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>s.no</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{ i + 1 }}\r\n            </td>\r\n          </ng-container>\r\n\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n              {{ column.Text }}\r\n            </th>\r\n            <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"IsPresent\" *ngIf=\"vCCustomFilter.IsPresent==-1\">\r\n              <th mat-header-cell *matHeaderCellDef>Absent/Present</th>\r\n              <td mat-cell *matCellDef=\"let element; let i = index\">\r\n                  <span class=\"badget\" *ngIf=\"element.IsPresent\" style=\"background-color: green;\">Present</span>\r\n                  <span class=\"badget\" *ngIf=\"!element.IsPresent\" style=\"background-color: red;\">Absent</span>\r\n              </td>\r\n            </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n    </table>\r\n\r\n\r\n\r\n\r\n  </div>\r\n    <!-- <mat-paginator #paginator *ngIf=\"listModel?.length>0\" [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5, 10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator> -->\r\n\r\n    <div *ngIf=\"listModel?.length==0\" class=\"msg-not-found\"> Record Not Found</div>\r\n\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Shared/Enum/office-type.enum.ts":
/*!*************************************************!*\
  !*** ./src/app/Shared/Enum/office-type.enum.ts ***!
  \*************************************************/
/*! exports provided: OfficeTypeEnum, VCLocationTypeEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfficeTypeEnum", function() { return OfficeTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCLocationTypeEnum", function() { return VCLocationTypeEnum; });
var OfficeTypeEnum;
(function (OfficeTypeEnum) {
    OfficeTypeEnum[OfficeTypeEnum["HeadOffice"] = 10057] = "HeadOffice";
    OfficeTypeEnum[OfficeTypeEnum["ReportingOffice"] = 20057] = "ReportingOffice";
})(OfficeTypeEnum || (OfficeTypeEnum = {}));
var VCLocationTypeEnum;
(function (VCLocationTypeEnum) {
    VCLocationTypeEnum[VCLocationTypeEnum["HardVC"] = 20058] = "HardVC";
    VCLocationTypeEnum[VCLocationTypeEnum["SoftVC"] = 20059] = "SoftVC";
})(VCLocationTypeEnum || (VCLocationTypeEnum = {}));


/***/ }),

/***/ "./src/app/Shared/Model/VC/vc-locationmaster.model.ts":
/*!************************************************************!*\
  !*** ./src/app/Shared/Model/VC/vc-locationmaster.model.ts ***!
  \************************************************************/
/*! exports provided: VCLocationMasterViewModel, VCLocationSearchModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCLocationMasterViewModel", function() { return VCLocationMasterViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCLocationSearchModel", function() { return VCLocationSearchModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _general_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../general-model */ "./src/app/Shared/Model/general-model.ts");


var VCLocationMasterViewModel = /** @class */ (function () {
    function VCLocationMasterViewModel() {
    }
    return VCLocationMasterViewModel;
}());

var VCLocationSearchModel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](VCLocationSearchModel, _super);
    function VCLocationSearchModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VCLocationSearchModel;
}(_general_model__WEBPACK_IMPORTED_MODULE_1__["IndexModel"]));



/***/ }),

/***/ "./src/app/Shared/Model/VC/vc-participant-model.ts":
/*!*********************************************************!*\
  !*** ./src/app/Shared/Model/VC/vc-participant-model.ts ***!
  \*********************************************************/
/*! exports provided: VCParticipantModel, VCParticipantViewModel, VCParticipantReportViewModel, VCCreationDDLModel, VCParticipantDDLModel, VCCustomFilter, ExcelFileViewModel, ParticipantTempBulkModel, ParticipantTempBulkViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCParticipantModel", function() { return VCParticipantModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCParticipantViewModel", function() { return VCParticipantViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCParticipantReportViewModel", function() { return VCParticipantReportViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCCreationDDLModel", function() { return VCCreationDDLModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCParticipantDDLModel", function() { return VCParticipantDDLModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCCustomFilter", function() { return VCCustomFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelFileViewModel", function() { return ExcelFileViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticipantTempBulkModel", function() { return ParticipantTempBulkModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticipantTempBulkViewModel", function() { return ParticipantTempBulkViewModel; });
var VCParticipantModel = /** @class */ (function () {
    function VCParticipantModel() {
        this.Id = 0;
        this.VCCreateCode = null;
    }
    return VCParticipantModel;
}());

var VCParticipantViewModel = /** @class */ (function () {
    function VCParticipantViewModel() {
    }
    return VCParticipantViewModel;
}());

var VCParticipantReportViewModel = /** @class */ (function () {
    function VCParticipantReportViewModel() {
    }
    return VCParticipantReportViewModel;
}());

var VCCreationDDLModel = /** @class */ (function () {
    function VCCreationDDLModel() {
    }
    return VCCreationDDLModel;
}());

var VCParticipantDDLModel = /** @class */ (function () {
    function VCParticipantDDLModel() {
    }
    return VCParticipantDDLModel;
}());

var VCCustomFilter = /** @class */ (function () {
    function VCCustomFilter() {
        this.IsAllVC = true;
        this.IsPresent = -1;
        this.IsOrderByDLPCorPCDL = 1;
    }
    return VCCustomFilter;
}());

var ExcelFileViewModel = /** @class */ (function () {
    function ExcelFileViewModel() {
        this.MediaUrlList = [];
    }
    return ExcelFileViewModel;
}());

var ParticipantTempBulkModel = /** @class */ (function () {
    function ParticipantTempBulkModel() {
    }
    return ParticipantTempBulkModel;
}());

//#region Bulk upload
var ParticipantTempBulkViewModel = /** @class */ (function () {
    function ParticipantTempBulkViewModel() {
    }
    return ParticipantTempBulkViewModel;
}());

//#endregion


/***/ }),

/***/ "./src/app/Shared/Service/VC/vc-locationmaster.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/Shared/Service/VC/vc-locationmaster.service.ts ***!
  \****************************************************************/
/*! exports provided: VcLocationmasterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcLocationmasterService", function() { return VcLocationmasterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var VcLocationmasterService = /** @class */ (function () {
    function VcLocationmasterService(_baseService) {
        this._baseService = _baseService;
    }
    VcLocationmasterService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VCLocationMasterListUrl, model);
    };
    VcLocationmasterService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VCLocationMasterAddUrl, model);
    };
    VcLocationmasterService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VCLocationMasterUpdateUrl, model);
    };
    VcLocationmasterService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VCLocationMasterUpdateStatusUrl + id);
    };
    VcLocationmasterService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VCLocationMasterGetByIdUrl + id);
    };
    VcLocationmasterService.prototype.Delete = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VCLocationDeleteUrl + id);
    };
    VcLocationmasterService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    VcLocationmasterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], VcLocationmasterService);
    return VcLocationmasterService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/VC/vc-participant.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/Shared/Service/VC/vc-participant.service.ts ***!
  \*************************************************************/
/*! exports provided: VCParticipantService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCParticipantService", function() { return VCParticipantService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");




var VCParticipantService = /** @class */ (function () {
    function VCParticipantService(_baseService) {
        this._baseService = _baseService;
    }
    VCParticipantService.prototype.GetList = function (model, vCCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantGetListURL + vCCode, model);
    };
    VCParticipantService.prototype.GetVCParticipantReport = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCReportURL, model);
    };
    VCParticipantService.prototype.GetParicipantReport = function (model, vCCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantGetParicipantReportURL + vCCode, model);
    };
    VCParticipantService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantAddURL, model);
    };
    VCParticipantService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantUpdateURL, model);
    };
    VCParticipantService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantUpdateStatusURL + id);
    };
    VCParticipantService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantGetByIdURL + id);
    };
    VCParticipantService.prototype.UploadExcel = function (formData) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ParticipantExcelUploadURL, formData);
    };
    VCParticipantService.prototype.GetExcelFileDownload = function () {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].GetExcelFileDownloadUrl);
    };
    VCParticipantService.prototype.ParticipantExcelFinalUpload = function () {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ParticipantExcelFinalSubmitURL);
    };
    VCParticipantService.prototype.DeleteItemFromExcelGrid = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].deleteDataFromExcelURL + id);
    };
    VCParticipantService.prototype.GetParticipantExcelUploadTempList = function () {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].GetParticipantExcelUploadTempListURL);
    };
    VCParticipantService.prototype.Delete = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCParticipantDeleteURL + id);
    };
    VCParticipantService.prototype.MarkAsPresentAbsent = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].MarkPresentAbsentURL + id);
    };
    VCParticipantService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    VCParticipantService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], VCParticipantService);
    return VCParticipantService;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.css":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.css ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3JlcG9ydC9hZG0tZHB0LWNhdC1zdW1tYXJ5LXJlcG9ydC9hZG0tZHB0LWNhdC1zdW1tYXJ5LXJlcG9ydC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: AdmDptCatSummaryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdmDptCatSummaryReportComponent", function() { return AdmDptCatSummaryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");









var AdmDptCatSummaryReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function AdmDptCatSummaryReportComponent(_alertService, _vccreationService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._vccreationService = _vccreationService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = [
            "index",
            "AdmDepartmentTitle",
            "DepartmentTitle",
            "VCCategoryName",
            "VCCount"
        ];
        this.ViewdisplayedColumns = [
            { Value: "VCCategoryName", Text: "VC Category" },
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "AdmDepartmentTitle", Text: "Admin Department" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("VC Admin Department, Department and Category wise Summary Report :", "", "", "");
        this.filterModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["CategoryAndDptWiseSummaryVCReportFilterModel"]();
    }
    //#endregion constructor
    //#region Methods
    AdmDptCatSummaryReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    /** Gets the total cost of all transactions. */
    AdmDptCatSummaryReportComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel
            .map(function (t) { return t.VCCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    AdmDptCatSummaryReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AdmDptCatSummaryReportComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    AdmDptCatSummaryReportComponent.prototype.GetList = function () {
        var _this = this;
        if (this.filterModel.VCCategoryCode) {
            this.filterModel.VCCategoryCodes = this.filterModel.VCCategoryCode.toString();
        }
        this._vccreationService
            .GetAdmDptCatWiseSummaryVCReport(this.filterModel)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AdmDptCatSummaryReportComponent.prototype.searchClick = function () {
        if (this.filterModel.FromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.filterModel.FromDate).getFullYear(), new Date(this.filterModel.FromDate).getMonth(), new Date(this.filterModel.FromDate).getDate())).toISOString();
            this.filterModel.FromDate = uTCFromDate;
        }
        if (this.filterModel.ToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.filterModel.ToDate).getFullYear(), new Date(this.filterModel.ToDate).getMonth(), new Date(this.filterModel.ToDate).getDate())).toISOString();
            this.filterModel.ToDate = uTCToDate;
        }
        this.GetList();
    };
    AdmDptCatSummaryReportComponent.prototype.clearClick = function () {
        this.filterModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["CategoryAndDptWiseSummaryVCReportFilterModel"]();
        this.listModel = [];
    };
    AdmDptCatSummaryReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], AdmDptCatSummaryReportComponent.prototype, "sort", void 0);
    AdmDptCatSummaryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-adm-dpt-cat-summary-report",
            template: __webpack_require__(/*! raw-loader!./adm-dpt-cat-summary-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.html"),
            styles: [__webpack_require__(/*! ./adm-dpt-cat-summary-report.component.css */ "./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]])
    ], AdmDptCatSummaryReportComponent);
    return AdmDptCatSummaryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.css":
/*!***************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3JlcG9ydC9jYXQtZHB0LXN1bW1hcnktcmVwb3J0L2NhdC1kcHQtc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: CatDptSummaryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatDptSummaryReportComponent", function() { return CatDptSummaryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");









var CatDptSummaryReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function CatDptSummaryReportComponent(_alertService, _vccreationService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._vccreationService = _vccreationService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = [
            "index",
            "VCCategoryName",
            "DepartmentTitle",
            "VCCount",
        ];
        this.ViewdisplayedColumns = [
            { Value: "VCCategoryName", Text: "VC Category" },
            { Value: "DepartmentTitle", Text: "Department" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("VC Category and Department wise Summary Report :", "", "", "");
        this.filterModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["CategoryAndDptWiseSummaryVCReportFilterModel"]();
    }
    //#endregion constructor
    //#region Methods
    CatDptSummaryReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    /** Gets the total cost of all transactions. */
    CatDptSummaryReportComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel
            .map(function (t) { return t.VCCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    CatDptSummaryReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CatDptSummaryReportComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    CatDptSummaryReportComponent.prototype.GetList = function () {
        var _this = this;
        if (this.filterModel.VCCategoryCode) {
            this.filterModel.VCCategoryCodes = this.filterModel.VCCategoryCode.toString();
        }
        this._vccreationService.GetCategoryAndDptWiseSummaryVCReport(this.filterModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CatDptSummaryReportComponent.prototype.searchClick = function () {
        if (this.filterModel.FromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.filterModel.FromDate).getFullYear(), new Date(this.filterModel.FromDate).getMonth(), new Date(this.filterModel.FromDate).getDate())).toISOString();
            this.filterModel.FromDate = uTCFromDate;
        }
        if (this.filterModel.ToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.filterModel.ToDate).getFullYear(), new Date(this.filterModel.ToDate).getMonth(), new Date(this.filterModel.ToDate).getDate())).toISOString();
            this.filterModel.ToDate = uTCToDate;
        }
        this.GetList();
    };
    CatDptSummaryReportComponent.prototype.clearClick = function () {
        this.filterModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["CategoryAndDptWiseSummaryVCReportFilterModel"]();
        this.listModel = [];
    };
    CatDptSummaryReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], CatDptSummaryReportComponent.prototype, "sort", void 0);
    CatDptSummaryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cat-dpt-summary-report',
            template: __webpack_require__(/*! raw-loader!./cat-dpt-summary-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.html"),
            styles: [__webpack_require__(/*! ./cat-dpt-summary-report.component.css */ "./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]])
    ], CatDptSummaryReportComponent);
    return CatDptSummaryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.css":
/*!*******************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.css ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92aWRlby1jb25mZXJlbmNpbmcvcmVwb3J0L2NoYWlycGVyc29uLWNhdC1zdW1tYXJ5LXJlcG9ydC9jaGFpcnBlcnNvbi1jYXQtc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3JlcG9ydC9jaGFpcnBlcnNvbi1jYXQtc3VtbWFyeS1yZXBvcnQvY2hhaXJwZXJzb24tY2F0LXN1bW1hcnktcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRyLm1hdC1mb290ZXItcm93IHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: ChairpersonCatSummaryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChairpersonCatSummaryReportComponent", function() { return ChairpersonCatSummaryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");









var ChairpersonCatSummaryReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function ChairpersonCatSummaryReportComponent(_alertService, _vccreationService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._vccreationService = _vccreationService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = [
            "index",
            "ChairPersonCategoryName",
            "VCCount",
            "Participant_Count",
            "TotalTimeInHours",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "ChairPersonCategoryName", Text: "Chair Person Category" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Chairperson Category Summary Report List :", "", "", "");
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["ChairpersonSummeryReportSearchModel"]();
    }
    //#endregion constructor
    //#region Methods
    ChairpersonCatSummaryReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    /** Gets the total count. */
    ChairpersonCatSummaryReportComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel
            .map(function (t) { return t.VCCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalParticipantCount = this.listModel
            .map(function (t) { return t.Participant_Count; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    ChairpersonCatSummaryReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ChairpersonCatSummaryReportComponent.prototype.GetList = function () {
        var _this = this;
        this._vccreationService.VCChairpersonCategorySummaryReport(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ChairpersonCatSummaryReportComponent.prototype.searchClick = function () {
        if (this.indexModel.FromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.indexModel.FromDate).getFullYear(), new Date(this.indexModel.FromDate).getMonth(), new Date(this.indexModel.FromDate).getDate())).toISOString();
            this.indexModel.FromDate = uTCFromDate;
        }
        if (this.indexModel.ToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.indexModel.ToDate).getFullYear(), new Date(this.indexModel.ToDate).getMonth(), new Date(this.indexModel.ToDate).getDate())).toISOString();
            this.indexModel.ToDate = uTCToDate;
        }
        this.GetList();
    };
    ChairpersonCatSummaryReportComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["ChairpersonSummeryReportSearchModel"]();
        this.listModel = [];
    };
    ChairpersonCatSummaryReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], ChairpersonCatSummaryReportComponent.prototype, "sort", void 0);
    ChairpersonCatSummaryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chairperson-cat-summary-report',
            template: __webpack_require__(/*! raw-loader!./chairperson-cat-summary-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.html"),
            styles: [__webpack_require__(/*! ./chairperson-cat-summary-report.component.css */ "./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]])
    ], ChairpersonCatSummaryReportComponent);
    return ChairpersonCatSummaryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/report/district-report/district-report.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/district-report/district-report.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n    width: 100%;\r\n  }\r\n  \r\n  tr.mat-footer-row {\r\n    font-weight: bold;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92aWRlby1jb25mZXJlbmNpbmcvcmVwb3J0L2Rpc3RyaWN0LXJlcG9ydC9kaXN0cmljdC1yZXBvcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7RUFDYjs7RUFFQTtJQUNFLGlCQUFpQjtFQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3JlcG9ydC9kaXN0cmljdC1yZXBvcnQvZGlzdHJpY3QtcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgdHIubWF0LWZvb3Rlci1yb3cge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/content/video-conferencing/report/district-report/district-report.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/district-report/district-report.component.ts ***!
  \************************************************************************************************/
/*! exports provided: DistrictReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictReportComponent", function() { return DistrictReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");










var DistrictReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function DistrictReportComponent(_alertService, _vccreationService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._vccreationService = _vccreationService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = [
            "index",
            "DistrictTitle",
            "ParticipantCount",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DistrictTitle", Text: "District" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Participant Count by District Report List :", "", "", "");
        this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["ParticipantByDistrictReportModel"]();
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    //#endregion constructor
    //#region Methods
    DistrictReportComponent.prototype.ngOnInit = function () {
        // this.GetList();
        this.GetDDLList();
    };
    /** Gets the total Count of all Participant. */
    DistrictReportComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel.map(function (t) { return t.ParticipantCount; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    DistrictReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DistrictReportComponent.prototype.GetList = function () {
        var _this = this;
        this._vccreationService.VCParticipantCountByDistrictReport(this.model).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DistrictReportComponent.prototype.searchClick = function () {
        this.GetList();
    };
    DistrictReportComponent.prototype.clearClick = function () {
        this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["ParticipantByDistrictReportModel"]();
        this.listModel = [];
        // this.GetList();
        this.dataSource = null;
    };
    DistrictReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("test").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    DistrictReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], DistrictReportComponent.prototype, "sort", void 0);
    DistrictReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-district-report',
            template: __webpack_require__(/*! raw-loader!./district-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/district-report/district-report.component.html"),
            styles: [__webpack_require__(/*! ./district-report.component.css */ "./src/app/content/video-conferencing/report/district-report/district-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_5__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], DistrictReportComponent);
    return DistrictReportComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/report/report-summary/report-summary.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/report-summary/report-summary.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92aWRlby1jb25mZXJlbmNpbmcvcmVwb3J0L3JlcG9ydC1zdW1tYXJ5L3JlcG9ydC1zdW1tYXJ5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L3ZpZGVvLWNvbmZlcmVuY2luZy9yZXBvcnQvcmVwb3J0LXN1bW1hcnkvcmVwb3J0LXN1bW1hcnkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudHIubWF0LWZvb3Rlci1yb3cge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/content/video-conferencing/report/report-summary/report-summary.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/report-summary/report-summary.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: ReportSummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportSummaryComponent", function() { return ReportSummaryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");










var ReportSummaryComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function ReportSummaryComponent(_alertService, _vccreationService, _parentComponent, _commonService, _route) {
        this._alertService = _alertService;
        this._vccreationService = _vccreationService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this._route = _route;
        this.displayedColumns = [
            "index",
            "ChairPersonName",
            "ChairPersonCategoryName",
            "VCCount",
            "Participant_Count",
            "TotalTimeInHours",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "ChairPersonName", Text: "Chair Person" },
            { Value: "ChairPersonCategoryName", Text: "Chair Person Category" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Summary Report List :", "", "", "");
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["VCSummeryReportSearchModel"]();
        this.indexModel.ChairPersonCategoryCode = String(this._route.snapshot.params.ChairpersonCat);
        if (this.indexModel.ChairPersonCategoryCode) {
            this.GetList();
        }
    }
    //#endregion constructor
    //#region Methods
    ReportSummaryComponent.prototype.ngOnInit = function () {
        // this.GetList();
        this.GetDDLList();
    };
    /** Gets the total cost of all transactions. */
    ReportSummaryComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel
            .map(function (t) { return t.VCCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalParticipantCount = this.listModel
            .map(function (t) { return t.Participant_Count; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    ReportSummaryComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ReportSummaryComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    ReportSummaryComponent.prototype.GetList = function () {
        var _this = this;
        this._vccreationService.VCSummaryReport(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ReportSummaryComponent.prototype.searchClick = function () {
        if (this.indexModel.FromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.indexModel.FromDate).getFullYear(), new Date(this.indexModel.FromDate).getMonth(), new Date(this.indexModel.FromDate).getDate())).toISOString();
            this.indexModel.FromDate = uTCFromDate;
        }
        if (this.indexModel.ToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.indexModel.ToDate).getFullYear(), new Date(this.indexModel.ToDate).getMonth(), new Date(this.indexModel.ToDate).getDate())).toISOString();
            this.indexModel.ToDate = uTCToDate;
        }
        this.GetList();
    };
    ReportSummaryComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["VCSummeryReportSearchModel"]();
        // this.prevFromDate = null;
        // this.prevToDate = null;
        this.indexModel.FromDate = null;
        this.indexModel.ToDate = null;
        this.listModel = [];
    };
    ReportSummaryComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_4__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"])
    ], ReportSummaryComponent.prototype, "sort", void 0);
    ReportSummaryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-report-summary",
            template: __webpack_require__(/*! raw-loader!./report-summary.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/report-summary/report-summary.component.html"),
            styles: [__webpack_require__(/*! ./report-summary.component.css */ "./src/app/content/video-conferencing/report/report-summary/report-summary.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_4__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"]])
    ], ReportSummaryComponent);
    return ReportSummaryComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/report/report.component.css":
/*!************************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/report.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3JlcG9ydC9yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/video-conferencing/report/report.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/content/video-conferencing/report/report.component.ts ***!
  \***********************************************************************/
/*! exports provided: ReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportComponent", function() { return ReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");










var ReportComponent = /** @class */ (function () {
    function ReportComponent(_parentComponent, _vcCreationService, _alertService, _commonService, _route) {
        this._parentComponent = _parentComponent;
        this._vcCreationService = _vcCreationService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._route = _route;
        this.isShowAll = false;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "VCCategoryName",
            "Date",
            "ShortDescription",
            "Title",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "ShortDescription", Text: "Title" },
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "VCCategoryName", Text: "VC Category" },
            { Value: "Title", Text: "Agenda" },
        ];
        // Permission: PermissionModel = this._commonService.GetPagePermission(
        //   "/vc/report",
        //   "",
        //   "",
        //   "/vc/vccreation/edit"
        // );
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("VC Report List :", "", "", "");
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__["VCReportSearchModel"]();
        if (this._route.snapshot.params.id) {
            this.code = this._route.snapshot.params.id;
            this.indexModel.ChairPersonCode = String(this.code);
            this.getParticipantList(0);
        }
    }
    //#endregion
    //#region << Method >>
    ReportComponent.prototype.ngOnInit = function () {
        // this.GetList();
        this.GetDDLList();
    };
    ReportComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code >= 0) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    ReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ReportComponent.prototype.GetList = function () {
        var _this = this;
        this._vcCreationService.GetAllVcReport(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ReportComponent.prototype.searchClick = function () {
        if (this.indexModel.FromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.indexModel.FromDate).getFullYear(), new Date(this.indexModel.FromDate).getMonth(), new Date(this.indexModel.FromDate).getDate())).toISOString();
            this.indexModel.FromDate = uTCFromDate;
        }
        if (this.indexModel.ToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.indexModel.ToDate).getFullYear(), new Date(this.indexModel.ToDate).getMonth(), new Date(this.indexModel.ToDate).getDate())).toISOString();
            this.indexModel.ToDate = uTCToDate;
        }
        this.GetList();
    };
    ReportComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__["VCReportSearchModel"]();
        // this.prevFromDate = null;
        // this.prevToDate = null;
        this.indexModel.FromDate = null;
        this.indexModel.ToDate = null;
        // this.GetList();
        this.listModel = null;
        this.dataSource = null;
    };
    ReportComponent.prototype.showData = function (event) {
        this.isShowAll = event.checked;
        if (this.isShowAll) {
            this.displayedColumns = [
                "index",
                "DepartmentTitle",
                "VCCategoryName",
                "Date",
                "ShortDescription",
                "ChairPersonCategoryName",
                "Title",
                "StartEndTime",
                "TimeInHrs",
                "Action",
            ];
            this.ViewdisplayedColumns = [
                { Value: "ShortDescription", Text: "Title" },
                { Value: "DepartmentTitle", Text: "Department" },
                { Value: "VCCategoryName", Text: "VC Category" },
                { Value: "Title", Text: "Agenda" },
            ];
            this.columnsToDisplay = this.displayedColumns.slice();
        }
        else {
            this.displayedColumns = [
                "index",
                "DepartmentTitle",
                "VCCategoryName",
                "Date",
                "ShortDescription",
                "Title",
                "Action",
            ];
            this.ViewdisplayedColumns = [
                { Value: "ShortDescription", Text: "Title" },
                { Value: "DepartmentTitle", Text: "Department" },
                { Value: "VCCategoryName", Text: "VC Category" },
                { Value: "Title", Text: "Agenda" },
            ];
            this.columnsToDisplay = this.displayedColumns.slice();
        }
    };
    ReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__["VcCreationService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], ReportComponent.prototype, "sort", void 0);
    ReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-report",
            template: __webpack_require__(/*! raw-loader!./report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/report/report.component.html"),
            styles: [__webpack_require__(/*! ./report.component.css */ "./src/app/content/video-conferencing/report/report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__["VcCreationService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"]])
    ], ReportComponent);
    return ReportComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.css":
/*!******************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.css ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body .cdk-overlay-pane {\r\n    overflow: auto;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92aWRlby1jb25mZXJlbmNpbmcvdmMtY3JlYXRpb24vYWRkLXVwZGF0ZS12Y2NyZWF0aW9uL2FkZC11cGRhdGUtdmNjcmVhdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLWNyZWF0aW9uL2FkZC11cGRhdGUtdmNjcmVhdGlvbi9hZGQtdXBkYXRlLXZjY3JlYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkgLmNkay1vdmVybGF5LXBhbmUge1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: AddUpdateVCCreationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateVCCreationComponent", function() { return AddUpdateVCCreationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");












var AddUpdateVCCreationComponent = /** @class */ (function () {
    function AddUpdateVCCreationComponent(_userService, _alertService, _dialogRef, _vccCreationService, _authService, _commonService, data) {
        this._userService = _userService;
        this._alertService = _alertService;
        this._dialogRef = _dialogRef;
        this._vccCreationService = _vccCreationService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.data = data;
        this.Title = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.date = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.Time = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.ShortDescription = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.Type = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.ChairpersonCategory = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.Chairperson = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        // MeetingParticipant = new FormControl("", null);
        this.VCCategory = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.Department = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        this.minDate = new Date();
        this.title = "Add";
        this.tomorrow = new Date();
        if (data) {
            this.id = data;
            this.GetById();
            this.pagetitle = "Vc Updation";
        }
        else {
            this.pagetitle = "Create VC";
        }
        this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_8__["VCCreationModel"]();
        this.tomorrow.setDate(this.tomorrow.getDate());
        console.log(this.minDate);
    }
    AddUpdateVCCreationComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetDDLList();
    };
    AddUpdateVCCreationComponent.prototype.DateHide = function () {
        if (this.model.Date) {
            var tempDate = new Date(this.model.Date);
            if (tempDate < this.tomorrow) {
                this.isDate = false;
                this.Time.setValidators(null);
                this.Time.updateValueAndValidity();
            }
            else {
                this.Time.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                this.Time.updateValueAndValidity();
                this.isDate = true;
            }
        }
    };
    AddUpdateVCCreationComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateVCCreationComponent.prototype.GetById = function () {
        var _this = this;
        this._vccCreationService.GetById(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.Id) {
                    _this.model.Id = _this.model.Id;
                }
                if (_this.model.ChairPersonCategoryCode) {
                    _this.getParticipantList(_this.model.ChairPersonCategoryCode);
                    _this.model.ChairPersonCategoryCode = String(_this.model.ChairPersonCategoryCode);
                }
                if (_this.model.TypeCode) {
                    _this.model.TypeCode = String(_this.model.TypeCode);
                }
                if (_this.model.ChairPersonCode) {
                    _this.model.ChairPersonCode = String(_this.model.ChairPersonCode);
                }
                if (_this.model.DepartmentCode) {
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.VCCategoryCode) {
                    _this.model.VCCategoryCode = String(_this.model.VCCategoryCode);
                }
                _this.DateHide();
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_8__["VCCreationModel"]();
            _this._alertService.error(error.message);
        });
    };
    AddUpdateVCCreationComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    AddUpdateVCCreationComponent.prototype.SaveClick = function () {
        var _this = this;
        this.Title.markAsTouched();
        this.date.markAsTouched();
        this.Time.markAsTouched();
        this.Chairperson.markAsTouched();
        this.Type.markAsTouched();
        this.ChairpersonCategory.markAsTouched();
        this.ShortDescription.markAsTouched();
        this.VCCategory.markAsTouched();
        this.Department.markAsTouched();
        if (this.Title.valid &&
            this.date.valid &&
            this.Time.valid &&
            this.Chairperson.valid &&
            this.Type.valid &&
            this.Department.valid &&
            this.VCCategory.valid &&
            this.ChairpersonCategory.valid &&
            this.ShortDescription.valid) {
            if (this.model.Id) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.Date).getFullYear(), new Date(this.model.Date).getMonth(), new Date(this.model.Date).getDate())).toISOString();
                this.model.Date = uTCDate;
                this._vccCreationService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._dialogRef.close(true);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    console.log(error);
                    _this._alertService.error(error.message);
                });
            }
            else {
                var uTCDate = new Date(Date.UTC(new Date(this.model.Date).getFullYear(), new Date(this.model.Date).getMonth(), new Date(this.model.Date).getDate())).toISOString();
                this.model.Date = uTCDate;
                this._vccCreationService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._dialogRef.close(true);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    console.log(error);
                    _this._alertService.error(error.message);
                });
            }
        }
    };
    AddUpdateVCCreationComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AddUpdateVCCreationComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_6__["VcCreationService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AddUpdateVCCreationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-add-update-vccreation",
            template: __webpack_require__(/*! raw-loader!./add-update-vccreation.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./add-update-vccreation.component.css */ "./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_6__["VcCreationService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"], Object])
    ], AddUpdateVCCreationComponent);
    return AddUpdateVCCreationComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-creation/vc-creation.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-creation/vc-creation.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLWNyZWF0aW9uL3ZjLWNyZWF0aW9uLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-creation/vc-creation.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-creation/vc-creation.component.ts ***!
  \*********************************************************************************/
/*! exports provided: VCCreationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCCreationComponent", function() { return VCCreationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _add_update_vccreation_add_update_vccreation_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add-update-vccreation/add-update-vccreation.component */ "./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");













var VCCreationComponent = /** @class */ (function () {
    //#endregion
    function VCCreationComponent(_alertService, _parentApi, _dialog, _commonService, _router, _vccreationService, _parentComponent) {
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this._commonService = _commonService;
        this._router = _router;
        this._vccreationService = _vccreationService;
        this._parentComponent = _parentComponent;
        this.displayedColumns = [
            "index",
            "VCCategoryName",
            "DepartmentTitle",
            "ShortDescription",
            "Date",
            "StartTime",
            "EndTime",
            "ChairPersonCategoryName",
            "ChairPersonName",
            "TypeName",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "VCCategoryName", Text: "VC Category" },
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "ShortDescription", Text: "Title" },
            { Value: "StartTime", Text: "Start Time" },
            { Value: "EndTime", Text: "End Time" },
            { Value: "ChairPersonCategoryName", Text: "Chairperson Category" },
            { Value: "ChairPersonName", Text: "Chairperson" },
            { Value: "TypeName", Text: "Type" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/vc/vccreation", "/vccreation/add", "", "/vc/vccreation/edit");
        this._parentComponent.setpagelayout("", "", "", "", true);
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_4__["VCSearchModel"]();
    }
    //#endregion
    VCCreationComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.GetDDLList();
    };
    VCCreationComponent.prototype.GetList = function () {
        var _this = this;
        this._vccreationService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.indexModel.FromDate = _this.prevFromDate;
                _this.indexModel.ToDate = _this.prevToDate;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.listModel);
                _this.totalRecords = data.Data.TotalRecords;
                if (!_this.indexModel.IsPostBack) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VCCreationComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_4__["VCSearchModel"]();
        this.prevFromDate = null;
        this.prevToDate = null;
        this.indexModel.FromDate = null;
        this.indexModel.ToDate = null;
        this.GetList();
    };
    VCCreationComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VCCreationComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    VCCreationComponent.prototype.OpenDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_add_update_vccreation_add_update_vccreation_component__WEBPACK_IMPORTED_MODULE_10__["AddUpdateVCCreationComponent"], {
            width: "1000px",
            data: Id,
            disableClose: true,
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    VCCreationComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VCCreationComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VCCreationComponent.prototype.searchClick = function () {
        if (this.indexModel.FromDate) {
            this.prevFromDate = new Date(this.indexModel.FromDate);
            this.indexModel.FromDate = this.indexModel.FromDate.toLocaleString();
        }
        if (this.indexModel.ToDate) {
            this.prevToDate = new Date(this.indexModel.ToDate);
            this.indexModel.ToDate = this.indexModel.ToDate.toLocaleString();
        }
        this.GetList();
    };
    VCCreationComponent.prototype.onDelete = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_12__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you sure! want to delete this record?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._vccreationService.Delete(id).subscribe(function (data) {
                    if ((data.IsSuccess)) {
                        _this._alertService.success(data.Message);
                        _this.GetList();
                        _this._commonService.ScrollingTop();
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                    _this._commonService.ScrollingTop();
                });
            }
        });
    };
    VCCreationComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], VCCreationComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], VCCreationComponent.prototype, "sort", void 0);
    VCCreationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-vc-creation",
            template: __webpack_require__(/*! raw-loader!./vc-creation.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-creation/vc-creation.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./vc-creation.component.css */ "./src/app/content/video-conferencing/vc-creation/vc-creation.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]])
    ], VCCreationComponent);
    return VCCreationComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.css":
/*!***************************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.css ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLWxvY2F0aW9uLW1hc3Rlci9hZGQtdXBkYXRlLXZjbG9jYXRpb24tbWFzdGVyL2FkZC11cGRhdGUtdmNsb2NhdGlvbi1tYXN0ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.ts":
/*!**************************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.ts ***!
  \**************************************************************************************************************************************/
/*! exports provided: AddUpdateVCLocationMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateVCLocationMasterComponent", function() { return AddUpdateVCLocationMasterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_VC_vc_locationmaster_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/VC/vc-locationmaster.model */ "./src/app/Shared/Model/VC/vc-locationmaster.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_locationmaster_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-locationmaster.service */ "./src/app/Shared/Service/VC/vc-locationmaster.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Enum_office_type_enum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Enum/office-type.enum */ "./src/app/Shared/Enum/office-type.enum.ts");












var AddUpdateVCLocationMasterComponent = /** @class */ (function () {
    function AddUpdateVCLocationMasterComponent(_userService, _alertService, _commonService, _dialogRef, _vclocationmasterservice, _authService, data) {
        this._userService = _userService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialogRef = _dialogRef;
        this._vclocationmasterservice = _vclocationmasterservice;
        this._authService = _authService;
        this.data = data;
        this.Location = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required);
        this.DistrictCode = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required);
        this.InchargeCode = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required);
        this.VCTypeCode = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required);
        this.title = "Add";
        this.vCLocationTypeEnum = src_app_Shared_Enum_office_type_enum__WEBPACK_IMPORTED_MODULE_11__["VCLocationTypeEnum"];
        if (data) {
            this.id = data;
            this.GetById();
        }
        this.model = new src_app_Shared_Model_VC_vc_locationmaster_model__WEBPACK_IMPORTED_MODULE_2__["VCLocationMasterViewModel"]();
    }
    AddUpdateVCLocationMasterComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getDDLList();
    };
    AddUpdateVCLocationMasterComponent.prototype.getDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].DDlKeyForLocationMaster).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateVCLocationMasterComponent.prototype.GetById = function () {
        var _this = this;
        this._vclocationmasterservice.GetById(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.Id) {
                    _this.model.Id = _this.model.Id;
                }
                if (_this.model.VCTypeCode) {
                    _this.model.VCTypeCode = String(_this.model.VCTypeCode);
                }
                if (_this.model.DistrictCode) {
                    _this.model.DistrictCode = String(_this.model.DistrictCode);
                }
                if (_this.model.InchargeCode) {
                    _this.model.InchargeCode = String(_this.model.InchargeCode);
                }
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_VC_vc_locationmaster_model__WEBPACK_IMPORTED_MODULE_2__["VCLocationMasterViewModel"]();
            _this._alertService.error(error.message);
        });
    };
    AddUpdateVCLocationMasterComponent.prototype.SaveClick = function () {
        var _this = this;
        this.Location.markAsTouched();
        // this.DistrictCode.markAsTouched();
        // this.InchargeCode.markAsTouched();
        if (this.Location.valid) {
            if (this.model.Id) {
                this._vclocationmasterservice.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._dialogRef.close(true);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    console.log(error);
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._vclocationmasterservice.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._dialogRef.close(true);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    console.log(error);
                    _this._alertService.error(error.message);
                });
            }
        }
    };
    AddUpdateVCLocationMasterComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AddUpdateVCLocationMasterComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
        { type: src_app_Shared_Service_VC_vc_locationmaster_service__WEBPACK_IMPORTED_MODULE_7__["VcLocationmasterService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AddUpdateVCLocationMasterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-add-update-vclocation-master",
            template: __webpack_require__(/*! raw-loader!./add-update-vclocation-master.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.html"),
            styles: [__webpack_require__(/*! ./add-update-vclocation-master.component.css */ "./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"],
            src_app_Shared_Service_VC_vc_locationmaster_service__WEBPACK_IMPORTED_MODULE_7__["VcLocationmasterService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"], Object])
    ], AddUpdateVCLocationMasterComponent);
    return AddUpdateVCLocationMasterComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.css":
/*!************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLWxvY2F0aW9uLW1hc3Rlci92Yy1sb2NhdGlvbi1tYXN0ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: VcLocationMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcLocationMasterComponent", function() { return VcLocationMasterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_VC_vc_locationmaster_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/VC/vc-locationmaster.model */ "./src/app/Shared/Model/VC/vc-locationmaster.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_locationmaster_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-locationmaster.service */ "./src/app/Shared/Service/VC/vc-locationmaster.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _add_update_vclocation_master_add_update_vclocation_master_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-update-vclocation-master/add-update-vclocation-master.component */ "./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");













var VcLocationMasterComponent = /** @class */ (function () {
    //#endregion
    function VcLocationMasterComponent(_alertService, _parentApi, _dialog, _commonService, _vclocationmasterService, _userService, _authService) {
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this._commonService = _commonService;
        this._vclocationmasterService = _vclocationmasterService;
        this._userService = _userService;
        this._authService = _authService;
        this.displayedColumns = [
            "index",
            "DistrictTitle",
            // "InchargeTitle",
            "LocationName",
            "VCType",
            // "IsActive",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DistrictTitle", Text: "District" },
            // { Value: "InchargeTitle", Text: "Incharge" },
            { Value: "LocationName", Text: "Location" },
            { Value: "VCType", Text: "VC Type" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/vc/VcLocationMaster", "/vc/VcLocationMaster/add", "", "/vc/VcLocationMaster/edit");
        this._parentApi.setpagelayout("VC Location Master:", "", "", "", true);
        this.indexModel = new src_app_Shared_Model_VC_vc_locationmaster_model__WEBPACK_IMPORTED_MODULE_2__["VCLocationSearchModel"]();
    }
    //#endregion
    VcLocationMasterComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetList();
        this.getDDLList();
    };
    VcLocationMasterComponent.prototype.GetList = function () {
        var _this = this;
        this._vclocationmasterService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.totalRecords = data.Data.TotalRecords;
                if (!_this.indexModel.IsPostBack) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcLocationMasterComponent.prototype.OpenDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_add_update_vclocation_master_add_update_vclocation_master_component__WEBPACK_IMPORTED_MODULE_9__["AddUpdateVCLocationMasterComponent"], {
            width: "500px",
            data: Id,
            disableClose: true,
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    VcLocationMasterComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VcLocationMasterComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VcLocationMasterComponent.prototype.onDelete = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you sure! want to delete this record?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._vclocationmasterService.Delete(id).subscribe(function (data) {
                    if ((data.IsSuccess)) {
                        _this._commonService.ScrollingTop();
                        _this._alertService.success(data.Message);
                        _this.GetList();
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                    _this._commonService.ScrollingTop();
                });
            }
        });
    };
    VcLocationMasterComponent.prototype.getDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].DDlKeyForLocationMaster).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcLocationMasterComponent.prototype.searchClick = function () {
        this.GetList();
    };
    VcLocationMasterComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_VC_vc_locationmaster_model__WEBPACK_IMPORTED_MODULE_2__["VCLocationSearchModel"]();
        this.indexModel.DistrictCode = null;
        this.GetList();
    };
    VcLocationMasterComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_VC_vc_locationmaster_service__WEBPACK_IMPORTED_MODULE_7__["VcLocationmasterService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], VcLocationMasterComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], VcLocationMasterComponent.prototype, "sort", void 0);
    VcLocationMasterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-vc-location-master",
            template: __webpack_require__(/*! raw-loader!./vc-location-master.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.html"),
            styles: [__webpack_require__(/*! ./vc-location-master.component.css */ "./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_Shared_Service_VC_vc_locationmaster_service__WEBPACK_IMPORTED_MODULE_7__["VcLocationmasterService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"]])
    ], VcLocationMasterComponent);
    return VcLocationMasterComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.css":
/*!***************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.css ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLXBhcnRpY2lwYW50L3BhcnRpY2lwYW50LWV4Y2VsLXVwbG9hZC9wYXJ0aWNpcGFudC1leGNlbC11cGxvYWQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.ts ***!
  \**************************************************************************************************************************/
/*! exports provided: ParticipantExcelUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticipantExcelUploadComponent", function() { return ParticipantExcelUploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-participant.service */ "./src/app/Shared/Service/VC/vc-participant.service.ts");
/* harmony import */ var src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/VC/vc-participant-model */ "./src/app/Shared/Model/VC/vc-participant-model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");













var ParticipantExcelUploadComponent = /** @class */ (function () {
    function ParticipantExcelUploadComponent(_parentComponent, _vCParticipantService, _alertService, _userService, _commonService, _authService) {
        this._parentComponent = _parentComponent;
        this._vCParticipantService = _vCParticipantService;
        this._alertService = _alertService;
        this._userService = _userService;
        this._commonService = _commonService;
        this._authService = _authService;
        this.documentUrlList = [];
        this.displayedColumns = ["index", "VcCreationTitle", "DistrictTitle", "LocationName", "Name", "Designation", "MobileNo", "ParticipantCategoryEnglish", "Action"];
        this.ViewdisplayedColumns = [
            { Value: "Name", Text: "Participant Name" },
            { Value: "Designation", Text: "Designation" },
            { Value: "MobileNo", Text: "Mobile No." },
            { Value: "DistrictTitle", Text: "District" },
            { Value: "LocationName", Text: "Location" },
            { Value: "ParticipantCategoryEnglish", Text: "Participant Category " },
            { Value: "VcCreationTitle", Text: "Vc Name" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Excel File upload :", "", "", "");
        this.participantTempBulkModel = new src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_5__["ParticipantTempBulkModel"]();
    }
    ParticipantExcelUploadComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetExcelFile();
        this.getDistrict();
        this.GetDDLList();
    };
    ParticipantExcelUploadComponent.prototype.handleFileInput = function (event) {
        var _this = this;
        /// if (event.target.files.item(0).type.match("excel") )
        // {
        this.file = event.target.files.item(0);
        this.displayName = event.target.files.item(0).name;
        var reader = new FileReader();
        reader.onload = function (event) {
            _this.displayURL = event.target.result;
        };
        this.fileValidationMsgDocs = "";
        reader.readAsDataURL(event.target.files.item(0));
        // } else {
        //   this.fileValidationMsgDocs = "only excel file will accept ";
        //}
    };
    ParticipantExcelUploadComponent.prototype.downloadOtherDocPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = this.displayName;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    ParticipantExcelUploadComponent.prototype.clickToPreview = function () {
        var _this = this;
        var formData = new FormData();
        formData.append('Data', JSON.stringify(this.participantTempBulkModel));
        formData.append("upload", this.file);
        formData.append("enctype", "multipart/form-data");
        this._vCParticipantService.UploadExcel(formData).subscribe(function (result) {
            if (result.IsSuccess) {
                _this.listModel = result.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        });
    };
    ParticipantExcelUploadComponent.prototype.GetExcelFile = function () {
        var _this = this;
        this._vCParticipantService.GetExcelFileDownload().subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                // this.documentUrlList= this.model.MediaUrlList;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ParticipantExcelUploadComponent.prototype.deleteClick = function (code) {
        var _this = this;
        this._vCParticipantService.DeleteItemFromExcelGrid(code).subscribe(function (data) {
            if (data.IsSuccess) {
                _this._alertService.success(data.Message);
                _this.GetList();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ParticipantExcelUploadComponent.prototype.GetList = function () {
        var _this = this;
        this._vCParticipantService.GetParticipantExcelUploadTempList().subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ParticipantExcelUploadComponent.prototype.finalSubmit = function () {
        var _this = this;
        this._vCParticipantService.ParticipantExcelFinalUpload().subscribe(function (data) {
            if (data.IsSuccess) {
                _this._alertService.success(data.Message);
                _this.listModel = [];
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ParticipantExcelUploadComponent.prototype.GetLocation = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetLocationByDistrict(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLLocationByDistrict = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.dDLLocationByDistrict = [];
        }
    };
    ParticipantExcelUploadComponent.prototype.getDistrict = function () {
        var _this = this;
        this._userService.GetUserDistrict(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDistrict = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ParticipantExcelUploadComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ParticipantExcelUploadComponent.prototype.downloadExcelFile = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "Demo Excel";
        downloadLink.click();
    };
    ParticipantExcelUploadComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_4__["VCParticipantService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ParticipantExcelUploadComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], ParticipantExcelUploadComponent.prototype, "sort", void 0);
    ParticipantExcelUploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-participant-excel-upload",
            template: __webpack_require__(/*! raw-loader!./participant-excel-upload.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.html"),
            styles: [__webpack_require__(/*! ./participant-excel-upload.component.css */ "./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_4__["VCParticipantService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"]])
    ], ParticipantExcelUploadComponent);
    return ParticipantExcelUploadComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.css":
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.css ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLXBhcnRpY2lwYW50L3ZjLXBhcnRpY2lwYW50LWFkZC11cGRhdGUvdmMtcGFydGljaXBhbnQtYWRkLXVwZGF0ZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: VcParticipantAddUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcParticipantAddUpdateComponent", function() { return VcParticipantAddUpdateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/VC/vc-participant-model */ "./src/app/Shared/Model/VC/vc-participant-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-participant.service */ "./src/app/Shared/Service/VC/vc-participant.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
















var VcParticipantAddUpdateComponent = /** @class */ (function () {
    //#endregion AddUpdate Variable
    //#region constructor
    function VcParticipantAddUpdateComponent(_parentApi, _vCParticipantService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService, _dialog) {
        this._parentApi = _parentApi;
        this._vCParticipantService = _vCParticipantService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "VcCreationTitle",
            "Name",
            "Designation",
            "DistrictTitle",
            "LocationName",
            "ParticipantCategoryEnglish",
            "Action"
        ];
        this.ViewdisplayedColumns = [
            { Value: "VcCreationTitle", Text: "VC Name" },
            { Value: "Name", Text: "Participant Name" },
            { Value: "Designation", Text: "Designation" },
            { Value: "DistrictTitle", Text: "District" },
            { Value: "LocationName", Text: "Location" },
            { Value: "ParticipantCategoryEnglish", Text: "Participant Category" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.isEnableNameDesignation = true;
        this.isOtherLocation = false;
        this.model = new src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_4__["VCParticipantModel"]();
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_14__["IndexModel"]();
        this._parentApi.setpagelayout("Add Participant :", "", "", "");
        this.title = "Add";
    }
    //#endregion constructor
    VcParticipantAddUpdateComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.FormGroupInit();
        this.GetDDLList();
        this.getDistrict();
    };
    //#region Add/Update Methods
    VcParticipantAddUpdateComponent.prototype.participantClick = function (data) {
        if (this.model.Id > 0) {
            if (Number(data) > 0) {
                this.isEnableNameDesignation = true;
                var item = this.dDLParticipant.find(function (x) { return x.Code === Number(data); });
                this.model.Name = item.NameEnglish;
                this.model.Designation = item.DesignationEnglish;
                this.model.DisplayOrder = item.DisplayOrder;
            }
            else {
                this.model.Name = null;
                this.model.Designation = null;
                this.isEnableNameDesignation = false;
            }
        }
        if (this.model.Id === 0) {
            var otherCode = data.findIndex(function (x) { return Number(x) === 0; });
            if (otherCode >= 0) {
                this.isEnableNameDesignation = false;
                this.formGroup.get("Name").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                this.formGroup.get("Name").updateValueAndValidity();
                this.formGroup.get("Designation").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                this.formGroup.get("Designation").updateValueAndValidity();
                this.model.ParticipantCode = 0;
            }
            else {
                this.isEnableNameDesignation = true;
                this.formGroup.get("Name").clearValidators();
                this.formGroup.get("Name").updateValueAndValidity();
                this.formGroup.get("Designation").clearValidators();
                this.formGroup.get("Designation").updateValueAndValidity();
                this.model.ParticipantCode = null;
            }
        }
    };
    VcParticipantAddUpdateComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].ddlVCParticipantAddUpdateKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantAddUpdateComponent.prototype.GetParticipant = function (code) {
        var _this = this;
        if (this.model.VCCreateCode) {
            this._commonService
                .GetVCPaticipantByPaticipantCategory(code, Number(this.model.VCCreateCode), this.model.Id)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLParticipant = data.Data;
                    if (_this.model.ParticipantCode == 0) {
                        _this.isEnableNameDesignation = false;
                    }
                    else {
                        _this.isEnableNameDesignation = true;
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_12__["GlobalMessagesModel"].VCNameNotExist);
        }
    };
    VcParticipantAddUpdateComponent.prototype.GetParticipantClick = function (code) {
        if (code) {
            this.GetParticipant(code);
        }
        else {
            this.dDLParticipant = [];
            this.model.Name = null;
            this.model.Designation = null;
            this.isEnableNameDesignation = true;
        }
        this.model.ParticipantCode = null;
    };
    VcParticipantAddUpdateComponent.prototype.GetLocation = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetLocationByDistrict(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLLocationByDistrict = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.dDLLocationByDistrict = [];
        }
    };
    VcParticipantAddUpdateComponent.prototype.getDistrict = function () {
        var _this = this;
        this._userService.GetUserDistrict(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDistrict = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantAddUpdateComponent.prototype.GetById = function () {
        var _this = this;
        this._vCParticipantService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.AddValidation();
                if (_this.model.VCCreateCode) {
                    _this.model.VCCreateCode = String(_this.model.VCCreateCode);
                }
                if (_this.model.ParticipantCategoryCode) {
                    _this.GetParticipant(_this.model.ParticipantCategoryCode);
                    _this.model.ParticipantCategoryCode = String(_this.model.ParticipantCategoryCode);
                }
                if (_this.model.DistrictCode) {
                    _this.GetLocation(_this.model.DistrictCode);
                    _this.model.DistrictCode = String(_this.model.DistrictCode);
                }
                if (_this.model.LocationCode) {
                    _this.model.LocationCode = String(_this.model.LocationCode);
                }
                if (_this.model.ModeCode) {
                    _this.model.ModeCode = String(_this.model.ModeCode);
                }
                if (_this.model.ParticipantCode) {
                    _this.model.ParticipantCode = String(_this.model.ParticipantCode);
                }
                _this.otherLocationClick();
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantAddUpdateComponent.prototype.SaveClick = function () {
        var _this = this;
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            if (this.model.Id) {
                this._vCParticipantService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this.GetList();
                        _this.title = "Add";
                        _this._alertService.success(data.Message);
                        _this.RemoveValidation();
                        _this.markAsUnTouched();
                        var vCCode = _this.model.VCCreateCode;
                        _this.model = new src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_4__["VCParticipantModel"]();
                        _this.dDLParticipant = [];
                        _this.dDLLocationByDistrict = [];
                        _this.model.VCCreateCode = vCCode;
                        _this.isOtherLocation = false;
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._vCParticipantService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this.GetList();
                        _this._alertService.success(data.Message);
                        _this.RemoveValidation();
                        _this.markAsUnTouched();
                        var vCCode = _this.model.VCCreateCode;
                        _this.model = new src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_4__["VCParticipantModel"]();
                        _this.dDLParticipant = [];
                        _this.dDLLocationByDistrict = [];
                        _this.model.VCCreateCode = vCCode;
                        _this.isOtherLocation = false;
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
        }
        else {
        }
    };
    VcParticipantAddUpdateComponent.prototype.FormGroupInit = function () {
        this.formGroup = this.formBuilder.group({
            VCCreateCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            ParticipantCategoryCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            ParticipantCode: [null],
            Name: [null],
            Designation: [null],
            DistrictCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            LocationCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            ParticipantCodeList: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            LocationTextBox: [null],
            ModeCode: [null],
            MobileNo: [null]
        });
    };
    VcParticipantAddUpdateComponent.prototype.markAsUnTouched = function () {
        this.formGroup.controls["VCCreateCode"].markAsUntouched();
        this.formGroup.controls["ParticipantCategoryCode"].markAsUntouched();
        this.formGroup.controls["ParticipantCode"].markAsUntouched();
        this.formGroup.controls["Name"].markAsUntouched();
        this.formGroup.controls["MobileNo"].markAsUntouched();
        this.formGroup.controls["Designation"].markAsUntouched();
        this.formGroup.controls["DistrictCode"].markAsUntouched();
        this.formGroup.controls["LocationCode"].markAsUntouched();
        this.formGroup.controls["ParticipantCodeList"].markAsUntouched();
        this.formGroup.controls["LocationTextBox"].markAsUntouched();
        this.formGroup.controls["ModeCode"].markAsUntouched();
    };
    VcParticipantAddUpdateComponent.prototype.AddValidation = function () {
        this.formGroup.get("Name").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.formGroup.get("Name").updateValueAndValidity();
        this.formGroup.get("Designation").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.formGroup.get("Designation").updateValueAndValidity();
        // this.formGroup.get("MobileNo").setValidators([Validators.required]);
        // this.formGroup.get("MobileNo").updateValueAndValidity();
        this.formGroup.get("ParticipantCode").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.formGroup.get("ParticipantCode").updateValueAndValidity();
        this.formGroup.get("ParticipantCodeList").clearValidators();
        this.formGroup.get("ParticipantCodeList").updateValueAndValidity();
    };
    VcParticipantAddUpdateComponent.prototype.RemoveValidation = function () {
        this.formGroup.get("Name").clearValidators();
        this.formGroup.get("Name").updateValueAndValidity();
        // this.formGroup.get("MobileNo").clearValidators();
        // this.formGroup.get("MobileNo").updateValueAndValidity();
        this.formGroup.get("Designation").clearValidators();
        this.formGroup.get("Designation").updateValueAndValidity();
        this.formGroup.get("ParticipantCodeList").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.formGroup.get("ParticipantCodeList").updateValueAndValidity();
        this.formGroup.get("ParticipantCode").clearValidators();
        this.formGroup.get("ParticipantCode").updateValueAndValidity();
    };
    VcParticipantAddUpdateComponent.prototype.editClick = function (data) {
        this.AddValidation();
        if (data) {
            this.model.Id = Number(data);
            this.GetById();
            this._parentApi.setpagelayout("Update Participant :", "keyboard_backspace", "Back To List", "vc/participant");
            this.title = "Update";
        }
    };
    VcParticipantAddUpdateComponent.prototype.otherLocationClick = function () {
        if (Number(this.model.LocationCode) === 0) {
            this.isOtherLocation = true;
            this.formGroup.get("ModeCode").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            this.formGroup.get("ModeCode").updateValueAndValidity();
        }
        else {
            this.isOtherLocation = false;
            this.formGroup.get("ModeCode").clearValidators();
            this.formGroup.get("ModeCode").updateValueAndValidity();
        }
    };
    //#endregion Add/Update Methods
    //#region List Method
    VcParticipantAddUpdateComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VcParticipantAddUpdateComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VcParticipantAddUpdateComponent.prototype.GetList = function () {
        var _this = this;
        if (this.model.VCCreateCode) {
            this._vCParticipantService.GetList(this.indexModel, Number(this.model.VCCreateCode)).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.listModel = data.Data.Data;
                    _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatTableDataSource"](_this.listModel);
                    if (_this.indexModel.IsPostBack === false) {
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
            this.listModel = [];
        }
    };
    VcParticipantAddUpdateComponent.prototype.onDelete = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_15__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you sure! want to delete this record?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._vCParticipantService.Delete(id).subscribe(function (data) {
                    if ((data.IsSuccess)) {
                        _this._alertService.success(data.Message);
                        _this._commonService.ScrollingTop();
                        _this.GetList();
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    VcParticipantAddUpdateComponent.prototype.markPresentAbsent = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_15__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you sure! want to mark present/absent to this participant?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._vCParticipantService.MarkAsPresentAbsent(id).subscribe(function (data) {
                    if ((data.IsSuccess)) {
                        _this._alertService.success(data.Message);
                        _this._commonService.ScrollingTop();
                        _this.GetList();
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    VcParticipantAddUpdateComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_6__["VCParticipantService"] },
        { type: _Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_13__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatPaginator"])
    ], VcParticipantAddUpdateComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSort"])
    ], VcParticipantAddUpdateComponent.prototype, "sort", void 0);
    VcParticipantAddUpdateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-vc-participant-add-update",
            template: __webpack_require__(/*! raw-loader!./vc-participant-add-update.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.html"),
            styles: [__webpack_require__(/*! ./vc-participant-add-update.component.css */ "./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_6__["VCParticipantService"],
            _Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialog"]])
    ], VcParticipantAddUpdateComponent);
    return VcParticipantAddUpdateComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.css":
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.css ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLXBhcnRpY2lwYW50L3ZjLXBhcnRpY2lwYW50LXJlcG9ydC1kaWFsb2cvdmMtcGFydGljaXBhbnQtcmVwb3J0LWRpYWxvZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.ts ***!
  \**********************************************************************************************************************************/
/*! exports provided: VcParticipantReportDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcParticipantReportDialogComponent", function() { return VcParticipantReportDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-participant.service */ "./src/app/Shared/Service/VC/vc-participant.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");








var VcParticipantReportDialogComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function VcParticipantReportDialogComponent(_dialogRef, _vCParticipantService, _alertService, _commonService, data) {
        this._dialogRef = _dialogRef;
        this._vCParticipantService = _vCParticipantService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this.data = data;
        this.displayedColumns = ["index", "VcCreationTitle", "Name", "Designation", "DistrictTitle", "LocationName", "ParticipantCategoryEnglish"];
        this.ViewdisplayedColumns = [
            { Value: "VcCreationTitle", Text: "VC Name" },
            { Value: "Name", Text: "Participant Name" },
            { Value: "Designation", Text: "Designation" },
            { Value: "DistrictTitle", Text: "District" },
            { Value: "LocationName", Text: "Location" },
            { Value: "ParticipantCategoryEnglish", Text: "Participant Category" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
        if (data) {
            this.vCCode = Number(data);
            this.GetList();
        }
    }
    //#endregion
    //#region << Method >>
    VcParticipantReportDialogComponent.prototype.ngOnInit = function () {
    };
    VcParticipantReportDialogComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VcParticipantReportDialogComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VcParticipantReportDialogComponent.prototype.GetList = function () {
        var _this = this;
        this._vCParticipantService.GetParicipantReport(this.indexModel, this.vCCode).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.listModel);
                if (_this.indexModel.IsPostBack === false) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantReportDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    VcParticipantReportDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_4__["VCParticipantService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], VcParticipantReportDialogComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], VcParticipantReportDialogComponent.prototype, "sort", void 0);
    VcParticipantReportDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vc-participant-report-dialog',
            template: __webpack_require__(/*! raw-loader!./vc-participant-report-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.html"),
            styles: [__webpack_require__(/*! ./vc-participant-report-dialog.component.css */ "./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_4__["VCParticipantService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], Object])
    ], VcParticipantReportDialogComponent);
    return VcParticipantReportDialogComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/vc-participant.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/vc-participant.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlkZW8tY29uZmVyZW5jaW5nL3ZjLXBhcnRpY2lwYW50L3ZjLXBhcnRpY2lwYW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/video-conferencing/vc-participant/vc-participant.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/content/video-conferencing/vc-participant/vc-participant.component.ts ***!
  \***************************************************************************************/
/*! exports provided: VcParticipantComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcParticipantComponent", function() { return VcParticipantComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_otp_dialog_otp_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/otp-dialog/otp-dialog.component */ "./src/app/otp-dialog/otp-dialog.component.ts");
/* harmony import */ var src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/VC/vc-participant-model */ "./src/app/Shared/Model/VC/vc-participant-model.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-participant.service */ "./src/app/Shared/Service/VC/vc-participant.service.ts");
/* harmony import */ var _vc_participant_report_dialog_vc_participant_report_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./vc-participant-report-dialog/vc-participant-report-dialog.component */ "./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");

















var VcParticipantComponent = /** @class */ (function () {
    //#region << constructor >>
    function VcParticipantComponent(_route, _parentComponent, _vCParticipantService, _alertService, _commonService, _dialog, datePipe, _userService, _authService) {
        this._route = _route;
        this._parentComponent = _parentComponent;
        this._vCParticipantService = _vCParticipantService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.datePipe = datePipe;
        this._userService = _userService;
        this._authService = _authService;
        this.displayedColumns = [
            "index",
            "participantName",
            "Designation",
            "MobileNo",
            // "ParticipantCategoryName",
            "DistrictTitle",
            "locationName",
            "IsPresent"
        ];
        this.ViewdisplayedColumns = [
            { Value: "participantName", Text: "Participant Name" },
            { Value: "Designation", Text: "Designation" },
            { Value: "MobileNo", Text: "Mobile No." },
            //{ Value: "ParticipantCategoryName", Text: "Category" },
            { Value: "DistrictTitle", Text: "District" },
            { Value: "locationName", Text: "Location" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.permission = this._commonService.GetPagePermission("/vc/participant", "/vc/participant/add", "/vc/participant/edit");
        this.CreateVCItems = {};
        this.CreateChairPersonCategoryVCItems = {};
        this.CreateChairPersonVCItems = {};
        this.VCTypeItems = {};
        this.VCParticipantCategoryItems = {};
        this.VCParticipantItems = {};
        this._parentComponent.setpagelayout("Video Conferencing Participant List :", "", "", "");
        this.vCCustomFilter = new src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_9__["VCCustomFilter"]();
        if (this._route.snapshot.params.id) {
            this.code = this._route.snapshot.params.id;
        }
        this.vCCustomFilter.VcCode = String(this.code);
        this.indexModel = new _Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_1__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    VcParticipantComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        // this.GetList();
        this.GetDDLList();
        this.getDistrict();
        this.FillVCNameClick();
        //  this.dataSource.sort = this.sort;
    };
    VcParticipantComponent.prototype.searchClick = function () {
        if (this.vCCustomFilter.Date) {
            var uTCDate = new Date(Date.UTC(new Date(this.vCCustomFilter.Date).getFullYear(), new Date(this.vCCustomFilter.Date).getMonth(), new Date(this.vCCustomFilter.Date).getDate())).toISOString();
            this.vCCustomFilter.Date = uTCDate;
            //this.datePipe.transform(obj.Date,"dd/MM/yyyy")
            this.vCCustomFilter.VCDate = this.datePipe.transform(this.vCCustomFilter.Date, "dd/MM/yy");
        }
        else {
            this.vCCustomFilter.VCDate = null;
        }
        this.GetList();
    };
    VcParticipantComponent.prototype.clearClick = function () {
        this.vCCustomFilter = new src_app_Shared_Model_VC_vc_participant_model__WEBPACK_IMPORTED_MODULE_9__["VCCustomFilter"]();
        this.vCCustomFilter.Date = undefined;
        this.vCCustomFilter.VCDate = null;
        //  this.GetList();
        this.listModel = null;
        this.dataSource = null;
        this.FillVCNameClick();
    };
    VcParticipantComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("test").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    VcParticipantComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].ddlVCCreationKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                _this.dDLList.ddlCreateVCList.forEach(function (obj) {
                    _this.CreateChairPersonCategoryVCItems[obj.Code] =
                        obj.chairPersoncategoryName;
                });
                _this.dDLList.ddlCreateVCList.forEach(function (obj) {
                    _this.CreateChairPersonVCItems[obj.Code] = obj.chairPersonName;
                });
                _this.dDLList.ddlVCType.forEach(function (obj) {
                    _this.VCTypeItems[obj.Value] = obj.Text;
                });
                // this.dDLList.ddlVCParticipantCategory.forEach(obj => {
                //   this.VCParticipantCategoryItems[obj.Value] = obj.Text ;
                // });
                // this.ddlParticipant.forEach(obj => {
                //   this.VCParticipantItems[obj.Value] = obj.Text ;
                // });
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantComponent.prototype.VCRadioClick = function (event) {
        this.vCCustomFilter.IsAllVC = event;
        this.FillVCNameClick();
    };
    VcParticipantComponent.prototype.FillVCNameClick = function () {
        var _this = this;
        if (this.vCCustomFilter.Date) {
            var uTCDate = new Date(Date.UTC(new Date(this.vCCustomFilter.Date).getFullYear(), new Date(this.vCCustomFilter.Date).getMonth(), new Date(this.vCCustomFilter.Date).getDate())).toISOString();
            this.vCCustomFilter.Date = uTCDate;
        }
        this._commonService.GetVCCreationWithFiler(this.vCCustomFilter).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlCreateVCList = data.Data;
                if (_this.ddlCreateVCList && _this.ddlCreateVCList.length > 0) {
                    _this.vCCustomFilter.VcCode = String(_this.ddlCreateVCList[0].Code);
                }
                _this.ddlCreateVCList.forEach(function (obj) {
                    if (obj.Date && obj.Time) {
                        _this.CreateVCItems[obj.Code] =
                            obj.ShortDescription +
                                "(" +
                                _this.datePipe.transform(obj.Date, "dd/MM/yyyy") +
                                "/" +
                                obj.Time +
                                ")";
                    }
                    else if (obj.Date) {
                        _this.CreateVCItems[obj.Code] =
                            obj.ShortDescription +
                                "(" +
                                new Date(obj.Date).toLocaleDateString() +
                                ")";
                    }
                    else if (obj.Time) {
                        _this.CreateVCItems[obj.Code] =
                            obj.ShortDescription + "(" + obj.Time + ")";
                    }
                    else {
                        _this.CreateVCItems[obj.Code] = obj.ShortDescription;
                    }
                });
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantComponent.prototype.getParticipantList = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetParticipantList(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlParticipant = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlParticipant = [];
        }
    };
    VcParticipantComponent.prototype.GetList = function () {
        var _this = this;
        this._vCParticipantService
            .GetVCParticipantReport(this.vCCustomFilter)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantComponent.prototype.changeActiveStatusClick = function (id) {
        var _this = this;
        this._commonService.GenerateOTP().subscribe(function (data) {
            if (data.IsSuccess) {
                var _dialogRef = _this._dialog.open(src_app_otp_dialog_otp_dialog_component__WEBPACK_IMPORTED_MODULE_8__["OTPDialogComponent"], {
                    width: "500px",
                    disableClose: true
                });
                _dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        _this._vCParticipantService.ChangeActiveStatus(id).subscribe(function (data) {
                            if (data.IsSuccess) {
                                _this.GetList();
                                _this._alertService.success(data.Message);
                            }
                            else {
                                _this._alertService.error(data.Message);
                            }
                        }, function (error) {
                            _this._alertService.error(error.message);
                        });
                    }
                });
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantComponent.prototype.GetParicipantReport = function () {
        if (this.vCCode) {
            this._dialog.open(_vc_participant_report_dialog_vc_participant_report_dialog_component__WEBPACK_IMPORTED_MODULE_11__["VcParticipantReportDialogComponent"], {
                width: "1000px",
                data: this.vCCode
            });
        }
    };
    VcParticipantComponent.prototype.GetLocation = function (code) {
        var _this = this;
        if (code) {
            this.vCCustomFilter.LocationCode = undefined;
            this._commonService.GetLocationByDistrict(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLLocationByDistrict = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.dDLLocationByDistrict = [];
        }
    };
    VcParticipantComponent.prototype.getDistrict = function () {
        var _this = this;
        this._userService.GetUserDistrict(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDistrict = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcParticipantComponent.prototype.gePresentAbsentData = function (data) {
        this.vCCustomFilter.IsPresent = data;
        this.GetList();
        if (data == -1) {
            if (!this.displayedColumns.includes("IsPresent")) {
                this.displayedColumns.push("IsPresent");
                this.columnsToDisplay = this.displayedColumns.slice();
            }
        }
        else {
            if (this.displayedColumns.includes("IsPresent")) {
                this.displayedColumns.pop();
                this.columnsToDisplay = this.displayedColumns.slice();
            }
            //this.displayedColumns=this.displayedColumns.splice(0,this.displayedColumns.length-1);
        }
    };
    VcParticipantComponent.prototype.geDistrictLocationOrderNoData = function (data) {
        this.vCCustomFilter.IsOrderByDLPCorPCDL = data;
        this.GetList();
    };
    VcParticipantComponent.prototype.showData = function (event) {
        if (event.checked) {
            this.displayedColumns = [
                "index",
                "participantName",
                "Designation",
                "MobileNo",
                "ParticipantCategoryName",
                "DistrictTitle",
                "locationName",
                "IsPresent"
            ];
            this.ViewdisplayedColumns = [
                { Value: "participantName", Text: "Participant Name" },
                { Value: "Designation", Text: "Designation" },
                { Value: "MobileNo", Text: "Mobile No." },
                { Value: "ParticipantCategoryName", Text: "Category" },
                { Value: "DistrictTitle", Text: "District" },
                { Value: "locationName", Text: "Location" }
            ];
            this.columnsToDisplay = this.displayedColumns.slice();
        }
        else {
            this.displayedColumns = [
                "index",
                "participantName",
                "Designation",
                "MobileNo",
                "DistrictTitle",
                "locationName",
                "IsPresent"
            ];
            this.ViewdisplayedColumns = [
                { Value: "participantName", Text: "Participant Name" },
                { Value: "Designation", Text: "Designation" },
                { Value: "MobileNo", Text: "Mobile No." },
                { Value: "DistrictTitle", Text: "District" },
                { Value: "locationName", Text: "Location" }
            ];
            this.columnsToDisplay = this.displayedColumns.slice();
        }
        if (this.vCCustomFilter.IsPresent == -1) {
            if (!this.displayedColumns.includes("IsPresent")) {
                this.displayedColumns.push("IsPresent");
                this.columnsToDisplay = this.displayedColumns.slice();
            }
        }
        else {
            if (this.displayedColumns.includes("IsPresent")) {
                this.displayedColumns.pop();
                this.columnsToDisplay = this.displayedColumns.slice();
            }
        }
    };
    VcParticipantComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_10__["VCParticipantService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_14__["DatePipe"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_16__["AuthenticationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], VcParticipantComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], VcParticipantComponent.prototype, "sort", void 0);
    VcParticipantComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-vc-participant",
            template: __webpack_require__(/*! raw-loader!./vc-participant.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/video-conferencing/vc-participant/vc-participant.component.html"),
            providers: [
                _angular_common__WEBPACK_IMPORTED_MODULE_14__["DatePipe"],
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./vc-participant.component.css */ "./src/app/content/video-conferencing/vc-participant/vc-participant.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_12__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_VC_vc_participant_service__WEBPACK_IMPORTED_MODULE_10__["VCParticipantService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _angular_common__WEBPACK_IMPORTED_MODULE_14__["DatePipe"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_16__["AuthenticationService"]])
    ], VcParticipantComponent);
    return VcParticipantComponent;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/video-conferencing-routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/content/video-conferencing/video-conferencing-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: VideoConferencingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoConferencingRoutingModule", function() { return VideoConferencingRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _vc_participant_vc_participant_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vc-participant/vc-participant.component */ "./src/app/content/video-conferencing/vc-participant/vc-participant.component.ts");
/* harmony import */ var _vc_participant_vc_participant_add_update_vc_participant_add_update_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vc-participant/vc-participant-add-update/vc-participant-add-update.component */ "./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.ts");
/* harmony import */ var _vc_creation_vc_creation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vc-creation/vc-creation.component */ "./src/app/content/video-conferencing/vc-creation/vc-creation.component.ts");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./report/report.component */ "./src/app/content/video-conferencing/report/report.component.ts");
/* harmony import */ var _vc_location_master_vc_location_master_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vc-location-master/vc-location-master.component */ "./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.ts");
/* harmony import */ var _report_report_summary_report_summary_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./report/report-summary/report-summary.component */ "./src/app/content/video-conferencing/report/report-summary/report-summary.component.ts");
/* harmony import */ var _vc_participant_participant_excel_upload_participant_excel_upload_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vc-participant/participant-excel-upload/participant-excel-upload.component */ "./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.ts");
/* harmony import */ var _report_district_report_district_report_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./report/district-report/district-report.component */ "./src/app/content/video-conferencing/report/district-report/district-report.component.ts");
/* harmony import */ var _report_chairperson_cat_summary_report_chairperson_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./report/chairperson-cat-summary-report/chairperson-cat-summary-report.component */ "./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.ts");
/* harmony import */ var _report_cat_dpt_summary_report_cat_dpt_summary_report_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./report/cat-dpt-summary-report/cat-dpt-summary-report.component */ "./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.ts");
/* harmony import */ var _report_adm_dpt_cat_summary_report_adm_dpt_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component */ "./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.ts");














var routes = [
    {
        path: "",
        component: _vc_participant_vc_participant_component__WEBPACK_IMPORTED_MODULE_3__["VcParticipantComponent"],
    },
    {
        path: "participant",
        component: _vc_participant_vc_participant_component__WEBPACK_IMPORTED_MODULE_3__["VcParticipantComponent"],
    },
    {
        path: "participant/:id",
        component: _vc_participant_vc_participant_component__WEBPACK_IMPORTED_MODULE_3__["VcParticipantComponent"],
    },
    {
        path: "add",
        component: _vc_participant_vc_participant_add_update_vc_participant_add_update_component__WEBPACK_IMPORTED_MODULE_4__["VcParticipantAddUpdateComponent"],
    },
    {
        path: "add/:id",
        component: _vc_participant_vc_participant_add_update_vc_participant_add_update_component__WEBPACK_IMPORTED_MODULE_4__["VcParticipantAddUpdateComponent"],
    },
    {
        path: "VCCreation",
        component: _vc_creation_vc_creation_component__WEBPACK_IMPORTED_MODULE_5__["VCCreationComponent"],
    },
    {
        path: "report",
        component: _report_report_component__WEBPACK_IMPORTED_MODULE_6__["ReportComponent"],
    },
    {
        path: "report/:id",
        component: _report_report_component__WEBPACK_IMPORTED_MODULE_6__["ReportComponent"],
    },
    {
        path: "VcLocationMaster",
        component: _vc_location_master_vc_location_master_component__WEBPACK_IMPORTED_MODULE_7__["VcLocationMasterComponent"],
    },
    {
        path: "reportsummary",
        component: _report_report_summary_report_summary_component__WEBPACK_IMPORTED_MODULE_8__["ReportSummaryComponent"],
    },
    {
        path: "participantExcelupload",
        component: _vc_participant_participant_excel_upload_participant_excel_upload_component__WEBPACK_IMPORTED_MODULE_9__["ParticipantExcelUploadComponent"],
    },
    {
        path: "districtreport",
        component: _report_district_report_district_report_component__WEBPACK_IMPORTED_MODULE_10__["DistrictReportComponent"],
    },
    {
        path: "chirpersoncategorysummaryreport",
        component: _report_chairperson_cat_summary_report_chairperson_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_11__["ChairpersonCatSummaryReportComponent"],
    },
    {
        path: "reportsummary/:ChairpersonCat",
        component: _report_report_summary_report_summary_component__WEBPACK_IMPORTED_MODULE_8__["ReportSummaryComponent"],
    },
    {
        path: "cat-dpt-summary-report",
        component: _report_cat_dpt_summary_report_cat_dpt_summary_report_component__WEBPACK_IMPORTED_MODULE_12__["CatDptSummaryReportComponent"],
    },
    {
        path: "adm-dpt-cat-summary-report",
        component: _report_adm_dpt_cat_summary_report_adm_dpt_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_13__["AdmDptCatSummaryReportComponent"],
    }
    // {
    //   path: "vcdistrictreport",
    //   component: VcGraphicalDistrictReportComponent,
    // },
    // {
    //   path: "vclocationreport",
    //   component: VcGraphicalLocationReportComponent,
    // },
    // {
    //   path: "vcparticipantreport",
    //   component: VcGraphicalParticipantReportComponent,
    // },
];
var VideoConferencingRoutingModule = /** @class */ (function () {
    function VideoConferencingRoutingModule() {
    }
    VideoConferencingRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [],
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], VideoConferencingRoutingModule);
    return VideoConferencingRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/video-conferencing/video-conferencing.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/content/video-conferencing/video-conferencing.module.ts ***!
  \*************************************************************************/
/*! exports provided: VideoConferencingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoConferencingModule", function() { return VideoConferencingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _vc_participant_vc_participant_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vc-participant/vc-participant.component */ "./src/app/content/video-conferencing/vc-participant/vc-participant.component.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _video_conferencing_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./video-conferencing-routing.module */ "./src/app/content/video-conferencing/video-conferencing-routing.module.ts");
/* harmony import */ var _vc_participant_vc_participant_add_update_vc_participant_add_update_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vc-participant/vc-participant-add-update/vc-participant-add-update.component */ "./src/app/content/video-conferencing/vc-participant/vc-participant-add-update/vc-participant-add-update.component.ts");
/* harmony import */ var _vc_participant_vc_participant_report_dialog_vc_participant_report_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component */ "./src/app/content/video-conferencing/vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component.ts");
/* harmony import */ var _vc_creation_vc_creation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vc-creation/vc-creation.component */ "./src/app/content/video-conferencing/vc-creation/vc-creation.component.ts");
/* harmony import */ var _vc_creation_add_update_vccreation_add_update_vccreation_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vc-creation/add-update-vccreation/add-update-vccreation.component */ "./src/app/content/video-conferencing/vc-creation/add-update-vccreation/add-update-vccreation.component.ts");
/* harmony import */ var _vc_location_master_vc_location_master_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./vc-location-master/vc-location-master.component */ "./src/app/content/video-conferencing/vc-location-master/vc-location-master.component.ts");
/* harmony import */ var _vc_location_master_add_update_vclocation_master_add_update_vclocation_master_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component */ "./src/app/content/video-conferencing/vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component.ts");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./report/report.component */ "./src/app/content/video-conferencing/report/report.component.ts");
/* harmony import */ var _report_report_summary_report_summary_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./report/report-summary/report-summary.component */ "./src/app/content/video-conferencing/report/report-summary/report-summary.component.ts");
/* harmony import */ var _vc_participant_participant_excel_upload_participant_excel_upload_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./vc-participant/participant-excel-upload/participant-excel-upload.component */ "./src/app/content/video-conferencing/vc-participant/participant-excel-upload/participant-excel-upload.component.ts");
/* harmony import */ var _report_district_report_district_report_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./report/district-report/district-report.component */ "./src/app/content/video-conferencing/report/district-report/district-report.component.ts");
/* harmony import */ var _report_chairperson_cat_summary_report_chairperson_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./report/chairperson-cat-summary-report/chairperson-cat-summary-report.component */ "./src/app/content/video-conferencing/report/chairperson-cat-summary-report/chairperson-cat-summary-report.component.ts");
/* harmony import */ var _report_cat_dpt_summary_report_cat_dpt_summary_report_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./report/cat-dpt-summary-report/cat-dpt-summary-report.component */ "./src/app/content/video-conferencing/report/cat-dpt-summary-report/cat-dpt-summary-report.component.ts");
/* harmony import */ var _report_adm_dpt_cat_summary_report_adm_dpt_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component */ "./src/app/content/video-conferencing/report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component.ts");



















var VideoConferencingModule = /** @class */ (function () {
    function VideoConferencingModule() {
    }
    VideoConferencingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _vc_participant_vc_participant_component__WEBPACK_IMPORTED_MODULE_3__["VcParticipantComponent"],
                _vc_participant_vc_participant_add_update_vc_participant_add_update_component__WEBPACK_IMPORTED_MODULE_6__["VcParticipantAddUpdateComponent"],
                _vc_participant_vc_participant_report_dialog_vc_participant_report_dialog_component__WEBPACK_IMPORTED_MODULE_7__["VcParticipantReportDialogComponent"],
                _vc_creation_vc_creation_component__WEBPACK_IMPORTED_MODULE_8__["VCCreationComponent"],
                _vc_creation_add_update_vccreation_add_update_vccreation_component__WEBPACK_IMPORTED_MODULE_9__["AddUpdateVCCreationComponent"],
                _vc_location_master_vc_location_master_component__WEBPACK_IMPORTED_MODULE_10__["VcLocationMasterComponent"],
                _vc_location_master_add_update_vclocation_master_add_update_vclocation_master_component__WEBPACK_IMPORTED_MODULE_11__["AddUpdateVCLocationMasterComponent"],
                _report_report_component__WEBPACK_IMPORTED_MODULE_12__["ReportComponent"],
                _report_report_summary_report_summary_component__WEBPACK_IMPORTED_MODULE_13__["ReportSummaryComponent"],
                _vc_participant_participant_excel_upload_participant_excel_upload_component__WEBPACK_IMPORTED_MODULE_14__["ParticipantExcelUploadComponent"],
                _report_district_report_district_report_component__WEBPACK_IMPORTED_MODULE_15__["DistrictReportComponent"],
                _report_chairperson_cat_summary_report_chairperson_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_16__["ChairpersonCatSummaryReportComponent"],
                _report_cat_dpt_summary_report_cat_dpt_summary_report_component__WEBPACK_IMPORTED_MODULE_17__["CatDptSummaryReportComponent"],
                _report_adm_dpt_cat_summary_report_adm_dpt_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_18__["AdmDptCatSummaryReportComponent"],
            ],
            entryComponents: [
                _vc_participant_vc_participant_report_dialog_vc_participant_report_dialog_component__WEBPACK_IMPORTED_MODULE_7__["VcParticipantReportDialogComponent"],
                _vc_creation_add_update_vccreation_add_update_vccreation_component__WEBPACK_IMPORTED_MODULE_9__["AddUpdateVCCreationComponent"],
                _vc_location_master_add_update_vclocation_master_add_update_vclocation_master_component__WEBPACK_IMPORTED_MODULE_11__["AddUpdateVCLocationMasterComponent"],
            ],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _video_conferencing_routing_module__WEBPACK_IMPORTED_MODULE_5__["VideoConferencingRoutingModule"], src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_4__["AppMaterialModule"]],
        })
    ], VideoConferencingModule);
    return VideoConferencingModule;
}());



/***/ })

}]);
//# sourceMappingURL=content-video-conferencing-video-conferencing-module.js.map