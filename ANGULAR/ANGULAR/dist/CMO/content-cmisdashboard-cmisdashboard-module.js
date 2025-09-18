(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-cmisdashboard-cmisdashboard-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"dashboardReport!=null\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <h5 class=\"color-blue mb-10 mt-20 center\">Notifications Report</h5>\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th rowspan=\"2\">Module Name</th>\r\n                <th colspan=\"2\">New Entries (Today)</th>\r\n                <th colspan=\"2\">Previous Entries</th>\r\n                <th rowspan=\"2\">Action Taken By Department</th>\r\n            </tr>\r\n            <tr>\r\n                <th>Action Taken</th>\r\n                <th>Not Action Taken</th>\r\n                <th>Action Taken</th>\r\n                <th>Not Action Taken</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of dashboardReport.NotificaionCountList\">\r\n                <td class=\"center\">\r\n                    {{ row.ApplicationName }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    <span *ngIf=\"(row.TodayReceived_ActionTaken==0);else nr_tr_at\">\r\n                        {{ row.TodayReceived_ActionTaken }}\r\n                    </span>\r\n                    <ng-template #nr_tr_at>\r\n                        <a\r\n                            routerLink=\"/{{row.ApplicationCode.toLowerCase()}}/statistical-report\">{{ row.TodayReceived_ActionTaken }}</a>\r\n                    </ng-template>\r\n                </td>\r\n                <td class=\"center\">\r\n                    <span *ngIf=\"(row.TodayReceived_NotActionTaken==0);else nr_tr_nat\">\r\n                        {{ row.TodayReceived_NotActionTaken }}\r\n                    </span>\r\n                    <ng-template #nr_tr_nat>\r\n                        <a\r\n                            routerLink=\"/{{row.ApplicationCode.toLowerCase()}}/statistical-report\">{{ row.TodayReceived_NotActionTaken }}</a>\r\n                    </ng-template>\r\n                </td>\r\n                <td class=\"center\">\r\n                    <span *ngIf=\"(row.PreviousReceived_ActionTaken==0);else nr_pr_at\">\r\n                        {{ row.PreviousReceived_ActionTaken }}\r\n                    </span>\r\n                    <ng-template #nr_pr_at>\r\n                        <a\r\n                            routerLink=\"/{{row.ApplicationCode.toLowerCase()}}/statistical-report\">{{ row.PreviousReceived_ActionTaken }}</a>\r\n                    </ng-template>\r\n                </td>\r\n                <td class=\"center\">\r\n                    <span *ngIf=\"(row.PreviousReceived_NotActionTaken==0);else nr_pr_nat\">\r\n                        {{ row.PreviousReceived_NotActionTaken }}\r\n                    </span>\r\n                    <ng-template #nr_pr_nat>\r\n                        <a\r\n                            routerLink=\"/{{row.ApplicationCode.toLowerCase()}}/statistical-report\">{{ row.PreviousReceived_NotActionTaken }}</a>\r\n                    </ng-template>\r\n                </td>\r\n                <td class=\"center\">\r\n                    <span *ngIf=\"(row.TotalReceived_ActionTaken==0);else nr_tr_at\">\r\n                        {{ row.TotalReceived_ActionTaken }}\r\n                    </span>\r\n                    <ng-template #nr_tr_at>\r\n                        <a\r\n                            routerLink=\"/{{row.ApplicationCode.toLowerCase()}}/statistical-report\">{{ row.TotalReceived_ActionTaken }}</a>\r\n                    </ng-template>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <h5 class=\"color-blue mb-10 mt-20 center\">Status of Action Taken</h5>\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th rowspan=\"2\">Module Name</th>\r\n                <th rowspan=\"2\">Not Action Taken</th>\r\n                <th colspan=\"3\">Action Taken By Department</th>\r\n                <th colspan=\"3\">Action Taken By CMO</th>\r\n            </tr>\r\n            <tr>\r\n                <th>Pending</th>\r\n                <th>Interim</th>\r\n                <th>Disposed</th>\r\n                <th>Pending</th>\r\n                <th>Interim</th>\r\n                <th>Disposed</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of dashboardReport.ActionStatusCountList\">\r\n                <td class=\"center\">\r\n                    {{ row.ApplicationName }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.TotalReceived_NotActionTakenByDepartment }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Pending }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Interim }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Disposed }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.CMOAction_Pending }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.CMOAction_Interim }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.CMOAction_Disposed }}\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <h5 class=\"color-blue mb-10 mt-20 center\">Age Wise Report</h5>\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th rowspan=\"3\">Module Name</th>\r\n                <th rowspan=\"3\">Total Entries</th>\r\n                <th rowspan=\"3\">Not Action Taken</th>\r\n                <th colspan=\"12\">Action Taken By Department</th>\r\n            </tr>\r\n            <tr>\r\n                <th colspan=\"3\">&lt;7 Days</th>\r\n                <th colspan=\"3\">7-15 Days</th>\r\n                <th colspan=\"3\">15-30 Days</th>\r\n                <th colspan=\"3\">&gt;30 Days</th>\r\n            </tr>\r\n            <tr>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n                <th>P</th>\r\n                <th>I</th>\r\n                <th>D</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of dashboardReport.ActionAgeWiseCountList\">\r\n                <td class=\"center\">\r\n                    {{ row.ApplicationName }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.TotalReceived }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.TotalReceived_NotActionTakenByDepartment }}\r\n                </td>\r\n\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_0to7_Pending }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_0to7_Interim }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_0to7_Disposed }}\r\n                </td>\r\n\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_7to15_Pending }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_7to15_Interim }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_7to15_Disposed }}\r\n                </td>\r\n\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_15to30_Pending }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_15to30_Interim }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_15to30_Disposed }}\r\n                </td>\r\n\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_30to_Pending }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_30to_Interim }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_30to_Disposed }}\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <h5 class=\"color-blue mb-10 mt-20 center\">Last 6 Month Wise Report</h5>\r\n        <table class=\"mat-elevation-z8 normal-table\">\r\n            <tr>\r\n                <th>Module Name</th>\r\n                <th>Total Entries</th>\r\n                <th>{{_commonService.getMonthYear(0)}}</th>\r\n                <th>{{_commonService.getMonthYear(-1)}}</th>\r\n                <th>{{_commonService.getMonthYear(-2)}}</th>\r\n                <th>{{_commonService.getMonthYear(-3)}}</th>\r\n                <th>{{_commonService.getMonthYear(-4)}}</th>\r\n                <th>{{_commonService.getMonthYear(-5)}}</th>\r\n            </tr>\r\n            <tr *ngFor=\"let row of dashboardReport.Last6MonthActionCountList\">\r\n                <td class=\"center\">\r\n                    {{ row.ApplicationName }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.TotalReceived }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_CurrentMonth }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Last1Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Last2Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Last3Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Last4Month }}\r\n                </td>\r\n                <td class=\"center\">\r\n                    {{ row.DepartmentAction_Last5Month }}\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/Shared/Service/lms/dashboard.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/Shared/Service/lms/dashboard.service.ts ***!
  \*********************************************************/
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var DashboardService = /** @class */ (function () {
    function DashboardService(_baseService) {
        this._baseService = _baseService;
    }
    DashboardService.prototype.GetDepartmentDashboardReport = function (userId) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GetDepartmentDashboardReportUrl + "?id=" + userId);
    };
    DashboardService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    DashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], DashboardService);
    return DashboardService;
}());



/***/ }),

/***/ "./src/app/content/cmisdashboard/cmisdashboard-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/content/cmisdashboard/cmisdashboard-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: CMISDashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CMISDashboardRoutingModule", function() { return CMISDashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _department_dashboard_department_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./department-dashboard/department-dashboard.component */ "./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.ts");





var routes = [
    {
        path: '',
        component: _department_dashboard_department_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DepartmentDashboardComponent"],
    }
];
var CMISDashboardRoutingModule = /** @class */ (function () {
    function CMISDashboardRoutingModule() {
    }
    CMISDashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
    ], CMISDashboardRoutingModule);
    return CMISDashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/cmisdashboard/cmisdashboard.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/content/cmisdashboard/cmisdashboard.module.ts ***!
  \***************************************************************/
/*! exports provided: CMISDashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CMISDashboardModule", function() { return CMISDashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _cmisdashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cmisdashboard-routing.module */ "./src/app/content/cmisdashboard/cmisdashboard-routing.module.ts");
/* harmony import */ var _department_dashboard_department_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./department-dashboard/department-dashboard.component */ "./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");






var CMISDashboardModule = /** @class */ (function () {
    function CMISDashboardModule() {
    }
    CMISDashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_department_dashboard_department_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DepartmentDashboardComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"],
                _cmisdashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__["CMISDashboardRoutingModule"]
            ]
        })
    ], CMISDashboardModule);
    return CMISDashboardModule;
}());



/***/ }),

/***/ "./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".normal-table{\r\n    box-shadow: none;\r\n    border:1px solid rgba(0,0,0,0.12);\r\n}\r\n.normal-table th, .normal-table td.center{\r\n   text-align: center;\r\n}\r\n.normal-table td, .normal-table th{\r\n    border-right:1px solid rgba(0,0,0,0.12);\r\n}\r\n.normal-table td:last-child, .normal-table th:last-child{\r\n    border-right:none;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9jbWlzZGFzaGJvYXJkL2RlcGFydG1lbnQtZGFzaGJvYXJkL2RlcGFydG1lbnQtZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUNBQWlDO0FBQ3JDO0FBQ0E7R0FDRyxrQkFBa0I7QUFDckI7QUFDQTtJQUNJLHVDQUF1QztBQUMzQztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9jbWlzZGFzaGJvYXJkL2RlcGFydG1lbnQtZGFzaGJvYXJkL2RlcGFydG1lbnQtZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubm9ybWFsLXRhYmxle1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTtcclxufVxyXG4ubm9ybWFsLXRhYmxlIHRoLCAubm9ybWFsLXRhYmxlIHRkLmNlbnRlcntcclxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5ub3JtYWwtdGFibGUgdGQsIC5ub3JtYWwtdGFibGUgdGh7XHJcbiAgICBib3JkZXItcmlnaHQ6MXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XHJcbn1cclxuLm5vcm1hbC10YWJsZSB0ZDpsYXN0LWNoaWxkLCAubm9ybWFsLXRhYmxlIHRoOmxhc3QtY2hpbGR7XHJcbiAgICBib3JkZXItcmlnaHQ6bm9uZTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: DepartmentDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentDashboardComponent", function() { return DepartmentDashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_lms_dashboard_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/lms/dashboard.service */ "./src/app/Shared/Service/lms/dashboard.service.ts");






var DepartmentDashboardComponent = /** @class */ (function () {
    function DepartmentDashboardComponent(_appComponet, _commonService, _alertService, _dashboardService) {
        this._appComponet = _appComponet;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._dashboardService = _dashboardService;
        this._appComponet.setpagelayout("CMIS Dashboard", "", "", "");
    }
    DepartmentDashboardComponent.prototype.ngOnInit = function () {
        this.bindDepartmentDashboard();
    };
    DepartmentDashboardComponent.prototype.bindDepartmentDashboard = function () {
        var _this = this;
        var userId = "27";
        this._dashboardService.GetDepartmentDashboardReport(userId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dashboardReport = data.Data;
                console.log('report');
                console.log(_this.dashboardReport.NotificaionCountList);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DepartmentDashboardComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_lms_dashboard_service__WEBPACK_IMPORTED_MODULE_5__["DashboardService"] }
    ]; };
    DepartmentDashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-department-dashboard',
            template: __webpack_require__(/*! raw-loader!./department-dashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./department-dashboard.component.css */ "./src/app/content/cmisdashboard/department-dashboard/department-dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"], src_app_Shared_Service_lms_dashboard_service__WEBPACK_IMPORTED_MODULE_5__["DashboardService"]])
    ], DepartmentDashboardComponent);
    return DepartmentDashboardComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-cmisdashboard-cmisdashboard-module.js.map