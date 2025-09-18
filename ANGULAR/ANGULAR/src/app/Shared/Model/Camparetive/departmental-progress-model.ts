export class DepartmentalProgressModel {
  Id: number;
  Code: number | null;
  DepartmentCode: number|string | null;
  YearCode: number | string | null;
  MonthCode: number |string| null;
  KPICategoryCode: number| string | null;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date | string | null;
  CreatedBy: number | null;
  ModifiedDate: Date | string | null;
  ModifiedBy: number | null;
  ParameterCategoryCode: number|string;
  DepartmentalProgressParameterMappingModel: DepartmentalProgressParameterMappingModel[] = [];
}

export class DepartmentalProgressParameterMappingModel {
  Id: number;
  CurrentGovtEntryId: number | null;
  ParameterCode: number | null;
  PhysicalParameter: string;
  FinancialParameter: string;
  physicalUnitName: string;
  FinancialUnitName: string;
  PhysicalValue: string;
  FinancialValue: string;
  IsFinancial: boolean;
  IsPhysical: boolean;
  KPICategoryName: string;
  PhysicalTargetValue: number;
  FinancialTargetValue: number;
  FinancialCumulativeValue: number;
  PhysicalCumulativeValue:number;
  constructor(){
    this.CurrentGovtEntryId=0;
    this.Id=0;
  }
}

export class DepartmentalProgressListViewModel {
  Id: number;
  Code: number | null;
  DepartmentCode: number | null;
  KPICategoryCode: number | null;
  IsActive: boolean;
  IsDeleted: boolean;
  DepartmentTitle: string;
  KPICategoryName: string;
  YearName: string;
  CreatedDate: Date | string | null;
  ModifiedDate: Date | string | null;
  modifiedbyName: string;
  MonthName: string;
}
