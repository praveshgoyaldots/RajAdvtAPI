import { IndexModel } from "./general-model";

export class DepartmentSectionMappingModel {
    Id: number;
    Code: number;
    DepartmentCode: number | string | null;
    DepartmentTitle: string;
    DepartmentTitleHindi: string;
    SectionMasterCode: number | string | null;
    NameHindi: string;
    NameEnglish: string;
    DisplayOrder: number | null;
    IconImage: string;
    BackGroundImage: string;
    BackGroungColor: string;
    BaseUrl: string;
    IsActive: boolean;
    Isdeleted: boolean;
    CreatedDate: Date | string | null;
    CreatedBy: number | null;
    ModifiedDate: Date | string | null;
    ModifiedBy: number | null;
    ModifiedByName:string;
    CreatedByName:string;
    SectionMasterName: string;
}

export class DepartmentSectionMappingFilterModel extends IndexModel {
DepartmentCode: string;
SectionMasterCode: number;
ModifiedToDate: string;
ModifiedFromDate: string;
Status: number | null;
ModifiedBy: number;

constructor() {
  super();
  this.Status =1;
}
}



