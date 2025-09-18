export class MenuClassificationModel {
		Id: number;
		Code: number | null;
		NameHindi: string;
		NameEnglish: string;
		DisplayOrder: number | null;
		Remarks: string;
		ClassificationType: number |string | null;
		IsActive: boolean;
		IsDeleted: boolean;
		CreatedDate: Date | string | null;
		CreatedBy: number | null;
		ModifiedDate: Date | string | null;
    ModifiedBy: number | null;
    MenuTypeMappingList: number[]|string[];
    IsSubMenu: boolean;
    MenuClassificationCode: number|string;
	}
