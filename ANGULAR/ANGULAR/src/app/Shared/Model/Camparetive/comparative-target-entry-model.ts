export class ComparativeTargetEntryModel {

		Id: number;
		Code: number | null;
		DepartmentCode: number | string | null;
		YearCode: number | string | null;
		KPICategoryCode: number | string | null;
		IsActive: boolean;
		IsDeleted: boolean;
		CreatedDate: Date | string | null;
		CreatedBy: number | null;
		ModifiedDate: Date | string | null;
		ModifiedBy: number | null;
		ComparativeParameterTargetParameterMappingModel: ComparativeParameterTargetParameterMappingModel[] = [];
	}

	export class ComparativeParameterTargetParameterMappingModel {
		Id: number;
		ComparativeParameterTargetId: number | null;
		ParameterCode: number | string | null;
		PhysicalValue: string;
    FinancialValue: string;
    IsFinancial: boolean;
    IsPhysical: boolean;
    KPICategoryName: string;
    constructor(){
      this.ComparativeParameterTargetId=0;
      this.Id=0;
    }
  }


  export class ComparativeParameterTargetViewModel {
		Id: number;
		IsActive: boolean;
		DepartmentTitle: string;
		KPICategoryName: string;
		YearName: string;
		ModifiedDate: Date | string | null;
    modifiedbyName: string;
  }

  export class ComparativeTargetParmeterListModel {
		Id: number;
    ParameterMappingId: number;
    PhysicalValue: string;
    FinancialValue: string;
    ParameterCode: number | null;
		PhysicalParameter: string;
		FinancialParameter: string;
		DepartmentTitle: string;
		KPICategoryName: string;
		physicalUnitName: string;
    FinancialUnitName: string;
    ComparativeParameterTargetId: number | null;
    IsFinancial: boolean;
    IsPhysical: boolean;
	}
