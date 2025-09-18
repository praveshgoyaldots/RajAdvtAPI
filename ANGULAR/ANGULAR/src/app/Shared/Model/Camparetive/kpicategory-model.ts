export class KPICategoryMasterModel {
    Id: number;
		Name : string;
		NameHindi: string;
		IsDepartment: boolean;
		IsDistrict: boolean;
    IsActive: boolean;
    DepartmentCode: number|string;
    IsAplicableToAllDpt: boolean;
    DisplayOrder: number;
}

export class KPICategoryMasterViewModel {
  Id: number;
  Name: string;
  NameHindi: string;
  IsDepartment: boolean | null;
  IsDistrict: boolean | null;
  IsActive: boolean;
  IsAplicableToAllDpt: boolean | null;
  DepartmentTitle: string;
  }

