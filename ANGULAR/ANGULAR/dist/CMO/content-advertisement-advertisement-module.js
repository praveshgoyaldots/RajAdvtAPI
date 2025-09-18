(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-advertisement-advertisement-module"],{

/***/ "./node_modules/ngx-json-viewer/ngx-json-viewer.es5.js":
/*!*************************************************************!*\
  !*** ./node_modules/ngx-json-viewer/ngx-json-viewer.es5.js ***!
  \*************************************************************/
/*! exports provided: NgxJsonViewerModule, NgxJsonViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxJsonViewerModule", function() { return NgxJsonViewerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxJsonViewerComponent", function() { return NgxJsonViewerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");


var NgxJsonViewerComponent = /** @class */ (function () {
    function NgxJsonViewerComponent() {
        this.expanded = true;
        /**
         * @deprecated It will be always true and deleted in version 3.0.0
         */
        this.cleanOnChange = true;
        this.segments = [];
    }
    /**
     * @return {?}
     */
    NgxJsonViewerComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.cleanOnChange) {
            this.segments = [];
        }
        if (typeof this.json === 'object') {
            Object.keys(this.json).forEach(function (key) {
                _this.segments.push(_this.parseKeyValue(key, _this.json[key]));
            });
        }
        else {
            this.segments.push(this.parseKeyValue("(" + typeof this.json + ")", this.json));
        }
    };
    /**
     * @param {?} segment
     * @return {?}
     */
    NgxJsonViewerComponent.prototype.isExpandable = function (segment) {
        return segment.type === 'object' || segment.type === 'array';
    };
    /**
     * @param {?} segment
     * @return {?}
     */
    NgxJsonViewerComponent.prototype.toggle = function (segment) {
        if (this.isExpandable(segment)) {
            segment.expanded = !segment.expanded;
        }
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    NgxJsonViewerComponent.prototype.parseKeyValue = function (key, value) {
        var /** @type {?} */ segment = {
            key: key,
            value: value,
            type: undefined,
            description: '' + value,
            expanded: this.expanded
        };
        switch (typeof segment.value) {
            case 'number': {
                segment.type = 'number';
                break;
            }
            case 'boolean': {
                segment.type = 'boolean';
                break;
            }
            case 'function': {
                segment.type = 'function';
                break;
            }
            case 'string': {
                segment.type = 'string';
                segment.description = '"' + segment.value + '"';
                break;
            }
            case 'undefined': {
                segment.type = 'undefined';
                segment.description = 'undefined';
                break;
            }
            case 'object': {
                // yea, null is object
                if (segment.value === null) {
                    segment.type = 'null';
                    segment.description = 'null';
                }
                else if (Array.isArray(segment.value)) {
                    segment.type = 'array';
                    segment.description = 'Array[' + segment.value.length + '] ' + JSON.stringify(segment.value);
                }
                else if (segment.value instanceof Date) {
                    segment.type = 'date';
                }
                else {
                    segment.type = 'object';
                    segment.description = 'Object ' + JSON.stringify(segment.value);
                }
                break;
            }
        }
        return segment;
    };
    return NgxJsonViewerComponent;
}());
NgxJsonViewerComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'ngx-json-viewer',
                template: "\n    <section class=\"ngx-json-viewer\">\n      <section\n        *ngFor=\"let segment of segments\"\n        [ngClass]=\"['segment', 'segment-type-' + segment.type]\">\n        <section\n          (click)=\"toggle(segment)\"\n          [ngClass]=\"{\n            'segment-main': true,\n            'expandable': isExpandable(segment),\n            'expanded': segment.expanded\n          }\">\n          <div *ngIf=\"isExpandable(segment)\" class=\"toggler\"></div>\n          <span class=\"segment-key\">{{ segment.key }}</span>\n          <span class=\"segment-separator\">: </span>\n          <span *ngIf=\"!segment.expanded || !isExpandable(segment)\" class=\"segment-value\">{{ segment.description }}</span>\n        </section>\n        <section *ngIf=\"segment.expanded && isExpandable(segment)\" class=\"children\">\n          <ngx-json-viewer [json]=\"segment.value\" [expanded]=\"expanded\"></ngx-json-viewer>\n        </section>\n      </section>\n    </section>\n  ",
                styles: ["\n    @charset \"UTF-8\";\n    .ngx-json-viewer {\n      font-family: monospace;\n      font-size: 1em;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      position: relative; }\n      .ngx-json-viewer .segment {\n        padding: 2px;\n        margin: 1px 1px 1px 12px; }\n        .ngx-json-viewer .segment .segment-main {\n          word-wrap: break-word; }\n          .ngx-json-viewer .segment .segment-main .toggler {\n            position: absolute;\n            margin-left: -14px;\n            margin-top: 3px;\n            font-size: .8em;\n            line-height: 1.2em;\n            vertical-align: middle;\n            color: #787878; }\n            .ngx-json-viewer .segment .segment-main .toggler::after {\n              display: inline-block;\n              content: \"\u25BA\";\n              -webkit-transition: -webkit-transform 0.1s ease-in;\n              transition: -webkit-transform 0.1s ease-in;\n              transition: transform 0.1s ease-in;\n              transition: transform 0.1s ease-in, -webkit-transform 0.1s ease-in; }\n          .ngx-json-viewer .segment .segment-main .segment-key {\n            color: #4E187C; }\n          .ngx-json-viewer .segment .segment-main .segment-separator {\n            color: #999; }\n          .ngx-json-viewer .segment .segment-main .segment-value {\n            color: #000; }\n        .ngx-json-viewer .segment .children {\n          margin-left: 12px; }\n      .ngx-json-viewer .segment-type-string > .segment-main > .segment-value {\n        color: #FF6B6B; }\n      .ngx-json-viewer .segment-type-number > .segment-main > .segment-value {\n        color: #009688; }\n      .ngx-json-viewer .segment-type-boolean > .segment-main > .segment-value {\n        color: #b938a4; }\n      .ngx-json-viewer .segment-type-date > .segment-main > .segment-value {\n        color: #05668D; }\n      .ngx-json-viewer .segment-type-array > .segment-main > .segment-value {\n        color: #999; }\n      .ngx-json-viewer .segment-type-object > .segment-main > .segment-value {\n        color: #999; }\n      .ngx-json-viewer .segment-type-function > .segment-main > .segment-value {\n        color: #999; }\n      .ngx-json-viewer .segment-type-null > .segment-main > .segment-value {\n        color: #fff; }\n      .ngx-json-viewer .segment-type-undefined > .segment-main > .segment-value {\n        color: #fff; }\n      .ngx-json-viewer .segment-type-null > .segment-main > .segment-value {\n        background-color: red; }\n      .ngx-json-viewer .segment-type-undefined > .segment-main > .segment-key {\n        color: #999; }\n      .ngx-json-viewer .segment-type-undefined > .segment-main > .segment-value {\n        background-color: #999; }\n      .ngx-json-viewer .segment-type-object > .segment-main,\n      .ngx-json-viewer .segment-type-array > .segment-main {\n        white-space: nowrap; }\n      .ngx-json-viewer .expanded > .toggler::after {\n        -webkit-transform: rotate(90deg);\n                transform: rotate(90deg); }\n      .ngx-json-viewer .expandable,\n      .ngx-json-viewer .expandable > .toggler {\n        cursor: pointer; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
NgxJsonViewerComponent.ctorParameters = function () { return []; };
NgxJsonViewerComponent.propDecorators = {
    'json': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'expanded': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'cleanOnChange': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
};
var NgxJsonViewerModule = /** @class */ (function () {
    function NgxJsonViewerModule() {
    }
    return NgxJsonViewerModule;
}());
NgxJsonViewerModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
                ],
                declarations: [
                    NgxJsonViewerComponent
                ],
                exports: [
                    NgxJsonViewerComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxJsonViewerModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-json-viewer.es5.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.html":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.html ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20 mb-0\">\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Entry from Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"Date\" [(ngModel)]=\"model.EntryFromDate\" [max]=\"model.EntryToDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l4 xl4 m6 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Entry To Date</mat-label>\r\n            <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Date\" [(ngModel)]=\"model.EntryToDate\" [min]=\"model.EntryFromDate\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker1></mat-datepicker>\r\n          </mat-form-field>\r\n        </div>\r\n  <div class=\"col l4 xl4 m6 s12 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> Department Category</mat-label>\r\n        <mat-select [(ngModel)]=\"model.DepartmentCategoryCode\" (selectionChange)=\"GetList()\">\r\n          <mat-option value=\"0\">All</mat-option>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentCategory\">{{ k.Text }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l12 m12 s12 text-center mb-20\">\r\n        <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n        <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Clear Search</button>\r\n      </div>\r\n  </div>\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 \">\r\n    <div class=\"table-responsive table-header-fixed\">\r\n      <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8 table_border \">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\"> {{(i+1)}}</td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n        <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n          <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n          <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Videos\">\r\n          <th mat-header-cell *matHeaderCellDef>Videos </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Videos}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalVideos}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Awards\">\r\n          <th mat-header-cell *matHeaderCellDef>Awards </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Awards}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalAwards}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"BannerImage\">\r\n          <th mat-header-cell *matHeaderCellDef>Banner Image </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.BannerImage}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalBannerImage}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"DepartmentalAchievements\">\r\n          <th mat-header-cell *matHeaderCellDef>Departmental Achievements </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.DepartmentalAchievements}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalDepartmentalAchievements}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"ExternalLink\">\r\n          <th mat-header-cell *matHeaderCellDef>External Link </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ExternalLink}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalExternalLink}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"NewsTicker\">\r\n          <th mat-header-cell *matHeaderCellDef>News Ticker</th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.NewsTicker}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalNewsTicker}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"PhotoGallery\">\r\n          <th mat-header-cell *matHeaderCellDef>Photo Gallery </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.PhotoGallery}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalPhotoGallery}} </td>\r\n        </ng-container>\r\n        <!-- <ng-container matColumnDef=\"Publications\">\r\n          <th mat-header-cell *matHeaderCellDef>Publications </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Publications}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalPublications}} </td>\r\n        </ng-container> -->\r\n        <ng-container matColumnDef=\"UpcomingEvents\">\r\n          <th mat-header-cell *matHeaderCellDef>UpcomingEvents </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.UpcomingEvents}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ totalUpcomingEvents}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Total\">\r\n          <th mat-header-cell *matHeaderCellDef>Total </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Total}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{ total}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Audio\">\r\n            <th mat-header-cell *matHeaderCellDef>Audio </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Audio}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalAudio}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Advertisement\">\r\n              <th mat-header-cell *matHeaderCellDef>Advertisement </th>\r\n              <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Advertisement}} </td>\r\n              <td mat-footer-cell *matFooterCellDef>{{ totalAdvertisement}} </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"Posters\">\r\n                <th mat-header-cell *matHeaderCellDef>Posters </th>\r\n                <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Posters}} </td>\r\n                <td mat-footer-cell *matFooterCellDef>{{ totalPosters}} </td>\r\n              </ng-container>\r\n              <ng-container matColumnDef=\"ImportantDecisions\">\r\n                  <th mat-header-cell *matHeaderCellDef>Important Decisions </th>\r\n                  <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ImportantDecisions}} </td>\r\n                  <td mat-footer-cell *matFooterCellDef>{{ totalImportantDecisions}} </td>\r\n                </ng-container>\r\n                <ng-container matColumnDef=\"CabinetDecisions\">\r\n                  <th mat-header-cell *matHeaderCellDef>Cabinet Decisions </th>\r\n                  <td mat-cell *matCellDef=\"let transaction\"> {{transaction.CabinetDecisions}} </td>\r\n                  <td mat-footer-cell *matFooterCellDef>{{ totalCabinetDecisions}} </td>\r\n                </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/achievements.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/achievements/achievements.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <app-global-list-search [SearchFields]=\"ViewdisplayedColumns\" (onSearch)=\"SearchByKeyword($event)\">\r\n</app-global-list-search> -->\r\n\r\n\r\n\r\n<!-- \r\n<div class=\"row m-0\">\r\n\r\n  \r\n\r\n</div> -->\r\n<!-- <div class=\"row\">\r\n  <div class=\"col l12 xl12 m12 s12 \">\r\n    <a (click)=\"toggleDisplay()\" class=\"btn-ad-search\">{{!isShow?'Hide Advance Search ':\"Show Advance Search\"}}\r\n      <mat-icon>\r\n        {{!isShow?'keyboard_arrow_up ':\"keyboard_arrow_down\"}}\r\n      </mat-icon>\r\n    </a>\r\n  </div>\r\n  <br />\r\n</div> -->\r\n<div class=\"row\">\r\n\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Department</mat-label>\r\n      <mat-select name=\"DepartmentCode\" [(ngModel)]=\"searchModel.DepartmentCode\"\r\n        (selectionChange)=\"GetDDLListByDepartment($event.value);\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.DepartmentCode}}\" *ngFor=\"let k of  ddlDepartment\">{{k.DepartmentTitle}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Category</mat-label>\r\n      <mat-select name=\"CategortyCode\" [(ngModel)]=\"searchModel.CategortyCode\"\r\n        (selectionChange)=\"GetGeneralSubCategory($event.value);\" [disabled]=\"catCode\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of ddlAchievementCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Sub Category</mat-label>\r\n      <mat-select name=\"SubCategortyCode\" [(ngModel)]=\"searchModel.SubCategortyCode\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAchievementSubCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>From Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\"\r\n        [(ngModel)]=\"fromDate\" [max]=\"toDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>To Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\"\r\n        [(ngModel)]=\"toDate\" [min]=\"fromDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker2></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n\r\n\r\n\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Active/De-Active</mat-label>\r\n      <mat-select name=\"Activeview\" [(ngModel)]=\"searchModel.Activeview\">\r\n        <mat-option [value]=\"-1\">All</mat-option>\r\n        <mat-option [value]=\"1\">Active</mat-option>\r\n        <mat-option [value]=\"0\">DeActive</mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>CMO Comments</mat-label>\r\n      <input matInput placeholder=\"CMO Comments\" [(ngModel)]=\"searchModel.CMOComments\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\" style=\"display: none;\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <input matInput placeholder=\"Search\" [(ngModel)]=\"searchModel.SearchField\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <input matInput placeholder=\"Keyword\" [(ngModel)]=\"searchModel.KeyWord\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <input matInput placeholder=\"Auto Keyword\" [(ngModel)]=\"searchModel.AutoKeyWord\" />\r\n    </mat-form-field>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 x12 m12 s12 text-left clearfix\">\r\n    <button (click)=\"getList()\" mat-button class=\"btn-submit btn_green\">Search</button>\r\n    &nbsp;\r\n    <button (click)=\"print()\" mat-button class=\"btn-submit btn_orange\">Print Report</button> &nbsp;\r\n    <button (click)=\"reset();\" mat-button class=\"btn-submit btn_orange\"><mat-icon>refresh</mat-icon></button>\r\n    <button (click)=\"downloadCsv()\" mat-button class=\"btn-submit mat-button float-right\">Export to Excel\r\n      <mat-icon>report</mat-icon></button>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n\r\n    <mat-toolbar color=\"primary\" *ngIf=\"totalRecords==0\">No Record...!</mat-toolbar>\r\n    <div class=\"table-responsive\" *ngIf=\"model?.length>0\">\r\n      <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\" class=\"mat-elevation-z8\"\r\n        *ngIf=\"totalRecords!=0\" id=\"print\">\r\n\r\n\r\n        <!-- <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>S No.</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container> -->\r\n\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>S No./ <br>Date/ <br>Images</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n            {{(searchModel.indexmodel.Page-1)*this.searchModel.indexmodel.PageSize +(i+1)}}/\r\n            <br>{{ element.AchievementDate !=null ? (element.AchievementDate| date: 'dd/MM/yyyy') :'--'}}\r\n            <br>\r\n            <ul class=\"image-list\">\r\n              <li *ngFor=\"let url of element.AchievementAttachments; let i = index;\">\r\n                <a *ngIf=\"url\" (click)=\"downloadPdf(url)\" href=\"JavaScript:Void(0);\">\r\n                  <img [src]=\"url\" style=\"height: 100px; width: 100px;\" />\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </td>\r\n        </ng-container>\r\n\r\n\r\n        <ng-container matColumnDef=\"Department\">\r\n          <th mat-header-cell *matHeaderCellDef>Department/ <br />Category/ <br />Sub category/ <br> Software Entry No.\r\n          </th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n            {{element.Department}}<span>/<br></span>{{element.AchievementCategory}} <span>/<br></span>\r\n            {{element.AchievementSubCategory}} <span>/<br></span> {{element.Id}}</td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"AchievementHindi\" style=\"width: 5%;\">\r\n          <th mat-header-cell *matHeaderCellDef>General Entry (Hindi)</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">{{element.AchievementHindi}}\r\n          </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"DescriptionHindi\" style=\"width: 5%;\">\r\n          <th mat-header-cell *matHeaderCellDef>Description(Hindi) </th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">{{element.DescriptionHindi}}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <!-- <ng-container matColumnDef=\"CMOComments\">\r\n          <th mat-header-cell *matHeaderCellDef>CMO Comments</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">{{element.CMOComments}}\r\n          </td>\r\n        </ng-container> -->\r\n\r\n        <ng-container matColumnDef=\"UserName\">\r\n          <th mat-header-cell *matHeaderCellDef>Created By/ <br /> Created Date</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">{{element.UserName}} / <br>\r\n            {{ element.ModifiedDate !=null ? (element.ModifiedDate | date: 'dd/MM/yyy , h:mm:ss a') :'--'}}</td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"IsActive\">\r\n          <th mat-header-cell *matHeaderCellDef class=\"doNotPrint\"> Active Status </th>\r\n          <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn doNotPrint\">\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"updateActiveStatus(element.Id)\"\r\n              title=\"Update Active Status\">\r\n              <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n              <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Active Status\" class=\"doNotPrint\">\r\n              <mat-icon *ngIf=\"element.IsActive\" class=\"doNotPrint\" style=\"cursor:pointer;color:  #74cb74;\">toggle_on\r\n              </mat-icon>\r\n              <mat-icon *ngIf=\"!element.IsActive\" class=\"doNotPrint\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n              </mat-icon>\r\n            </a>\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Action\" class=\"doNotPrint\">\r\n          <th mat-header-cell *matHeaderCellDef class=\"doNotPrint\"> Action </th>\r\n          <td mat-cell *matCellDef=\"let element\" style=\"cursor:pointer;\" class=\" action-link doNotPrint\">\r\n            <a *ngIf=\"this.Permission.DeletePageAccess\" (click)=\"updateDeleteStatus(element.Id)\" title=\"Delete\">\r\n              <mat-icon>delete</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"this.Permission.DetailPageAccess\" routerLink=\"detail/{{element.Id}}\" title=\"Detail\">\r\n              <mat-icon>visibility</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess && !catCode\" routerLink=\"update-achievements/{{element.Id}}\"\r\n              title=\"Update\">\r\n              <mat-icon>edit</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess && catCode\"\r\n              routerLink=\"/advertisement/update-e-booklet/{{element.Id}}\" title=\"Update\">\r\n              <mat-icon>edit</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"this.Permission.Custome1PageAccess\" routerLink=\"update-achievements-comment/{{element.Id}}\"\r\n              title=\"CMO Comments\">\r\n              <mat-icon>comments</mat-icon>\r\n\r\n            </a>\r\n\r\n\r\n          </td>\r\n        </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n      </table>\r\n    </div>\r\n\r\n    <mat-paginator #paginator [length]=\"totalRecords\" style=\"display: none;\"\r\n      [pageSize]=\"searchModel.indexmodel.PageSize\" [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\"\r\n      (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n\r\n    <mat-paginator *ngIf=\"model?.length>0\" #paginator [length]=\"totalRecords\"\r\n      [pageSize]=\"searchModel.indexmodel.PageSize\" [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\"\r\n      (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n\r\n    <!-- <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[10, 20, 50,100,101]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons\r\n      *ngIf=\"totalRecords!=0\">\r\n    </mat-paginator> -->\r\n  </div>\r\n\r\n\r\n\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"fromGroup\" (ngSubmit)=\"saveClick();\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Department <span style=\"color: red\">*</span></mat-label>\r\n        <mat-select name=\"DepartmentCode\" [(ngModel)]=\"model.DepartmentCode\" formControlName=\"DepartmentCode\"\r\n          (selectionChange)=\"getFilterdDDL(model.DepartmentCode,model.AchievementCategoryCode); Getcategorybydepartmentcode($event.value)\"\r\n          [disabled]=\"isCMOCommentVisible\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.DepartmentCode}}\" *ngFor=\"let k of ddlDepartment\">{{k.DepartmentTitle}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('DepartmentCode').hasError('required') && fromGroup.get('DepartmentCode').touched)\">\r\n        Department is <strong>Required!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Category <span style=\"color: red\">*</span></mat-label>\r\n        <mat-select name=\"AchievementCategoryCode\" [(ngModel)]=\"model.AchievementCategoryCode\"\r\n          formControlName=\"AchievementCategoryCode\" (selectionChange)=\"getDataByCategoryCode($event.value)\"\r\n          [disabled]=\"catCode\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of ddlAchievementCategory\">{{k.Text}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <a class=\"achievementCategory-help\" *ngIf=\"achievementCategory?.HelpFileURL\"\r\n        (click)=\"OpenFile(achievementCategory?.HelpFileURL)\" href=\"JavaScript:Void(0);\">\r\n        Help File of {{achievementCategory?.Title}} <mat-icon>picture_as_pdf</mat-icon>\r\n      </a>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('AchievementCategoryCode').hasError('required') && fromGroup.get('AchievementCategoryCode').touched)\">\r\n        Category is <strong>Required!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Sub Category</mat-label>\r\n        <mat-select name=\"AchievementSubCategoryCode\" [(ngModel)]=\"model.AchievementSubCategoryCode\"\r\n          formControlName=\"AchievementSubCategoryCode\" [disabled]=\"isCMOCommentVisible\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAchievementSubCategory\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('AchievementSubCategoryCode').hasError('required') && fromGroup.get('AchievementSubCategoryCode').touched)\">\r\n        Sub-Category is <strong>Required!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12 mat-form-field-wrapper\" style=\"display: none;\">\r\n      <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n        <mat-label>Show in Home Screen </mat-label>\r\n        <mat-checkbox [(ngModel)]=\"model.IsVisible\" Id=\"IsVisible\" formControlName=\"IsVisible\" #IsVisible> Show in Home\r\n          Screen</mat-checkbox>\r\n      </section>\r\n    </div>\r\n\r\n    <div class=\"col l12 xl12 m12 s12\" *ngIf=\"false\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>General Entry <span style=\"color: red\">*</span></mat-label>\r\n        <textarea matInput placeholder=\"Achievement\" [(ngModel)]=\"model.Achievement\" maxlength=\"4000\" #Achievement\r\n          formControlName=\"Achievement\" class=\"rw-5\" [readonly]=\"isCMOCommentVisible\"></textarea>\r\n        <mat-hint class=\"pull-right\">{{Achievement.value.length}}/4000</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"(fromGroup.get('Achievement').hasError('required') && fromGroup.get('Achievement').touched)\">\r\n        General Entry <strong>required!</strong>\r\n      </mat-error>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('Achievement').hasError('maxlength') && fromGroup.get('Achievement').touched) || (fromGroup.get('Achievement').hasError('maxlength'))\">\r\n        General Entry Max char limit is <strong>4000!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label *ngIf=\"!achievementCategory?.LabelAchievementHindi\">General Entry (Hindi)<span\r\n            style=\"color: red\">*</span></mat-label>\r\n        <mat-label *ngIf=\"achievementCategory?.LabelAchievementHindi\">\r\n          {{achievementCategory?.LabelAchievementHindi}}<span style=\"color: red\">*</span></mat-label>\r\n        <textarea matInput placeholder=\"{{achievementCategory?.LabelAchievementHindi}}\"\r\n          [(ngModel)]=\"model.AchievementHindi\" #AchievementHindi maxlength=\"4000\" formControlName=\"AchievementHindi\"\r\n          class=\"rw-5\" [readonly]=\"isCMOCommentVisible\"></textarea>\r\n        <mat-hint>{{AchievementHindi.value.length}}/4000</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('AchievementHindi').hasError('required') && fromGroup.get('AchievementHindi').touched)\">\r\n        {{achievementCategory?.LabelAchievementHindi}}<strong>required!</strong>\r\n      </mat-error>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('AchievementHindi').hasError('maxlength') && fromGroup.get('AchievementHindi').touched) || (fromGroup.get('AchievementHindi').hasError('maxlength'))\">\r\n        {{achievementCategory?.LabelAchievementHindi}} Max char limit is <strong>4000!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\" *ngIf=\"achievementCategory?.IsVisibleDate\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label *ngIf=\"!achievementCategory?.LabelDate\">Date </mat-label>\r\n        <mat-label *ngIf=\"achievementCategory?.LabelDate\">{{achievementCategory?.LabelDate}} </mat-label>\r\n        <input matInput [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly placeholder=\">Date \" md-mode=\"month\"\r\n          [(ngModel)]=\"model.AchievementDate\" #AchievementDate formControlName=\"AchievementDate\"\r\n          [disabled]=\"isCMOCommentVisible\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" [disabled]=\"isCMOCommentVisible\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"fromGroup.get('AchievementDate').hasError('required') && (fromGroup.get('AchievementDate').touched && fromGroup.get('AchievementDate').invalid) \">\r\n        {{achievementCategory?.LabelDate}} is <strong>required!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label *ngIf=\"!achievementCategory?.LabelURL\">URL</mat-label>\r\n        <mat-label *ngIf=\"achievementCategory?.LabelURL\">{{achievementCategory?.LabelURL}}</mat-label>\r\n        <input matInput placeholder=\"achievementCategory?.LabelURL\" name=\"Url\" [(ngModel)]=\"model.Url\" maxlength=\"1000\"\r\n          formControlName=\"Url\" #Url [readonly]=\"isCMOCommentVisible\" />\r\n        <mat-hint>{{Url.value.length}}/1000</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"(fromGroup.get('Url').hasError('required') && fromGroup.get('Url').touched)\">\r\n        {{achievementCategory?.LabelURL}} is <strong>required!</strong>\r\n      </mat-error>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('Url').hasError('maxlength') && fromGroup.get('Url').touched) || (fromGroup.get('Url').hasError('maxlength'))\">\r\n        {{achievementCategory?.LabelURL}} Max char limit is <strong>200!</strong>\r\n      </mat-error>\r\n      <mat-error *ngIf=\"(fromGroup.get('Url').touched && fromGroup.get('Url').hasError('invalidUrl'))\">\r\n        {{achievementCategory?.LabelURL}} is <strong>not valid!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Display Order <span style=\"color: red\">*</span></mat-label>\r\n        <input matInput placeholder=\"Priority (Number Only)\" [(ngModel)]=\"model.Priority\" #Priority maxlength=\"3\"\r\n          [readonly]=\"isCMOCommentVisible\" formControlName=\"Priority\" (keypress)=\"numberOnly($event)\" />\r\n        <mat-hint>{{Priority.value.length}}/3</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"(fromGroup.get('Priority').hasError('required') && fromGroup.get('Priority').touched)\">\r\n        Display Order <strong>required!</strong>\r\n      </mat-error>\r\n      <mat-error *ngIf=\"(fromGroup.get('Priority').hasError('maxlength') && fromGroup.get('Priority').touched)\">\r\n        Display Order field Max char limit is <strong>3!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label *ngIf=\"!achievementCategory?.LabelAddPDF\">Add Pdf File </label>\r\n        <label *ngIf=\"achievementCategory?.LabelAddPDF\">{{achievementCategory?.LabelAddPDF}} </label>\r\n        <input type=\"file\" id=\"PdfFIleName\" formControlName=\"PdfFIleName\" (change)=\"handleFileInput($event)\"\r\n          accept=\"application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint\">\r\n\r\n        <mat-error *ngIf=\"(fromGroup.get('PdfFIleName').hasError('required') && fromGroup.get('PdfFIleName').touched)\">\r\n          {{achievementCategory?.LabelAddPDF?achievementCategory?.LabelAddPDF:'Add Pdf File'}} is\r\n          <strong>required!</strong>\r\n        </mat-error>\r\n      </div>\r\n      <ul class=\"image-list\" *ngIf=\"model.PdfFIleName!=undefined\">\r\n        <li> <a href=\"Javascript:void(0)\" (click)=\"downloadFile(model?.PdfFIleName,'Attachment')\"\r\n            *ngIf=\"model.PdfFIleName\"> Click here for pdf\r\n          </a>\r\n        </li>\r\n      </ul>\r\n      <mat-error *ngIf=\"this.fileValidationMsg.length >0\">{{fileValidationMsg}}</mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l12 xl12 m12 s12\" *ngIf=\"false\">\r\n      <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n        <mat-label>Description</mat-label>\r\n        <textarea matInput placeholder=\"Description\" [(ngModel)]=\"model.Description\" #Description maxlength=\"4000\"\r\n          formControlName=\"Description\" rows=\"7\" [readonly]=\"isCMOCommentVisible\"></textarea>\r\n        <mat-hint>{{Description.value.length}}/4000</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"(fromGroup.get('Description').hasError('maxlength') && fromGroup.get('Description').touched)\">\r\n        Description field Max char limit is <strong>4000!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l12 xl12 m12 s12\" *ngIf=\"achievementCategory?.IsVisibleDescriptionHindi\">\r\n      <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n        <mat-label *ngIf=\"!achievementCategory?.LabelDescriptionHindi\">Description Hindi </mat-label>\r\n        <mat-label *ngIf=\"achievementCategory?.LabelDescriptionHindi\">{{achievementCategory?.LabelDescriptionHindi}}\r\n        </mat-label>\r\n        <textarea matInput placeholder=\"{{achievementCategory?.LabelDescriptionHindi}}\"\r\n          [(ngModel)]=\"model.DescriptionHindi\" #DescriptionHindi maxlength=\"4000\" formControlName=\"DescriptionHindi\"\r\n          rows=\"7\" [readonly]=\"isCMOCommentVisible\"></textarea>\r\n        <mat-hint>{{DescriptionHindi.value.length}}/4000</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('DescriptionHindi').hasError('maxlength') && fromGroup.get('DescriptionHindi').touched)\">\r\n        {{achievementCategory?.LabelDescriptionHindi}} field Max char limit is <strong>4000!</strong>\r\n      </mat-error>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('DescriptionHindi').hasError('required') && fromGroup.get('DescriptionHindi').touched)\">\r\n        {{achievementCategory?.LabelDescriptionHindi}} is <strong>required!</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n      <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n        <mat-label>KeyWord</mat-label>\r\n        <textarea matInput placeholder=\"KeyWord\" [(ngModel)]=\"model.KeyWord\" #KeyWord maxlength=\"4000\" minlength=\"50\"\r\n          formControlName=\"KeyWord\" rows=\"2\" [readonly]=\"isCMOCommentVisible\"></textarea>\r\n        <mat-hint>{{KeyWord.value.length}}/4000</mat-hint>\r\n      </mat-form-field>\r\n\r\n      <mat-error *ngIf=\"(fromGroup.get('KeyWord').hasError('minlength') && fromGroup.get('KeyWord').touched)\">\r\n        KeyWord min char limit is <strong>50!</strong>\r\n      </mat-error>\r\n      <mat-error *ngIf=\"(fromGroup.get('KeyWord').hasError('required') && fromGroup.get('KeyWord').touched)\">\r\n        KeyWord is <strong>required!</strong>\r\n      </mat-error>\r\n\r\n    </div>\r\n\r\n    <div class=\"col l12 xl12 m12 s12\" *ngIf=\"isCMOCommentVisible\">\r\n      <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n        <mat-label>CMO Comments</mat-label>\r\n        <textarea matInput placeholder=\"CMOComments\" [(ngModel)]=\"model.CMOComments\" #CMOComments maxlength=\"4000\"\r\n          minlength=\"50\" formControlName=\"CMOComments\" rows=\"7\"></textarea>\r\n        <mat-hint>{{CMOComments.value.length}}/4000</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"(fromGroup.get('CMOComments').hasError('maxlength') && fromGroup.get('CMOComments').touched) || (fromGroup.get('Url').hasError('maxlength'))\">\r\n        CMO Comments min char <strong>50</strong>\r\n        is required </mat-error>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\" *ngIf=\"achievementCategory?.IsShowBeneficiaryCategory\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Benificiary Category </mat-label>\r\n        <mat-select name=\"BenificiaryList\" formControlName=\"BenificiaryList\" [(ngModel)]=\"model.BenificiaryList\"\r\n          multiple>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlBeneficiaryCategory\">{{ k.Text }}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l12 m12 s12 \">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label *ngIf=\"!achievementCategory?.LabelAttachImage\">Attach Images</label>\r\n        <label *ngIf=\"achievementCategory?.LabelAttachImage\">{{achievementCategory?.LabelAttachImage}}</label>\r\n        <input type=\"file\" id=\"ImageFiles\" name=\"ImageFiles\" formControlName=\"ImageFiles\"\r\n          (change)=\"handleImageFileInput($event.target.files)\" accept=\"image/*\" multiple>\r\n        <mat-error *ngIf=\"(fromGroup.get('ImageFiles').hasError('required') && fromGroup.get('ImageFiles').touched)\">\r\n          {{achievementCategory?.LabelAttachImage?achievementCategory?.LabelAttachImage:'Add Pdf File'}} is\r\n          <strong>required!</strong>\r\n        </mat-error>\r\n        <!-- (change)=\"handleImageFileInput($event.target.files)\" -->\r\n        <!-- (change)=\"checkImages($event)\" -->\r\n      </div>\r\n      <ul class=\"image-list\">\r\n        <li *ngFor=\"let item of model.ImageFiles; let i = index;\">\r\n          <div> <img [src]=\"item\" /> <a title=\"Remove\" (click)=\"RemoveImageFile(i)\">\r\n              <mat-icon>delete</mat-icon>\r\n            </a></div>\r\n        </li>\r\n      </ul>\r\n      <mat-error *ngIf=\"model?.AchievementCategoryCode==25\" style=\"margin: 0px;position: relative;\">\r\n        Note:- For an event, Upload all images together i.e. in one entry\r\n      </mat-error>\r\n      <mat-error *ngIf=\"ImagefileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">\r\n        {{ImagefileValidationMsg}}\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l12 m12 s12 mb-20\" *ngIf=\"achievementCategory?.IsShowConnectWithCMIS\">\r\n      <section class=\"mat-typography\">\r\n        <h2 class=\"color-blue mb-0\">Linked with (Budget/CM Announcement/CM Directions/Jan Ghoshna Patra)</h2>\r\n      </section>\r\n    </div>\r\n    <div class=\"row highlight_view btn_add_box\" *ngIf=\"achievementCategory?.IsShowConnectWithCMIS\">\r\n\r\n      <div class=\"col l4 x8 m4 s12\">\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Module</mat-label>\r\n          <mat-select formControlName=\"ModuleIdConnectWithCMIS\" #ModuleIdConnectWithCMIS\r\n            [(ngModel)]=\"connectWithCMISModel.ModuleId\">\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderModuleName\">{{item.Text}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n      </div>\r\n      <div class=\"col l4 x8 m4 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Year </mat-label>\r\n\r\n          <mat-select formControlName=\"YearValueConnectWithCMIS\" #YearValueConnectWithCMIS\r\n            [(ngModel)]=\"connectWithCMISModel.YearValue\">\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlCMISBudgetYear\">\r\n              {{item.Text}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n      </div>\r\n      <div class=\"col l4 x8 m4 s12  pos_relative\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Department</mat-label>\r\n          <mat-select formControlName=\"DepartmentIdConnectWithCMIS\" #DepartmentIdConnectWithCMIS\r\n            [(ngModel)]=\"connectWithCMISModel.DepartmentId\">\r\n            <mat-option>--Select--</mat-option>\r\n\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlDepartmentForCMISReport\">\r\n              {{item.Text}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n        <div class=\"d-inline\" *ngIf=\"model?.ConnectWithCMIS?.length <5\"><a class=\"btn_add\" href=\"javascript:void(0)\"\r\n            (click)=\"AddMoreItems()\">\r\n            <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">add</mat-icon>\r\n          </a></div>\r\n\r\n      </div>\r\n\r\n      <div class=\"col l12 m12 s12\">\r\n        <table class=\"table new_table table_border mb-20\" *ngIf=\"model?.ConnectWithCMIS?.length>0\">\r\n          <thead>\r\n            <tr>\r\n              <th scope=\"col\">#</th>\r\n              <th scope=\"col\" colspan=\"3\">Details</th>\r\n              <th scope=\"col\" width=\"100\">Action</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let item of model?.ConnectWithCMIS; let i = index\" [attr.data-index]=\"i\">\r\n              <th scope=\"row\">{{i+1}}</th>\r\n              <td colspan=\"3\">\r\n                <div class=\"footer-info-bx\">\r\n\r\n                  <div class=\"d-inline\"> <strong>Module: </strong><span\r\n                      *ngIf=\"item?.ModuleId\">{{moduleNameItems[item?.ModuleId]}}</span><span\r\n                      *ngIf=\"!item?.ModuleId\">--</span> </div>\r\n                  <div class=\"d-inline\"> <strong>Year: </strong><span\r\n                      *ngIf=\"item?.YearValue\">{{yearItems[item?.YearValue]}}</span><span\r\n                      *ngIf=\"!item?.YearValue\">--</span> </div>\r\n                  <div class=\"d-inline\"> <strong>Department: </strong><span\r\n                      *ngIf=\"item?.DepartmentId\">{{departmentItems[item?.DepartmentId]}}</span><span\r\n                      *ngIf=\"!item?.DepartmentId\">--</span> </div>\r\n\r\n                </div>\r\n                <div class=\"footer-info-bx\" *ngIf=\"item.ConnectWithCMISResult\">\r\n\r\n                  <div class=\"d-inline\" *ngIf=\"item.ConnectWithCMISResult.prj_description\"><strong>Description:</strong>\r\n                    {{item.ConnectWithCMISResult.prj_description}}</div>\r\n\r\n                </div>\r\n              </td>\r\n              <td class=\"action_icon\"><a class=\"del-icon\" href=\"javascript:void(0)\"\r\n                  (click)=\"RemoveConnectWithCMISClick(i)\">\r\n                  <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">delete</mat-icon>\r\n                </a>\r\n                <a class=\"get-icon\" href=\"javascript:void(0)\"\r\n                  (click)=\"GetConnectWithCMISResult(item.ModuleName,item.DepartmentId,item.DepartmentName,item.YearText,i)\">Budget\r\n                  Details</a>\r\n              </td>\r\n\r\n            </tr>\r\n\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col l12 x8 m4 s12 clearfix\">\r\n      <button type=\"submit\" mat-button class=\"btn-submit\">Submit</button>\r\n    </div>\r\n  </div>\r\n</form>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n  <div class=\"table-responsive w-100\">\r\n    <table class=\"table custom-data-table\">\r\n      <tbody>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Department :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.Department\"> {{detailModel?.Department}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.Department\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Category :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AchievementCategory\">\r\n                {{detailModel?.AchievementCategory}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AchievementCategory\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Sub Category :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AchievementSubCategory\">\r\n                {{detailModel?.AchievementSubCategory}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AchievementSubCategory\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Summary :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.Achievement\">{{detailModel?.Achievement}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.Achievement\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Important Decisions (Details) :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AchievementHindi\">\r\n                {{detailModel?.AchievementHindi}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AchievementHindi\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\"> Date:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AchievementDate\">\r\n                {{detailModel?.AchievementDate | date: 'dd/MM/yyyy'}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AchievementDate\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n\r\n\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Display Order :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.Priority\"> {{detailModel?.Priority}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.Priority\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Url :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.Url\"> {{detailModel?.Url}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.Url\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Pdf File :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <a href=\"Javascript:void(0)\" (click)=\"downloadMyFile(detailModel.PdfFIleName)\"\r\n                *ngIf=\"detailModel?.PdfFIleName\"> Click here for pdf </a>\r\n              <!-- <h3 class=\"color-grey\" *ngIf=\"detailModel?.PdfFIleName\">{{detailModel?.PdfUrl }}</h3> -->\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.PdfFIleName\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Description :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.Description\">{{detailModel?.Description}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.Description\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Description Hindi:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.DescriptionHindi\">\r\n                {{detailModel?.DescriptionHindi}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.DescriptionHindi\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Keyword :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.KeyWord\"> {{detailModel?.KeyWord}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.KeyWord\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">CMO Comments :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.CMOComments\"> {{detailModel?.CMOComments}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CMOComments\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n\r\n\r\n        <tr *ngIf=\"(detailModel?.ImageFiles||null)!=null && detailModel?.ImageFiles.length>0\">\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Images:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <ul class=\"image-list\">\r\n                <li *ngFor=\"let item of detailModel.ImageFiles;\">\r\n\r\n                  <div> <img [src]=\"item\" /> </div>\r\n\r\n                </li>\r\n              </ul>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\"> Show in Home Screen:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.IsVisible\">\r\n                Yes</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.IsVisible\">No</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/add-advertisement/add-advertisement.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/add-advertisement/add-advertisement.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n  <div class=\"row\">\r\n      <div class=\"col l12 m12 s12\">\r\n          <span style=\"color: red\">{{fileSizeValidationMsg}}</span>\r\n      </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Category </mat-label>\r\n          <mat-select name=\"Category\" [(ngModel)]=\"model.Category\">\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdvCategory\">{{k.Text}}</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Sub Category </mat-label>\r\n        <mat-select name=\"SubCategory\" [(ngModel)]=\"model.SubCategory\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdvSubCategory\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Url</mat-label>\r\n        <input matInput placeholder=\"Url\" [(ngModel)]=\"model.SubjectHin\" />\r\n        <!-- <textarea matInput placeholder=\"Url\" [(ngModel)]=\"model.SubjectHin\"></textarea> -->\r\n      </mat-form-field>\r\n\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Subject (in English) </mat-label>\r\n\r\n        <textarea matInput placeholder=\"Subject English\" [(ngModel)]=\"model.SubjectEng\"></textarea>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Start Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly\r\n          placeholder=\"Start Date\" name=\"AdvDate\" id=\"AdvDate\" [(ngModel)]=\"model.AdvDate\" [max]=\"minDate\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Admin Department </mat-label>\r\n        <mat-select name=\"AdminDepartment\" [(ngModel)]=\"model.AdminDepartment\" multiple>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdminDepartment\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>District </mat-label>\r\n        <mat-select name=\"District\" [(ngModel)]=\"model.Districts\" multiple>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlDistrict\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Beneficiary Category </mat-label>\r\n        <mat-select name=\"BeneficiaryCategories\" [(ngModel)]=\"model.BeneficiaryCategories\" multiple>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlBeneficiaryCategory\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Expiry Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly\r\n          placeholder=\"Choose a date\" name=\"ExpiryDate\" id=\"ExpiryDate\" [(ngModel)]=\"model.ExpiryDate\" [min]=\"minDate\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label>Upload Image</label>\r\n        <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event)\">\r\n        <img *ngIf=\"model.DocumentUrl\" [src]=\"model.DocumentUrl\" height=\"100px\" width=\"100px\"/>\r\n        <a title=\"Remove\" (click)=\"RemoveImage();\">\r\n          <mat-icon *ngIf=\"model?.DocumentUrl?.length>0\">delete</mat-icon></a>\r\n      </div>\r\n      <mat-error *ngIf=\"fileValidationMsg?.length>0\">{{fileValidationMsg}}</mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label>Add Pdf File </label>\r\n        <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event,true)\" accept=\"application/pdf\">\r\n        </div>\r\n      <ul class=\"image-list\">\r\n        <li> <a href=\"{{model.PdfUrl}}\" (click)=\"downloadMyFile(model.PdfUrl)\" *ngIf=\"model.PdfUrl\" target=\"_blank\" > Click here for pdf </a>\r\n          <a title=\"Remove\" (click)=\"RemovePdf();\">\r\n            <mat-icon *ngIf=\"model?.PdfUrl?.length>0\">delete</mat-icon></a>\r\n        </li>\r\n      </ul>\r\n      <mat-error *ngIf=\"fileValidationMsg1?.length>0\">{{fileValidationMsg1}}</mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l12 x8 m4 s12 clearfix\">\r\n      <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Add</button>\r\n    </div>\r\n\r\n  </div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.html":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.html ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\">\r\n\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Expired\">\r\n        <th mat-header-cell *matHeaderCellDef>Is Expired</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          <span *ngIf=\"IsExpired(element.ExpiryDate)\"> Expired </span>\r\n          <span *ngIf=\"!IsExpired(element.ExpiryDate)\">Not Expired </span>\r\n        </td>\r\n      </ng-container>\r\n      <!-- <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n          <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n        </ng-container> -->\r\n\r\n        <ng-container matColumnDef=\"DocumentUrl\">\r\n            <th mat-header-cell *matHeaderCellDef>Advertisement Image</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n\r\n\r\n              <a (click)=\"downloadPdf(element.DocumentUrl)\" href=\"JavaScript:Void(0);\">\r\n                  <img [src]=\"element.DocumentUrl\" height=\"50px\" width=\"50px\"/>\r\n                </a>\r\n            </td>\r\n          </ng-container>\r\n\r\n\r\n      <ng-container matColumnDef=\"SubjectEng\">\r\n        <th mat-header-cell *matHeaderCellDef>Subject English</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          {{element.SubjectEng}}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"RequestedStatus\" *ngIf=\"isApprovalUser\">\r\n        <th mat-header-cell *matHeaderCellDef>Requested Status</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n\r\n          <span *ngIf=\"element.RequestedStatus\" style=\"color: rgb(157, 255, 0)\"> Requested </span>\r\n          <span *ngIf=\"!element.RequestedStatus\" style=\"color: rgb(255, 38, 0)\">Pending </span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsUploadedStatus\">\r\n        <th mat-header-cell *matHeaderCellDef>Uploaded Status</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n\r\n          <span *ngIf=\"element.IsUploaded\" style=\"color: rgb(15, 114, 12)\"> {{element.IsUploadedStatus}} </span>\r\n          <span *ngIf=\"!element.IsUploaded\" style=\"color: rgba(223, 219, 20, 0.801)\"> {{element.IsUploadedStatus}}\r\n          </span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsApprovedStatus\" *ngIf=\"isApprovalUser\">\r\n        <th mat-header-cell *matHeaderCellDef>Approved Status</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n\r\n\r\n          <span *ngIf=\"element.IsRejected\" style=\"color: rgb(253, 37, 22)\"> {{element.IsApprovedStatus}} </span>\r\n          <span *ngIf=\"element.IsApproved\" style=\"color: rgb(16, 36, 212)\"> {{element.IsApprovedStatus}} </span>\r\n          <span *ngIf=\"!element.IsApproved && !element.IsRejected\" style=\"color: rgb(191, 194, 11)\">\r\n            {{element.IsApprovedStatus}} </span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a routerLink=\"/advertisement/redesignrequestbyuser/{{group.AdvId}},{{group.RedesignPlatformUserLookupId}}\"\r\n            *ngIf=\"group.RedesignPlatformUserLookupId && !IsExpired(group.ExpiryDate)\" title=\"Upload New Design\">\r\n            <mat-icon>file_copy</mat-icon>\r\n          </a>\r\n          <a title=\"Set Uploaded\" (click)=\"UploadedClick(group.NotificationLookupId)\"\r\n            *ngIf=\"(!group.RedesignPlatformUserLookupId || group.IsApproved) && !group.IsUploaded && !IsExpired(group.ExpiryDate)\">\r\n            <mat-icon>done_outline</mat-icon>\r\n          </a>\r\n          <a routerLink=\"/advertisement/downloadadvertisement/{{group.AdvId}}\" title=\"Download Advertisement\"\r\n            *ngIf=\"(!group.RedesignPlatformUserLookupId || group.IsApproved) && !IsExpired(group.ExpiryDate)\">\r\n\r\n            <mat-icon>arrow_downward</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5,10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n    </mat-paginator>\r\n\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.html":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.html ***!
  \************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n    <p>Advertisement Raw Data</p>\r\n\r\n    <button mat-button (click)=\"onNoClick()\">\r\n        <mat-icon>close</mat-icon>\r\n    </button>\r\n\r\n</div>\r\n\r\n<div class=\"col l12 s12\">\r\n\r\n    <div mat-dialog-content>\r\n        <ngx-json-viewer [json]=\"rawData\"></ngx-json-viewer>\r\n    </div>\r\n    <div mat-dialog-actions>\r\n        <div class=\"row\">\r\n            <div class=\"col s12 right-align\">\r\n                <button mat-button class=\"btn-default\" (click)=\"onNoClick()\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.html":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.html ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n    <div class=\"col l12 m12 s12\">\r\n    <h3 class=\"redesignrequestbyuser_title\">Original Design</h3>\r\n    <div class=\"table-responsive w-100\">\r\n    <table class=\"table custom-data-table mb-20\" *ngIf=\"detailModel\">\r\n      <tbody>\r\n\r\n\r\n        <tr>\r\n\r\n          <td width=\"15%\">\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Image : </h2>\r\n            </section>\r\n          </td>\r\n          <td width=\"30%\">\r\n            <section class=\"mat-typography\">\r\n\r\n              <div class=\"color-grey\" *ngIf=\"detailModel?.DocumentUrl\"> <img [src]=\"detailModel?.DocumentUrl\"\r\n                  height=\"100px\" width=\"100px\" /></div>\r\n              <div class=\"color-grey\" *ngIf=\"!detailModel?.DocumentUrl\"> <img\r\n                  src=\"../../../../../assets/images/noimage.jpeg\" height=\"100px\" width=\"100px\" /></div>\r\n\r\n            </section>\r\n          </td>\r\n          <td width=\"15%\">\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Subject English :</h2>\r\n            </section>\r\n          </td>\r\n          <td width=\"30%\">\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectEng\">{{detailModel?.SubjectEng}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectEng\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Subject Hindi :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectHin\">{{detailModel?.SubjectHin}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectHin\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Advertisement Date :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdvDate\">{{detailModel?.AdvDate | date: 'dd/MM/yyyy'}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdvDate\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Category :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.CategoryName\"> {{detailModel?.CategoryName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CategoryName\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Sub Category :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubCategoryName\"> {{detailModel?.SubCategoryName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubCategoryName\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Created Date :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.CreateDate\">{{detailModel?.CreateDate | date: 'dd/MM/yyyy'}}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CreateDate\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Admin Department :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdminDepartmentsName\">{{detailModel?.AdminDepartmentsName}}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdminDepartmentsName\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Beneficiary Categories Name :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.BeneficiaryCategoriesName\">\r\n                {{detailModel?.BeneficiaryCategoriesName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.BeneficiaryCategoriesName\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">District Name :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.DistrictNames\">{{detailModel?.DistrictNames}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.DistrictNames\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Notification Period :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.NotificationPeriod\">{{detailModel?.NotificationPeriod}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.NotificationPeriod\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Expiry Date :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.ExpiryDate\">{{detailModel?.ExpiryDate | date: 'dd/MM/yyyy'}}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.ExpiryDate\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"OpenRawData()\">Get Raw Data</button>\r\n  </div>\r\n\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/advertisement.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/advertisement.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\">\r\n\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n            {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n    </ng-container>\r\n\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"ModifiedDate\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Entry Date </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n            {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n          </td>\r\n        </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Status\">\r\n        <th mat-header-cell *matHeaderCellDef> Status </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n\r\n          <div  *ngIf=\"!group.IsActive && !IsExpired(group.ExpiryDate) && this.Permission.UpdatePageAccess && !group.IsLock\" >\r\n            <button mat-button class=\"btn-submit \" style=\" background-color: #ff7373;color: black;\" (click)=\"AdverisementStatus(group.Id);\">Not Publish</button>\r\n          </div>\r\n          <div  *ngIf=\"!group.IsActive && !IsExpired(group.ExpiryDate) && !this.Permission.UpdatePageAccess\" >\r\n            <span><button mat-button class=\"btn-submit\" (click)=\"AdverisementStatus(group.Id);\">Not Publish</button></span>\r\n          </div>\r\n          <div  *ngIf=\"!group.IsActive && !IsExpired(group.ExpiryDate) && this.Permission.UpdatePageAccess && group.IsLock\" >\r\n              <button mat-button class=\"btn-submit\" (click)=\"AdverisementStatus(group.Id);\">Not Publish</button>\r\n          </div>\r\n\r\n       <span *ngIf=\"group.IsActive\"> <button mat-button class=\"btn-submit\"  (click)=\"AdverisementStatus(group.Id);\">Published</button> </span>\r\n       <span *ngIf=\"!group.IsActive && IsExpired(group.ExpiryDate)\"><button mat-button class=\"btn-submit\" style=\" background-color: #ff7373;color: black;\" (click)=\"AdverisementStatus(group.Id);\">Not Published</button></span>\r\n\r\n       <span *ngIf=\"IsExpired(group.ExpiryDate)\"> expired </span>\r\n\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"Lock\">\r\n\r\n          <th mat-header-cell *matHeaderCellDef>Lock Record</th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n\r\n            <div *ngIf=\"!this.Permission.UpdatePageAccess\">\r\n              <ng-container>\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsLock\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsLock\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n\r\n             </ng-container>\r\n\r\n            </div>\r\n            <div *ngIf=\"this.Permission.UpdatePageAccess\" >\r\n              <ng-container> <a href=\"JavaScript:Void(0);\" (click)=\"lockClick(group.Id)\">\r\n\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsLock\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsLock\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a> </ng-container>\r\n            </div>\r\n          </td>\r\n        </ng-container>\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\" >\r\n            <a class=\"btn_delete\" *ngIf=\"this.Permission.DeletePageAccess\"  routerLink=\"delete/{{group.Id}}\" title=\"Delete\"  class=\"btn_delete\">\r\n              <mat-icon>delete</mat-icon>\r\n            </a>\r\n\r\n            <a class=\"btn_edit\" *ngIf=\"this.Permission.UpdatePageAccess\"  routerLink=\"update/{{group.Id}}\" title=\"Edit\"  class=\"btn_edit\" >\r\n              <mat-icon>edit</mat-icon>\r\n            </a>\r\n\r\n          <a class=\"btn_list\" *ngIf=\"this.Permission.DetailPageAccess\" routerLink=\"detail/{{group.Id}}\" title=\"Detail\"  class=\"btn_list\">\r\n            <mat-icon>list</mat-icon>\r\n          </a>\r\n\r\n\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\" [pageSizeOptions]=\"[5,10, 20, 50,totalRecords]\"\r\n    (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n  </mat-paginator>\r\n\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.html ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20 mb-0\">\r\n    <div class=\"col l6 xl4 m4 s6\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>From Date</mat-label>\r\n            <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\"\r\n                [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker1></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>To Date</mat-label>\r\n            <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\"\r\n                [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n        <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\">Clear Search</button>\r\n    </div>\r\n</div>\r\n\r\n<div style=\"margin-left: 96%;\">\r\n    <button (click)=\"print();\" class=\"btn btn_note btn_orange\" style=\"margin-bottom: 10px;line-height: 1px;\">\r\n        <mat-icon>print</mat-icon>\r\n    </button>\r\n</div>\r\n\r\n<div id=\"test\">\r\n    <div class=\"row\">\r\n        <div class=\"col l12 s12 p-0\">\r\n            <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\"\r\n                *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n                <ng-container matColumnDef=\"index\">\r\n                    <th mat-header-cell *matHeaderCellDef>S.No</th>\r\n                    <td mat-cell *matCellDef=\"let element; let i = index\">\r\n                        {{ (i + 1) }}\r\n                    </td>\r\n                    <td mat-footer-cell *matFooterCellDef> </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"CreatedDate\">\r\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header> WebSite URL</th>\r\n                    <td mat-cell *matCellDef=\"let transaction\"> {{transaction.CreatedDate | date: 'dd-MM-yyyy'}} </td>\r\n                    <td mat-footer-cell *matFooterCellDef> Total </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"VisitorCount\">\r\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Website Popup Counter</th>\r\n                    <td mat-cell *matCellDef=\"let transaction\"> {{transaction.VisitorCount}} </td>\r\n                    <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n                </ng-container>\r\n\r\n                <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n                <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n                <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n            </table>\r\n\r\n            <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n    <div class=\"table-responsive w-100\">\r\n        <table class=\"table custom-data-table\">\r\n            <tbody>\r\n                <tr>\r\n                    <td width=\"20%\">\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Image :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td width=\"80%\">\r\n                        <section class=\"mat-typography\">\r\n                            <div class=\"color-grey\" *ngIf=\"detailModel?.DocumentUrl\"> <img [src]=\"detailModel?.DocumentUrl\" height=\"100px\" width=\"100px\" /></div>\r\n                            <div class=\"color-grey\" *ngIf=\"!detailModel?.DocumentUrl\"> <img src=\"../../../../../assets/images/noimage.jpeg\" height=\"100px\" width=\"100px\" /></div>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Subject English :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectEng\">{{detailModel?.SubjectEng}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectEng\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Subject Hindi :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectHin\">{{detailModel?.SubjectHin}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectHin\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Advertisement Date :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdvDate\">{{detailModel?.AdvDate | date: 'dd/MM/yyyy'}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdvDate\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Category :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.CategoryName\"> {{detailModel?.CategoryName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CategoryName\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Sub Category :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubCategoryName\"> {{detailModel?.SubCategoryName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubCategoryName\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Created Date :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.CreateDate\">{{detailModel?.CreateDate | date: 'dd/MM/yyyy'}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CreateDate\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Admin Department :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdminDepartmentsName\">{{detailModel?.AdminDepartmentsName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdminDepartmentsName\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\"> Beneficiary Categories Name :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.BeneficiaryCategoriesName\">{{detailModel?.BeneficiaryCategoriesName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.BeneficiaryCategoriesName\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">District Name :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.DistrictNames\">{{detailModel?.DistrictNames}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.DistrictNames\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Notification Period :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.NotificationPeriod\">{{detailModel?.NotificationPeriod}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.NotificationPeriod\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Expiry Date :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.ExpiryDate\">{{detailModel?.ExpiryDate | date: 'dd/MM/yyyy'}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.ExpiryDate\">--</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n\r\n\r\n                <div style=\"margin-top: 10px;\">\r\n                    <div class=\"col\">\r\n                        <button mat-button class=\"btn-submit\" (click)=\"OnDelete();\">Delete</button>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                        <button mat-button class=\"btn-submit\" routerLink=\"/advertisement\">\r\n                                Cancel\r\n                              </button>\r\n                    </div>\r\n                </div>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n              <div class=\"table-responsive w-100\">\r\n                <table class=\"table custom-data-table\">\r\n                  <tbody>\r\n                      <tr>\r\n                          <td width=\"20%\"><section class=\"mat-typography\">\r\n                              <h2 class=\"color-blue\">Image :</h2>\r\n                            </section></td>\r\n                          <td  width=\"80%\"><section class=\"mat-typography\">\r\n                              <div class=\"color-grey\" *ngIf=\"detailModel?.DocumentUrl\"> <img [src]=\"detailModel?.DocumentUrl\" height=\"100px\" width=\"100px\"/></div>\r\n                              <div class=\"color-grey\" *ngIf=\"!detailModel?.DocumentUrl\"> <img src=\"../../../../../assets/images/noimage.jpeg\" height=\"100px\" width=\"100px\"/></div>\r\n                            </section></td>\r\n                        </tr>\r\n                    <tr>\r\n                        <td><section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Subject English :</h2>\r\n                          </section></td>\r\n                        <td><section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectEng\">{{detailModel?.SubjectEng}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectEng\">--</h3>\r\n                          </section></td>\r\n                      </tr>\r\n\r\n                      <tr>\r\n                          <td><section class=\"mat-typography\">\r\n                              <h2 class=\"color-blue\">Subject Hindi :</h2>\r\n                            </section></td>\r\n                          <td><section class=\"mat-typography\">\r\n                              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectHin\">{{detailModel?.SubjectHin}}</h3>\r\n                              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectHin\">--</h3>\r\n                            </section></td>\r\n                        </tr>\r\n\r\n                        <tr>\r\n                            <td><section class=\"mat-typography\">\r\n                                <h2 class=\"color-blue\">Advertisement Date :</h2>\r\n                              </section></td>\r\n                            <td><section class=\"mat-typography\">\r\n                                <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdvDate\">{{detailModel?.AdvDate | date: 'dd/MM/yyyy'}}</h3>\r\n                                <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdvDate\">--</h3>\r\n                              </section></td>\r\n                          </tr>\r\n\r\n                          <tr>\r\n                              <td><section class=\"mat-typography\">\r\n                                  <h2 class=\"color-blue\">Category :</h2>\r\n                                </section></td>\r\n                              <td><section class=\"mat-typography\">\r\n                                  <h3 class=\"color-grey\" *ngIf=\"detailModel?.CategoryName\"> {{detailModel?.CategoryName}}</h3>\r\n                                  <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CategoryName\">--</h3>\r\n                                </section></td>\r\n                            </tr>\r\n\r\n                            <tr>\r\n                                <td><section class=\"mat-typography\">\r\n                                    <h2 class=\"color-blue\">Sub Category :</h2>\r\n                                  </section></td>\r\n                                <td><section class=\"mat-typography\">\r\n                                    <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubCategoryName\"> {{detailModel?.SubCategoryName}}</h3>\r\n                                    <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubCategoryName\">--</h3>\r\n                                  </section></td>\r\n                              </tr>\r\n\r\n                              <tr>\r\n                                  <td><section class=\"mat-typography\">\r\n                                      <h2 class=\"color-blue\">Created Date :</h2>\r\n                                    </section></td>\r\n                                  <td><section class=\"mat-typography\">\r\n                                      <h3 class=\"color-grey\" *ngIf=\"detailModel?.CreateDate\">{{detailModel?.CreateDate | date: 'dd/MM/yyyy'}}</h3>\r\n                                      <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CreateDate\">--</h3>\r\n                                    </section></td>\r\n                                </tr>\r\n\r\n                                <tr>\r\n                                    <td><section class=\"mat-typography\">\r\n                                        <h2 class=\"color-blue\">Admin Department :</h2>\r\n                                      </section></td>\r\n                                    <td><section class=\"mat-typography\">\r\n                                        <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdminDepartmentsName\">{{detailModel?.AdminDepartmentsName}}</h3>\r\n                                        <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdminDepartmentsName\">--</h3>\r\n                                      </section></td>\r\n                                  </tr>\r\n\r\n                                  <tr>\r\n                                      <td><section class=\"mat-typography\">\r\n                                          <h2 class=\"color-blue\">  Beneficiary Categories Name :</h2>\r\n                                        </section></td>\r\n                                      <td><section class=\"mat-typography\">\r\n                                          <h3 class=\"color-grey\" *ngIf=\"detailModel?.BeneficiaryCategoriesName\">{{detailModel?.BeneficiaryCategoriesName}}</h3>\r\n                                          <h3 class=\"color-grey\" *ngIf=\"!detailModel?.BeneficiaryCategoriesName\">--</h3>\r\n                                        </section></td>\r\n                                    </tr>\r\n\r\n                                    <tr>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h2 class=\"color-blue\">District Name :</h2>\r\n                                          </section></td>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.DistrictNames\">{{detailModel?.DistrictNames}}</h3>\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.DistrictNames\">--</h3>\r\n                                          </section></td>\r\n                                      </tr>\r\n                                      <tr>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h2 class=\"color-blue\">Notification Period :</h2>\r\n                                          </section></td>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.NotificationPeriod\">{{detailModel?.NotificationPeriod}}</h3>\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.NotificationPeriod\">--</h3>\r\n                                          </section></td>\r\n                                      </tr>\r\n\r\n                                      <tr>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h2 class=\"color-blue\">Expiry Date :</h2>\r\n                                          </section></td>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h3 class=\"color-grey\" *ngIf=\"detailModel?.ExpiryDate\">{{detailModel?.ExpiryDate | date: 'dd/MM/yyyy'}}</h3>\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.ExpiryDate\">--</h3>\r\n                                          </section></td>\r\n                                      </tr>\r\n                                      <tr>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <h2 class=\"color-blue\">Pdf File :</h2>\r\n                                          </section></td>\r\n                                        <td><section class=\"mat-typography\">\r\n                                            <a href=\"Javascript:void(0)\" (click)=\"downloadMyFile(detailModel.PdfUrl)\" *ngIf=\"detailModel?.PdfUrl\" > Click here for pdf </a>\r\n                                            <!-- <h3 class=\"color-grey\" *ngIf=\"detailModel?.PdfUrl\">{{detailModel?.PdfUrl }}</h3> -->\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.PdfUrl\">--</h3>\r\n                                          </section></td>\r\n                                      </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.html":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.html ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row align-items-center\">\r\n  <div class=\"col l12 xl12 m12 s12 mb-10\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" aria-label=\"Select an option\"\r\n      [(ngModel)]=\"model.IsAdvertisementorGovermentAchivement\" name=\"IsAdvertisementorGovermentAchivement\"\r\n      [formControl]=\"GovermentAchivementOrAdvertisement\">\r\n      <mat-label class=\"mr-5\">Popup Type</mat-label>\r\n      <mat-radio-button class=\"mr-5\" value=\"1\">Sector Wise Achivement\r\n      </mat-radio-button>\r\n      <mat-radio-button class=\"mr-5\" value=\"2\">Display Newspaper Popup Advertisement\r\n      </mat-radio-button>\r\n      <mat-radio-button class=\"mr-5\" value=\"3\">Ebooklet of Govt. Achivement + Display Newspaper Popup Advertisement\r\n      </mat-radio-button>\r\n      <mat-radio-button class=\"mr-5\" value=\"4\">FB & Twitter Post & Ebooklet of Govt Achivement</mat-radio-button>\r\n    </mat-radio-group>\r\n    <mat-error *ngIf=\"GovermentAchivementOrAdvertisement.invalid && GovermentAchivementOrAdvertisement.touched\">\r\n      Approved/Reject is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12 mb-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Header Website URL </mat-label>\r\n      <input matInput placeholder=\"Header Website URL\" [(ngModel)]=\"model.AdvtPopupHeaderUrl\" #AdvtPopupHeaderUrl />\r\n    </mat-form-field>\r\n    <mat-error>\r\n      Note: Default URL (https://jankalyan.rajasthan.gov.in/)\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l4 x4 m6 s12 \">\r\n    <button mat-button class=\"btn-submit\" (click)=\"saveClick()\">\r\n      <span *ngIf=\"!(model.Id>0) && !(listmodel?.length>0)\">Submit</span>\r\n      <span *ngIf=\"model.Id>0\">Update</span>\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12   \">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\"\r\n      class=\"mat-elevation-z8 table_border\">\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\"> {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsGovermentAndAdvertisement\">\r\n        <th mat-header-cell *matHeaderCellDef>Popup Type</th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n          {{ group.IsAdvertisementorGovermentAchivement == 1 ? 'Sector Wise Achivement' :\r\n          group.IsAdvertisementorGovermentAchivement == 2?\r\n          'Display Newspaper Popup Advertisement': group.IsAdvertisementorGovermentAchivement == 3?'Ebooklet of Govt.\r\n          Achivement + Display Newspaper Popup Advertisement'\r\n          :'FB & Twitter Post & Ebooklet of Govt Achivement' }}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"AdvtPopupHeaderUrl\">\r\n        <th mat-header-cell *matHeaderCellDef> Header Website URL </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n          {{ group.AdvtPopupHeaderUrl }}\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n          <a class=\"btn_edit\" (click)=\"getByID(group.Id)\" title=\"edit\"><mat-icon>edit</mat-icon></a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5,10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n    </mat-paginator>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.html":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.html ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formGroup\">\r\n\r\n  <div class=\"row\">\r\n\r\n    <!-- Image Icon -->\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label> Icon Image</label>\r\n        <input type=\"file\" id=\"ImageIcon\" formControlName=\"ImageIcon\" (change)=\"handleImageFileInput($event)\"\r\n          accept=\"image/*\">\r\n      </div>\r\n      <div *ngIf=\"model?.ImageIcon\"> <img [src]=\"model.ImageIcon\" style=\"width: 100px; height: 100px;\" /> <a\r\n          title=\"Remove\" (click)=\"RemoveImageFile()\" *ngIf=\"model?.ImageIcon\">\r\n          <mat-icon>delete</mat-icon>\r\n        </a></div>\r\n      <mat-error *ngIf=\"ImagefileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">\r\n        {{ImagefileValidationMsg}}\r\n      </mat-error>\r\n    </div>\r\n\r\n     <!-- Image banner -->\r\n     <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Image Url\r\n        </mat-label>\r\n        <input matInput placeholder=\"Image Url\" [(ngModel)]=\"model.ImageUrl\"\r\n          formControlName=\"ImageUrl\" name=\"ImageUrl\">\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"(formGroup.get('ImageUrl').hasError('required') && formGroup.get('ImageUrl').touched)\">\r\n        Image Url is <strong>required!</strong>\r\n      </mat-error>\r\n     </div>\r\n\r\n\r\n    <!-- button Name -->\r\n    <div class=\"col l6 xl6 m12 s12\" >\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Button Name\r\n          </mat-label>\r\n          <input matInput placeholder=\"Button Name\" [(ngModel)]=\"model.ButtonName\"\r\n            formControlName=\"ButtonName\" name=\"ButtonName\">\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"(formGroup.get('ButtonName').hasError('required') && formGroup.get('ButtonName').touched)\">\r\n          Button Name is <strong>required!</strong>\r\n        </mat-error>\r\n      </div>\r\n\r\n\r\n      <!-- display order -->\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Display Order\r\n          </mat-label>\r\n          <input matInput placeholder=\"Display Order\" [(ngModel)]=\"model.DisplayOrder\"\r\n            formControlName=\"DisplayOrder\" name=\"Display Order\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n\r\n      <!-- for arrow -->\r\n      <div class=\"col l6 xl6 m6 s12 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsArrow\" formControlName=\"IsArrow\" #IsArrow >Is Arrow\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Advertisement pop-up Category </mat-label>\r\n            <mat-select name=\"AdvertisementPopupCode\" [(ngModel)]=\"model.AdvertisementPopupCode\" formControlName=\"AdvertisementPopupCode\" >\r\n              <mat-option>--Select--</mat-option>\r\n              <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdvertisementPopUpCategory\">{{k.Text}}</mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n      </div>\r\n\r\n    <div class=\"col l12 x8 m4 s6 clearfix\">\r\n      <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">{{title}}</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"IsArrow\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Is Arrow\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.IsArrow\">Yes</span>\r\n        <span *ngIf=\"!element.IsArrow\">No</span>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess && !element.IsLock \" routerLink=\"/advertisement/jankalyan-advertisement/update-jankalyan-advertisement/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.html ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n  <div class=\"col l12 m12 s12\">\r\n    <h3 class=\"redesignrequestbyuser_title\">Original Design</h3>\r\n    <div class=\"table-responsive w-100\">\r\n      <table class=\"table custom-data-table mb-20\">\r\n        <tbody>\r\n\r\n\r\n          <tr>\r\n\r\n                <td width=\"15%\"><section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">Image : </h2>\r\n                </section></td>\r\n              <td width=\"30%\">\r\n                  <section class=\"mat-typography\">\r\n\r\n                  <div class=\"color-grey\" *ngIf=\"detailModel?.DocumentUrl\"> <img [src]=\"detailModel?.DocumentUrl\" height=\"100px\" width=\"100px\"/></div>\r\n                  <div class=\"color-grey\" *ngIf=\"!detailModel?.DocumentUrl\"> <img src=\"../../../../../assets/images/noimage.jpeg\" height=\"100px\" width=\"100px\"/></div>\r\n\r\n                  </section>\r\n               </td>\r\n            <td width=\"15%\"><section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Subject English  :</h2>\r\n              </section></td>\r\n            <td width=\"30%\"><section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectEng\">{{detailModel?.SubjectEng}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectEng\">--</h3>\r\n              </section></td>\r\n\r\n\r\n\r\n          </tr>\r\n\r\n          <tr>\r\n\r\n                <td><section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Subject Hindi :</h2>\r\n                  </section></td>\r\n                <td><section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectHin\">{{detailModel?.SubjectHin}}</h3>\r\n                              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectHin\">--</h3>\r\n                  </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Advertisement Date  :</h2>\r\n              </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdvDate\">{{detailModel?.AdvDate | date: 'dd/MM/yyyy'}}</h3>\r\n                                <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdvDate\">--</h3>\r\n              </section></td>\r\n\r\n\r\n\r\n          </tr>\r\n\r\n          <tr>\r\n            <td><section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Category :</h2>\r\n                  </section></td>\r\n                <td><section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"detailModel?.CategoryName\"> {{detailModel?.CategoryName}}</h3>\r\n                                  <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CategoryName\">--</h3>\r\n                  </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Sub Category :</h2>\r\n              </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubCategoryName\"> {{detailModel?.SubCategoryName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubCategoryName\">--</h3>\r\n              </section></td>\r\n\r\n\r\n\r\n          </tr>\r\n\r\n          <tr>\r\n\r\n                <td><section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Created Date  :</h2>\r\n                  </section></td>\r\n                <td><section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"detailModel?.CreateDate\">{{detailModel?.CreateDate | date: 'dd/MM/yyyy'}}</h3>\r\n                    <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CreateDate\">--</h3>\r\n                  </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Admin Department  :</h2>\r\n              </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdminDepartmentsName\">{{detailModel?.AdminDepartmentsName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdminDepartmentsName\">--</h3>\r\n              </section></td>\r\n\r\n\r\n\r\n          </tr>\r\n\r\n          <tr>\r\n           <td><section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Beneficiary Categories Name  :</h2>\r\n                  </section></td>\r\n                <td><section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"detailModel?.BeneficiaryCategoriesName\">{{detailModel?.BeneficiaryCategoriesName}}</h3>\r\n                                          <h3 class=\"color-grey\" *ngIf=\"!detailModel?.BeneficiaryCategoriesName\">--</h3>\r\n                  </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">District Name :</h2>\r\n              </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"detailModel?.DistrictNames\">{{detailModel?.DistrictNames}}</h3>\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.DistrictNames\">--</h3>\r\n              </section></td>\r\n\r\n\r\n\r\n          </tr>\r\n\r\n          <tr>\r\n           <td><section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Notification Period :</h2>\r\n                  </section></td>\r\n                <td><section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"detailModel?.NotificationPeriod\">{{detailModel?.NotificationPeriod}}</h3>\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.NotificationPeriod\">--</h3>\r\n                  </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Expiry Date :</h2>\r\n              </section></td>\r\n            <td><section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"detailModel?.ExpiryDate\">{{detailModel?.ExpiryDate | date: 'dd/MM/yyyy'}}</h3>\r\n                                            <h3 class=\"color-grey\" *ngIf=\"!detailModel?.ExpiryDate\">--</h3>\r\n              </section></td>\r\n\r\n\r\n\r\n          </tr>\r\n\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n    <h3 class=\"redesignrequestbyuser_title\">Upload New Design</h3>\r\n    <div class=\"row\">\r\n         <div class=\"col l4 m12 s12\">\r\n\r\n        <div class=\"upload-btn-wrapper\" *ngIf=\"resultModel?.Remaks\">\r\n            <label>Remaks </label>\r\n           <span>{{resultModel.Remaks}}</span>\r\n          </div>\r\n\r\n            <!-- <div class=\"upload-btn-wrapper\" *ngIf=\"!resultModel?.IsApproved\"> -->\r\n                <div class=\"upload-btn-wrapper\">\r\n              <label>Upload Advertisement New Design <span style=\"color: red\">*</span></label>\r\n              <input type=\"file\" id=\"file\" [formControl]=\"imageValidation\" (change)=\"handleFileInput($event.target.files)\" accept=\"image/*\" multiple>\r\n            </div>\r\n\r\n            <mat-error style=\"margin: 0px;position: relative;\" *ngIf=\"imageValidation.invalid && imageValidation.touched\">\r\n              Attach image is <strong>required</strong>\r\n                 </mat-error>\r\n            <ul class=\"image-list\">\r\n            <li *ngFor=\"let url of documentUrlList\">\r\n\r\n              <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" href=\"{{url?.Url}}\" target=\"_blank\">\r\n                {{ url.DisplayName}}\r\n              </a>\r\n              <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [ngClass]=\"!url.IsNew?'image_old':''\" [src]=\"url?.Url\" /></div>\r\n\r\n            </li>\r\n          </ul>\r\n\r\n            <mat-error *ngIf=\"fileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">{{fileValidationMsg}}</mat-error>\r\n          </div>\r\n        </div>\r\n\r\n\r\n          <!-- <div class=\"col l12 x8 m4 s12\" *ngIf=\"!resultModel?.IsApproved\">\r\n                <button mat-button class=\"btn-submit\" (click)=\"Saveclick()\">Submit</button>\r\n              </div> -->\r\n\r\n                  <button mat-button class=\"btn-submit\" (click)=\"Saveclick()\">Submit</button>\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.html":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.html ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n    <p>New Design Approve by Admin</p>\r\n\r\n    <button mat-button (click)=\"onNoClick()\">\r\n        <mat-icon>close</mat-icon>\r\n    </button>\r\n\r\n</div>\r\n\r\n<div class=\"col l12 s12\">\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <mat-label>Remarks <span style=\"color: red\">*</span>\r\n            </mat-label>\r\n            <textarea textarea matInput placeholder=\"Remaks\" [formControl]=\"remarks\" name=\"Remaks\" [(ngModel)]=\"model.Remaks\" id=\"Remaks\">\r\n            </textarea>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"remarks.invalid && remarks.touched\">\r\n            Remarks is <strong>required</strong>\r\n          </mat-error>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n        aria-label=\"Select an option\" [(ngModel)]=\"model.IsApprove\" name=\"IsApproved\" [formControl]=\"isapprove\">\r\n        <mat-label class=\"mr-5\">Approved/Reject </mat-label>\r\n        <mat-radio-button class=\"mr-5\" value=\"true\">Approve</mat-radio-button>\r\n        <mat-radio-button class=\"mr-5\" value=\"false\">Reject</mat-radio-button>\r\n        </mat-radio-group>\r\n        <mat-error *ngIf=\"isapprove.invalid && isapprove.touched\">\r\n            Approved/Reject is <strong>required</strong>\r\n          </mat-error>\r\n        </div>\r\n    <div class=\"col l12 x8 m4 s12\">\r\n        <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">Submit</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.html ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\">\r\n\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"Expired\">\r\n        <th mat-header-cell *matHeaderCellDef>Is Expired</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          <span *ngIf=\"IsExpired(element.ExpiryDate)\"> Expired </span>\r\n          <span *ngIf=\"!IsExpired(element.ExpiryDate)\">Not Expired </span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"SubjectEng\">\r\n        <th mat-header-cell *matHeaderCellDef>Subject English</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          {{element.SubjectEng}}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"RequestedStatus\">\r\n        <th mat-header-cell *matHeaderCellDef>Requested Status</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n\r\n          <span *ngIf=\"element.RequestedStatus\" style=\"color: blue\"> Requested </span>\r\n          <span *ngIf=\"!element.RequestedStatus\" style=\"color: crimson\">Pending </span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsUploaded\">\r\n        <th mat-header-cell *matHeaderCellDef>Uploaded Status</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n\r\n          <span *ngIf=\"element.IsUploaded\" style=\"color: blue\"> {{element.IsUploadedStatus}} </span>\r\n          <span *ngIf=\"!element.IsUploaded\" style=\"color:darkgoldenrod\"> {{element.IsUploadedStatus}} </span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsApproved\">\r\n        <th mat-header-cell *matHeaderCellDef>Approved Status</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          <span *ngIf=\"element.IsRejected\" style=\"color: rgb(253, 37, 22)\"> {{element.IsApprovedStatus}} </span>\r\n          <span *ngIf=\"element.IsApproved\" style=\"color: rgb(16, 36, 212)\"> {{element.IsApprovedStatus}} </span>\r\n          <span *ngIf=\"!element.IsApproved && !element.IsRejected\" style=\"color: rgb(191, 194, 11)\">\r\n            {{element.IsApprovedStatus}} </span>\r\n        </td>\r\n      </ng-container>\r\n      <!-- <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n            </ng-container> -->\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a routerLink=\"/advertisement/redesigndetailforadmin/{{group.AdvId}},{{group.RedesignPlatformUserLookupId}}\"\r\n            title=\"Detail\">\r\n            <mat-icon>list</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5,10, 20, 50]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n    </mat-paginator>\r\n\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.html":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.html ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n    <div class=\"col l12 m12 s12\">\r\n  <h3 class=\"redesignrequestbyuser_title\">Original Design</h3>\r\n  <div class=\"table-responsive w-100\">\r\n    <table class=\"table custom-data-table mb-20\" *ngIf=\"detailModel\">\r\n      <tbody>\r\n        <tr>\r\n          <td width=\"15%\">\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Image : </h2>\r\n            </section>\r\n          </td>\r\n          <td width=\"30%\">\r\n            <section class=\"mat-typography\">\r\n\r\n              <div class=\"color-grey\" *ngIf=\"detailModel?.DocumentUrl\"> <img [src]=\"detailModel?.DocumentUrl\"\r\n                  height=\"100px\" width=\"100px\" /></div>\r\n              <div class=\"color-grey\" *ngIf=\"!detailModel?.DocumentUrl\"> <img\r\n                  src=\"../../../../../assets/images/noimage.jpeg\" height=\"100px\" width=\"100px\" /></div>\r\n\r\n            </section>\r\n          </td>\r\n          <td width=\"15%\">\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Subject English :</h2>\r\n            </section>\r\n          </td>\r\n          <td width=\"30%\">\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectEng\">{{detailModel?.SubjectEng}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectEng\">--</h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Subject Hindi :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubjectHin\">{{detailModel?.SubjectHin}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubjectHin\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Advertisement Date :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdvDate\">{{detailModel?.AdvDate | date: 'dd/MM/yyyy'}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdvDate\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Category :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.CategoryName\"> {{detailModel?.CategoryName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CategoryName\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Sub Category :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.SubCategoryName\"> {{detailModel?.SubCategoryName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.SubCategoryName\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Created Date :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.CreateDate\">{{detailModel?.CreateDate | date: 'dd/MM/yyyy'}}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.CreateDate\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Admin Department :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.AdminDepartmentsName\">{{detailModel?.AdminDepartmentsName}}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.AdminDepartmentsName\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Beneficiary Categories Name :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.BeneficiaryCategoriesName\">\r\n                {{detailModel?.BeneficiaryCategoriesName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.BeneficiaryCategoriesName\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">District Name :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.DistrictNames\">{{detailModel?.DistrictNames}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.DistrictNames\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Notification Period :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.NotificationPeriod\">{{detailModel?.NotificationPeriod}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.NotificationPeriod\">--</h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Expiry Date :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"detailModel?.ExpiryDate\">{{detailModel?.ExpiryDate | date: 'dd/MM/yyyy'}}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!detailModel?.ExpiryDate\">--</h3>\r\n            </section>\r\n          </td>\r\n\r\n\r\n\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n  <h3 class=\"redesignrequestbyuser_title\">Upload New Design</h3>\r\n\r\n  <div class=\"table-responsive w-100\">\r\n  <table class=\"table custom-data-table mb-20\">\r\n  <tbody>\r\n\r\n    <tr *ngIf=\"resultModel?.Remaks\">\r\n      <td>\r\n\r\n          <span class=\"color-blue\">Remaks:</span>\r\n\r\n      </td>\r\n      <td>\r\n        {{resultModel.Remaks}}\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td width=\"15%\">\r\n        <section class=\"mat-typography\">\r\n          <h2 class=\"color-blue\">Advertisement Images :</h2>\r\n        </section>\r\n      </td>\r\n      <td colspan=\"3\" *ngIf=\"resultModel?.RequestImageList.length>0\">\r\n        <ul class=\"image-list\">\r\n          <li class=\"\" *ngFor=\"let url of resultModel?.RequestImageList\">\r\n\r\n            <img [ngClass]=\"!url.IsNew?'image_old':''\" [src]=\"url.Url\" height=\"80px\" width=\"80px\" />\r\n          </li>\r\n        </ul>\r\n      </td>\r\n\r\n\r\n      <td colspan=\"3\" *ngIf=\"resultModel?.RequestImageList.length==0\">\r\n        <section class=\"mat-typography\">\r\n          <h3 class=\"color-grey\">NA</h3>\r\n        </section>\r\n      </td>\r\n\r\n\r\n    </tr>\r\n\r\n  </tbody>\r\n</table>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12\" *ngIf=\"resultModel?.RequestImageList.length>0\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"ApproveClick()\"\r\n      *ngIf=\"!resultModel?.IsApproved && !resultModel?.IsRejected\">Click To Approve</button>\r\n    <span style=\"color: rgb(98, 0, 255)\" *ngIf=\"resultModel?.IsApproved\"> Approved</span>\r\n    <span style=\"color: rgb(255, 17, 0)\" *ngIf=\"resultModel?.IsRejected\"> Rejected</span>\r\n\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/update-advertisement/update-advertisement.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/update-advertisement/update-advertisement.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 m12 s12\">\r\n    <span style=\"color: red\">{{fileSizeValidationMsg}}</span>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Category </mat-label>\r\n      <mat-select name=\"Category\" [(ngModel)]=\"model.Category\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdvCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Sub Category </mat-label>\r\n      <mat-select name=\"SubCategory\" [(ngModel)]=\"model.SubCategory\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdvSubCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Url</mat-label>\r\n      <input matInput placeholder=\"Url\" [(ngModel)]=\"model.SubjectHin\" />\r\n      <!-- <textarea matInput placeholder=\"Url\" [(ngModel)]=\"model.SubjectHin\"></textarea> -->\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Subject (in English) </mat-label>\r\n      <textarea matInput placeholder=\"Subject English\" [(ngModel)]=\"model.SubjectEng\"></textarea>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly placeholder=\"Choose a date\"\r\n        name=\"AdvDate\" id=\"AdvDate\" [(ngModel)]=\"model.AdvDate\" [max]=\"minDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Admin Department </mat-label>\r\n      <mat-select name=\"AdminDepartment\" [(ngModel)]=\"model.AdminDepartment\" multiple>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdminDepartment\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>District </mat-label>\r\n      <mat-select name=\"District\" [(ngModel)]=\"model.Districts\" multiple>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlDistrict\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Beneficiary Category </mat-label>\r\n      <mat-select name=\"BeneficiaryCategories\" [(ngModel)]=\"model.BeneficiaryCategories\" multiple>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlBeneficiaryCategory\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Expiry Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Choose a date\"\r\n        name=\"ExpiryDate\" id=\"ExpiryDate\" [(ngModel)]=\"model.ExpiryDate\" [min]=\"minDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <div class=\"upload-btn-wrapper\">\r\n      <label>Upload Image </label>\r\n      <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event)\">\r\n      <img *ngIf=\"model.DocumentUrl\" [src]=\"model.DocumentUrl\" height=\"100px\" width=\"100px\" />\r\n      <a title=\"Remove\" (click)=\"RemoveImage();\">\r\n        <mat-icon *ngIf=\"model?.DocumentUrl?.length>0\">delete</mat-icon>\r\n      </a>\r\n    </div>\r\n    <mat-error *ngIf=\"fileValidationMsg?.length>0\">{{fileValidationMsg}}</mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <div class=\"upload-btn-wrapper\">\r\n      <label>Add Pdf File </label>\r\n      <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event,true)\" accept=\"application/pdf\">\r\n    </div>\r\n    <ul class=\"image-list\">\r\n      <li>\r\n        <a href=\"Javascript:void(0)\" (click)=\"downloadMyFile(model.PdfUrl)\" *ngIf=\"model.PdfUrl\"> Click here for pdf\r\n        </a>\r\n        <a title=\"Remove\" (click)=\"RemovePdf();\">\r\n          <mat-icon *ngIf=\"model?.PdfUrl?.length>0\">delete</mat-icon>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <mat-error *ngIf=\"fileValidationMsg1?.length>0\">{{fileValidationMsg1}}</mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 clearfix\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Update</button>\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.html":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.html ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20 mb-0\">\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n       <input matInput placeholder=\"IP Address\" (keyup)=\"SearchByKeyword($event)\" [(ngModel)]=\"indexModel.CustomSearch\"/>\r\n   </mat-form-field>\r\n   </div>\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <input matInput placeholder=\"Website URL\" (keyup)=\"SearchByKeyword($event);\" [(ngModel)]=\"indexModel.WebSitUrl\"/>\r\n  </mat-form-field>\r\n    </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\" >Clear Search</button>\r\n  </div>\r\n</div>\r\n<div style=\"margin-left: 96%;\">\r\n    <button (click)=\"print();\" class=\"btn btn_note btn_orange\" style=\"margin-bottom: 10px;\r\n    line-height: 1px;\" ><mat-icon >print</mat-icon></button>\r\n  </div>\r\n<!-- <div  id=\"test\"> -->\r\n<div class=\"row\" id=\"test\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event);\" *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n            <ng-container matColumnDef=\"index\">\r\n              <th mat-header-cell  *matHeaderCellDef>S.No</th>\r\n              <td mat-cell *matCellDef=\"let element; let i = index\">\r\n                {{ (i + 1) }}\r\n              </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"WebSitUrl\">\r\n              <th mat-header-cell mat-sort-header *matHeaderCellDef> WebSite URL</th>\r\n              <td mat-cell *matCellDef=\"let transaction\"> {{transaction.WebSitUrl}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"IPAddress\">\r\n              <th mat-header-cell mat-sort-header *matHeaderCellDef> IP Address</th>\r\n              <td mat-cell *matCellDef=\"let transaction\"> {{transaction.IPAddress}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"CreatedDate\">\r\n                <th mat-header-cell mat-sort-header *matHeaderCellDef> Created Date</th>\r\n                <td mat-cell *matCellDef=\"let transaction\"> {{transaction.CreatedDate| date: 'dd/MM/yyyy,h:mm:ss a'}} </td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n              </ng-container>\r\n\r\n            <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n            <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n            <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n          </table>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n      <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n    </div>\r\n\r\n\r\n  </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.html ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20 mb-0\">\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <input matInput placeholder=\"Website URL\" (keyup)=\"SearchByKeyword($event);\" [(ngModel)]=\"indexModel.WebSitUrl\" />\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>From Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\"\r\n        [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>To Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\"\r\n        [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker2></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\">Clear Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div style=\"margin-left: 96%;\">\r\n  <button (click)=\"print();\" class=\"btn btn_note btn_orange\" style=\"margin-bottom: 10px;\r\n  line-height: 1px;\">\r\n    <mat-icon>print</mat-icon>\r\n  </button>\r\n</div>\r\n\r\n<div id=\"test\">\r\n  <div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n      <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\" *ngIf=\"listModel?.length>0\"\r\n        class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>S.No</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"WebSitUrl\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> WebSite URL</th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.WebSitUrl}} </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"VisitorCount\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Website Popup Counter</th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.VisitorCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalVCCount}} </td>\r\n        </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/Shared/Model/advertisement.model.ts":
/*!*****************************************************!*\
  !*** ./src/app/Shared/Model/advertisement.model.ts ***!
  \*****************************************************/
/*! exports provided: Advertisement, AdvertisementListModel, AdvertisementEditModel, RedesignViewForAdminModel, AdvertisementRedesignRequestIdModel, RedesignDetailModel, ApproveByAdminModel, AdvListForAdmindeptDptPlatformUserModel, AdvertisementOrGovermentAchievementModel, VisitorCountReportViewModel, VisitorCountDetailReportViewModel, AdvertisementReportSearchModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Advertisement", function() { return Advertisement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementListModel", function() { return AdvertisementListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementEditModel", function() { return AdvertisementEditModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesignViewForAdminModel", function() { return RedesignViewForAdminModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementRedesignRequestIdModel", function() { return AdvertisementRedesignRequestIdModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesignDetailModel", function() { return RedesignDetailModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApproveByAdminModel", function() { return ApproveByAdminModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvListForAdmindeptDptPlatformUserModel", function() { return AdvListForAdmindeptDptPlatformUserModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementOrGovermentAchievementModel", function() { return AdvertisementOrGovermentAchievementModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitorCountReportViewModel", function() { return VisitorCountReportViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitorCountDetailReportViewModel", function() { return VisitorCountDetailReportViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementReportSearchModel", function() { return AdvertisementReportSearchModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _general_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general-model */ "./src/app/Shared/Model/general-model.ts");


var Advertisement = /** @class */ (function () {
    function Advertisement() {
    }
    return Advertisement;
}());

var AdvertisementListModel = /** @class */ (function () {
    function AdvertisementListModel() {
    }
    return AdvertisementListModel;
}());

var AdvertisementEditModel = /** @class */ (function () {
    function AdvertisementEditModel() {
    }
    return AdvertisementEditModel;
}());

var RedesignViewForAdminModel = /** @class */ (function () {
    function RedesignViewForAdminModel() {
    }
    return RedesignViewForAdminModel;
}());

var AdvertisementRedesignRequestIdModel = /** @class */ (function () {
    function AdvertisementRedesignRequestIdModel() {
    }
    return AdvertisementRedesignRequestIdModel;
}());

var RedesignDetailModel = /** @class */ (function () {
    function RedesignDetailModel() {
    }
    return RedesignDetailModel;
}());

var ApproveByAdminModel = /** @class */ (function () {
    function ApproveByAdminModel() {
    }
    return ApproveByAdminModel;
}());

var AdvListForAdmindeptDptPlatformUserModel = /** @class */ (function () {
    function AdvListForAdmindeptDptPlatformUserModel() {
    }
    return AdvListForAdmindeptDptPlatformUserModel;
}());

var AdvertisementOrGovermentAchievementModel = /** @class */ (function () {
    function AdvertisementOrGovermentAchievementModel() {
    }
    return AdvertisementOrGovermentAchievementModel;
}());

var VisitorCountReportViewModel = /** @class */ (function () {
    function VisitorCountReportViewModel() {
    }
    return VisitorCountReportViewModel;
}());

var VisitorCountDetailReportViewModel = /** @class */ (function () {
    function VisitorCountDetailReportViewModel() {
    }
    return VisitorCountDetailReportViewModel;
}());

var AdvertisementReportSearchModel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AdvertisementReportSearchModel, _super);
    function AdvertisementReportSearchModel() {
        var _this = _super.call(this) || this;
        _this.FromDate = null;
        _this.ToDate = null;
        _this.CustomSearch = null;
        _this.WebSitUrl = null;
        return _this;
    }
    return AdvertisementReportSearchModel;
}(_general_model__WEBPACK_IMPORTED_MODULE_1__["IndexModel"]));



/***/ }),

/***/ "./src/app/Shared/Model/advtjankalyan-advertisement-model.ts":
/*!*******************************************************************!*\
  !*** ./src/app/Shared/Model/advtjankalyan-advertisement-model.ts ***!
  \*******************************************************************/
/*! exports provided: ADVTJankalyanAdvertisementModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADVTJankalyanAdvertisementModel", function() { return ADVTJankalyanAdvertisementModel; });
var ADVTJankalyanAdvertisementModel = /** @class */ (function () {
    function ADVTJankalyanAdvertisementModel() {
    }
    return ADVTJankalyanAdvertisementModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/redesignrequest.model.ts":
/*!*******************************************************!*\
  !*** ./src/app/Shared/Model/redesignrequest.model.ts ***!
  \*******************************************************/
/*! exports provided: RedesignRequestModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesignRequestModel", function() { return RedesignRequestModel; });
var RedesignRequestModel = /** @class */ (function () {
    function RedesignRequestModel() {
    }
    return RedesignRequestModel;
}());



/***/ }),

/***/ "./src/app/Shared/Service/achievement.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/Shared/Service/achievement.service.ts ***!
  \*******************************************************/
/*! exports provided: AchievementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementService", function() { return AchievementService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var AchievementService = /** @class */ (function () {
    function AchievementService(_baseService) {
        this._baseService = _baseService;
    }
    AchievementService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementListUrl, model);
    };
    AchievementService.prototype.GetFilterList = function (model, UserId) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementFilterListUrl + "?UserId=" + UserId, model);
    };
    AchievementService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementAddUrl, model);
    };
    AchievementService.prototype.Detail = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementDetailUrl + id);
    };
    AchievementService.prototype.Edit = function (id, model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementUpdateUrl + id, model);
    };
    AchievementService.prototype.ChangeDeleteStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementUpdateDeleteStatusUrl + id);
    };
    AchievementService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AchievementUpdateActiveStatusUrl + id);
    };
    //#region <Achievement Reports>
    AchievementService.prototype.GetAchievementsCategoryWiseSummaryReport = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GetAchievementsCategoryWiseSummaryReportUrl, model);
    };
    AchievementService.prototype.ExportAchievementData = function (model, loginUserId) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].ExportAchievementDataUrl + "?loginUserId=" + loginUserId, model);
    };
    AchievementService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    AchievementService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], AchievementService);
    return AchievementService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/advertisement.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/Shared/Service/advertisement.service.ts ***!
  \*********************************************************/
/*! exports provided: AdvertisementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementService", function() { return AdvertisementService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var AdvertisementService = /** @class */ (function () {
    function AdvertisementService(_baseService) {
        this._baseService = _baseService;
    }
    AdvertisementService.prototype.AddAdvertisement = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementAddUrl, model);
        return result;
    };
    AdvertisementService.prototype.GetList = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementListUrl, model);
        return result;
    };
    AdvertisementService.prototype.DeleteAdvertisement = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementDeleteUrl + id, null);
        return result;
    };
    AdvertisementService.prototype.GetById = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementEditUrl + id, null);
        return result;
    };
    AdvertisementService.prototype.PublishAdvertisement = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementPublishUrl + id, null);
        return result;
    };
    AdvertisementService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementUpdateStatusUrl + id);
    };
    AdvertisementService.prototype.RedesignRequestByPlatformUser = function (model) {
        var formData = new FormData();
        if (model.File) {
            for (var index = 0; index < model.File.length; index++) {
                var item = model.File.item(index);
                formData.append(item.name, item);
            }
        }
        formData.append("Data", JSON.stringify(model));
        formData.append("enctype", "multipart/form-data");
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].RedesignRequestByPlatformUserUrl, formData);
        return result;
    };
    AdvertisementService.prototype.GetRedesignListForAdmin = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].RedesignRequestforAdminUrl, model);
        return result;
    };
    AdvertisementService.prototype.GetRedesignDetailForAdmin = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].RedesignRequestDetailforAdminUrl, model);
        return result;
    };
    AdvertisementService.prototype.RedesignApproveByAdmin = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].RedesignApproveByAdminUrl, model);
        return result;
    };
    AdvertisementService.prototype.GetAdvListForAdminDepartmentDepartmentPlatformUser = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvListForUsersUrl, model);
    };
    AdvertisementService.prototype.UploadedService = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvUploadedUrl + id, null);
    };
    AdvertisementService.prototype.LockToggle = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].AdvertisementLockUrl + id, null);
    };
    AdvertisementService.prototype.GetVisitorCountReportList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VisitorCountReportUrl, model);
    };
    AdvertisementService.prototype.GetVisitorCountDetailReportList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].VisitorCountDetailReportUrl, model);
    };
    AdvertisementService.prototype.GetDateWiseVisitorCountReportList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DateWiseVisitorCountReportUrl, model);
    };
    AdvertisementService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    AdvertisementService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], AdvertisementService);
    return AdvertisementService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/goverment-achivement-or-advertisement.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/Shared/Service/goverment-achivement-or-advertisement.service.ts ***!
  \*********************************************************************************/
/*! exports provided: GovermentAchivementOrAdvertisementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GovermentAchivementOrAdvertisementService", function() { return GovermentAchivementOrAdvertisementService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var GovermentAchivementOrAdvertisementService = /** @class */ (function () {
    function GovermentAchivementOrAdvertisementService(_baseService) {
        this._baseService = _baseService;
    }
    GovermentAchivementOrAdvertisementService.prototype.GetList = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GovAchivementOrAdvList, model);
        return result;
    };
    GovermentAchivementOrAdvertisementService.prototype.Add = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GovAchivementOrAdvAddUrl, model);
        return result;
    };
    GovermentAchivementOrAdvertisementService.prototype.GetById = function (Id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GovAchivementOrAdvGetById + Id, null);
        return result;
    };
    GovermentAchivementOrAdvertisementService.prototype.Edit = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GovAchivementOrAdvEditUrl, model);
        return result;
    };
    GovermentAchivementOrAdvertisementService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    GovermentAchivementOrAdvertisementService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], GovermentAchivementOrAdvertisementService);
    return GovermentAchivementOrAdvertisementService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/jankalyan-advertisement.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/Shared/Service/jankalyan-advertisement.service.ts ***!
  \*******************************************************************/
/*! exports provided: JankalyanAdvertisementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JankalyanAdvertisementService", function() { return JankalyanAdvertisementService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var JankalyanAdvertisementService = /** @class */ (function () {
    function JankalyanAdvertisementService(_baseService) {
        this._baseService = _baseService;
    }
    JankalyanAdvertisementService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].JankalyanAdvertisementListUrl, model);
    };
    JankalyanAdvertisementService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].JankalyanAdvertisementAddUrl, model);
    };
    JankalyanAdvertisementService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].JankalyanAdvertisementGetByIdUrl + id, null);
    };
    JankalyanAdvertisementService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].JankalyanAdvertisementEditUrl, model);
    };
    JankalyanAdvertisementService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].JankalyanAdvertisementUpdateStatusUrl + id);
    };
    JankalyanAdvertisementService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    JankalyanAdvertisementService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], JankalyanAdvertisementService);
    return JankalyanAdvertisementService;
}());



/***/ }),

/***/ "./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.css":
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.css ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\ntr:nth-child(even) {\r\n  background-color: rgb(224, 224, 224);\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2FjaGlldmVtZW50cy9hY2hpZXZlbWVudHMtY2F0LXN1bW1hcnktcmVwb3J0L2FjaGlldmVtZW50cy1jYXQtc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0QyIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hY2hpZXZlbWVudHMvYWNoaWV2ZW1lbnRzLWNhdC1zdW1tYXJ5LXJlcG9ydC9hY2hpZXZlbWVudHMtY2F0LXN1bW1hcnktcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRyLm1hdC1mb290ZXItcm93IHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxudHI6bnRoLWNoaWxkKGV2ZW4pIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI0LCAyMjQsIDIyNCk7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: AchievementsCatSummaryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementsCatSummaryReportComponent", function() { return AchievementsCatSummaryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/achievement.service */ "./src/app/Shared/Service/achievement.service.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Enum_Common_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Enum/Common.enum */ "./src/app/Shared/Enum/Common.enum.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");













var AchievementsCatSummaryReportComponent = /** @class */ (function () {
    //#endregion <Variables>
    //#region <Constructor>
    function AchievementsCatSummaryReportComponent(_achievementService, _alertService, _commonService, _parentApi) {
        this._achievementService = _achievementService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "Advertisement",
            "Audio",
            "Awards",
            "BannerImage",
            "CabinetDecisions",
            "DepartmentalAchievements",
            "ExternalLink",
            "NewsTicker",
            "ImportantDecisions",
            "PhotoGallery",
            "Posters",
            //"Publications",
            "UpcomingEvents",
            "Videos",
            "Total"
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentApi.setpagelayout("General Entry Category Summary Report", "", "", "");
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_7__["DepartmentCategoryReportFilterModel"]();
        this.GetDDLList();
    }
    //#endregion <Constructor>
    //#region <Methods>
    AchievementsCatSummaryReportComponent.prototype.ngOnInit = function () {
        this.model.DepartmentCategoryCode = String(src_app_Shared_Enum_Common_enum__WEBPACK_IMPORTED_MODULE_9__["DepartmentCategoryEnum"].Category);
        //this.GetDDLList();
        //this.GetList();
    };
    AchievementsCatSummaryReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].DDlKeyForAllModuleReport)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AchievementsCatSummaryReportComponent.prototype.searchClick = function () {
        if (this.model.EntryToDate) {
            var uTCDate = new Date(Date.UTC(new Date(this.model.EntryToDate).getFullYear(), new Date(this.model.EntryToDate).getMonth(), new Date(this.model.EntryToDate).getDate())).toISOString();
            this.model.EntryToDate = uTCDate;
        }
        if (this.model.EntryFromDate) {
            var uTCDate = new Date(Date.UTC(new Date(this.model.EntryFromDate).getFullYear(), new Date(this.model.EntryFromDate).getMonth(), new Date(this.model.EntryFromDate).getDate())).toISOString();
            this.model.EntryFromDate = uTCDate;
        }
        this.GetList();
    };
    AchievementsCatSummaryReportComponent.prototype.clearClick = function () {
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_7__["DepartmentCategoryReportFilterModel"]();
        this.GetList();
    };
    AchievementsCatSummaryReportComponent.prototype.GetList = function () {
        var _this = this;
        this._achievementService
            .GetAchievementsCategoryWiseSummaryReport(this.model)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.getTotalRecord();
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AchievementsCatSummaryReportComponent.prototype.getTotalRecord = function () {
        this.totalVideos = this.listModel
            .map(function (t) { return t.Videos; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalAwards = this.listModel
            .map(function (t) { return t.Awards; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalBannerImage = this.listModel
            .map(function (t) { return t.BannerImage; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalDepartmentalAchievements = this.listModel
            .map(function (t) { return t.DepartmentalAchievements; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalExternalLink = this.listModel
            .map(function (t) { return t.ExternalLink; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalNewsTicker = this.listModel
            .map(function (t) { return t.NewsTicker; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalPhotoGallery = this.listModel
            .map(function (t) { return t.PhotoGallery; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalPublications = this.listModel
            .map(function (t) { return t.Publications; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalUpcomingEvents = this.listModel
            .map(function (t) { return t.UpcomingEvents; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.total = this.listModel
            .map(function (t) { return t.Total; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalAdvertisement = this.listModel
            .map(function (t) { return t.Advertisement; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalAudio = this.listModel
            .map(function (t) { return t.Audio; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalPosters = this.listModel
            .map(function (t) { return t.Posters; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalCabinetDecisions = this.listModel
            .map(function (t) { return t.CabinetDecisions; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalImportantDecisions = this.listModel
            .map(function (t) { return t.ImportantDecisions; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    AchievementsCatSummaryReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_6__["AchievementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], AchievementsCatSummaryReportComponent.prototype, "sort", void 0);
    AchievementsCatSummaryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: "app-achievements-cat-summary-report",
            template: __webpack_require__(/*! raw-loader!./achievements-cat-summary-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.html"),
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DatePipe"],
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./achievements-cat-summary-report.component.css */ "./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_6__["AchievementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]])
    ], AchievementsCatSummaryReportComponent);
    return AchievementsCatSummaryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/achievements/achievements.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/achievements.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media print {\r\n  /* .doNotPrint {\r\n    display: none !important;\r\n\r\n  } */\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2FjaGlldmVtZW50cy9hY2hpZXZlbWVudHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFOzs7S0FHRztBQUNMIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2FjaGlldmVtZW50cy9hY2hpZXZlbWVudHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSBwcmludCB7XHJcbiAgLyogLmRvTm90UHJpbnQge1xyXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG5cclxuICB9ICovXHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/advertisement/achievements/achievements.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/achievements.component.ts ***!
  \******************************************************************************/
/*! exports provided: AchievementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementsComponent", function() { return AchievementsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/achievement-model */ "./src/app/Shared/Model/achievement-model.ts");
/* harmony import */ var src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/achievement.service */ "./src/app/Shared/Service/achievement.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Service/Common/format-datepicker */ "./src/app/Shared/Service/Common/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
















var AchievementsComponent = /** @class */ (function () {
    //#endregion
    //#region constructor
    function AchievementsComponent(appComponnet, _alertService, _achievementService, _dialog, _userService, _authService, _commonService, _route) {
        this.appComponnet = appComponnet;
        this._alertService = _alertService;
        this._achievementService = _achievementService;
        this._dialog = _dialog;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this._route = _route;
        this.searchModel = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_8__["CustomSearchModel"]();
        this.deptlNameItems = {};
        this.categoryNameItems = {};
        this.subcategoryNameItems = {};
        this.displayedColumns = [
            "index",
            "Department",
            //"AchievementCategory",
            // "AchievementSubCategory",
            //"Achievement",
            "AchievementHindi",
            //"CMOComments",
            "DescriptionHindi",
            "UserName",
            "IsActive",
            "Action",
        ];
        this.ViewdisplayedColumns = [
        // { Value: "Department", Text: "Department" },
        // { Value: "AchievementCategory", Text: "Category" },
        // { Value: "AchievementSubCategory", Text: "Sub category" },
        // //{ Value: "Achievement", Text: "Achievement" },
        // { Value: "AchievementHindi", Text: "Achievement (Hindi)" },
        // { Value: "CMOComments", Text: "CMO Comments" },
        // { Value: "AchievementDate", Text: "Date" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("achievements", "achievements/add-achievements", "achievements/detail", "achievements/update-achievements", "achievements/delete", "/achievements/update-achievementsComment");
        this.isShow = false;
        this.catCode = this._route.snapshot.params.catCode;
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.Permission.AddPageAccess
            ? this.appComponnet.setpagelayout(this.catCode ? 'E-Booklet' : 'General -multiple Entry', "add", "Create", this.catCode ? "advertisement/add-e-booklet" : "advertisement/achievements/add-achievements")
            : this.appComponnet.setpagelayout(this.catCode ? 'E-Booklet' : 'General -multiple Entry');
        ///dDLList: DDLModel;
        // this.searchModel.indexmodel = new CustomSearchModel();
        if (sessionStorage.getItem("achvSearch")) {
            this.searchModel = (JSON.parse(sessionStorage.getItem("achvSearch")));
            if (this.searchModel.CreatedFrom) {
                this.fromDate = new Date(this.searchModel.CreatedFrom);
            }
            if (this.searchModel.CreatedTo) {
                this.toDate = new Date(this.searchModel.CreatedTo);
            }
            if (this.catCode) {
                this.searchModel.CategortyCode = String(this.catCode);
            }
            this.toggleDisplay();
            this.getList();
        }
        else {
            this.searchModel = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_8__["CustomSearchModel"]();
            this.searchModel.indexmodel.OrderByAsc = 1;
        }
        if (this.catCode) {
            this.searchModel.CategortyCode = String(this.catCode);
        }
        // this.searchModel.indexmodel.PageSize = 1000000;
    }
    AchievementsComponent.prototype.toggleDisplay = function () {
        this.isShow = !this.isShow;
    };
    //#endregion
    //#region  Method
    AchievementsComponent.prototype.ngOnInit = function () {
        debugger;
        // this.getList();
        this.GetDDLList();
        this.getDepartment();
        this.GetDDLListByDepartment(0);
    };
    AchievementsComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    // getAchievementSubcategory() {
    //   this._userService
    //     .GetUserAchievementSubcategory(this.loginData.UserId)
    //     .subscribe(
    //       (data) => {
    //         if (data.IsSuccess) {
    //           this.ddlAchievementSubcategorylist = <
    //             UserAchievementSubCategoryViewModel[]
    //           >data.Data;
    //         }
    //       },
    //       (error) => {
    //         this._alertService.error(error.message);
    //       }
    //     );
    // }
    AchievementsComponent.prototype.GetGeneralSubCategory = function (AchievementCategoryCode) {
        var _this = this;
        if (this.searchModel.CategortyCode) {
            this._commonService
                .GetGeneralSubCategory(AchievementCategoryCode)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLList.ddlAchievementSubCategory = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.dDLList.ddlAchievementSubCategory = [];
        }
    };
    // Getcategorybydepartmentcode(DepartmentCode: number){
    //   // if (DepartmentCode) {
    //     this._commonService.Getcategorybydepartmentcode(Number(DepartmentCode)).subscribe(
    //       data => {
    //         if (data.IsSuccess) {
    //           this.ddlAchievementCategory = data.Data as DdlItemModel[];
    //         }
    //       },
    //       error => {
    //         this._alertService.error(error.message);
    //       }
    //     );
    //   }
    AchievementsComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].DDLKeyForCustomSearch).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AchievementsComponent.prototype.GetDDLListByDepartment = function (code) {
        var _this = this;
        if (code === void 0) { code = 0; }
        this._commonService.GetAllDDL("ddlAchievementCategory", String(code)).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlAchievementCategory = data.Data.ddlAchievementCategory;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AchievementsComponent.prototype.updateDeleteStatus = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogComponent"], {
            width: "350px",
            data: src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_3__["GlobalMessagesModel"].ConfirmStatusChanged,
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._achievementService.ChangeDeleteStatus(id).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._commonService.ScrollingTop();
                        _this.getList();
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    AchievementsComponent.prototype.updateActiveStatus = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogComponent"], {
            width: "350px",
            data: src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_3__["GlobalMessagesModel"].ConfirmStatusChanged,
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._achievementService.ChangeActiveStatus(id).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this.getList();
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    AchievementsComponent.prototype.sortData = function (event) {
        this.searchModel.indexmodel.OrderBy = event.active;
        this.searchModel.indexmodel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].orderByDsc;
        this.searchModel.indexmodel.IsPostBack = true;
        this.getList();
    };
    AchievementsComponent.prototype.onPaginateChange = function (event) {
        this.searchModel.indexmodel.Page = event.pageIndex + 1;
        this.searchModel.indexmodel.PageSize = event.pageSize;
        this.searchModel.indexmodel.IsPostBack = true;
        this.getList();
    };
    // SearchByKeyword(searchValue) {
    //   this.searchModel.indexmodel.Search = searchValue;
    //   this.getList();
    // }
    AchievementsComponent.prototype.reset = function () {
        this.searchModel = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_8__["CustomSearchModel"]();
        this.indexModel = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_8__["CustomSearchModel"]();
        this.searchModel.indexmodel.OrderByAsc = 1;
        //this.searchModel.indexmodel.PageSize = 10000000;
        this.fromDate = null;
        this.toDate = null;
        //  this.getList();
        this.dataSource = null;
        this.model = null;
        sessionStorage.removeItem("achvSearch");
    };
    AchievementsComponent.prototype.print = function () {
        var _this = this;
        this.searchModel.indexmodel.PageSize = 101;
        this._achievementService
            .GetFilterList(this.searchModel, this.loginData.UserId)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTableDataSource"](_this.model);
                _this.totalRecords = data.Data.TotalRecords;
                if (!_this.searchModel.indexmodel.IsPostBack) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                    var printContents = void 0, popupWin = void 0;
                    printContents = document.getElementById("print").outerHTML;
                    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
                    popupWin.document.open();
                    popupWin.document.write("\n      <html>\n        <head>\n          <title>Important Decisions</title>\n          <style>\n          .doNotPrint{display:none !important;}\n          table th,table td{\n            border: 1px solid black;\n\n            // padding:1px;\n          }\n          #print {\n            border-collapse: collapse;\n          }\n          </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
                    popupWin.document.close();
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AchievementsComponent.prototype.downloadCsv = function () {
        this.searchModel.IsExportToExcel = true;
        this.getList();
    };
    AchievementsComponent.prototype.getList = function () {
        var _this = this;
        if (this.fromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.fromDate).getFullYear(), new Date(this.fromDate).getMonth(), new Date(this.fromDate).getDate()));
            this.fromDate = uTCFromDate;
        }
        if (this.toDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.toDate).getFullYear(), new Date(this.toDate).getMonth(), new Date(this.toDate).getDate()));
            this.toDate = uTCToDate;
        }
        // if (this.fromDate || this.toDate) {
        //   this.indexModel.AdvanceSearchModel = {
        //     FromDate: this.fromDate,
        //     ToDate: this.toDate,
        //   };
        // }
        this.searchModel.CreatedFrom = this.fromDate;
        this.searchModel.CreatedTo = this.toDate;
        if (this.searchModel.IsExportToExcel) {
            this._achievementService.ExportAchievementData(this.searchModel, this._authService.GetCurrentUserDetail().UserViewModel.UserId)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    var linkSource = data.Data;
                    var downloadLink = document.createElement("a");
                    var fileName = "General Entry Report";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.target = "blank";
                    downloadLink.click();
                }
                else {
                    _this._alertService.error(data.Message);
                }
                _this.searchModel.IsExportToExcel = false;
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this._achievementService
                .GetFilterList(this.searchModel, this.loginData.UserId)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.model = data.Data.Data;
                    _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTableDataSource"](_this.model);
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                    // if (!this.searchModel.indexmodel.IsPostBack) {
                    //   // this.dataSource.paginator = this.paginator;
                    //   this.dataSource.sort = this.sort;
                    // }
                }
                else {
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        sessionStorage.setItem("achvSearch", JSON.stringify(this.searchModel));
    };
    AchievementsComponent.prototype.downloadPdf = function (Url) {
        var w = window.open('about:blank');
        setTimeout(function () {
            w.document.body.appendChild(w.document.createElement('iframe'))
                .src = Url;
            w.document.getElementsByTagName("iframe")[0].style.width = '100%';
            w.document.getElementsByTagName("iframe")[0].style.height = '100%';
        }, 0);
    };
    AchievementsComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_9__["AchievementService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialog"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_10__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatPaginator"])
    ], AchievementsComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSort"])
    ], AchievementsComponent.prototype, "sort", void 0);
    AchievementsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-achievements",
            template: __webpack_require__(/*! raw-loader!./achievements.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/achievements.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_10__["DateAdapter"], useClass: src_app_Shared_Service_Common_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_10__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./achievements.component.css */ "./src/app/content/advertisement/achievements/achievements.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_9__["AchievementService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialog"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_15__["ActivatedRoute"]])
    ], AchievementsComponent);
    return AchievementsComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.css":
/*!******************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.css ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "textarea {\r\n    height: 120px;\r\n}\r\n.achievementCategory-help\r\n{\r\n        display: flex;\r\n    margin-top: -15px;\r\n    margin-bottom: 3px;\r\n    background: #f3f3f3;\r\n    border-radius: 5px;\r\n    text-align: center;\r\n    justify-content: center;\r\n    padding: 1px;\r\n    color: #222d32;\r\n    align-items: center;\r\n}\r\n.achievementCategory-help .mat-icon {\r\n    margin-left: 5px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2FjaGlldmVtZW50cy9hZGQtdXBkYXRlLWFjaGlldmVtZW50cy9hZGQtdXBkYXRlLWFjaGlldmVtZW50cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtBQUNqQjtBQUNBOztRQUVRLGFBQWE7SUFDakIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGNBQWM7SUFDZCxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hY2hpZXZlbWVudHMvYWRkLXVwZGF0ZS1hY2hpZXZlbWVudHMvYWRkLXVwZGF0ZS1hY2hpZXZlbWVudHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRleHRhcmVhIHtcclxuICAgIGhlaWdodDogMTIwcHg7XHJcbn1cclxuLmFjaGlldmVtZW50Q2F0ZWdvcnktaGVscFxyXG57XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbi10b3A6IC0xNXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogM3B4O1xyXG4gICAgYmFja2dyb3VuZDogI2YzZjNmMztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMXB4O1xyXG4gICAgY29sb3I6ICMyMjJkMzI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5hY2hpZXZlbWVudENhdGVnb3J5LWhlbHAgLm1hdC1pY29uIHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: AddUpdateAchievementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateAchievementsComponent", function() { return AddUpdateAchievementsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/achievement-model */ "./src/app/Shared/Model/achievement-model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/achievement.service */ "./src/app/Shared/Service/achievement.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../Shared/Enum/adv-notification.enum */ "./src/app/Shared/Enum/adv-notification.enum.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Model_Master_achievement_category_master_model__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/Shared/Model/Master/achievement-category-master-model */ "./src/app/Shared/Model/Master/achievement-category-master-model.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_connect_with_cmis_dialog_connect_with_cmis_dialog_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/connect-with-cmis-dialog/connect-with-cmis-dialog.component */ "./src/app/connect-with-cmis-dialog/connect-with-cmis-dialog.component.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");























var AddUpdateAchievementsComponent = /** @class */ (function () {
    //#endregion
    //#region <<constructor>>
    function AddUpdateAchievementsComponent(fb, appComponnet, _commonService, _alertService, _router, _route, _achievementService, _authService, _userService, sanitizer, _dialog) {
        this.fb = fb;
        this.appComponnet = appComponnet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this._achievementService = _achievementService;
        this._authService = _authService;
        this._userService = _userService;
        this.sanitizer = sanitizer;
        this._dialog = _dialog;
        this.RecordId = 0;
        this.fileValidationMsg = "";
        this.tomorrow = new Date();
        this.ImagefileValidationMsg = "";
        this.isCMOCommentVisible = false;
        this.categoryCode = src_environments_environment__WEBPACK_IMPORTED_MODULE_22__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_21__["EbookletFilterProdEnum"].GeneralEntryEBookletCode : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_21__["EbookletFilterProdEnum"].GeneralEntryEBookletCodeLocal;
        this.moduleNameItems = {};
        this.yearItems = {};
        this.departmentItems = {};
        this.model = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_3__["AchievementPostModel"]();
        this.RecordId = this._route.snapshot.params.id;
        this.connectWithCMISModel = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_3__["AchievementConnectWithCMISParameterModel"]();
        if (this._router.url.includes("update-achievements-comment")) {
            this.isCMOCommentVisible = true;
        }
        if (this._router.url.includes("add-e-booklet") || this._router.url.includes("update-e-booklet")) {
            if (Object(util__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(this.model.AchievementCategoryCode)) {
                this.model.AchievementCategoryCode = String(this.categoryCode);
                //if (this.model.AchievementCategoryCode =='27') {
                this.catCode = this.model.AchievementCategoryCode;
                //}
            }
        }
        this.callBackUrl = this._route.snapshot.params.report;
        if (this.callBackUrl) {
            var datas = JSON.parse(sessionStorage.getItem("EntryInJankalyan"));
            this.appComponnet.setpagelayout("Update General Entry :", "keyboard_backspace", "Back To Entry In Jankalyan Report", "/master/" + this.callBackUrl + '/' + datas.DepartmentName + '/' + datas.ModuleName + '/' + datas.DepartmentCode + '/' + datas.ModuleId + (datas.IsDashBoard ? "/dsb/" : '/report/') + datas.NumberOfEntry);
        }
        else {
            this.achievementCategory = new src_app_Shared_Model_Master_achievement_category_master_model__WEBPACK_IMPORTED_MODULE_18__["AchievementCategoryModel"]();
            if (this.RecordId > 0) {
                this.appComponnet.setpagelayout(this.model.AchievementCategoryCode ? " Update E-Booklet " : " Update General-Multiple Entry", "keyboard_backspace", "Back To List", "advertisement/achievements");
            }
            else {
                this.appComponnet.setpagelayout(this.model.AchievementCategoryCode ? " Add E-Booklet " : " Add General-Multiple Entry", "keyboard_backspace", "Back To List", this.catCode == this.categoryCode ? '/advertisement/e-booklet/' + this.categoryCode : "advertisement/achievements");
            }
        }
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    }
    //#endregion
    //#region <<Method>>
    AddUpdateAchievementsComponent.prototype.ngOnInit = function () {
        this.getDDLList();
        this.formGroupInit();
        this.getDepartment();
        if (this.RecordId) {
            this.getDetail();
        }
        this.Getcategorybydepartmentcode(0);
    };
    AddUpdateAchievementsComponent.prototype.getDetail = function () {
        var _this = this;
        this._achievementService.Detail(this.RecordId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.model.DepartmentCode = String(data.Data.DepartmentCode);
                if (_this.model.DepartmentCode) {
                    _this.Getcategorybydepartmentcode(Number(_this.model.DepartmentCode));
                }
                if (_this.model.AchievementCategoryCode) {
                    _this.getDataByCategoryCode(Number(_this.model.AchievementCategoryCode), true);
                }
                _this.model.AchievementCategoryCode =
                    data.Data.AchievementCategoryCode || undefined !== undefined
                        ? String(data.Data.AchievementCategoryCode)
                        : undefined;
                _this.model.AchievementSubCategoryCode =
                    data.Data.AchievementSubCategoryCode || undefined !== undefined
                        ? String(data.Data.AchievementSubCategoryCode)
                        : undefined;
                _this.model.CMOComments =
                    data.Data.CMOComments || undefined !== undefined
                        ? data.Data.CMOComments
                        : undefined;
                //bind Subcategory based on category
                setTimeout(function () {
                    _this.getFilterdDDL(Number(_this.model.DepartmentCode), _this.model.AchievementCategoryCode);
                    var ctrlCategoryCode = _this.fromGroup.get("AchievementCategoryCode");
                    ctrlCategoryCode.disable();
                }, 200);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateAchievementsComponent.prototype.saveClick = function () {
        var _this = this;
        this.Autokeyword();
        this.fromGroup.markAllAsTouched();
        this.setCategoryDependentValidators();
        if (this.fromGroup.valid || (!this.fromGroup.get("ImageFiles").valid && this.model.ImageFiles != null && this.model.ImageFiles.length > 0)) {
            this.model.Achievement = this.model.AchievementHindi;
            this.model.Description = this.model.DescriptionHindi;
            if (this.RecordId > 0) {
                var prevDate_1 = this.model.AchievementDate;
                if (this.model.AchievementDate) {
                    this.model.AchievementDate = this.model.AchievementDate;
                }
                this.model.ModifiedBy = this.loginData.UserId;
                this._achievementService.Edit(this.RecordId, this.model).subscribe(function (data) {
                    if (data) {
                        if (data.IsSuccess) {
                            _this._alertService.success(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].updateSuccess, true);
                            if (_this.categoryCode == _this.model.AchievementCategoryCode) {
                                _this._router.navigate(["advertisement/e-booklet/" + _this.categoryCode]);
                            }
                            else {
                                _this._router.navigate(["advertisement/achievements"]);
                            }
                        }
                        else {
                            _this.model.AchievementDate = prevDate_1;
                            _this._commonService.ScrollingTop();
                            _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].updateError);
                        }
                    }
                }, function (error) {
                    _this.model.AchievementDate = prevDate_1;
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].InternalError);
                });
            }
            else {
                var prevDate_2 = this.model.AchievementDate;
                if (this.model.AchievementDate) {
                    this.model.AchievementDate = this.model.AchievementDate;
                }
                this.model.CreatedBy = this.loginData.UserId;
                this._achievementService.Add(this.model).subscribe(function (data) {
                    if (data) {
                        if (data.IsSuccess) {
                            _this._alertService.success(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].saveSuccess, true);
                            // this._router.navigate(["advertisement/achievements"]);
                            if (_this.categoryCode == _this.model.AchievementCategoryCode) {
                                _this._router.navigate(["advertisement/e-booklet/" + _this.categoryCode]);
                            }
                            else {
                                _this._router.navigate(["advertisement/achievements"]);
                            }
                        }
                        else {
                            _this.model.AchievementDate = prevDate_2;
                            _this._commonService.ScrollingTop();
                            _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].saveError);
                        }
                    }
                }, function (error) {
                    _this.model.AchievementDate = prevDate_2;
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].InternalError);
                });
            }
        }
    };
    AddUpdateAchievementsComponent.prototype.setCategoryDependentValidators = function () {
        if (this.achievementCategory.IsImageMandatory ||
            this.achievementCategory.IsPDFMandatory ||
            this.achievementCategory.IsURLMandatory) {
            if ((this.fromGroup.get("ImageFiles").valid && this.achievementCategory.IsImageMandatory) ||
                (this.fromGroup.get("PdfFIleName").valid && this.achievementCategory.IsPDFMandatory) ||
                (this.fromGroup.get("Url").valid && this.achievementCategory.IsURLMandatory)) {
                if (!this.fromGroup.get("ImageFiles").valid) {
                    this.fromGroup.get("ImageFiles").setValidators(null);
                }
                if (!this.fromGroup.get("PdfFIleName").valid) {
                    this.fromGroup.get("PdfFIleName").setValidators(null);
                }
                if (!this.fromGroup.get("Url").valid) {
                    this.fromGroup.get("Url").setValidators(null);
                }
                this.fromGroup.get("Url").updateValueAndValidity();
                this.fromGroup.get("PdfFIleName").updateValueAndValidity();
                this.fromGroup.get("ImageFiles").updateValueAndValidity();
            }
        }
    };
    AddUpdateAchievementsComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateAchievementsComponent.prototype.getDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].DDlKeyForAchievement).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                if (_this.dDLList.ddlOrderModuleName) {
                    _this.dDLList.ddlOrderModuleName.forEach(function (obj) {
                        _this.moduleNameItems[obj.Value] = obj.Text;
                    });
                }
                if (_this.dDLList.ddlCMISBudgetYear) {
                    _this.dDLList.ddlCMISBudgetYear.forEach(function (obj) {
                        _this.yearItems[obj.Value] = obj.Text;
                    });
                }
                _this.dDLList.ddlDepartmentForCMISReport.forEach(function (obj) {
                    _this.departmentItems[obj.Value] = obj.Text;
                });
            }
        }, function (error) {
            _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].InternalError);
        });
    };
    AddUpdateAchievementsComponent.prototype.numberOnly = function (value, isCommaOrDash) {
        if (isCommaOrDash === void 0) { isCommaOrDash = false; }
        return this._commonService.numberOnly(value, isCommaOrDash);
    };
    AddUpdateAchievementsComponent.prototype.handleFileInput = function (event) {
        var _this = this;
        var fileMime = event.target.files.item(0).type;
        if (fileMime.match("application/pdf")
            || fileMime.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || fileMime.match("application/msword")
            || fileMime.match("application/vnd.openxmlformats-officedocument.presentationml.presentation") || fileMime.match("application/vnd.ms-powerpoint")) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.PDFFile = _this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
                _this.model.PdfFIleName = event.target.result;
            };
            reader.readAsDataURL(event.target.files.item(0));
            this.fileValidationMsg = "";
        }
        else {
            this.fileValidationMsg = "File not supported...!";
        }
    };
    AddUpdateAchievementsComponent.prototype.UrlValidator = function (url) {
        if (url.pristine) {
            return null;
        }
        var URL_REGEXP = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
        url.markAsTouched();
        if (URL_REGEXP.test(url.value)) {
            return null;
        }
        return {
            invalidUrl: true
        };
    };
    AddUpdateAchievementsComponent.prototype.formGroupInit = function () {
        this.fromGroup = this.fb.group({
            Achievement: [null, null],
            AchievementHindi: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(4000)])],
            DepartmentCode: [undefined, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            CMOComments: [undefined, null],
            KeyWord: [null, null],
            AchievementCategoryCode: [undefined, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            AchievementSubCategoryCode: [undefined, null],
            Description: [undefined, null],
            DescriptionHindi: [undefined, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(4000)])],
            Priority: [undefined, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(3)])],
            Url: [undefined, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(1000), this.UrlValidator])],
            IsVisible: [null, null],
            AchievementDate: [null, null],
            PdfFIleName: [undefined, null],
            ImageFiles: [undefined, null],
            CreatedBy: [null, null],
            ModifiedBy: [undefined, null],
            CreatedDate: [undefined, null],
            ModifiedDate: [undefined, null],
            YearValueConnectWithCMIS: [null],
            DepartmentIdConnectWithCMIS: [null],
            ModuleIdConnectWithCMIS: [null],
            BenificiaryList: [null]
        });
    };
    AddUpdateAchievementsComponent.prototype.Autokeyword = function () {
        var department = this.getDDLTextByCode("ddlDepartment", this.model.DepartmentCode);
        var category = this.getDDLTextByCode("ddlAchievementCategory", this.model.AchievementCategoryCode);
        var subcategory = "";
        if (this.model.AchievementSubCategoryCode) {
            subcategory = this.getDDLTextByCode("ddlAchievementSubCategory", this.model.AchievementSubCategoryCode != null
                ? this.model.AchievementSubCategoryCode
                : 0);
        }
        this.model.AutoKeyWord =
            department +
                " " +
                category +
                " " +
                subcategory +
                " " +
                this.model.AchievementHindi +
                " " +
                this.model.Url +
                " " +
                this.model.Url +
                " " +
                this.model.DescriptionHindi +
                " " +
                this.model.CMOComments +
                " " +
                this.model.KeyWord;
    };
    AddUpdateAchievementsComponent.prototype.getDDLTextByCode = function (ddlKey, code) {
        switch (ddlKey.toLowerCase()) {
            case "ddldepartment": {
                var temp = this.dDLList.ddlDepartment.find(function (x) { return x.Value == code; });
                if (temp) {
                    return temp.Text;
                }
                else {
                    return "";
                }
            }
            case "ddlachievementcategory": {
                var temp = this.dDLList.ddlAchievementCategory.find(function (x) { return x.Value == code; });
                if (temp) {
                    return temp.Text;
                }
                else {
                    return "";
                }
            }
            case "ddlachievementsubcategory": {
                var temp = this.dDLList.ddlAchievementSubCategory.find(function (x) { return x.Value == code; });
                if (temp) {
                    return temp.Text;
                }
                else {
                    return "";
                }
            }
        }
    };
    // getddlFilterd(event, key, filterFrom, defaultValue = undefined) {
    //   
    //   const item = new FilterDDlModel();
    //   item.FilterFor = key;
    //   item.Value =
    //     event.multiple == true
    //       ? JSON.stringify(event.value)
    //       : (event.value || "") == ""
    //       ? ""
    //       : event.value;
    //   item.FilterFrom = filterFrom;
    //   this.filterDDlModel = [];
    //   this.filterDDlModel.push(item);
    //   this._commonService.GetFilterdDDL(this.filterDDlModel,this._authService.GetCurrentUserDetail.user).subscribe(
    //     (data) => {
    //       if (data.IsSuccess) {
    //         if (key == "ddlAchievementSubCategory") {
    //           this.model.AchievementSubCategoryCode = null;
    //           this.dDLList.ddlAchievementSubCategory =
    //             data.Data.ddlAchievementSubCategory;
    //           this.model.AchievementSubCategoryCode = defaultValue;
    //         }
    //       }
    //     },
    //     (error) => {
    //       this._alertService.error(error.message);
    //     }
    //   );
    // }
    AddUpdateAchievementsComponent.prototype.Getcategorybydepartmentcode = function (DepartmentCode) {
        var _this = this;
        if (DepartmentCode === void 0) { DepartmentCode = 0; }
        // if (DepartmentCode) {
        this._commonService.Getcategorybydepartmentcode(Number(DepartmentCode)).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlAchievementCategory = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateAchievementsComponent.prototype.getFilterdDDL = function (DepartmentCode, AchievementCategoryCode) {
        var _this = this;
        if (DepartmentCode === void 0) { DepartmentCode = 0; }
        if (this.model.AchievementCategoryCode) {
            this._commonService
                .GetsubcategoryList(Number(DepartmentCode), AchievementCategoryCode)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLList.ddlAchievementSubCategory = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.dDLList.ddlAchievementSubCategory = [];
        }
    };
    AddUpdateAchievementsComponent.prototype.checkUploadImages = function () {
        this.ImagefileValidationMsg = "";
        if (this.model.ImageFiles && this.model.ImageFiles.length > 0) {
            this.model.ImageFiles = [];
            this._alertService.error("Please upload images again according to selected category.");
        }
    };
    AddUpdateAchievementsComponent.prototype.handleImageFileInput = function (files) {
        var _this = this;
        this.ImagefileValidationMsg = "";
        this.Imeges = [];
        var bigFileCount = 0;
        var invalidImageCount = 0;
        var valid_Height = 0, valid_Width = 0;
        if (this.model.AchievementCategoryCode ==
            _Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__["AchievementCategoryEnum"].BannerImageCode) {
            valid_Height = parseInt(_Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__["AchievementCategoryEnum"].Banner_ImageHeight);
            valid_Width = parseInt(_Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__["AchievementCategoryEnum"].Banner_ImageWidth);
        }
        if (this.model.AchievementCategoryCode == _Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__["AchievementCategoryEnum"].AwardsCode) {
            valid_Height = parseInt(_Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__["AchievementCategoryEnum"].Awards_ImageHeight);
            valid_Width = parseInt(_Shared_Enum_adv_notification_enum__WEBPACK_IMPORTED_MODULE_16__["AchievementCategoryEnum"].Awards_ImageWidth);
        }
        var _loop_1 = function (index) {
            if (files.item(index).type.match("image/*")) {
                if (files.item(index).size < 6000000) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        var img = new Image();
                        var imgHeight = 0, imgWidth = 0;
                        img.src = reader_1.result;
                        img.onload = function () {
                            imgWidth = img.width;
                            imgHeight = img.height;
                            // Image dimension validation.
                            if (imgHeight >= valid_Height && imgWidth >= valid_Width) {
                                if (_this.model.ImageFiles == undefined) {
                                    _this.model.ImageFiles = [];
                                }
                                _this.model.ImageFiles.push(reader_1.result);
                                _this.Imeges.push(reader_1.result);
                            }
                            else {
                                invalidImageCount += 1;
                                _this.ImagefileValidationMsg =
                                    invalidImageCount +
                                        " file must have " +
                                        valid_Height +
                                        "*" +
                                        valid_Width +
                                        " (H*W) for selected category.";
                            }
                        };
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    bigFileCount += 1;
                    this_1.ImagefileValidationMsg =
                        bigFileCount + " File have more then 5MB Size";
                }
            }
            else {
                this_1.ImagefileValidationMsg = "only image/*";
                this_1.model.ImageFiles = [];
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (bigFileCount > 0 || invalidImageCount > 0) {
            return;
        }
    };
    AddUpdateAchievementsComponent.prototype.RemoveImageFile = function (i) {
        this.model.ImageFiles.splice(i, 1);
        this.Imeges.slice(i, 1);
    };
    AddUpdateAchievementsComponent.prototype.downloadFile = function (url, name) {
        if (url) {
            var mimeType = (url.split(';')[0]).split(":")[1];
            var ext = "";
            switch (mimeType) {
                case 'application/msword':
                    ext = ".doc";
                    break;
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    ext = ".docx";
                    break;
                case 'application/vnd.ms-powerpoint':
                    ext = ".ppt";
                    break;
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    ext = ".pptx";
                    break;
                case 'text/csv':
                    ext = ".csv";
                    break;
                default:
                    ext = ".pdf";
                    break;
            }
            var link = document.createElement("a");
            // link.setAttributes('')
            link.setAttribute("href", url);
            link.setAttribute("download", name + ext);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };
    AddUpdateAchievementsComponent.prototype.getDataByCategoryCode = function (code, isPageload) {
        var _this = this;
        if (isPageload === void 0) { isPageload = false; }
        if (!isPageload) {
            this.checkUploadImages();
            this.getFilterdDDL(this.model.DepartmentCode, this.model.AchievementCategoryCode);
        }
        this._commonService.GetAchievementCategoryByCode(code).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.achievementCategory = data.Data;
                if (_this.achievementCategory.IsImageMandatory) {
                    _this.fromGroup
                        .get("ImageFiles")
                        .setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
                }
                else {
                    _this.fromGroup.get("ImageFiles").setValidators(null);
                }
                if (_this.achievementCategory.IsPDFMandatory) {
                    _this.fromGroup
                        .get("PdfFIleName")
                        .setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
                }
                else {
                    _this.fromGroup.get("PdfFIleName").setValidators(null);
                }
                if (_this.achievementCategory.IsURLMandatory) {
                    _this.fromGroup
                        .get("Url")
                        .setValidators([
                        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(1000),
                            _this.UrlValidator
                        ])
                    ]);
                }
                else {
                    _this.fromGroup.get("Url").setValidators(null);
                }
                _this.fromGroup.get("Url").updateValueAndValidity();
                _this.fromGroup.get("PdfFIleName").updateValueAndValidity();
                _this.fromGroup.get("ImageFiles").updateValueAndValidity();
            }
        }, function (error) {
            _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_11__["GlobalMessagesModel"].InternalError);
        });
    };
    AddUpdateAchievementsComponent.prototype.OpenFile = function (url) {
        if (url) {
            var link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.setAttribute("href", url);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };
    //#endregion
    //#region <Connect With CMIS>
    AddUpdateAchievementsComponent.prototype.AddMoreItems = function () {
        if (this.connectWithCMISModel.ModuleId) {
            this.connectWithCMISModel.ModuleName = this.moduleNameItems[this.connectWithCMISModel.ModuleId];
        }
        if (this.connectWithCMISModel.YearValue) {
            this.connectWithCMISModel.YearText = this.yearItems[this.connectWithCMISModel.YearValue];
        }
        if (this.connectWithCMISModel.DepartmentId) {
            this.connectWithCMISModel.DepartmentName = this.departmentItems[this.connectWithCMISModel.DepartmentId];
        }
        this.model.ConnectWithCMIS.push(this.connectWithCMISModel);
        this.connectWithCMISModel = new src_app_Shared_Model_achievement_model__WEBPACK_IMPORTED_MODULE_3__["AchievementConnectWithCMISParameterModel"]();
    };
    AddUpdateAchievementsComponent.prototype.GetConnectWithCMISResult = function (ModuleName, DepartmentId, DepartmentName, YearText, index) {
        var _this = this;
        this.responseReqModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_19__["ConnectWithCMISFilterModel"]();
        if (YearText) {
            this.responseReqModel.YearText = YearText;
        }
        if (DepartmentName) {
            this.responseReqModel.DepartmentName = DepartmentName;
        }
        if (DepartmentId) {
            this.responseReqModel.Department = DepartmentId;
        }
        if (ModuleName) {
            this.responseReqModel.ModuleName = ModuleName;
        }
        this.responseReqModel.Index = index;
        var _dialogRef = this._dialog.open(src_app_connect_with_cmis_dialog_connect_with_cmis_dialog_component__WEBPACK_IMPORTED_MODULE_20__["ConnectWithCmisDialogComponent"], {
            width: "1000px",
            data: this.responseReqModel
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.model.ConnectWithCMIS[result.index].ConnectWithCMISResult = result.resultModel;
            }
        });
    };
    AddUpdateAchievementsComponent.prototype.RemoveConnectWithCMISClick = function (index) {
        this.model.ConnectWithCMIS.splice(index, 1);
    };
    AddUpdateAchievementsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_9__["AchievementService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_17__["UserService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["DomSanitizer"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialog"] }
    ]; };
    AddUpdateAchievementsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-add-update-achievements",
            template: __webpack_require__(/*! raw-loader!./add-update-achievements.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_13__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_13__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./add-update-achievements.component.css */ "./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_9__["AchievementService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_17__["UserService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["DomSanitizer"],
            _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialog"]])
    ], AddUpdateAchievementsComponent);
    return AddUpdateAchievementsComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hY2hpZXZlbWVudHMvZGV0YWlsLWFjaGlldmVtZW50cy9kZXRhaWwtYWNoaWV2ZW1lbnRzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: DetailAchievementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailAchievementsComponent", function() { return DetailAchievementsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/achievement.service */ "./src/app/Shared/Service/achievement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");






var DetailAchievementsComponent = /** @class */ (function () {
    //#endregion
    //#region constructor
    function DetailAchievementsComponent(_achievementService, _alertService, _route, _parentApi) {
        this._achievementService = _achievementService;
        this._alertService = _alertService;
        this._route = _route;
        this._parentApi = _parentApi;
        this.recordId = this._route.snapshot.params.id;
        this._parentApi.setpagelayout("Details General-Multiple Entry", "keyboard_backspace", "Back to list", "advertisement/achievements");
    }
    //#endregion
    //#region Method
    DetailAchievementsComponent.prototype.ngOnInit = function () {
        this.OnDataGetById(this.recordId);
    };
    DetailAchievementsComponent.prototype.OnDataGetById = function (id) {
        var _this = this;
        this._achievementService.Detail(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.detailModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DetailAchievementsComponent.prototype.downloadMyFile = function (temp) {
        var link = document.createElement("a");
        link.setAttribute("href", temp);
        link.setAttribute("download", "Documents");
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    DetailAchievementsComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_2__["AchievementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] }
    ]; };
    DetailAchievementsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-detail-achievements",
            template: __webpack_require__(/*! raw-loader!./detail-achievements.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.html"),
            styles: [__webpack_require__(/*! ./detail-achievements.component.css */ "./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_achievement_service__WEBPACK_IMPORTED_MODULE_2__["AchievementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]])
    ], DetailAchievementsComponent);
    return DetailAchievementsComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/add-advertisement/add-advertisement.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/content/advertisement/add-advertisement/add-advertisement.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNlbWVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/add-advertisement/add-advertisement.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/content/advertisement/add-advertisement/add-advertisement.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AddAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAdvertisementComponent", function() { return AddAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");











var AddAdvertisementComponent = /** @class */ (function () {
    function AddAdvertisementComponent(_alertService, _router, _advertismentService, _commonService, _parentApi) {
        this._alertService = _alertService;
        this._router = _router;
        this._advertismentService = _advertismentService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this.minDate = new Date();
        this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__["Advertisement"]();
        this._parentApi.setpagelayout("Add Advertisement :", "keyboard_backspace", "Back to List", "advertisement/");
        this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
    }
    AddAdvertisementComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    AddAdvertisementComponent.prototype.downloadMyFile = function (temp) {
        var link = document.createElement('a');
        link.setAttribute('href', temp);
        link.setAttribute('download', "Documents");
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    AddAdvertisementComponent.prototype.handleFileInput = function (event, ispdf) {
        var _this = this;
        if (ispdf === void 0) { ispdf = false; }
        if (ispdf) {
            if (event.target.files.item(0).type.match("application/pdf")) {
                if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.model.PdfUrl = event.target.result;
                    };
                    reader.readAsDataURL(event.target.files.item(0));
                    this.fileValidationMsg1 = "";
                    this.model.File = event.target.files.item(0);
                }
                else {
                    this.fileValidationMsg1 = this.fileSizeValidationMsg;
                }
            }
            else {
                this.fileValidationMsg1 = "only *pdf file accepted ";
            }
        }
        else {
            if (event.target.files.item(0).type.match("image/*")) {
                if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(0.1))) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.model.DocumentUrl = event.target.result;
                    };
                    reader.readAsDataURL(event.target.files.item(0));
                    this.fileValidationMsg = "";
                    this.model.File = event.target.files.item(0);
                }
                else {
                    this.fileValidationMsg = "Attachment must be less than 100 KB";
                }
            }
            else {
                this.fileValidationMsg = "only *images file accepted ";
            }
        }
    };
    AddAdvertisementComponent.prototype.SaveClick = function () {
        var _this = this;
        var prevDate = this.model.AdvDate;
        var prevExpDate = this.model.ExpiryDate;
        if (this.model.AdvDate) {
            this.model.AdvDate = this.model.AdvDate.toLocaleString();
        }
        if (this.model.ExpiryDate) {
            this.model.ExpiryDate = this.model.ExpiryDate.toLocaleString();
        }
        this._advertismentService.AddAdvertisement(this.model).subscribe(function (data) {
            if (data.IsSuccess) {
                _this._alertService.success(data.Message);
                _this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__["Advertisement"]();
                _this._router.navigate(["advertisement/"]);
            }
            else {
                _this.model.AdvDate = prevDate;
                _this.model.ExpiryDate = prevExpDate;
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            console.log(error);
            _this.model.AdvDate = prevDate;
            _this.model.ExpiryDate = prevExpDate;
            _this._alertService.error(error.message);
        });
    };
    AddAdvertisementComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].DDLKeyForAdvertisement).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddAdvertisementComponent.prototype.Numberonly = function (event) {
        return this._commonService.numberOnly(event);
    };
    AddAdvertisementComponent.prototype.RemoveImage = function () {
        this.model.DocumentUrl = null;
    };
    AddAdvertisementComponent.prototype.RemovePdf = function () {
        this.model.PdfUrl = null;
    };
    AddAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"] }
    ]; };
    AddAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-add-advertisement",
            template: __webpack_require__(/*! raw-loader!./add-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/add-advertisement/add-advertisement.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_9__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_10__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_9__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_10__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./add-advertisement.component.css */ "./src/app/content/advertisement/add-advertisement/add-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]])
    ], AddAdvertisementComponent);
    return AddAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.css":
/*!***********************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.css ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hZHYtbGlzdC1mb3ItYWRtaW5kZXBhcnRtZW50LWRlcGFydG1lbnQtdXNlci9hZHYtbGlzdC1mb3ItYWRtaW5kZXBhcnRtZW50LWRlcGFydG1lbnQtdXNlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.ts":
/*!**********************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.ts ***!
  \**********************************************************************************************************************************************/
/*! exports provided: AdvListForAdmindepartmentDepartmentUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvListForAdmindepartmentDepartmentUserComponent", function() { return AdvListForAdmindepartmentDepartmentUserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");









var AdvListForAdmindepartmentDepartmentUserComponent = /** @class */ (function () {
    function AdvListForAdmindepartmentDepartmentUserComponent(_advertisementService, _alertService, _parentApi, _dialog) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.isApprovalUser = false;
        this._parentApi.setpagelayout('Advertisement List For Users :', '', '', '');
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_8__["IndexModel"]();
    }
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.IsExpired = function (date) {
        if (date) {
            if (new Date(date).getTime() < new Date().getTime()) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.downloadPdf = function (Url) {
        var downloadLink = document.createElement('a');
        downloadLink.href = Url;
        downloadLink.download = 'Adv-Image';
        downloadLink.click();
    };
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.GetList = function () {
        var _this = this;
        this._advertisementService.GetAdvListForAdminDepartmentDepartmentPlatformUser(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                if (_this.listModel.length > 0) {
                    _this.isApprovalUser = _this.listModel[0].IsApprovalUserOrNot;
                    if (_this.isApprovalUser) {
                        _this.displayedColumns = ['index', 'SubjectEng', "DocumentUrl", 'Expired', 'RequestedStatus', 'IsApprovedStatus', 'IsUploadedStatus', 'Action'];
                    }
                    else {
                        _this.displayedColumns = ['index', 'SubjectEng', "DocumentUrl", 'Expired', 'IsUploadedStatus', 'Action'];
                    }
                    _this.columnsToDisplay = _this.displayedColumns.slice();
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.listModel);
                if (!_this.indexModel.IsPostBack) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.SortData = function (event) {
        this.indexModel.IsPostBack = true;
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByDsc;
        this.GetList();
    };
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.IsPostBack = true;
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.GetList();
    };
    AdvListForAdmindepartmentDepartmentUserComponent.prototype.UploadedClick = function (id) {
        var _this = this;
        this.uploadedId = id;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_7__["ConfirmationDialogComponent"], {
            width: '350px',
            data: 'Are you sure! You have uploaded this advertisement on your portal'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._advertisementService.UploadedService(_this.uploadedId).subscribe(function (data) {
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
    };
    AdvListForAdmindepartmentDepartmentUserComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], AdvListForAdmindepartmentDepartmentUserComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], AdvListForAdmindepartmentDepartmentUserComponent.prototype, "sort", void 0);
    AdvListForAdmindepartmentDepartmentUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-adv-list-for-admindepartment-department-user',
            template: __webpack_require__(/*! raw-loader!./adv-list-for-admindepartment-department-user.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.html"),
            providers: [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"]],
            styles: [__webpack_require__(/*! ./adv-list-for-admindepartment-department-user.component.css */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], AdvListForAdmindepartmentDepartmentUserComponent);
    return AdvListForAdmindepartmentDepartmentUserComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.css":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.css ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hZHYtbGlzdC1mb3ItYWRtaW5kZXBhcnRtZW50LWRlcGFydG1lbnQtdXNlci9kb3dubG9hZC1hZHZlcnRpc2VtZW50L2FkdmVydGlzZW1lbnQtcmF3ZGF0YS9hZHZlcnRpc2VtZW50LXJhd2RhdGEuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.ts":
/*!********************************************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.ts ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: AdvertisementRawdataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementRawdataComponent", function() { return AdvertisementRawdataComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var AdvertisementRawdataComponent = /** @class */ (function () {
    function AdvertisementRawdataComponent(_dialogRef, data) {
        this._dialogRef = _dialogRef;
        this.data = data;
        if (data) {
            this.rawData = data;
            this.temp = JSON.stringify(this.rawData);
        }
    }
    AdvertisementRawdataComponent.prototype.ngOnInit = function () {
    };
    AdvertisementRawdataComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AdvertisementRawdataComponent.prototype.copyInputMessage = function (inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    };
    AdvertisementRawdataComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AdvertisementRawdataComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-advertisement-rawdata',
            template: __webpack_require__(/*! raw-loader!./advertisement-rawdata.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.html"),
            styles: [__webpack_require__(/*! ./advertisement-rawdata.component.css */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], AdvertisementRawdataComponent);
    return AdvertisementRawdataComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.css":
/*!************************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.css ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9hZHYtbGlzdC1mb3ItYWRtaW5kZXBhcnRtZW50LWRlcGFydG1lbnQtdXNlci9kb3dubG9hZC1hZHZlcnRpc2VtZW50L2Rvd25sb2FkLWFkdmVydGlzZW1lbnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.ts":
/*!***********************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.ts ***!
  \***********************************************************************************************************************************************/
/*! exports provided: DownloadAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadAdvertisementComponent", function() { return DownloadAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _advertisement_rawdata_advertisement_rawdata_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./advertisement-rawdata/advertisement-rawdata.component */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.ts");









var DownloadAdvertisementComponent = /** @class */ (function () {
    function DownloadAdvertisementComponent(_advertisementService, _alertService, _dialog, _route, _parentApi) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._dialog = _dialog;
        this._route = _route;
        this._parentApi = _parentApi;
        this.idModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__["AdvertisementRedesignRequestIdModel"]();
        var id = this._route.snapshot.params.id;
        this.idModel.AdvId = id;
        this._parentApi.setpagelayout("DownLoad Advertisement :", "keyboard_backspace", "Back to List", "/advertisement/advforadmindepartmentuserdepartment");
    }
    DownloadAdvertisementComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    DownloadAdvertisementComponent.prototype.GetById = function () {
        var _this = this;
        this._advertisementService.GetRedesignDetailForAdmin(this.idModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.resultModel = data.Data;
                _this.detailModel = _this.resultModel.AdvertisementList;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DownloadAdvertisementComponent.prototype.OpenRawData = function () {
        this._dialog.open(_advertisement_rawdata_advertisement_rawdata_component__WEBPACK_IMPORTED_MODULE_8__["AdvertisementRawdataComponent"], {
            width: "500px",
            data: this.detailModel
        });
    };
    DownloadAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] }
    ]; };
    DownloadAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-download-advertisement',
            template: __webpack_require__(/*! raw-loader!./download-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.html"),
            styles: [__webpack_require__(/*! ./download-advertisement.component.css */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]])
    ], DownloadAdvertisementComponent);
    return DownloadAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/advertisement.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/content/advertisement/advertisement.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\nmat-cell:last-of-type, mat-footer-cell:last-of-type, mat-header-cell:last-of-type {\r\n    padding-left: 0px !important;\r\n\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2FkdmVydGlzZW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSw0QkFBNEI7O0FBRWhDIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2FkdmVydGlzZW1lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5tYXQtY2VsbDpsYXN0LW9mLXR5cGUsIG1hdC1mb290ZXItY2VsbDpsYXN0LW9mLXR5cGUsIG1hdC1oZWFkZXItY2VsbDpsYXN0LW9mLXR5cGUge1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcclxuXHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/advertisement/advertisement.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/content/advertisement/advertisement.component.ts ***!
  \******************************************************************/
/*! exports provided: AdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementComponent", function() { return AdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");










var AdvertisementComponent = /** @class */ (function () {
    function AdvertisementComponent(_advertisementService, _alertService, _parentApi, _commonService) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._commonService = _commonService;
        this.displayedColumns = ["index", "SubjectEng", "SubjectHin", "ModifiedDate", "Status", "Lock", "Action"];
        this.ViewdisplayedColumns = [
            { Value: "SubjectEng", Text: "Subject English" },
            { Value: "SubjectHin", Text: "Subject Hindi" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/advertisement", "/advertisement/add", "/advertisement/detail", "/advertisement/update", "/advertisement/delete");
        this.Permission.AddPageAccess ? this._parentApi.setpagelayout(" Advertisement :", "", "", "") : this._parentApi.setpagelayout(" Advertisement :");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    AdvertisementComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    AdvertisementComponent.prototype.IsExpired = function (date) {
        if (date) {
            if (new Date(date).getTime() < new Date(Object(_angular_common__WEBPACK_IMPORTED_MODULE_9__["formatDate"])(new Date(), 'yyyy/MM/dd', 'en')).getTime()) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    AdvertisementComponent.prototype.GetList = function () {
        var _this = this;
        this._advertisementService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.AdvertisementList = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.AdvertisementList);
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
    AdvertisementComponent.prototype.AdverisementStatus = function (id) {
        var _this = this;
        this._advertisementService.ChangeActiveStatus(id).subscribe(function (data) {
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
    };
    AdvertisementComponent.prototype.PublishClick = function (id) {
        var _this = this;
        this._advertisementService.PublishAdvertisement(id).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.GetListByEvent();
                _this._alertService.success(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AdvertisementComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    AdvertisementComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    AdvertisementComponent.prototype.GetListByEvent = function () {
        var _this = this;
        this._advertisementService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.AdvertisementList = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.AdvertisementList);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AdvertisementComponent.prototype.lockClick = function (id) {
        var _this = this;
        this._advertisementService.LockToggle(id).subscribe(function (data) {
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
    };
    AdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], AdvertisementComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], AdvertisementComponent.prototype, "sort", void 0);
    AdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-advertisement",
            template: __webpack_require__(/*! raw-loader!./advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/advertisement.component.html"),
            providers: [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"]],
            styles: [__webpack_require__(/*! ./advertisement.component.css */ "./src/app/content/advertisement/advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], AdvertisementComponent);
    return AdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/advertisement.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/content/advertisement/advertisement.module.ts ***!
  \***************************************************************/
/*! exports provided: AdvertisementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementModule", function() { return AdvertisementModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _advertisementr_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./advertisementr-routing.module */ "./src/app/content/advertisement/advertisementr-routing.module.ts");
/* harmony import */ var _advertisement_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./advertisement.component */ "./src/app/content/advertisement/advertisement.component.ts");
/* harmony import */ var _detail_advertisement_detail_advertisement_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./detail-advertisement/detail-advertisement.component */ "./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.ts");
/* harmony import */ var _delete_advertisement_delete_advertisement_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delete-advertisement/delete-advertisement.component */ "./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.ts");
/* harmony import */ var _update_advertisement_update_advertisement_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./update-advertisement/update-advertisement.component */ "./src/app/content/advertisement/update-advertisement/update-advertisement.component.ts");
/* harmony import */ var _add_advertisement_add_advertisement_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./add-advertisement/add-advertisement.component */ "./src/app/content/advertisement/add-advertisement/add-advertisement.component.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _redesign_request_by_platform_user_redesign_request_by_platform_user_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./redesign-request-by-platform-user/redesign-request-by-platform-user.component */ "./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.ts");
/* harmony import */ var _redesign_request_for_admin_redesign_request_for_admin_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./redesign-request-for-admin/redesign-request-for-admin.component */ "./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.ts");
/* harmony import */ var _redesign_request_for_admin_request_detail_request_detail_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./redesign-request-for-admin/request-detail/request-detail.component */ "./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.ts");
/* harmony import */ var _redesign_request_for_admin_redesign_approve_dialog_redesign_approve_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component */ "./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.ts");
/* harmony import */ var _adv_list_for_admindepartment_department_user_adv_list_for_admindepartment_department_user_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.ts");
/* harmony import */ var _adv_list_for_admindepartment_department_user_download_advertisement_download_advertisement_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.ts");
/* harmony import */ var _adv_list_for_admindepartment_department_user_download_advertisement_advertisement_rawdata_advertisement_rawdata_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component.ts");
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-json-viewer */ "./node_modules/ngx-json-viewer/ngx-json-viewer.es5.js");
/* harmony import */ var _govermentt_achivement_or_advertisement_govermentt_achivement_or_advertisement_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component */ "./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.ts");
/* harmony import */ var _achievements_achievements_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./achievements/achievements.component */ "./src/app/content/advertisement/achievements/achievements.component.ts");
/* harmony import */ var _achievements_detail_achievements_detail_achievements_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./achievements/detail-achievements/detail-achievements.component */ "./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.ts");
/* harmony import */ var _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./achievements/add-update-achievements/add-update-achievements.component */ "./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.ts");
/* harmony import */ var _visitor_counter_report_visitor_counter_report_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./visitor-counter-report/visitor-counter-report.component */ "./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.ts");
/* harmony import */ var _visitor_counter_detail_report_visitor_counter_detail_report_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./visitor-counter-detail-report/visitor-counter-detail-report.component */ "./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.ts");
/* harmony import */ var _achievements_achievements_cat_summary_report_achievements_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./achievements/achievements-cat-summary-report/achievements-cat-summary-report.component */ "./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.ts");
/* harmony import */ var _jankalyan_advertisement_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./jankalyan-advertisement/jankalyan-advertisement.component */ "./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.ts");
/* harmony import */ var _jankalyan_advertisement_addupdate_jankalyan_advertisement_addupdate_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component */ "./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.ts");
/* harmony import */ var _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../scheme/scheme.module */ "./src/app/content/scheme/scheme.module.ts");
/* harmony import */ var _date_wise_visitor_count_report_date_wise_visitor_count_report_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./date-wise-visitor-count-report/date-wise-visitor-count-report.component */ "./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.ts");





























var AdvertisementModule = /** @class */ (function () {
    function AdvertisementModule() {
    }
    AdvertisementModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _add_advertisement_add_advertisement_component__WEBPACK_IMPORTED_MODULE_8__["AddAdvertisementComponent"],
                _advertisement_component__WEBPACK_IMPORTED_MODULE_4__["AdvertisementComponent"],
                _detail_advertisement_detail_advertisement_component__WEBPACK_IMPORTED_MODULE_5__["DetailAdvertisementComponent"],
                _delete_advertisement_delete_advertisement_component__WEBPACK_IMPORTED_MODULE_6__["DeleteAdvertisementComponent"],
                _update_advertisement_update_advertisement_component__WEBPACK_IMPORTED_MODULE_7__["UpdateAdvertisementComponent"],
                _redesign_request_by_platform_user_redesign_request_by_platform_user_component__WEBPACK_IMPORTED_MODULE_10__["RedesignRequestByPlatformUserComponent"],
                _redesign_request_for_admin_redesign_request_for_admin_component__WEBPACK_IMPORTED_MODULE_11__["RedesignRequestForAdminComponent"],
                _redesign_request_for_admin_request_detail_request_detail_component__WEBPACK_IMPORTED_MODULE_12__["RequestDetailComponent"],
                _redesign_request_for_admin_redesign_approve_dialog_redesign_approve_dialog_component__WEBPACK_IMPORTED_MODULE_13__["RedesignApproveDialogComponent"],
                _adv_list_for_admindepartment_department_user_adv_list_for_admindepartment_department_user_component__WEBPACK_IMPORTED_MODULE_14__["AdvListForAdmindepartmentDepartmentUserComponent"],
                _adv_list_for_admindepartment_department_user_download_advertisement_download_advertisement_component__WEBPACK_IMPORTED_MODULE_15__["DownloadAdvertisementComponent"],
                _adv_list_for_admindepartment_department_user_download_advertisement_advertisement_rawdata_advertisement_rawdata_component__WEBPACK_IMPORTED_MODULE_16__["AdvertisementRawdataComponent"],
                _govermentt_achivement_or_advertisement_govermentt_achivement_or_advertisement_component__WEBPACK_IMPORTED_MODULE_18__["GovermenttAchivementOrAdvertisementComponent"],
                _achievements_achievements_component__WEBPACK_IMPORTED_MODULE_19__["AchievementsComponent"],
                _achievements_detail_achievements_detail_achievements_component__WEBPACK_IMPORTED_MODULE_20__["DetailAchievementsComponent"],
                _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_21__["AddUpdateAchievementsComponent"],
                _visitor_counter_report_visitor_counter_report_component__WEBPACK_IMPORTED_MODULE_22__["VisitorCounterReportComponent"],
                _visitor_counter_detail_report_visitor_counter_detail_report_component__WEBPACK_IMPORTED_MODULE_23__["VisitorCounterDetailReportComponent"],
                _achievements_achievements_cat_summary_report_achievements_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_24__["AchievementsCatSummaryReportComponent"],
                _jankalyan_advertisement_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_25__["JankalyanAdvertisementComponent"],
                _jankalyan_advertisement_addupdate_jankalyan_advertisement_addupdate_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_26__["AddupdateJankalyanAdvertisementComponent"],
                _date_wise_visitor_count_report_date_wise_visitor_count_report_component__WEBPACK_IMPORTED_MODULE_28__["DateWiseVisitorCountReportComponent"],
            ],
            entryComponents: [_redesign_request_for_admin_redesign_approve_dialog_redesign_approve_dialog_component__WEBPACK_IMPORTED_MODULE_13__["RedesignApproveDialogComponent"], _adv_list_for_admindepartment_department_user_download_advertisement_advertisement_rawdata_advertisement_rawdata_component__WEBPACK_IMPORTED_MODULE_16__["AdvertisementRawdataComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], ngx_json_viewer__WEBPACK_IMPORTED_MODULE_17__["NgxJsonViewerModule"], _advertisementr_routing_module__WEBPACK_IMPORTED_MODULE_3__["AdvertisementrRoutingModule"], src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_9__["AppMaterialModule"], _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_27__["SchemeModule"]]
        })
    ], AdvertisementModule);
    return AdvertisementModule;
}());



/***/ }),

/***/ "./src/app/content/advertisement/advertisementr-routing.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/content/advertisement/advertisementr-routing.module.ts ***!
  \************************************************************************/
/*! exports provided: AdvertisementrRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvertisementrRoutingModule", function() { return AdvertisementrRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _advertisement_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./advertisement.component */ "./src/app/content/advertisement/advertisement.component.ts");
/* harmony import */ var _add_advertisement_add_advertisement_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-advertisement/add-advertisement.component */ "./src/app/content/advertisement/add-advertisement/add-advertisement.component.ts");
/* harmony import */ var _update_advertisement_update_advertisement_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./update-advertisement/update-advertisement.component */ "./src/app/content/advertisement/update-advertisement/update-advertisement.component.ts");
/* harmony import */ var _detail_advertisement_detail_advertisement_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./detail-advertisement/detail-advertisement.component */ "./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.ts");
/* harmony import */ var _delete_advertisement_delete_advertisement_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./delete-advertisement/delete-advertisement.component */ "./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.ts");
/* harmony import */ var _redesign_request_by_platform_user_redesign_request_by_platform_user_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./redesign-request-by-platform-user/redesign-request-by-platform-user.component */ "./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.ts");
/* harmony import */ var _redesign_request_for_admin_redesign_request_for_admin_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./redesign-request-for-admin/redesign-request-for-admin.component */ "./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.ts");
/* harmony import */ var _redesign_request_for_admin_request_detail_request_detail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./redesign-request-for-admin/request-detail/request-detail.component */ "./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.ts");
/* harmony import */ var _adv_list_for_admindepartment_department_user_adv_list_for_admindepartment_department_user_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component.ts");
/* harmony import */ var _adv_list_for_admindepartment_department_user_download_advertisement_download_advertisement_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component */ "./src/app/content/advertisement/adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component.ts");
/* harmony import */ var _govermentt_achivement_or_advertisement_govermentt_achivement_or_advertisement_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component */ "./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.ts");
/* harmony import */ var _achievements_achievements_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./achievements/achievements.component */ "./src/app/content/advertisement/achievements/achievements.component.ts");
/* harmony import */ var _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./achievements/add-update-achievements/add-update-achievements.component */ "./src/app/content/advertisement/achievements/add-update-achievements/add-update-achievements.component.ts");
/* harmony import */ var _achievements_detail_achievements_detail_achievements_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./achievements/detail-achievements/detail-achievements.component */ "./src/app/content/advertisement/achievements/detail-achievements/detail-achievements.component.ts");
/* harmony import */ var _visitor_counter_report_visitor_counter_report_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./visitor-counter-report/visitor-counter-report.component */ "./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.ts");
/* harmony import */ var _visitor_counter_detail_report_visitor_counter_detail_report_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./visitor-counter-detail-report/visitor-counter-detail-report.component */ "./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.ts");
/* harmony import */ var _achievements_achievements_cat_summary_report_achievements_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./achievements/achievements-cat-summary-report/achievements-cat-summary-report.component */ "./src/app/content/advertisement/achievements/achievements-cat-summary-report/achievements-cat-summary-report.component.ts");
/* harmony import */ var _jankalyan_advertisement_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./jankalyan-advertisement/jankalyan-advertisement.component */ "./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.ts");
/* harmony import */ var _jankalyan_advertisement_addupdate_jankalyan_advertisement_addupdate_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component */ "./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.ts");
/* harmony import */ var _date_wise_visitor_count_report_date_wise_visitor_count_report_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./date-wise-visitor-count-report/date-wise-visitor-count-report.component */ "./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.ts");
























var routes = [
    {
        path: "",
        component: _advertisement_component__WEBPACK_IMPORTED_MODULE_4__["AdvertisementComponent"],
    },
    {
        path: "add",
        component: _add_advertisement_add_advertisement_component__WEBPACK_IMPORTED_MODULE_5__["AddAdvertisementComponent"],
    },
    {
        path: "update/:id",
        component: _update_advertisement_update_advertisement_component__WEBPACK_IMPORTED_MODULE_6__["UpdateAdvertisementComponent"],
    },
    {
        path: "detail/:id",
        component: _detail_advertisement_detail_advertisement_component__WEBPACK_IMPORTED_MODULE_7__["DetailAdvertisementComponent"],
    },
    {
        path: "delete/:id",
        component: _delete_advertisement_delete_advertisement_component__WEBPACK_IMPORTED_MODULE_8__["DeleteAdvertisementComponent"],
    },
    {
        path: "redesignrequestbyuser/:id",
        component: _redesign_request_by_platform_user_redesign_request_by_platform_user_component__WEBPACK_IMPORTED_MODULE_9__["RedesignRequestByPlatformUserComponent"],
    },
    {
        path: "redesignrequestforadmin",
        component: _redesign_request_for_admin_redesign_request_for_admin_component__WEBPACK_IMPORTED_MODULE_10__["RedesignRequestForAdminComponent"],
    },
    {
        path: "redesigndetailforadmin/:id",
        component: _redesign_request_for_admin_request_detail_request_detail_component__WEBPACK_IMPORTED_MODULE_11__["RequestDetailComponent"],
    },
    {
        path: "advforadmindepartmentuserdepartment",
        component: _adv_list_for_admindepartment_department_user_adv_list_for_admindepartment_department_user_component__WEBPACK_IMPORTED_MODULE_12__["AdvListForAdmindepartmentDepartmentUserComponent"],
    },
    {
        path: "downloadadvertisement/:id",
        component: _adv_list_for_admindepartment_department_user_download_advertisement_download_advertisement_component__WEBPACK_IMPORTED_MODULE_13__["DownloadAdvertisementComponent"],
    },
    {
        path: "GovermenttAchivementOrAdvertisement",
        component: _govermentt_achivement_or_advertisement_govermentt_achivement_or_advertisement_component__WEBPACK_IMPORTED_MODULE_14__["GovermenttAchivementOrAdvertisementComponent"],
    },
    {
        path: "achievements",
        component: _achievements_achievements_component__WEBPACK_IMPORTED_MODULE_15__["AchievementsComponent"],
    },
    {
        path: "e-booklet/:catCode",
        component: _achievements_achievements_component__WEBPACK_IMPORTED_MODULE_15__["AchievementsComponent"],
    },
    {
        path: "add-e-booklet",
        component: _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__["AddUpdateAchievementsComponent"],
    },
    {
        path: "update-e-booklet/:id",
        component: _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__["AddUpdateAchievementsComponent"],
    },
    {
        path: "achievements/detail/:id",
        component: _achievements_detail_achievements_detail_achievements_component__WEBPACK_IMPORTED_MODULE_17__["DetailAchievementsComponent"],
    },
    {
        path: "achievements/add-achievements",
        component: _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__["AddUpdateAchievementsComponent"],
    },
    {
        path: "achievements/update-achievements/:id",
        component: _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__["AddUpdateAchievementsComponent"],
    },
    {
        path: "achievements/update-achievements/:id/:report",
        component: _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__["AddUpdateAchievementsComponent"],
    },
    {
        path: "achievements/update-achievements-comment/:id",
        component: _achievements_add_update_achievements_add_update_achievements_component__WEBPACK_IMPORTED_MODULE_16__["AddUpdateAchievementsComponent"],
    },
    {
        path: "visitorcounterreport",
        component: _visitor_counter_report_visitor_counter_report_component__WEBPACK_IMPORTED_MODULE_18__["VisitorCounterReportComponent"],
    },
    {
        path: "visitorcounterdetailreport",
        component: _visitor_counter_detail_report_visitor_counter_detail_report_component__WEBPACK_IMPORTED_MODULE_19__["VisitorCounterDetailReportComponent"],
    },
    {
        path: "date-wise-visitor-count-report",
        component: _date_wise_visitor_count_report_date_wise_visitor_count_report_component__WEBPACK_IMPORTED_MODULE_23__["DateWiseVisitorCountReportComponent"],
    },
    {
        path: "achievementcatsummaryreport",
        component: _achievements_achievements_cat_summary_report_achievements_cat_summary_report_component__WEBPACK_IMPORTED_MODULE_20__["AchievementsCatSummaryReportComponent"],
    },
    {
        path: "jankalyan-advertisement",
        component: _jankalyan_advertisement_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_21__["JankalyanAdvertisementComponent"],
    },
    {
        path: "jankalyan-advertisement/add-jankalyan-advertisement",
        component: _jankalyan_advertisement_addupdate_jankalyan_advertisement_addupdate_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_22__["AddupdateJankalyanAdvertisementComponent"],
    },
    {
        path: "jankalyan-advertisement/update-jankalyan-advertisement/:id",
        component: _jankalyan_advertisement_addupdate_jankalyan_advertisement_addupdate_jankalyan_advertisement_component__WEBPACK_IMPORTED_MODULE_22__["AddupdateJankalyanAdvertisementComponent"],
    },
];
var AdvertisementrRoutingModule = /** @class */ (function () {
    function AdvertisementrRoutingModule() {
    }
    AdvertisementrRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]],
        })
    ], AdvertisementrRoutingModule);
    return AdvertisementrRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.css":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9kYXRlLXdpc2UtdmlzaXRvci1jb3VudC1yZXBvcnQvZGF0ZS13aXNlLXZpc2l0b3ItY291bnQtcmVwb3J0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: DateWiseVisitorCountReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateWiseVisitorCountReportComponent", function() { return DateWiseVisitorCountReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");











var DateWiseVisitorCountReportComponent = /** @class */ (function () {
    function DateWiseVisitorCountReportComponent(_alertService, _advertisementService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._advertisementService = _advertisementService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = ["index", "CreatedDate", "VisitorCount"];
        this.ViewdisplayedColumns = [
            { Value: "CreatedDate", Text: "Date" },
            { Value: "VisitorCount", Text: "Website Popup Counter" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.indexModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__["AdvertisementReportSearchModel"]();
        this._parentComponent.setpagelayout("Date Wise Frequency Of Popup :", "", "", "");
    }
    DateWiseVisitorCountReportComponent.prototype.ngOnInit = function () {
    };
    DateWiseVisitorCountReportComponent.prototype.GetList = function () {
        //this.indexModel.OrderBy = 'VisitorCount';
        //this.indexModel.OrderByAsc = 0;
        var _this = this;
        this._advertisementService.GetDateWiseVisitorCountReportList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DateWiseVisitorCountReportComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel.map(function (t) { return t.VisitorCount; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    DateWiseVisitorCountReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("test").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    DateWiseVisitorCountReportComponent.prototype.searchClick = function () {
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
    DateWiseVisitorCountReportComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__["AdvertisementReportSearchModel"]();
        this.indexModel.FromDate = null;
        this.indexModel.ToDate = null;
        this.dataSource = null;
        this.listModel = null;
    };
    DateWiseVisitorCountReportComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DateWiseVisitorCountReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_7__["AdvertisementService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], DateWiseVisitorCountReportComponent.prototype, "sort", void 0);
    DateWiseVisitorCountReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-date-wise-visitor-count-report',
            template: __webpack_require__(/*! raw-loader!./date-wise-visitor-count-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.html"),
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"],
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./date-wise-visitor-count-report.component.css */ "./src/app/content/advertisement/date-wise-visitor-count-report/date-wise-visitor-count-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_7__["AdvertisementService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], DateWiseVisitorCountReportComponent);
    return DateWiseVisitorCountReportComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9kZWxldGUtYWR2ZXJ0aXNlbWVudC9kZWxldGUtYWR2ZXJ0aXNlbWVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: DeleteAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteAdvertisementComponent", function() { return DeleteAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");









var DeleteAdvertisementComponent = /** @class */ (function () {
    function DeleteAdvertisementComponent(_advertisementService, _router, _commonService, _alertService, _route, _parentApi, _dialog) {
        this._advertisementService = _advertisementService;
        this._router = _router;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._route = _route;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.id = this._route.snapshot.params.id;
        this._parentApi.setpagelayout("Delete Advertisement :", "keyboard_backspace", "Back to list", "advertisement/");
    }
    DeleteAdvertisementComponent.prototype.ngOnInit = function () {
        this.OnDataGetById();
    };
    DeleteAdvertisementComponent.prototype.OnDataGetById = function () {
        var _this = this;
        this._advertisementService.GetById(this.id).subscribe(function (data) {
            if ((data.IsSuccess))
                _this.detailModel = data.Data;
            // if (this.detailModel.DocumentUrl) {
            //   this.detailModel.DocumentUrl = AppSetting.advimagebasepath + this.detailModel.DocumentUrl;
            // }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DeleteAdvertisementComponent.prototype.Delete = function () {
        var _this = this;
        this._advertisementService.DeleteAdvertisement(this.id).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this._router.navigate(['/advertisement']);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DeleteAdvertisementComponent.prototype.OnDelete = function () {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you sure! want to delete this record?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.Delete();
            }
        });
    };
    DeleteAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] }
    ]; };
    DeleteAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-delete-advertisement',
            template: __webpack_require__(/*! raw-loader!./delete-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.html"),
            styles: [__webpack_require__(/*! ./delete-advertisement.component.css */ "./src/app/content/advertisement/delete-advertisement/delete-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["AdvertisementService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]])
    ], DeleteAdvertisementComponent);
    return DeleteAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-h1, .mat-headline, .mat-typography h1 {\r\n    font: 400 20px/25px Roboto,\"Helvetica Neue\",sans-serif;\r\n    \r\n    }\r\n    .color-blue\r\n    {\r\n    color: #155ca1\r\n    }\r\n    .color-grey\r\n    {\r\n    color: #808080\r\n    }\r\n    .mat-h1, .mat-headline, .mat-typography h1, .mat-h4, .mat-subheading-1, .mat-typography h4, .mat-h3, .mat-subheading-2, .mat-typography h3\r\n    {\r\n    margin: 0 0 12px; \r\n    }\r\n    .detail-bx{ border: solid 1px #f1f1f1; padding: 25px;}\r\n    img{ max-width: 100%;}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L2RldGFpbC1hZHZlcnRpc2VtZW50L2RldGFpbC1hZHZlcnRpc2VtZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxzREFBc0Q7O0lBRXREO0lBQ0E7O0lBRUE7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTs7SUFFQSxnQkFBZ0I7SUFDaEI7SUFDQSxZQUFZLHlCQUF5QixFQUFFLGFBQWEsQ0FBQztJQUNyRCxLQUFLLGVBQWUsQ0FBQyIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9kZXRhaWwtYWR2ZXJ0aXNlbWVudC9kZXRhaWwtYWR2ZXJ0aXNlbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1oMSwgLm1hdC1oZWFkbGluZSwgLm1hdC10eXBvZ3JhcGh5IGgxIHtcclxuICAgIGZvbnQ6IDQwMCAyMHB4LzI1cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO1xyXG4gICAgXHJcbiAgICB9XHJcbiAgICAuY29sb3ItYmx1ZVxyXG4gICAge1xyXG4gICAgY29sb3I6ICMxNTVjYTFcclxuICAgIH1cclxuICAgIC5jb2xvci1ncmV5XHJcbiAgICB7XHJcbiAgICBjb2xvcjogIzgwODA4MFxyXG4gICAgfVxyXG4gICAgLm1hdC1oMSwgLm1hdC1oZWFkbGluZSwgLm1hdC10eXBvZ3JhcGh5IGgxLCAubWF0LWg0LCAubWF0LXN1YmhlYWRpbmctMSwgLm1hdC10eXBvZ3JhcGh5IGg0LCAubWF0LWgzLCAubWF0LXN1YmhlYWRpbmctMiwgLm1hdC10eXBvZ3JhcGh5IGgzXHJcbiAgICB7XHJcbiAgICBtYXJnaW46IDAgMCAxMnB4OyBcclxuICAgIH1cclxuICAgIC5kZXRhaWwtYnh7IGJvcmRlcjogc29saWQgMXB4ICNmMWYxZjE7IHBhZGRpbmc6IDI1cHg7fVxyXG4gICAgaW1neyBtYXgtd2lkdGg6IDEwMCU7fSJdfQ== */"

/***/ }),

/***/ "./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: DetailAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailAdvertisementComponent", function() { return DetailAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");






var DetailAdvertisementComponent = /** @class */ (function () {
    function DetailAdvertisementComponent(_advertisementService, _alertService, _route, _parentApi) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._route = _route;
        this._parentApi = _parentApi;
        this.id = this._route.snapshot.params.id;
        this._parentApi.setpagelayout("Details Advertisement :", "keyboard_backspace", "Back to list", "advertisement/");
    }
    DetailAdvertisementComponent.prototype.ngOnInit = function () {
        this.OnDataGetById(this.id);
    };
    DetailAdvertisementComponent.prototype.OnDataGetById = function (id) {
        var _this = this;
        this._advertisementService.GetById(id).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.detailModel = data.Data;
                // if (this.detailModel.DocumentUrl) {
                //   this.detailModel.DocumentUrl =this.detailModel.DocumentUrl;
                // }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DetailAdvertisementComponent.prototype.downloadMyFile = function (temp) {
        var link = document.createElement('a');
        link.setAttribute('href', temp);
        link.setAttribute('download', "Documents");
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    DetailAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] }
    ]; };
    DetailAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-detail-advertisement',
            template: __webpack_require__(/*! raw-loader!./detail-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.html"),
            styles: [__webpack_require__(/*! ./detail-advertisement.component.css */ "./src/app/content/advertisement/detail-advertisement/detail-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]])
    ], DetailAdvertisementComponent);
    return DetailAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.css":
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.css ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9nb3Zlcm1lbnR0LWFjaGl2ZW1lbnQtb3ItYWR2ZXJ0aXNlbWVudC9nb3Zlcm1lbnR0LWFjaGl2ZW1lbnQtb3ItYWR2ZXJ0aXNlbWVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.ts ***!
  \**********************************************************************************************************************************/
/*! exports provided: GovermenttAchivementOrAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GovermenttAchivementOrAdvertisementComponent", function() { return GovermenttAchivementOrAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var src_app_Shared_Service_goverment_achivement_or_advertisement_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/goverment-achivement-or-advertisement.service */ "./src/app/Shared/Service/goverment-achivement-or-advertisement.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");













var GovermenttAchivementOrAdvertisementComponent = /** @class */ (function () {
    function GovermenttAchivementOrAdvertisementComponent(_govermentAchivementOrAdvertisementService, _alertService, _router, _commonService, _parentApi) {
        this._govermentAchivementOrAdvertisementService = _govermentAchivementOrAdvertisementService;
        this._alertService = _alertService;
        this._router = _router;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this.AdvtPopupHeaderUrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]("");
        this.displayedColumns = [
            "index",
            "IsGovermentAndAdvertisement",
            "AdvtPopupHeaderUrl",
            "Action"
        ];
        this.GovermentAchivementOrAdvertisement = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]("", [
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required
        ]);
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentApi.setpagelayout("Set Popup For Websites : ", "", "", "");
        this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__["AdvertisementOrGovermentAchievementModel"]();
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    GovermenttAchivementOrAdvertisementComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    GovermenttAchivementOrAdvertisementComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.GovermentAchivementOrAdvertisement.valid) {
            if (this.model.Id > 0) {
                this._govermentAchivementOrAdvertisementService
                    .Edit(this.model)
                    .subscribe(function (data) {
                    if (data) {
                        if (data.IsSuccess) {
                            _this.GetList();
                            _this._alertService.success(data.Message);
                            _this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__["AdvertisementOrGovermentAchievementModel"]();
                            _this.GovermentAchivementOrAdvertisement.markAsUntouched();
                        }
                        else {
                            _this._commonService.ScrollingTop();
                            _this._alertService.error(data.Message);
                        }
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_10__["GlobalMessagesModel"].saveError);
                });
            }
            else {
                this._govermentAchivementOrAdvertisementService
                    .Add(this.model)
                    .subscribe(function (data) {
                    if (data) {
                        if (data.IsSuccess) {
                            _this.GetList();
                            _this._alertService.success(data.Message);
                            _this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__["AdvertisementOrGovermentAchievementModel"]();
                            _this.GovermentAchivementOrAdvertisement.markAsUntouched();
                        }
                        else {
                            _this._commonService.ScrollingTop();
                            _this._alertService.error(data.Message);
                        }
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_10__["GlobalMessagesModel"].saveError);
                });
            }
        }
    };
    GovermenttAchivementOrAdvertisementComponent.prototype.GetList = function () {
        var _this = this;
        this._govermentAchivementOrAdvertisementService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listmodel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](_this.listmodel);
                if (_this.indexModel.IsPostBack == false) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            //
            _this._alertService.error(error.message);
        });
    };
    GovermenttAchivementOrAdvertisementComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    GovermenttAchivementOrAdvertisementComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    GovermenttAchivementOrAdvertisementComponent.prototype.getByID = function (id) {
        var _this = this;
        this._govermentAchivementOrAdvertisementService.GetById(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.IsAdvertisementorGovermentAchivement) {
                    _this.model.IsAdvertisementorGovermentAchivement = String(_this.model.IsAdvertisementorGovermentAchivement);
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.error.ExceptionMessage);
        });
    };
    GovermenttAchivementOrAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_goverment_achivement_or_advertisement_service__WEBPACK_IMPORTED_MODULE_11__["GovermentAchivementOrAdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"])
    ], GovermenttAchivementOrAdvertisementComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"])
    ], GovermenttAchivementOrAdvertisementComponent.prototype, "sort", void 0);
    GovermenttAchivementOrAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-govermentt-achivement-or-advertisement",
            template: __webpack_require__(/*! raw-loader!./govermentt-achivement-or-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.html"),
            styles: [__webpack_require__(/*! ./govermentt-achivement-or-advertisement.component.css */ "./src/app/content/advertisement/govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_goverment_achivement_or_advertisement_service__WEBPACK_IMPORTED_MODULE_11__["GovermentAchivementOrAdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]])
    ], GovermenttAchivementOrAdvertisementComponent);
    return GovermenttAchivementOrAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.css":
/*!*************************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.css ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9qYW5rYWx5YW4tYWR2ZXJ0aXNlbWVudC9hZGR1cGRhdGUtamFua2FseWFuLWFkdmVydGlzZW1lbnQvYWRkdXBkYXRlLWphbmthbHlhbi1hZHZlcnRpc2VtZW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.ts ***!
  \************************************************************************************************************************************************/
/*! exports provided: AddupdateJankalyanAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdateJankalyanAdvertisementComponent", function() { return AddupdateJankalyanAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_jankalyan_advertisement_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/jankalyan-advertisement.service */ "./src/app/Shared/Service/jankalyan-advertisement.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Model_advtjankalyan_advertisement_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/advtjankalyan-advertisement-model */ "./src/app/Shared/Model/advtjankalyan-advertisement-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");












var AddupdateJankalyanAdvertisementComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddupdateJankalyanAdvertisementComponent(_parentApi, _JankalyanAdvertisementService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._JankalyanAdvertisementService = _JankalyanAdvertisementService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.model = new src_app_Shared_Model_advtjankalyan_advertisement_model__WEBPACK_IMPORTED_MODULE_10__["ADVTJankalyanAdvertisementModel"]();
        var id = this._route.snapshot.params.id;
        if (id) {
            this.model.Id = id;
            this.GetById();
            this._parentApi.setpagelayout("Update Jankalyan Advertisement :", "keyboard_backspace", "Back To List", "advertisement/jankalyan-advertisement");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add Jankalyan Advertisement :", "keyboard_backspace", "Back To List", "advertisement/jankalyan-advertisement");
            this.title = "Add";
        }
    }
    //#endregion
    //#region << Method >>
    AddupdateJankalyanAdvertisementComponent.prototype.ngOnInit = function () {
        this.FormGroupInit();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetDDLList();
    };
    AddupdateJankalyanAdvertisementComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].DDlKeyForJankalyanAdvertisement)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdateJankalyanAdvertisementComponent.prototype.GetById = function () {
        var _this = this;
        this._JankalyanAdvertisementService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.AdvertisementPopupCode) {
                    _this.model.AdvertisementPopupCode = String(_this.model.AdvertisementPopupCode);
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdateJankalyanAdvertisementComponent.prototype.SaveClick = function () {
        var _this = this;
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            if (this.model.Id) {
                this._JankalyanAdvertisementService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["advertisement/jankalyan-advertisement"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._JankalyanAdvertisementService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["advertisement/jankalyan-advertisement"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
        }
    };
    AddupdateJankalyanAdvertisementComponent.prototype.FormGroupInit = function () {
        this.formGroup = this.formBuilder.group({
            ImageIcon: [null],
            ButtonName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            ImageUrl: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            IsArrow: [null],
            DisplayOrder: [null],
            AdvertisementPopupCode: [null]
        });
    };
    AddupdateJankalyanAdvertisementComponent.prototype.handleImageFileInput = function (event) {
        var _this = this;
        if (event.target.files.item(0).type.match("image/*")) {
            if (event.target.files.item(0).size <
                this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.model.ImageIcon = event.target.result;
                    _this.ImagefileValidationMsg = "";
                };
                reader.readAsDataURL(event.target.files.item(0));
            }
            else {
                this.ImagefileValidationMsg = "Attachment must be less than " +
                    localStorage.getItem("FileValidation") +
                    " MB.";
            }
        }
        else {
            this.ImagefileValidationMsg = "only image/*";
        }
    };
    AddupdateJankalyanAdvertisementComponent.prototype.RemoveImageFile = function () {
        if (this.model.ImageIcon) {
            this.model.ImageIcon = null;
        }
    };
    AddupdateJankalyanAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_jankalyan_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["JankalyanAdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] }
    ]; };
    AddupdateJankalyanAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-addupdate-jankalyan-advertisement',
            template: __webpack_require__(/*! raw-loader!./addupdate-jankalyan-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.html"),
            styles: [__webpack_require__(/*! ./addupdate-jankalyan-advertisement.component.css */ "./src/app/content/advertisement/jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_jankalyan_advertisement_service__WEBPACK_IMPORTED_MODULE_4__["JankalyanAdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], AddupdateJankalyanAdvertisementComponent);
    return AddupdateJankalyanAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9qYW5rYWx5YW4tYWR2ZXJ0aXNlbWVudC9qYW5rYWx5YW4tYWR2ZXJ0aXNlbWVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: JankalyanAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JankalyanAdvertisementComponent", function() { return JankalyanAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_jankalyan_advertisement_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/jankalyan-advertisement.service */ "./src/app/Shared/Service/jankalyan-advertisement.service.ts");









var JankalyanAdvertisementComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function JankalyanAdvertisementComponent(_parentComponent, _JankalyanAdvertisementService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._JankalyanAdvertisementService = _JankalyanAdvertisementService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            // "ImageIcon",
            "ButtonName",
            "ImageUrl",
            "IsArrow",
            "DisplayOrder",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            // { Value: "ImageIcon", Text: "ImageIcon" },
            { Value: "ButtonName", Text: "ButtonN ame" },
            { Value: "ImageUrl", Text: "Image Url" },
            { Value: "DisplayOrder", Text: "Display Order" },
        ];
        this.searchColumns = [
            { Value: "ButtonName", Text: "Button Name" },
            { Value: "ImageUrl", Text: "Image Url" },
            { Value: "DisplayOrder", Text: "Display Order" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("jankalyan-advertisement", "jankalyan-advertisement/add-jankalyan-advertisement", "", "jankalyan-advertisement/update-jankalyan-advertisement");
        this.Permission.AddPageAccess
            ? this._parentComponent.setpagelayout("Jankalyan Advertisement List:", "add", "Add", "advertisement/jankalyan-advertisement/add-jankalyan-advertisement")
            : this._parentComponent.setpagelayout("Jankalyan Advertisement List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    JankalyanAdvertisementComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    JankalyanAdvertisementComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    JankalyanAdvertisementComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    JankalyanAdvertisementComponent.prototype.GetList = function () {
        var _this = this;
        this._JankalyanAdvertisementService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.paginator = _this.paginator;
                _this.totalRecords = data.Data.TotalRecords;
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    JankalyanAdvertisementComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._JankalyanAdvertisementService.ChangeActiveStatus(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._commonService.ScrollingTop();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    JankalyanAdvertisementComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    JankalyanAdvertisementComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
        this.GetList();
    };
    JankalyanAdvertisementComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_jankalyan_advertisement_service__WEBPACK_IMPORTED_MODULE_8__["JankalyanAdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], JankalyanAdvertisementComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], JankalyanAdvertisementComponent.prototype, "sort", void 0);
    JankalyanAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-jankalyan-advertisement',
            template: __webpack_require__(/*! raw-loader!./jankalyan-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.html"),
            styles: [__webpack_require__(/*! ./jankalyan-advertisement.component.css */ "./src/app/content/advertisement/jankalyan-advertisement/jankalyan-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_jankalyan_advertisement_service__WEBPACK_IMPORTED_MODULE_8__["JankalyanAdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], JankalyanAdvertisementComponent);
    return JankalyanAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.css":
/*!*************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9yZWRlc2lnbi1yZXF1ZXN0LWJ5LXBsYXRmb3JtLXVzZXIvcmVkZXNpZ24tcmVxdWVzdC1ieS1wbGF0Zm9ybS11c2VyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.ts ***!
  \************************************************************************************************************************/
/*! exports provided: RedesignRequestByPlatformUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesignRequestByPlatformUserComponent", function() { return RedesignRequestByPlatformUserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/commonddl.model */ "./src/app/Shared/Model/commonddl.model.ts");
/* harmony import */ var src_app_Shared_Model_redesignrequest_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/redesignrequest.model */ "./src/app/Shared/Model/redesignrequest.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");










var RedesignRequestByPlatformUserComponent = /** @class */ (function () {
    function RedesignRequestByPlatformUserComponent(_advertisementService, _alertService, _route, _parentApi) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._route = _route;
        this._parentApi = _parentApi;
        this.documentUrlList = [];
        this.isUpload = false;
        this.imageValidation = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]);
        var ids = String(this._route.snapshot.params.id).split(',');
        this.idModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__["AdvertisementRedesignRequestIdModel"]();
        this.idModel.AdvId = Number(ids[0]);
        this.idModel.RedesignId = Number(ids[1]);
        this._parentApi.setpagelayout('Redesign request By User :', 'keyboard_backspace', 'Back to List', '/advertisement/advforadmindepartmentuserdepartment');
        this.model = new src_app_Shared_Model_redesignrequest_model__WEBPACK_IMPORTED_MODULE_8__["RedesignRequestModel"]();
        this.model.RedesignPlatformUserLookupId = Number(ids[1]);
    }
    RedesignRequestByPlatformUserComponent.prototype.ngOnInit = function () {
        this.OnDataGetById();
    };
    RedesignRequestByPlatformUserComponent.prototype.OnDataGetById = function () {
        var _this = this;
        this._advertisementService
            .GetRedesignDetailForAdmin(this.idModel)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.resultModel = data.Data;
                _this.detailModel = _this.resultModel.AdvertisementList;
                if (_this.resultModel.RequestImageList) {
                    _this.documentUrlList = _this.resultModel.RequestImageList;
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    RedesignRequestByPlatformUserComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        this.isUpload = true;
        while (this.documentUrlList.findIndex(function (item) { return item.IsNew === true; }) >= 0) {
            this.documentUrlList.find(function (item) { return item.IsNew === true; }).IsNew = false;
        }
        var _loop_1 = function (index) {
            if (files.item(index).type.match('image/*')) {
                if (files.item(index).size < 5000000) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        var temp = new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_7__["DocumentUrlModel"]();
                        temp.Url = reader_1.result;
                        temp.IsNew = true;
                        temp.Extension = files[index].name.split('.')[1];
                        if (temp.Extension == 'pdf') {
                            temp.DisplayName = files[index].name;
                        }
                        _this.documentUrlList.push(temp);
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.fileValidationMsg = 'File size must be less than 5MB...!';
                    return { value: void 0 };
                }
            }
            else {
                this_1.fileValidationMsg = 'only image/*';
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.fileValidationMsg = '';
        this.model.File = files;
    };
    RedesignRequestByPlatformUserComponent.prototype.Saveclick = function () {
        var _this = this;
        this.imageValidation.markAllAsTouched();
        // // stop here if form is invalid
        if (this.imageValidation.valid && this.isUpload) {
            this._advertisementService
                .RedesignRequestByPlatformUser(this.model)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.isUpload = false;
                    _this.OnDataGetById();
                    _this._alertService.success(data.Message);
                }
                else {
                    _this.documentUrlList.splice(_this.documentUrlList.length - 1, 1);
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                console.log(error);
                _this._alertService.error(error.message);
            });
        }
    };
    RedesignRequestByPlatformUserComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] }
    ]; };
    RedesignRequestByPlatformUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-redesign-request-by-platform-user',
            template: __webpack_require__(/*! raw-loader!./redesign-request-by-platform-user.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.html"),
            styles: [__webpack_require__(/*! ./redesign-request-by-platform-user.component.css */ "./src/app/content/advertisement/redesign-request-by-platform-user/redesign-request-by-platform-user.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]])
    ], RedesignRequestByPlatformUserComponent);
    return RedesignRequestByPlatformUserComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.css":
/*!********************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.css ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9yZWRlc2lnbi1yZXF1ZXN0LWZvci1hZG1pbi9yZWRlc2lnbi1hcHByb3ZlLWRpYWxvZy9yZWRlc2lnbi1hcHByb3ZlLWRpYWxvZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.ts ***!
  \*******************************************************************************************************************************/
/*! exports provided: RedesignApproveDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesignApproveDialogComponent", function() { return RedesignApproveDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");








var RedesignApproveDialogComponent = /** @class */ (function () {
    function RedesignApproveDialogComponent(_advertisementService, _alertService, _router, _dialogRef, data) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._router = _router;
        this._dialogRef = _dialogRef;
        this.data = data;
        this.remarks = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]);
        this.isapprove = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]);
        this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_5__["ApproveByAdminModel"]();
        if (data) {
            this.model.Id = data;
        }
    }
    RedesignApproveDialogComponent.prototype.ngOnInit = function () {
    };
    RedesignApproveDialogComponent.prototype.SaveClick = function () {
        var _this = this;
        this.remarks.markAsTouched();
        this.isapprove.markAllAsTouched();
        if (this.remarks.valid && this.isapprove) {
            this._advertisementService.RedesignApproveByAdmin(this.model).subscribe(function (data) {
                if ((data.IsSuccess)) {
                    _this._router.navigate(["/advertisement/redesignrequestforadmin"]);
                    _this._dialogRef.close();
                    _this._alertService.success(data.Message);
                }
                else {
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    RedesignApproveDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    RedesignApproveDialogComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    RedesignApproveDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-redesign-approve-dialog',
            template: __webpack_require__(/*! raw-loader!./redesign-approve-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.html"),
            styles: [__webpack_require__(/*! ./redesign-approve-dialog.component.css */ "./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], RedesignApproveDialogComponent);
    return RedesignApproveDialogComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.css":
/*!***********************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9yZWRlc2lnbi1yZXF1ZXN0LWZvci1hZG1pbi9yZWRlc2lnbi1yZXF1ZXN0LWZvci1hZG1pbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: RedesignRequestForAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesignRequestForAdminComponent", function() { return RedesignRequestForAdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");








var RedesignRequestForAdminComponent = /** @class */ (function () {
    function RedesignRequestForAdminComponent(_advertisementService, _alertService, _parentApi) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this.displayedColumns = ["index", "Expired", "SubjectEng", "RequestedStatus", "IsUploaded", "IsApproved", "Action"];
        // ViewdisplayedColumns: ColumnHeaderModel[] = [
        //   { Value: "SubjectEng", Text: "Subject English" },
        //   { Value: "RequestedStatus", Text: "Requested Status" },
        //   { Value: "IsUploaded", Text: "IsUploaded" },
        //   { Value: "IsApproved", Text: "IsApproved" }
        // ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentApi.setpagelayout(" Redesign Request :", "", "", "");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_7__["IndexModel"]();
    }
    RedesignRequestForAdminComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    RedesignRequestForAdminComponent.prototype.IsExpired = function (date) {
        if (date) {
            if (new Date(date).getTime() < new Date().getTime()) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    RedesignRequestForAdminComponent.prototype.GetList = function () {
        var _this = this;
        this._advertisementService.GetRedesignListForAdmin(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.requestList = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.requestList);
                if (!_this.indexModel.IsPostBack) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    RedesignRequestForAdminComponent.prototype.SortData = function (event) {
        this.indexModel.IsPostBack = true;
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].orderByDsc;
        this.GetList();
    };
    RedesignRequestForAdminComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.IsPostBack = true;
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.GetList();
    };
    RedesignRequestForAdminComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], RedesignRequestForAdminComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], RedesignRequestForAdminComponent.prototype, "sort", void 0);
    RedesignRequestForAdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-redesign-request-for-admin',
            template: __webpack_require__(/*! raw-loader!./redesign-request-for-admin.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.html"),
            styles: [__webpack_require__(/*! ./redesign-request-for-admin.component.css */ "./src/app/content/advertisement/redesign-request-for-admin/redesign-request-for-admin.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]])
    ], RedesignRequestForAdminComponent);
    return RedesignRequestForAdminComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.css":
/*!**************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC9yZWRlc2lnbi1yZXF1ZXN0LWZvci1hZG1pbi9yZXF1ZXN0LWRldGFpbC9yZXF1ZXN0LWRldGFpbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: RequestDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestDetailComponent", function() { return RequestDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _redesign_approve_dialog_redesign_approve_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../redesign-approve-dialog/redesign-approve-dialog.component */ "./src/app/content/advertisement/redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component.ts");









var RequestDetailComponent = /** @class */ (function () {
    function RequestDetailComponent(_advertisementService, _alertService, _dialog, _route, _parentApi) {
        this._advertisementService = _advertisementService;
        this._alertService = _alertService;
        this._dialog = _dialog;
        this._route = _route;
        this._parentApi = _parentApi;
        this.idModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_2__["AdvertisementRedesignRequestIdModel"]();
        var ids = String(this._route.snapshot.params.id).split(',');
        this.idModel.AdvId = Number(ids[0]);
        this.idModel.RedesignId = Number(ids[1]);
        this._parentApi.setpagelayout("Redesign request Detail :", "keyboard_backspace", "Back to List", "/advertisement/redesignrequestforadmin");
    }
    RequestDetailComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    RequestDetailComponent.prototype.GetById = function () {
        var _this = this;
        this._advertisementService.GetRedesignDetailForAdmin(this.idModel).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.resultModel = data.Data;
                _this.detailModel = _this.resultModel.AdvertisementList;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    RequestDetailComponent.prototype.ApproveClick = function () {
        this._dialog.open(_redesign_approve_dialog_redesign_approve_dialog_component__WEBPACK_IMPORTED_MODULE_8__["RedesignApproveDialogComponent"], {
            width: "500px",
            data: this.idModel.RedesignId
        });
    };
    RequestDetailComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] }
    ]; };
    RequestDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-request-detail',
            template: __webpack_require__(/*! raw-loader!./request-detail.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.html"),
            styles: [__webpack_require__(/*! ./request-detail.component.css */ "./src/app/content/advertisement/redesign-request-for-admin/request-detail/request-detail.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]])
    ], RequestDetailComponent);
    return RequestDetailComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/update-advertisement/update-advertisement.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/advertisement/update-advertisement/update-advertisement.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-btn-wrapper input[type=file]:before {\r\n    background: #ffffff;\r\n    position: absolute;\r\n    width: 156px;\r\n    top: 0px;\r\n    left: 36px;\r\n    content: \"1\";\r\n    min-height: 27px;\r\n    }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L3VwZGF0ZS1hZHZlcnRpc2VtZW50L3VwZGF0ZS1hZHZlcnRpc2VtZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L2FkdmVydGlzZW1lbnQvdXBkYXRlLWFkdmVydGlzZW1lbnQvdXBkYXRlLWFkdmVydGlzZW1lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi51cGxvYWQtYnRuLXdyYXBwZXIgaW5wdXRbdHlwZT1maWxlXTpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiAxNTZweDtcclxuICAgIHRvcDogMHB4O1xyXG4gICAgbGVmdDogMzZweDtcclxuICAgIGNvbnRlbnQ6IFwiMVwiO1xyXG4gICAgbWluLWhlaWdodDogMjdweDtcclxuICAgIH0iXX0= */"

/***/ }),

/***/ "./src/app/content/advertisement/update-advertisement/update-advertisement.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/advertisement/update-advertisement/update-advertisement.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: UpdateAdvertisementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateAdvertisementComponent", function() { return UpdateAdvertisementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");











var UpdateAdvertisementComponent = /** @class */ (function () {
    function UpdateAdvertisementComponent(_route, _advertisementService, _router, _alertService, _commonService, _parentApi) {
        this._route = _route;
        this._advertisementService = _advertisementService;
        this._router = _router;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this.Districts = [];
        this.minDate = new Date();
        this.id = this._route.snapshot.params.id;
        this.GetDDLList();
        this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_5__["Advertisement"]();
        this._parentApi.setpagelayout("Update Advertisement :", "keyboard_backspace", "Back to list", "advertisement/");
        this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
    }
    UpdateAdvertisementComponent.prototype.ngOnInit = function () {
        this.GetById(this.id);
    };
    UpdateAdvertisementComponent.prototype.GetById = function (id) {
        var _this = this;
        this._advertisementService.GetById(id).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.advmodel = data.Data;
                _this.model = data.Data;
                if (data.Data.Category) {
                    _this.model.Category = String(data.Data.Category);
                }
                if (_this.advmodel.SubCategory) {
                    _this.model.SubCategory = String(_this.advmodel.SubCategory);
                }
                if (_this.advmodel.BeneficiaryCategories) {
                    _this.model.BeneficiaryCategories = _this.advmodel.BeneficiaryCategories.split(',');
                }
                if (_this.advmodel.DistrictIds) {
                    _this.model.Districts = _this.advmodel.DistrictIds.split(',');
                }
                if (_this.advmodel.AdminDepartments) {
                    _this.model.AdminDepartment = _this.advmodel.AdminDepartments.split(',');
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateAdvertisementComponent.prototype.downloadMyFile = function (temp) {
        var link = document.createElement('a');
        link.setAttribute('href', temp);
        link.setAttribute('download', "Documents");
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    // handleFileInput(event: any) {
    //   if (event.target.files.item(0).type.match('image/*')) {
    //     var reader = new FileReader();
    //     reader.onload = (event: any) => {
    //       this.model.DocumentUrl = event.target.result;
    //     }
    //     reader.readAsDataURL(event.target.files.item(0));
    //     this.fileValidationMsg = "";
    //     this.model.File = event.target.files.item(0);
    //   }
    //   else {
    //     this.fileValidationMsg = "only *images file accepted ";
    //   }
    // }
    UpdateAdvertisementComponent.prototype.handleFileInput = function (event, ispdf) {
        var _this = this;
        if (ispdf === void 0) { ispdf = false; }
        if (ispdf) {
            if (event.target.files.item(0).type.match("application/pdf")) {
                if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.model.PdfUrl = event.target.result;
                    };
                    reader.readAsDataURL(event.target.files.item(0));
                    this.fileValidationMsg1 = "";
                    this.model.File = event.target.files.item(0);
                }
                else {
                    this.fileValidationMsg1 = this.fileSizeValidationMsg;
                }
            }
            else {
                this.fileValidationMsg1 = "only *pdf file accepted ";
            }
        }
        else {
            if (event.target.files.item(0).type.match("image/*")) {
                if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(0.2))) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.model.DocumentUrl = event.target.result;
                    };
                    reader.readAsDataURL(event.target.files.item(0));
                    this.fileValidationMsg = "";
                    this.model.File = event.target.files.item(0);
                }
                else {
                    this.fileValidationMsg = "Attachment must be less than 200 KB";
                }
            }
            else {
                this.fileValidationMsg = "only *images file accepted ";
            }
        }
    };
    UpdateAdvertisementComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].DDLKeyForAdvertisement).subscribe(function (data) {
            _this.dDLList = data.Data;
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateAdvertisementComponent.prototype.SaveClick = function () {
        var _this = this;
        var prevDate = this.model.AdvDate;
        var prevExpDate = this.model.ExpiryDate;
        if (this.model.AdvDate) {
            this.model.AdvDate = this.model.AdvDate.toLocaleString();
        }
        if (this.model.ExpiryDate) {
            this.model.ExpiryDate = this.model.ExpiryDate.toLocaleString();
        }
        this._advertisementService.AddAdvertisement(this.model).subscribe(function (data) {
            console.log(data);
            if (data.IsSuccess) {
                _this._alertService.success(data.Message);
                _this.model = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_5__["Advertisement"]();
                _this._router.navigate(['advertisement/']);
            }
            else {
                _this.model.AdvDate = prevDate;
                _this.model.ExpiryDate = prevExpDate;
                _this._alertService.error(data.Message);
                console.error(data.Exception);
            }
        }, function (error) {
            console.log(error);
            _this.model.AdvDate = prevDate;
            _this.model.ExpiryDate = prevExpDate;
            _this._alertService.error(error.message);
        });
    };
    UpdateAdvertisementComponent.prototype.Numberonly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    UpdateAdvertisementComponent.prototype.RemoveImage = function () {
        this.model.DocumentUrl = null;
    };
    UpdateAdvertisementComponent.prototype.RemovePdf = function () {
        this.model.PdfUrl = null;
    };
    UpdateAdvertisementComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"] }
    ]; };
    UpdateAdvertisementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-update-advertisement',
            template: __webpack_require__(/*! raw-loader!./update-advertisement.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/update-advertisement/update-advertisement.component.html"),
            //providers: [CommonService],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_10__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_10__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./update-advertisement.component.css */ "./src/app/content/advertisement/update-advertisement/update-advertisement.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]])
    ], UpdateAdvertisementComponent);
    return UpdateAdvertisementComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.css":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.css ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvYWR2ZXJ0aXNlbWVudC92aXNpdG9yLWNvdW50ZXItZGV0YWlsLXJlcG9ydC92aXNpdG9yLWNvdW50ZXItZGV0YWlsLXJlcG9ydC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: VisitorCounterDetailReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitorCounterDetailReportComponent", function() { return VisitorCounterDetailReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");











var VisitorCounterDetailReportComponent = /** @class */ (function () {
    function VisitorCounterDetailReportComponent(_alertService, _advertisementService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._advertisementService = _advertisementService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = [
            "index",
            "WebSitUrl",
            "IPAddress",
            "CreatedDate",
        ];
        this.ViewdisplayedColumns = [
            { Value: "WebSitUrl", Text: "WebSite Url" },
            { Value: "IPAddress", Text: "IP Address" },
            { Value: "CreatedDate", Text: "Created Date" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Details Of Popup Display On Various Websites :", "", "", "");
        this.indexModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_7__["AdvertisementReportSearchModel"]();
        this.indexModel.OrderBy = "TotalCount";
    }
    VisitorCounterDetailReportComponent.prototype.ngOnInit = function () {
        //this.GetList();
    };
    VisitorCounterDetailReportComponent.prototype.GetList = function () {
        var _this = this;
        this._advertisementService.GetVisitorCountDetailReportList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](_this.listModel);
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
    VisitorCounterDetailReportComponent.prototype.searchClick = function () {
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
    VisitorCounterDetailReportComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_7__["AdvertisementReportSearchModel"]();
        this.indexModel.FromDate = null;
        this.indexModel.ToDate = null;
        this.dataSource = null;
        this.listModel = null;
        this.GetList();
    };
    VisitorCounterDetailReportComponent.prototype.SearchByKeyword = function (event) {
        if (event.target.value.length > 2) {
            this.GetList();
        }
    };
    VisitorCounterDetailReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("test").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    VisitorCounterDetailReportComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VisitorCounterDetailReportComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VisitorCounterDetailReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], VisitorCounterDetailReportComponent.prototype, "sort", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], VisitorCounterDetailReportComponent.prototype, "paginator", void 0);
    VisitorCounterDetailReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-visitor-counter-detail-report',
            template: __webpack_require__(/*! raw-loader!./visitor-counter-detail-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.html"),
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"],
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./visitor-counter-detail-report.component.css */ "./src/app/content/advertisement/visitor-counter-detail-report/visitor-counter-detail-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"],
            src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_3__["AdvertisementService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], VisitorCounterDetailReportComponent);
    return VisitorCounterDetailReportComponent;
}());



/***/ }),

/***/ "./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L3Zpc2l0b3ItY291bnRlci1yZXBvcnQvdmlzaXRvci1jb3VudGVyLXJlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9hZHZlcnRpc2VtZW50L3Zpc2l0b3ItY291bnRlci1yZXBvcnQvdmlzaXRvci1jb3VudGVyLXJlcG9ydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ci5tYXQtZm9vdGVyLXJvdyB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: VisitorCounterReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitorCounterReportComponent", function() { return VisitorCounterReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/advertisement.model */ "./src/app/Shared/Model/advertisement.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/advertisement.service */ "./src/app/Shared/Service/advertisement.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");











var VisitorCounterReportComponent = /** @class */ (function () {
    function VisitorCounterReportComponent(_alertService, _advertisementService, _parentComponent, _commonService) {
        this._alertService = _alertService;
        this._advertisementService = _advertisementService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this.displayedColumns = ["index", "WebSitUrl", "VisitorCount"];
        this.ViewdisplayedColumns = [
            { Value: "WebSitUrl", Text: "WebSite Url" },
            { Value: "VisitorCount", Text: "Website Popup Counter" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.indexModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__["AdvertisementReportSearchModel"]();
        this._parentComponent.setpagelayout("Frequency Of Popup Display On Various Websites :", "", "", "");
    }
    VisitorCounterReportComponent.prototype.ngOnInit = function () {
        // this.GetList();
    };
    // ngAfterViewInit() {
    //   this.dataSource.sort = this.sort;
    // }
    VisitorCounterReportComponent.prototype.GetList = function () {
        var _this = this;
        this.indexModel.OrderBy = 'VisitorCount';
        this.indexModel.OrderByAsc = 0;
        this._advertisementService.GetVisitorCountReportList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalCost();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    /** Gets the total Count of visitor. */
    VisitorCounterReportComponent.prototype.getTotalCost = function () {
        this.totalVCCount = this.listModel.map(function (t) { return t.VisitorCount; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    VisitorCounterReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("test").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    VisitorCounterReportComponent.prototype.searchClick = function () {
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
    VisitorCounterReportComponent.prototype.clearClick = function () {
        this.indexModel = new src_app_Shared_Model_advertisement_model__WEBPACK_IMPORTED_MODULE_3__["AdvertisementReportSearchModel"]();
        this.indexModel.FromDate = null;
        this.indexModel.ToDate = null;
        this.dataSource = null;
        this.listModel = null;
    };
    VisitorCounterReportComponent.prototype.SearchByKeyword = function (event) {
        this.GetList();
    };
    VisitorCounterReportComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    VisitorCounterReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_7__["AdvertisementService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], VisitorCounterReportComponent.prototype, "sort", void 0);
    VisitorCounterReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-visitor-counter-report',
            template: __webpack_require__(/*! raw-loader!./visitor-counter-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.html"),
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"],
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./visitor-counter-report.component.css */ "./src/app/content/advertisement/visitor-counter-report/visitor-counter-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_advertisement_service__WEBPACK_IMPORTED_MODULE_7__["AdvertisementService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], VisitorCounterReportComponent);
    return VisitorCounterReportComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-advertisement-advertisement-module.js.map