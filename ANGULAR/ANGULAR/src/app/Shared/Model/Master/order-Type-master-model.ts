export class OrderTypeModel {
		Id: number;
		Name: string;
		NameHindi: string;
		IsActive: boolean;
		IsDelete: boolean;
		Code: number | null;
		ShortName: string;
		IsSystemGenerated: boolean | null;
		ReportOrderType: string;
		IsDateMandatory: boolean | null;
		IsDocumentNoMandatory: number | null;
		ImagePath: string;
		SubMenuNameHindi: string;
		SubMenuNameEnglish: string;
		MenuClassificationCode: number | string;
		MenuClassificationPageTypeCode: number | string;
		GeneralDepartmentDistrictMapping: number | string;
		GeneralDepartmentDistrictMappingList: string[] | number[];
    CommonCategoryCode: number | string;
    IsShowInJankalyan: boolean | null;
}
