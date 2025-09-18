(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-viplms-viplms-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/viplms/reports/reports.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/viplms/reports/reports.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>reports works!</p>\r\n\r\n<a routerLink=\"/viplms/statistical-report\">Statistical Report</a>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col l12 m12 s12 mb-20\">\r\n        <section class=\"mat-typography\">\r\n            <h2 class=\"color-blue mb-0\">Advance Search</h2>\r\n        </section>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field appearance=\"outline\">\r\n            <mat-label>Ref. No. From </mat-label>\r\n            <input matInput placeholder=\"Ref. No. From\" [(ngModel)]=\"model.RefNoFrom\" maxlength=\"10\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Ref. No. To </mat-label>\r\n            <input matInput placeholder=\"Ref. No. To\" [(ngModel)]=\"model.RefNoTo\" maxlength=\"10\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Subject </mat-label>\r\n            <input matInput placeholder=\"Subject\" [(ngModel)]=\"model.Subject\" maxlength=\"200\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Sender Name </mat-label>\r\n            <input matInput placeholder=\"Sender Name\" [(ngModel)]=\"model.SenderName\" maxlength=\"50\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Address </mat-label>\r\n            <input matInput placeholder=\"Address\" [(ngModel)]=\"model.Address\" maxlength=\"100\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Mobile </mat-label>\r\n            <input matInput placeholder=\"Mobile\" [(ngModel)]=\"model.Mobile\" maxlength=\"10\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Action Taken By Department </mat-label>\r\n            <input matInput placeholder=\"Action Taken By Department\" [(ngModel)]=\"model.ActionTakenByDepartment\"\r\n                maxlength=\"100\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Action Taken By CMO </mat-label>\r\n            <input matInput placeholder=\"Action Taken By CMO\" [(ngModel)]=\"model.ActionTakenByCMO\" maxlength=\"100\">\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Commenting Officer</mat-label>\r\n            <mat-select [(ngModel)]=\"model.CommentingOfficerCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlUserGroup\">{{item.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Referencee</mat-label>\r\n            <mat-select [(ngModel)]=\"model.ReferenceeCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlReferencee\">{{item.Text}}</mat-option> \r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Department</mat-label>\r\n            <mat-select [(ngModel)]=\"model.DepartmentCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlDepartment\">{{item.Text}}</mat-option> \r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Department Status</mat-label>\r\n            <mat-select [(ngModel)]=\"model.DepartmentStatusCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlVIPLMS_LetterAction\">{{item.Text}}</mat-option> \r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>CMO Status</mat-label>\r\n            <mat-select [(ngModel)]=\"model.CMOStatusCode\">\r\n                <mat-option value>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlVIPLMS_LetterAction\">{{item.Text}}</mat-option> \r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Officer Group</mat-label>\r\n            <mat-select [(ngModel)]=\"model.OfficerGroupCode\">\r\n                <mat-option>--Select--</mat-option>\r\n                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dropdownList?.ddlUserGroup\">{{item.Text}}</mat-option> \r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Entry Date From </mat-label>\r\n            <input matInput [(ngModel)]=\"model.EntryDateFrom\" [matDatepicker]=\"edfPicker\" (focus)=\"edfPicker.open()\"\r\n                placeholder=\"Entry Date From\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"edfPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #edfPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Entry Date To </mat-label>\r\n            <input matInput [(ngModel)]=\"model.EntryDateTo\" [matDatepicker]=\"edtPicker\" (focus)=\"edtPicker.open()\"\r\n                placeholder=\"Entry Date To\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"edtPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #edtPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Dept. Action Date From </mat-label>\r\n            <input matInput [(ngModel)]=\"model.DepartmentActionDateFrom\" [matDatepicker]=\"dadfPicker\"\r\n                (focus)=\"dadfPicker.open()\" placeholder=\"Dept. Action Date From\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"dadfPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dadfPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Dept. Action Date To </mat-label>\r\n            <input matInput [(ngModel)]=\"model.DepartmentActionDateTo\" [matDatepicker]=\"dadtPicker\"\r\n                (focus)=\"dadtPicker.open()\" placeholder=\"Dept. Action Date To\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"dadtPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dadtPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>CMO Action Date From </mat-label>\r\n            <input matInput [(ngModel)]=\"model.CMOActionDateFrom\" [matDatepicker]=\"cadfPicker\"\r\n                (focus)=\"cadfPicker.open()\" placeholder=\"CMO Action Date From\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"cadfPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #cadfPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>CMO Action Date To </mat-label>\r\n            <input matInput [(ngModel)]=\"model.CMOActionDateTo\" [matDatepicker]=\"cadtPicker\" (focus)=\"cadtPicker.open()\"\r\n                placeholder=\"CMO Action Date To\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"cadtPicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #cadtPicker></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-radio-group [(ngModel)]=\"model.LetterType\"\r\n            class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\">\r\n            <mat-label class=\"mr-5\">Letter Type </mat-label>\r\n            <mat-radio-button class=\"mr-5\" value=\"\">All</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"Receipt\">Receipt</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"Dispatch\">Dispatch</mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-radio-group [(ngModel)]=\"model.ReferenceeType\"\r\n            class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\">\r\n            <mat-label class=\"mr-5\">Referencee Type </mat-label>\r\n            <mat-radio-button class=\"mr-5\" value=\"\">All</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"VVIP\">VVIP</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"VIP\">VIP</mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n\r\n    <div class=\"col l3 x6 m3 s12\">\r\n        <mat-radio-group [(ngModel)]=\"model.haveAttachment\"\r\n            class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\">\r\n            <mat-label class=\"mr-5\">Have Attachment </mat-label>\r\n            <mat-radio-button class=\"mr-5\" value=\"\">All</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"Yes\">Yes</mat-radio-button>\r\n            <mat-radio-button class=\"mr-5\" value=\"No\">No</mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n\r\n    <div class=\"col l12 x12 m12 s12\">\r\n        <button mat-button class=\"btn-submit mr-5\" (click)=\"setSearchFilter()\">Search</button>\r\n        <button mat-button class=\"btn-submit\" (click)=\"resetAdvanceSearch()\">Refresh</button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/viplms/statistical-report/statistical-report.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/viplms/statistical-report/statistical-report.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-report-advance-search (outputModel)=\"getRecord($event)\"></app-report-advance-search>\r\n<p>statistical-report works!</p>\r\n"

/***/ }),

/***/ "./src/app/Shared/Model/VIPLMS/report-advance-search.model.ts":
/*!********************************************************************!*\
  !*** ./src/app/Shared/Model/VIPLMS/report-advance-search.model.ts ***!
  \********************************************************************/
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

/***/ "./src/app/content/viplms/reports/reports.component.css":
/*!**************************************************************!*\
  !*** ./src/app/content/viplms/reports/reports.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlwbG1zL3JlcG9ydHMvcmVwb3J0cy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/viplms/reports/reports.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/content/viplms/reports/reports.component.ts ***!
  \*************************************************************/
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
            template: __webpack_require__(/*! raw-loader!./reports.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/viplms/reports/reports.component.html"),
            styles: [__webpack_require__(/*! ./reports.component.css */ "./src/app/content/viplms/reports/reports.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlwbG1zL3NoYXJlZC9yZXBvcnQtYWR2YW5jZS1zZWFyY2gvcmVwb3J0LWFkdmFuY2Utc2VhcmNoLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.ts ***!
  \************************************************************************************************/
/*! exports provided: ReportAdvanceSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportAdvanceSearchComponent", function() { return ReportAdvanceSearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_VIPLMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/VIPLMS/report-advance-search.model */ "./src/app/Shared/Model/VIPLMS/report-advance-search.model.ts");
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
        var defaultStartDate = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].DefaultStartDate;
        var defaultEndDate = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].DefaultEndDate;
        this.model = new src_app_Shared_Model_VIPLMS_report_advance_search_model__WEBPACK_IMPORTED_MODULE_3__["ReportAdvanceSearchModel"]();
        this.model.EntryDateFrom = this.model.DepartmentActionDateFrom = this.model.CMOActionDateFrom = defaultStartDate;
        this.model.EntryDateTo = this.model.DepartmentActionDateTo = this.model.CMOActionDateTo = defaultEndDate;
        this.model.LetterType = this.model.ReferenceeType = this.model.haveAttachment = '';
    };
    ReportAdvanceSearchComponent.prototype.getDropdownList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].VIPLMS_DDLKeyForReportAdvanceSearch).subscribe(function (data) {
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
            template: __webpack_require__(/*! raw-loader!./report-advance-search.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["DateAdapter"], useClass: src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_5__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_5__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./report-advance-search.component.css */ "./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"]])
    ], ReportAdvanceSearchComponent);
    return ReportAdvanceSearchComponent;
}());



/***/ }),

/***/ "./src/app/content/viplms/statistical-report/statistical-report.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/content/viplms/statistical-report/statistical-report.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmlwbG1zL3N0YXRpc3RpY2FsLXJlcG9ydC9zdGF0aXN0aWNhbC1yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/viplms/statistical-report/statistical-report.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/content/viplms/statistical-report/statistical-report.component.ts ***!
  \***********************************************************************************/
/*! exports provided: StatisticalReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticalReportComponent", function() { return StatisticalReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");



var StatisticalReportComponent = /** @class */ (function () {
    function StatisticalReportComponent(_appComponet) {
        this._appComponet = _appComponet;
        this.reportName = "Letter Type";
        this._appComponet.setpagelayout("Statistical Report", "keyboard_backspace", "Back to Reports", "/viplms/reports");
    }
    StatisticalReportComponent.prototype.ngOnInit = function () {
    };
    StatisticalReportComponent.prototype.getRecord = function (event) {
        this.reportAdvanceSearchModel = event;
    };
    StatisticalReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] }
    ]; };
    StatisticalReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-statistical-report',
            template: __webpack_require__(/*! raw-loader!./statistical-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/viplms/statistical-report/statistical-report.component.html"),
            styles: [__webpack_require__(/*! ./statistical-report.component.css */ "./src/app/content/viplms/statistical-report/statistical-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]])
    ], StatisticalReportComponent);
    return StatisticalReportComponent;
}());



/***/ }),

/***/ "./src/app/content/viplms/viplms-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/content/viplms/viplms-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ViplmsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViplmsRoutingModule", function() { return ViplmsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _viplms_reports_reports_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../viplms/reports/reports.component */ "./src/app/content/viplms/reports/reports.component.ts");
/* harmony import */ var _viplms_statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../viplms/statistical-report/statistical-report.component */ "./src/app/content/viplms/statistical-report/statistical-report.component.ts");






var routes = [
    {
        path: '',
        component: _viplms_reports_reports_component__WEBPACK_IMPORTED_MODULE_4__["ReportsComponent"],
    },
    {
        path: 'reports',
        component: _viplms_reports_reports_component__WEBPACK_IMPORTED_MODULE_4__["ReportsComponent"]
    },
    {
        path: 'statistical-report',
        component: _viplms_statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_5__["StatisticalReportComponent"]
    }
];
var ViplmsRoutingModule = /** @class */ (function () {
    function ViplmsRoutingModule() {
    }
    ViplmsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
    ], ViplmsRoutingModule);
    return ViplmsRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/viplms/viplms.module.ts":
/*!*************************************************!*\
  !*** ./src/app/content/viplms/viplms.module.ts ***!
  \*************************************************/
/*! exports provided: ViplmsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViplmsModule", function() { return ViplmsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _viplms_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viplms-routing.module */ "./src/app/content/viplms/viplms-routing.module.ts");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reports/reports.component */ "./src/app/content/viplms/reports/reports.component.ts");
/* harmony import */ var _shared_report_advance_search_report_advance_search_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/report-advance-search/report-advance-search.component */ "./src/app/content/viplms/shared/report-advance-search/report-advance-search.component.ts");
/* harmony import */ var _statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./statistical-report/statistical-report.component */ "./src/app/content/viplms/statistical-report/statistical-report.component.ts");








var ViplmsModule = /** @class */ (function () {
    function ViplmsModule() {
    }
    ViplmsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_reports_reports_component__WEBPACK_IMPORTED_MODULE_5__["ReportsComponent"], _shared_report_advance_search_report_advance_search_component__WEBPACK_IMPORTED_MODULE_6__["ReportAdvanceSearchComponent"], _statistical_report_statistical_report_component__WEBPACK_IMPORTED_MODULE_7__["StatisticalReportComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _viplms_routing_module__WEBPACK_IMPORTED_MODULE_4__["ViplmsRoutingModule"], _Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_1__["AppMaterialModule"]]
        })
    ], ViplmsModule);
    return ViplmsModule;
}());



/***/ })

}]);
//# sourceMappingURL=content-viplms-viplms-module.js.map