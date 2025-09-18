export class ADVTJankalyanAdvertisementModel {
		Id: number;
		ImageIcon: string;
		ButtonName: string;
		ImageUrl: string;
    IsArrow: boolean | null;
    DisplayOrder: number | null;
		IsActive: boolean;
		IsDeleted: boolean;
		CreatedDate: Date | string | null;
		CreatedBy: number | null;
		ModifiedDate: Date | string | null;
		ModifiedBy: number | null;
    AdvertisementPopupCode: string | number;
	}
