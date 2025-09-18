export class PreviousGovernmentEntryModel {
		Id: number;
		Code: number | null;
		DepartmentCode: number | string | null;
		ParameterCode: number | string | null;
		KPICategoryCode: number | string | null;
		IsActive: boolean;
		IsDeleted: boolean;
		CreatedDate: Date | string | null;
		CreatedBy: number | null;
		ModifiedDate: Date | string | null;
		ModifiedBy: number | null;
		PreviousGovernmentEntryParameterMappingModel: PreviousGovernmentEntryParameterMappingModel[] = [];

	}

	export class PreviousGovernmentEntryParameterMappingModel {
		Id: number;
		PreviousGovtId: number | null;
    YearCode: number | string | null;
    YearName: string;
		PhysicalValue: string;
		FinancialValue: string;
    constructor(){
      this.PreviousGovtId=0;
      this.Id=0;
    }
	}
export class PreviousGovernmentEntryListModel {
  Id: number;
  Code: number | null;
  DepartmentCode: number | null;
  KPICategoryCode: number | null;
  IsActive: boolean;
  IsDeleted: boolean;
  DepartmentTitle: string;
  KPICategoryName: string;
  CreatedDate: Date | string | null;
  ModifiedDate: Date | string | null;
  modifiedbyName: string;
  PhysicalParameter: string;
}


