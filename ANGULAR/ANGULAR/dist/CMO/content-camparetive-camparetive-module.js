(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-camparetive-camparetive-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.html":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.html ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n      <mat-select [formControl]=\"department\" name=\"department\" id=\"department\" [(ngModel)]=\"model.DepartmentCode\" (selectionChange)=\"getKPIList($event.value); \">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentForDepartmentalProgressList\">{{ k.Text }}\r\n            </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"department.invalid && department.touched\">\r\n      Department is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <!-- <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>KPI Category<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"kpi\" name=\"kpi\" id=\"kpi\" [(ngModel)]=\"model.KPICategoryCode\" (selectionChange)=\"GetAllParameterList($event.value,model.DepartmentCode);\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlKPICategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"kpi.invalid && kpi.touched\">\r\n      KPI Category is <strong>required</strong>\r\n    </mat-error>\r\n  </div> -->\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Financial Year<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"year\" name=\"year\" id=\"year\" [(ngModel)]=\"model.YearCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlYearMaster\">{{ k.Text }}\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"year.invalid && year.touched\">\r\n      Financial Year is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <!-- Parameter Section start -->\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n    <table class=\"table new_table table_border table_custom mb-20 table-camparativtargetentry\" *ngIf=\"listModel?.length > 0\">\r\n      <thead>\r\n        <tr>\r\n          <th scope=\"col\">KPI Category Name</th>\r\n          <th scope=\"col\">Physical Parameter</th>\r\n          <th scope=\"col\">Physical Value</th>\r\n          <th scope=\"col\">Unit</th>\r\n          <th scope=\"col\">Financial Parameter</th>\r\n          <th scope=\"col\">Financial Value</th>\r\n          <th scope=\"col\">Unit</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of listModel; let i = index\" [attr.data-index]=\"i\">\r\n          <td>{{item.IsPhysical?item.KPICategoryName:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalParameter:''}}</td>\r\n          <td> <input matInput placeholder=\"Physical Value\" name=\"{{i}}_PhysicalValue\" [(ngModel)]=\"item.PhysicalValue\" *ngIf=\"item.IsPhysical\">\r\n          </td>\r\n          <td>{{item.IsPhysical?item.physicalUnitName:''}} </td>\r\n          <td>{{item.IsFinancial?item.FinancialParameter:''}}</td>\r\n          <td><input matInput placeholder=\"Financial Value\" name=\"{{i}}_FinancialValue\"\r\n              [(ngModel)]=\"item.FinancialValue\" *ngIf=\"item.IsFinancial\"></td>\r\n          <td>{{item.IsFinancial? item.FinancialUnitName:''}}</td>\r\n\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!-- Parameter Section End -->\r\n\r\n  <div class=\"col l12 x8 m4 s6 clearfix\" *ngIf=\"!btnHide\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n    \r\n    <ng-container matColumnDef=\"ModifiedDate\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date </th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n        {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/camparativtargetentry/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n   \r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.html":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.html ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n      <mat-select [formControl]=\"department\" name=\"department\" id=\"department\" [(ngModel)]=\"model.DepartmentCode\" (selectionChange)=\"getKPIList($event.value);\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentForDepartmentalProgressList\">{{ k.Text }}\r\n            </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"department.invalid && department.touched\">\r\n      Department is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Parameter Category :</mat-label>\r\n      <mat-select  name=\"ParameterCategoryCode\" id=\"ParameterCategoryCode\" [(ngModel)]=\"model.ParameterCategoryCode\" (selectionChange)=\"isDuplicateData()\" [disabled]=\"true\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlComparativeParameterCategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>KPI Category<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"kpi\" name=\"kpi\" id=\"kpi\" [(ngModel)]=\"model.KPICategoryCode\" (selectionChange)=\"GetAllParameterList($event.value,model.DepartmentCode);\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlKPICategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"kpi.invalid && kpi.touched\">\r\n      KPI Category is <strong>required</strong>\r\n    </mat-error>\r\n  </div> -->\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Financial Year<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"year\" name=\"year\" id=\"year\" [(ngModel)]=\"model.YearCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlYearMaster\">{{ k.Text }}\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"year.invalid && year.touched\">\r\n      Financial Year is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Month<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"Month\" name=\"Month\" id=\"Month\" [(ngModel)]=\"model.MonthCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlMonth\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Month.invalid && Month.touched\">\r\n      Month is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <!-- Parameter Section start -->\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n    <table class=\"table new_table table_border table_custom mb-20 table-camparativtargetentry\" *ngIf=\"listModel?.length > 0\">\r\n      <thead>\r\n        <tr>\r\n          <th scope=\"col\">KPI Category Name</th>\r\n          <th scope=\"col\">Physical Parameter</th>\r\n          <th scope=\"col\">Physical Value</th>\r\n          <th scope=\"col\">Physical Cumulative</th>\r\n          <th scope=\"col\">Physical Target</th>\r\n          <th scope=\"col\">Unit</th>\r\n          <th scope=\"col\">Financial Parameter</th>\r\n          <th scope=\"col\">Financial Value</th>\r\n          <th scope=\"col\">Financial Cumulative</th>\r\n          <th scope=\"col\">Financial Target</th>\r\n          <th scope=\"col\">Unit</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of listModel; let i = index\" [attr.data-index]=\"i\">\r\n          <td>{{item.IsPhysical?item.KPICategoryName:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalParameter:''}}</td>\r\n          <td> <input matInput placeholder=\"Physical Value\" name=\"{{i}}_PhysicalValue\" [(ngModel)]=\"item.PhysicalValue\" *ngIf=\"item.IsPhysical\">\r\n          </td>\r\n          <td>{{item.IsPhysical?item.PhysicalCumulativeValue:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalTargetValue:''}}</td>\r\n          <td>{{item.IsPhysical?item.physicalUnitName:''}} </td>\r\n          <td>{{item.IsFinancial?item.FinancialParameter:''}}</td>\r\n          <td><input matInput placeholder=\"Financial Value\" name=\"{{i}}_FinancialValue\"\r\n              [(ngModel)]=\"item.FinancialValue\" *ngIf=\"item.IsFinancial\"></td>\r\n              <td>{{item.IsFinancial?item.FinancialCumulativeValue:''}}</td>\r\n              <td>{{item.IsFinancial?item.FinancialTargetValue:''}}</td>\r\n          <td>{{item.IsFinancial? item.FinancialUnitName:''}}</td>\r\n\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!-- Parameter Section End -->\r\n\r\n  <div class=\"col l12 x8 m4 s6 clearfix\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/current-government-entry/current-government-entry.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/current-government-entry/current-government-entry.component.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n    \r\n    <ng-container matColumnDef=\"ModifiedDate\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date </th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n        {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/current-government-entry/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n   \r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.html":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.html ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n      <mat-select [formControl]=\"department\" name=\"department\" id=\"department\" [(ngModel)]=\"model.DepartmentCode\" (selectionChange)=\"getKPIList($event.value);\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentForDepartmentalProgressList\">{{ k.Text }}\r\n            </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"department.invalid && department.touched\">\r\n      Department is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Parameter Category :<span style=\"color: red\">*</span></mat-label>\r\n      <mat-select [formControl]=\"category\" name=\"category\" id=\"category\" [(ngModel)]=\"model.ParameterCategoryCode\" (selectionChange)=\"isDuplicateData()\" >\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlComparativeParameterCategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Financial Year<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"year\" name=\"year\" id=\"year\" [(ngModel)]=\"model.YearCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlYearMaster\">{{ k.Text }}\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"year.invalid && year.touched\">\r\n      Financial Year is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Month<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"Month\" name=\"Month\" id=\"Month\" [(ngModel)]=\"model.MonthCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlMonth\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Month.invalid && Month.touched\">\r\n      Month is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <!-- Parameter Section start -->\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n    <table class=\"table new_table table_border table_custom mb-20 table-camparativtargetentry\" *ngIf=\"listModel?.length > 0\">\r\n      <thead>\r\n        <tr>\r\n          <th scope=\"col\">KPI Category Name</th>\r\n          <th scope=\"col\">Physical Parameter</th>\r\n          <th scope=\"col\">Physical Value</th>\r\n          <th scope=\"col\">Physical Cumulative</th>\r\n          <th scope=\"col\">Physical Target</th>\r\n          <th scope=\"col\">Unit</th>\r\n          <th scope=\"col\">Financial Parameter</th>\r\n          <th scope=\"col\">Financial Value</th>\r\n          <th scope=\"col\">Financial Cumulative</th>\r\n          <th scope=\"col\">Financial Target</th>\r\n          <th scope=\"col\">Unit</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of listModel; let i = index\" [attr.data-index]=\"i\">\r\n          <td>{{item.IsPhysical?item.KPICategoryName:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalParameter:''}}</td>\r\n          <td> <input matInput placeholder=\"Physical Value\" name=\"{{i}}_PhysicalValue\" [(ngModel)]=\"item.PhysicalValue\" *ngIf=\"item.IsPhysical\">\r\n          </td>\r\n          <td>{{item.IsPhysical?item.PhysicalCumulativeValue:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalTargetValue:''}}</td>\r\n          <td>{{item.IsPhysical?item.physicalUnitName:''}} </td>\r\n          <td>{{item.IsFinancial?item.FinancialParameter:''}}</td>\r\n          <td><input matInput placeholder=\"Financial Value\" name=\"{{i}}_FinancialValue\"\r\n              [(ngModel)]=\"item.FinancialValue\" *ngIf=\"item.IsFinancial\"></td>\r\n              <td>{{item.IsFinancial?item.FinancialCumulativeValue:''}}</td>\r\n              <td>{{item.IsFinancial?item.FinancialTargetValue:''}}</td>\r\n          <td>{{item.IsFinancial? item.FinancialUnitName:''}}</td>\r\n\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!-- Parameter Section End -->\r\n\r\n  <div class=\"col l12 x8 m4 s6 clearfix\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/departmental-progress/departmental-progress.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/departmental-progress/departmental-progress.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"ModifiedDate\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date </th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n        {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/departmental-progress/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.html":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.html ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n      <mat-select [formControl]=\"department\" name=\"department\" id=\"department\" [(ngModel)]=\"model.DepartmentCode\" (selectionChange)=\"getKPIList($event.value);\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentForDistrictKPIList\">{{ k.Text }}\r\n            </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"department.invalid && department.touched\">\r\n      Department is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Parameter Category :</mat-label>\r\n      <mat-select  name=\"ParameterCategoryCode\" id=\"ParameterCategoryCode\" [(ngModel)]=\"model.ParameterCategoryCode\" (selectionChange)=\"GetAllParameterList()\" >\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlComparativeParameterCategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n<!--\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>KPI Category<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"kpi\" name=\"kpi\" id=\"kpi\" [(ngModel)]=\"model.KPICategoryCode\" (selectionChange)=\"GetAllParameterList($event.value,model.DepartmentCode);\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlKPICategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"kpi.invalid && kpi.touched\">\r\n      KPI Category is <strong>required</strong>\r\n    </mat-error>\r\n  </div> -->\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Financial Year<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"year\" name=\"year\" id=\"year\" [(ngModel)]=\"model.YearCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlYearMaster\">{{ k.Text }}\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"year.invalid && year.touched\">\r\n      Financial Year is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Month<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"Month\" name=\"Month\" id=\"Month\" [(ngModel)]=\"model.MonthCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlMonth\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Month.invalid && Month.touched\">\r\n      Month is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <!-- Parameter Section start -->\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n    <table class=\"table new_table table_border table_custom mb-20 table-camparativtargetentry\" *ngIf=\"listModel?.length > 0\">\r\n      <thead>\r\n        <tr>\r\n          <th scope=\"col\">Department Name</th>\r\n          <th scope=\"col\">KPI Category Name</th>\r\n          <th scope=\"col\">Physical Parameter</th>\r\n          <th scope=\"col\">Physical Value</th>\r\n          <th scope=\"col\">Unit</th>\r\n          <th scope=\"col\">Pending Values</th>\r\n          <th scope=\"col\">Financial Parameter</th>\r\n          <th scope=\"col\">Financial Value</th>\r\n          <th scope=\"col\">Unit</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of listModel; let i = index\" [attr.data-index]=\"i\">\r\n          <td>{{item.DepartmentTitle}}</td>\r\n          <td>{{item.IsPhysical?item.KPICategoryName:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalParameter:''}}</td>\r\n          <td> <input matInput placeholder=\"Physical Value\" name=\"{{i}}_PhysicalValue\" [(ngModel)]=\"item.PhysicalValue\" *ngIf=\"item.IsPhysical\">\r\n          </td>\r\n          <td>{{item.IsPhysical?item.physicalUnitName:''}} </td>\r\n          <td><input matInput placeholder=\"Pending Value\" name=\"{{i}}_PendingValue\"\r\n            [(ngModel)]=\"item.PendingValues\" ></td>\r\n          <td>{{item.IsFinancial?item.FinancialParameter:''}}</td>\r\n          <td><input matInput placeholder=\"Financial Value\" name=\"{{i}}_FinancialValue\"\r\n              [(ngModel)]=\"item.FinancialValue\" *ngIf=\"item.IsFinancial\"></td>\r\n          <td>{{item.IsFinancial? item.FinancialUnitName:''}}</td>\r\n\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!-- Parameter Section End -->\r\n\r\n  <div class=\"col l12 x8 m4 s6 clearfix\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/district-progress/district-progress.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/district-progress/district-progress.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"ModifiedDate\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date </th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n        {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.DepartmentProgressPermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/district-progress/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n      <mat-select [formControl]=\"department\" name=\"department\" id=\"department\" [(ngModel)]=\"model.DepartmentCode\" (selectionChange)=\"getKPIList($event.value);\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentForDistrictKPIList\">{{ k.Text }}\r\n            </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"department.invalid && department.touched\">\r\n      Department is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Parameter Category :</mat-label>\r\n      <mat-select  name=\"ParameterCategoryCode\" id=\"ParameterCategoryCode\" [(ngModel)]=\"model.ParameterCategoryCode\" (selectionChange)=\"isDuplicateData()\" [disabled]=\"true\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlComparativeParameterCategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n<!--\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>KPI Category<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"kpi\" name=\"kpi\" id=\"kpi\" [(ngModel)]=\"model.KPICategoryCode\" (selectionChange)=\"GetAllParameterList($event.value,model.DepartmentCode);\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlKPICategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"kpi.invalid && kpi.touched\">\r\n      KPI Category is <strong>required</strong>\r\n    </mat-error>\r\n  </div> -->\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Financial Year<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"year\" name=\"year\" id=\"year\" [(ngModel)]=\"model.YearCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlYearMaster\">{{ k.Text }}\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"year.invalid && year.touched\">\r\n      Financial Year is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Month<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"Month\" name=\"Month\" id=\"Month\" [(ngModel)]=\"model.MonthCode\" (selectionChange)=\"isDuplicateData()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlMonth\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Month.invalid && Month.touched\">\r\n      Month is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n  <!-- Parameter Section start -->\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n    <table class=\"table new_table table_border table_custom mb-20 table-camparativtargetentry\" *ngIf=\"listModel?.length > 0\">\r\n      <thead>\r\n        <tr>\r\n          <th scope=\"col\">KPI Category Name</th>\r\n          <th scope=\"col\">Physical Parameter</th>\r\n          <th scope=\"col\">Physical Value</th>\r\n          <th scope=\"col\">Unit</th>\r\n          <th scope=\"col\">Financial Parameter</th>\r\n          <th scope=\"col\">Financial Value</th>\r\n          <th scope=\"col\">Unit</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of listModel; let i = index\" [attr.data-index]=\"i\">\r\n          <td>{{item.IsPhysical?item.KPICategoryName:''}}</td>\r\n          <td>{{item.IsPhysical?item.PhysicalParameter:''}}</td>\r\n          <td> <input matInput placeholder=\"Physical Value\" name=\"{{i}}_PhysicalValue\" [(ngModel)]=\"item.PhysicalValue\" *ngIf=\"item.IsPhysical\">\r\n          </td>\r\n          <td>{{item.IsPhysical?item.physicalUnitName:''}} </td>\r\n          <td>{{item.IsFinancial?item.FinancialParameter:''}}</td>\r\n          <td><input matInput placeholder=\"Financial Value\" name=\"{{i}}_FinancialValue\"\r\n              [(ngModel)]=\"item.FinancialValue\" *ngIf=\"item.IsFinancial\"></td>\r\n          <td>{{item.IsFinancial? item.FinancialUnitName:''}}</td>\r\n\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!-- Parameter Section End -->\r\n\r\n  <div class=\"col l12 x8 m4 s6 clearfix\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/districtkpi/districtkpi.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/districtkpi/districtkpi.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"ModifiedDate\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date </th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n        {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/district-kpi/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/e-booklet/e-booklet.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/e-booklet/e-booklet.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 xl12 m12 s12 mb-10 text-center\">\r\n    <mat-radio-group class=\" mb-10 example-full-width radio-bx-custom radio-bx-custom-with-label\" appearance=\"outline\"\r\n      aria-label=\"Select an option\" [(ngModel)]=\"model.CategoryWiseRadio\" >\r\n      <!-- <mat-label class=\"mr-5\">Year Wise or Grand Total</mat-label> -->\r\n      <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.RadioDepartmentCategory;\" (change)=\"RadioChanges();\">\r\n        {{item.Text}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12 mb-10\" *ngIf=\"this.model.CategoryWiseRadio == ebookletEnum.department\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department </mat-label>\r\n      <mat-select [(ngModel)]=\"model.DepartmentCode\"\r\n        (selectionChange)=\"getBookletList()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentForDepartmentalProgressList\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12 mb-10\" *ngIf=\"this.model.CategoryWiseRadio == ebookletEnum.category\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Beneficiary Category </mat-label>\r\n      <mat-select [(ngModel)]=\"model.BeneficiaryCategoryCode\"\r\n        (selectionChange)=\"getBookletList()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlBeneficiaryCategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l12 xl12 m12 s12 mb-10\" *ngIf=\"this.model.CategoryWiseRadio == ebookletEnum.KPICategory\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>KPI Category </mat-label>\r\n      <mat-select [(ngModel)]=\"model.KPICategoryCode\"\r\n        (selectionChange)=\"getBookletList()\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlKPICategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- <div>\r\n    <mat-label>{{dataModel?.Logo}}</mat-label>\r\n    <mat-label>{{dataModel?.Name}}</mat-label>\r\n  </div> -->\r\n  <div class=\"ebooklet-discription-list\" *ngIf=\"dataModel?.Logo ||dataModel?.Name ||dataModel?.EBookletList?.length>0\">\r\n    <div class=\"ebooklet-discription-list-img\" *ngIf=\"dataModel?.Logo\"><img [src]=\"dataModel?.Logo\"></div>\r\n    <div class=\"ebooklet-discription-list-info\">\r\n      <h2>{{dataModel?.Name}}</h2>\r\n      <ul *ngIf=\"dataModel?.EBookletList?.length>0\">\r\n      <li *ngFor=\"let item of dataModel?.EBookletList\">{{item.Description}}</li>\r\n    </ul>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.html":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.html ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formGroup\">\r\n\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n        <mat-select name=\"DepartmentCode\" [(ngModel)]=\"model.DepartmentCode\"\r\n          (selectionChange)=\"getSchemeList($event.value);\" formControlName=\"DepartmentCode\">\r\n          <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\">{{ k.DepartmentTitle }}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"formGroup.get('DepartmentCode').hasError('required') && (formGroup.get('DepartmentCode').touched && formGroup.get('DepartmentCode').invalid)\">\r\n        Department is <strong>required!</strong>\r\n      </mat-error>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Parameter Category :</mat-label>\r\n        <mat-select name=\"CategoryCode\" [(ngModel)]=\"model.CategoryCode\" formControlName=\"CategoryCode\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlComparativeParameterCategory\">{{ k.Text }}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>KPI Category<span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select formControlName=\"KPICategoryCode\" #KPICategoryCode [(ngModel)]=\"model.KPICategoryCode\">\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlKPICategory\">{{ k.Text }}\r\n          </mat-option>\r\n\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error\r\n        *ngIf=\"formGroup.get('KPICategoryCode').hasError('required') && (formGroup.get('KPICategoryCode').touched && formGroup.get('KPICategoryCode').invalid)\">\r\n        KPI Category is <strong>required!</strong>\r\n      </mat-error>\r\n    </div>\r\n    <div class=\"row m-0 w-100 col l6 p-0\">\r\n      <div class=\"col l12 xl12 m12 s12 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsPhysical\" formControlName=\"IsPhysical\" #IsPhysical  (change)=\"phynancialClick($event.checked);\">Is Physical\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n      <div class=\"col l12 xl12 m12 s12\" *ngIf=\"model.IsPhysical\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Physical Parameter\r\n            <span style=\"color: red\">*</span>\r\n          </mat-label>\r\n          <input matInput placeholder=\"Physical Parameter\" [(ngModel)]=\"model.PhysicalParameter\" formControlName=\"Name\"\r\n            name=\"Name\">\r\n        </mat-form-field>\r\n        <mat-error\r\n          *ngIf=\"formGroup.get('Name').hasError('required') && (formGroup.get('Name').touched && formGroup.get('Name').invalid)\">\r\n          Physical Parameter is <strong>required!</strong>\r\n        </mat-error>\r\n      </div>\r\n      <div class=\"col l12 xl12 m12 s12\" *ngIf=\"model.IsPhysical\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label> Physical Unit <span style=\"color: red\">*</span></mat-label>\r\n          <mat-select formControlName=\"PhysicalUnitCode\" #PhysicalUnitCode [(ngModel)]=\"model.PhysicalUnitCode\">\r\n            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlPhysicalUnit\">{{ k.Text }}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error\r\n          *ngIf=\"formGroup.get('PhysicalUnitCode').hasError('required') && (formGroup.get('PhysicalUnitCode').touched && formGroup.get('PhysicalUnitCode').invalid)\">\r\n          Physical Unit is <strong>required!</strong>\r\n        </mat-error>\r\n      </div>\r\n    </div>\r\n    <div class=\"row m-0 w-100 col l6 p-0\">\r\n      <div class=\"col l12 xl12 m12 s12 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsFinancial\" formControlName=\"IsFinancial\" #IsFinancial (change)=\"financialClick($event.checked);\">Is Financial\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n      <div class=\"col l12 xl12 m12 s12\" *ngIf=\"model.IsFinancial\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Financial Parameter\r\n          </mat-label>\r\n          <input matInput placeholder=\"Financial Parameter\" [(ngModel)]=\"model.FinancialParameter\"\r\n            formControlName=\"NameHindi\" name=\"NameHindi\">\r\n        </mat-form-field>\r\n        <mat-error\r\n          *ngIf=\"formGroup.get('NameHindi').hasError('required') && (formGroup.get('NameHindi').touched && formGroup.get('NameHindi').invalid)\">\r\n          Financial Parameter is <strong>required!</strong>\r\n        </mat-error>\r\n      </div>\r\n      <div class=\"col l12 xl12 m12 s12\" *ngIf=\"model.IsFinancial\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label> Financal Unit</mat-label>\r\n          <mat-select formControlName=\"FinancialUnitCode\" #FinancialUnitCode [(ngModel)]=\"model.FinancialUnitCode\">\r\n            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlFinancialUnit\">{{ k.Text }}\r\n            </mat-option>\r\n\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error\r\n          *ngIf=\"formGroup.get('FinancialUnitCode').hasError('required') && (formGroup.get('FinancialUnitCode').touched && formGroup.get('FinancialUnitCode').invalid)\">\r\n          Financial Unit is <strong>required!</strong>\r\n        </mat-error>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- <div class=\"col l6 xl6 m6 s6 mat-form-field-wrapper\">\r\n      <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n        <mat-checkbox [(ngModel)]=\"model.IsDistrict\" formControlName=\"IsDistrict\" #IsDistrict>Is District</mat-checkbox>\r\n      </section>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s6 mat-form-field-wrapper\">\r\n      <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n        <mat-checkbox [(ngModel)]=\"model.IsDepartment\" formControlName=\"IsDepartment\" #IsDepartment>Is Department\r\n        </mat-checkbox>\r\n      </section>\r\n    </div> -->\r\n    <div class=\"col l6 xl6 m6 s6 mat-form-field-wrapper\">\r\n      <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n        <mat-checkbox [(ngModel)]=\"model.IsConnectWithScheme\" formControlName=\"IsConnectWithScheme\"\r\n          #IsConnectWithScheme>Is Connect With Scheme</mat-checkbox>\r\n      </section>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\" *ngIf=\"model.IsConnectWithScheme\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Scheme </mat-label>\r\n        <mat-select name=\"SchemeCode\" [(ngModel)]=\"model.SchemeCode\" formControlName=\"SchemeCode\">\r\n\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlSchemeName\">{{item.Text}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Benificiary Category </mat-label>\r\n        <mat-select name=\"BenificiaryList\" formControlName=\"BenificiaryList\" [(ngModel)]=\"model.BenificiaryList\"  multiple>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlBeneficiaryCategory\">{{ k.Text }}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m12 s12\" >\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Achievement Description\r\n          </mat-label>\r\n          <!-- <input matInput placeholder=\"Achievement Description\" [(ngModel)]=\"model.Description1\"\r\n            formControlName=\"Description1\" name=\"Description1\"> -->\r\n            <textarea matInput placeholder=\"Achievement Description\" [(ngModel)]=\"model.Description1\"  #Description1\r\n            formControlName=\"Description1\" name=\"Description1\" class=\"rw-5\" ></textarea>\r\n        </mat-form-field>\r\n        <div class=\"note-highlight\">Use <strong> <span><</span>PHYSICAL<span>></span> </strong> and <strong> <span><</span>FINANCIAL<span>></span> </strong>  keyword for dynamic physical and financial value respectively  </div>\r\n      </div>\r\n      <div class=\"col l6 xl6 m12 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Comparative Description\r\n            </mat-label>\r\n            <!-- <input matInput placeholder=\"Comparative Description\" [(ngModel)]=\"model.Description2\"\r\n              formControlName=\"Description2\" name=\"Description2\"> -->\r\n              <textarea matInput placeholder=\"Comparative Description\" [(ngModel)]=\"model.Description2\"  #Description2\r\n              formControlName=\"Description2\" name=\"Description2\" class=\"rw-5\" ></textarea>\r\n          </mat-form-field>\r\n          <!-- <div class=\"note-highlight\">Use <strong> <span><</span>FINANCIAL<span>></span> </strong>  keyword for dynamic financial value        </div> -->\r\n        </div>\r\n\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n          <mat-radio-group class=\" mb-10 example-full-width radio-bx-custom radio-bx-custom-with-label\" appearance=\"outline\" aria-label=\"Select an option\" formControlName=\"YearGrandTotalCode\"  [(ngModel)]=\"model.YearGrandTotalCode\">\r\n              <mat-label class=\"mr-5\">Year Wise or Grand Total</mat-label>\r\n              <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlComparativeYearGrandTotal;\">\r\n                  {{item.Text}}\r\n              </mat-radio-button>\r\n          </mat-radio-group>\r\n\r\n      </div>\r\n\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Display Order\r\n          </mat-label>\r\n          <input matInput placeholder=\"Display Order\" [(ngModel)]=\"model.DisplayOrder\"\r\n            formControlName=\"DisplayOrder\" name=\"Display Order\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n\r\n      <div class=\"col l3 xl3 m3 s3 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsCompilationReport\" formControlName=\"IsCompilationReport\" #IsCompilationReport >Is Compilation Report\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n\r\n      <div class=\"col l3 xl3 m3 s3 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsComparativeReport\" formControlName=\"IsComparativeReport\" #IsComparativeReport >Is Comparative Report\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n\r\n      <div class=\"col l3 xl3 m3 s3 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsEbookletReport\" formControlName=\"IsEbookletReport\" #IsEbookletReport >Is Ebooklet Report\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n\r\n      <div class=\"col l3 xl3 m3 s3 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\"\r\n          appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsDistrictParameterReport\" formControlName=\"IsDistrictParameterReport\" #IsDistrictParameterReport >Is District Parameter Report\r\n          </mat-checkbox>\r\n        </section>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s6 mat-form-field-wrapper\">\r\n        <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n          <mat-checkbox [(ngModel)]=\"model.IsWebservice\" formControlName=\"IsWebservice\"\r\n            #IsConnectWithScheme>Is Webservice</mat-checkbox>\r\n        </section>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Webservice User Name\r\n          </mat-label>\r\n          <input matInput placeholder=\"Webservice User Name\" [(ngModel)]=\"model.WebserviceUserName\"\r\n            formControlName=\"WebserviceUserName\" >\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Web Service Password\r\n          </mat-label>\r\n          <input matInput placeholder=\"Web Service Password\" [(ngModel)]=\"model.WebServicePassword\"\r\n            formControlName=\"WebServicePassword\" >\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Webservice URL\r\n          </mat-label>\r\n          <input matInput placeholder=\"Webservice URL\" [(ngModel)]=\"model.WebserviceURL\"\r\n            formControlName=\"WebserviceURL\" >\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-radio-group class=\" mb-10 example-full-width radio-bx-custom radio-bx-custom-with-label\" appearance=\"outline\" aria-label=\"Select an option\" formControlName=\"TargetBasedCode\"  [(ngModel)]=\"model.TargetBasedCode\">\r\n            <mat-label class=\"mr-5\">Target Based</mat-label>\r\n            <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.RadioParameterTargetBased;\">\r\n                {{item.Text}}\r\n            </mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Weighted(In Percentage)</mat-label>\r\n          <input matInput placeholder=\"Weighted(In Percentage)\" [(ngModel)]=\"model.Weighted\"\r\n            formControlName=\"Weighted\" name=\"Weighted\" id=\"Weighted\">\r\n        </mat-form-field>\r\n        <mat-error\r\n          *ngIf=\"!formGroup.get('Weighted').hasError('required') && formGroup.get('Weighted').touched && formGroup.get('Weighted').invalid\">\r\n          Only Accept numeric value\r\n        </mat-error>\r\n      </div>\r\n    <div class=\"col l12 x8 m4 s6 clearfix\">\r\n      <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">{{title}}</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.html ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<div class=\"row m-0\">\r\n    <div class=\"col l12 s12\">\r\n\r\n        <div class=\"row m-20 mb-0 scheme-sear-bg-1 no-margin\">\r\n          <div class=\"col l6 xl6 m6 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label> Parameter Category</mat-label>\r\n                        <mat-select  [(ngModel)]=\"parameterCategoryCode\">\r\n                            <mat-option value=\"\">--Select--</mat-option>\r\n                            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlComparativeParameterCategory\" >\r\n                                {{ k.Text }}</mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                  </div>\r\n        </div>\r\n\r\n      </div>\r\n      <app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" (clear)=\"onClearclick()\"></app-global-list-search>\r\n\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n    <!-- <ng-container matColumnDef=\"IsDepartment\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Is Department\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.IsDepartment\">Yes</span>\r\n        <span *ngIf=\"!element.IsDepartment\">No</span>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"IsDistrict\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Is District\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.IsDistrict\">Yes</span>\r\n        <span *ngIf=\"!element.IsDistrict\">No</span>\r\n      </td>\r\n    </ng-container> -->\r\n\r\n    <ng-container matColumnDef=\"IsPhysical\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Is Physical\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.IsPhysical\">Yes</span>\r\n        <span *ngIf=\"!element.IsPhysical\">No</span>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"IsFinancial\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Is Financial\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.IsFinancial\">Yes</span>\r\n        <span *ngIf=\"!element.IsFinancial\">No</span>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n     \r\n      <!-- <a href=\"JavaScript:Void(0);\" routerLink=\"/newspaper/detail/{{ element.Id }}\" title=\"Detail\">\r\n          <mat-icon>visibility</mat-icon>\r\n        </a> -->\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.html":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.html ***!
  \*******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>{{title}} Year Master</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n\r\n<div class=\"col l12 s12 \">\r\n\r\n  <div class=\"col l6 xl6 m6 s12 mb-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Year <span style=\"color: red\">*</span>\r\n      </mat-label>\r\n      <input matInput placeholder=\"year\" maxlength=\"9\" [formControl]=\"YearName\" name=\"YearName\" [(ngModel)]=\"model.YearName\" id=\"YearName\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"YearName.invalid && YearName.touched\">\r\n      Year is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12 mb-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Remarks \r\n      </mat-label>\r\n      <input matInput placeholder=\"Remarks\"  [(ngModel)]=\"model.Remarks\" >\r\n    </mat-form-field>  \r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s6 mb-10 mat-form-field-wrapper\">\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-label>Is Current Government</mat-label>\r\n      <mat-checkbox [(ngModel)]=\"model.IsCurrentGovernment\" >\r\n        Is Current Government</mat-checkbox>\r\n    </section>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12 mb-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Order Number(numeric) \r\n      </mat-label>\r\n      <input matInput placeholder=\"OrderBy\" [(ngModel)]=\"model.OrderBy\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  \r\n\r\n  <div class=\"col l12 x8 m4 s12 mb-10\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">{{title}}</button>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg\">\r\n  <div class=\"col l6 xl6 m6 s6 \">\r\n    <h5 class=\"page-title\"> Year Master List :</h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6  text-right\">\r\n    <button mat-button class=\"btn-submit mt-6\" *ngIf=\"Permission.AddPageAccess\" (click)=\"openDialog(null)\">\r\n      <mat-icon>add</mat-icon>Create\r\n    </button>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\" class=\"mat-elevation-z8\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n     \r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsCurrentGovernment\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n          Is Current Government\r\n        </th>\r\n        <td mat-cell *matCellDef=\"let element\">\r\n          <span *ngIf=\"element.IsCurrentGovernment\">Yes</span>\r\n          <span *ngIf=\"!element.IsCurrentGovernment\">No</span>\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsActive\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Active Status </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"onActiveStatus(element.Id)\"\r\n            title=\"Update Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef > Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a (click)=\"openDialog(group.Id)\" title=\"edit\" *ngIf=\"this.Permission.UpdatePageAccess\">\r\n            <mat-icon>edit</mat-icon>\r\n          </a>\r\n\r\n        </td>\r\n      </ng-container>\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5, 10, 20,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n    </mat-paginator>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.html ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>{{title}} KPI Category</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n\r\n<div class=\"col l12 s12 \">\r\n\r\n    <div class=\"col l6 xl6 m6 s12 mb-10\">\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n          <mat-select [formControl]=\"department\" name=\"department\" id=\"department\"  [(ngModel)]=\"model.DepartmentCode\">\r\n              <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\">{{ k.DepartmentTitle }}\r\n                </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"department.invalid && department.touched\">\r\n            Department is <strong>required</strong>\r\n          </mat-error>\r\n      </div>\r\n  <div class=\"col l6 xl6 m6 s12 mb-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Name in English <span style=\"color: red\">*</span>\r\n      </mat-label>\r\n      <input matInput placeholder=\"Name in English\" [formControl]=\"Name\" name=\"Name\" [(ngModel)]=\"model.Name\" id=\"Name\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Name.invalid && Name.touched\">\r\n      Name in English is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12 mb-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Name in Hindi<span style=\"color: red\">*</span>\r\n      </mat-label>\r\n      <input matInput placeholder=\"Name in Hindi\" [formControl]=\"NameHindi\" name=\"NameHindi\" [(ngModel)]=\"model.NameHindi\" id=\"NameHindi\">\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"Name.invalid && Name.touched\">\r\n      Name in Hindi is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6 mb-10 mat-form-field-wrapper\">\r\n      <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n        <mat-label>Is Aplicable To All Department</mat-label>\r\n        <mat-checkbox [(ngModel)]=\"model.IsAplicableToAllDpt\" >Is Aplicable To All Department</mat-checkbox>\r\n      </section>\r\n    \r\n    </div>\r\n  <div class=\"col l6 xl6 m6 s6 mb-10 mat-form-field-wrapper\">\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-label>Is Department</mat-label>\r\n      <mat-checkbox [(ngModel)]=\"model.IsDepartment\" >\r\n        Is Department</mat-checkbox>\r\n    </section>\r\n   \r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6 mb-10 mat-form-field-wrapper\">\r\n    <section class=\"example-full-width  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n      <mat-label>Is District</mat-label>\r\n      <mat-checkbox [(ngModel)]=\"model.IsDistrict\" >Is District</mat-checkbox>\r\n    </section>\r\n  \r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s6 mb-10 mat-form-field-wrapper\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Display Order\r\n      </mat-label>\r\n      <input matInput placeholder=\"Display Order\" [(ngModel)]=\"model.DisplayOrder\"\r\n     >\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 mb-10\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">{{title}}</button>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/kpi-category/kpi-category.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/master/kpi-category/kpi-category.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row light-bg\">\r\n  <div class=\"col l6 xl6 m6 s6 \">\r\n    <h5 class=\"page-title\"> KPI Category Master List :</h5>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s6  text-right\">\r\n    <button mat-button class=\"btn-submit mt-6\" *ngIf=\"Permission.AddPageAccess\" (click)=\"openDialog(null)\">\r\n      <mat-icon>add</mat-icon>Create\r\n    </button>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\" class=\"mat-elevation-z8\">\r\n      <ng-container matColumnDef=\"index\">\r\n        <th mat-header-cell *matHeaderCellDef>#</th>\r\n        <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n          {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n      </ng-container>\r\n     \r\n      <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsAplicableToAllDpt\">\r\n          <th mat-header-cell *matHeaderCellDef>Is Aplicable To All Dpt</th>\r\n          <td mat-cell *matCellDef=\"let element\">\r\n           <span *ngIf=\"element.IsAplicableToAllDpt\">\r\n             Yes\r\n           </span>\r\n           <span *ngIf=\"!element.IsAplicableToAllDpt\">\r\n              No\r\n            </span>\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"IsDepartment\">\r\n          <th mat-header-cell *matHeaderCellDef>Is Department</th>\r\n          <td mat-cell *matCellDef=\"let element\">\r\n           <span *ngIf=\"element.IsDepartment\">\r\n             Yes\r\n           </span>\r\n           <span *ngIf=\"!element.IsDepartment\">\r\n              No\r\n            </span>\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"IsDistrict\">\r\n          <th mat-header-cell *matHeaderCellDef>Is District</th>\r\n          <td mat-cell *matCellDef=\"let element\">\r\n           <span *ngIf=\"element.IsDistrict\">\r\n             Yes\r\n           </span>\r\n           <span *ngIf=\"!element.IsDistrict\">\r\n              No\r\n            </span>\r\n          </td>\r\n        </ng-container>\r\n\r\n      <ng-container matColumnDef=\"IsActive\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Active Status </th>\r\n        <td mat-cell *matCellDef=\"let element\" class=\"action-link toogle-btn\">\r\n          <a *ngIf=\"this.Permission.UpdatePageAccess\" (click)=\"onActiveStatus(element.Id)\"\r\n            title=\"Update Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n          </a>\r\n          <a *ngIf=\"!this.Permission.UpdatePageAccess\" title=\"Active Status\">\r\n            <mat-icon *ngIf=\"element.IsActive\" style=\"cursor:pointer;color: #74cb74;\">toggle_on</mat-icon>\r\n            <mat-icon *ngIf=\"!element.IsActive\" style=\"cursor:pointer;color: #ff7373;\">toggle_off</mat-icon>\r\n          </a>\r\n        </td>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"Action\">\r\n        <th mat-header-cell *matHeaderCellDef > Action </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link\">\r\n          <a (click)=\"openDialog(group.Id)\" title=\"edit\" *ngIf=\"this.Permission.UpdatePageAccess\">\r\n            <mat-icon>edit</mat-icon>\r\n          </a>\r\n\r\n        </td>\r\n      </ng-container>\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n    </table>\r\n    <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n      [pageSizeOptions]=\"[5, 10, 20,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n    </mat-paginator>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.html":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.html ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field appearance=\"outline\">\r\n      <mat-label>Department <span style=\"color: red\">*</span>:</mat-label>\r\n      <mat-select [formControl]=\"department\" name=\"department\" id=\"department\" [(ngModel)]=\"model.DepartmentCode\" (selectionChange)=\"getKPIList($event.value);\">\r\n          <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\">{{ k.DepartmentTitle }}\r\n            </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"department.invalid && department.touched\">\r\n      Department is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>KPI Category<span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"kpi\" name=\"kpi\" id=\"kpi\" [(ngModel)]=\"model.KPICategoryCode\" (selectionChange)=\"GetAllParameterList($event.value);\">\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlKPICategory\">{{ k.Text }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"kpi.invalid && kpi.touched\">\r\n      KPI Category is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Parameter <span style=\"color: red\">*</span> </mat-label>\r\n      <mat-select [formControl]=\"parameter\" name=\"parameter\" id=\"parameter\" [(ngModel)]=\"model.ParameterCode\" >\r\n        <mat-option value=\"{{ k.ParameterCode }}\" *ngFor=\"let k of ddlParameter\" (onSelectionChange)=\"getParameterDetail(k);\">{{ k.PhysicalParameter }}\r\n        </mat-option>\r\n\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"parameter.invalid && parameter.touched\">\r\n      Parameter is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n\r\n\r\n  <!-- Parameter Section start -->\r\n\r\n    <div class=\"col l12 xl12 m12 s12\">\r\n    <table class=\"table new_table table_border table_custom mb-20 table-camparativtargetentry\" *ngIf=\"yearListModel?.length > 0 && model.ParameterCode>0\">\r\n      <thead>\r\n        <tr>\r\n          <th scope=\"col\">Years</th>\r\n          <th scope=\"col\" *ngIf=\"parameterDetail?.IsPhysical\">{{parameterDetail?.PhysicalParameter}}</th>\r\n          <th scope=\"col\" *ngIf=\"parameterDetail?.IsPhysical\">Unit</th>\r\n          <th scope=\"col\" *ngIf=\"parameterDetail?.IsFinancial\" >{{parameterDetail?.FinancialParameter}}</th>\r\n          <th scope=\"col\"  *ngIf=\"parameterDetail?.IsFinancial\">Unit</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of yearListModel; let i = index\" [attr.data-index]=\"i\">\r\n\r\n          <td>{{item.YearName}}</td>\r\n          <td *ngIf=\"parameterDetail?.IsPhysical\"> <input matInput placeholder=\"Physical Value\" name=\"{{i}}_PhysicalValue\" [(ngModel)]=\"item.PhysicalValue\" >\r\n </td>\r\n          <td *ngIf=\"parameterDetail?.IsPhysical\">{{parameterDetail.physicalUnitName}} </td>\r\n          <td *ngIf=\"parameterDetail.IsFinancial\"><input matInput placeholder=\"Financial Value\" name=\"{{i}}_FinancialValue\"\r\n              [(ngModel)]=\"item.FinancialValue\" > </td>\r\n          <td *ngIf=\"parameterDetail.IsFinancial\">{{ parameterDetail.FinancialUnitName}}</td>\r\n\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!-- Parameter Section End -->\r\n\r\n  <div class=\"col l12 x8 m4 s6 clearfix\">\r\n    <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.html ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"ModifiedDate\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date </th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n        {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy') :'--' }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/camparative/previous-government-entry/update/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/comparative-parameter-model.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/comparative-parameter-model.ts ***!
  \*************************************************************************/
/*! exports provided: ComparativeParameterMasterModel, ComparativeParameterMasterViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeParameterMasterModel", function() { return ComparativeParameterMasterModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeParameterMasterViewModel", function() { return ComparativeParameterMasterViewModel; });
var ComparativeParameterMasterModel = /** @class */ (function () {
    function ComparativeParameterMasterModel() {
        this.BenificiaryList = [];
    }
    return ComparativeParameterMasterModel;
}());

var ComparativeParameterMasterViewModel = /** @class */ (function () {
    function ComparativeParameterMasterViewModel() {
    }
    return ComparativeParameterMasterViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/comparative-target-entry-model.ts":
/*!****************************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/comparative-target-entry-model.ts ***!
  \****************************************************************************/
/*! exports provided: ComparativeTargetEntryModel, ComparativeParameterTargetParameterMappingModel, ComparativeParameterTargetViewModel, ComparativeTargetParmeterListModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeTargetEntryModel", function() { return ComparativeTargetEntryModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeParameterTargetParameterMappingModel", function() { return ComparativeParameterTargetParameterMappingModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeParameterTargetViewModel", function() { return ComparativeParameterTargetViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeTargetParmeterListModel", function() { return ComparativeTargetParmeterListModel; });
var ComparativeTargetEntryModel = /** @class */ (function () {
    function ComparativeTargetEntryModel() {
        this.ComparativeParameterTargetParameterMappingModel = [];
    }
    return ComparativeTargetEntryModel;
}());

var ComparativeParameterTargetParameterMappingModel = /** @class */ (function () {
    function ComparativeParameterTargetParameterMappingModel() {
        this.ComparativeParameterTargetId = 0;
        this.Id = 0;
    }
    return ComparativeParameterTargetParameterMappingModel;
}());

var ComparativeParameterTargetViewModel = /** @class */ (function () {
    function ComparativeParameterTargetViewModel() {
    }
    return ComparativeParameterTargetViewModel;
}());

var ComparativeTargetParmeterListModel = /** @class */ (function () {
    function ComparativeTargetParmeterListModel() {
    }
    return ComparativeTargetParmeterListModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/comparative-year-master-model.ts":
/*!***************************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/comparative-year-master-model.ts ***!
  \***************************************************************************/
/*! exports provided: YearMasterModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YearMasterModel", function() { return YearMasterModel; });
var YearMasterModel = /** @class */ (function () {
    function YearMasterModel() {
    }
    return YearMasterModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/current-government-entry-model.ts":
/*!****************************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/current-government-entry-model.ts ***!
  \****************************************************************************/
/*! exports provided: CurrentGovtEntryModel, CurrentGovtEntryParameterMappingModel, CurrentGovtEntryListViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentGovtEntryModel", function() { return CurrentGovtEntryModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentGovtEntryParameterMappingModel", function() { return CurrentGovtEntryParameterMappingModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentGovtEntryListViewModel", function() { return CurrentGovtEntryListViewModel; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");


var CurrentGovtEntryModel = /** @class */ (function () {
    function CurrentGovtEntryModel(isAchievement) {
        if (isAchievement === void 0) { isAchievement = false; }
        this.CurrentGovtEntryParameterMappingModel = [];
        if (isAchievement) {
            var enums = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production ? _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletEnumProd"] : _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletEnum"];
            this.ParameterCategoryCode = String(enums.EbookletCategory);
        }
    }
    CurrentGovtEntryModel.ctorParameters = function () { return [
        null
    ]; };
    return CurrentGovtEntryModel;
}());

var CurrentGovtEntryParameterMappingModel = /** @class */ (function () {
    function CurrentGovtEntryParameterMappingModel() {
        this.CurrentGovtEntryId = 0;
        this.Id = 0;
    }
    return CurrentGovtEntryParameterMappingModel;
}());

var CurrentGovtEntryListViewModel = /** @class */ (function () {
    function CurrentGovtEntryListViewModel() {
    }
    return CurrentGovtEntryListViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/departmental-progress-model.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/departmental-progress-model.ts ***!
  \*************************************************************************/
/*! exports provided: DepartmentalProgressModel, DepartmentalProgressParameterMappingModel, DepartmentalProgressListViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentalProgressModel", function() { return DepartmentalProgressModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentalProgressParameterMappingModel", function() { return DepartmentalProgressParameterMappingModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentalProgressListViewModel", function() { return DepartmentalProgressListViewModel; });
var DepartmentalProgressModel = /** @class */ (function () {
    function DepartmentalProgressModel() {
        this.DepartmentalProgressParameterMappingModel = [];
    }
    return DepartmentalProgressModel;
}());

var DepartmentalProgressParameterMappingModel = /** @class */ (function () {
    function DepartmentalProgressParameterMappingModel() {
        this.CurrentGovtEntryId = 0;
        this.Id = 0;
    }
    return DepartmentalProgressParameterMappingModel;
}());

var DepartmentalProgressListViewModel = /** @class */ (function () {
    function DepartmentalProgressListViewModel() {
    }
    return DepartmentalProgressListViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/district-kpimodel.ts":
/*!***************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/district-kpimodel.ts ***!
  \***************************************************************/
/*! exports provided: DistrictKPIModel, DistrictKPIParameterMappingModel, DistrictKPIListViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictKPIModel", function() { return DistrictKPIModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictKPIParameterMappingModel", function() { return DistrictKPIParameterMappingModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictKPIListViewModel", function() { return DistrictKPIListViewModel; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");


var DistrictKPIModel = /** @class */ (function () {
    function DistrictKPIModel() {
        this.DistrictKPIParameterMappingModel = [];
        var enums = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production ? _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletEnumProd"] : _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletEnum"];
        this.ParameterCategoryCode = String(enums.EbookletCategory);
    }
    return DistrictKPIModel;
}());

var DistrictKPIParameterMappingModel = /** @class */ (function () {
    function DistrictKPIParameterMappingModel() {
        this.CurrentGovtEntryId = 0;
        this.Id = 0;
    }
    return DistrictKPIParameterMappingModel;
}());

var DistrictKPIListViewModel = /** @class */ (function () {
    function DistrictKPIListViewModel() {
    }
    return DistrictKPIListViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/district-progress-model.ts":
/*!*********************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/district-progress-model.ts ***!
  \*********************************************************************/
/*! exports provided: DistrictProgressModel, DistrictProgressParameterMappingModel, DistrictProgressListViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictProgressModel", function() { return DistrictProgressModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictProgressParameterMappingModel", function() { return DistrictProgressParameterMappingModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictProgressListViewModel", function() { return DistrictProgressListViewModel; });
var DistrictProgressModel = /** @class */ (function () {
    function DistrictProgressModel() {
        this.DistrictProgressParameterMappingModel = [];
        // constructor(){
        //   const enums =environment.production?EbookletEnumProd:EbookletEnum;
        //   this.ParameterCategoryCode=String(enums.EbookletCategory);
        // }
    }
    return DistrictProgressModel;
}());

var DistrictProgressParameterMappingModel = /** @class */ (function () {
    function DistrictProgressParameterMappingModel() {
        this.CurrentGovtEntryId = 0;
        this.Id = 0;
    }
    return DistrictProgressParameterMappingModel;
}());

var DistrictProgressListViewModel = /** @class */ (function () {
    function DistrictProgressListViewModel() {
    }
    return DistrictProgressListViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/e-booklet-model.ts":
/*!*************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/e-booklet-model.ts ***!
  \*************************************************************/
/*! exports provided: EBookletFilterModel, EBookletResponseModel, BookletDataModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EBookletFilterModel", function() { return EBookletFilterModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EBookletResponseModel", function() { return EBookletResponseModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookletDataModel", function() { return BookletDataModel; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");


var EBookletFilterModel = /** @class */ (function () {
    function EBookletFilterModel() {
        var ebookletEnum = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production ? _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletFilterProdEnum"] : _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletFilterEnum"];
        this.YearWiseCode = ebookletEnum.YearWiseCode;
        this.GrandTotalCode = ebookletEnum.GrandTotalCode;
        this.GeneralEntryEBookletCode = ebookletEnum.GeneralEntryEBookletCode;
        this.GeneralEntryEBookletVariableCode = ebookletEnum.GeneralEntryEBookletVariableCode;
        var enums = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production ? _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletEnumProd"] : _Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_1__["EbookletEnum"];
        this.ParameterCategoryCode = enums.EbookletCategory;
    }
    return EBookletFilterModel;
}());

var EBookletResponseModel = /** @class */ (function () {
    function EBookletResponseModel() {
        this.EBookletList = [];
    }
    return EBookletResponseModel;
}());

var BookletDataModel = /** @class */ (function () {
    function BookletDataModel() {
    }
    return BookletDataModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/kpicategory-model.ts":
/*!***************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/kpicategory-model.ts ***!
  \***************************************************************/
/*! exports provided: KPICategoryMasterModel, KPICategoryMasterViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KPICategoryMasterModel", function() { return KPICategoryMasterModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KPICategoryMasterViewModel", function() { return KPICategoryMasterViewModel; });
var KPICategoryMasterModel = /** @class */ (function () {
    function KPICategoryMasterModel() {
    }
    return KPICategoryMasterModel;
}());

var KPICategoryMasterViewModel = /** @class */ (function () {
    function KPICategoryMasterViewModel() {
    }
    return KPICategoryMasterViewModel;
}());



/***/ }),

/***/ "./src/app/Shared/Model/Camparetive/previous-government-entry-model.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/Shared/Model/Camparetive/previous-government-entry-model.ts ***!
  \*****************************************************************************/
/*! exports provided: PreviousGovernmentEntryModel, PreviousGovernmentEntryParameterMappingModel, PreviousGovernmentEntryListModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviousGovernmentEntryModel", function() { return PreviousGovernmentEntryModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviousGovernmentEntryParameterMappingModel", function() { return PreviousGovernmentEntryParameterMappingModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviousGovernmentEntryListModel", function() { return PreviousGovernmentEntryListModel; });
var PreviousGovernmentEntryModel = /** @class */ (function () {
    function PreviousGovernmentEntryModel() {
        this.PreviousGovernmentEntryParameterMappingModel = [];
    }
    return PreviousGovernmentEntryModel;
}());

var PreviousGovernmentEntryParameterMappingModel = /** @class */ (function () {
    function PreviousGovernmentEntryParameterMappingModel() {
        this.PreviousGovtId = 0;
        this.Id = 0;
    }
    return PreviousGovernmentEntryParameterMappingModel;
}());

var PreviousGovernmentEntryListModel = /** @class */ (function () {
    function PreviousGovernmentEntryListModel() {
    }
    return PreviousGovernmentEntryListModel;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/comparative-parameter-master.service.ts":
/*!************************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/comparative-parameter-master.service.ts ***!
  \************************************************************************************/
/*! exports provided: ComparativeParameterMasterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeParameterMasterService", function() { return ComparativeParameterMasterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var ComparativeParameterMasterService = /** @class */ (function () {
    function ComparativeParameterMasterService(_baseService) {
        this._baseService = _baseService;
    }
    ComparativeParameterMasterService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].CamparativeParameterMasterListUrl, model);
    };
    ComparativeParameterMasterService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].CamparativeParameterMasterAddUrl, model);
    };
    ComparativeParameterMasterService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].CamparativeParameterMasterGetByIdUrl + id, null);
    };
    ComparativeParameterMasterService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].CamparativeParameterMasterEditUrl, model);
    };
    ComparativeParameterMasterService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].CamparativeParameterMasterUpdateStatusUrl + id);
    };
    ComparativeParameterMasterService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    ComparativeParameterMasterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], ComparativeParameterMasterService);
    return ComparativeParameterMasterService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts ***!
  \********************************************************************************/
/*! exports provided: ComparativeTargetEntryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeTargetEntryService", function() { return ComparativeTargetEntryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");




var ComparativeTargetEntryService = /** @class */ (function () {
    function ComparativeTargetEntryService(_baseService) {
        this._baseService = _baseService;
    }
    ComparativeTargetEntryService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CamparativeTargetEntryListUrl, model);
    };
    ComparativeTargetEntryService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CamparativeTargetEntryAddUrl, model);
    };
    ComparativeTargetEntryService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CamparativeTargetEntryGetByIdUrl + id, null);
    };
    ComparativeTargetEntryService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CamparativeTargetEntryEditUrl, model);
    };
    ComparativeTargetEntryService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CamparativeTargetEntryUpdateStatusUrl + id);
    };
    ComparativeTargetEntryService.prototype.GetAllParameterList = function (kPICode, dpt) {
        if (dpt === void 0) { dpt = 0; }
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CamparativeAllParameterListUrl + '?kPICode=' + kPICode + '&dpt=' + dpt);
    };
    ComparativeTargetEntryService.prototype.isDuplicateData = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].IsTargetEntryDuplicateUrl, model);
    };
    ComparativeTargetEntryService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    ComparativeTargetEntryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], ComparativeTargetEntryService);
    return ComparativeTargetEntryService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/comparative-year-master.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/comparative-year-master.service.ts ***!
  \*******************************************************************************/
/*! exports provided: ComparativeYearMasterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparativeYearMasterService", function() { return ComparativeYearMasterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");




var ComparativeYearMasterService = /** @class */ (function () {
    function ComparativeYearMasterService(_baseService) {
        this._baseService = _baseService;
    }
    ComparativeYearMasterService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComparativeYearMasterListUrl, model);
    };
    ComparativeYearMasterService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComparativeYearMasterAddUrl, model);
    };
    ComparativeYearMasterService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComparativeYearMasterGetByIdUrl + id, null);
    };
    ComparativeYearMasterService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComparativeYearMasterEditUrl, model);
    };
    ComparativeYearMasterService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].ComparativeYearMasterUpdateStatusUrl + id);
    };
    ComparativeYearMasterService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    ComparativeYearMasterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], ComparativeYearMasterService);
    return ComparativeYearMasterService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/current-government-entry.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/current-government-entry.service.ts ***!
  \********************************************************************************/
/*! exports provided: CurrentGovernmentEntryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentGovernmentEntryService", function() { return CurrentGovernmentEntryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");




var CurrentGovernmentEntryService = /** @class */ (function () {
    function CurrentGovernmentEntryService(_baseService) {
        this._baseService = _baseService;
    }
    CurrentGovernmentEntryService.prototype.GetList = function (model, catCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CurrentGovernmentEntryListUrl + catCode, model);
    };
    CurrentGovernmentEntryService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CurrentGovernmentEntryAddUrl, model);
    };
    CurrentGovernmentEntryService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CurrentGovernmentEntryGetByIdUrl + id, null);
    };
    CurrentGovernmentEntryService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CurrentGovernmentEntryEditUrl, model);
    };
    CurrentGovernmentEntryService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].CurrentGovernmentEntryUpdateStatusUrl + id);
    };
    CurrentGovernmentEntryService.prototype.isDuplicateData = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].IsCurrentGovDuplicateUrl, model);
    };
    CurrentGovernmentEntryService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    CurrentGovernmentEntryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], CurrentGovernmentEntryService);
    return CurrentGovernmentEntryService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/departmental-progress.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/departmental-progress.service.ts ***!
  \*****************************************************************************/
/*! exports provided: DepartmentalProgressService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentalProgressService", function() { return DepartmentalProgressService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var DepartmentalProgressService = /** @class */ (function () {
    function DepartmentalProgressService(_baseService) {
        this._baseService = _baseService;
    }
    DepartmentalProgressService.prototype.GetList = function (model, catCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DepartmentalProgressListUrl + catCode, model);
    };
    DepartmentalProgressService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DepartmentalProgressAddUrl, model);
    };
    DepartmentalProgressService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DepartmentalProgressGetByIdUrl + id, null);
    };
    DepartmentalProgressService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DepartmentalProgressEditUrl, model);
    };
    DepartmentalProgressService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DepartmentalProgressUpdateStatusUrl + id);
    };
    DepartmentalProgressService.prototype.isDuplicateData = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].IsDepartmentalProgressDuplicateUrl, model);
    };
    DepartmentalProgressService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    DepartmentalProgressService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], DepartmentalProgressService);
    return DepartmentalProgressService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/district-progress.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/district-progress.service.ts ***!
  \*************************************************************************/
/*! exports provided: DistrictProgressService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictProgressService", function() { return DistrictProgressService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var DistrictProgressService = /** @class */ (function () {
    function DistrictProgressService(_baseService) {
        this._baseService = _baseService;
    }
    DistrictProgressService.prototype.GetList = function (model, catCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictProgressListUrl + catCode, model);
    };
    DistrictProgressService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictProgressAddUrl, model);
    };
    DistrictProgressService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictProgressGetByIdUrl + id, null);
    };
    DistrictProgressService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictProgressEditUrl, model);
    };
    DistrictProgressService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictProgressUpdateStatusUrl + id);
    };
    DistrictProgressService.prototype.isDuplicateData = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].IsDistrictProgressDuplicateUrl, model);
    };
    DistrictProgressService.prototype.GetAllParameterList = function (kPICode, dpt, catCode) {
        if (dpt === void 0) { dpt = 0; }
        if (catCode === void 0) { catCode = 0; }
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictProgressAllParameterListUrl + '?kPICode=' + kPICode + '&dpt=' + dpt + '&catCode=' + catCode);
    };
    DistrictProgressService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    DistrictProgressService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], DistrictProgressService);
    return DistrictProgressService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/districtkpi.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/districtkpi.service.ts ***!
  \*******************************************************************/
/*! exports provided: DistrictkpiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictkpiService", function() { return DistrictkpiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var DistrictkpiService = /** @class */ (function () {
    function DistrictkpiService(_baseService) {
        this._baseService = _baseService;
    }
    DistrictkpiService.prototype.GetList = function (model, catCode) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictKPIListUrl + catCode, model);
    };
    DistrictkpiService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictKPIAddUrl, model);
    };
    DistrictkpiService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictKPIGetByIdUrl + id, null);
    };
    DistrictkpiService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictKPIEditUrl, model);
    };
    DistrictkpiService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictKPIUpdateStatusUrl + id);
    };
    DistrictkpiService.prototype.isDuplicateData = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].IsDistrictKPIDuplicateUrl, model);
    };
    DistrictkpiService.prototype.GetAllParameterList = function (kPICode, dpt, catCode) {
        if (dpt === void 0) { dpt = 0; }
        if (catCode === void 0) { catCode = 0; }
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].DistrictKPIAllParameterListUrl + '?kPICode=' + kPICode + '&dpt=' + dpt + '&catCode=' + catCode);
    };
    DistrictkpiService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    DistrictkpiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], DistrictkpiService);
    return DistrictkpiService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/e-booklet.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/e-booklet.service.ts ***!
  \*****************************************************************/
/*! exports provided: EBookletService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EBookletService", function() { return EBookletService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var EBookletService = /** @class */ (function () {
    function EBookletService(_baseService) {
        this._baseService = _baseService;
    }
    EBookletService.prototype.GetEbookLet = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GetEbookletListUrl, model);
    };
    EBookletService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    EBookletService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], EBookletService);
    return EBookletService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/kpi-category.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/kpi-category.service.ts ***!
  \********************************************************************/
/*! exports provided: KpiCategoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KpiCategoryService", function() { return KpiCategoryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var KpiCategoryService = /** @class */ (function () {
    function KpiCategoryService(_baseService) {
        this._baseService = _baseService;
    }
    KpiCategoryService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].KPICategoryMasterListUrl, model);
    };
    KpiCategoryService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].KPICategoryMasterAddUrl, model);
    };
    KpiCategoryService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].KPICategoryMasterGetByIdUrl + id, null);
    };
    KpiCategoryService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].KPICategoryMasterEditUrl, model);
    };
    KpiCategoryService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].KPICategoryMasterUpdateStatusUrl + id);
    };
    KpiCategoryService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    KpiCategoryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], KpiCategoryService);
    return KpiCategoryService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/Comperative/previous-government-entry.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/Shared/Service/Comperative/previous-government-entry.service.ts ***!
  \*********************************************************************************/
/*! exports provided: PreviousGovernmentEntryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviousGovernmentEntryService", function() { return PreviousGovernmentEntryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base.service */ "./src/app/Shared/Service/base.service.ts");




var PreviousGovernmentEntryService = /** @class */ (function () {
    function PreviousGovernmentEntryService(_baseService) {
        this._baseService = _baseService;
    }
    PreviousGovernmentEntryService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].PreviousGovernmentEntryListUrl, model);
    };
    PreviousGovernmentEntryService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].PreviousGovernmentEntryAddUrl, model);
    };
    PreviousGovernmentEntryService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].PreviousGovernmentEntryGetByIdUrl + id, null);
    };
    PreviousGovernmentEntryService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].PreviousGovernmentEntryEditUrl, model);
    };
    PreviousGovernmentEntryService.prototype.ChangeActiveStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].PreviousGovernmentEntryUpdateStatusUrl + id);
    };
    PreviousGovernmentEntryService.prototype.GetAllYearList = function () {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].AllYearListUrl);
    };
    PreviousGovernmentEntryService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"] }
    ]; };
    PreviousGovernmentEntryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"]])
    ], PreviousGovernmentEntryService);
    return PreviousGovernmentEntryService;
}());



/***/ }),

/***/ "./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.css":
/*!**************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.css ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvY2FtcGFyYXRpdmUtdGFyZ2V0LWVudHJ5L2FkZHVwZGF0ZS1jYW1wYXJhdGl2ZS10YXJnZXQtZW50cnkvYWRkdXBkYXRlLWNhbXBhcmF0aXZlLXRhcmdldC1lbnRyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.ts":
/*!*************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.ts ***!
  \*************************************************************************************************************************************************/
/*! exports provided: AddupdateCamparativeTargetEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdateCamparativeTargetEntryComponent", function() { return AddupdateCamparativeTargetEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-target-entry.service */ "./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_Camparetive_comparative_target_entry_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/comparative-target-entry-model */ "./src/app/Shared/Model/Camparetive/comparative-target-entry-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");












var AddupdateCamparativeTargetEntryComponent = /** @class */ (function () {
    // kpi = new FormControl("", [Validators.required]);
    //#endregion
    //#region << constructor >>
    function AddupdateCamparativeTargetEntryComponent(_parentApi, _ComparativeTargetEntryService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._ComparativeTargetEntryService = _ComparativeTargetEntryService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.listModel = [];
        this.mappinglistModel = [];
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.year = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.model = new src_app_Shared_Model_Camparetive_comparative_target_entry_model__WEBPACK_IMPORTED_MODULE_10__["ComparativeTargetEntryModel"]();
        var id = this._route.snapshot.params.id;
        if (id) {
            this.model.Id = id;
            this.GetById();
            this._parentApi.setpagelayout("Update Camparative Target Entry :", "keyboard_backspace", "Back To List", "camparative/camparativetargetentry");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add Camparative Target Entry :", "keyboard_backspace", "Back To List", "camparative/camparativetargetentry");
            this.title = "Add";
            //this.GetAllParameterList();
        }
        this.btnHide = false;
    }
    //#endregion
    //#region << Method >>
    AddupdateCamparativeTargetEntryComponent.prototype.ngOnInit = function () {
        //this.FormGroupInit();
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        // this.getDepartment();
    };
    AddupdateCamparativeTargetEntryComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].ComparativeTargetEnrtyDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdateCamparativeTargetEntryComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdateCamparativeTargetEntryComponent.prototype.getKPIList = function (code, isEdit) {
        if (isEdit === void 0) { isEdit = false; }
        // this._commonService.GetKPIByDepartmentCode(Number(code)).subscribe(
        //   data => {
        //     if (data.IsSuccess) {
        //       
        //       this.ddlKPICategory = data.Data as DdlItemModel[];
        //     }
        //   },
        //   error => {
        //     this._alertService.error(error.message);
        //   }
        // );
        if (!isEdit) {
            this.GetAllParameterList(0, this.model.DepartmentCode);
            // this.isDuplicateData();
        }
    };
    AddupdateCamparativeTargetEntryComponent.prototype.GetById = function () {
        var _this = this;
        this._ComparativeTargetEntryService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.DepartmentCode) {
                    _this.getKPIList(_this.model.DepartmentCode, true);
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                // if (this.model.KPICategoryCode) {
                //   this.model.KPICategoryCode = String(this.model.KPICategoryCode);
                // }
                if (_this.model.YearCode) {
                    _this.model.YearCode = String(_this.model.YearCode);
                }
                _this.listModel = (_this.model.ComparativeParameterTargetParameterMappingModel);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdateCamparativeTargetEntryComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.year.markAsTouched();
        // this.kpi.markAsTouched();
        if (this.department.valid && this.year.valid) {
            this.model.ComparativeParameterTargetParameterMappingModel = this.listModel;
            if (this.model.Id) {
                this._ComparativeTargetEntryService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/camparativetargetentry"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._ComparativeTargetEntryService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/camparativetargetentry"]);
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
    AddupdateCamparativeTargetEntryComponent.prototype.GetAllParameterList = function (kPICode, dpt) {
        var _this = this;
        if (kPICode || dpt) {
            this._ComparativeTargetEntryService
                .GetAllParameterList(kPICode, dpt)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.listModel = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        this.isDuplicateData();
    };
    AddupdateCamparativeTargetEntryComponent.prototype.isDuplicateData = function () {
        var _this = this;
        if (
        // this.model.KPICategoryCode &&
        this.model.DepartmentCode && this.model.YearCode) {
            this._ComparativeTargetEntryService.isDuplicateData(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.btnHide = true;
                    _this._alertService.error(data.Message);
                    //   if (data.Data) {
                    //     const temp = <ComparativeTargetEntryModel>data.Data;
                    //     this.model.Id = temp.Id;
                    //     this.mappinglistModel = <ComparativeParameterTargetParameterMappingModel[]>(
                    //       temp.ComparativeParameterTargetParameterMappingModel
                    //     );
                    //   } else {
                    //     this.model.Id = this.id;
                    //     if (!this.model.Id) {
                    //       // this.GetAllParameterList(
                    //       //   this.model.KPICategoryCode,
                    //       //   this.model.DepartmentCode
                    //       // );
                    //     } else if (
                    //       this.updateModel.Id == this.model.Id &&
                    //       // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
                    //       this.model.DepartmentCode == this.updateModel.DepartmentCode
                    //     ) {
                    //       this.mappinglistModel = <ComparativeParameterTargetParameterMappingModel[]>(
                    //         this.updateModel.ComparativeParameterTargetParameterMappingModel
                    //       );
                    //     }
                    //   }
                }
                else {
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    AddupdateCamparativeTargetEntryComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_4__["ComparativeTargetEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"] }
    ]; };
    AddupdateCamparativeTargetEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-addupdate-camparative-target-entry",
            template: __webpack_require__(/*! raw-loader!./addupdate-camparative-target-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.html"),
            styles: [__webpack_require__(/*! ./addupdate-camparative-target-entry.component.css */ "./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_4__["ComparativeTargetEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"]])
    ], AddupdateCamparativeTargetEntryComponent);
    return AddupdateCamparativeTargetEntryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvY2FtcGFyYXRpdmUtdGFyZ2V0LWVudHJ5L2NhbXBhcmF0aXZlLXRhcmdldC1lbnRyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: CamparativeTargetEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamparativeTargetEntryComponent", function() { return CamparativeTargetEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-target-entry.service */ "./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");









var CamparativeTargetEntryComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function CamparativeTargetEntryComponent(_parentComponent, _ComparativeTargetEntryService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._ComparativeTargetEntryService = _ComparativeTargetEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            // "KPICategoryName",
            "YearName",
            "ModifiedDate",
            "modifiedbyName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            // { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
            { Value: "modifiedbyName", Text: "Created By" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/camparative/camparativetargetentry", "/camparative/camparativetargetentry/add", "", "/camparative/camparativetargetentry/update");
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("Camparative Target Entry  List:", "add", "Add", "camparative/camparativtargetentry/add")
            : this._parentComponent.setpagelayout("Camparative Target Entry  List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    CamparativeTargetEntryComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    CamparativeTargetEntryComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CamparativeTargetEntryComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CamparativeTargetEntryComponent.prototype.GetList = function () {
        var _this = this;
        this._ComparativeTargetEntryService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
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
    CamparativeTargetEntryComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._ComparativeTargetEntryService.ChangeActiveStatus(id).subscribe(function (data) {
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
    CamparativeTargetEntryComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    CamparativeTargetEntryComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
        this.GetList();
    };
    CamparativeTargetEntryComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_5__["ComparativeTargetEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], CamparativeTargetEntryComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CamparativeTargetEntryComponent.prototype, "sort", void 0);
    CamparativeTargetEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-camparative-target-entry',
            template: __webpack_require__(/*! raw-loader!./camparative-target-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.html"),
            styles: [__webpack_require__(/*! ./camparative-target-entry.component.css */ "./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_5__["ComparativeTargetEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], CamparativeTargetEntryComponent);
    return CamparativeTargetEntryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/camparetive-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/content/camparetive/camparetive-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: CamparetiveRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamparetiveRoutingModule", function() { return CamparetiveRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _master_kpi_category_kpi_category_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./master/kpi-category/kpi-category.component */ "./src/app/content/camparetive/master/kpi-category/kpi-category.component.ts");
/* harmony import */ var _master_camparative_parameter_master_addupdatecamparative_parameter_addupdatecamparative_parameter_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component */ "./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.ts");
/* harmony import */ var _master_camparative_parameter_master_camparative_parameter_master_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./master/camparative-parameter-master/camparative-parameter-master.component */ "./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.ts");
/* harmony import */ var _master_camparative_year_master_camparative_year_master_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./master/camparative-year-master/camparative-year-master.component */ "./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.ts");
/* harmony import */ var _camparative_target_entry_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./camparative-target-entry/camparative-target-entry.component */ "./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.ts");
/* harmony import */ var _camparative_target_entry_addupdate_camparative_target_entry_addupdate_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component */ "./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.ts");
/* harmony import */ var _current_government_entry_addupdate_current_government_entry_addupdate_current_government_entry_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component */ "./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.ts");
/* harmony import */ var _current_government_entry_current_government_entry_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./current-government-entry/current-government-entry.component */ "./src/app/content/camparetive/current-government-entry/current-government-entry.component.ts");
/* harmony import */ var _previous_government_entry_addupdate_previous_government_entry_addupdate_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component */ "./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.ts");
/* harmony import */ var _previous_government_entry_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./previous-government-entry/previous-government-entry.component */ "./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.ts");
/* harmony import */ var _e_booklet_e_booklet_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./e-booklet/e-booklet.component */ "./src/app/content/camparetive/e-booklet/e-booklet.component.ts");
/* harmony import */ var _districtkpi_districtkpi_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./districtkpi/districtkpi.component */ "./src/app/content/camparetive/districtkpi/districtkpi.component.ts");
/* harmony import */ var _districtkpi_add_update_districtkpi_add_update_districtkpi_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./districtkpi/add-update-districtkpi/add-update-districtkpi.component */ "./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.ts");
/* harmony import */ var _departmental_progress_departmental_progress_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./departmental-progress/departmental-progress.component */ "./src/app/content/camparetive/departmental-progress/departmental-progress.component.ts");
/* harmony import */ var _departmental_progress_add_update_departmental_progress_add_update_departmental_progress_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component */ "./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.ts");
/* harmony import */ var _district_progress_district_progress_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./district-progress/district-progress.component */ "./src/app/content/camparetive/district-progress/district-progress.component.ts");
/* harmony import */ var _district_progress_add_update_district_progress_add_update_district_progress_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./district-progress/add-update-district-progress/add-update-district-progress.component */ "./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.ts");




















var routes = [
    {
        path: "kpicategory",
        component: _master_kpi_category_kpi_category_component__WEBPACK_IMPORTED_MODULE_3__["KpiCategoryComponent"],
    },
    {
        path: "camparativeparameter",
        component: _master_camparative_parameter_master_camparative_parameter_master_component__WEBPACK_IMPORTED_MODULE_5__["CamparativeParameterMasterComponent"],
    },
    {
        path: "add",
        component: _master_camparative_parameter_master_addupdatecamparative_parameter_addupdatecamparative_parameter_component__WEBPACK_IMPORTED_MODULE_4__["AddupdatecamparativeParameterComponent"],
    },
    {
        path: "update/:id",
        component: _master_camparative_parameter_master_addupdatecamparative_parameter_addupdatecamparative_parameter_component__WEBPACK_IMPORTED_MODULE_4__["AddupdatecamparativeParameterComponent"],
    },
    {
        path: "yearmaster",
        component: _master_camparative_year_master_camparative_year_master_component__WEBPACK_IMPORTED_MODULE_6__["CamparativeYearMasterComponent"],
    },
    {
        path: "camparativetargetentry",
        component: _camparative_target_entry_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_7__["CamparativeTargetEntryComponent"],
    },
    {
        path: "camparativtargetentry/add",
        component: _camparative_target_entry_addupdate_camparative_target_entry_addupdate_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_8__["AddupdateCamparativeTargetEntryComponent"],
    },
    {
        path: "camparativtargetentry/update/:id",
        component: _camparative_target_entry_addupdate_camparative_target_entry_addupdate_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_8__["AddupdateCamparativeTargetEntryComponent"],
    },
    // current government Entry
    {
        path: "current-government-entry",
        component: _current_government_entry_current_government_entry_component__WEBPACK_IMPORTED_MODULE_10__["CurrentGovernmentEntryComponent"],
    },
    {
        path: "current-government-entry/add",
        component: _current_government_entry_addupdate_current_government_entry_addupdate_current_government_entry_component__WEBPACK_IMPORTED_MODULE_9__["AddupdateCurrentGovernmentEntryComponent"],
    },
    {
        path: "current-government-entry/update/:id",
        component: _current_government_entry_addupdate_current_government_entry_addupdate_current_government_entry_component__WEBPACK_IMPORTED_MODULE_9__["AddupdateCurrentGovernmentEntryComponent"],
    },
    // current government Entry
    {
        path: "previous-government-entry",
        component: _previous_government_entry_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_12__["PreviousGovernmentEntryComponent"],
    },
    {
        path: "previous-government-entry/add",
        component: _previous_government_entry_addupdate_previous_government_entry_addupdate_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_11__["AddupdatePreviousGovernmentEntryComponent"],
    },
    {
        path: "previous-government-entry/update/:id",
        component: _previous_government_entry_addupdate_previous_government_entry_addupdate_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_11__["AddupdatePreviousGovernmentEntryComponent"],
    },
    {
        path: "e-booklet",
        component: _e_booklet_e_booklet_component__WEBPACK_IMPORTED_MODULE_13__["EBookletComponent"],
    },
    // current government Entry
    {
        path: "district-kpi",
        component: _districtkpi_districtkpi_component__WEBPACK_IMPORTED_MODULE_14__["DistrictkpiComponent"],
    },
    {
        path: "district-kpi/add",
        component: _districtkpi_add_update_districtkpi_add_update_districtkpi_component__WEBPACK_IMPORTED_MODULE_15__["AddUpdateDistrictkpiComponent"],
    },
    {
        path: "district-kpi/update/:id",
        component: _districtkpi_add_update_districtkpi_add_update_districtkpi_component__WEBPACK_IMPORTED_MODULE_15__["AddUpdateDistrictkpiComponent"],
    },
    {
        path: "departmental-progress",
        component: _departmental_progress_departmental_progress_component__WEBPACK_IMPORTED_MODULE_16__["DepartmentalProgressComponent"],
    },
    {
        path: "departmental-progress/add",
        component: _departmental_progress_add_update_departmental_progress_add_update_departmental_progress_component__WEBPACK_IMPORTED_MODULE_17__["AddUpdateDepartmentalProgressComponent"],
    },
    {
        path: "departmental-progress/update/:id",
        component: _departmental_progress_add_update_departmental_progress_add_update_departmental_progress_component__WEBPACK_IMPORTED_MODULE_17__["AddUpdateDepartmentalProgressComponent"],
    },
    {
        path: "district-progress",
        component: _district_progress_district_progress_component__WEBPACK_IMPORTED_MODULE_18__["DistrictProgressComponent"],
    },
    {
        path: "district-progress/update/:id",
        component: _district_progress_add_update_district_progress_add_update_district_progress_component__WEBPACK_IMPORTED_MODULE_19__["AddUpdateDistrictProgressComponent"],
    },
    {
        path: "district-progress/add",
        component: _district_progress_add_update_district_progress_add_update_district_progress_component__WEBPACK_IMPORTED_MODULE_19__["AddUpdateDistrictProgressComponent"],
    },
];
var CamparetiveRoutingModule = /** @class */ (function () {
    function CamparetiveRoutingModule() {
    }
    CamparetiveRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], CamparetiveRoutingModule);
    return CamparetiveRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/camparetive/camparetive.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/content/camparetive/camparetive.module.ts ***!
  \***********************************************************/
/*! exports provided: CamparetiveModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamparetiveModule", function() { return CamparetiveModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _camparetive_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./camparetive-routing.module */ "./src/app/content/camparetive/camparetive-routing.module.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _master_kpi_category_kpi_category_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./master/kpi-category/kpi-category.component */ "./src/app/content/camparetive/master/kpi-category/kpi-category.component.ts");
/* harmony import */ var _master_kpi_category_addupdatekpi_category_addupdatekpi_category_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./master/kpi-category/addupdatekpi-category/addupdatekpi-category.component */ "./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.ts");
/* harmony import */ var _master_camparative_parameter_master_camparative_parameter_master_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./master/camparative-parameter-master/camparative-parameter-master.component */ "./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.ts");
/* harmony import */ var _master_camparative_parameter_master_addupdatecamparative_parameter_addupdatecamparative_parameter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component */ "./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.ts");
/* harmony import */ var _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../scheme/scheme.module */ "./src/app/content/scheme/scheme.module.ts");
/* harmony import */ var _master_camparative_year_master_camparative_year_master_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./master/camparative-year-master/camparative-year-master.component */ "./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.ts");
/* harmony import */ var _master_camparative_year_master_addupdatecomparative_year_master_addupdatecomparative_year_master_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component */ "./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.ts");
/* harmony import */ var _camparative_target_entry_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./camparative-target-entry/camparative-target-entry.component */ "./src/app/content/camparetive/camparative-target-entry/camparative-target-entry.component.ts");
/* harmony import */ var _camparative_target_entry_addupdate_camparative_target_entry_addupdate_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component */ "./src/app/content/camparetive/camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component.ts");
/* harmony import */ var _current_government_entry_current_government_entry_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./current-government-entry/current-government-entry.component */ "./src/app/content/camparetive/current-government-entry/current-government-entry.component.ts");
/* harmony import */ var _current_government_entry_addupdate_current_government_entry_addupdate_current_government_entry_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component */ "./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.ts");
/* harmony import */ var _previous_government_entry_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./previous-government-entry/previous-government-entry.component */ "./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.ts");
/* harmony import */ var _previous_government_entry_addupdate_previous_government_entry_addupdate_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component */ "./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.ts");
/* harmony import */ var _e_booklet_e_booklet_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./e-booklet/e-booklet.component */ "./src/app/content/camparetive/e-booklet/e-booklet.component.ts");
/* harmony import */ var _districtkpi_districtkpi_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./districtkpi/districtkpi.component */ "./src/app/content/camparetive/districtkpi/districtkpi.component.ts");
/* harmony import */ var _districtkpi_add_update_districtkpi_add_update_districtkpi_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./districtkpi/add-update-districtkpi/add-update-districtkpi.component */ "./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.ts");
/* harmony import */ var _departmental_progress_departmental_progress_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./departmental-progress/departmental-progress.component */ "./src/app/content/camparetive/departmental-progress/departmental-progress.component.ts");
/* harmony import */ var _departmental_progress_add_update_departmental_progress_add_update_departmental_progress_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component */ "./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.ts");
/* harmony import */ var _district_progress_district_progress_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./district-progress/district-progress.component */ "./src/app/content/camparetive/district-progress/district-progress.component.ts");
/* harmony import */ var _district_progress_add_update_district_progress_add_update_district_progress_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./district-progress/add-update-district-progress/add-update-district-progress.component */ "./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.ts");

























var CamparetiveModule = /** @class */ (function () {
    function CamparetiveModule() {
    }
    CamparetiveModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _master_kpi_category_kpi_category_component__WEBPACK_IMPORTED_MODULE_5__["KpiCategoryComponent"],
                _master_kpi_category_addupdatekpi_category_addupdatekpi_category_component__WEBPACK_IMPORTED_MODULE_6__["AddupdatekpiCategoryComponent"],
                _master_camparative_parameter_master_camparative_parameter_master_component__WEBPACK_IMPORTED_MODULE_7__["CamparativeParameterMasterComponent"],
                _master_camparative_parameter_master_addupdatecamparative_parameter_addupdatecamparative_parameter_component__WEBPACK_IMPORTED_MODULE_8__["AddupdatecamparativeParameterComponent"],
                _master_camparative_year_master_camparative_year_master_component__WEBPACK_IMPORTED_MODULE_10__["CamparativeYearMasterComponent"],
                _master_camparative_year_master_addupdatecomparative_year_master_addupdatecomparative_year_master_component__WEBPACK_IMPORTED_MODULE_11__["AddupdatecomparativeYearMasterComponent"],
                _camparative_target_entry_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_12__["CamparativeTargetEntryComponent"],
                _camparative_target_entry_addupdate_camparative_target_entry_addupdate_camparative_target_entry_component__WEBPACK_IMPORTED_MODULE_13__["AddupdateCamparativeTargetEntryComponent"],
                _current_government_entry_current_government_entry_component__WEBPACK_IMPORTED_MODULE_14__["CurrentGovernmentEntryComponent"],
                _current_government_entry_addupdate_current_government_entry_addupdate_current_government_entry_component__WEBPACK_IMPORTED_MODULE_15__["AddupdateCurrentGovernmentEntryComponent"],
                _previous_government_entry_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_16__["PreviousGovernmentEntryComponent"],
                _previous_government_entry_addupdate_previous_government_entry_addupdate_previous_government_entry_component__WEBPACK_IMPORTED_MODULE_17__["AddupdatePreviousGovernmentEntryComponent"],
                _e_booklet_e_booklet_component__WEBPACK_IMPORTED_MODULE_18__["EBookletComponent"],
                _districtkpi_districtkpi_component__WEBPACK_IMPORTED_MODULE_19__["DistrictkpiComponent"],
                _districtkpi_add_update_districtkpi_add_update_districtkpi_component__WEBPACK_IMPORTED_MODULE_20__["AddUpdateDistrictkpiComponent"],
                _departmental_progress_departmental_progress_component__WEBPACK_IMPORTED_MODULE_21__["DepartmentalProgressComponent"],
                _departmental_progress_add_update_departmental_progress_add_update_departmental_progress_component__WEBPACK_IMPORTED_MODULE_22__["AddUpdateDepartmentalProgressComponent"],
                _district_progress_district_progress_component__WEBPACK_IMPORTED_MODULE_23__["DistrictProgressComponent"],
                _district_progress_add_update_district_progress_add_update_district_progress_component__WEBPACK_IMPORTED_MODULE_24__["AddUpdateDistrictProgressComponent"],
            ],
            entryComponents: [_master_kpi_category_addupdatekpi_category_addupdatekpi_category_component__WEBPACK_IMPORTED_MODULE_6__["AddupdatekpiCategoryComponent"], _master_camparative_year_master_addupdatecomparative_year_master_addupdatecomparative_year_master_component__WEBPACK_IMPORTED_MODULE_11__["AddupdatecomparativeYearMasterComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _camparetive_routing_module__WEBPACK_IMPORTED_MODULE_3__["CamparetiveRoutingModule"], src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_4__["AppMaterialModule"], _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_9__["SchemeModule"]],
        })
    ], CamparetiveModule);
    return CamparetiveModule;
}());



/***/ }),

/***/ "./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.css":
/*!**************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.css ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvY3VycmVudC1nb3Zlcm5tZW50LWVudHJ5L2FkZHVwZGF0ZS1jdXJyZW50LWdvdmVybm1lbnQtZW50cnkvYWRkdXBkYXRlLWN1cnJlbnQtZ292ZXJubWVudC1lbnRyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.ts":
/*!*************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.ts ***!
  \*************************************************************************************************************************************************/
/*! exports provided: AddupdateCurrentGovernmentEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdateCurrentGovernmentEntryComponent", function() { return AddupdateCurrentGovernmentEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_current_government_entry_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/current-government-entry-model */ "./src/app/Shared/Model/Camparetive/current-government-entry-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-target-entry.service */ "./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_current_government_entry_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/current-government-entry.service */ "./src/app/Shared/Service/Comperative/current-government-entry.service.ts");













var AddupdateCurrentGovernmentEntryComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddupdateCurrentGovernmentEntryComponent(_parentApi, _ComparativeTargetEntryService, _CurrentGovernmentEntryService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._ComparativeTargetEntryService = _ComparativeTargetEntryService;
        this._CurrentGovernmentEntryService = _CurrentGovernmentEntryService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.listModel = [];
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.year = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        // kpi = new FormControl("", [Validators.required]);
        this.Month = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.isDuplicate = false;
        this.model = new src_app_Shared_Model_Camparetive_current_government_entry_model__WEBPACK_IMPORTED_MODULE_3__["CurrentGovtEntryModel"](true);
        this.id = this._route.snapshot.params.id;
        if (this.id) {
            this.model.Id = this.id;
            this.GetById();
            this._parentApi.setpagelayout("Update Departmental Achievements Entry :", "keyboard_backspace", "Back To List", "camparative/current-government-entry");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add Departmental Achievements Entry :", "keyboard_backspace", "Back To List", "camparative/current-government-entry");
            this.title = "Add";
            //this.GetAllParameterList();
        }
    }
    //#endregion
    //#region << Method >>
    AddupdateCurrentGovernmentEntryComponent.prototype.ngOnInit = function () {
        //this.FormGroupInit();
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        //this.getDepartment();
    };
    AddupdateCurrentGovernmentEntryComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].CurrentGovernmentEntryDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    // getDepartment() {
    //   this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
    //     data => {
    //       if (data.IsSuccess) {
    //         this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
    //       }
    //     },
    //     error => {
    //       this._alertService.error(error.message);
    //     }
    //   );
    // }
    AddupdateCurrentGovernmentEntryComponent.prototype.getKPIList = function (code, isEdit) {
        if (isEdit === void 0) { isEdit = false; }
        this.isDuplicateData();
    };
    AddupdateCurrentGovernmentEntryComponent.prototype.GetById = function () {
        var _this = this;
        this._CurrentGovernmentEntryService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.updateModel = new src_app_Shared_Model_Camparetive_current_government_entry_model__WEBPACK_IMPORTED_MODULE_3__["CurrentGovtEntryModel"](true);
                if (!_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = _this.updateModel.ParameterCategoryCode;
                }
                _this.updateModel.Id = _this.model.Id;
                _this.updateModel.ParameterCategoryCode = _this.model.ParameterCategoryCode;
                _this.updateModel.DepartmentCode = _this.model.DepartmentCode;
                _this.updateModel.YearCode = _this.model.YearCode;
                _this.updateModel.MonthCode = _this.model.MonthCode;
                if (_this.model.DepartmentCode) {
                    // this.getKPIList(this.model.DepartmentCode, true);
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = String(_this.model.ParameterCategoryCode);
                }
                if (_this.model.YearCode) {
                    _this.model.YearCode = String(_this.model.YearCode);
                }
                if (_this.model.MonthCode) {
                    _this.model.MonthCode = String(_this.model.MonthCode);
                }
                _this.listModel = (_this.model.CurrentGovtEntryParameterMappingModel);
                _this.updateModel.CurrentGovtEntryParameterMappingModel = _this.model.CurrentGovtEntryParameterMappingModel;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdateCurrentGovernmentEntryComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.year.markAsTouched();
        // this.kpi.markAsTouched();
        this.Month.markAsTouched();
        if (this.department.valid &&
            this.year.valid &&
            // this.kpi.valid &&
            this.Month.valid) {
            this.model.CurrentGovtEntryParameterMappingModel = this.listModel;
            if (this.model.Id) {
                this._CurrentGovernmentEntryService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/current-government-entry"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._CurrentGovernmentEntryService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/current-government-entry"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
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
    AddupdateCurrentGovernmentEntryComponent.prototype.GetAllParameterList = function (kPICode, dpt) {
        var _this = this;
        if (this.updateModel &&
            this.updateModel.Id == this.model.Id &&
            // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
            this.model.DepartmentCode == this.updateModel.DepartmentCode) {
            this.listModel = (this.updateModel.CurrentGovtEntryParameterMappingModel);
            return;
        }
        if (kPICode || dpt) {
            this._ComparativeTargetEntryService
                .GetAllParameterList(kPICode, dpt)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.listModel = (data.Data);
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        this.isDuplicateData();
    };
    AddupdateCurrentGovernmentEntryComponent.prototype.isDuplicateData = function () {
        // if (
        //   // this.model.KPICategoryCode &&
        //   this.model.DepartmentCode && this.model.YearCode && this.model.MonthCode) {
        var _this = this;
        this._CurrentGovernmentEntryService.isDuplicateData(this.model).subscribe(function (data) {
            if (data.IsSuccess) {
                if (data.Data) {
                    var temp = data.Data;
                    _this.model.Id = temp.Id;
                    _this.listModel = (temp.CurrentGovtEntryParameterMappingModel);
                }
                else {
                    _this.model.Id = _this.id;
                    if (!_this.model.Id) {
                        // this.GetAllParameterList(
                        //   this.model.KPICategoryCode,
                        //   this.model.DepartmentCode
                        // );
                    }
                    else if (_this.updateModel.Id == _this.model.Id &&
                        _this.model.ParameterCategoryCode == _this.updateModel.ParameterCategoryCode &&
                        _this.model.DepartmentCode == _this.updateModel.DepartmentCode) {
                        _this.listModel = (_this.updateModel.CurrentGovtEntryParameterMappingModel);
                    }
                }
            }
            else {
                _this.model.Id = _this.id;
                if (!_this.model.Id) {
                    var temp = data.Data;
                    _this.listModel = (temp.CurrentGovtEntryParameterMappingModel);
                }
                else if (_this.updateModel.Id == _this.model.Id &&
                    _this.model.YearCode == _this.updateModel.YearCode &&
                    _this.model.MonthCode == _this.updateModel.MonthCode &&
                    _this.model.ParameterCategoryCode == _this.updateModel.ParameterCategoryCode &&
                    _this.model.DepartmentCode == _this.updateModel.DepartmentCode) {
                    _this.listModel = (_this.updateModel.CurrentGovtEntryParameterMappingModel);
                }
                else {
                    var temp = data.Data;
                    _this.listModel = (temp.CurrentGovtEntryParameterMappingModel);
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
        // }
    };
    AddupdateCurrentGovernmentEntryComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_10__["ComparativeTargetEntryService"] },
        { type: src_app_Shared_Service_Comperative_current_government_entry_service__WEBPACK_IMPORTED_MODULE_12__["CurrentGovernmentEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_9__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    AddupdateCurrentGovernmentEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-addupdate-current-government-entry",
            template: __webpack_require__(/*! raw-loader!./addupdate-current-government-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.html"),
            styles: [__webpack_require__(/*! ./addupdate-current-government-entry.component.css */ "./src/app/content/camparetive/current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
            src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_10__["ComparativeTargetEntryService"],
            src_app_Shared_Service_Comperative_current_government_entry_service__WEBPACK_IMPORTED_MODULE_12__["CurrentGovernmentEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_9__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], AddupdateCurrentGovernmentEntryComponent);
    return AddupdateCurrentGovernmentEntryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/current-government-entry/current-government-entry.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/content/camparetive/current-government-entry/current-government-entry.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvY3VycmVudC1nb3Zlcm5tZW50LWVudHJ5L2N1cnJlbnQtZ292ZXJubWVudC1lbnRyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/current-government-entry/current-government-entry.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/content/camparetive/current-government-entry/current-government-entry.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: CurrentGovernmentEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentGovernmentEntryComponent", function() { return CurrentGovernmentEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_current_government_entry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/current-government-entry.service */ "./src/app/Shared/Service/Comperative/current-government-entry.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");











var CurrentGovernmentEntryComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function CurrentGovernmentEntryComponent(_parentComponent, _CurrentGovernmentEntryService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._CurrentGovernmentEntryService = _CurrentGovernmentEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            // "KPICategoryName",
            "YearName",
            "MonthName",
            "ModifiedDate",
            "modifiedbyName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            // { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
            { Value: "modifiedbyName", Text: "Created By" },
            { Value: "MonthName", Text: "Month" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/camparative/current-government-entry", "/camparative/current-government-entry/add", "", "/camparative/current-government-entry/update");
        this.ebookletEnumProd = src_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__["EbookletEnum"];
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("Departmental Achievements Entry List:", "add", "Add", "camparative/current-government-entry/add")
            : this._parentComponent.setpagelayout("Departmental Achievements Entry List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    CurrentGovernmentEntryComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    CurrentGovernmentEntryComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CurrentGovernmentEntryComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CurrentGovernmentEntryComponent.prototype.GetList = function () {
        var _this = this;
        this._CurrentGovernmentEntryService.GetList(this.indexModel, this.ebookletEnumProd.EbookletCategory).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
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
    CurrentGovernmentEntryComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._CurrentGovernmentEntryService.ChangeActiveStatus(id).subscribe(function (data) {
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
    CurrentGovernmentEntryComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    CurrentGovernmentEntryComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
        this.GetList();
    };
    CurrentGovernmentEntryComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_current_government_entry_service__WEBPACK_IMPORTED_MODULE_8__["CurrentGovernmentEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], CurrentGovernmentEntryComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CurrentGovernmentEntryComponent.prototype, "sort", void 0);
    CurrentGovernmentEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-current-government-entry',
            template: __webpack_require__(/*! raw-loader!./current-government-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/current-government-entry/current-government-entry.component.html"),
            styles: [__webpack_require__(/*! ./current-government-entry.component.css */ "./src/app/content/camparetive/current-government-entry/current-government-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_Comperative_current_government_entry_service__WEBPACK_IMPORTED_MODULE_8__["CurrentGovernmentEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], CurrentGovernmentEntryComponent);
    return CurrentGovernmentEntryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.css":
/*!*******************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.css ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZGVwYXJ0bWVudGFsLXByb2dyZXNzL2FkZC11cGRhdGUtZGVwYXJ0bWVudGFsLXByb2dyZXNzL2FkZC11cGRhdGUtZGVwYXJ0bWVudGFsLXByb2dyZXNzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.ts":
/*!******************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.ts ***!
  \******************************************************************************************************************************************/
/*! exports provided: AddUpdateDepartmentalProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateDepartmentalProgressComponent", function() { return AddUpdateDepartmentalProgressComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_departmental_progress_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/departmental-progress-model */ "./src/app/Shared/Model/Camparetive/departmental-progress-model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_departmental_progress_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/departmental-progress.service */ "./src/app/Shared/Service/Comperative/departmental-progress.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");












var AddUpdateDepartmentalProgressComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddUpdateDepartmentalProgressComponent(_parentApi, _departmentalProgressService, _alertService, _router, _route, _commonService) {
        this._parentApi = _parentApi;
        this._departmentalProgressService = _departmentalProgressService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this._commonService = _commonService;
        this.listModel = [];
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.year = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.parameterCategory = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", null);
        this.Month = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.category = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.isDuplicate = false;
        this.ebookletEnum = src_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_11__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_11__["EbookletEnum"];
        this.model = new src_app_Shared_Model_Camparetive_departmental_progress_model__WEBPACK_IMPORTED_MODULE_2__["DepartmentalProgressModel"]();
        this.id = this._route.snapshot.params.id;
        if (this.id) {
            this.model.Id = this.id;
            this.GetById();
            this._parentApi.setpagelayout("Update Departmental Progress Entry :", "keyboard_backspace", "Back To List", "camparative/departmental-progress");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add Departmental Progress Entry :", "keyboard_backspace", "Back To List", "camparative/departmental-progress");
            this.title = "Add";
        }
    }
    //#endregion
    //#region << Method >>
    AddUpdateDepartmentalProgressComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    AddUpdateDepartmentalProgressComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].CurrentGovernmentEntryDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                if (_this.dDLList.ddlComparativeParameterCategory) {
                    _this.dDLList.ddlComparativeParameterCategory = _this.dDLList.ddlComparativeParameterCategory.filter(function (x) { return x.Value != _this.ebookletEnum.EbookletCategory; });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDepartmentalProgressComponent.prototype.getKPIList = function (code, isEdit) {
        if (isEdit === void 0) { isEdit = false; }
        this.isDuplicateData();
    };
    AddUpdateDepartmentalProgressComponent.prototype.GetById = function () {
        var _this = this;
        this._departmentalProgressService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.updateModel = new src_app_Shared_Model_Camparetive_departmental_progress_model__WEBPACK_IMPORTED_MODULE_2__["DepartmentalProgressModel"]();
                _this.updateModel.Id = _this.model.Id;
                _this.updateModel.DepartmentCode = _this.model.DepartmentCode;
                _this.updateModel.YearCode = _this.model.YearCode;
                _this.updateModel.MonthCode = _this.model.MonthCode;
                if (_this.model.DepartmentCode) {
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.YearCode) {
                    _this.model.YearCode = String(_this.model.YearCode);
                }
                if (_this.model.MonthCode) {
                    _this.model.MonthCode = String(_this.model.MonthCode);
                }
                if (_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = String(_this.model.ParameterCategoryCode);
                }
                _this.listModel = (_this.model.DepartmentalProgressParameterMappingModel);
                _this.updateModel.DepartmentalProgressParameterMappingModel = _this.model.DepartmentalProgressParameterMappingModel;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDepartmentalProgressComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.year.markAsTouched();
        this.parameterCategory.markAsTouched();
        this.Month.markAsTouched();
        this.category.markAsTouched();
        if (this.department.valid &&
            this.year.valid &&
            this.parameterCategory.valid &&
            this.category.valid &&
            this.Month.valid) {
            this.model.DepartmentalProgressParameterMappingModel = this.listModel;
            if (this.model.Id) {
                this._departmentalProgressService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/departmental-progress"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._departmentalProgressService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/departmental-progress"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
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
    AddUpdateDepartmentalProgressComponent.prototype.isDuplicateData = function () {
        var _this = this;
        this._departmentalProgressService.isDuplicateData(this.model).subscribe(function (data) {
            if (data.IsSuccess) {
                if (data.Data) {
                    var temp = data.Data;
                    _this.model.Id = temp.Id;
                    _this.listModel = (temp.DepartmentalProgressParameterMappingModel);
                }
                else {
                    _this.model.Id = _this.id;
                    if (!_this.model.Id) {
                    }
                    else if (_this.updateModel.Id == _this.model.Id &&
                        _this.model.ParameterCategoryCode == _this.updateModel.KPICategoryCode &&
                        _this.model.DepartmentCode == _this.updateModel.DepartmentCode) {
                        _this.listModel = (_this.updateModel.DepartmentalProgressParameterMappingModel);
                    }
                }
            }
            else {
                _this.model.Id = _this.id;
                if (!_this.model.Id) {
                    var temp = data.Data;
                    _this.listModel = (temp.DepartmentalProgressParameterMappingModel);
                }
                else if (_this.updateModel.Id == _this.model.Id &&
                    _this.model.YearCode == _this.updateModel.YearCode &&
                    _this.model.MonthCode == _this.updateModel.MonthCode &&
                    _this.model.ParameterCategoryCode == _this.updateModel.ParameterCategoryCode &&
                    _this.model.DepartmentCode == _this.updateModel.DepartmentCode) {
                    _this.listModel = (_this.updateModel.DepartmentalProgressParameterMappingModel);
                }
                else {
                    var temp = data.Data;
                    _this.listModel = (temp.DepartmentalProgressParameterMappingModel);
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDepartmentalProgressComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_departmental_progress_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentalProgressService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] }
    ]; };
    AddUpdateDepartmentalProgressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-update-departmental-progress',
            template: __webpack_require__(/*! raw-loader!./add-update-departmental-progress.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.html"),
            styles: [__webpack_require__(/*! ./add-update-departmental-progress.component.css */ "./src/app/content/camparetive/departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_Comperative_departmental_progress_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentalProgressService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], AddUpdateDepartmentalProgressComponent);
    return AddUpdateDepartmentalProgressComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/departmental-progress/departmental-progress.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/content/camparetive/departmental-progress/departmental-progress.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZGVwYXJ0bWVudGFsLXByb2dyZXNzL2RlcGFydG1lbnRhbC1wcm9ncmVzcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/departmental-progress/departmental-progress.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/content/camparetive/departmental-progress/departmental-progress.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: DepartmentalProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentalProgressComponent", function() { return DepartmentalProgressComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_departmental_progress_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/departmental-progress.service */ "./src/app/Shared/Service/Comperative/departmental-progress.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");











var DepartmentalProgressComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function DepartmentalProgressComponent(_parentComponent, _departmentalProgressService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._departmentalProgressService = _departmentalProgressService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "YearName",
            "MonthName",
            "ModifiedDate",
            "modifiedbyName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "YearName", Text: "Year Name" },
            { Value: "modifiedbyName", Text: "Created By" },
            { Value: "MonthName", Text: "Month" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "YearName", Text: "Year Name" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/camparative/departmental-progress", "/camparative/departmental-progress/add", "", "/camparative/departmental-progress/update");
        this.ebookletEnumProd = src_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__["EbookletEnum"];
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("Departmental Progress Entry List:", "add", "Add", "camparative/departmental-progress/add")
            : this._parentComponent.setpagelayout("Departmental Progress Entry List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    DepartmentalProgressComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    DepartmentalProgressComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DepartmentalProgressComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DepartmentalProgressComponent.prototype.GetList = function () {
        var _this = this;
        this._departmentalProgressService.GetList(this.indexModel, this.ebookletEnumProd.EbookletCategory).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
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
    DepartmentalProgressComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._departmentalProgressService.ChangeActiveStatus(id).subscribe(function (data) {
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
    DepartmentalProgressComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    DepartmentalProgressComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
        this.GetList();
    };
    DepartmentalProgressComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_departmental_progress_service__WEBPACK_IMPORTED_MODULE_8__["DepartmentalProgressService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], DepartmentalProgressComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], DepartmentalProgressComponent.prototype, "sort", void 0);
    DepartmentalProgressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-departmental-progress',
            template: __webpack_require__(/*! raw-loader!./departmental-progress.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/departmental-progress/departmental-progress.component.html"),
            styles: [__webpack_require__(/*! ./departmental-progress.component.css */ "./src/app/content/camparetive/departmental-progress/departmental-progress.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_Comperative_departmental_progress_service__WEBPACK_IMPORTED_MODULE_8__["DepartmentalProgressService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], DepartmentalProgressComponent);
    return DepartmentalProgressComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.css":
/*!*******************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.css ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZGlzdHJpY3QtcHJvZ3Jlc3MvYWRkLXVwZGF0ZS1kaXN0cmljdC1wcm9ncmVzcy9hZGQtdXBkYXRlLWRpc3RyaWN0LXByb2dyZXNzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: AddUpdateDistrictProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateDistrictProgressComponent", function() { return AddUpdateDistrictProgressComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_district_progress_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/district-progress-model */ "./src/app/Shared/Model/Camparetive/district-progress-model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_district_progress_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/district-progress.service */ "./src/app/Shared/Service/Comperative/district-progress.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");














var AddUpdateDistrictProgressComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddUpdateDistrictProgressComponent(_parentApi, _districtProgressService, _alertService, _router, _route, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._districtProgressService = _districtProgressService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.listModel = [];
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.year = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.Month = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.isDuplicate = false;
        this.ebookletEnum = src_environments_environment__WEBPACK_IMPORTED_MODULE_12__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_13__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_13__["EbookletEnum"];
        this.model = new src_app_Shared_Model_Camparetive_district_progress_model__WEBPACK_IMPORTED_MODULE_2__["DistrictProgressModel"]();
        this.id = this._route.snapshot.params.id;
        if (this.id) {
            this.model.Id = this.id;
            this.GetById();
            this._parentApi.setpagelayout("Update District Progress Entry :", "keyboard_backspace", "Back To List", "camparative/district-progress");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add District Progress Entry :", "keyboard_backspace", "Back To List", "camparative/district-progress");
            this.title = "Add";
            // this.GetAllParameterList();
        }
    }
    //#endregion
    //#region << Method >>
    AddUpdateDistrictProgressComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getDepartment();
    };
    AddUpdateDistrictProgressComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].CurrentGovernmentEntryDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                if (_this.dDLList.ddlComparativeParameterCategory) {
                    _this.dDLList.ddlComparativeParameterCategory = _this.dDLList.ddlComparativeParameterCategory.filter(function (x) { return x.Value != _this.ebookletEnum.EbookletCategory; });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDistrictProgressComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDistrictProgressComponent.prototype.getKPIList = function (code, isEdit) {
        if (isEdit === void 0) { isEdit = false; }
        if (!isEdit) {
            this.isDuplicateData();
        }
    };
    AddUpdateDistrictProgressComponent.prototype.GetById = function () {
        var _this = this;
        this._districtProgressService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.updateModel = new src_app_Shared_Model_Camparetive_district_progress_model__WEBPACK_IMPORTED_MODULE_2__["DistrictProgressModel"]();
                if (!_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = _this.updateModel.ParameterCategoryCode;
                }
                _this.updateModel.Id = _this.model.Id;
                _this.updateModel.ParameterCategoryCode = _this.model.ParameterCategoryCode;
                _this.updateModel.DepartmentCode = _this.model.DepartmentCode;
                _this.updateModel.YearCode = _this.model.YearCode;
                _this.updateModel.MonthCode = _this.model.MonthCode;
                if (_this.model.DepartmentCode) {
                    _this.getKPIList(_this.model.DepartmentCode, true);
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = String(_this.model.ParameterCategoryCode);
                }
                if (_this.model.YearCode) {
                    _this.model.YearCode = String(_this.model.YearCode);
                }
                if (_this.model.MonthCode) {
                    _this.model.MonthCode = String(_this.model.MonthCode);
                }
                _this.listModel = (_this.model.DistrictProgressParameterMappingModel);
                _this.updateModel.DistrictProgressParameterMappingModel = _this.model.DistrictProgressParameterMappingModel;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDistrictProgressComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.year.markAsTouched();
        this.Month.markAsTouched();
        if (this.department.valid &&
            this.year.valid &&
            this.Month.valid) {
            this.model.DistrictProgressParameterMappingModel = this.listModel;
            if (this.model.Id) {
                this._districtProgressService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/district-progress"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._districtProgressService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/district-progress"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
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
    AddUpdateDistrictProgressComponent.prototype.GetAllParameterList = function (kPICode, dpt) {
        var _this = this;
        if (kPICode === void 0) { kPICode = 0; }
        if (dpt === void 0) { dpt = 0; }
        if (this.updateModel &&
            this.updateModel.Id == this.model.Id &&
            this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode &&
            this.model.DepartmentCode == this.updateModel.DepartmentCode) {
            this.listModel = (this.updateModel.DistrictProgressParameterMappingModel);
            return;
        }
        this._districtProgressService
            .GetAllParameterList(kPICode, dpt, Number(this.model.ParameterCategoryCode))
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
        this.isDuplicateData();
    };
    AddUpdateDistrictProgressComponent.prototype.isDuplicateData = function () {
        var _this = this;
        if (this.model.DepartmentCode && this.model.YearCode && this.model.MonthCode) {
            this._districtProgressService.isDuplicateData(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data) {
                        var temp = data.Data;
                        _this.model.Id = temp.Id;
                        _this.listModel = (temp.DistrictProgressParameterMappingModel);
                    }
                    else {
                        _this.model.Id = _this.id;
                        if (!_this.model.Id) {
                            // this.GetAllParameterList(
                            //   this.model.KPICategoryCode,
                            //   this.model.DepartmentCode
                            // );
                        }
                        else if (_this.updateModel.Id == _this.model.Id &&
                            _this.model.ParameterCategoryCode == _this.updateModel.ParameterCategoryCode //&&
                        // this.model.DepartmentCode == this.updateModel.DepartmentCode
                        ) {
                            _this.listModel = (_this.updateModel.DistrictProgressParameterMappingModel);
                        }
                    }
                }
                else {
                    _this.model.Id = _this.id;
                    if (!_this.model.Id) {
                        // this.GetAllParameterList(
                        //   this.model.KPICategoryCode,
                        //   this.model.DepartmentCode
                        // );
                    }
                    else if (_this.updateModel.Id == _this.model.Id &&
                        _this.model.ParameterCategoryCode == _this.updateModel.ParameterCategoryCode //&&
                    // this.model.DepartmentCode == this.updateModel.DepartmentCode
                    ) {
                        _this.listModel = (_this.updateModel.DistrictProgressParameterMappingModel);
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    AddUpdateDistrictProgressComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_district_progress_service__WEBPACK_IMPORTED_MODULE_5__["DistrictProgressService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] }
    ]; };
    AddUpdateDistrictProgressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-update-district-progress',
            template: __webpack_require__(/*! raw-loader!./add-update-district-progress.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.html"),
            styles: [__webpack_require__(/*! ./add-update-district-progress.component.css */ "./src/app/content/camparetive/district-progress/add-update-district-progress/add-update-district-progress.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_Comperative_district_progress_service__WEBPACK_IMPORTED_MODULE_5__["DistrictProgressService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"]])
    ], AddUpdateDistrictProgressComponent);
    return AddUpdateDistrictProgressComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/district-progress/district-progress.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/content/camparetive/district-progress/district-progress.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZGlzdHJpY3QtcHJvZ3Jlc3MvZGlzdHJpY3QtcHJvZ3Jlc3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/camparetive/district-progress/district-progress.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/content/camparetive/district-progress/district-progress.component.ts ***!
  \**************************************************************************************/
/*! exports provided: DistrictProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictProgressComponent", function() { return DistrictProgressComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_district_progress_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/district-progress.service */ "./src/app/Shared/Service/Comperative/district-progress.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");











var DistrictProgressComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function DistrictProgressComponent(_parentComponent, _districtProgressService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._districtProgressService = _districtProgressService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "YearName",
            "MonthName",
            "ModifiedDate",
            "modifiedbyName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "District" },
            { Value: "YearName", Text: "Year Name" },
            { Value: "modifiedbyName", Text: "Created By" },
            { Value: "MonthName", Text: "Month" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.DepartmentProgressPermission = this._commonService.GetPagePermission("/camparative/district-progress", "/camparative/district-progress/add", "", "/camparative/district-progress/update");
        this.ebookletEnumProd = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_5__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_5__["EbookletEnum"];
        this.DepartmentProgressPermission.AddPageAccess
            ? this._parentComponent.setpagelayout("District Progress List:", "add", "Add", "camparative/district-progress/add")
            : this._parentComponent.setpagelayout("District Progress List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    DistrictProgressComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    DistrictProgressComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DistrictProgressComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DistrictProgressComponent.prototype.GetList = function () {
        var _this = this;
        this._districtProgressService.GetList(this.indexModel, this.ebookletEnumProd.EbookletCategory).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
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
    DistrictProgressComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._districtProgressService.ChangeActiveStatus(id).subscribe(function (data) {
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
    DistrictProgressComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    DistrictProgressComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
        this.GetList();
    };
    DistrictProgressComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_district_progress_service__WEBPACK_IMPORTED_MODULE_7__["DistrictProgressService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_8__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], DistrictProgressComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], DistrictProgressComponent.prototype, "sort", void 0);
    DistrictProgressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-district-progress',
            template: __webpack_require__(/*! raw-loader!./district-progress.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/district-progress/district-progress.component.html"),
            styles: [__webpack_require__(/*! ./district-progress.component.css */ "./src/app/content/camparetive/district-progress/district-progress.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            src_app_Shared_Service_Comperative_district_progress_service__WEBPACK_IMPORTED_MODULE_7__["DistrictProgressService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_8__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], DistrictProgressComponent);
    return DistrictProgressComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.css":
/*!*************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.css ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZGlzdHJpY3RrcGkvYWRkLXVwZGF0ZS1kaXN0cmljdGtwaS9hZGQtdXBkYXRlLWRpc3RyaWN0a3BpLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: AddUpdateDistrictkpiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUpdateDistrictkpiComponent", function() { return AddUpdateDistrictkpiComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_district_kpimodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/district-kpimodel */ "./src/app/Shared/Model/Camparetive/district-kpimodel.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-target-entry.service */ "./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_districtkpi_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/districtkpi.service */ "./src/app/Shared/Service/Comperative/districtkpi.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");













var AddUpdateDistrictkpiComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddUpdateDistrictkpiComponent(_parentApi, _ComparativeTargetEntryService, _DistrictkpiService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._ComparativeTargetEntryService = _ComparativeTargetEntryService;
        this._DistrictkpiService = _DistrictkpiService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.listModel = [];
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.year = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        // kpi = new FormControl("", [Validators.required]);
        this.Month = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.isDuplicate = false;
        this.model = new src_app_Shared_Model_Camparetive_district_kpimodel__WEBPACK_IMPORTED_MODULE_2__["DistrictKPIModel"]();
        this.id = this._route.snapshot.params.id;
        if (this.id) {
            this.model.Id = this.id;
            this.GetById();
            this._parentApi.setpagelayout("Update District-KPI Entry :", "keyboard_backspace", "Back To List", "camparative/district-kpi");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add District-KPI Entry :", "keyboard_backspace", "Back To List", "camparative/district-kpi");
            this.title = "Add";
            this.GetAllParameterList();
        }
    }
    //#endregion
    //#region << Method >>
    AddUpdateDistrictkpiComponent.prototype.ngOnInit = function () {
        //this.FormGroupInit();
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getDepartment();
    };
    AddUpdateDistrictkpiComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_12__["AppSetting"].CurrentGovernmentEntryDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDistrictkpiComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDistrictkpiComponent.prototype.getKPIList = function (code, isEdit) {
        if (isEdit === void 0) { isEdit = false; }
        // this._commonService.GetKPIByDepartmentCode(Number(code)).subscribe(
        //   data => {
        //     if (data.IsSuccess) {
        //       
        //       this.ddlKPICategory = data.Data as DdlItemModel[];
        //     }
        //   },
        //   error => {
        //     this._alertService.error(error.message);
        //   }
        // );
        if (!isEdit) {
            //this.GetAllParameterList(0 , this.model.DepartmentCode);
            this.isDuplicateData();
        }
    };
    AddUpdateDistrictkpiComponent.prototype.GetById = function () {
        var _this = this;
        this._DistrictkpiService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.updateModel = new src_app_Shared_Model_Camparetive_district_kpimodel__WEBPACK_IMPORTED_MODULE_2__["DistrictKPIModel"]();
                if (!_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = _this.updateModel.ParameterCategoryCode;
                }
                _this.updateModel.Id = _this.model.Id;
                _this.updateModel.ParameterCategoryCode = _this.model.ParameterCategoryCode;
                _this.updateModel.DepartmentCode = _this.model.DepartmentCode;
                _this.updateModel.YearCode = _this.model.YearCode;
                _this.updateModel.MonthCode = _this.model.MonthCode;
                if (_this.model.DepartmentCode) {
                    _this.getKPIList(_this.model.DepartmentCode, true);
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.ParameterCategoryCode) {
                    _this.model.ParameterCategoryCode = String(_this.model.ParameterCategoryCode);
                }
                if (_this.model.YearCode) {
                    _this.model.YearCode = String(_this.model.YearCode);
                }
                if (_this.model.MonthCode) {
                    _this.model.MonthCode = String(_this.model.MonthCode);
                }
                _this.listModel = (_this.model.DistrictKPIParameterMappingModel);
                _this.updateModel.DistrictKPIParameterMappingModel = _this.model.DistrictKPIParameterMappingModel;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddUpdateDistrictkpiComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.year.markAsTouched();
        // this.kpi.markAsTouched();
        this.Month.markAsTouched();
        if (this.department.valid &&
            this.year.valid &&
            // this.kpi.valid &&
            this.Month.valid) {
            this.model.DistrictKPIParameterMappingModel = this.listModel;
            if (this.model.Id) {
                this._DistrictkpiService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/district-kpi"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._DistrictkpiService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/district-kpi"]);
                    }
                    else {
                        _this._commonService.ScrollingTop();
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
    AddUpdateDistrictkpiComponent.prototype.GetAllParameterList = function (kPICode, dpt) {
        var _this = this;
        if (kPICode === void 0) { kPICode = 0; }
        if (dpt === void 0) { dpt = 0; }
        if (this.updateModel &&
            this.updateModel.Id == this.model.Id &&
            this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode &&
            this.model.DepartmentCode == this.updateModel.DepartmentCode) {
            this.listModel = (this.updateModel.DistrictKPIParameterMappingModel);
            return;
        }
        //if (kPICode || dpt) {
        this._DistrictkpiService
            .GetAllParameterList(kPICode, dpt, Number(this.model.ParameterCategoryCode))
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
        // }
        //this.isDuplicateData();
    };
    AddUpdateDistrictkpiComponent.prototype.isDuplicateData = function () {
        var _this = this;
        if (
        // this.model.KPICategoryCode &&
        this.model.DepartmentCode && this.model.YearCode && this.model.MonthCode) {
            this._DistrictkpiService.isDuplicateData(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    if (data.Data) {
                        var temp = data.Data;
                        _this.model.Id = temp.Id;
                        _this.listModel = (temp.DistrictKPIParameterMappingModel);
                    }
                    else {
                        _this.model.Id = _this.id;
                        if (!_this.model.Id) {
                            // this.GetAllParameterList(
                            //   this.model.KPICategoryCode,
                            //   this.model.DepartmentCode
                            // );
                        }
                        else if (_this.updateModel.Id == _this.model.Id //&&
                        // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
                        // this.model.DepartmentCode == this.updateModel.DepartmentCode
                        ) {
                            _this.listModel = (_this.updateModel.DistrictKPIParameterMappingModel);
                        }
                    }
                }
                else {
                    _this.model.Id = _this.id;
                    if (!_this.model.Id) {
                        // this.GetAllParameterList(
                        //   this.model.KPICategoryCode,
                        //   this.model.DepartmentCode
                        // );
                    }
                    else if (_this.updateModel.Id == _this.model.Id //&&
                    // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
                    // this.model.DepartmentCode == this.updateModel.DepartmentCode
                    ) {
                        _this.listModel = (_this.updateModel.DistrictKPIParameterMappingModel);
                    }
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    AddUpdateDistrictkpiComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_5__["ComparativeTargetEntryService"] },
        { type: src_app_Shared_Service_Comperative_districtkpi_service__WEBPACK_IMPORTED_MODULE_6__["DistrictkpiService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"] }
    ]; };
    AddUpdateDistrictkpiComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-update-districtkpi',
            template: __webpack_require__(/*! raw-loader!./add-update-districtkpi.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.html"),
            styles: [__webpack_require__(/*! ./add-update-districtkpi.component.css */ "./src/app/content/camparetive/districtkpi/add-update-districtkpi/add-update-districtkpi.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_5__["ComparativeTargetEntryService"],
            src_app_Shared_Service_Comperative_districtkpi_service__WEBPACK_IMPORTED_MODULE_6__["DistrictkpiService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"]])
    ], AddUpdateDistrictkpiComponent);
    return AddUpdateDistrictkpiComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/districtkpi/districtkpi.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/content/camparetive/districtkpi/districtkpi.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZGlzdHJpY3RrcGkvZGlzdHJpY3RrcGkuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/camparetive/districtkpi/districtkpi.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/content/camparetive/districtkpi/districtkpi.component.ts ***!
  \**************************************************************************/
/*! exports provided: DistrictkpiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistrictkpiComponent", function() { return DistrictkpiComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_districtkpi_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/districtkpi.service */ "./src/app/Shared/Service/Comperative/districtkpi.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");














var DistrictkpiComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function DistrictkpiComponent(_parentComponent, _DistrictkpiService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._DistrictkpiService = _DistrictkpiService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            // "KPICategoryName",
            "YearName",
            "MonthName",
            "ModifiedDate",
            "modifiedbyName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "District" },
            // { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
            { Value: "modifiedbyName", Text: "Created By" },
            { Value: "MonthName", Text: "Month" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "YearName", Text: "Year Name" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/camparative/district-kpi", "/camparative/district-kpi/add", "", "/camparative/district-kpi/update");
        this.ebookletEnumProd = src_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_10__["EbookletEnum"];
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("District-KPI List:", "add", "Add", "camparative/district-kpi/add")
            : this._parentComponent.setpagelayout("District-KPI List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    DistrictkpiComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    DistrictkpiComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DistrictkpiComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    DistrictkpiComponent.prototype.GetList = function () {
        var _this = this;
        this._DistrictkpiService.GetList(this.indexModel, this.ebookletEnumProd.EbookletCategory).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
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
    DistrictkpiComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._DistrictkpiService.ChangeActiveStatus(id).subscribe(function (data) {
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
    DistrictkpiComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    DistrictkpiComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
        this.GetList();
    };
    DistrictkpiComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_districtkpi_service__WEBPACK_IMPORTED_MODULE_6__["DistrictkpiService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], DistrictkpiComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], DistrictkpiComponent.prototype, "sort", void 0);
    DistrictkpiComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-districtkpi',
            template: __webpack_require__(/*! raw-loader!./districtkpi.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/districtkpi/districtkpi.component.html"),
            styles: [__webpack_require__(/*! ./districtkpi.component.css */ "./src/app/content/camparetive/districtkpi/districtkpi.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_Comperative_districtkpi_service__WEBPACK_IMPORTED_MODULE_6__["DistrictkpiService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], DistrictkpiComponent);
    return DistrictkpiComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/e-booklet/e-booklet.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/camparetive/e-booklet/e-booklet.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvZS1ib29rbGV0L2UtYm9va2xldC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/e-booklet/e-booklet.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/camparetive/e-booklet/e-booklet.component.ts ***!
  \**********************************************************************/
/*! exports provided: EBookletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EBookletComponent", function() { return EBookletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Enum/ebooklet.enum */ "./src/app/Shared/Enum/ebooklet.enum.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_e_booklet_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/e-booklet.service */ "./src/app/Shared/Service/Comperative/e-booklet.service.ts");
/* harmony import */ var src_app_Shared_Model_Camparetive_e_booklet_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/e-booklet-model */ "./src/app/Shared/Model/Camparetive/e-booklet-model.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");













var EBookletComponent = /** @class */ (function () {
    //#endregion
    function EBookletComponent(fb, _commonService, _alertService, _eBookletService, _router, _route, _parentApi) {
        this.fb = fb;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._eBookletService = _eBookletService;
        this._router = _router;
        this._route = _route;
        this._parentApi = _parentApi;
        this.ebookletEnum = src_environments_environment__WEBPACK_IMPORTED_MODULE_12__["environment"].production ? src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_9__["EbookletEnumProd"] : src_app_Shared_Enum_ebooklet_enum__WEBPACK_IMPORTED_MODULE_9__["EbookletEnum"];
        this.Category = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.CategoryCode = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.model = new src_app_Shared_Model_Camparetive_e_booklet_model__WEBPACK_IMPORTED_MODULE_11__["EBookletFilterModel"]();
        this._parentApi.setpagelayout('E-Booklet Report :', "", "", "");
    }
    EBookletComponent.prototype.ngOnInit = function () {
        this.getDDLList();
    };
    EBookletComponent.prototype.getDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].DDlKeyForEbooklet).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_7__["GlobalMessagesModel"].InternalError);
        });
    };
    EBookletComponent.prototype.getBookletList = function () {
        var _this = this;
        if (this.model.CategoryWiseRadio == this.ebookletEnum.category) {
            this.model.DepartmentCode = 0;
            this.model.KPICategoryCode = 0;
        }
        if (this.model.CategoryWiseRadio == this.ebookletEnum.department) {
            this.model.BeneficiaryCategoryCode = 0;
            this.model.KPICategoryCode = 0;
        }
        if (this.model.CategoryWiseRadio == this.ebookletEnum.KPICategory) {
            this.model.BeneficiaryCategoryCode = 0;
            this.model.DepartmentCode = 0;
        }
        this._eBookletService.GetEbookLet(this.model).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dataModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    EBookletComponent.prototype.RadioChanges = function () {
        this.dataModel = new src_app_Shared_Model_Camparetive_e_booklet_model__WEBPACK_IMPORTED_MODULE_11__["EBookletResponseModel"]();
        if (this.model.CategoryWiseRadio == this.ebookletEnum.category) {
            this.model.DepartmentCode = 0;
            this.model.KPICategoryCode = 0;
        }
        if (this.model.CategoryWiseRadio == this.ebookletEnum.department) {
            this.model.BeneficiaryCategoryCode = 0;
            this.model.KPICategoryCode = 0;
        }
        if (this.model.CategoryWiseRadio == this.ebookletEnum.KPICategory) {
            this.model.BeneficiaryCategoryCode = 0;
            this.model.DepartmentCode = 0;
        }
    };
    EBookletComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_Comperative_e_booklet_service__WEBPACK_IMPORTED_MODULE_10__["EBookletService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] }
    ]; };
    EBookletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: "app-e-booklet",
            template: __webpack_require__(/*! raw-loader!./e-booklet.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/e-booklet/e-booklet.component.html"),
            styles: [__webpack_require__(/*! ./e-booklet.component.css */ "./src/app/content/camparetive/e-booklet/e-booklet.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_Comperative_e_booklet_service__WEBPACK_IMPORTED_MODULE_10__["EBookletService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]])
    ], EBookletComponent);
    return EBookletComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.css":
/*!*****************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.css ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".error-center\r\n{\r\nmargin: -10px 0px 15px 0px !important;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9jYW1wYXJldGl2ZS9tYXN0ZXIvY2FtcGFyYXRpdmUtcGFyYW1ldGVyLW1hc3Rlci9hZGR1cGRhdGVjYW1wYXJhdGl2ZS1wYXJhbWV0ZXIvYWRkdXBkYXRlY2FtcGFyYXRpdmUtcGFyYW1ldGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEscUNBQXFDO0FBQ3JDIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9jYW1wYXJldGl2ZS9tYXN0ZXIvY2FtcGFyYXRpdmUtcGFyYW1ldGVyLW1hc3Rlci9hZGR1cGRhdGVjYW1wYXJhdGl2ZS1wYXJhbWV0ZXIvYWRkdXBkYXRlY2FtcGFyYXRpdmUtcGFyYW1ldGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXJyb3ItY2VudGVyXHJcbntcclxubWFyZ2luOiAtMTBweCAwcHggMTVweCAwcHggIWltcG9ydGFudDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.ts":
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.ts ***!
  \****************************************************************************************************************************************************/
/*! exports provided: AddupdatecamparativeParameterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdatecamparativeParameterComponent", function() { return AddupdatecamparativeParameterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_comparative_parameter_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/comparative-parameter-model */ "./src/app/Shared/Model/Camparetive/comparative-parameter-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_parameter_master_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-parameter-master.service */ "./src/app/Shared/Service/Comperative/comparative-parameter-master.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Enum_scheme_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Enum/scheme.enum */ "./src/app/Shared/Enum/scheme.enum.ts");













var AddupdatecamparativeParameterComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddupdatecamparativeParameterComponent(_parentApi, _ComparativeParameterMasterService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._ComparativeParameterMasterService = _ComparativeParameterMasterService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.model = new src_app_Shared_Model_Camparetive_comparative_parameter_model__WEBPACK_IMPORTED_MODULE_4__["ComparativeParameterMasterModel"]();
        var id = this._route.snapshot.params.id;
        if (id) {
            this.model.Id = id;
            this.GetById();
            this._parentApi.setpagelayout("Update Parameter :", "keyboard_backspace", "Back To List", "camparative/camparativeparameter");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add Parameter :", "keyboard_backspace", "Back To List", "camparative/camparativeparameter");
            this.title = "Add";
        }
    }
    //#endregion
    //#region << Method >>
    AddupdatecamparativeParameterComponent.prototype.ngOnInit = function () {
        this.FormGroupInit();
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getDepartment();
    };
    AddupdatecamparativeParameterComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].ComparativeParameterDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatecamparativeParameterComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatecamparativeParameterComponent.prototype.GetById = function () {
        var _this = this;
        this._ComparativeParameterMasterService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.DepartmentCode) {
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                    _this.getSchemeList(_this.model.DepartmentCode);
                }
                if (_this.model.KPICategoryCode) {
                    _this.model.KPICategoryCode = String(_this.model.KPICategoryCode);
                }
                if (_this.model.SchemeCode) {
                    _this.model.SchemeCode = String(_this.model.SchemeCode);
                }
                if (_this.model.FinancialUnitCode) {
                    _this.model.FinancialUnitCode = String(_this.model.FinancialUnitCode);
                }
                if (_this.model.PhysicalUnitCode) {
                    _this.model.PhysicalUnitCode = String(_this.model.PhysicalUnitCode);
                }
                if (_this.model.YearGrandTotalCode) {
                    _this.model.YearGrandTotalCode = String(_this.model.YearGrandTotalCode);
                }
                if (_this.model.CategoryCode) {
                    _this.model.CategoryCode = String(_this.model.CategoryCode);
                }
                if (_this.model.TargetBasedCode) {
                    _this.model.TargetBasedCode = String(_this.model.TargetBasedCode);
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatecamparativeParameterComponent.prototype.SaveClick = function () {
        var _this = this;
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            if (this.model.Id) {
                this._ComparativeParameterMasterService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/camparativeparameter"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._ComparativeParameterMasterService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/camparativeparameter"]);
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
    AddupdatecamparativeParameterComponent.prototype.FormGroupInit = function () {
        this.formGroup = this.formBuilder.group({
            DepartmentCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            KPICategoryCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            Name: [null],
            NameHindi: [null],
            IsPhysical: [null],
            PhysicalUnitCode: [null],
            IsFinancial: [null],
            FinancialUnitCode: [null],
            IsDepartment: [null],
            IsDistrict: [null],
            IsConnectWithScheme: [null],
            SchemeCode: [null],
            Description2: [null],
            Description1: [null],
            YearGrandTotalCode: [null],
            BenificiaryList: [null],
            IsComparativeReport: [null],
            IsEbookletReport: [null],
            IsCompilationReport: [null],
            IsDistrictParameterReport: [null],
            DisplayOrder: [null],
            IsWebservice: [null],
            WebserviceUserName: [null],
            WebserviceURL: [null],
            WebServicePassword: [null],
            CategoryCode: [null],
            TargetBasedCode: [null],
            Weighted: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9.0-9]*$")]
        });
    };
    AddupdatecamparativeParameterComponent.prototype.getSchemeList = function ($event) {
        var _this = this;
        this._commonService.GetSchemeList(Number($event), src_app_Shared_Enum_scheme_enum__WEBPACK_IMPORTED_MODULE_12__["StatusEnum"].Active).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList.ddlSchemeName = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
        this._commonService.GetKPIByDepartmentCode(Number($event)).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlKPICategory = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatecamparativeParameterComponent.prototype.phynancialClick = function (events) {
        if (events) {
            this.formGroup.get("Name").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            this.formGroup.get("PhysicalUnitCode").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        }
        else {
            this.formGroup.get("Name").setValidators(null);
            this.formGroup.get("PhysicalUnitCode").setValidators(null);
        }
        this.formGroup.get("Name").updateValueAndValidity();
        this.formGroup.get("PhysicalUnitCode").updateValueAndValidity();
    };
    AddupdatecamparativeParameterComponent.prototype.financialClick = function (events) {
        if (events) {
            this.formGroup.get("NameHindi").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            this.formGroup.get("FinancialUnitCode").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        }
        else {
            this.formGroup.get("NameHindi").setValidators(null);
            this.formGroup.get("FinancialUnitCode").setValidators(null);
        }
        this.formGroup.get("NameHindi").updateValueAndValidity();
        this.formGroup.get("FinancialUnitCode").updateValueAndValidity();
    };
    AddupdatecamparativeParameterComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_comparative_parameter_master_service__WEBPACK_IMPORTED_MODULE_6__["ComparativeParameterMasterService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] }
    ]; };
    AddupdatecamparativeParameterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-addupdatecamparative-parameter",
            template: __webpack_require__(/*! raw-loader!./addupdatecamparative-parameter.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.html"),
            styles: [__webpack_require__(/*! ./addupdatecamparative-parameter.component.css */ "./src/app/content/camparetive/master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_Comperative_comparative_parameter_master_service__WEBPACK_IMPORTED_MODULE_6__["ComparativeParameterMasterService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"]])
    ], AddupdatecamparativeParameterComponent);
    return AddupdatecamparativeParameterComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.css":
/*!********************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.css ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-global-list-search {\r\n  width: 100%;\r\n  overflow: hidden;\r\n  margin-top: 10px;\r\n}\r\n.global_list_search {\r\n  margin: 0px 0px 15px 0px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9jYW1wYXJldGl2ZS9tYXN0ZXIvY2FtcGFyYXRpdmUtcGFyYW1ldGVyLW1hc3Rlci9jYW1wYXJhdGl2ZS1wYXJhbWV0ZXItbWFzdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usd0JBQXdCO0FBQzFCIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9jYW1wYXJldGl2ZS9tYXN0ZXIvY2FtcGFyYXRpdmUtcGFyYW1ldGVyLW1hc3Rlci9jYW1wYXJhdGl2ZS1wYXJhbWV0ZXItbWFzdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZ2xvYmFsLWxpc3Qtc2VhcmNoIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuLmdsb2JhbF9saXN0X3NlYXJjaCB7XHJcbiAgbWFyZ2luOiAwcHggMHB4IDE1cHggMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: CamparativeParameterMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamparativeParameterMasterComponent", function() { return CamparativeParameterMasterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_parameter_master_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-parameter-master.service */ "./src/app/Shared/Service/Comperative/comparative-parameter-master.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");









var CamparativeParameterMasterComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function CamparativeParameterMasterComponent(_parentComponent, _ComparativeParameterMasterService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._ComparativeParameterMasterService = _ComparativeParameterMasterService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "PhysicalParameter",
            "FinancialParameter",
            "DepartmentTitle",
            "KPICategoryName",
            "Description1",
            "Description2",
            "IsFinancial",
            "IsPhysical",
            // "IsDepartment",
            // "IsDistrict",
            "SchemeName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "PhysicalParameter", Text: "Physical Parameter Name" },
            { Value: "FinancialParameter", Text: "Financial Parameter Name" },
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "SchemeName", Text: "Scheme" },
            { Value: "Description1", Text: "Description 1" },
            { Value: "Description2", Text: "Description 2" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "SchemeName", Text: "Scheme" },
            { Value: "Description1", Text: "Description 1" },
            { Value: "Description2", Text: "Description 2" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/camparative/camparativeparameter", "/camparative/camparativeparameter/add", "", "/camparative/camparativeparameter/update");
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("Parameter  List:", "add", "Add", "camparative/add")
            : this._parentComponent.setpagelayout("Camparative Parameter  List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    CamparativeParameterMasterComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.GetDDLList();
    };
    CamparativeParameterMasterComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].ComparativeParameterDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    CamparativeParameterMasterComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CamparativeParameterMasterComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CamparativeParameterMasterComponent.prototype.GetList = function () {
        var _this = this;
        if (this.parameterCategoryCode) {
            this.indexModel.AdvanceSearchModel = {
                parameterCategoryCode: this.parameterCategoryCode
            };
        }
        else {
            this.indexModel.AdvanceSearchModel = null;
        }
        ;
        this._ComparativeParameterMasterService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
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
    CamparativeParameterMasterComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._ComparativeParameterMasterService.ChangeActiveStatus(id).subscribe(function (data) {
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
    CamparativeParameterMasterComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    CamparativeParameterMasterComponent.prototype.onClearclick = function () {
        this.parameterCategoryCode = null;
    };
    CamparativeParameterMasterComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_comparative_parameter_master_service__WEBPACK_IMPORTED_MODULE_6__["ComparativeParameterMasterService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], CamparativeParameterMasterComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CamparativeParameterMasterComponent.prototype, "sort", void 0);
    CamparativeParameterMasterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-camparative-parameter-master",
            template: __webpack_require__(/*! raw-loader!./camparative-parameter-master.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.html"),
            styles: [__webpack_require__(/*! ./camparative-parameter-master.component.css */ "./src/app/content/camparetive/master/camparative-parameter-master/camparative-parameter-master.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_Comperative_comparative_parameter_master_service__WEBPACK_IMPORTED_MODULE_6__["ComparativeParameterMasterService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], CamparativeParameterMasterComponent);
    return CamparativeParameterMasterComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.css":
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.css ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvbWFzdGVyL2NhbXBhcmF0aXZlLXllYXItbWFzdGVyL2FkZHVwZGF0ZWNvbXBhcmF0aXZlLXllYXItbWFzdGVyL2FkZHVwZGF0ZWNvbXBhcmF0aXZlLXllYXItbWFzdGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.ts":
/*!***************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: AddupdatecomparativeYearMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdatecomparativeYearMasterComponent", function() { return AddupdatecomparativeYearMasterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_comparative_year_master_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/comparative-year-master-model */ "./src/app/Shared/Model/Camparetive/comparative-year-master-model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_year_master_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-year-master.service */ "./src/app/Shared/Service/Comperative/comparative-year-master.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");








var AddupdatecomparativeYearMasterComponent = /** @class */ (function () {
    //#endregion <Variable>
    //#region <Constructor>
    function AddupdatecomparativeYearMasterComponent(_dialogRef, _alertService, _ComparativeYearMasterService, _commonService, data) {
        this._dialogRef = _dialogRef;
        this._alertService = _alertService;
        this._ComparativeYearMasterService = _ComparativeYearMasterService;
        this._commonService = _commonService;
        this.data = data;
        this.YearName = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.title = "Add";
        if (data) {
            this.id = data;
            this.GetById();
            this.title = "Update";
        }
        else {
            this.model = new src_app_Shared_Model_Camparetive_comparative_year_master_model__WEBPACK_IMPORTED_MODULE_3__["YearMasterModel"]();
            this.title = "Add";
        }
    }
    //#endregion <Constructor>
    //#region <Method>
    AddupdatecomparativeYearMasterComponent.prototype.ngOnInit = function () {
    };
    AddupdatecomparativeYearMasterComponent.prototype.GetById = function () {
        var _this = this;
        this._ComparativeYearMasterService.GetById(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                // if (this.model.IsDepartment){
                //   this.model.IsDepartment = String(this.model.IsDepartment);
                // }
                // if (this.model.IsDistrict){
                //   this.model.IsDistrict = String(this.model.IsDistrict);
                // }
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_Camparetive_comparative_year_master_model__WEBPACK_IMPORTED_MODULE_3__["YearMasterModel"]();
            _this._alertService.error(error.message);
        });
    };
    AddupdatecomparativeYearMasterComponent.prototype.SaveClick = function () {
        var _this = this;
        this.YearName.markAsTouched();
        if (this.YearName.valid) {
            if (this.model.Id) {
                this._ComparativeYearMasterService.Edit(this.model).subscribe(function (data) {
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
                this._ComparativeYearMasterService.Add(this.model).subscribe(function (data) {
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
    AddupdatecomparativeYearMasterComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AddupdatecomparativeYearMasterComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_Comperative_comparative_year_master_service__WEBPACK_IMPORTED_MODULE_6__["ComparativeYearMasterService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AddupdatecomparativeYearMasterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-addupdatecomparative-year-master',
            template: __webpack_require__(/*! raw-loader!./addupdatecomparative-year-master.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.html"),
            styles: [__webpack_require__(/*! ./addupdatecomparative-year-master.component.css */ "./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_Comperative_comparative_year_master_service__WEBPACK_IMPORTED_MODULE_6__["ComparativeYearMasterService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], Object])
    ], AddupdatecomparativeYearMasterComponent);
    return AddupdatecomparativeYearMasterComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvbWFzdGVyL2NhbXBhcmF0aXZlLXllYXItbWFzdGVyL2NhbXBhcmF0aXZlLXllYXItbWFzdGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: CamparativeYearMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamparativeYearMasterComponent", function() { return CamparativeYearMasterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_year_master_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-year-master.service */ "./src/app/Shared/Service/Comperative/comparative-year-master.service.ts");
/* harmony import */ var _addupdatecomparative_year_master_addupdatecomparative_year_master_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addupdatecomparative-year-master/addupdatecomparative-year-master.component */ "./src/app/content/camparetive/master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component.ts");










var CamparativeYearMasterComponent = /** @class */ (function () {
    //#endregion <Variable>
    //#region <Constructor>
    function CamparativeYearMasterComponent(_ComparativeYearMasterService, _commonService, _alertService, _parentApi, _dialog) {
        this._ComparativeYearMasterService = _ComparativeYearMasterService;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "YearName",
            "Remarks",
            "IsCurrentGovernment",
            "OrderBy",
            "IsActive",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "YearName", Text: "Year" },
            { Value: "Remarks", Text: "Remarks" },
            { Value: "OrderBy", Text: "OrderBy" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/camparative/yearmaster", "/camparative/yearmaster/add", "", "/camparative/yearmaster/edit");
        this._parentApi.setpagelayout("", "", "", "", true);
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_5__["IndexModel"]();
    }
    //#endregion <Constructor>
    //#region <Method>
    CamparativeYearMasterComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    CamparativeYearMasterComponent.prototype.GetList = function () {
        var _this = this;
        this._ComparativeYearMasterService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
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
    CamparativeYearMasterComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CamparativeYearMasterComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    CamparativeYearMasterComponent.prototype.openDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_addupdatecomparative_year_master_addupdatecomparative_year_master_component__WEBPACK_IMPORTED_MODULE_9__["AddupdatecomparativeYearMasterComponent"], {
            width: "500px",
            data: Id,
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    CamparativeYearMasterComponent.prototype.onActiveStatus = function (id) {
        var _this = this;
        // this._commonService.GenerateOTP().subscribe(
        //   data => {
        //     if (data.IsSuccess) {
        //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
        //         width: "500px",
        //         disableClose: true
        //       });
        //       _dialogRef.afterClosed().subscribe((result: boolean) => {
        //         if (result) {
        this._ComparativeYearMasterService.ChangeActiveStatus(id).subscribe(function (data) {
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
        //         }
        //       });
        //     } else {
        //       this._alertService.error(data.Message);
        //     }
        //   },
        //   error => {
        //     this._alertService.error(error.message);
        //   }
        // );
    };
    CamparativeYearMasterComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_Comperative_comparative_year_master_service__WEBPACK_IMPORTED_MODULE_8__["ComparativeYearMasterService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], CamparativeYearMasterComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], CamparativeYearMasterComponent.prototype, "sort", void 0);
    CamparativeYearMasterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-camparative-year-master',
            template: __webpack_require__(/*! raw-loader!./camparative-year-master.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.html"),
            styles: [__webpack_require__(/*! ./camparative-year-master.component.css */ "./src/app/content/camparetive/master/camparative-year-master/camparative-year-master.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_Comperative_comparative_year_master_service__WEBPACK_IMPORTED_MODULE_8__["ComparativeYearMasterService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], CamparativeYearMasterComponent);
    return CamparativeYearMasterComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.css":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvbWFzdGVyL2twaS1jYXRlZ29yeS9hZGR1cGRhdGVrcGktY2F0ZWdvcnkvYWRkdXBkYXRla3BpLWNhdGVnb3J5LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: AddupdatekpiCategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdatekpiCategoryComponent", function() { return AddupdatekpiCategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_Camparetive_kpicategory_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/kpicategory-model */ "./src/app/Shared/Model/Camparetive/kpicategory-model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_kpi_category_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/kpi-category.service */ "./src/app/Shared/Service/Comperative/kpi-category.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");










var AddupdatekpiCategoryComponent = /** @class */ (function () {
    //#endregion <Variable>
    //#region <Constructor>
    function AddupdatekpiCategoryComponent(_dialogRef, _alertService, _KpiCategoryService, _commonService, _userService, _authService, data) {
        this._dialogRef = _dialogRef;
        this._alertService = _alertService;
        this._KpiCategoryService = _KpiCategoryService;
        this._commonService = _commonService;
        this._userService = _userService;
        this._authService = _authService;
        this.data = data;
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.Name = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.NameHindi = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.title = "Add";
        if (data) {
            this.id = data;
            this.GetById();
            this.title = "Update";
        }
        else {
            this.model = new src_app_Shared_Model_Camparetive_kpicategory_model__WEBPACK_IMPORTED_MODULE_3__["KPICategoryMasterModel"]();
            this.title = "Add";
        }
    }
    //#endregion <Constructor>
    //#region <Method>
    AddupdatekpiCategoryComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getDepartment();
    };
    AddupdatekpiCategoryComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatekpiCategoryComponent.prototype.GetById = function () {
        var _this = this;
        this._KpiCategoryService.GetById(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.DepartmentCode) {
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                // if (this.model.IsDistrict){
                //   this.model.IsDistrict = String(this.model.IsDistrict);
                // }
            }
        }, function (error) {
            _this.model = new src_app_Shared_Model_Camparetive_kpicategory_model__WEBPACK_IMPORTED_MODULE_3__["KPICategoryMasterModel"]();
            _this._alertService.error(error.message);
        });
    };
    AddupdatekpiCategoryComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.Name.markAsTouched();
        this.NameHindi.markAsTouched();
        if (this.Name.valid && this.NameHindi.valid && this.department.valid) {
            if (this.model.Id) {
                this._KpiCategoryService.Edit(this.model).subscribe(function (data) {
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
                this._KpiCategoryService.Add(this.model).subscribe(function (data) {
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
    AddupdatekpiCategoryComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    AddupdatekpiCategoryComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_Comperative_kpi_category_service__WEBPACK_IMPORTED_MODULE_6__["KpiCategoryService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AddupdatekpiCategoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-addupdatekpi-category',
            template: __webpack_require__(/*! raw-loader!./addupdatekpi-category.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.html"),
            styles: [__webpack_require__(/*! ./addupdatekpi-category.component.css */ "./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_Comperative_kpi_category_service__WEBPACK_IMPORTED_MODULE_6__["KpiCategoryService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"], Object])
    ], AddupdatekpiCategoryComponent);
    return AddupdatekpiCategoryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/master/kpi-category/kpi-category.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/content/camparetive/master/kpi-category/kpi-category.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvbWFzdGVyL2twaS1jYXRlZ29yeS9rcGktY2F0ZWdvcnkuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/camparetive/master/kpi-category/kpi-category.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/content/camparetive/master/kpi-category/kpi-category.component.ts ***!
  \***********************************************************************************/
/*! exports provided: KpiCategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KpiCategoryComponent", function() { return KpiCategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_kpi_category_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/kpi-category.service */ "./src/app/Shared/Service/Comperative/kpi-category.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _addupdatekpi_category_addupdatekpi_category_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addupdatekpi-category/addupdatekpi-category.component */ "./src/app/content/camparetive/master/kpi-category/addupdatekpi-category/addupdatekpi-category.component.ts");










var KpiCategoryComponent = /** @class */ (function () {
    //#endregion <Variable>
    //#region <Constructor>
    function KpiCategoryComponent(_KpiCategoryService, _commonService, _alertService, _parentApi, _dialog) {
        this._KpiCategoryService = _KpiCategoryService;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "Name",
            "NameHindi",
            "IsAplicableToAllDpt",
            "IsDepartment",
            "IsDistrict",
            "IsActive",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "Name", Text: "Name" },
            { Value: "NameHindi", Text: "Name Hindi" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.Permission = this._commonService.GetPagePermission("/camparative/kpicategory", "/camparative/kpicategory/add", "", "/camparative/kpicategory/edit");
        this._parentApi.setpagelayout("", "", "", "", true);
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion <Constructor>
    //#region <Method>
    KpiCategoryComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    KpiCategoryComponent.prototype.GetList = function () {
        var _this = this;
        this._KpiCategoryService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
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
    KpiCategoryComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    KpiCategoryComponent.prototype.sortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    KpiCategoryComponent.prototype.openDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_addupdatekpi_category_addupdatekpi_category_component__WEBPACK_IMPORTED_MODULE_9__["AddupdatekpiCategoryComponent"], {
            width: "500px",
            data: Id,
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    KpiCategoryComponent.prototype.onActiveStatus = function (id) {
        var _this = this;
        // this._commonService.GenerateOTP().subscribe(
        //   data => {
        //     if (data.IsSuccess) {
        //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
        //         width: "500px",
        //         disableClose: true
        //       });
        //       _dialogRef.afterClosed().subscribe((result: boolean) => {
        //         if (result) {
        this._KpiCategoryService.ChangeActiveStatus(id).subscribe(function (data) {
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
        //         }
        //       });
        //     } else {
        //       this._alertService.error(data.Message);
        //     }
        //   },
        //   error => {
        //     this._alertService.error(error.message);
        //   }
        // );
    };
    KpiCategoryComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_Comperative_kpi_category_service__WEBPACK_IMPORTED_MODULE_4__["KpiCategoryService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], KpiCategoryComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], KpiCategoryComponent.prototype, "sort", void 0);
    KpiCategoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-kpi-category",
            template: __webpack_require__(/*! raw-loader!./kpi-category.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/master/kpi-category/kpi-category.component.html"),
            styles: [__webpack_require__(/*! ./kpi-category.component.css */ "./src/app/content/camparetive/master/kpi-category/kpi-category.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_Comperative_kpi_category_service__WEBPACK_IMPORTED_MODULE_4__["KpiCategoryService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], KpiCategoryComponent);
    return KpiCategoryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.css":
/*!*****************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.css ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvcHJldmlvdXMtZ292ZXJubWVudC1lbnRyeS9hZGR1cGRhdGUtcHJldmlvdXMtZ292ZXJubWVudC1lbnRyeS9hZGR1cGRhdGUtcHJldmlvdXMtZ292ZXJubWVudC1lbnRyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.ts":
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.ts ***!
  \****************************************************************************************************************************************************/
/*! exports provided: AddupdatePreviousGovernmentEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddupdatePreviousGovernmentEntryComponent", function() { return AddupdatePreviousGovernmentEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_Camparetive_previous_government_entry_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/previous-government-entry-model */ "./src/app/Shared/Model/Camparetive/previous-government-entry-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_previous_government_entry_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/previous-government-entry.service */ "./src/app/Shared/Service/Comperative/previous-government-entry.service.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/comparative-target-entry.service */ "./src/app/Shared/Service/Comperative/comparative-target-entry.service.ts");
/* harmony import */ var src_app_Shared_Model_Camparetive_comparative_target_entry_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Model/Camparetive/comparative-target-entry-model */ "./src/app/Shared/Model/Camparetive/comparative-target-entry-model.ts");














var AddupdatePreviousGovernmentEntryComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function AddupdatePreviousGovernmentEntryComponent(_parentApi, _previousGovernmentEntryService, _comparativeTargetEntryService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._previousGovernmentEntryService = _previousGovernmentEntryService;
        this._comparativeTargetEntryService = _comparativeTargetEntryService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.yearListModel = [];
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.kpi = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.parameter = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.model = new src_app_Shared_Model_Camparetive_previous_government_entry_model__WEBPACK_IMPORTED_MODULE_3__["PreviousGovernmentEntryModel"]();
        this.parameterDetail = new src_app_Shared_Model_Camparetive_comparative_target_entry_model__WEBPACK_IMPORTED_MODULE_13__["ComparativeTargetParmeterListModel"]();
        var id = this._route.snapshot.params.id;
        if (id) {
            this.model.Id = id;
            this.GetById();
            this._parentApi.setpagelayout("Update Previous Govt. Entry :", "keyboard_backspace", "Back To List", "camparative/previous-government-entry");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("Add Previous Govt. Entry :", "keyboard_backspace", "Back To List", "camparative/previous-government-entry");
            this.title = "Add";
        }
    }
    //#endregion
    //#region << Method >>
    AddupdatePreviousGovernmentEntryComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getDepartment();
        this.GetAllYearList();
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].PreviousGovernmentEntryDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.GetAllYearList = function () {
        var _this = this;
        this._previousGovernmentEntryService
            .GetAllYearList()
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.yearListModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.getKPIList = function (code) {
        var _this = this;
        this._commonService.GetKPIByDepartmentCode(Number(code)).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlKPICategory = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.GetById = function () {
        var _this = this;
        this._previousGovernmentEntryService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.DepartmentCode) {
                    _this.getKPIList(_this.model.DepartmentCode);
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.KPICategoryCode) {
                    _this.GetAllParameterList(_this.model.KPICategoryCode);
                    _this.model.KPICategoryCode = String(_this.model.KPICategoryCode);
                }
                if (_this.model.ParameterCode) {
                    _this.model.ParameterCode = String(_this.model.ParameterCode);
                    if (_this.ddlParameter) {
                        var paraDetail = _this.ddlParameter.filter(function (x) { return x.ParameterCode == _this.model.ParameterCode; });
                        _this.getParameterDetail(paraDetail);
                    }
                }
                if (_this.model.PreviousGovernmentEntryParameterMappingModel.length > 0) {
                    _this.yearListModel = _this.model.PreviousGovernmentEntryParameterMappingModel;
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.SaveClick = function () {
        var _this = this;
        this.department.markAsTouched();
        this.kpi.markAsTouched();
        this.parameter.markAsTouched();
        if (this.department.valid && this.kpi.valid && this.parameter.valid) {
            this.model.PreviousGovernmentEntryParameterMappingModel = this.yearListModel;
            if (this.model.Id) {
                this._previousGovernmentEntryService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/previous-government-entry"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._previousGovernmentEntryService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["camparative/previous-government-entry"]);
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
    AddupdatePreviousGovernmentEntryComponent.prototype.GetAllParameterList = function (kPICode) {
        var _this = this;
        this._comparativeTargetEntryService.GetAllParameterList(kPICode).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlParameter = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddupdatePreviousGovernmentEntryComponent.prototype.getParameterDetail = function (data) {
        this.parameterDetail = data;
    };
    AddupdatePreviousGovernmentEntryComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_previous_government_entry_service__WEBPACK_IMPORTED_MODULE_11__["PreviousGovernmentEntryService"] },
        { type: src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_12__["ComparativeTargetEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] }
    ]; };
    AddupdatePreviousGovernmentEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-addupdate-previous-government-entry",
            template: __webpack_require__(/*! raw-loader!./addupdate-previous-government-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.html"),
            styles: [__webpack_require__(/*! ./addupdate-previous-government-entry.component.css */ "./src/app/content/camparetive/previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_Comperative_previous_government_entry_service__WEBPACK_IMPORTED_MODULE_11__["PreviousGovernmentEntryService"],
            src_app_Shared_Service_Comperative_comparative_target_entry_service__WEBPACK_IMPORTED_MODULE_12__["ComparativeTargetEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"]])
    ], AddupdatePreviousGovernmentEntryComponent);
    return AddupdatePreviousGovernmentEntryComponent;
}());



/***/ }),

/***/ "./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvY2FtcGFyZXRpdmUvcHJldmlvdXMtZ292ZXJubWVudC1lbnRyeS9wcmV2aW91cy1nb3Zlcm5tZW50LWVudHJ5LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: PreviousGovernmentEntryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviousGovernmentEntryComponent", function() { return PreviousGovernmentEntryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_Comperative_previous_government_entry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/Comperative/previous-government-entry.service */ "./src/app/Shared/Service/Comperative/previous-government-entry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");









var PreviousGovernmentEntryComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function PreviousGovernmentEntryComponent(_parentComponent, _previousGovernmentEntryService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._previousGovernmentEntryService = _previousGovernmentEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "KPICategoryName",
            "ModifiedDate",
            "modifiedbyName",
            "PhysicalParameter",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "modifiedbyName", Text: "Created By" },
            { Value: "PhysicalParameter", Text: "PhysicalParameter" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "KPICategoryName", Text: "KPI Category Name" },
            { Value: "PhysicalParameter", Text: "Physical Parameter" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/camparative/previous-government-entry", "/camparative/previous-government-entry/add", "", "/camparative/previous-government-entry/update");
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("Previous Government Entry List:", "add", "Add", "camparative/previous-government-entry/add")
            : this._parentComponent.setpagelayout("previous Government Entry List:");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    PreviousGovernmentEntryComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    PreviousGovernmentEntryComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_4__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    PreviousGovernmentEntryComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    PreviousGovernmentEntryComponent.prototype.GetList = function () {
        var _this = this;
        this._previousGovernmentEntryService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = (data.Data.Data);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
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
    PreviousGovernmentEntryComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._previousGovernmentEntryService.ChangeActiveStatus(id).subscribe(function (data) {
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
    PreviousGovernmentEntryComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    PreviousGovernmentEntryComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
        this.GetList();
    };
    PreviousGovernmentEntryComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: src_app_Shared_Service_Comperative_previous_government_entry_service__WEBPACK_IMPORTED_MODULE_6__["PreviousGovernmentEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], PreviousGovernmentEntryComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], PreviousGovernmentEntryComponent.prototype, "sort", void 0);
    PreviousGovernmentEntryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-previous-government-entry',
            template: __webpack_require__(/*! raw-loader!./previous-government-entry.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.html"),
            styles: [__webpack_require__(/*! ./previous-government-entry.component.css */ "./src/app/content/camparetive/previous-government-entry/previous-government-entry.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            src_app_Shared_Service_Comperative_previous_government_entry_service__WEBPACK_IMPORTED_MODULE_6__["PreviousGovernmentEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], PreviousGovernmentEntryComponent);
    return PreviousGovernmentEntryComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-camparetive-camparetive-module.js.map