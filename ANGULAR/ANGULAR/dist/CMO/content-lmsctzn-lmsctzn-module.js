(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-lmsctzn-lmsctzn-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/lmsctzn/new-entry/new-entry.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/lmsctzn/new-entry/new-entry.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n<div class=\"col  s12\">\r\n    <div class=\"mesgs\">\r\n        <div class=\"msg_history\">\r\n          <div class=\"incoming_msg\">\r\n            <div class=\"incoming_msg_img\"> <img src=\"http://localhost:4200/assets/images/profile.png\" alt=\"sunil\"> </div>\r\n            <div class=\"received_msg\">\r\n              <div class=\"received_withd_msg\">\r\n                <p>Test which is a new approach to have all\r\n                  solutions</p>\r\n                <span class=\"time_date\"> 11:01 AM    |    June 9</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"outgoing_msg\">\r\n            <div class=\"sent_msg\">\r\n              <p>Test which is a new approach to have all\r\n                solutions</p>\r\n              <span class=\"time_date\"> 11:01 AM    |    June 9</span> </div>\r\n          </div>\r\n          <div class=\"incoming_msg\">\r\n            <div class=\"incoming_msg_img\"> <img src=\"http://localhost:4200/assets/images/profile.png\" alt=\"sunil\"> </div>\r\n            <div class=\"received_msg\">\r\n              <div class=\"received_withd_msg\">\r\n                <p>Test, which is a new approach to have</p>\r\n                <span class=\"time_date\"> 11:01 AM    |    Yesterday</span></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"outgoing_msg\">\r\n            <div class=\"sent_msg\">\r\n              <p>Apollo University, Delhi, India Test</p>\r\n              <span class=\"time_date\"> 11:01 AM    |    Today</span> </div>\r\n          </div>\r\n          <div class=\"incoming_msg\">\r\n            <div class=\"incoming_msg_img\"> <img src=\"http://localhost:4200/assets/images/profile.png\" alt=\"sunil\"> </div>\r\n            <div class=\"received_msg\">\r\n              <div class=\"received_withd_msg\">\r\n                <p>We work directly with our designers and suppliers,\r\n                  and sell direct to you, which means quality, exclusive\r\n                  products, at a price anyone can afford.</p>\r\n                <span class=\"time_date\"> 11:01 AM    |    Today</span></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n  \r\n\r\n\r\n      </div>\r\n\r\n\r\n  \r\n\r\n\r\n</div>\r\n\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/content/lmsctzn/lmsctzn-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/content/lmsctzn/lmsctzn-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: LmsctznRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LmsctznRoutingModule", function() { return LmsctznRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _new_entry_new_entry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-entry/new-entry.component */ "./src/app/content/lmsctzn/new-entry/new-entry.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var routes = [
    {
        path: '',
        component: _new_entry_new_entry_component__WEBPACK_IMPORTED_MODULE_1__["NewEntryComponent"],
    },
    {
        path: 'entry',
        component: _new_entry_new_entry_component__WEBPACK_IMPORTED_MODULE_1__["NewEntryComponent"]
    },
];
var LmsctznRoutingModule = /** @class */ (function () {
    function LmsctznRoutingModule() {
    }
    LmsctznRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], LmsctznRoutingModule);
    return LmsctznRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/lmsctzn/lmsctzn.module.ts":
/*!***************************************************!*\
  !*** ./src/app/content/lmsctzn/lmsctzn.module.ts ***!
  \***************************************************/
/*! exports provided: LmsctznModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LmsctznModule", function() { return LmsctznModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _lmsctzn_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmsctzn-routing.module */ "./src/app/content/lmsctzn/lmsctzn-routing.module.ts");
/* harmony import */ var _new_entry_new_entry_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./new-entry/new-entry.component */ "./src/app/content/lmsctzn/new-entry/new-entry.component.ts");





var LmsctznModule = /** @class */ (function () {
    function LmsctznModule() {
    }
    LmsctznModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_new_entry_new_entry_component__WEBPACK_IMPORTED_MODULE_4__["NewEntryComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _lmsctzn_routing_module__WEBPACK_IMPORTED_MODULE_3__["LmsctznRoutingModule"]
            ]
        })
    ], LmsctznModule);
    return LmsctznModule;
}());



/***/ }),

/***/ "./src/app/content/lmsctzn/new-entry/new-entry.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/content/lmsctzn/new-entry/new-entry.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mesgs {\r\n    height: 80vh;\r\n}\r\n\r\n.incoming_msg_img {\r\n    display: inline-block;\r\n    width: 70px;\r\n    vertical-align: middle;\r\n    border-radius: 100%;\r\n    overflow: hidden;\r\n}\r\n\r\n.received_msg {\r\n    display: inline-block;\r\n    padding: 0 0 0 10px;\r\n    vertical-align: middle;\r\n    width: 92%;\r\n}\r\n\r\n.msg-unseen{}\r\n\r\n.received_withd_msg {\r\n    position: relative;\r\n    width: 57%;\r\n}\r\n\r\n.received_withd_msg p {\r\n    background: #ebebeb;\r\n    border-radius: 50px;\r\n    color: #646464;\r\n    font-size: 14px;\r\n    margin: 0;\r\n    padding: 12px 20px;\r\n    width: 100%;\r\n}\r\n\r\n.time_date {\r\n    color: #747474;\r\n    display: block;\r\n    font-size: 12px;\r\n    margin: 8px 0 0;\r\n}\r\n\r\n.outgoing_msg {\r\n    overflow: hidden;\r\n    margin: 26px 0 26px;\r\n}\r\n\r\n.sent_msg {\r\n    float: right;\r\n    width: 46%;\r\n}\r\n\r\n.sent_msg p {\r\n    background: #26389b;\r\n    border-radius: 50px;\r\n    font-size: 14px;\r\n    margin: 0;\r\n    color: #fff;\r\n    padding: 12px 20px;\r\n    width: 100%;\r\n}\r\n\r\nimg {\r\n    max-width: 100%;\r\n    vertical-align: middle;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9sbXNjdHpuL25ldy1lbnRyeS9uZXctZW50cnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsV0FBVztJQUNYLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsZ0JBQWdCO0FBQ3BCOztBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsVUFBVTtBQUNkOztBQUNBLFlBQVk7O0FBQ1o7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtBQUNkOztBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsZUFBZTtJQUNmLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUNBO0lBQ0ksY0FBYztJQUNkLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZUFBZTtBQUNuQjs7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsU0FBUztJQUNULFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUNBO0lBQ0ksZUFBZTtJQUNmLHNCQUFzQjtBQUMxQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbG1zY3R6bi9uZXctZW50cnkvbmV3LWVudHJ5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWVzZ3Mge1xyXG4gICAgaGVpZ2h0OiA4MHZoO1xyXG59XHJcblxyXG4uaW5jb21pbmdfbXNnX2ltZyB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG4ucmVjZWl2ZWRfbXNnIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBhZGRpbmc6IDAgMCAwIDEwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgd2lkdGg6IDkyJTtcclxufVxyXG4ubXNnLXVuc2Vlbnt9XHJcbi5yZWNlaXZlZF93aXRoZF9tc2cge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDU3JTtcclxufVxyXG4ucmVjZWl2ZWRfd2l0aGRfbXNnIHAge1xyXG4gICAgYmFja2dyb3VuZDogI2ViZWJlYjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBjb2xvcjogIzY0NjQ2NDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDEycHggMjBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi50aW1lX2RhdGUge1xyXG4gICAgY29sb3I6ICM3NDc0NzQ7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIG1hcmdpbjogOHB4IDAgMDtcclxufVxyXG4ub3V0Z29pbmdfbXNnIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBtYXJnaW46IDI2cHggMCAyNnB4O1xyXG59XHJcbi5zZW50X21zZyB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICB3aWR0aDogNDYlO1xyXG59XHJcbi5zZW50X21zZyBwIHtcclxuICAgIGJhY2tncm91bmQ6ICMyNjM4OWI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDIwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5pbWcge1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/content/lmsctzn/new-entry/new-entry.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/content/lmsctzn/new-entry/new-entry.component.ts ***!
  \******************************************************************/
/*! exports provided: NewEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewEntryComponent", function() { return NewEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NewEntryComponent = /** @class */ (function () {
    function NewEntryComponent() {
    }
    NewEntryComponent.prototype.ngOnInit = function () {
    };
    NewEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-new-entry',
            template: __webpack_require__(/*! raw-loader!./new-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/lmsctzn/new-entry/new-entry.component.html"),
            styles: [__webpack_require__(/*! ./new-entry.component.css */ "./src/app/content/lmsctzn/new-entry/new-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NewEntryComponent);
    return NewEntryComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-lmsctzn-lmsctzn-module.js.map