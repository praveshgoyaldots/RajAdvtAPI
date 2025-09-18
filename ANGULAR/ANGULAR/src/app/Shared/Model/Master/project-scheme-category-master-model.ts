export class ProjectSchemeCategoryMasterModel {
    Id: number;
    NodalDepartmentCode: string|number;
    ProgramSchemeTypeCode: string|number;
    ProgramSchemeName: string;
    IsActive: boolean;
    IsDelete: boolean;
}

export class ProjectSchemeCategoryMasterViewModel {
  Id: number;
  Code: number;
  NodalDepartmentCode: string|number;
  ProgramSchemeTypeCode: string|number;
  ProgramSchemeName: string;
  DepartmentTitle: string;
  ProgramSchemeTypeName: string;
  TotalProjectsAdded: string|number;
  IsActive: boolean;
}
