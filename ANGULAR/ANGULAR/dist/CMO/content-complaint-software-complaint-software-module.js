(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-complaint-software-complaint-software-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.html":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.html ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>{{title}} Compliant Entry Type</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Name\r\n      </mat-label>\r\n      <input matInput placeholder=\"Name in English\" [formControl]=\"name\" name=\"Name\" [(ngModel)]=\"model.Name\" id=\"Name\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"name.invalid && name.touched\">\r\n      Name in English is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Name in Hindi\r\n      </mat-label>\r\n      <input matInput placeholder=\"Name in Hindi\" name=\"NameHindi\" [(ngModel)]=\"model.NameHindi\" id=\"NameHindi\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-checkbox [(ngModel)]=\"model.IsActive\"> IsActive</mat-checkbox>\r\n    </section>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/entry-type/entry-type.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/Masters/entry-type/entry-type.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg\">\r\n  <div class=\"col l6 xl6 m6 s6 \">\r\n    <h5 class=\"page-title\">Suggestion-Feedback Entry Type Master :</h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6  text-right\" *ngIf=\"this.Permission.AddPageAccess\">\r\n    <button mat-button class=\"btn-submit mt-6\" (click)=\"OpenDialog(null)\">\r\n      <mat-icon>add</mat-icon>Create\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n<!-- <alert ></alert> -->\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\" (matSortChange)=\"sortData($event)\">\r\n\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsActive\">\r\n        <th mat-header-cell *matHeaderCellDef> Active Status </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnStatusClick(element.Id)\" title=\"Update Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(group.Id)\" title=\"edit\">\r\n            <mat-icon>edit</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[10, 20, 50,100]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons\r\n      *ngIf=\"totalRecords!=0\">\r\n    </mat-paginator>\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>{{title}} Compliant Status</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Name </mat-label>\r\n      <input matInput placeholder=\"Name in English\" [formControl]=\"name\" name=\"Name\" [(ngModel)]=\"model.Name\" id=\"Name\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"name.invalid && name.touched\">\r\n      Name in English is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Name in Hindi </mat-label>\r\n      <input matInput placeholder=\"Name in Hindi\" name=\"NameHindi\" [(ngModel)]=\"model.NameHindi\" id=\"NameHindi\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-label>Action</mat-label>\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"model.IsAdmAction\">Admin</mat-checkbox>\r\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"model.IsDevAction\">Developer</mat-checkbox>\r\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"model.IsUserAction\">User</mat-checkbox>\r\n    </section>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-label>Filter</mat-label>\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"model.IsAdmFilter\">Admin</mat-checkbox>\r\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"model.IsDevFilter\">Developer</mat-checkbox>\r\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"model.IsUserFilter\">User</mat-checkbox>\r\n    </section>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-checkbox [(ngModel)]=\"model.IsSMS\"> Is SMS</mat-checkbox>\r\n    </section>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>SMS Content </mat-label>\r\n      <input matInput placeholder=\"SMS Content\" name=\"SMSContent\" [(ngModel)]=\"model.SMSContent\" id=\"SMSContent\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>No Of Days For Auto Close</mat-label>\r\n      <input matInput placeholder=\"No Of Days For Auto Close\" name=\"NoOfDaysForAutoClose\"\r\n        [(ngModel)]=\"model.NoOfDaysForAutoClose\" id=\"NoOfDaysForAutoClose\" (keypress)=\"Numberonly($event)\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-checkbox [(ngModel)]=\"model.IsActive\"> IsActive</mat-checkbox>\r\n    </section>\r\n  </div>\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/status/status.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/Masters/status/status.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg\">\r\n  <div class=\"col l6 xl6 m6 s6 \">\r\n    <h5 class=\"page-title\">Suggestion-Feedback Status Master :</h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6  text-right\" *ngIf=\"this.Permission.AddPageAccess\">\r\n    <button mat-button class=\"btn-submit mt-6\" (click)=\"OpenDialog(null)\">\r\n      <mat-icon>add</mat-icon>Create\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n<!-- <alert ></alert> -->\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\" (matSortChange)=\"sortData($event)\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">{{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsAdmAction\">\r\n        <th mat-header-cell *matHeaderCellDef>Is Admin Action</th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'Adm','Action')\"\r\n            title=\"Update Admin Action Status\">\r\n            <mat-icon *ngIf=\"element.IsAdmAction\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsAdmAction\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Admin Action Status\">\r\n            <mat-icon *ngIf=\"element.IsAdmAction\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsAdmAction\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsDevAction\">\r\n        <th mat-header-cell *matHeaderCellDef> Is Dev Action </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'Dev','Action')\"\r\n            title=\"Update Dev Action Status\">\r\n            <mat-icon *ngIf=\"element.IsDevAction\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsDevAction\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Dev Action Status\">\r\n            <mat-icon *ngIf=\"element.IsDevAction\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsDevAction\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsUserAction\">\r\n        <th mat-header-cell *matHeaderCellDef> Is User Action </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'User','Action')\"\r\n            title=\"Update User Action Status\">\r\n            <mat-icon *ngIf=\"element.IsUserAction\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsUserAction\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"User Action  Status\">\r\n            <mat-icon *ngIf=\"element.IsUserAction\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsUserAction\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsAdmFilter\">\r\n        <th mat-header-cell *matHeaderCellDef> IsAdmin Filter </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'Adm','Filter')\"\r\n            title=\"Update Admin Filter Status\">\r\n            <mat-icon *ngIf=\"element.IsAdmFilter\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsAdmFilter\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Admin Filter Status\">\r\n            <mat-icon *ngIf=\"element.IsAdmFilter\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsAdmFilter\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsDevFilter\">\r\n        <th mat-header-cell *matHeaderCellDef> Is Dev Filter</th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'Dev','Filter')\"\r\n            title=\"Update Dev Filter Status\">\r\n            <mat-icon *ngIf=\"element.IsDevFilter\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsDevFilter\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Dev Filter Status\">\r\n            <mat-icon *ngIf=\"element.IsDevFilter\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsDevFilter\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsUserFilter\">\r\n        <th mat-header-cell *matHeaderCellDef> Is User Filter </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'User','Filter')\"\r\n            title=\"Update  User Filter Status\">\r\n            <mat-icon *ngIf=\"element.IsUserFilter\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsUserFilter\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\" User Filter Status\">\r\n            <mat-icon *ngIf=\"element.IsUserFilter\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsUserFilter\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsSMS\">\r\n        <th mat-header-cell *matHeaderCellDef> Is SMS </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnActionStatusClick(element.Id,'','SMS')\"\r\n            title=\"Update SMS Status\">\r\n            <mat-icon *ngIf=\"element.IsSMS\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsSMS\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"SMS Status\">\r\n            <mat-icon *ngIf=\"element.IsSMS\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsSMS\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"IsActive\">\r\n        <th mat-header-cell *matHeaderCellDef> Active Status </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OnStatusClick(element.Id)\" title=\"Update Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off\r\n            </mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef> Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(group.Id)\" title=\"edit\">\r\n            <mat-icon>edit</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[10, 20, 50,100]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons\r\n      *ngIf=\"totalRecords!=0\">\r\n    </mat-paginator>\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.html ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n\r\n  </div>\r\n  <form [formGroup]=\"frmGrp\" (ngSubmit)=\"Saveclick();\">\r\n    <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n      <mat-label class=\"d-block mb-10\">Description <span style=\"color: red\">*</span> </mat-label>\r\n\r\n\r\n      <mat-form-field class=\"example-full-width\"\r\n        [ngClass]=\"{'editor-required':(frmGrp.get('Description').hasError('required') && frmGrp.get('Description').touched)}\"\r\n        appearance=\"outline\">\r\n\r\n\r\n\r\n        <input style=\"display:none; \" matInput placeholder=\"Description\" name=\"Description\" #Description>\r\n        <angular-editor formControlName=\"Description\" name=\"Description\" id=\"Description\" [(ngModel)]=\"model.Description\"\r\n          [config]=\"editorConfig\" style=\"margin-top: 30px;\"></angular-editor>\r\n        <mat-hint>{{model.Description?.length}}</mat-hint>\r\n      </mat-form-field>\r\n      <mat-error class=\"mat-error-static\"\r\n        *ngIf=\"(frmGrp.get('Description').hasError('required') && frmGrp.get('Description').touched)\">\r\n        <strong>Description </strong> is required!\r\n      </mat-error>\r\n      </div>\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Entry Type</mat-label>\r\n        <mat-select name=\"Sector\" [(ngModel)]=\"model.EntryTypeId\" formControlName=\"EntryTypeId\" #EntryTypeId>\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlEntryTypeModule\">{{item.Text}}\r\n          </mat-option>\r\n          </mat-select>\r\n          </mat-form-field>\r\n      <mat-error *ngIf=\"(frmGrp.get('EntryTypeId').hasError('required') && frmGrp.get('EntryTypeId').touched) \">\r\n        Entry Type is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Priority</mat-label>\r\n        <mat-select name=\"Sector\" [(ngModel)]=\"model.PriorityId\" formControlName=\"PriorityId\" #PriorityId>\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlPriorityModule\">{{item.Text}} </mat-option>\r\n          </mat-select>\r\n          </mat-form-field>\r\n      <mat-error *ngIf=\"(frmGrp.get('PriorityId').hasError('required') && frmGrp.get('PriorityId').touched) \">\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n        Priority is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n\r\n    <!-- <div class=\"col l4 xl4 m6 s12\">\r\n                  <mat-form-field appearance=\"outline\">\r\n                    <mat-label> Module Name <span style=\"color: red\">*</span> </mat-label>\r\n                    <mat-select name=\"Type\" [(ngModel)]=\"model.ModuleId\" [formControl]=\"ModuleName\">\r\n                      <mat-option>--Select--</mat-option>\r\n                      <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlModuleName\">{{item.Text}} </mat-option>\r\n                    </mat-select>\r\n                  </mat-form-field>\r\n                  <mat-error *ngIf=\"ModuleName.invalid && ModuleName.touched\">\r\n                    Module Name is <strong>required</strong>\r\n                  </mat-error>\r\n                </div> -->\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Application <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select name=\"Application\" formControlName=\"ApplicationCode\" [(ngModel)]=\"model.ApplicationCode\"\r\n          (selectionChange)=\"getPageByPageType($event.value)\" #ApplicationCode>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlApplicationType\">{{k.Text}}\r\n          </mat-option>\r\n        </mat-select>\r\n        </mat-form-field>\r\n      <mat-error *ngIf=\"(frmGrp.get('ApplicationCode').hasError('required') && frmGrp.get('ApplicationCode').touched) \">\r\n        Application is <strong>required</strong>\r\n      </mat-error>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Page <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select name=\"PageCode\" formControlName=\"PageCode\" [(ngModel)]=\"model.PageCode\" #PageCode>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlPageMasterDetails\">{{ k.Text }}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"(frmGrp.get('PageCode').hasError('required') && frmGrp.get('PageCode').touched)\">\r\n        Page is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Screen Url <span style=\"color: red\">*</span></mat-label>\r\n        <input matInput placeholder=\"Screen URL\" name=\"ScreenURL\" formControlName=\"ScreenURL\" [(ngModel)]=\"model.ScreenURL\"\r\n          #ScreenURL>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"frmGrp.get('ScreenURL').touched && frmGrp.get('ScreenURL').invalid\">\r\n          <div *ngIf=\"frmGrp.get('ScreenURL').hasError('required')\">ScreenURL is <strong>required</strong>.</div>\r\n          <div *ngIf=\"frmGrp.get('ScreenURL').errors.pattern\">Please enter valid url.</div>\r\n        </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label>Attachment(Pdf/Image(jpeg,png) Only) </label>\r\n        <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event.target.files)\"\r\n          accept=\"application/pdf,image/jpeg,image/png\" multiple>\r\n        </div>\r\n\r\n\r\n      <ul class=\"image-list\">\r\n        <li *ngFor=\"let url of documentUrlList; let i = index;\">\r\n\r\n          <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" href=\"javascript:void();\"\r\n            (click)=\"downloadPdf(url?.Url,url.DisplayName)\">\r\n            <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">picture_as_pdf </mat-icon>\r\n            {{ url.DisplayName}}\r\n          </a>\r\n          <a title=\"Remove\" (click)=\"RemoveImageFile(i)\">\r\n            <mat-icon>delete</mat-icon>\r\n          </a>\r\n          <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\">\r\n            <img [src]=\"url?.Url\" />\r\n          </div>\r\n          </li>\r\n          </ul>\r\n      <mat-error *ngIf=\"fileValidationMsg?.length>0\">\r\n        {{fileValidationMsg}}\r\n      </mat-error>\r\n    </div>\r\n    <div class=\"col l12 x8 m4 s12 \">\r\n      <button type=\"submit\" mat-raised-button class=\"btn-submit\">Submit</button>\r\n      </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.html":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.html ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx\">\r\n  <div class=\"table-responsive\">\r\n    <table class=\"table custom-data-table\">\r\n      <tbody>\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Description:</h2>\r\n            </section>\r\n          </td>\r\n          <td colspan=\"3\">\r\n            <section class=\"mat-typography\">\r\n\r\n              <h3 class=\"color-grey\" [innerHTML]=\"model.Description != null ? model.Description : 'N/A'\">\r\n              </h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Entry Type:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">\r\n                {{ model.EntryTypeName != null ? model.EntryTypeName : 'N/A' }}\r\n              </h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Priority:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">\r\n                {{ model.PriorityName != null ? model.PriorityName : 'N/A' }}\r\n              </h3>\r\n            </section>\r\n          </td>\r\n          <!-- <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Created Date:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">\r\n                {{ model.CreatedDate != null ? (model.CreatedDate | date: 'dd/MM/yyyy') : 'N/A' }}\r\n              </h3>\r\n            </section>\r\n          </td> -->\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Application Title:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">\r\n                {{ model.ApplicationTitle != null ? model.ApplicationTitle : 'N/A' }}\r\n              </h3>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Page:</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">\r\n                {{ model.PageTitle != null ? model.PageTitle : 'N/A' }}\r\n              </h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\"> Screen URL:</h2>\r\n            </section>\r\n          </td>\r\n          <td colspan=\"3\">\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">\r\n                <a target=\"_blank\" href=\"{{model?.ScreenURL}}\">\r\n                  {{model?.ScreenURL}}\r\n                </a>\r\n              </h3>\r\n            </section>\r\n          </td>\r\n        </tr>\r\n\r\n\r\n        <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Attachments:</h2>\r\n            </section>\r\n          </td>\r\n          <td colspan=\"2\">\r\n            <section class=\"mat-typography\">\r\n              <ul class=\"image-list\" *ngIf=\"model?.AttachmentList\">\r\n                <li *ngFor=\"let url of model?.AttachmentList;let i = index;\">\r\n                  <!-- <a *ngIf=\"url?.split('.')[1]?.toLowerCase()=='pdf'\"\r\n                    (click)=\"this._commonService.downloadPdf(url,url?.split('.')[0])\" href=\"javascript:void(0);\">\r\n                    <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">picture_as_pdf</mat-icon>\r\n                  </a> -->\r\n                  <a *ngIf=\"(url?.includes('.pdf'))\" target=\"_blank\" href=\"{{(url)}}\">\r\n                    <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">picture_as_pdf </mat-icon>\r\n                  </a>\r\n                  <div *ngIf=\"!(url?.includes('.pdf'))\">\r\n                    <a target=\"_blank\" href=\"{{(url)}}\">\r\n                      <img [src]=\"(url)\" />\r\n                    </a>\r\n                  </div>\r\n                </li>\r\n              </ul>\r\n              <h3 class=\"color-grey\" *ngIf=\"!model?.AttachmentList\">N/A</h3>\r\n            </section>\r\n          </td>\r\n          <td style=\"text-align:right\">\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(this.RecordId)\" title=\"Add New Action\">\r\n              <mat-icon>add_comment</mat-icon>\r\n            </a>\r\n          </td>\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <div class=\"col l12 x8 m4 s12 clearfix\" *ngIf=\"model?.ActionList?.length>0\">\r\n    <fieldset>\r\n      <legend class=\"row\">\r\n        <div class=\"col xl12 l12 m12 s12 text-left\">\r\n          <h5><strong>Action </strong></h5>\r\n        </div>\r\n      </legend>\r\n\r\n      <table class=\"mat-table\">\r\n\r\n        <thead>\r\n          <tr class=\"header\">\r\n            <th>#</th>\r\n            <th>Status</th>\r\n            <th>Comment</th>\r\n            <th>Attachments</th>\r\n            <th>EnterBy Date</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let  item  of model.ActionList;let i=index\">\r\n            <td> {{i+1}}</td>\r\n            <td> {{item.Status}}</td>\r\n            <td>\r\n              <div [innerHTML]=\"item.Comment != null ? item.Comment : ' '\"></div>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <ul class=\"image-list\" *ngIf=\"item?.AttachmentURL\">\r\n                  <li>\r\n                    <a *ngIf=\"(item?.AttachmentURL?.includes('.pdf'))\" target=\"_blank\" href=\"{{(item?.AttachmentURL)}}\">\r\n                      <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">picture_as_pdf</mat-icon>\r\n                    </a>\r\n                    <div *ngIf=\"!(item?.AttachmentURL?.includes('.pdf'))\">\r\n                      <a target=\"_blank\" href=\"{{(item?.AttachmentURL)}}\">\r\n                        <img [src]=\"(item?.AttachmentURL)\" />\r\n                      </a>\r\n                    </div>\r\n                  </li>\r\n                </ul>\r\n                <h3 class=\"color-grey\" *ngIf=\"item?.AttachmentURL==null\">N/A</h3>\r\n              </section>\r\n            </td>\r\n            <td> {{item.FromUser}} <br /> {{item.CreatedDate != null ? (item.CreatedDate | date:\r\n              'dd/MM/yyyy h:mm:ss a') : '-' }}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n\r\n    </fieldset>\r\n  </div>\r\n</div>\r\n<!-- <div class=\"row\">\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n      <button *ngIf=\"loginBaseUserType!=userTypeEnum.ADM && loginBaseUserType!=userTypeDOS && loginBaseUserType!=userTypeVNDR && loginBaseUserType != userTypeVNDRUSER && !IsHideDeptInternal_VendorCommBtn\"\r\n      mat-button class=\"btn-submit mt-6\" (click)=\"OpenChangeOfficeDialog(model.CommunicationCode)\">Move to\r\n          Other Department Office</button>\r\n  </div>\r\n</div> -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/complaint-software.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/complaint-software.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l4 xl4 m4 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Status</mat-label>\r\n      <mat-select [(ngModel)]=\"statusId\" multiple>\r\n        <mat-option disabled=\"disabled\" (click)=\"selectAllStatus()\">\r\n          <mat-checkbox [checked]=\"selectedAllStatus || statusId?.length==dDLList?.ddlCompliantFilter?.length\"> SelectAll\r\n          </mat-checkbox>\r\n        </mat-option>\r\n        <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlCompliantFilter\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l4 xl4 m4 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Entry Type</mat-label>\r\n      <mat-select name=\"Sector\" [(ngModel)]=\"searchModel.EntryTypeId\">\r\n        <mat-option>--Select--</mat-option>\r\n        <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlEntryTypeModule\">{{item.Text}} </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    </div>\r\n    <div class=\"col l4 xl4 m4 s12 text-right\" title=\"Advance Search\">\r\n      <a (click)=\"toggleDisplay()\" class=\"btn-ad-search\">\r\n        <span class=\"material-icons mat-icon\">\r\n          manage_search\r\n        </span>\r\n      <mat-icon>\r\n        {{!isShow?'keyboard_arrow_up ':\"keyboard_arrow_down\"}}\r\n      </mat-icon>\r\n    </a>\r\n  </div>\r\n  <br />\r\n  </div>\r\n  <div class=\"row\" *ngIf=\"!isShow\">\r\n    <div class=\"col l4 xl4 m4 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Application <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select name=\"Application\" [(ngModel)]=\"searchModel.ApplicationCode\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlApplicationType\">{{k.Text}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l2 xl2 m2 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\"\r\n          [(ngModel)]=\"searchModel.FromDate\" [max]=\"searchModel.ToDate\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n  <div class=\"col l2 xl2 m2 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>To Date</mat-label>\r\n      <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\"\r\n        [(ngModel)]=\"searchModel.ToDate\" [min]=\"searchModel.FromDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker2></mat-datepicker>\r\n      </mat-form-field>\r\n      </div>\r\n      <div class=\"col l2 xl2 m2 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Action From Date</mat-label>\r\n          <input matInput [matDatepicker]=\"ActionFromDate\" (focus)=\"ActionFromDate.open()\" readonly\r\n            placeholder=\"Action From Date\" [(ngModel)]=\"searchModel.ActionFromDate\" [max]=\"searchModel.ActionToDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"ActionFromDate\"></mat-datepicker-toggle>\r\n          <mat-datepicker #ActionFromDate></mat-datepicker>\r\n        </mat-form-field>\r\n        </div>\r\n\r\n        <div class=\"col l2 xl2 m2 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Action To Date</mat-label>\r\n            <input matInput [matDatepicker]=\"ActionToDate\" (focus)=\"ActionToDate.open()\" readonly placeholder=\"Action To Date\"\r\n              [(ngModel)]=\"searchModel.ActionToDate\" [min]=\"searchModel.ActionFromDate\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"ActionToDate\"></mat-datepicker-toggle>\r\n            <mat-datepicker #ActionToDate></mat-datepicker>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col l12 xl12 m12 s12 \">\r\n      <button (click)=\"Search()\" mat-button class=\"btn-submit\">Search</button>\r\n      &nbsp;\r\n      <button (click)=\"Reset()\" mat-button class=\"btn-submit btn_orange mat-button\">Reset<mat-icon>refresh</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n      <div class=\"table-responsive\">\r\n        <mat-toolbar color=\"primary\" *ngIf=\"totalRecords==0\" class=\"no-record\">No Record...!</mat-toolbar>\r\n\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\" (matSortChange)=\"sortData($event)\"\r\n          *ngIf=\"totalRecords!=0\">\r\n\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>Sno/Ticket No</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n            {{(searchModel.indexModel.Page-1)*searchModel.indexModel.PageSize +(i+1)}}/\r\n            {{element.Id}}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n          <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"StatusName\">\r\n          <th style=\"width: 140px;\" mat-header-cell *matHeaderCellDef> <span>Status </span></th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n            <div> {{group.StatusName != null ? group.StatusName : '-' }}</div>\r\n            <div class=\"info-bg-1\" matTooltip=\"Action By User Name\" *ngIf=\"group.ActionBy != null\"> {{group.ActionBy != null ?\r\n              group.ActionBy : '-' }}</div>\r\n            <div class=\"info-bg-2\" *ngIf=\"group.ActionBySSOID != null\" matTooltip=\"ActionBySSOID\"> {{group.ActionBySSOID != null\r\n              ? group.ActionBySSOID : '-' }}\r\n            </div>\r\n            <div class=\"info-bg-3\" matTooltip=\"Action Date\" *ngIf=\"group.ActionBy != null\"> {{group.ActionDate != null ?\r\n              (group.ActionDate | date:\r\n              'dd/MM/yyyy h:mm:ss a') : '-' }}\r\n            </div>\r\n            <div class=\"info-bg-2\" matTooltip=\"Action User Mobile Number\" *ngIf=\"group.ActionBy != null\">\r\n              <span class=\"mat-icon material-icons\" style=\"font-size: initial !important; \">\r\n                phone\r\n              </span>{{group.ActionUserMobile != null ?\r\n              +group.ActionUserMobile : '-' }}\r\n            </div>\r\n          </td>\r\n        </ng-container>\r\n\t\t\t <ng-container matColumnDef=\"Description\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Description </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\" [innerHTML]=\"group.Description\">\r\n          </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"ScreenURL\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> URL </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\" title=\"{{group.ScreenURL}}\">\r\n            <a href=\"{{group.ScreenURL}}\" target=\"_blank\">\r\n              {{ group.ScreenURL.length>20 ? (group.ScreenURL |slice:0:20 )+'...' :group.ScreenURL}}\r\n            </a>\r\n\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"PriorityId\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Priority </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\" title={{group.PriorityName}}\r\n            [ngStyle]=\"{'background': group?.PriorityId==compliantEnum.High? '#e2111138': group.PriorityId==compliantEnum.Medium? '#e2dc1161':group.PriorityId==compliantEnum.Low?'#f2d600':'' }\">\r\n            {{ group.PriorityName}}\r\n\r\n          </td>\r\n          </ng-container>\r\n        <ng-container matColumnDef=\"CreatedDate\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Entry Date </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n            {{ group.CreatedDate !=null ? (group.CreatedDate| date: 'dd/MM/yyyy') :'--' }}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Attachments\">\r\n          <th mat-header-cell *matHeaderCellDef>Attachments</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n            <ul>\r\n              <li *ngFor=\"let url of element.AttachmentList; let i = index;\">\r\n                <a *ngIf=\"url?.includes('.pdf')\" target=\"_blank\" href=\"{{url}}\">\r\n                  <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">picture_as_pdf</mat-icon>\r\n                </a>\r\n                <a *ngIf=\"!url?.includes('.pdf')\" target=\"_blank\" href=\"{{url}}\">\r\n                  <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">image</mat-icon>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"UserDetail\">\r\n          <th mat-header-cell *matHeaderCellDef> <span>User Details </span></th>\r\n          <td style=\"width: 140px;\" mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n            <div class=\"info-bg-1\" matTooltip=\"Created By User Name\"> {{group.UserName != null ? group.UserName : '-' }}\r\n            </div>\r\n            <div class=\"info-bg-2\" *ngIf=\"group.SSOID != null\" matTooltip=\"SSOID\"> {{group.SSOID != null ? group.SSOID :\r\n              '-' }}\r\n            </div>\r\n            <div class=\"info-bg-3\" *ngIf=\"group.UserDepartmentName != null\" matTooltip=\"Department Name\">\r\n              {{group.UserDepartmentName\r\n              != null ?\r\n              group.UserDepartmentName : '-'\r\n              }} </div>\r\n            <div class=\"info-bg-1\" matTooltip=\"User Type\"> {{group.UserType != null ? group.UserType : '' }} </div>\r\n            <div class=\"info-bg-3\" matTooltip=\"Created Date\"> {{group.CreatedDate != null ? (group.CreatedDate | date:\r\n              'dd/MM/yyyy h:mm:ss a') : '-' }}\r\n            </div>\r\n            <div class=\"info-bg-2\" matTooltip=\"User Mobile Number\">\r\n              <span class=\"mat-icon material-icons\" style=\"font-size: initial !important; \">\r\n                phone\r\n              </span>{{group.UserMobile != null ?\r\n              +group.UserMobile : '-' }}\r\n            </div>\r\n          </td>\r\n          </ng-container>\r\n        <ng-container matColumnDef=\"Action\">\r\n          <th mat-header-cell *matHeaderCellDef> Action </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n            <a *ngIf=\"this.Permission.DetailPageAccess\" routerLink=\"/compliant/detail/{{group.Id}}\" matTooltipPosition=\"below\"\r\n              matTooltip=\"Detail\">\r\n              <mat-icon>visibility</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(group.Id)\" title=\"Add New Action\">\r\n              <mat-icon>add_comment</mat-icon>\r\n            </a>\r\n            </td>\r\n            </ng-container>\r\n\r\n        <!-- <ng-container matColumnDef=\"Action\">\r\n          <th mat-header-cell *matHeaderCellDef> Action </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"OpenDialog(group.Id)\" title=\"edit\">\r\n              <mat-icon>edit</mat-icon>\r\n            </a>\r\n            <a *ngIf=\"this.Permission.UpdatePageAccess\" routerLink=\"/vc/participant/{{group.Code}}\" title=\"View Participant List\">\r\n                <mat-icon>visibility</mat-icon>\r\n              </a>\r\n              <a (click)=\"onDelete(group.Id);\" title=\"Delete\" class=\"btn_delete\" href=\"javascript:void(0)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </a>\r\n          </td>\r\n        </ng-container> -->\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n      </table>\r\n\r\n      <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"searchModel.indexModel.PageSize\"\r\n        [pageSizeOptions]=\"[10, 20, 50,100]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons\r\n        *ngIf=\"totalRecords!=0\" [pageIndex]=\"this.searchModel.indexModel.Page-1\">\r\n      </mat-paginator>\r\n    </div>\r\n    </div>\r\n    </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n    <p>Add Action</p>\r\n    <button mat-button (click)=\"onNoClick()\">\r\n        <mat-icon>close</mat-icon>\r\n    </button>\r\n</div>\r\n\r\n<div class=\"col l12 s12 \">\r\n  <form [formGroup]=\"frmGrp\" (ngSubmit)=\"Saveclick();\">\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Status <span style=\"color: red\">*</span></mat-label>\r\n            <mat-select name=\"StatusId\" [(ngModel)]=\"model.StatusId\" formControlName=\"Status\" #Status>\r\n                <mat-option>--Select--</mat-option>\r\n                <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlCompliantAction\">{{k.Text}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"(frmGrp.get('Status').hasError('required') && frmGrp.get('Status').touched) \">\r\n          Status is <strong>required</strong>\r\n        </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n\r\n        <mat-label class=\"d-block mb-10\">Comment <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-form-field class=\"example-full-width\"\r\n          [ngClass]=\"{'editor-required':(frmGrp.get('Comment').hasError('required') && frmGrp.get('Comment').touched)}\"\r\n          appearance=\"outline\">\r\n\r\n          <input style=\"display:none; \" matInput placeholder=\"Comment\" name=\"Comment\" #Comment>\r\n          <angular-editor formControlName=\"Comment\" name=\"Comment\" id=\"Comment\" [(ngModel)]=\"model.Comment\"\r\n            [config]=\"editorConfig\" style=\"margin-top: 30px;\"></angular-editor>\r\n        </mat-form-field>\r\n        <mat-error class=\"mat-error-static\"\r\n          *ngIf=\"(frmGrp.get('Comment').hasError('required') && frmGrp.get('Comment').touched)\">\r\n          <strong>Comment </strong> is required!\r\n        </mat-error>\r\n      </div>\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n        <div class=\"upload-btn-wrapper\">\r\n          <label>Attachment(Pdf/Image(jpeg,png) Only) </label>\r\n          <input type=\"file\" id=\"file\" formControlName=\"Attachment\" (change)=\"handleFileInput($event.target.files)\"\r\n            accept=\"application/pdf,image/jpeg,image/png\" #Attachment>\r\n        </div>\r\n\r\n        <a *ngIf=\"model.Extension?.toLowerCase()=='pdf' && model?.AttachmentURL\" href=\"javascript:void();\" (click)=\"download(model?.AttachmentURL)\" >\r\n\r\n          <mat-icon class=\"mat-icon notranslate material-icons mat-icon-no-color\">picture_as_pdf </mat-icon>\r\n            Click Here to Download\r\n          </a>\r\n          <a title=\"Remove\" *ngIf=\"model?.AttachmentURL?.length > 0\" (click)=\"RemoveImageFile()\">\r\n            <mat-icon>delete</mat-icon>\r\n          </a>\r\n          <div *ngIf=\"model?.Extension?.toLowerCase()!='pdf' && model?.AttachmentURL\">\r\n            <img style=\"widows: 50px;height:50px;\" [src]=\"model?.AttachmentURL\" />\r\n          </div>\r\n\r\n      </div>\r\n       <mat-error *ngIf=\"Attachment.invalid && Attachment.touched\">\r\n            Attachment is <strong>required</strong>\r\n        </mat-error>\r\n\r\n        <mat-error *ngIf=\"fileValidationMsg?.length>0\">\r\n          {{fileValidationMsg}}\r\n        </mat-error>\r\n\r\n    <div class=\"col l12 x8 m4 s12 \">\r\n        <button mat-button class=\"btn-submit\">Submit</button>\r\n    </div>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Shared/Enum/compliant.enum.ts":
/*!***********************************************!*\
  !*** ./src/app/Shared/Enum/compliant.enum.ts ***!
  \***********************************************/
/*! exports provided: CompliantEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompliantEnum", function() { return CompliantEnum; });
var CompliantEnum;
(function (CompliantEnum) {
    CompliantEnum[CompliantEnum["High"] = 1] = "High";
    CompliantEnum[CompliantEnum["Medium"] = 2] = "Medium";
    CompliantEnum[CompliantEnum["Low"] = 3] = "Low";
})(CompliantEnum || (CompliantEnum = {}));


/***/ }),

/***/ "./src/app/Shared/Model/Master/complain-entry-type-master-model.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Shared/Model/Master/complain-entry-type-master-model.ts ***!
  \*************************************************************************/
/*! exports provided: ComplainEntryTypeMasterViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplainEntryTypeMasterViewModel", function() { return ComplainEntryTypeMasterViewModel; });
var ComplainEntryTypeMasterViewModel = /** @class */ (function () {
    function ComplainEntryTypeMasterViewModel() {
        this.IsActive = false;
        this.Id = 0;
    }
    return ComplainEntryTypeMasterViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Master/complain-status-master-model.ts":
/*!*********************************************************************!*\
  !*** ./src/app/Shared/Model/Master/complain-status-master-model.ts ***!
  \*********************************************************************/
/*! exports provided: ComplainStatusMasterViewModel, ChangeStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplainStatusMasterViewModel", function() { return ComplainStatusMasterViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeStatus", function() { return ChangeStatus; });
var ComplainStatusMasterViewModel = /** @class */ (function () {
    function ComplainStatusMasterViewModel() {
        this.Id = 0;
        this.IsDevFilter = false;
        this.IsAdmFilter = false;
        this.IsUserFilter = false;
        this.IsDevAction = false;
        this.IsAdmAction = false;
        this.IsUserAction = false;
        this.IsSMS = false;
        this.IsActive = false;
        this.IsDelete = false;
    }
    return ComplainStatusMasterViewModel;
}());

var ChangeStatus = /** @class */ (function () {
    function ChangeStatus() {
    }
    return ChangeStatus;
}());



/***/ }),

/***/ "./src/app/Shared/Model/complaint.model.ts":
/*!*************************************************!*\
  !*** ./src/app/Shared/Model/complaint.model.ts ***!
  \*************************************************/
/*! exports provided: ComplaintListModel, ComplaintAttachmentModel, CompliantSearchModel, ComplaintEntryListModel, ComplaintActionModel, ComplaintActionHistory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintListModel", function() { return ComplaintListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintAttachmentModel", function() { return ComplaintAttachmentModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompliantSearchModel", function() { return CompliantSearchModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintEntryListModel", function() { return ComplaintEntryListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintActionModel", function() { return ComplaintActionModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintActionHistory", function() { return ComplaintActionHistory; });
/* harmony import */ var _general_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general-model */ "./src/app/Shared/Model/general-model.ts");

var ComplaintListModel = /** @class */ (function () {
    function ComplaintListModel() {
        this.AttachmentList = [];
    }
    return ComplaintListModel;
}());

var ComplaintAttachmentModel = /** @class */ (function () {
    function ComplaintAttachmentModel() {
    }
    return ComplaintAttachmentModel;
}());

// export class CompliantSearchModel extends IndexModel {
//   status: number | string;
// }
var CompliantSearchModel = /** @class */ (function () {
    function CompliantSearchModel() {
        this.indexModel = new _general_model__WEBPACK_IMPORTED_MODULE_0__["IndexModel"]();
        //  this.ApplicationCode = 0;
        this.StatusId = null;
        // this.EntryTypeId = 0;
    }
    return CompliantSearchModel;
}());

var ComplaintEntryListModel = /** @class */ (function () {
    function ComplaintEntryListModel() {
        this.AttachmentList = [];
        this.ActionList = [];
    }
    return ComplaintEntryListModel;
}());

var ComplaintActionModel = /** @class */ (function () {
    function ComplaintActionModel() {
    }
    return ComplaintActionModel;
}());

var ComplaintActionHistory = /** @class */ (function () {
    function ComplaintActionHistory() {
    }
    return ComplaintActionHistory;
}());



/***/ }),

/***/ "./src/app/Shared/Service/complain-entry-type-master.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/Shared/Service/complain-entry-type-master.service.ts ***!
  \**********************************************************************/
/*! exports provided: ComplainEntryTypeMasterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplainEntryTypeMasterService", function() { return ComplainEntryTypeMasterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");




var ComplainEntryTypeMasterService = /** @class */ (function () {
    function ComplainEntryTypeMasterService(_baseService) {
        this._baseService = _baseService;
    }
    ComplainEntryTypeMasterService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainEntryTypeListUrl, model);
    };
    ComplainEntryTypeMasterService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainEntryTypeAddUrl, model);
    };
    ComplainEntryTypeMasterService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainEntryTypeUpdateUrl, model);
    };
    ComplainEntryTypeMasterService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainEntryTypeUpdateStatusUrl + id);
    };
    ComplainEntryTypeMasterService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainEntryTypeGetByIdUrl + id);
    };
    ComplainEntryTypeMasterService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    ComplainEntryTypeMasterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], ComplainEntryTypeMasterService);
    return ComplainEntryTypeMasterService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/complain-status-master.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/Shared/Service/complain-status-master.service.ts ***!
  \******************************************************************/
/*! exports provided: ComplainStatusMasterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplainStatusMasterService", function() { return ComplainStatusMasterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");




var ComplainStatusMasterService = /** @class */ (function () {
    function ComplainStatusMasterService(_baseService) {
        this._baseService = _baseService;
    }
    ComplainStatusMasterService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainStatusListUrl, model);
    };
    ComplainStatusMasterService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainStatusAddUrl, model);
    };
    ComplainStatusMasterService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainStatusUpdateUrl, model);
    };
    ComplainStatusMasterService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainStatusUpdateStatusUrl + id);
    };
    ComplainStatusMasterService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainStatusGetByIdUrl + id);
    };
    ComplainStatusMasterService.prototype.ChangeStatus = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComplainStatusChangeStatusUrl, model);
    };
    ComplainStatusMasterService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    ComplainStatusMasterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], ComplainStatusMasterService);
    return ComplainStatusMasterService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/complaint.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/Shared/Service/complaint.service.ts ***!
  \*****************************************************/
/*! exports provided: ComplaintService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintService", function() { return ComplaintService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authentication.service */ "./src/app/Shared/Service/authentication.service.ts");





var ComplaintService = /** @class */ (function () {
    function ComplaintService(_baseService, _authService) {
        this._baseService = _baseService;
        this._authService = _authService;
    }
    ComplaintService.prototype.GetList = function (model) {
        model.LoginUserCode = this._authService.GetCurrentUserDetail().UserViewModel.UserId;
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].ComplaintList, model);
        return result;
    };
    ComplaintService.prototype.Add = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].ComplaintAdd, model);
        return result;
    };
    ComplaintService.prototype.AddAction = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].ComplaintAddAction, model);
        return result;
    };
    // GetById(Id) {
    //   const result = this._baseService.get(AppSetting.GovermentAchivementGetById + Id, null);
    //   return result;
    // }
    // Edit(model: GovermentAchivementModel) {
    //   const result = this._baseService.post(AppSetting.GovermentAchivementEdit, model);
    //   return result;
    // }
    ComplaintService.prototype.Detail = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].ComplaintDetailUrl + id);
    };
    ComplaintService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] },
        { type: _authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"] }
    ]; };
    ComplaintService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"],
            _authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], ComplaintService);
    return ComplaintService;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.css":
/*!*************************************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL01hc3RlcnMvZW50cnktdHlwZS9hZGQtdXBkYXRlLWVudHJ5LXR5cGUvYWRkLXVwZGF0ZS1lbnRyeS10eXBlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.ts ***!
  \************************************************************************************************************************/
/*! exports provided: AddUpdateEntryTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateEntryTypeComponent", function() { return AddUpdateEntryTypeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_Master_complain_entry_type_master_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/Master/complain-entry-type-master-model */ "./src/app/Shared/Model/Master/complain-entry-type-master-model.ts");
/* harmony import */ var src_app_Shared_Service_complain_entry_type_master_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/complain-entry-type-master.service */ "./src/app/Shared/Service/complain-entry-type-master.service.ts");










var AddUpdateEntryTypeComponent = /** @class */ (function () {
    function AddUpdateEntryTypeComponent(_userService, _alertService, _dialogRef, _complainEntryTypeMasterService, _authService, _commonService, data) {
        this._userService = _userService;
        this._alertService = _alertService;
        this._dialogRef = _dialogRef;
        this._complainEntryTypeMasterService = _complainEntryTypeMasterService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.data = data;
        this.name = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.title = "Add";
        if (data) {
            this.id = data;
            this.GetById();
            this.title = 'Edit';
        }
        this.model = new src_app_Shared_Model_Master_complain_entry_type_master_model__WEBPACK_IMPORTED_MODULE_8__["ComplainEntryTypeMasterViewModel"]();
    }
    AddUpdateEntryTypeComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    };
    AddUpdateEntryTypeComponent.prototype.GetById = function () {
        var _this = this;
        this._complainEntryTypeMasterService.GetById(this.id).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.model = data.Data;
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_Master_complain_entry_type_master_model__WEBPACK_IMPORTED_MODULE_8__["ComplainEntryTypeMasterViewModel"]();
            _this._alertService.error(error.message);
        });
    };
    AddUpdateEntryTypeComponent.prototype.SaveClick = function () {
        var _this = this;
        this.name.markAsTouched();
        if (this.name.valid) {
            if (this.model.Id) {
                this.model.ModifiedBy = this.loginData.UserId;
                this._complainEntryTypeMasterService.Edit(this.model).subscribe(function (data) {
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
                this.model.CreatedBy = this.loginData.UserId;
                this._complainEntryTypeMasterService.Add(this.model).subscribe(function (data) {
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
    AddUpdateEntryTypeComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AddUpdateEntryTypeComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: src_app_Shared_Service_complain_entry_type_master_service__WEBPACK_IMPORTED_MODULE_9__["ComplainEntryTypeMasterService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AddUpdateEntryTypeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-add-update-entry-type',
            template: __webpack_require__(/*! raw-loader!./add-update-entry-type.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.html"),
            styles: [__webpack_require__(/*! ./add-update-entry-type.component.css */ "./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            src_app_Shared_Service_complain_entry_type_master_service__WEBPACK_IMPORTED_MODULE_9__["ComplainEntryTypeMasterService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], Object])
    ], AddUpdateEntryTypeComponent);
    return AddUpdateEntryTypeComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/Masters/entry-type/entry-type.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/entry-type/entry-type.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL01hc3RlcnMvZW50cnktdHlwZS9lbnRyeS10eXBlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/complaint-software/Masters/entry-type/entry-type.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/entry-type/entry-type.component.ts ***!
  \***************************************************************************************/
/*! exports provided: EntryTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntryTypeComponent", function() { return EntryTypeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_complain_entry_type_master_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/complain-entry-type-master.service */ "./src/app/Shared/Service/complain-entry-type-master.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _add_update_entry_type_add_update_entry_type_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add-update-entry-type/add-update-entry-type.component */ "./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");













var EntryTypeComponent = /** @class */ (function () {
    //#endregion
    function EntryTypeComponent(_alertService, _parentApi, _dialog, _commonService, _router, _complainEntryTypeMasterService) {
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this._commonService = _commonService;
        this._router = _router;
        this._complainEntryTypeMasterService = _complainEntryTypeMasterService;
        this.displayedColumns = ['index', 'Name', 'NameHindi', 'IsActive', 'Action'];
        this.ViewdisplayedColumns = [{ Value: 'Name', Text: 'Entry Type Name' }, { Value: 'NameHindi', Text: 'Entry Type Name In Hindi' }];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/compliant/master/entrytype", "/compliant/master/entrytype/add", "", "/compliant/master/entrytype/edit", "");
        this._parentApi.setpagelayout("", "", "", "", true);
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    EntryTypeComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    EntryTypeComponent.prototype.GetList = function () {
        var _this = this;
        this._complainEntryTypeMasterService.GetList(this.indexModel).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.listModel = data.Data.Data;
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
    EntryTypeComponent.prototype.OpenDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_add_update_entry_type_add_update_entry_type_component__WEBPACK_IMPORTED_MODULE_10__["AddUpdateEntryTypeComponent"], {
            width: "500px",
            data: Id,
            disableClose: true
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    EntryTypeComponent.prototype.OnStatusClick = function (id) {
        var _this = this;
        this._commonService.GenerateOTP().subscribe(function (data) {
            if (data.IsSuccess) {
                var _dialogRef = _this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_11__["ConfirmationDialogComponent"], {
                    width: "50%",
                    data: src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_12__["GlobalMessagesModel"].ConfirmStatusChanged
                });
                _dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        _this._complainEntryTypeMasterService.ChangeActiveStatus(id).subscribe(function (data) {
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
    EntryTypeComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    EntryTypeComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    EntryTypeComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: src_app_Shared_Service_complain_entry_type_master_service__WEBPACK_IMPORTED_MODULE_8__["ComplainEntryTypeMasterService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], EntryTypeComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], EntryTypeComponent.prototype, "sort", void 0);
    EntryTypeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-entry-type',
            template: __webpack_require__(/*! raw-loader!./entry-type.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/entry-type/entry-type.component.html"),
            styles: [__webpack_require__(/*! ./entry-type.component.css */ "./src/app/content/complaint-software/Masters/entry-type/entry-type.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            src_app_Shared_Service_complain_entry_type_master_service__WEBPACK_IMPORTED_MODULE_8__["ComplainEntryTypeMasterService"]])
    ], EntryTypeComponent);
    return EntryTypeComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.css":
/*!*************************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.css ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL01hc3RlcnMvc3RhdHVzL2FkZC11cGRhdGUtc3RhdHVzL2FkZC11cGRhdGUtc3RhdHVzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: AddUpdateStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateStatusComponent", function() { return AddUpdateStatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_complain_status_master_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/complain-status-master.service */ "./src/app/Shared/Service/complain-status-master.service.ts");
/* harmony import */ var src_app_Shared_Model_Master_complain_status_master_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/Master/complain-status-master-model */ "./src/app/Shared/Model/Master/complain-status-master-model.ts");










var AddUpdateStatusComponent = /** @class */ (function () {
    function AddUpdateStatusComponent(_userService, _alertService, _dialogRef, _complainStatusMasterService, _authService, _commonService, data) {
        this._userService = _userService;
        this._alertService = _alertService;
        this._dialogRef = _dialogRef;
        this._complainStatusMasterService = _complainStatusMasterService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.data = data;
        this.name = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.title = "Add";
        if (data) {
            this.id = data;
            this.GetById();
            this.title = 'Edit';
        }
        this.model = new src_app_Shared_Model_Master_complain_status_master_model__WEBPACK_IMPORTED_MODULE_9__["ComplainStatusMasterViewModel"]();
    }
    AddUpdateStatusComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    };
    AddUpdateStatusComponent.prototype.GetById = function () {
        var _this = this;
        this._complainStatusMasterService.GetById(this.id).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.model = data.Data;
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_Master_complain_status_master_model__WEBPACK_IMPORTED_MODULE_9__["ComplainStatusMasterViewModel"]();
            _this._alertService.error(error.message);
        });
    };
    AddUpdateStatusComponent.prototype.SaveClick = function () {
        var _this = this;
        this.name.markAsTouched();
        if (this.name.valid) {
            if (this.model.Id) {
                this.model.ModifiedBy = this.loginData.UserId;
                this._complainStatusMasterService.Edit(this.model).subscribe(function (data) {
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
                this.model.CreatedBy = this.loginData.UserId;
                this._complainStatusMasterService.Add(this.model).subscribe(function (data) {
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
    AddUpdateStatusComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AddUpdateStatusComponent.prototype.Numberonly = function (event) {
        return this._commonService.numberOnly(event);
    };
    AddUpdateStatusComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: src_app_Shared_Service_complain_status_master_service__WEBPACK_IMPORTED_MODULE_8__["ComplainStatusMasterService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AddUpdateStatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-add-update-status',
            template: __webpack_require__(/*! raw-loader!./add-update-status.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.html"),
            styles: [__webpack_require__(/*! ./add-update-status.component.css */ "./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            src_app_Shared_Service_complain_status_master_service__WEBPACK_IMPORTED_MODULE_8__["ComplainStatusMasterService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], Object])
    ], AddUpdateStatusComponent);
    return AddUpdateStatusComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/Masters/status/status.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/status/status.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL01hc3RlcnMvc3RhdHVzL3N0YXR1cy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/complaint-software/Masters/status/status.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/content/complaint-software/Masters/status/status.component.ts ***!
  \*******************************************************************************/
/*! exports provided: StatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusComponent", function() { return StatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_Master_complain_status_master_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/Master/complain-status-master-model */ "./src/app/Shared/Model/Master/complain-status-master-model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_complain_status_master_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/complain-status-master.service */ "./src/app/Shared/Service/complain-status-master.service.ts");
/* harmony import */ var _add_update_status_add_update_status_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./add-update-status/add-update-status.component */ "./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");















var StatusComponent = /** @class */ (function () {
    //#endregion
    function StatusComponent(_alertService, _parentApi, _dialog, _commonService, _router, _authService, _complainStatusMasterService) {
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this._commonService = _commonService;
        this._router = _router;
        this._authService = _authService;
        this._complainStatusMasterService = _complainStatusMasterService;
        this.displayedColumns = ['index', 'Name', 'NameHindi', 'IsAdmAction', 'IsDevAction', 'IsUserAction', 'IsAdmFilter', 'IsDevFilter', 'IsUserFilter', 'SMSContent', 'NoOfDaysForAutoClose', 'IsActive', 'Action'];
        this.ViewdisplayedColumns = [{ Value: 'Name', Text: 'Status Name' }, { Value: 'NameHindi', Text: 'Status Name In Hindi' }, { Value: 'SMSContent', Text: 'SMS Content' }, { Value: 'NoOfDaysForAutoClose', Text: 'No Of Days For Auto Close' }];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/compliant/master/status", "/compliant/master/status/add", "", "/compliant/master/status/edit", "");
        this._parentApi.setpagelayout("", "", "", "", true);
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__["IndexModel"]();
    }
    //#endregion
    StatusComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetList();
    };
    StatusComponent.prototype.GetList = function () {
        var _this = this;
        this._complainStatusMasterService.GetList(this.indexModel).subscribe(function (data) {
            if ((data.IsSuccess)) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                console.log(_this.listModel);
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
    StatusComponent.prototype.OpenDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_add_update_status_add_update_status_component__WEBPACK_IMPORTED_MODULE_11__["AddUpdateStatusComponent"], {
            width: "50%",
            data: Id,
            disableClose: true
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    StatusComponent.prototype.OnStatusClick = function (id) {
        var _this = this;
        this._commonService.GenerateOTP().subscribe(function (data) {
            if (data.IsSuccess) {
                var _dialogRef = _this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_12__["ConfirmationDialogComponent"], {
                    width: "50%",
                    data: src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_13__["GlobalMessagesModel"].ConfirmStatusChanged
                });
                _dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        _this._complainStatusMasterService.ChangeActiveStatus(id).subscribe(function (data) {
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
    StatusComponent.prototype.OnActionStatusClick = function (id, userType, actionType) {
        var _this = this;
        this._commonService.GenerateOTP().subscribe(function (data) {
            if (data.IsSuccess) {
                var _dialogRef = _this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_12__["ConfirmationDialogComponent"], {
                    width: "50%",
                    data: src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_13__["GlobalMessagesModel"].ConfirmStatusChanged
                });
                _dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        var changeStatus = new src_app_Shared_Model_Master_complain_status_master_model__WEBPACK_IMPORTED_MODULE_7__["ChangeStatus"]();
                        changeStatus.Id = id;
                        changeStatus.UserType = userType;
                        changeStatus.ActionType = actionType;
                        changeStatus.UserId = _this.loginData.UserId;
                        _this._complainStatusMasterService.ChangeStatus(changeStatus).subscribe(function (data) {
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
    StatusComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    StatusComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    StatusComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_8__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_14__["AuthenticationService"] },
        { type: src_app_Shared_Service_complain_status_master_service__WEBPACK_IMPORTED_MODULE_10__["ComplainStatusMasterService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], StatusComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], StatusComponent.prototype, "sort", void 0);
    StatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-status',
            template: __webpack_require__(/*! raw-loader!./status.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/Masters/status/status.component.html"),
            styles: [__webpack_require__(/*! ./status.component.css */ "./src/app/content/complaint-software/Masters/status/status.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_8__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_14__["AuthenticationService"],
            src_app_Shared_Service_complain_status_master_service__WEBPACK_IMPORTED_MODULE_10__["ComplainStatusMasterService"]])
    ], StatusComponent);
    return StatusComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.css":
/*!****************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL2FkZC11cGRhdGUtY29tcGxhaW50L2FkZC11cGRhdGUtY29tcGxhaW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: AddUpdateComplaintComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateComplaintComponent", function() { return AddUpdateComplaintComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/commonddl.model */ "./src/app/Shared/Model/commonddl.model.ts");
/* harmony import */ var src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/complaint.model */ "./src/app/Shared/Model/complaint.model.ts");
/* harmony import */ var src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Service/complaint.service */ "./src/app/Shared/Service/complaint.service.ts");














var AddUpdateComplaintComponent = /** @class */ (function () {
    function AddUpdateComplaintComponent(fb, _parentApi, _alertService, _commonService, _router, formBuilder, _authService, _userService, _dialog, _route, _complaintService) {
        this.fb = fb;
        this._parentApi = _parentApi;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._router = _router;
        this.formBuilder = formBuilder;
        this._authService = _authService;
        this._userService = _userService;
        this._dialog = _dialog;
        this._route = _route;
        this._complaintService = _complaintService;
        this.ddlPageMasterDetails = [];
        this.documentUrlList = [];
        //ApplicationCode = new FormControl('', [Validators.required]);
        //PageCode = new FormControl('', [Validators.required]);
        //ScreenURL = new FormControl('', [Validators.required]);
        //#endregion
        this.editorConfig = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].editorConfig;
        this._parentApi.setpagelayout('Add Suggestion-Feedback  :', 'keyboard_backspace', "Back To List", "compliant");
        this.model = new src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_12__["ComplaintListModel"]();
    }
    //#region Method
    AddUpdateComplaintComponent.prototype.ngOnInit = function () {
        this.formGroupInit();
        this.GetDDLList();
    };
    AddUpdateComplaintComponent.prototype.formGroupInit = function () {
        var reg = '(?:http(s)?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.frmGrp = this.fb.group({
            Description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            EntryTypeId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            PriorityId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            ApplicationCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            PageCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            ScreenURL: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(reg)]]
        });
    };
    AddUpdateComplaintComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].GenerateComplaintDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateComplaintComponent.prototype.getPageByPageType = function (applicationCode) {
        var _this = this;
        if (applicationCode === void 0) { applicationCode = ''; }
        this._commonService.GetPageMasterByPageTypeCode(0, applicationCode).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlPageMasterDetails = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    // Save complaint method
    AddUpdateComplaintComponent.prototype.Saveclick = function () {
        var _this = this;
        this.frmGrp.markAllAsTouched();
        if (this.frmGrp.valid) {
            this._complaintService.Add(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                    _this._router.navigate(['compliant']);
                }
                else {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, 
            // tslint:disable-next-line: no-shadowed-variable
            function (error) {
                _this._commonService.ScrollingTop();
                console.log(error);
                _this._alertService.error(error.error.ExceptionMessage);
            });
        }
    };
    AddUpdateComplaintComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        var count = 0;
        if (this.documentUrlList.length > 0) {
            count = this.documentUrlList.length;
        }
        var _loop_1 = function (index) {
            if (files.item(index).type.match('application/pdf|image/jpeg|image/png')) {
                if (files.item(index).size < this_1._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        _this.documentUrlList.push(new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_11__["DocumentUrlModel"]());
                        _this.documentUrlList[index + count].Url = reader_1.result;
                        //  this.documentUrlList[index + count].Extension = (files[index].name.split('.'))[1];
                        _this.documentUrlList[index + count].Extension = (files[index].type.split('/'))[1];
                        // if (this.documentUrlList[index + count].Extension === 'pdf') {
                        //if (this.documentUrlList[index + count].Extension.toLowerCase() === 'pdf') {
                        if (_this.documentUrlList[index + count].Extension.includes('pdf')) {
                            _this.documentUrlList[index + count].DisplayName = files[index].name;
                        }
                        //console.log(this.documentUrlList)
                        _this.model.AttachmentList.push(new src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_12__["ComplaintAttachmentModel"]());
                        // this.model.AttachmentList[index].AttachmentsUrl = files[index].name;
                        _this.model.AttachmentList[index + count].AttachmentsUrl = reader_1.result;
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.documentUrlList = [];
                    this_1.model.AttachmentList = [];
                    return { value: void 0 };
                }
            }
            else {
                this_1.fileValidationMsg = 'only *pdf';
                this_1.documentUrlList = [];
                this_1.model.AttachmentList = [];
                return { value: void 0 };
            }
        };
        var this_1 = this;
        // this.documentUrlList = [];
        // this.model.AttachmentList = [];
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.fileValidationMsg = '';
        // this.model.File = files;
    };
    AddUpdateComplaintComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    AddUpdateComplaintComponent.prototype.RemoveImageFile = function (i) {
        this.documentUrlList.splice(i, 1);
        // this.Imeges.slice(i, 1);
    };
    AddUpdateComplaintComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialog"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_13__["ComplaintService"] }
    ]; };
    AddUpdateComplaintComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-add-update-complaint",
            template: __webpack_require__(/*! raw-loader!./add-update-complaint.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.html"),
            styles: [__webpack_require__(/*! ./add-update-complaint.component.css */ "./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_13__["ComplaintService"]])
    ], AddUpdateComplaintComponent);
    return AddUpdateComplaintComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.css":
/*!**************************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL2NvbXBsYWludC1zb2Z0d2FyZS1kZXRhaWwvY29tcGxhaW50LXNvZnR3YXJlLWRldGFpbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: ComplaintSoftwareDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintSoftwareDetailComponent", function() { return ComplaintSoftwareDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Enum_user_type_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Enum/user-type.enum */ "./src/app/Shared/Enum/user-type.enum.ts");
/* harmony import */ var src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/complaint.model */ "./src/app/Shared/Model/complaint.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/complaint.service */ "./src/app/Shared/Service/complaint.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../compliant-action-dialog/compliant-action-dialog.component */ "./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");














var ComplaintSoftwareDetailComponent = /** @class */ (function () {
    //#endregion
    //#region <<Constructor>>
    function ComplaintSoftwareDetailComponent(_parentApi, appComponent, _commonService, _alertService, _route, _dialog, _authService, _complaintService) {
        this._parentApi = _parentApi;
        this.appComponent = appComponent;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._route = _route;
        this._dialog = _dialog;
        this._authService = _authService;
        this._complaintService = _complaintService;
        this.RecordId = 0;
        this.IsHideDeptInternal_VendorCommBtn = false;
        this.userTypeEnum = src_app_Shared_Enum_user_type_enum__WEBPACK_IMPORTED_MODULE_4__["UserTypeEnum"];
        this.Permission = this._commonService.GetPagePermission("/compliant", "compliant/create", "compliant/detail", "compliant/update", "compliant/delete");
        this.model = new src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_5__["ComplaintEntryListModel"]();
        if (!Object(util__WEBPACK_IMPORTED_MODULE_11__["isNullOrUndefined"])(this._route.snapshot.params.id)) {
            this.RecordId = this._route.snapshot.params.id;
        }
        this._parentApi.setpagelayout("Suggestion-Feedback :", "keyboard_backspace", "Back To List", "compliant");
    }
    //#endregion
    ComplaintSoftwareDetailComponent.prototype.ngOnInit = function () {
        if (this.RecordId != 0) {
            this.getDetail();
        }
    };
    ComplaintSoftwareDetailComponent.prototype.getDetail = function () {
        var _this = this;
        this._complaintService.Detail(this.RecordId).subscribe(function (data) {
            console.log(data);
            if (data.IsSuccess) {
                _this.model = data.Data;
                // if (this.model.Status == StatusEnum.SENT && this.loginBaseUserType != UserTypeEnum.VNDR && this.loginBaseUserType != UserTypeEnum.VNDRUSER) {
                //   this.model.Status = StatusEnum.RECEIVED;
                // }
                // if (this.model.Status == StatusEnum.RECEIVED || this.model.Status == StatusEnum.RETURN || this.model.Status == StatusEnum.ACCEPT || this.model.Status == StatusEnum.CLOSE || this.model.Status == StatusEnum.DISPOSED || this.model.Status == StatusEnum.REJECT) {
                //   this.IsHideDeptInternal_VendorCommBtn = true;
                // }
                // else{
                //   this.IsHideDeptInternal_VendorCommBtn = false;
                // }
                //  this.appComponent.setPageLayout("Suggestion-Feedback Detail :", "keyboard_backspace", "Back To List", "complaint-software");
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ComplaintSoftwareDetailComponent.prototype.OpenChangeOfficeDialog = function (Id) {
        // const _dialogRef = this._dialog.open(ChangeCommunicationOfficeDialogComponent, {
        //   width: "500px",
        //   data: { Id },
        //   disableClose: true
        // });
        // _dialogRef.afterClosed().subscribe((result: boolean) => {
        //   if (result) {
        //     this.getDetail();
        //   }
        // });
    };
    ComplaintSoftwareDetailComponent.prototype.getAbsalutePath = function (url) {
        return src_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].ApiBaseUrl + url.replace("~/", "").trim();
    };
    ComplaintSoftwareDetailComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    ComplaintSoftwareDetailComponent.prototype.OpenDialog = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(_compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_12__["CompliantActionDialogComponent"], {
            width: '500px',
            data: id
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.getDetail();
            }
        });
    };
    ComplaintSoftwareDetailComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialog"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"] },
        { type: src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__["ComplaintService"] }
    ]; };
    ComplaintSoftwareDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-complaint-software-detail',
            template: __webpack_require__(/*! raw-loader!./complaint-software-detail.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.html"),
            styles: [__webpack_require__(/*! ./complaint-software-detail.component.css */ "./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialog"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"],
            src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__["ComplaintService"]])
    ], ComplaintSoftwareDetailComponent);
    return ComplaintSoftwareDetailComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/complaint-software-routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/content/complaint-software/complaint-software-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: ComplaintSoftwareRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintSoftwareRoutingModule", function() { return ComplaintSoftwareRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _complaint_software_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./complaint-software.component */ "./src/app/content/complaint-software/complaint-software.component.ts");
/* harmony import */ var _add_update_complaint_add_update_complaint_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-update-complaint/add-update-complaint.component */ "./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.ts");
/* harmony import */ var _complaint_software_detail_complaint_software_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./complaint-software-detail/complaint-software-detail.component */ "./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.ts");
/* harmony import */ var _Masters_entry_type_entry_type_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Masters/entry-type/entry-type.component */ "./src/app/content/complaint-software/Masters/entry-type/entry-type.component.ts");
/* harmony import */ var _Masters_status_status_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Masters/status/status.component */ "./src/app/content/complaint-software/Masters/status/status.component.ts");








var routes = [
    {
        path: '',
        component: _complaint_software_component__WEBPACK_IMPORTED_MODULE_3__["ComplaintSoftwareComponent"],
    },
    {
        path: 'compliantList',
        component: _complaint_software_component__WEBPACK_IMPORTED_MODULE_3__["ComplaintSoftwareComponent"]
    },
    {
        path: 'compliantListAddUpdate',
        component: _add_update_complaint_add_update_complaint_component__WEBPACK_IMPORTED_MODULE_4__["AddUpdateComplaintComponent"]
    },
    {
        path: 'compliantListAddUpdate/:id',
        component: _add_update_complaint_add_update_complaint_component__WEBPACK_IMPORTED_MODULE_4__["AddUpdateComplaintComponent"]
    },
    {
        path: "detail/:id",
        component: _complaint_software_detail_complaint_software_detail_component__WEBPACK_IMPORTED_MODULE_5__["ComplaintSoftwareDetailComponent"]
    },
    {
        path: 'master/entrytype',
        component: _Masters_entry_type_entry_type_component__WEBPACK_IMPORTED_MODULE_6__["EntryTypeComponent"]
    },
    {
        path: 'master/status',
        component: _Masters_status_status_component__WEBPACK_IMPORTED_MODULE_7__["StatusComponent"]
    },
];
var ComplaintSoftwareRoutingModule = /** @class */ (function () {
    function ComplaintSoftwareRoutingModule() {
    }
    ComplaintSoftwareRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ComplaintSoftwareRoutingModule);
    return ComplaintSoftwareRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/complaint-software.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/content/complaint-software/complaint-software.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL2NvbXBsYWludC1zb2Z0d2FyZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/complaint-software/complaint-software.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/content/complaint-software/complaint-software.component.ts ***!
  \****************************************************************************/
/*! exports provided: ComplaintSoftwareComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintSoftwareComponent", function() { return ComplaintSoftwareComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/complaint.service */ "./src/app/Shared/Service/complaint.service.ts");
/* harmony import */ var src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/complaint.model */ "./src/app/Shared/Model/complaint.model.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Enum_compliant_enum__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Enum/compliant.enum */ "./src/app/Shared/Enum/compliant.enum.ts");
/* harmony import */ var _compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./compliant-action-dialog/compliant-action-dialog.component */ "./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");

















var ComplaintSoftwareComponent = /** @class */ (function () {
    function ComplaintSoftwareComponent(_parentApi, _alertService, _commonService, _dialog, _authService, _userService, _route, _complaintService) {
        this._parentApi = _parentApi;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this._authService = _authService;
        this._userService = _userService;
        this._route = _route;
        this._complaintService = _complaintService;
        this.compliantEnum = src_app_Shared_Enum_compliant_enum__WEBPACK_IMPORTED_MODULE_13__["CompliantEnum"];
        this.displayedColumns = [
            "index",
            "Description",
            "ScreenURL",
            "StatusName",
            "EntryTypeName",
            "ApplicationTitle",
            "PermissionTitle",
            "UserDetail",
            "PriorityId",
            "Attachments",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            //{ Value: "StatusName", Text: "Status" },
            { Value: "EntryTypeName", Text: "Entry Type" },
            { Value: "ApplicationTitle", Text: "Application" },
            { Value: "PermissionTitle", Text: "Page" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.statusId = [];
        this.Permission = this._commonService.GetPagePermission("/compliant", "compliant/create", "compliant/detail", "compliant/update", "compliant/delete");
        //#endregion
        // searchModel = new CompliantSearchModel();
        this.searchModel = this._commonService.modelSetGet(new src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_10__["CompliantSearchModel"]());
        this.isShow = true;
        this.selectedAllStatus = false;
        this._parentApi.setpagelayout('Suggestion-Feedback :', "add", "Add", "/compliant/compliantListAddUpdate");
        // this.searchModel = new CompliantSearchModel();
    }
    ComplaintSoftwareComponent.prototype.ngOnInit = function () {
        if (this.searchModel.StatusId == null) {
            this.statusId = ['2'];
        }
        this.GetList();
        this.GetDDLList();
    };
    ComplaintSoftwareComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].ComplaintFilterDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ComplaintSoftwareComponent.prototype.GetList = function () {
        var _this = this;
        if (this.statusId.length > 0) {
            //this.searchModel.indexModel.AdvanceSearchModel = { StatusIds: JSON.stringify(this.statusId) };
            this.searchModel.StatusId = this.statusId.toString();
        }
        this.statusId = this.searchModel.StatusId ? this.searchModel.StatusId.toString().split(",") : this.statusId;
        this._complaintService.GetList(this._commonService.modelSetGet(this.searchModel, true)).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](_this.listModel);
                _this.totalRecords = data.Data.TotalRecords;
                if (!_this.searchModel.indexModel.IsPostBack) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    ComplaintSoftwareComponent.prototype.getAbsalutePath = function (url) {
        return src_environments_environment__WEBPACK_IMPORTED_MODULE_15__["environment"].ApiBaseUrl + url.replace("~/", "").trim();
    };
    ComplaintSoftwareComponent.prototype.sortData = function (event) {
        this.searchModel.indexModel.OrderBy = event.active;
        this.searchModel.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].orderByDsc;
        this.searchModel.indexModel.IsPostBack = true;
        this.GetList();
    };
    ComplaintSoftwareComponent.prototype.onPaginateChange = function (event) {
        this.searchModel.indexModel.Page = event.pageIndex + 1;
        this.searchModel.indexModel.PageSize = event.pageSize;
        this.searchModel.indexModel.IsPostBack = true;
        this.GetList();
        this.searchModel = this._commonService.modelSetGet(this.searchModel, true);
    };
    ComplaintSoftwareComponent.prototype.OpenDialog = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(_compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_14__["CompliantActionDialogComponent"], {
            width: '500px',
            data: id
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    ComplaintSoftwareComponent.prototype.toggleDisplay = function () {
        this.isShow = !this.isShow;
    };
    ComplaintSoftwareComponent.prototype.Reset = function () {
        this.statusId = [];
        this.searchModel = new src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_10__["CompliantSearchModel"]();
        this.GetDDLList();
        this.GetList();
        this.searchModel = this._commonService.modelSetGet(this.searchModel, true);
    };
    ComplaintSoftwareComponent.prototype.selectAllStatus = function () {
        if (this.selectedAllStatus) {
            this.statusId = [];
            this.statusId = this.dDLList.ddlCompliantFilter.map(function (a) {
                return String(a.Value);
            });
        }
        else {
            this.statusId = [];
        }
        this.selectedAllStatus = !this.selectedAllStatus;
    };
    ComplaintSoftwareComponent.prototype.Search = function () {
        this.searchModel.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_16__["IndexModel"]();
        this.GetList();
        this.searchModel = this._commonService.modelSetGet(this.searchModel, true);
    };
    ComplaintSoftwareComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__["ComplaintService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"])
    ], ComplaintSoftwareComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
    ], ComplaintSoftwareComponent.prototype, "sort", void 0);
    ComplaintSoftwareComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-complaint-software',
            template: __webpack_require__(/*! raw-loader!./complaint-software.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/complaint-software.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_5__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_11__["APP_DATE_FORMATS"] },
            ],
            styles: [__webpack_require__(/*! ./complaint-software.component.css */ "./src/app/content/complaint-software/complaint-software.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__["ComplaintService"]])
    ], ComplaintSoftwareComponent);
    return ComplaintSoftwareComponent;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/complaint-software.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/content/complaint-software/complaint-software.module.ts ***!
  \*************************************************************************/
/*! exports provided: ComplaintSoftwareModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplaintSoftwareModule", function() { return ComplaintSoftwareModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _complaint_software_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./complaint-software-routing.module */ "./src/app/content/complaint-software/complaint-software-routing.module.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/lib/ng2-ckeditor.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _complaint_software_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./complaint-software.component */ "./src/app/content/complaint-software/complaint-software.component.ts");
/* harmony import */ var _add_update_complaint_add_update_complaint_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-update-complaint/add-update-complaint.component */ "./src/app/content/complaint-software/add-update-complaint/add-update-complaint.component.ts");
/* harmony import */ var _compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./compliant-action-dialog/compliant-action-dialog.component */ "./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.ts");
/* harmony import */ var _complaint_software_detail_complaint_software_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./complaint-software-detail/complaint-software-detail.component */ "./src/app/content/complaint-software/complaint-software-detail/complaint-software-detail.component.ts");
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @kolkov/angular-editor */ "./node_modules/@kolkov/angular-editor/fesm5/kolkov-angular-editor.js");
/* harmony import */ var _Masters_entry_type_entry_type_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Masters/entry-type/entry-type.component */ "./src/app/content/complaint-software/Masters/entry-type/entry-type.component.ts");
/* harmony import */ var _Masters_status_status_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Masters/status/status.component */ "./src/app/content/complaint-software/Masters/status/status.component.ts");
/* harmony import */ var _Masters_entry_type_add_update_entry_type_add_update_entry_type_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Masters/entry-type/add-update-entry-type/add-update-entry-type.component */ "./src/app/content/complaint-software/Masters/entry-type/add-update-entry-type/add-update-entry-type.component.ts");
/* harmony import */ var _Masters_status_add_update_status_add_update_status_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Masters/status/add-update-status/add-update-status.component */ "./src/app/content/complaint-software/Masters/status/add-update-status/add-update-status.component.ts");















var ComplaintSoftwareModule = /** @class */ (function () {
    function ComplaintSoftwareModule() {
    }
    ComplaintSoftwareModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_complaint_software_component__WEBPACK_IMPORTED_MODULE_6__["ComplaintSoftwareComponent"], _add_update_complaint_add_update_complaint_component__WEBPACK_IMPORTED_MODULE_7__["AddUpdateComplaintComponent"], _compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_8__["CompliantActionDialogComponent"], _complaint_software_detail_complaint_software_detail_component__WEBPACK_IMPORTED_MODULE_9__["ComplaintSoftwareDetailComponent"], _Masters_entry_type_entry_type_component__WEBPACK_IMPORTED_MODULE_11__["EntryTypeComponent"], _Masters_status_status_component__WEBPACK_IMPORTED_MODULE_12__["StatusComponent"], _Masters_entry_type_add_update_entry_type_add_update_entry_type_component__WEBPACK_IMPORTED_MODULE_13__["AddUpdateEntryTypeComponent"], _Masters_status_add_update_status_add_update_status_component__WEBPACK_IMPORTED_MODULE_14__["AddUpdateStatusComponent"]],
            entryComponents: [
                _compliant_action_dialog_compliant_action_dialog_component__WEBPACK_IMPORTED_MODULE_8__["CompliantActionDialogComponent"], _Masters_entry_type_add_update_entry_type_add_update_entry_type_component__WEBPACK_IMPORTED_MODULE_13__["AddUpdateEntryTypeComponent"], _Masters_status_add_update_status_add_update_status_component__WEBPACK_IMPORTED_MODULE_14__["AddUpdateStatusComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _complaint_software_routing_module__WEBPACK_IMPORTED_MODULE_3__["ComplaintSoftwareRoutingModule"],
                src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_4__["AppMaterialModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__["CKEditorModule"],
                _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_10__["AngularEditorModule"]
            ]
        })
    ], ComplaintSoftwareModule);
    return ComplaintSoftwareModule;
}());



/***/ }),

/***/ "./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY29tcGxhaW50LXNvZnR3YXJlL2NvbXBsaWFudC1hY3Rpb24tZGlhbG9nL2NvbXBsaWFudC1hY3Rpb24tZGlhbG9nLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: CompliantActionDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompliantActionDialogComponent", function() { return CompliantActionDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/complaint.model */ "./src/app/Shared/Model/complaint.model.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/complaint.service */ "./src/app/Shared/Service/complaint.service.ts");










var CompliantActionDialogComponent = /** @class */ (function () {
    //#endregion
    function CompliantActionDialogComponent(fb, _dialogRef, _alertService, _commonService, _router, data, _complaintService) {
        this.fb = fb;
        this._dialogRef = _dialogRef;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._router = _router;
        this.data = data;
        this._complaintService = _complaintService;
        this.documentUrlList = [];
        this.editorConfig = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].editorConfig;
        this.model = new src_app_Shared_Model_complaint_model__WEBPACK_IMPORTED_MODULE_2__["ComplaintActionModel"]();
        if (data) {
            this.model.ComplaintEntryId = data;
        }
    }
    CompliantActionDialogComponent.prototype.ngOnInit = function () {
        this.formGroupInit();
        this.GetDDLList();
    };
    //#region  method
    CompliantActionDialogComponent.prototype.formGroupInit = function () {
        this.frmGrp = this.fb.group({
            Status: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            Comment: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            Attachment: [null, null],
        });
    };
    CompliantActionDialogComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].GenerateComplaintDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CompliantActionDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    CompliantActionDialogComponent.prototype.Saveclick = function () {
        //  this.Status.markAsTouched();
        //  this.Comment.markAsTouched();
        //  this.Attachment.markAsTouched();
        //   if (this.Status.valid && this.Comment.valid && this.Attachment.valid) {
        var _this = this;
        this.frmGrp.markAllAsTouched();
        if (this.frmGrp.valid) {
            this._complaintService.AddAction(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                    _this._dialogRef.close(true);
                }
                else {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, 
            // tslint:disable-next-line: no-shadowed-variable
            function (error) {
                _this._commonService.ScrollingTop();
                console.log(error);
                _this._alertService.error(error.error.ExceptionMessage);
            });
        }
    };
    // handleFileInput(files: FileList) {
    //   let count = 0;
    //   if (this.documentUrlList.length > 0) {
    //     count = this.documentUrlList.length;
    //   }
    //   // this.documentUrlList = [];
    //   // this.model.AttachmentList = [];
    //   for (let index = 0; index < files.length; index++) {
    //     if (files.item(index).type.match('application/pdf|image/jpeg')) {
    //       if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
    //         const reader = new FileReader();
    //         reader.onload = (e: any) => {
    //           this.documentUrlList.push(new DocumentUrlModel());
    //           this.documentUrlList[index + count].Url = <string>reader.result;
    //           this.documentUrlList[index + count].Extension = (files[index].name.split('.'))[1];
    //           if (this.documentUrlList[index + count].Extension === 'pdf') {
    //             this.documentUrlList[index + count].DisplayName = files[index].name;
    //           }
    //           this.model.AttachmentsUrl.push(new ComplaintAttachmentModel());
    //           // this.model.AttachmentList[index].AttachmentsUrl = files[index].name;
    //           this.model.AttachmentList[index + count].AttachmentsUrl = <string>reader.result;
    //         };
    //         reader.readAsDataURL(files[index]);
    //       } else {
    //         this.documentUrlList = [];
    //         this.model.AttachmentList = [];
    //         // this.fileValidationMsg = this.fileSizeValidationMsg;
    //         return;
    //       }
    //     } else {
    //       this.fileValidationMsg = 'only *pdf';
    //       this.documentUrlList = [];
    //       this.model.AttachmentList = [];
    //       return;
    //     }
    //   }
    //   this.fileValidationMsg = '';
    //   // this.model.File = files;
    // }
    CompliantActionDialogComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        if (files.item(0).type.match('application/pdf|image/jpeg|image/png')) {
            if (files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.model.AttachmentURL = event.target.result;
                    _this.model.Extension = (files.item(0).name.split('.'))[1];
                };
                reader.readAsDataURL(files.item(0));
            }
        }
        else {
            this.fileValidationMsg = "only pdf/Image file accepted  ";
        }
    };
    CompliantActionDialogComponent.prototype.download = function (URL) {
        var linkSource = URL;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        // downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    CompliantActionDialogComponent.prototype.RemoveImageFile = function () {
        this.model.AttachmentURL = null;
        this.model.Extension = null;
        // this.Imeges.slice(i, 1);
    };
    CompliantActionDialogComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__["ComplaintService"] }
    ]; };
    CompliantActionDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-compliant-action-dialog',
            template: __webpack_require__(/*! raw-loader!./compliant-action-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.html"),
            styles: [__webpack_require__(/*! ./compliant-action-dialog.component.css */ "./src/app/content/complaint-software/compliant-action-dialog/compliant-action-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"], Object, src_app_Shared_Service_complaint_service__WEBPACK_IMPORTED_MODULE_9__["ComplaintService"]])
    ], CompliantActionDialogComponent);
    return CompliantActionDialogComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-complaint-software-complaint-software-module.js.map