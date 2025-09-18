(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-vc-graphical-report-vc-graphical-report-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.html ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row top_bar_title\">\r\n  <div class=\"col s12 m6 l8 xl8\">\r\n    <h3>\r\n      Meeting Title : <strong> {{ model?.ShortDescription }} </strong>\r\n    </h3>\r\n  </div>\r\n  <div class=\"col s12 m6 l4 xl4\" *ngIf=\"model.Date && model.Time\">\r\n    <h3>\r\n      Date & Time :\r\n      <strong\r\n        >{{ model?.Date | date: \"dd/MM/yyyy\" }} at {{ model?.Time }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n   <div class=\"col s12 m6 l4 xl4\" *ngIf=\"model.Date && !model.Time\">\r\n    <h3>\r\n      Date :\r\n      <strong\r\n        >{{ model?.Date | date: \"dd/MM/yyyy\" }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row top_bar_blue\">\r\n  <div class=\"col s12 d-flex justify-space-between\">\r\n    <ul class=\"breadcrumb\">\r\n      <li>\r\n        <button type=\"button\" routerLink=\"/vc/participant/{{ id }}\">\r\n          Participant Report\r\n        </button>\r\n      </li>\r\n      <li><button routerLink=\"/vcreport/vcagendareport/{{id}}\">Agenda</button></li>\r\n      <li class=\"active\"><button type=\"button\">Agenda Detail</button></li>\r\n    </ul>\r\n\r\n    <button class=\"btn btn-info\" routerLink=\"/vc/participant/{{ id }}\">\r\n      Back To Main\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row pattern_bg\">\r\n  <div class=\"col s12 m12 l12 xl12\">\r\n    <!-- <h3 class=\"bx-title\">Meeting Participant</h3> -->\r\n    <div  class=\"enter-bx\">\r\n      {{ model.Title }}\r\n\r\n    </div>\r\n  </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"col s12 d-flex justify-space-between\">\r\n  <ul class=\"breadcrumb\">\r\n    <li><a href=\"javascript:void(0);\" routerLink=\"/vc/participant/{{id}}\"></a></li>\r\n    <li><a href=\"javascript:void(0);\">Agenda</a></li>\r\n  </ul>\r\n  <a href=\"javascript:void(0);\" routerLink=\"/vc/participant/{{id}}\">Participant Report</a>\r\n  <button class=\"btn btn-info\" routerLink=\"/vc\">Back</button>\r\n</div>\r\n<button routerLink=\"/vcreport/vcdistrictreport/{{id}}\">District</button>\r\n\r\n -->\r\n<!-- <div class=\"row textdec\" >\r\n  <div class=\"col s4 m4 l4 xl4\">\r\n    <h6 >Meeting Title :</h6>\r\n    <h6>{{model?.ShortDescription}}</h6>\r\n  </div>\r\n\r\n  <div class=\"col s4 m4 l4 xl4\">\r\n    <h6>Date :</h6>\r\n    <h6>{{model?.Date | date: 'dd/MM/yyyy' }}</h6>\r\n  </div>\r\n\r\n  <div class=\"col s4 m4 l4 xl4\">\r\n    <h6>Time :</h6>\r\n    <h6>{{model?.Time}}</h6>\r\n  </div>\r\n\r\n</div> -->\r\n\r\n<div class=\"row top_bar_title\">\r\n  <div class=\"col s12 m6 l8 xl8\">\r\n    <h3>\r\n      Meeting Title : <strong> {{ model?.ShortDescription }} </strong>\r\n    </h3>\r\n  </div>\r\n  <div class=\"col s12 m6 l4 xl4\" *ngIf=\"model.Date && model.Time\">\r\n    <h3>\r\n      Date & Time :\r\n      <strong\r\n        >{{ model?.Date | date: \"dd/MM/yyyy\" }} at {{ model?.Time }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n   <div class=\"col s12 m6 l4 xl4\" *ngIf=\"model.Date && !model.Time\">\r\n    <h3>\r\n      Date :\r\n      <strong\r\n        >{{ model?.Date | date: \"dd/MM/yyyy\" }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row top_bar_blue\">\r\n  <div class=\"col s12 d-flex justify-space-between\">\r\n    <ul class=\"breadcrumb\">\r\n      <li>\r\n        <button type=\"button\" routerLink=\"/vc/participant/{{ id }}\">\r\n          Participant Report\r\n        </button>\r\n      </li>\r\n      <li class=\"active\"><button type=\"button\">Agenda</button></li>\r\n    </ul>\r\n\r\n    <button class=\"btn btn-info\" routerLink=\"/vc/participant/{{ id }}\">\r\n      Back To Main\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row pattern_bg\">\r\n  <div class=\"col s12 m6 l6 xl6\">\r\n    <!-- <h3 class=\"bx-title\">Meeting Participant</h3> -->\r\n    <a routerLink=\"/vcreport/vcdistrictreport/{{ id }}\" class=\"enter-bx\">\r\n      <!-- {{ model.MeetingParticipant }} --><h3 class=\"bx-title\">Meeting Participant</h3>\r\n      <!-- <img\r\n        class=\"next_arrow\"\r\n        src=\"../../../../assets/images/right.png\"\r\n        alt=\"CMO\"\r\n      /> -->\r\n      <img\r\n      class=\"next_arrow\"\r\n      src=\"assets/images/right.png\"\r\n      alt=\"CMO\"\r\n    />\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"col s12 m6 l6 xl6\">\r\n    <!-- <h3 class=\"bx-title\">Agenda</h3> -->\r\n    <a\r\n      routerLink=\"/vcreport/vcagendadetail/{{ id }}\"\r\n      class=\"enter-bx\"\r\n      style=\"background: #fbc709; outline-color: #987c16;\"\r\n    >\r\n      <!-- {{ model.Title }} --> <h3 class=\"bx-title\">Meeting Agenda</h3>\r\n      <img\r\n        class=\"next_arrow\"\r\n        src=\"assets/images/right.png\"\r\n        alt=\"CMO\"\r\n      />\r\n    </a>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.html ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row top_bar_title\">\r\n  <div class=\"col s12 m6 l8 xl8\">\r\n    <h3>\r\n      Meeting Title : <strong> {{ model?.ShortDescription }} </strong>\r\n    </h3>\r\n  </div>\r\n  <div class=\"col s12 m6 l4 xl4\" *ngIf=\"model?.Date && model?.Time\">\r\n    <h3>\r\n      Date & Time :\r\n      <strong\r\n        >{{ model?.Date | date: \"dd/MM/yyyy\" }} at {{ model?.Time }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n   <div class=\"col s12 m6 l4 xl4\" *ngIf=\"model?.Date && !model?.Time\">\r\n    <h3>\r\n      Date :\r\n      <strong\r\n        >{{ model?.Date | date: \"dd/MM/yyyy\" }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row top_bar_blue\">\r\n  <div class=\"col s12 d-flex justify-space-between\">\r\n    <ul class=\"breadcrumb\">\r\n\r\n        <li> <button type=\"button\" routerLink=\"/vc/participant/{{vCCode}}\">\r\n          Participant Report\r\n        </button></li>\r\n        <li><button routerLink=\"/vcreport/vcagendareport/{{vCCode}}\">Agenda</button></li>\r\n        <li><button type=\"button\">District</button></li>\r\n    </ul>\r\n\r\n    <button class=\"btn btn-info\" routerLink=\"/vc/participant/{{vCCode}}\">Back To Main</button>\r\n  </div>\r\n</div>\r\n<div class=\"row pattern_bg\" *ngIf=\"listModel?.length > 0\">\r\n  <div class=\"col s12 m6 l3 xl3\" *ngFor=\"let dist of listModel; let i = index\">\r\n  <a href=\"javascript:void(0);\" routerLink=\"/vcreport/vclocationreport/{{vCCode}}/{{dist.DistrictCode}}\" class=\"location-bx\"\r\n  [ngStyle]=\"{'background': defaultColors[i]}\">\r\n  <div class=\"location_title\">{{dist.DistrictTitle}}</div>\r\n  <div class=\"location_count\">{{dist.ParticipantCountByDistrict}}</div>\r\n  </a>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.html ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<div class=\"row top_bar_title\">\r\n  <div class=\"col s12 m6 l8 xl8\">\r\n    <h3>\r\n      Meeting Title : <strong> {{ vcmodel?.ShortDescription }} </strong>\r\n    </h3>\r\n  </div>\r\n  <div class=\"col s12 m6 l4 xl4\" *ngIf=\"vcmodel?.Date && vcmodel?.Time\">\r\n    <h3>\r\n      Date & Time :\r\n      <strong\r\n        >{{ vcmodel?.Date | date: \"dd/MM/yyyy\" }} at {{ vcmodel?.Time }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n   <div class=\"col s12 m6 l4 xl4\" *ngIf=\"vcmodel?.Date && !vcmodel?.Time\">\r\n    <h3>\r\n      Date :\r\n      <strong\r\n        >{{ vcmodel?.Date | date: \"dd/MM/yyyy\" }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row top_bar_blue\">\r\n    <div class=\"col s12 d-flex justify-space-between\">\r\n\r\n        <ul class=\"breadcrumb\">\r\n\t\t\t<li><button type=\"button\" routerLink=\"/vc/participant/{{model?.VCCreateCode}}\">\r\n\t\t\t\tParticipant Report\r\n\t\t\t  </button></li>\r\n\t\t\t<li><button routerLink=\"/vcreport/vcagendareport/{{model?.VCCreateCode}}\">Agenda</button></li>\r\n\t\t\t<li><button type=\"button\" routerLink=\"/vcreport/vcdistrictreport/{{model?.VCCreateCode}}\">District</button></li>\r\n\t\t\t<li><button type=\"button\">Location</button></li>\r\n          </ul>\r\n\r\n          <button class=\"btn btn-info\"  routerLink=\"/vc/participant/{{model?.VCCreateCode}}\">Back To Main</button>\r\n\t</div>\r\n</div>\r\n\r\n\r\n<div class=\"row pattern_bg\" *ngIf=\"listModel?.length>0\">\r\n\r\n\t<div class=\"col s12 m6 l3 xl3\" *ngFor=\"let loct of listModel; let i = index\">\r\n\t\t<a  href=\"javascript:void(0);\" routerLink=\"/vcreport/vcparticipantreport/{{model?.VCCreateCode}}/{{model?.DistrictCode}}/{{loct.LocationCode}}\" class=\"location-bx\"\r\n\t\t[ngStyle]=\"{'border-top-color': defaultColors[i]}\">\r\n\t\t\t<div class=\"location_title\">{{loct.locationName}}</div>\r\n            <div class=\"location_count\">{{loct.ParticipantCountByLocation}}</div>\r\n        </a>\r\n\t</div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.html":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.html ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<div class=\"row top_bar_title\">\r\n  <div class=\"col s12 m6 l8 xl8\">\r\n    <h3>\r\n      Meeting Title : <strong> {{ vcmodel?.ShortDescription }} </strong>\r\n    </h3>\r\n  </div>\r\n  <div class=\"col s12 m6 l4 xl4\" *ngIf=\"vcmodel?.Date && vcmodel?.Time\">\r\n    <h3>\r\n      Date & Time :\r\n      <strong\r\n        >{{ vcmodel?.Date | date: \"dd/MM/yyyy\" }} at {{ vcmodel?.Time }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n   <div class=\"col s12 m6 l4 xl4\" *ngIf=\"vcmodel?.Date && !vcmodel?.Time\">\r\n    <h3>\r\n      Date :\r\n      <strong\r\n        >{{ vcmodel?.Date | date: \"dd/MM/yyyy\" }}\r\n      </strong>\r\n    </h3>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row top_bar_blue\">\r\n    <div class=\"col s12 d-flex justify-space-between\">\r\n\r\n        <ul class=\"breadcrumb\">\r\n            <li><button type=\"button\" routerLink=\"/vc/participant/{{model?.VCCreateCode}}\">\r\n\t\t\t\tParticipant Report\r\n\t\t\t  </button></li>\r\n            <li><button routerLink=\"/vcreport/vcagendareport/{{model?.VCCreateCode}}\">Agenda</button></li>\r\n\t\t\t<li><button type=\"button\" routerLink=\"/vcreport/vcdistrictreport/{{model?.VCCreateCode}}\">District</button></li>\r\n            <li><button type=\"button\" routerLink=\"/vcreport/vclocationreport/{{model?.VCCreateCode}}/{{model?.DistrictCode}}\">Location</button></li>\r\n            <li><button type=\"button\">Participants List</button></li>\r\n          </ul>\r\n\r\n          <button class=\"btn btn-info\"  routerLink=\"/vc/participant/{{model?.VCCreateCode}}\">Back To Main</button>\r\n\r\n\r\n\t</div>\r\n</div>\r\n\r\n\r\n<div class=\"row pattern_bg\" *ngIf=\"listModel?.length>0\">\r\n\r\n\t<div class=\"col s12 m6 l3 xl3\" *ngFor=\"let part of listModel; let i = index\">\r\n\t\t<a href=\"javascript:void(0);\" class=\"location-bx\" >\r\n\t\t\t<div class=\"location_title\">{{part.ParticipantName}}</div>\r\n            <div class=\"location_designation\" [ngStyle]=\"{'background': defaultColors[i]}\">{{part.Designation}}</div>\r\n        </a>\r\n    </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Shared/Model/VC/vc-g-report.model.ts":
/*!******************************************************!*\
  !*** ./src/app/Shared/Model/VC/vc-g-report.model.ts ***!
  \******************************************************/
/*! exports provided: GraphicalReportByDistrictModel, GraphicalReportByLocationModel, VCGLocationFilterModel, GraphicalParticipantReportByLocationModel, VCGParticipantFilterModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicalReportByDistrictModel", function() { return GraphicalReportByDistrictModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicalReportByLocationModel", function() { return GraphicalReportByLocationModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCGLocationFilterModel", function() { return VCGLocationFilterModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicalParticipantReportByLocationModel", function() { return GraphicalParticipantReportByLocationModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCGParticipantFilterModel", function() { return VCGParticipantFilterModel; });
var GraphicalReportByDistrictModel = /** @class */ (function () {
    function GraphicalReportByDistrictModel() {
    }
    return GraphicalReportByDistrictModel;
}());

var GraphicalReportByLocationModel = /** @class */ (function () {
    function GraphicalReportByLocationModel() {
    }
    return GraphicalReportByLocationModel;
}());

var VCGLocationFilterModel = /** @class */ (function () {
    function VCGLocationFilterModel() {
    }
    return VCGLocationFilterModel;
}());

var GraphicalParticipantReportByLocationModel = /** @class */ (function () {
    function GraphicalParticipantReportByLocationModel() {
    }
    return GraphicalParticipantReportByLocationModel;
}());

var VCGParticipantFilterModel = /** @class */ (function () {
    function VCGParticipantFilterModel() {
    }
    return VCGParticipantFilterModel;
}());



/***/ }),

/***/ "./src/app/Shared/Service/VC/vc-g-report.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/Shared/Service/VC/vc-g-report.service.ts ***!
  \**********************************************************/
/*! exports provided: VCGraphicalReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCGraphicalReportService", function() { return VCGraphicalReportService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");




var VCGraphicalReportService = /** @class */ (function () {
    function VCGraphicalReportService(_baseService) {
        this._baseService = _baseService;
    }
    VCGraphicalReportService.prototype.GetDistrictCountByVC = function (vCCode) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCGReportByDistrictURL + vCCode);
    };
    VCGraphicalReportService.prototype.GetLocationCountByDistrict = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCGReportByLocationURL, model);
    };
    VCGraphicalReportService.prototype.GetParticipantByLocation = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].VCGParticipantByLocationURL, model);
    };
    VCGraphicalReportService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    VCGraphicalReportService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], VCGraphicalReportService);
    return VCGraphicalReportService;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".top_bar_title {background: #ffffff;padding: 15px;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.top_bar_title h3 {font-size: 18px;margin: 0px;background: #5f879a;border-radius: 30px;padding: 7px 15px;color: #fff;}.top_bar_title h3 strong {font-weight: bold;}@media (max-width:1024px) {.breadcrumb li a, .breadcrumb li button {padding: 5px;}.breadcrumb li button:after, .breadcrumb li button:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}.enter-bx {font-size: 15px;margin-bottom: 20px;}}@media (max-width:767px) {.breadcrumb li a {padding: 5px;}.breadcrumb li a:after, .breadcrumb li a:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}}.breadcrumb {list-style: none;overflow: hidden;margin: 0px 0px;padding: 0;}.breadcrumb li {float: left;}.breadcrumb li a, .breadcrumb li button {color: white;text-decoration: none;padding: 10px 20px 10px 55px;background: brown;background: hsla(34,85%,35%,1);position: relative;display: block;float: left;font-size: 14px;border: none;cursor: pointer;}.breadcrumb li a:after, .breadcrumb li button:after {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid hsla(34,85%,35%,1);position: absolute;top: 50%;margin-top: -50px;left: 100%;z-index: 2;}.breadcrumb li a:before, .breadcrumb li button:before {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid white;position: absolute;top: 50%;margin-top: -50px;margin-left: 1px;left: 100%;z-index: 1;}.breadcrumb li:first-child a, .breadcrumb li:first-child button {padding-left: 10px;}.breadcrumb li:nth-child(2) button {background: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(2) button:after {border-left-color: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(3) button {background: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(3) button:after {border-left-color: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button {background: hsla(34,85%,65%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button:after {border-left-color: hsla(34,85%,65%,1);}.breadcrumb li:nth-child(5) button {background: hsla(34,85%,75%,1);}.breadcrumb li:nth-child(5) button:after {border-left-color: hsla(34,85%,75%,1);}.d-flex {display: flex!important;}.justify-space-between {justify-content: space-between!important;}.pattern_bg {background-repeat: repeat;background-size: 26% !important;padding: 12px 12px 25px;position: relative;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.white-bx-margin {background: #2e3073 !important;padding: 0px;}.enter-bx {background: #1E7FC3;color: #fff;width: 100%;padding: 20px 50px;font-size: 23px;min-height: 400px;border-radius: 0px;overflow: hidden;outline: solid 1px #8bcaf7;outline-offset: -25px;outline-style: dashed;outline-width: 2px;display: flex!important;align-items: center!important;justify-content: center!important;text-align: justify;flex-direction: column;}.next_arrow {max-width: 50px;margin-top: 25px;}.textdec{text-align: center;color: black;font-weight: bold;}.bx-title {text-align: center;font-size: 28px;margin: 0px;padding: 12px;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92Yy1ncmFwaGljYWwtcmVwb3J0L3ZjLWFnZW5kYS1kZXRhaWwvdmMtYWdlbmRhLWRldGFpbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQixtQkFBbUIsQ0FBQyxhQUFhLENBQUMsNENBQTRDLENBQUMsQ0FBQyxtQkFBbUIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQywwQkFBMEIsaUJBQWlCLENBQUMsQ0FBQywyQkFBMkIseUNBQXlDLFlBQVksQ0FBQyxDQUFDLDBEQUEwRCxhQUFhLENBQUMsQ0FBQyx3RUFBd0Usa0JBQWtCLENBQUMsQ0FBQyxXQUFXLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLGtCQUFrQixZQUFZLENBQUMsQ0FBQyxnREFBZ0QsYUFBYSxDQUFDLENBQUMsd0VBQXdFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxhQUFhLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsV0FBVyxDQUFDLENBQUMseUNBQXlDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyw0QkFBNEIsQ0FBQyxpQkFBaUIsQ0FBQyw4QkFBOEIsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMscURBQXFELFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxxQ0FBcUMsQ0FBQywwQ0FBMEMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHVEQUF1RCxZQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUMscUNBQXFDLENBQUMsNkJBQTZCLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxpRUFBaUUsa0JBQWtCLENBQUMsQ0FBQyxvQ0FBb0MsOEJBQThCLENBQUMsQ0FBQywwQ0FBMEMscUNBQXFDLENBQUMsQ0FBQyxvQ0FBb0MsOEJBQThCLENBQUMsbUJBQW1CLENBQUMsQ0FBQywwQ0FBMEMscUNBQXFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxvQ0FBb0MsOEJBQThCLENBQUMsbUJBQW1CLENBQUMsQ0FBQywwQ0FBMEMscUNBQXFDLENBQUMsQ0FBQyxvQ0FBb0MsOEJBQThCLENBQUMsQ0FBQywwQ0FBMEMscUNBQXFDLENBQUMsQ0FBQyxTQUF3Qyx1QkFBdUIsQ0FBQyxDQUFDLHdCQUF5RCx3Q0FBd0MsQ0FBQyxDQUFDLGFBQWEseUJBQXlCLENBQUMsK0JBQStCLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsNENBQTRDLENBQUMsQ0FBQyxrQkFBa0IsOEJBQThCLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBZ0MsdUJBQXVCLENBQWtDLDZCQUE2QixDQUFpQyxpQ0FBaUMsQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLGFBQWEsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC92Yy1ncmFwaGljYWwtcmVwb3J0L3ZjLWFnZW5kYS1kZXRhaWwvdmMtYWdlbmRhLWRldGFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvcF9iYXJfdGl0bGUge2JhY2tncm91bmQ6ICNmZmZmZmY7cGFkZGluZzogMTVweDtib3gtc2hhZG93OiAwcHggMHB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC4xKTt9LnRvcF9iYXJfdGl0bGUgaDMge2ZvbnQtc2l6ZTogMThweDttYXJnaW46IDBweDtiYWNrZ3JvdW5kOiAjNWY4NzlhO2JvcmRlci1yYWRpdXM6IDMwcHg7cGFkZGluZzogN3B4IDE1cHg7Y29sb3I6ICNmZmY7fS50b3BfYmFyX3RpdGxlIGgzIHN0cm9uZyB7Zm9udC13ZWlnaHQ6IGJvbGQ7fUBtZWRpYSAobWF4LXdpZHRoOjEwMjRweCkgey5icmVhZGNydW1iIGxpIGEsIC5icmVhZGNydW1iIGxpIGJ1dHRvbiB7cGFkZGluZzogNXB4O30uYnJlYWRjcnVtYiBsaSBidXR0b246YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjpiZWZvcmV7ZGlzcGxheTogbm9uZTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbiwgLmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbiB7cGFkZGluZy1yaWdodDogNXB4O30uZW50ZXItYngge2ZvbnQtc2l6ZTogMTVweDttYXJnaW4tYm90dG9tOiAyMHB4O319QG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpIHsuYnJlYWRjcnVtYiBsaSBhIHtwYWRkaW5nOiA1cHg7fS5icmVhZGNydW1iIGxpIGE6YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGE6YmVmb3Jle2Rpc3BsYXk6IG5vbmU7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgzKSBidXR0b24sIC5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg0KSBidXR0b24ge3BhZGRpbmctcmlnaHQ6IDVweDt9fS5icmVhZGNydW1iIHtsaXN0LXN0eWxlOiBub25lO292ZXJmbG93OiBoaWRkZW47bWFyZ2luOiAwcHggMHB4O3BhZGRpbmc6IDA7fS5icmVhZGNydW1iIGxpIHtmbG9hdDogbGVmdDt9LmJyZWFkY3J1bWIgbGkgYSwgLmJyZWFkY3J1bWIgbGkgYnV0dG9uIHtjb2xvcjogd2hpdGU7dGV4dC1kZWNvcmF0aW9uOiBub25lO3BhZGRpbmc6IDEwcHggMjBweCAxMHB4IDU1cHg7YmFja2dyb3VuZDogYnJvd247YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsMzUlLDEpO3Bvc2l0aW9uOiByZWxhdGl2ZTtkaXNwbGF5OiBibG9jaztmbG9hdDogbGVmdDtmb250LXNpemU6IDE0cHg7Ym9yZGVyOiBub25lO2N1cnNvcjogcG9pbnRlcjt9LmJyZWFkY3J1bWIgbGkgYTphZnRlciwgLmJyZWFkY3J1bWIgbGkgYnV0dG9uOmFmdGVyIHtjb250ZW50OiBcIiBcIjtkaXNwbGF5OiBibG9jazt3aWR0aDogMDtoZWlnaHQ6IDA7Ym9yZGVyLXRvcDogNTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItYm90dG9tOiA1MHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0OiAzMHB4IHNvbGlkIGhzbGEoMzQsODUlLDM1JSwxKTtwb3NpdGlvbjogYWJzb2x1dGU7dG9wOiA1MCU7bWFyZ2luLXRvcDogLTUwcHg7bGVmdDogMTAwJTt6LWluZGV4OiAyO30uYnJlYWRjcnVtYiBsaSBhOmJlZm9yZSwgLmJyZWFkY3J1bWIgbGkgYnV0dG9uOmJlZm9yZSB7Y29udGVudDogXCIgXCI7ZGlzcGxheTogYmxvY2s7d2lkdGg6IDA7aGVpZ2h0OiAwO2JvcmRlci10b3A6IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTogNTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdDogMzBweCBzb2xpZCB3aGl0ZTtwb3NpdGlvbjogYWJzb2x1dGU7dG9wOiA1MCU7bWFyZ2luLXRvcDogLTUwcHg7bWFyZ2luLWxlZnQ6IDFweDtsZWZ0OiAxMDAlO3otaW5kZXg6IDE7fS5icmVhZGNydW1iIGxpOmZpcnN0LWNoaWxkIGEsIC5icmVhZGNydW1iIGxpOmZpcnN0LWNoaWxkIGJ1dHRvbiB7cGFkZGluZy1sZWZ0OiAxMHB4O30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMikgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw0NSUsMSk7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgyKSBidXR0b246YWZ0ZXIge2JvcmRlci1sZWZ0LWNvbG9yOiBoc2xhKDM0LDg1JSw0NSUsMSk7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgzKSBidXR0b24ge2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDU1JSwxKTtwYWRkaW5nLXJpZ2h0OiA1NXB4O30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNTUlLDEpO3BhZGRpbmctcmlnaHQ6IDU1cHg7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg0KSBidXR0b24ge2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDY1JSwxKTtwYWRkaW5nLXJpZ2h0OiA1NXB4O30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNjUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNSkgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw3NSUsMSk7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg1KSBidXR0b246YWZ0ZXIge2JvcmRlci1sZWZ0LWNvbG9yOiBoc2xhKDM0LDg1JSw3NSUsMSk7fS5kLWZsZXgge2Rpc3BsYXk6IC1tcy1mbGV4Ym94IWltcG9ydGFudDtkaXNwbGF5OiBmbGV4IWltcG9ydGFudDt9Lmp1c3RpZnktc3BhY2UtYmV0d2VlbiB7LW1zLWZsZXgtcGFjazoganVzdGlmeSFpbXBvcnRhbnQ7anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuIWltcG9ydGFudDt9LnBhdHRlcm5fYmcge2JhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7YmFja2dyb3VuZC1zaXplOiAyNiUgIWltcG9ydGFudDtwYWRkaW5nOiAxMnB4IDEycHggMjVweDtwb3NpdGlvbjogcmVsYXRpdmU7Ym94LXNoYWRvdzogMHB4IDBweCAxMHB4IDBweCByZ2JhKDAsMCwwLDAuMSk7fS53aGl0ZS1ieC1tYXJnaW4ge2JhY2tncm91bmQ6ICMyZTMwNzMgIWltcG9ydGFudDtwYWRkaW5nOiAwcHg7fS5lbnRlci1ieCB7YmFja2dyb3VuZDogIzFFN0ZDMztjb2xvcjogI2ZmZjt3aWR0aDogMTAwJTtwYWRkaW5nOiAyMHB4IDUwcHg7Zm9udC1zaXplOiAyM3B4O21pbi1oZWlnaHQ6IDQwMHB4O2JvcmRlci1yYWRpdXM6IDBweDtvdmVyZmxvdzogaGlkZGVuO291dGxpbmU6IHNvbGlkIDFweCAjOGJjYWY3O291dGxpbmUtb2Zmc2V0OiAtMjVweDtvdXRsaW5lLXN0eWxlOiBkYXNoZWQ7b3V0bGluZS13aWR0aDogMnB4O2Rpc3BsYXk6IC1tcy1mbGV4Ym94IWltcG9ydGFudDtkaXNwbGF5OiBmbGV4IWltcG9ydGFudDstbXMtZmxleC1hbGlnbjogY2VudGVyIWltcG9ydGFudDthbGlnbi1pdGVtczogY2VudGVyIWltcG9ydGFudDstbXMtZmxleC1wYWNrOiBjZW50ZXIhaW1wb3J0YW50O2p1c3RpZnktY29udGVudDogY2VudGVyIWltcG9ydGFudDt0ZXh0LWFsaWduOiBqdXN0aWZ5O2ZsZXgtZGlyZWN0aW9uOiBjb2x1bW47fS5uZXh0X2Fycm93IHttYXgtd2lkdGg6IDUwcHg7bWFyZ2luLXRvcDogMjVweDt9LnRleHRkZWN7dGV4dC1hbGlnbjogY2VudGVyO2NvbG9yOiBibGFjaztmb250LXdlaWdodDogYm9sZDt9LmJ4LXRpdGxlIHt0ZXh0LWFsaWduOiBjZW50ZXI7Zm9udC1zaXplOiAyOHB4O21hcmdpbjogMHB4O3BhZGRpbmc6IDEycHg7fSJdfQ== */"

/***/ }),

/***/ "./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.ts ***!
  \********************************************************************************************/
/*! exports provided: VcAgendaDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcAgendaDetailComponent", function() { return VcAgendaDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");







var VcAgendaDetailComponent = /** @class */ (function () {
    function VcAgendaDetailComponent(_vccCreationService, _parentComponent, _route, _alertService) {
        this._vccCreationService = _vccCreationService;
        this._parentComponent = _parentComponent;
        this._route = _route;
        this._alertService = _alertService;
        this._parentComponent.setpagelayout("", "", "", "", true);
        this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["VCCreationModel"]();
        if (this._route.snapshot.params.id) {
            this.id = this._route.snapshot.params.id;
        }
    }
    VcAgendaDetailComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    VcAgendaDetailComponent.prototype.GetById = function () {
        var _this = this;
        this._vccCreationService.GetById(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_2__["VCCreationModel"]();
            _this._alertService.error(error.message);
        });
    };
    VcAgendaDetailComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_3__["VcCreationService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] }
    ]; };
    VcAgendaDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vc-agenda-detail',
            template: __webpack_require__(/*! raw-loader!./vc-agenda-detail.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.html"),
            styles: [__webpack_require__(/*! ./vc-agenda-detail.component.css */ "./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_3__["VcCreationService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"]])
    ], VcAgendaDetailComponent);
    return VcAgendaDetailComponent;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vc-graphical-report-routing.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vc-graphical-report-routing.module.ts ***!
  \***********************************************************************************/
/*! exports provided: VcGraphicalReportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcGraphicalReportRoutingModule", function() { return VcGraphicalReportRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _vcg_district_report_vcg_district_report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vcg-district-report/vcg-district-report.component */ "./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.ts");
/* harmony import */ var _vcg_location_report_vcg_location_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vcg-location-report/vcg-location-report.component */ "./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.ts");
/* harmony import */ var _vcg_participant_report_vcg_participant_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vcg-participant-report/vcg-participant-report.component */ "./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.ts");
/* harmony import */ var _vcg_agenda_report_vcg_agenda_report_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vcg-agenda-report/vcg-agenda-report.component */ "./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.ts");
/* harmony import */ var _vc_agenda_detail_vc_agenda_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vc-agenda-detail/vc-agenda-detail.component */ "./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.ts");








var routes = [
    {
        path: "vcdistrictreport/:id",
        component: _vcg_district_report_vcg_district_report_component__WEBPACK_IMPORTED_MODULE_3__["VcgDistrictReportComponent"],
    },
    {
        path: "vclocationreport/:vccode/:district",
        component: _vcg_location_report_vcg_location_report_component__WEBPACK_IMPORTED_MODULE_4__["VcgLocationReportComponent"],
    },
    {
        path: "vcparticipantreport/:vccode/:district/:location",
        component: _vcg_participant_report_vcg_participant_report_component__WEBPACK_IMPORTED_MODULE_5__["VcgParticipantReportComponent"],
    },
    {
        path: "vcagendareport/:id",
        component: _vcg_agenda_report_vcg_agenda_report_component__WEBPACK_IMPORTED_MODULE_6__["VcgAgendaReportComponent"],
    },
    {
        path: "vcagendadetail/:id",
        component: _vc_agenda_detail_vc_agenda_detail_component__WEBPACK_IMPORTED_MODULE_7__["VcAgendaDetailComponent"],
    }
];
var VcGraphicalReportRoutingModule = /** @class */ (function () {
    function VcGraphicalReportRoutingModule() {
    }
    VcGraphicalReportRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], VcGraphicalReportRoutingModule);
    return VcGraphicalReportRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vc-graphical-report.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vc-graphical-report.module.ts ***!
  \***************************************************************************/
/*! exports provided: VcGraphicalReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcGraphicalReportModule", function() { return VcGraphicalReportModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _vc_graphical_report_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vc-graphical-report-routing.module */ "./src/app/content/vc-graphical-report/vc-graphical-report-routing.module.ts");
/* harmony import */ var _vcg_district_report_vcg_district_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vcg-district-report/vcg-district-report.component */ "./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.ts");
/* harmony import */ var _vcg_participant_report_vcg_participant_report_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vcg-participant-report/vcg-participant-report.component */ "./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.ts");
/* harmony import */ var _vcg_location_report_vcg_location_report_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vcg-location-report/vcg-location-report.component */ "./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.ts");
/* harmony import */ var _vcg_agenda_report_vcg_agenda_report_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vcg-agenda-report/vcg-agenda-report.component */ "./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.ts");
/* harmony import */ var _vc_agenda_detail_vc_agenda_detail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vc-agenda-detail/vc-agenda-detail.component */ "./src/app/content/vc-graphical-report/vc-agenda-detail/vc-agenda-detail.component.ts");









var VcGraphicalReportModule = /** @class */ (function () {
    function VcGraphicalReportModule() {
    }
    VcGraphicalReportModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_vcg_district_report_vcg_district_report_component__WEBPACK_IMPORTED_MODULE_4__["VcgDistrictReportComponent"], _vcg_participant_report_vcg_participant_report_component__WEBPACK_IMPORTED_MODULE_5__["VcgParticipantReportComponent"], _vcg_location_report_vcg_location_report_component__WEBPACK_IMPORTED_MODULE_6__["VcgLocationReportComponent"], _vcg_agenda_report_vcg_agenda_report_component__WEBPACK_IMPORTED_MODULE_7__["VcgAgendaReportComponent"], _vc_agenda_detail_vc_agenda_detail_component__WEBPACK_IMPORTED_MODULE_8__["VcAgendaDetailComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _vc_graphical_report_routing_module__WEBPACK_IMPORTED_MODULE_3__["VcGraphicalReportRoutingModule"]
            ]
        })
    ], VcGraphicalReportModule);
    return VcGraphicalReportModule;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " .breadcrumb {list-style: none;overflow: hidden;margin: 0px 0px;padding: 0;}.breadcrumb li {float: left;}.breadcrumb li a, .breadcrumb li button {color: white;text-decoration: none;padding: 10px 20px 10px 55px;background: brown;background: hsla(34,85%,35%,1);position: relative;display: block;float: left;font-size: 14px;border: none;cursor: pointer;}.breadcrumb li a:after, .breadcrumb li button:after {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid hsla(34,85%,35%,1);position: absolute;top: 50%;margin-top: -50px;left: 100%;z-index: 2;}.breadcrumb li a:before, .breadcrumb li button:before {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid white;position: absolute;top: 50%;margin-top: -50px;margin-left: 1px;left: 100%;z-index: 1;}.breadcrumb li:first-child a, .breadcrumb li:first-child button {padding-left: 10px;}.breadcrumb li:nth-child(2) button {background: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(2) button:after {border-left-color: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(3) button {background: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(3) button:after {border-left-color: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button {background: hsla(34,85%,65%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button:after {border-left-color: hsla(34,85%,65%,1);}.breadcrumb li:nth-child(5) button {background: hsla(34,85%,75%,1);}.breadcrumb li:nth-child(5) button:after {border-left-color: hsla(34,85%,75%,1);}.d-flex {display: flex!important;}.justify-space-between {justify-content: space-between!important;}.pattern_bg {background-repeat: repeat;background-size: 26% !important;padding: 12px 12px 25px;position: relative;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.white-bx-margin {background: #2e3073 !important;padding: 0px;}.enter-bx {background: #1E7FC3;color: #fff;width: 100%;padding: 20px 50px;font-size: 23px;min-height: 400px;border-radius: 0px;overflow: hidden;outline: solid 1px #8bcaf7;outline-offset: -25px;outline-style: dashed;outline-width: 2px;display: flex!important;align-items: center!important;justify-content: center!important;text-align: justify;flex-direction: column;}.next_arrow {max-width: 50px;margin-top: 25px;}.textdec{text-align: center;color: black;font-weight: bold;}.bx-title {text-align: center;font-size: 28px;margin: 0px;padding: 12px;}@media (max-width:1024px) {.breadcrumb li a, .breadcrumb li button {padding: 5px;}.breadcrumb li button:after, .breadcrumb li button:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}.enter-bx {font-size: 15px;margin-bottom: 20px;}}@media (max-width:767px) {.breadcrumb li a {padding: 5px;}.breadcrumb li a:after, .breadcrumb li a:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}}.top_bar_title {background: #ffffff;padding: 15px;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.top_bar_title h3 {font-size: 18px;margin: 0px;background: #5f879a;border-radius: 30px;padding: 7px 15px;color: #fff;}.top_bar_title h3 strong {font-weight: bold;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92Yy1ncmFwaGljYWwtcmVwb3J0L3ZjZy1hZ2VuZGEtcmVwb3J0L3ZjZy1hZ2VuZGEtcmVwb3J0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUMsYUFBYSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQWdCLFdBQVcsQ0FBQyxDQUFDLHlDQUF5QyxZQUFZLENBQUMscUJBQXFCLENBQUMsNEJBQTRCLENBQUMsaUJBQWlCLENBQUMsOEJBQThCLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHFEQUFxRCxZQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUMscUNBQXFDLENBQUMsMENBQTBDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyx1REFBdUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxDQUFDLHFDQUFxQyxDQUFDLDZCQUE2QixDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsaUVBQWlFLGtCQUFrQixDQUFDLENBQUMsb0NBQW9DLDhCQUE4QixDQUFDLENBQUMsMENBQTBDLHFDQUFxQyxDQUFDLENBQUMsb0NBQW9DLDhCQUE4QixDQUFDLG1CQUFtQixDQUFDLENBQUMsMENBQTBDLHFDQUFxQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsb0NBQW9DLDhCQUE4QixDQUFDLG1CQUFtQixDQUFDLENBQUMsMENBQTBDLHFDQUFxQyxDQUFDLENBQUMsb0NBQW9DLDhCQUE4QixDQUFDLENBQUMsMENBQTBDLHFDQUFxQyxDQUFDLENBQUMsU0FBd0MsdUJBQXVCLENBQUMsQ0FBQyx3QkFBeUQsd0NBQXdDLENBQUMsQ0FBQyxhQUFhLHlCQUF5QixDQUFDLCtCQUErQixDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLDRDQUE0QyxDQUFDLENBQUMsa0JBQWtCLDhCQUE4QixDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsbUJBQW1CLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQWdDLHVCQUF1QixDQUFrQyw2QkFBNkIsQ0FBaUMsaUNBQWlDLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxhQUFhLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLDJCQUEyQix5Q0FBeUMsWUFBWSxDQUFDLENBQUMsMERBQTBELGFBQWEsQ0FBQyxDQUFDLHdFQUF3RSxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQywwQkFBMEIsa0JBQWtCLFlBQVksQ0FBQyxDQUFDLGdEQUFnRCxhQUFhLENBQUMsQ0FBQyx3RUFBd0Usa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixtQkFBbUIsQ0FBQyxhQUFhLENBQUMsNENBQTRDLENBQUMsQ0FBQyxtQkFBbUIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQywwQkFBMEIsaUJBQWlCLENBQUMiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L3ZjLWdyYXBoaWNhbC1yZXBvcnQvdmNnLWFnZW5kYS1yZXBvcnQvdmNnLWFnZW5kYS1yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiAuYnJlYWRjcnVtYiB7bGlzdC1zdHlsZTogbm9uZTtvdmVyZmxvdzogaGlkZGVuO21hcmdpbjogMHB4IDBweDtwYWRkaW5nOiAwO30uYnJlYWRjcnVtYiBsaSB7ZmxvYXQ6IGxlZnQ7fS5icmVhZGNydW1iIGxpIGEsIC5icmVhZGNydW1iIGxpIGJ1dHRvbiB7Y29sb3I6IHdoaXRlO3RleHQtZGVjb3JhdGlvbjogbm9uZTtwYWRkaW5nOiAxMHB4IDIwcHggMTBweCA1NXB4O2JhY2tncm91bmQ6IGJyb3duO2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDM1JSwxKTtwb3NpdGlvbjogcmVsYXRpdmU7ZGlzcGxheTogYmxvY2s7ZmxvYXQ6IGxlZnQ7Zm9udC1zaXplOiAxNHB4O2JvcmRlcjogbm9uZTtjdXJzb3I6IHBvaW50ZXI7fS5icmVhZGNydW1iIGxpIGE6YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjphZnRlciB7Y29udGVudDogXCIgXCI7ZGlzcGxheTogYmxvY2s7d2lkdGg6IDA7aGVpZ2h0OiAwO2JvcmRlci10b3A6IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTogNTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdDogMzBweCBzb2xpZCBoc2xhKDM0LDg1JSwzNSUsMSk7cG9zaXRpb246IGFic29sdXRlO3RvcDogNTAlO21hcmdpbi10b3A6IC01MHB4O2xlZnQ6IDEwMCU7ei1pbmRleDogMjt9LmJyZWFkY3J1bWIgbGkgYTpiZWZvcmUsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjpiZWZvcmUge2NvbnRlbnQ6IFwiIFwiO2Rpc3BsYXk6IGJsb2NrO3dpZHRoOiAwO2hlaWdodDogMDtib3JkZXItdG9wOiA1MHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQ6IDMwcHggc29saWQgd2hpdGU7cG9zaXRpb246IGFic29sdXRlO3RvcDogNTAlO21hcmdpbi10b3A6IC01MHB4O21hcmdpbi1sZWZ0OiAxcHg7bGVmdDogMTAwJTt6LWluZGV4OiAxO30uYnJlYWRjcnVtYiBsaTpmaXJzdC1jaGlsZCBhLCAuYnJlYWRjcnVtYiBsaTpmaXJzdC1jaGlsZCBidXR0b24ge3BhZGRpbmctbGVmdDogMTBweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDIpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNDUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMikgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNDUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw1NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDU1JSwxKTtwYWRkaW5nLXJpZ2h0OiA1NXB4O30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw2NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDY1JSwxKTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDUpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNzUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNSkgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNzUlLDEpO30uZC1mbGV4IHtkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7ZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7fS5qdXN0aWZ5LXNwYWNlLWJldHdlZW4gey1tcy1mbGV4LXBhY2s6IGp1c3RpZnkhaW1wb3J0YW50O2p1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbiFpbXBvcnRhbnQ7fS5wYXR0ZXJuX2JnIHtiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O2JhY2tncm91bmQtc2l6ZTogMjYlICFpbXBvcnRhbnQ7cGFkZGluZzogMTJweCAxMnB4IDI1cHg7cG9zaXRpb246IHJlbGF0aXZlO2JveC1zaGFkb3c6IDBweCAwcHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjEpO30ud2hpdGUtYngtbWFyZ2luIHtiYWNrZ3JvdW5kOiAjMmUzMDczICFpbXBvcnRhbnQ7cGFkZGluZzogMHB4O30uZW50ZXItYngge2JhY2tncm91bmQ6ICMxRTdGQzM7Y29sb3I6ICNmZmY7d2lkdGg6IDEwMCU7cGFkZGluZzogMjBweCA1MHB4O2ZvbnQtc2l6ZTogMjNweDttaW4taGVpZ2h0OiA0MDBweDtib3JkZXItcmFkaXVzOiAwcHg7b3ZlcmZsb3c6IGhpZGRlbjtvdXRsaW5lOiBzb2xpZCAxcHggIzhiY2FmNztvdXRsaW5lLW9mZnNldDogLTI1cHg7b3V0bGluZS1zdHlsZTogZGFzaGVkO291dGxpbmUtd2lkdGg6IDJweDtkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7ZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7LW1zLWZsZXgtYWxpZ246IGNlbnRlciFpbXBvcnRhbnQ7YWxpZ24taXRlbXM6IGNlbnRlciFpbXBvcnRhbnQ7LW1zLWZsZXgtcGFjazogY2VudGVyIWltcG9ydGFudDtqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlciFpbXBvcnRhbnQ7dGV4dC1hbGlnbjoganVzdGlmeTtmbGV4LWRpcmVjdGlvbjogY29sdW1uO30ubmV4dF9hcnJvdyB7bWF4LXdpZHRoOiA1MHB4O21hcmdpbi10b3A6IDI1cHg7fS50ZXh0ZGVje3RleHQtYWxpZ246IGNlbnRlcjtjb2xvcjogYmxhY2s7Zm9udC13ZWlnaHQ6IGJvbGQ7fS5ieC10aXRsZSB7dGV4dC1hbGlnbjogY2VudGVyO2ZvbnQtc2l6ZTogMjhweDttYXJnaW46IDBweDtwYWRkaW5nOiAxMnB4O31AbWVkaWEgKG1heC13aWR0aDoxMDI0cHgpIHsuYnJlYWRjcnVtYiBsaSBhLCAuYnJlYWRjcnVtYiBsaSBidXR0b24ge3BhZGRpbmc6IDVweDt9LmJyZWFkY3J1bWIgbGkgYnV0dG9uOmFmdGVyLCAuYnJlYWRjcnVtYiBsaSBidXR0b246YmVmb3Jle2Rpc3BsYXk6IG5vbmU7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgzKSBidXR0b24sIC5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg0KSBidXR0b24ge3BhZGRpbmctcmlnaHQ6IDVweDt9LmVudGVyLWJ4IHtmb250LXNpemU6IDE1cHg7bWFyZ2luLWJvdHRvbTogMjBweDt9fUBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7LmJyZWFkY3J1bWIgbGkgYSB7cGFkZGluZzogNXB4O30uYnJlYWRjcnVtYiBsaSBhOmFmdGVyLCAuYnJlYWRjcnVtYiBsaSBhOmJlZm9yZXtkaXNwbGF5OiBub25lO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uLCAuYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uIHtwYWRkaW5nLXJpZ2h0OiA1cHg7fX0udG9wX2Jhcl90aXRsZSB7YmFja2dyb3VuZDogI2ZmZmZmZjtwYWRkaW5nOiAxNXB4O2JveC1zaGFkb3c6IDBweCAwcHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjEpO30udG9wX2Jhcl90aXRsZSBoMyB7Zm9udC1zaXplOiAxOHB4O21hcmdpbjogMHB4O2JhY2tncm91bmQ6ICM1Zjg3OWE7Ym9yZGVyLXJhZGl1czogMzBweDtwYWRkaW5nOiA3cHggMTVweDtjb2xvcjogI2ZmZjt9LnRvcF9iYXJfdGl0bGUgaDMgc3Ryb25nIHtmb250LXdlaWdodDogYm9sZDt9Il19 */"

/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: VcgAgendaReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcgAgendaReportComponent", function() { return VcgAgendaReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");







var VcgAgendaReportComponent = /** @class */ (function () {
    function VcgAgendaReportComponent(_vccCreationService, _alertService, _route, _parentComponent, _router) {
        this._vccCreationService = _vccCreationService;
        this._alertService = _alertService;
        this._route = _route;
        this._parentComponent = _parentComponent;
        this._router = _router;
        this._parentComponent.setpagelayout("", "", "", "", true);
        this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_3__["VCCreationModel"]();
        if (this._route.snapshot.params.id) {
            this.id = this._route.snapshot.params.id;
        }
    }
    VcgAgendaReportComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    VcgAgendaReportComponent.prototype.GetById = function () {
        var _this = this;
        this._vccCreationService.GetById(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_3__["VCCreationModel"]();
            _this._alertService.error(error.message);
        });
    };
    VcgAgendaReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_2__["VcCreationService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
    ]; };
    VcgAgendaReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vcg-agenda-report',
            template: __webpack_require__(/*! raw-loader!./vcg-agenda-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.html"),
            styles: [__webpack_require__(/*! ./vcg-agenda-report.component.css */ "./src/app/content/vc-graphical-report/vcg-agenda-report/vcg-agenda-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_2__["VcCreationService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], VcgAgendaReportComponent);
    return VcgAgendaReportComponent;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " .breadcrumb {list-style: none;overflow: hidden;margin: 0px 0px;padding: 0;}.breadcrumb li {float: left;}.breadcrumb li a, .breadcrumb li button {color: white;text-decoration: none;padding: 10px 20px 10px 55px;background: brown;background: hsla(34,85%,35%,1);position: relative;display: block;float: left;font-size: 14px;border: none;cursor: pointer;}.breadcrumb li a:after, .breadcrumb li button:after {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid hsla(34,85%,35%,1);position: absolute;top: 50%;margin-top: -50px;left: 100%;z-index: 2;}.breadcrumb li a:before, .breadcrumb li button:before {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid white;position: absolute;top: 50%;margin-top: -50px;margin-left: 1px;left: 100%;z-index: 1;}.breadcrumb li:first-child a, .breadcrumb li:first-child button {padding-left: 10px;}.breadcrumb li:nth-child(2) button {background: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(2) button:after {border-left-color: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(3) button {background: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(3) button:after {border-left-color: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button {background: hsla(34,85%,65%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button:after {border-left-color: hsla(34,85%,65%,1);}.breadcrumb li:nth-child(5) button {background: hsla(34,85%,75%,1);}.breadcrumb li:nth-child(5) button:after {border-left-color: hsla(34,85%,75%,1);}.d-flex {display: flex!important;}.justify-space-between {justify-content: space-between!important;}.pattern_bg {background-repeat: repeat;background-size: 26% !important;padding: 12px 12px 25px;position: relative;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.location-bx {border-top: 40px solid rgba(255,255,255,0.4);border-left: 25px solid transparent;border-right: 25px solid transparent;height: 0;width: 100%;min-height: 160px;background: #000;margin-top: 18px;border-radius: 17px;border-bottom: 40px solid rgba(255,255,255,0.4);text-align: center;padding: 10px;display: flex!important;align-items: center!important;justify-content: space-between!important;}.row .col:nth-child(1) .location-bx {background: #b8627f;}.row .col:nth-child(2) .location-bx {background: #d4a82b;}.row .col:nth-child(3) .location-bx {background: #feae54;}.row .col:nth-child(4) .location-bx {background: #fb4455;}.row .col:nth-child(5) .location-bx {background: #63afbb;}.row .col:nth-child(6) .location-bx {background: #00c3f0;}.row .col:nth-child(7) .location-bx {background: #00ab6b;}.row .col:nth-child(8) .location-bx {background: #ff476d;}.row .col:nth-child(9) .location-bx {background: #082a58;}.row .col:nth-child(10) .location-bx {background: #95bc11;}.row .col:nth-child(11) .location-bx {background: #8d0f3f;}.row .col:nth-child(12) .location-bx {background: #ea7b0f;}.location-bx .location_title {color: #fff;font-size: 20px;font-weight: 600;text-transform: capitalize;}.location-bx .location_count {display: block;font-size: 20px;background: #1d1f54;color: #fff;padding: 3px 6px;border-radius: 100%;line-height: normal;margin-left: 10px;border: dotted 2px #fff;}.white-bx-margin {background: #2e3073 !important;padding: 0px;}.d-flex {display: flex!important;}.justify-space-between {justify-content: space-between!important;}.pattern_bg {background-repeat: repeat;background-size: 26% !important;padding: 12px 12px 25px;position: relative;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.white-bx-margin {background: #2e3073 !important;padding: 0px;}.enter-bx {background: #1E7FC3;color: #fff;width: 100%;padding: 20px 50px;font-size: 23px;min-height: 400px;border-radius: 0px;overflow: hidden;outline: solid 1px #8bcaf7;outline-offset: -25px;outline-style: dashed;outline-width: 2px;display: flex!important;align-items: center!important;justify-content: center!important;text-align: justify;flex-direction: column;}.next_arrow {max-width: 50px;margin-top: 25px;}@media (max-width:1024px) {.breadcrumb li a, .breadcrumb li button {padding: 5px;}.breadcrumb li button:after, .breadcrumb li button:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}.enter-bx {font-size: 15px;margin-bottom: 20px;}}@media (max-width:767px) {.breadcrumb li a {padding: 5px;}.breadcrumb li a:after, .breadcrumb li a:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}}.top_bar_title {background: #ffffff;padding: 15px;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.top_bar_title h3 {font-size: 18px;margin: 0px;background: #5f879a;border-radius: 30px;padding: 7px 15px;color: #fff;}.top_bar_title h3 strong {font-weight: bold;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92Yy1ncmFwaGljYWwtcmVwb3J0L3ZjZy1kaXN0cmljdC1yZXBvcnQvdmNnLWRpc3RyaWN0LXJlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFDLGFBQWEsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixXQUFXLENBQUMsQ0FBQyx5Q0FBeUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLDRCQUE0QixDQUFDLGlCQUFpQixDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxxREFBcUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxDQUFDLHFDQUFxQyxDQUFDLDBDQUEwQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsdURBQXVELFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxxQ0FBcUMsQ0FBQyw2QkFBNkIsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGlFQUFpRSxrQkFBa0IsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLFNBQXdDLHVCQUF1QixDQUFDLENBQUMsd0JBQXlELHdDQUF3QyxDQUFDLENBQUMsYUFBYSx5QkFBeUIsQ0FBQywrQkFBK0IsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLGNBQWMsNENBQTRDLENBQUMsbUNBQW1DLENBQUMsb0NBQW9DLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQywrQ0FBK0MsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQWdDLHVCQUF1QixDQUFrQyw2QkFBNkIsQ0FBa0Msd0NBQXdDLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxzQ0FBc0MsbUJBQW1CLENBQUMsQ0FBQyxzQ0FBc0MsbUJBQW1CLENBQUMsQ0FBQyxzQ0FBc0MsbUJBQW1CLENBQUMsQ0FBQyw4QkFBOEIsV0FBVyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLDhCQUE4QixjQUFjLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLGtCQUFrQiw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUF3Qyx1QkFBdUIsQ0FBQyxDQUFDLHdCQUF5RCx3Q0FBd0MsQ0FBQyxDQUFDLGFBQWEseUJBQXlCLENBQUMsK0JBQStCLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsNENBQTRDLENBQUMsQ0FBQyxrQkFBa0IsOEJBQThCLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBZ0MsdUJBQXVCLENBQWtDLDZCQUE2QixDQUFpQyxpQ0FBaUMsQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLGFBQWEsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsMkJBQTJCLHlDQUF5QyxZQUFZLENBQUMsQ0FBQywwREFBMEQsYUFBYSxDQUFDLENBQUMsd0VBQXdFLGtCQUFrQixDQUFDLENBQUMsV0FBVyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixrQkFBa0IsWUFBWSxDQUFDLENBQUMsZ0RBQWdELGFBQWEsQ0FBQyxDQUFDLHdFQUF3RSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLG1CQUFtQixlQUFlLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLDBCQUEwQixpQkFBaUIsQ0FBQyIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmMtZ3JhcGhpY2FsLXJlcG9ydC92Y2ctZGlzdHJpY3QtcmVwb3J0L3ZjZy1kaXN0cmljdC1yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiAuYnJlYWRjcnVtYiB7bGlzdC1zdHlsZTogbm9uZTtvdmVyZmxvdzogaGlkZGVuO21hcmdpbjogMHB4IDBweDtwYWRkaW5nOiAwO30uYnJlYWRjcnVtYiBsaSB7ZmxvYXQ6IGxlZnQ7fS5icmVhZGNydW1iIGxpIGEsIC5icmVhZGNydW1iIGxpIGJ1dHRvbiB7Y29sb3I6IHdoaXRlO3RleHQtZGVjb3JhdGlvbjogbm9uZTtwYWRkaW5nOiAxMHB4IDIwcHggMTBweCA1NXB4O2JhY2tncm91bmQ6IGJyb3duO2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDM1JSwxKTtwb3NpdGlvbjogcmVsYXRpdmU7ZGlzcGxheTogYmxvY2s7ZmxvYXQ6IGxlZnQ7Zm9udC1zaXplOiAxNHB4O2JvcmRlcjogbm9uZTtjdXJzb3I6IHBvaW50ZXI7fS5icmVhZGNydW1iIGxpIGE6YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjphZnRlciB7Y29udGVudDogXCIgXCI7ZGlzcGxheTogYmxvY2s7d2lkdGg6IDA7aGVpZ2h0OiAwO2JvcmRlci10b3A6IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTogNTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdDogMzBweCBzb2xpZCBoc2xhKDM0LDg1JSwzNSUsMSk7cG9zaXRpb246IGFic29sdXRlO3RvcDogNTAlO21hcmdpbi10b3A6IC01MHB4O2xlZnQ6IDEwMCU7ei1pbmRleDogMjt9LmJyZWFkY3J1bWIgbGkgYTpiZWZvcmUsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjpiZWZvcmUge2NvbnRlbnQ6IFwiIFwiO2Rpc3BsYXk6IGJsb2NrO3dpZHRoOiAwO2hlaWdodDogMDtib3JkZXItdG9wOiA1MHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQ6IDMwcHggc29saWQgd2hpdGU7cG9zaXRpb246IGFic29sdXRlO3RvcDogNTAlO21hcmdpbi10b3A6IC01MHB4O21hcmdpbi1sZWZ0OiAxcHg7bGVmdDogMTAwJTt6LWluZGV4OiAxO30uYnJlYWRjcnVtYiBsaTpmaXJzdC1jaGlsZCBhLCAuYnJlYWRjcnVtYiBsaTpmaXJzdC1jaGlsZCBidXR0b24ge3BhZGRpbmctbGVmdDogMTBweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDIpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNDUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMikgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNDUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw1NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDU1JSwxKTtwYWRkaW5nLXJpZ2h0OiA1NXB4O30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw2NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDY1JSwxKTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDUpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNzUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNSkgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNzUlLDEpO30uZC1mbGV4IHtkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7ZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7fS5qdXN0aWZ5LXNwYWNlLWJldHdlZW4gey1tcy1mbGV4LXBhY2s6IGp1c3RpZnkhaW1wb3J0YW50O2p1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbiFpbXBvcnRhbnQ7fS5wYXR0ZXJuX2JnIHtiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O2JhY2tncm91bmQtc2l6ZTogMjYlICFpbXBvcnRhbnQ7cGFkZGluZzogMTJweCAxMnB4IDI1cHg7cG9zaXRpb246IHJlbGF0aXZlO2JveC1zaGFkb3c6IDBweCAwcHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjEpO30ubG9jYXRpb24tYngge2JvcmRlci10b3A6IDQwcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjQpO2JvcmRlci1sZWZ0OiAyNXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDogMjVweCBzb2xpZCB0cmFuc3BhcmVudDtoZWlnaHQ6IDA7d2lkdGg6IDEwMCU7bWluLWhlaWdodDogMTYwcHg7YmFja2dyb3VuZDogIzAwMDttYXJnaW4tdG9wOiAxOHB4O2JvcmRlci1yYWRpdXM6IDE3cHg7Ym9yZGVyLWJvdHRvbTogNDBweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuNCk7dGV4dC1hbGlnbjogY2VudGVyO3BhZGRpbmc6IDEwcHg7ZGlzcGxheTogLW1zLWZsZXhib3ghaW1wb3J0YW50O2Rpc3BsYXk6IGZsZXghaW1wb3J0YW50Oy1tcy1mbGV4LWFsaWduOiBjZW50ZXIhaW1wb3J0YW50O2FsaWduLWl0ZW1zOiBjZW50ZXIhaW1wb3J0YW50Oy1tcy1mbGV4LXBhY2s6IGp1c3RpZnkhaW1wb3J0YW50O2p1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbiFpbXBvcnRhbnQ7fS5yb3cgLmNvbDpudGgtY2hpbGQoMSkgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjYjg2MjdmO30ucm93IC5jb2w6bnRoLWNoaWxkKDIpIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogI2Q0YTgyYjt9LnJvdyAuY29sOm50aC1jaGlsZCgzKSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICNmZWFlNTQ7fS5yb3cgLmNvbDpudGgtY2hpbGQoNCkgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjZmI0NDU1O30ucm93IC5jb2w6bnRoLWNoaWxkKDUpIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogIzYzYWZiYjt9LnJvdyAuY29sOm50aC1jaGlsZCg2KSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICMwMGMzZjA7fS5yb3cgLmNvbDpudGgtY2hpbGQoNykgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjMDBhYjZiO30ucm93IC5jb2w6bnRoLWNoaWxkKDgpIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogI2ZmNDc2ZDt9LnJvdyAuY29sOm50aC1jaGlsZCg5KSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICMwODJhNTg7fS5yb3cgLmNvbDpudGgtY2hpbGQoMTApIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogIzk1YmMxMTt9LnJvdyAuY29sOm50aC1jaGlsZCgxMSkgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjOGQwZjNmO30ucm93IC5jb2w6bnRoLWNoaWxkKDEyKSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICNlYTdiMGY7fS5sb2NhdGlvbi1ieCAubG9jYXRpb25fdGl0bGUge2NvbG9yOiAjZmZmO2ZvbnQtc2l6ZTogMjBweDtmb250LXdlaWdodDogNjAwO3RleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO30ubG9jYXRpb24tYnggLmxvY2F0aW9uX2NvdW50IHtkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDIwcHg7YmFja2dyb3VuZDogIzFkMWY1NDtjb2xvcjogI2ZmZjtwYWRkaW5nOiAzcHggNnB4O2JvcmRlci1yYWRpdXM6IDEwMCU7bGluZS1oZWlnaHQ6IG5vcm1hbDttYXJnaW4tbGVmdDogMTBweDtib3JkZXI6IGRvdHRlZCAycHggI2ZmZjt9LndoaXRlLWJ4LW1hcmdpbiB7YmFja2dyb3VuZDogIzJlMzA3MyAhaW1wb3J0YW50O3BhZGRpbmc6IDBweDt9LmQtZmxleCB7ZGlzcGxheTogLW1zLWZsZXhib3ghaW1wb3J0YW50O2Rpc3BsYXk6IGZsZXghaW1wb3J0YW50O30uanVzdGlmeS1zcGFjZS1iZXR3ZWVuIHstbXMtZmxleC1wYWNrOiBqdXN0aWZ5IWltcG9ydGFudDtqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW4haW1wb3J0YW50O30ucGF0dGVybl9iZyB7YmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6IDI2JSAhaW1wb3J0YW50O3BhZGRpbmc6IDEycHggMTJweCAyNXB4O3Bvc2l0aW9uOiByZWxhdGl2ZTtib3gtc2hhZG93OiAwcHggMHB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC4xKTt9LndoaXRlLWJ4LW1hcmdpbiB7YmFja2dyb3VuZDogIzJlMzA3MyAhaW1wb3J0YW50O3BhZGRpbmc6IDBweDt9LmVudGVyLWJ4IHtiYWNrZ3JvdW5kOiAjMUU3RkMzO2NvbG9yOiAjZmZmO3dpZHRoOiAxMDAlO3BhZGRpbmc6IDIwcHggNTBweDtmb250LXNpemU6IDIzcHg7bWluLWhlaWdodDogNDAwcHg7Ym9yZGVyLXJhZGl1czogMHB4O292ZXJmbG93OiBoaWRkZW47b3V0bGluZTogc29saWQgMXB4ICM4YmNhZjc7b3V0bGluZS1vZmZzZXQ6IC0yNXB4O291dGxpbmUtc3R5bGU6IGRhc2hlZDtvdXRsaW5lLXdpZHRoOiAycHg7ZGlzcGxheTogLW1zLWZsZXhib3ghaW1wb3J0YW50O2Rpc3BsYXk6IGZsZXghaW1wb3J0YW50Oy1tcy1mbGV4LWFsaWduOiBjZW50ZXIhaW1wb3J0YW50O2FsaWduLWl0ZW1zOiBjZW50ZXIhaW1wb3J0YW50Oy1tcy1mbGV4LXBhY2s6IGNlbnRlciFpbXBvcnRhbnQ7anVzdGlmeS1jb250ZW50OiBjZW50ZXIhaW1wb3J0YW50O3RleHQtYWxpZ246IGp1c3RpZnk7ZmxleC1kaXJlY3Rpb246IGNvbHVtbjt9Lm5leHRfYXJyb3cge21heC13aWR0aDogNTBweDttYXJnaW4tdG9wOiAyNXB4O31AbWVkaWEgKG1heC13aWR0aDoxMDI0cHgpIHsuYnJlYWRjcnVtYiBsaSBhLCAuYnJlYWRjcnVtYiBsaSBidXR0b24ge3BhZGRpbmc6IDVweDt9LmJyZWFkY3J1bWIgbGkgYnV0dG9uOmFmdGVyLCAuYnJlYWRjcnVtYiBsaSBidXR0b246YmVmb3Jle2Rpc3BsYXk6IG5vbmU7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgzKSBidXR0b24sIC5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg0KSBidXR0b24ge3BhZGRpbmctcmlnaHQ6IDVweDt9LmVudGVyLWJ4IHtmb250LXNpemU6IDE1cHg7bWFyZ2luLWJvdHRvbTogMjBweDt9fUBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7LmJyZWFkY3J1bWIgbGkgYSB7cGFkZGluZzogNXB4O30uYnJlYWRjcnVtYiBsaSBhOmFmdGVyLCAuYnJlYWRjcnVtYiBsaSBhOmJlZm9yZXtkaXNwbGF5OiBub25lO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uLCAuYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uIHtwYWRkaW5nLXJpZ2h0OiA1cHg7fX0udG9wX2Jhcl90aXRsZSB7YmFja2dyb3VuZDogI2ZmZmZmZjtwYWRkaW5nOiAxNXB4O2JveC1zaGFkb3c6IDBweCAwcHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjEpO30udG9wX2Jhcl90aXRsZSBoMyB7Zm9udC1zaXplOiAxOHB4O21hcmdpbjogMHB4O2JhY2tncm91bmQ6ICM1Zjg3OWE7Ym9yZGVyLXJhZGl1czogMzBweDtwYWRkaW5nOiA3cHggMTVweDtjb2xvcjogI2ZmZjt9LnRvcF9iYXJfdGl0bGUgaDMgc3Ryb25nIHtmb250LXdlaWdodDogYm9sZDt9Il19 */"

/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: VcgDistrictReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcgDistrictReportComponent", function() { return VcgDistrictReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-g-report.service */ "./src/app/Shared/Service/VC/vc-g-report.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");








var VcgDistrictReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function VcgDistrictReportComponent(_alertService, _vCGraphicalReportService, _parentComponent, _route, _vccCreationService) {
        this._alertService = _alertService;
        this._vCGraphicalReportService = _vCGraphicalReportService;
        this._parentComponent = _parentComponent;
        this._route = _route;
        this._vccCreationService = _vccCreationService;
        this.defaultColors = ['#6699FF', '#004E85', '#1E7FC3', '#FA828C', '#8AA9BD', '#008A99', '#00B8AC', '#EB407C', '#856850', '#9E5B41', '#E88156', '#912D67',
            '#24853F', '#709900', '#336666', '#BE7115', '#4F5B73', '#3AD13A', '#Ff9317', '#CF6A7E', '#009E69', '#6E5666', '#FF5C47', '#C77B44', '#F5C000', '#17448C', '#00D18B', '#ED2626',
            '#8045FF', '#94445C', '#9E6199', '#DEA14C', '#532266', '#8A6A6A'];
        this._parentComponent.setpagelayout("", "", "", "", true);
        this.vCCode = this._route.snapshot.params.id;
    }
    //#endregion constructor
    //#region Methods
    VcgDistrictReportComponent.prototype.ngOnInit = function () {
        if (this.vCCode) {
            this.GetList();
        }
        this.GetById();
    };
    VcgDistrictReportComponent.prototype.GetById = function () {
        var _this = this;
        this._vccCreationService.GetById(this.vCCode).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__["VCCreationModel"]();
            _this._alertService.error(error.message);
        });
    };
    VcgDistrictReportComponent.prototype.GetList = function () {
        var _this = this;
        this._vCGraphicalReportService.GetDistrictCountByVC(Number(this.vCCode)).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.listModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcgDistrictReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_4__["VCGraphicalReportService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_6__["VcCreationService"] }
    ]; };
    VcgDistrictReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vcg-district-report',
            template: __webpack_require__(/*! raw-loader!./vcg-district-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.html"),
            styles: [__webpack_require__(/*! ./vcg-district-report.component.css */ "./src/app/content/vc-graphical-report/vcg-district-report/vcg-district-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_4__["VCGraphicalReportService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_6__["VcCreationService"]])
    ], VcgDistrictReportComponent);
    return VcgDistrictReportComponent;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " .breadcrumb {list-style: none;overflow: hidden;margin: 0px 0px;padding: 0;}.breadcrumb li {float: left;}.breadcrumb li a, .breadcrumb li button {color: white;text-decoration: none;padding: 10px 20px 10px 55px;background: brown;background: hsla(34,85%,35%,1);position: relative;display: block;float: left;font-size: 14px;border: none;cursor: pointer;}.breadcrumb li a:after, .breadcrumb li button:after {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid hsla(34,85%,35%,1);position: absolute;top: 50%;margin-top: -50px;left: 100%;z-index: 2;}.breadcrumb li a:before, .breadcrumb li button:before {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid white;position: absolute;top: 50%;margin-top: -50px;margin-left: 1px;left: 100%;z-index: 1;}.breadcrumb li:first-child a, .breadcrumb li:first-child button {padding-left: 10px;}.breadcrumb li:nth-child(2) button {background: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(2) button:after {border-left-color: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(3) button {background: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(3) button:after {border-left-color: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button {background: hsla(34,85%,65%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button:after {border-left-color: hsla(34,85%,65%,1);}.breadcrumb li:nth-child(5) button {background: hsla(34,85%,75%,1);}.breadcrumb li:nth-child(5) button:after {border-left-color: hsla(34,85%,75%,1);}.d-flex {display: flex!important;}.justify-space-between {justify-content: space-between!important;}.pattern_bg {background-repeat: repeat;background-size: 26% !important;padding: 12px 12px 25px;position: relative;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.location-bx {border-top: 40px solid #8BC34A;border-left: 25px solid transparent;border-right: 25px solid transparent;min-height: 225px;width: 100%;border-radius: 100%;margin: auto;background: #fff !important;margin-top: 18px;text-align: center;padding: 10px;display: flex!important;align-items: center!important;justify-content: center;box-shadow: 0px 0px 10px 0px #9a9898;flex-direction: column;overflow: hidden;word-break: break-all;}.row .col:nth-child(1) .location-bx {background: #b8627f;}.row .col:nth-child(2) .location-bx {background: #d4a82b;}.row .col:nth-child(3) .location-bx {background: #feae54;}.row .col:nth-child(4) .location-bx {background: #fb4455;}.row .col:nth-child(5) .location-bx {background: #63afbb;}.row .col:nth-child(6) .location-bx {background: #00c3f0;}.row .col:nth-child(7) .location-bx {background: #00ab6b;}.row .col:nth-child(8) .location-bx {background: #ff476d;}.row .col:nth-child(9) .location-bx {background: #082a58;}.row .col:nth-child(10) .location-bx {background: #95bc11;}.row .col:nth-child(11) .location-bx {background: #8d0f3f;}.row .col:nth-child(12) .location-bx {background: #ea7b0f;}.location-bx .location_title {color: #000;font-size: 16px;font-weight: 600;text-transform: capitalize;}.location-bx .location_count {display: block;font-size: 20px;background: #000;color: #fff;padding: 3px 6px;border-radius: 100%;line-height: normal;margin-top: 10px;border: double;box-shadow: 0px 0px 10px 0px #9a9898;}.white-bx-margin {background: #2e3073 !important;padding: 0px;}@media (max-width:1024px) {.breadcrumb li a, .breadcrumb li button {padding: 5px;}.breadcrumb li button:after, .breadcrumb li button:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}.enter-bx {font-size: 15px;margin-bottom: 20px;}}@media (max-width:767px) {.breadcrumb li a {padding: 5px;}.breadcrumb li a:after, .breadcrumb li a:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}}.top_bar_title {background: #ffffff;padding: 15px;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.top_bar_title h3 {font-size: 18px;margin: 0px;background: #5f879a;border-radius: 30px;padding: 7px 15px;color: #fff;}.top_bar_title h3 strong {font-weight: bold;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92Yy1ncmFwaGljYWwtcmVwb3J0L3ZjZy1sb2NhdGlvbi1yZXBvcnQvdmNnLWxvY2F0aW9uLXJlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFDLGFBQWEsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixXQUFXLENBQUMsQ0FBQyx5Q0FBeUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLDRCQUE0QixDQUFDLGlCQUFpQixDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxxREFBcUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxDQUFDLHFDQUFxQyxDQUFDLDBDQUEwQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsdURBQXVELFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxxQ0FBcUMsQ0FBQyw2QkFBNkIsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGlFQUFpRSxrQkFBa0IsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLFNBQXdDLHVCQUF1QixDQUFDLENBQUMsd0JBQXlELHdDQUF3QyxDQUFDLENBQUMsYUFBYSx5QkFBeUIsQ0FBQywrQkFBK0IsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLGNBQWMsOEJBQThCLENBQUMsbUNBQW1DLENBQUMsb0NBQW9DLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsNkJBQTZCLENBQUMsdUJBQXVCLENBQUMsb0NBQW9DLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxxQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQyxzQ0FBc0MsbUJBQW1CLENBQUMsQ0FBQyxzQ0FBc0MsbUJBQW1CLENBQUMsQ0FBQyxzQ0FBc0MsbUJBQW1CLENBQUMsQ0FBQyw4QkFBOEIsV0FBVyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLDhCQUE4QixjQUFjLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxrQkFBa0IsOEJBQThCLENBQUMsWUFBWSxDQUFDLENBQUMsMkJBQTJCLHlDQUF5QyxZQUFZLENBQUMsQ0FBQywwREFBMEQsYUFBYSxDQUFDLENBQUMsd0VBQXdFLGtCQUFrQixDQUFDLENBQUMsV0FBVyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixrQkFBa0IsWUFBWSxDQUFDLENBQUMsZ0RBQWdELGFBQWEsQ0FBQyxDQUFDLHdFQUF3RSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLG1CQUFtQixlQUFlLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLDBCQUEwQixpQkFBaUIsQ0FBQyIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvdmMtZ3JhcGhpY2FsLXJlcG9ydC92Y2ctbG9jYXRpb24tcmVwb3J0L3ZjZy1sb2NhdGlvbi1yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiAuYnJlYWRjcnVtYiB7bGlzdC1zdHlsZTogbm9uZTtvdmVyZmxvdzogaGlkZGVuO21hcmdpbjogMHB4IDBweDtwYWRkaW5nOiAwO30uYnJlYWRjcnVtYiBsaSB7ZmxvYXQ6IGxlZnQ7fS5icmVhZGNydW1iIGxpIGEsIC5icmVhZGNydW1iIGxpIGJ1dHRvbiB7Y29sb3I6IHdoaXRlO3RleHQtZGVjb3JhdGlvbjogbm9uZTtwYWRkaW5nOiAxMHB4IDIwcHggMTBweCA1NXB4O2JhY2tncm91bmQ6IGJyb3duO2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDM1JSwxKTtwb3NpdGlvbjogcmVsYXRpdmU7ZGlzcGxheTogYmxvY2s7ZmxvYXQ6IGxlZnQ7Zm9udC1zaXplOiAxNHB4O2JvcmRlcjogbm9uZTtjdXJzb3I6IHBvaW50ZXI7fS5icmVhZGNydW1iIGxpIGE6YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjphZnRlciB7Y29udGVudDogXCIgXCI7ZGlzcGxheTogYmxvY2s7d2lkdGg6IDA7aGVpZ2h0OiAwO2JvcmRlci10b3A6IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTogNTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdDogMzBweCBzb2xpZCBoc2xhKDM0LDg1JSwzNSUsMSk7cG9zaXRpb246IGFic29sdXRlO3RvcDogNTAlO21hcmdpbi10b3A6IC01MHB4O2xlZnQ6IDEwMCU7ei1pbmRleDogMjt9LmJyZWFkY3J1bWIgbGkgYTpiZWZvcmUsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjpiZWZvcmUge2NvbnRlbnQ6IFwiIFwiO2Rpc3BsYXk6IGJsb2NrO3dpZHRoOiAwO2hlaWdodDogMDtib3JkZXItdG9wOiA1MHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQ6IDMwcHggc29saWQgd2hpdGU7cG9zaXRpb246IGFic29sdXRlO3RvcDogNTAlO21hcmdpbi10b3A6IC01MHB4O21hcmdpbi1sZWZ0OiAxcHg7bGVmdDogMTAwJTt6LWluZGV4OiAxO30uYnJlYWRjcnVtYiBsaTpmaXJzdC1jaGlsZCBhLCAuYnJlYWRjcnVtYiBsaTpmaXJzdC1jaGlsZCBidXR0b24ge3BhZGRpbmctbGVmdDogMTBweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDIpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNDUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMikgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNDUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw1NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDU1JSwxKTtwYWRkaW5nLXJpZ2h0OiA1NXB4O30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uIHtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSw2NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDY1JSwxKTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDUpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNzUlLDEpO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNSkgYnV0dG9uOmFmdGVyIHtib3JkZXItbGVmdC1jb2xvcjogaHNsYSgzNCw4NSUsNzUlLDEpO30uZC1mbGV4IHtkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7ZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7fS5qdXN0aWZ5LXNwYWNlLWJldHdlZW4gey1tcy1mbGV4LXBhY2s6IGp1c3RpZnkhaW1wb3J0YW50O2p1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbiFpbXBvcnRhbnQ7fS5wYXR0ZXJuX2JnIHtiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O2JhY2tncm91bmQtc2l6ZTogMjYlICFpbXBvcnRhbnQ7cGFkZGluZzogMTJweCAxMnB4IDI1cHg7cG9zaXRpb246IHJlbGF0aXZlO2JveC1zaGFkb3c6IDBweCAwcHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjEpO30ubG9jYXRpb24tYngge2JvcmRlci10b3A6IDQwcHggc29saWQgIzhCQzM0QTtib3JkZXItbGVmdDogMjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6IDI1cHggc29saWQgdHJhbnNwYXJlbnQ7bWluLWhlaWdodDogMjI1cHg7d2lkdGg6IDEwMCU7Ym9yZGVyLXJhZGl1czogMTAwJTttYXJnaW46IGF1dG87YmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50O21hcmdpbi10b3A6IDE4cHg7dGV4dC1hbGlnbjogY2VudGVyO3BhZGRpbmc6IDEwcHg7ZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7YWxpZ24taXRlbXM6IGNlbnRlciFpbXBvcnRhbnQ7anVzdGlmeS1jb250ZW50OiBjZW50ZXI7Ym94LXNoYWRvdzogMHB4IDBweCAxMHB4IDBweCAjOWE5ODk4O2ZsZXgtZGlyZWN0aW9uOiBjb2x1bW47b3ZlcmZsb3c6IGhpZGRlbjt3b3JkLWJyZWFrOiBicmVhay1hbGw7fS5yb3cgLmNvbDpudGgtY2hpbGQoMSkgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjYjg2MjdmO30ucm93IC5jb2w6bnRoLWNoaWxkKDIpIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogI2Q0YTgyYjt9LnJvdyAuY29sOm50aC1jaGlsZCgzKSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICNmZWFlNTQ7fS5yb3cgLmNvbDpudGgtY2hpbGQoNCkgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjZmI0NDU1O30ucm93IC5jb2w6bnRoLWNoaWxkKDUpIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogIzYzYWZiYjt9LnJvdyAuY29sOm50aC1jaGlsZCg2KSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICMwMGMzZjA7fS5yb3cgLmNvbDpudGgtY2hpbGQoNykgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjMDBhYjZiO30ucm93IC5jb2w6bnRoLWNoaWxkKDgpIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogI2ZmNDc2ZDt9LnJvdyAuY29sOm50aC1jaGlsZCg5KSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICMwODJhNTg7fS5yb3cgLmNvbDpudGgtY2hpbGQoMTApIC5sb2NhdGlvbi1ieCB7YmFja2dyb3VuZDogIzk1YmMxMTt9LnJvdyAuY29sOm50aC1jaGlsZCgxMSkgLmxvY2F0aW9uLWJ4IHtiYWNrZ3JvdW5kOiAjOGQwZjNmO30ucm93IC5jb2w6bnRoLWNoaWxkKDEyKSAubG9jYXRpb24tYngge2JhY2tncm91bmQ6ICNlYTdiMGY7fS5sb2NhdGlvbi1ieCAubG9jYXRpb25fdGl0bGUge2NvbG9yOiAjMDAwO2ZvbnQtc2l6ZTogMTZweDtmb250LXdlaWdodDogNjAwO3RleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO30ubG9jYXRpb24tYnggLmxvY2F0aW9uX2NvdW50IHtkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDIwcHg7YmFja2dyb3VuZDogIzAwMDtjb2xvcjogI2ZmZjtwYWRkaW5nOiAzcHggNnB4O2JvcmRlci1yYWRpdXM6IDEwMCU7bGluZS1oZWlnaHQ6IG5vcm1hbDttYXJnaW4tdG9wOiAxMHB4O2JvcmRlcjogZG91YmxlO2JveC1zaGFkb3c6IDBweCAwcHggMTBweCAwcHggIzlhOTg5ODt9LndoaXRlLWJ4LW1hcmdpbiB7YmFja2dyb3VuZDogIzJlMzA3MyAhaW1wb3J0YW50O3BhZGRpbmc6IDBweDt9QG1lZGlhIChtYXgtd2lkdGg6MTAyNHB4KSB7LmJyZWFkY3J1bWIgbGkgYSwgLmJyZWFkY3J1bWIgbGkgYnV0dG9uIHtwYWRkaW5nOiA1cHg7fS5icmVhZGNydW1iIGxpIGJ1dHRvbjphZnRlciwgLmJyZWFkY3J1bWIgbGkgYnV0dG9uOmJlZm9yZXtkaXNwbGF5OiBub25lO30uYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoMykgYnV0dG9uLCAuYnJlYWRjcnVtYiBsaTpudGgtY2hpbGQoNCkgYnV0dG9uIHtwYWRkaW5nLXJpZ2h0OiA1cHg7fS5lbnRlci1ieCB7Zm9udC1zaXplOiAxNXB4O21hcmdpbi1ib3R0b206IDIwcHg7fX1AbWVkaWEgKG1heC13aWR0aDo3NjdweCkgey5icmVhZGNydW1iIGxpIGEge3BhZGRpbmc6IDVweDt9LmJyZWFkY3J1bWIgbGkgYTphZnRlciwgLmJyZWFkY3J1bWIgbGkgYTpiZWZvcmV7ZGlzcGxheTogbm9uZTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbiwgLmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbiB7cGFkZGluZy1yaWdodDogNXB4O319LnRvcF9iYXJfdGl0bGUge2JhY2tncm91bmQ6ICNmZmZmZmY7cGFkZGluZzogMTVweDtib3gtc2hhZG93OiAwcHggMHB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC4xKTt9LnRvcF9iYXJfdGl0bGUgaDMge2ZvbnQtc2l6ZTogMThweDttYXJnaW46IDBweDtiYWNrZ3JvdW5kOiAjNWY4NzlhO2JvcmRlci1yYWRpdXM6IDMwcHg7cGFkZGluZzogN3B4IDE1cHg7Y29sb3I6ICNmZmY7fS50b3BfYmFyX3RpdGxlIGgzIHN0cm9uZyB7Zm9udC13ZWlnaHQ6IGJvbGQ7fSJdfQ== */"

/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: VcgLocationReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcgLocationReportComponent", function() { return VcgLocationReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Model_VC_vc_g_report_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Model/VC/vc-g-report.model */ "./src/app/Shared/Model/VC/vc-g-report.model.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-g-report.service */ "./src/app/Shared/Service/VC/vc-g-report.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");









var VcgLocationReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function VcgLocationReportComponent(_alertService, _vCGraphicalReportService, _parentComponent, _route, _vccCreationService) {
        this._alertService = _alertService;
        this._vCGraphicalReportService = _vCGraphicalReportService;
        this._parentComponent = _parentComponent;
        this._route = _route;
        this._vccCreationService = _vccCreationService;
        this.defaultColors = ['#24853F', '#709900', '#336666', '#BE7115', '#4F5B73', '#3AD13A', '#Ff9317', '#CF6A7E', '#009E69', '#6E5666',
            '#FF5C47', '#C77B44', '#F5C000', '#17448C', '#00D18B', '#ED2626', '#6699FF', '#004E85', '#1E7FC3', '#FA828C', '#8AA9BD', '#008A99', '#00B8AC', '#EB407C',
            '#856850', '#9E5B41', '#E88156', '#912D67', '#8045FF', '#94445C', '#9E6199', '#DEA14C', '#532266', '#8A6A6A'];
        this._parentComponent.setpagelayout("", "", "", "", true);
        this.model = new _Shared_Model_VC_vc_g_report_model__WEBPACK_IMPORTED_MODULE_1__["VCGLocationFilterModel"]();
        if (this._route.snapshot.params) {
            this.model.DistrictCode = this._route.snapshot.params.district;
            this.model.VCCreateCode = this._route.snapshot.params.vccode;
        }
    }
    //#endregion constructor
    //#region Methods
    VcgLocationReportComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.GetById();
    };
    VcgLocationReportComponent.prototype.GetById = function () {
        var _this = this;
        this._vccCreationService.GetById(this.model.VCCreateCode).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.vcmodel = data.Data;
            }
        }, function (error) {
            _this.vcmodel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_7__["VCCreationModel"]();
            _this._alertService.error(error.message);
        });
    };
    VcgLocationReportComponent.prototype.GetList = function () {
        var _this = this;
        this._vCGraphicalReportService.GetLocationCountByDistrict(this.model).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.listModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcgLocationReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_5__["VCGraphicalReportService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__["VcCreationService"] }
    ]; };
    VcgLocationReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-vcg-location-report',
            template: __webpack_require__(/*! raw-loader!./vcg-location-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.html"),
            styles: [__webpack_require__(/*! ./vcg-location-report.component.css */ "./src/app/content/vc-graphical-report/vcg-location-report/vcg-location-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_5__["VCGraphicalReportService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_8__["VcCreationService"]])
    ], VcgLocationReportComponent);
    return VcgLocationReportComponent;
}());



/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.css":
/*!*********************************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " .breadcrumb {list-style: none;overflow: hidden;margin: 0px 0px;padding: 0;}.breadcrumb li {float: left;}.breadcrumb li a, .breadcrumb li button {color: white;text-decoration: none;padding: 10px 20px 10px 55px;background: brown;background: hsla(34,85%,35%,1);position: relative;display: block;float: left;font-size: 14px;border: none;cursor: pointer;}.breadcrumb li a:after, .breadcrumb li button:after {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid hsla(34,85%,35%,1);position: absolute;top: 50%;margin-top: -50px;left: 100%;z-index: 2;}.breadcrumb li a:before, .breadcrumb li button:before {content: \" \";display: block;width: 0;height: 0;border-top: 50px solid transparent;border-bottom: 50px solid transparent;border-left: 30px solid white;position: absolute;top: 50%;margin-top: -50px;margin-left: 1px;left: 100%;z-index: 1;}.breadcrumb li:first-child a, .breadcrumb li:first-child button {padding-left: 10px;}.breadcrumb li:nth-child(2) button {background: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(2) button:after {border-left-color: hsla(34,85%,45%,1);}.breadcrumb li:nth-child(3) button {background: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(3) button:after {border-left-color: hsla(34,85%,55%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button {background: hsla(34,85%,65%,1);padding-right: 55px;}.breadcrumb li:nth-child(4) button:after {border-left-color: hsla(34,85%,65%,1);}.breadcrumb li:nth-child(5) button {background: hsla(34,85%,75%,1);}.breadcrumb li:nth-child(5) button:after {border-left-color: hsla(34,85%,75%,1);}.d-flex {display: flex!important;}.justify-space-between {justify-content: space-between!important;}.pattern_bg {background-repeat: repeat;background-size: 26% !important;padding: 12px 12px 25px;position: relative;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.location-bx {height: 0;width: 100%;min-height: 140px;background: #fff !important;margin-top: 18px;border-radius: 0px;text-align: center;padding: 0px;display: flex!important;flex-direction: column;word-wrap: break-word;position: relative;box-shadow: 0px 0px 10px 0px #9a9898;overflow: hidden;}.location-bx .location_designation {background: #43dc56;color: #fff;padding: 6px;font-size: 15px;}.row .col:nth-child(1) .location-bx .location_designation {background: #b8627f;}.row .col:nth-child(2) .location-bx .location_designation {background: #d4a82b;}.row .col:nth-child(3) .location-bx .location_designation {background: #feae54;}.row .col:nth-child(4) .location-bx .location_designation {background: #fb4455;}.row .col:nth-child(5) .location-bx .location_designation {background: #63afbb;}.row .col:nth-child(6) .location-bx .location_designation {background: #00c3f0;}.row .col:nth-child(7) .location-bx .location_designation {background: #00ab6b;}.row .col:nth-child(8) .location-bx .location_designation {background: #ff476d;}.row .col:nth-child(9) .location-bx .location_designation {background: #082a58;}.row .col:nth-child(10) .location-bx .location_designation {background: #95bc11;}.row .col:nth-child(11) .location-bx .location_designation {background: #8d0f3f;}.row .col:nth-child(12) .location-bx .location_designation {background: #ea7b0f;}.location-bx .location_title {color: #000;font-size: 22px;font-weight: 600;text-transform: capitalize;flex: 1 1 auto;padding: 1rem;display: flex!important;align-items: center!important;justify-content: center!important;}.white-bx-margin {background: #2e3073 !important;padding: 0px;}@media (max-width:1024px) {.breadcrumb li a, .breadcrumb li button {padding: 5px;}.breadcrumb li button:after, .breadcrumb li button:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}.enter-bx {font-size: 15px;margin-bottom: 20px;}}@media (max-width:767px) {.breadcrumb li a {padding: 5px;}.breadcrumb li a:after, .breadcrumb li a:before{display: none;}.breadcrumb li:nth-child(3) button, .breadcrumb li:nth-child(4) button {padding-right: 5px;}}.top_bar_title {background: #ffffff;padding: 15px;box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);}.top_bar_title h3 {font-size: 18px;margin: 0px;background: #5f879a;border-radius: 30px;padding: 7px 15px;color: #fff;}.top_bar_title h3 strong {font-weight: bold;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC92Yy1ncmFwaGljYWwtcmVwb3J0L3ZjZy1wYXJ0aWNpcGFudC1yZXBvcnQvdmNnLXBhcnRpY2lwYW50LXJlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFDLGFBQWEsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixXQUFXLENBQUMsQ0FBQyx5Q0FBeUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLDRCQUE0QixDQUFDLGlCQUFpQixDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxxREFBcUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxDQUFDLHFDQUFxQyxDQUFDLDBDQUEwQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsdURBQXVELFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxxQ0FBcUMsQ0FBQyw2QkFBNkIsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGlFQUFpRSxrQkFBa0IsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLG9DQUFvQyw4QkFBOEIsQ0FBQyxDQUFDLDBDQUEwQyxxQ0FBcUMsQ0FBQyxDQUFDLFNBQXdDLHVCQUF1QixDQUFDLENBQUMsd0JBQXlELHdDQUF3QyxDQUFDLENBQUMsYUFBYSx5QkFBeUIsQ0FBQywrQkFBK0IsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLGNBQWMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQWdDLHVCQUF1QixDQUE0QixzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxvQ0FBb0MsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG9DQUFvQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDJEQUEyRCxtQkFBbUIsQ0FBQyxDQUFDLDREQUE0RCxtQkFBbUIsQ0FBQyxDQUFDLDREQUE0RCxtQkFBbUIsQ0FBQyxDQUFDLDREQUE0RCxtQkFBbUIsQ0FBQyxDQUFDLDhCQUE4QixXQUFXLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFvQixjQUFjLENBQUMsYUFBYSxDQUFnQyx1QkFBdUIsQ0FBa0MsNkJBQTZCLENBQWlDLGlDQUFpQyxDQUFDLENBQUMsa0JBQWtCLDhCQUE4QixDQUFDLFlBQVksQ0FBQyxDQUFDLDJCQUEyQix5Q0FBeUMsWUFBWSxDQUFDLENBQUMsMERBQTBELGFBQWEsQ0FBQyxDQUFDLHdFQUF3RSxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQywwQkFBMEIsa0JBQWtCLFlBQVksQ0FBQyxDQUFDLGdEQUFnRCxhQUFhLENBQUMsQ0FBQyx3RUFBd0Usa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixtQkFBbUIsQ0FBQyxhQUFhLENBQUMsNENBQTRDLENBQUMsQ0FBQyxtQkFBbUIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQywwQkFBMEIsaUJBQWlCLENBQUMiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L3ZjLWdyYXBoaWNhbC1yZXBvcnQvdmNnLXBhcnRpY2lwYW50LXJlcG9ydC92Y2ctcGFydGljaXBhbnQtcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgLmJyZWFkY3J1bWIge2xpc3Qtc3R5bGU6IG5vbmU7b3ZlcmZsb3c6IGhpZGRlbjttYXJnaW46IDBweCAwcHg7cGFkZGluZzogMDt9LmJyZWFkY3J1bWIgbGkge2Zsb2F0OiBsZWZ0O30uYnJlYWRjcnVtYiBsaSBhLCAuYnJlYWRjcnVtYiBsaSBidXR0b24ge2NvbG9yOiB3aGl0ZTt0ZXh0LWRlY29yYXRpb246IG5vbmU7cGFkZGluZzogMTBweCAyMHB4IDEwcHggNTVweDtiYWNrZ3JvdW5kOiBicm93bjtiYWNrZ3JvdW5kOiBoc2xhKDM0LDg1JSwzNSUsMSk7cG9zaXRpb246IHJlbGF0aXZlO2Rpc3BsYXk6IGJsb2NrO2Zsb2F0OiBsZWZ0O2ZvbnQtc2l6ZTogMTRweDtib3JkZXI6IG5vbmU7Y3Vyc29yOiBwb2ludGVyO30uYnJlYWRjcnVtYiBsaSBhOmFmdGVyLCAuYnJlYWRjcnVtYiBsaSBidXR0b246YWZ0ZXIge2NvbnRlbnQ6IFwiIFwiO2Rpc3BsYXk6IGJsb2NrO3dpZHRoOiAwO2hlaWdodDogMDtib3JkZXItdG9wOiA1MHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206IDUwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQ6IDMwcHggc29saWQgaHNsYSgzNCw4NSUsMzUlLDEpO3Bvc2l0aW9uOiBhYnNvbHV0ZTt0b3A6IDUwJTttYXJnaW4tdG9wOiAtNTBweDtsZWZ0OiAxMDAlO3otaW5kZXg6IDI7fS5icmVhZGNydW1iIGxpIGE6YmVmb3JlLCAuYnJlYWRjcnVtYiBsaSBidXR0b246YmVmb3JlIHtjb250ZW50OiBcIiBcIjtkaXNwbGF5OiBibG9jazt3aWR0aDogMDtoZWlnaHQ6IDA7Ym9yZGVyLXRvcDogNTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItYm90dG9tOiA1MHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0OiAzMHB4IHNvbGlkIHdoaXRlO3Bvc2l0aW9uOiBhYnNvbHV0ZTt0b3A6IDUwJTttYXJnaW4tdG9wOiAtNTBweDttYXJnaW4tbGVmdDogMXB4O2xlZnQ6IDEwMCU7ei1pbmRleDogMTt9LmJyZWFkY3J1bWIgbGk6Zmlyc3QtY2hpbGQgYSwgLmJyZWFkY3J1bWIgbGk6Zmlyc3QtY2hpbGQgYnV0dG9uIHtwYWRkaW5nLWxlZnQ6IDEwcHg7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgyKSBidXR0b24ge2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDQ1JSwxKTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDIpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDQ1JSwxKTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNTUlLDEpO3BhZGRpbmctcmlnaHQ6IDU1cHg7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgzKSBidXR0b246YWZ0ZXIge2JvcmRlci1sZWZ0LWNvbG9yOiBoc2xhKDM0LDg1JSw1NSUsMSk7cGFkZGluZy1yaWdodDogNTVweDt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbiB7YmFja2dyb3VuZDogaHNsYSgzNCw4NSUsNjUlLDEpO3BhZGRpbmctcmlnaHQ6IDU1cHg7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg0KSBidXR0b246YWZ0ZXIge2JvcmRlci1sZWZ0LWNvbG9yOiBoc2xhKDM0LDg1JSw2NSUsMSk7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg1KSBidXR0b24ge2JhY2tncm91bmQ6IGhzbGEoMzQsODUlLDc1JSwxKTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDUpIGJ1dHRvbjphZnRlciB7Ym9yZGVyLWxlZnQtY29sb3I6IGhzbGEoMzQsODUlLDc1JSwxKTt9LmQtZmxleCB7ZGlzcGxheTogLW1zLWZsZXhib3ghaW1wb3J0YW50O2Rpc3BsYXk6IGZsZXghaW1wb3J0YW50O30uanVzdGlmeS1zcGFjZS1iZXR3ZWVuIHstbXMtZmxleC1wYWNrOiBqdXN0aWZ5IWltcG9ydGFudDtqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW4haW1wb3J0YW50O30ucGF0dGVybl9iZyB7YmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6IDI2JSAhaW1wb3J0YW50O3BhZGRpbmc6IDEycHggMTJweCAyNXB4O3Bvc2l0aW9uOiByZWxhdGl2ZTtib3gtc2hhZG93OiAwcHggMHB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC4xKTt9LmxvY2F0aW9uLWJ4IHtoZWlnaHQ6IDA7d2lkdGg6IDEwMCU7bWluLWhlaWdodDogMTQwcHg7YmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50O21hcmdpbi10b3A6IDE4cHg7Ym9yZGVyLXJhZGl1czogMHB4O3RleHQtYWxpZ246IGNlbnRlcjtwYWRkaW5nOiAwcHg7ZGlzcGxheTogLW1zLWZsZXhib3ghaW1wb3J0YW50O2Rpc3BsYXk6IGZsZXghaW1wb3J0YW50Oy1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO2ZsZXgtZGlyZWN0aW9uOiBjb2x1bW47d29yZC13cmFwOiBicmVhay13b3JkO3Bvc2l0aW9uOiByZWxhdGl2ZTtib3gtc2hhZG93OiAwcHggMHB4IDEwcHggMHB4ICM5YTk4OTg7b3ZlcmZsb3c6IGhpZGRlbjt9LmxvY2F0aW9uLWJ4IC5sb2NhdGlvbl9kZXNpZ25hdGlvbiB7YmFja2dyb3VuZDogIzQzZGM1Njtjb2xvcjogI2ZmZjtwYWRkaW5nOiA2cHg7Zm9udC1zaXplOiAxNXB4O30ucm93IC5jb2w6bnRoLWNoaWxkKDEpIC5sb2NhdGlvbi1ieCAubG9jYXRpb25fZGVzaWduYXRpb24ge2JhY2tncm91bmQ6ICNiODYyN2Y7fS5yb3cgLmNvbDpudGgtY2hpbGQoMikgLmxvY2F0aW9uLWJ4IC5sb2NhdGlvbl9kZXNpZ25hdGlvbiB7YmFja2dyb3VuZDogI2Q0YTgyYjt9LnJvdyAuY29sOm50aC1jaGlsZCgzKSAubG9jYXRpb24tYnggLmxvY2F0aW9uX2Rlc2lnbmF0aW9uIHtiYWNrZ3JvdW5kOiAjZmVhZTU0O30ucm93IC5jb2w6bnRoLWNoaWxkKDQpIC5sb2NhdGlvbi1ieCAubG9jYXRpb25fZGVzaWduYXRpb24ge2JhY2tncm91bmQ6ICNmYjQ0NTU7fS5yb3cgLmNvbDpudGgtY2hpbGQoNSkgLmxvY2F0aW9uLWJ4IC5sb2NhdGlvbl9kZXNpZ25hdGlvbiB7YmFja2dyb3VuZDogIzYzYWZiYjt9LnJvdyAuY29sOm50aC1jaGlsZCg2KSAubG9jYXRpb24tYnggLmxvY2F0aW9uX2Rlc2lnbmF0aW9uIHtiYWNrZ3JvdW5kOiAjMDBjM2YwO30ucm93IC5jb2w6bnRoLWNoaWxkKDcpIC5sb2NhdGlvbi1ieCAubG9jYXRpb25fZGVzaWduYXRpb24ge2JhY2tncm91bmQ6ICMwMGFiNmI7fS5yb3cgLmNvbDpudGgtY2hpbGQoOCkgLmxvY2F0aW9uLWJ4IC5sb2NhdGlvbl9kZXNpZ25hdGlvbiB7YmFja2dyb3VuZDogI2ZmNDc2ZDt9LnJvdyAuY29sOm50aC1jaGlsZCg5KSAubG9jYXRpb24tYnggLmxvY2F0aW9uX2Rlc2lnbmF0aW9uIHtiYWNrZ3JvdW5kOiAjMDgyYTU4O30ucm93IC5jb2w6bnRoLWNoaWxkKDEwKSAubG9jYXRpb24tYnggLmxvY2F0aW9uX2Rlc2lnbmF0aW9uIHtiYWNrZ3JvdW5kOiAjOTViYzExO30ucm93IC5jb2w6bnRoLWNoaWxkKDExKSAubG9jYXRpb24tYnggLmxvY2F0aW9uX2Rlc2lnbmF0aW9uIHtiYWNrZ3JvdW5kOiAjOGQwZjNmO30ucm93IC5jb2w6bnRoLWNoaWxkKDEyKSAubG9jYXRpb24tYnggLmxvY2F0aW9uX2Rlc2lnbmF0aW9uIHtiYWNrZ3JvdW5kOiAjZWE3YjBmO30ubG9jYXRpb24tYnggLmxvY2F0aW9uX3RpdGxlIHtjb2xvcjogIzAwMDtmb250LXNpemU6IDIycHg7Zm9udC13ZWlnaHQ6IDYwMDt0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTstbXMtZmxleDogMSAxIGF1dG87ZmxleDogMSAxIGF1dG87cGFkZGluZzogMXJlbTtkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7ZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7LW1zLWZsZXgtYWxpZ246IGNlbnRlciFpbXBvcnRhbnQ7YWxpZ24taXRlbXM6IGNlbnRlciFpbXBvcnRhbnQ7LW1zLWZsZXgtcGFjazogY2VudGVyIWltcG9ydGFudDtqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlciFpbXBvcnRhbnQ7fS53aGl0ZS1ieC1tYXJnaW4ge2JhY2tncm91bmQ6ICMyZTMwNzMgIWltcG9ydGFudDtwYWRkaW5nOiAwcHg7fUBtZWRpYSAobWF4LXdpZHRoOjEwMjRweCkgey5icmVhZGNydW1iIGxpIGEsIC5icmVhZGNydW1iIGxpIGJ1dHRvbiB7cGFkZGluZzogNXB4O30uYnJlYWRjcnVtYiBsaSBidXR0b246YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGJ1dHRvbjpiZWZvcmV7ZGlzcGxheTogbm9uZTt9LmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDMpIGJ1dHRvbiwgLmJyZWFkY3J1bWIgbGk6bnRoLWNoaWxkKDQpIGJ1dHRvbiB7cGFkZGluZy1yaWdodDogNXB4O30uZW50ZXItYngge2ZvbnQtc2l6ZTogMTVweDttYXJnaW4tYm90dG9tOiAyMHB4O319QG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpIHsuYnJlYWRjcnVtYiBsaSBhIHtwYWRkaW5nOiA1cHg7fS5icmVhZGNydW1iIGxpIGE6YWZ0ZXIsIC5icmVhZGNydW1iIGxpIGE6YmVmb3Jle2Rpc3BsYXk6IG5vbmU7fS5icmVhZGNydW1iIGxpOm50aC1jaGlsZCgzKSBidXR0b24sIC5icmVhZGNydW1iIGxpOm50aC1jaGlsZCg0KSBidXR0b24ge3BhZGRpbmctcmlnaHQ6IDVweDt9fS50b3BfYmFyX3RpdGxlIHtiYWNrZ3JvdW5kOiAjZmZmZmZmO3BhZGRpbmc6IDE1cHg7Ym94LXNoYWRvdzogMHB4IDBweCAxMHB4IDBweCByZ2JhKDAsMCwwLDAuMSk7fS50b3BfYmFyX3RpdGxlIGgzIHtmb250LXNpemU6IDE4cHg7bWFyZ2luOiAwcHg7YmFja2dyb3VuZDogIzVmODc5YTtib3JkZXItcmFkaXVzOiAzMHB4O3BhZGRpbmc6IDdweCAxNXB4O2NvbG9yOiAjZmZmO30udG9wX2Jhcl90aXRsZSBoMyBzdHJvbmcge2ZvbnQtd2VpZ2h0OiBib2xkO30iXX0= */"

/***/ }),

/***/ "./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: VcgParticipantReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VcgParticipantReportComponent", function() { return VcgParticipantReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_VC_vc_g_report_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/VC/vc-g-report.model */ "./src/app/Shared/Model/VC/vc-g-report.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/VC/vc-g-report.service */ "./src/app/Shared/Service/VC/vc-g-report.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/vc-creation.service */ "./src/app/Shared/Service/vc-creation.service.ts");
/* harmony import */ var src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/vccreationView.model */ "./src/app/Shared/Model/vccreationView.model.ts");









var VcgParticipantReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function VcgParticipantReportComponent(_alertService, _vCGraphicalReportService, _parentComponent, _route, _vccCreationService) {
        this._alertService = _alertService;
        this._vCGraphicalReportService = _vCGraphicalReportService;
        this._parentComponent = _parentComponent;
        this._route = _route;
        this._vccCreationService = _vccCreationService;
        this.defaultColors = ['#6699FF', '#004E85', '#1E7FC3', '#FA828C', '#8AA9BD', '#008A99', '#00B8AC', '#EB407C', '#856850', '#9E5B41', '#E88156', '#912D67',
            '#24853F', '#709900', '#336666', '#BE7115', '#4F5B73', '#3AD13A', '#Ff9317', '#CF6A7E', '#009E69', '#6E5666', '#FF5C47', '#C77B44', '#F5C000', '#17448C', '#00D18B', '#ED2626',
            '#8045FF', '#94445C', '#9E6199', '#DEA14C', '#532266', '#8A6A6A', '#75306B', '#0062A8', '#50825B', '#D12C3A', '#4F5B73', '#378A91', '#F7636F', '#6F84A6', '#754D08', '#A66F5A',
            '#6E5666', '#912D67', '#044370', '#1696D1', '#7A2323', '#4A0B63', '#C77B44', '#916C5D', '#1B8087', '#FF2954', '#B04B11', '#FF6A00', '#755E3A', '#25594A', '#F7A100', '#71A6A2',
            '#2EC236', '#C74949', '#23942F', '#B39C5D', '#BD7DB8', '#Db8000', '#039E84', '#5BBA6D', '#CFC800', '#FF8B4C'];
        this._parentComponent.setpagelayout("", "", "", "", true);
        this.model = new src_app_Shared_Model_VC_vc_g_report_model__WEBPACK_IMPORTED_MODULE_2__["VCGParticipantFilterModel"]();
        if (this._route.snapshot.params) {
            this.model.VCCreateCode = this._route.snapshot.params.vccode;
            this.model.LocationCode = this._route.snapshot.params.location;
            this.model.DistrictCode = this._route.snapshot.params.district;
        }
    }
    //#endregion constructor
    //#region Methods
    VcgParticipantReportComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.GetById();
    };
    VcgParticipantReportComponent.prototype.GetList = function () {
        var _this = this;
        this._vCGraphicalReportService.GetParticipantByLocation(this.model).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.listModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    VcgParticipantReportComponent.prototype.GetById = function () {
        var _this = this;
        this._vccCreationService.GetById(this.model.VCCreateCode).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.vcmodel = data.Data;
            }
        }, function (error) {
            _this.vcmodel = new src_app_Shared_Model_vccreationView_model__WEBPACK_IMPORTED_MODULE_8__["VCCreationModel"]();
            _this._alertService.error(error.message);
        });
    };
    VcgParticipantReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_4__["VCGraphicalReportService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_7__["VcCreationService"] }
    ]; };
    VcgParticipantReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vcg-participant-report',
            template: __webpack_require__(/*! raw-loader!./vcg-participant-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.html"),
            styles: [__webpack_require__(/*! ./vcg-participant-report.component.css */ "./src/app/content/vc-graphical-report/vcg-participant-report/vcg-participant-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_VC_vc_g_report_service__WEBPACK_IMPORTED_MODULE_4__["VCGraphicalReportService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            src_app_Shared_Service_vc_creation_service__WEBPACK_IMPORTED_MODULE_7__["VcCreationService"]])
    ], VcgParticipantReportComponent);
    return VcgParticipantReportComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-vc-graphical-report-vc-graphical-report-module.js.map