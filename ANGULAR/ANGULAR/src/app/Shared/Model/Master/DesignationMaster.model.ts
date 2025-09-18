export class DesignationMasterViewModel {
  DesignationId: number;
  Name: string;
  NameHindi: string;
  DisplayOrder: number;
  IsActive: boolean;
  IsDeleted: boolean;
  Code: string;
}

export class DesignationMasterModel {
  DesignationId: number;
  DisplayOrder: number|string;
  Name: string;
  NameHindi: string;
  Code: string;
  IsShowOnDepartmentContactDetails: boolean;
  Level: string;
  IsMLA: boolean;
}

