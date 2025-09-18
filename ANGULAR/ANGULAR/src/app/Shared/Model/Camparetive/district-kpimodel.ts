import { environment } from 'src/environments/environment';
import { EbookletEnumProd, EbookletEnum } from '../../Enum/ebooklet.enum';

	export class DistrictKPIModel {

		Id: number;
		Code: number | null;
		DepartmentCode: number | string | null;
		YearCode: number | string | null;
		MonthCode: number | string | null;
		KPICategoryCode: number | string |null;
		IsActive: boolean;
		IsDeleted: boolean;
		CreatedDate: Date | string | null;
		CreatedBy: number | null;
		ModifiedDate: Date | string | null;
		ModifiedBy: number | null;
    DistrictKPIParameterMappingModel: DistrictKPIParameterMappingModel[]= [];
    ParameterCategoryCode: string|number;
    constructor(){
      const enums =environment.production?EbookletEnumProd:EbookletEnum;
      this.ParameterCategoryCode=String(enums.EbookletCategory);
    }
	}

	export class DistrictKPIParameterMappingModel {
		Id: number;
		CurrentGovtEntryId: number | null;
		ParameterCode: number | null;
		PhysicalParameter: string;
		FinancialParameter: string;
		physicalUnitName: string;
		FinancialUnitName: string;
		PhysicalValue: string;
		FinancialValue: string;
		IsFinancial: boolean | null;
    IsPhysical: boolean | null;
    KPICategoryName: string;
    constructor(){
      this.CurrentGovtEntryId=0;
      this.Id=0;
    }
	}

	export class DistrictKPIListViewModel {
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
