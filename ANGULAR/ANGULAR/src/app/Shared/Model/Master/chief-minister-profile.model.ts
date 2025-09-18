export class ChiefMinisterProfilePostModel {

    Code: number;
    TitleCode: number | string;
    DesignationCode: number | string;
    Name: string;
    NameHindi: string;
    Message: string;
    MessageHindi: string;
    PhotoPath: string;
    CreatedBy: number;
    ModifiedBy: number;
    IsActive: boolean;
    PathUrl: string;
}

export class ChiefMinisterProfileViewModel {
    Id: number;
    Code: number;
    TitleCode: number;
    DesignationCode: number;
    Name: string;
    NameHindi: string;
    Message: string;
    MessageHindi: string;
    PhotoPath: string;
    CreatedBy: number;
    ModifiedBy: number;
    CreatedDate: Date;
    ModifiedDate: Date;
    IsActive: boolean;
    IsDelete: boolean;
    TitleName: string;
    TitleNameHindi: string;
    DesignationName: string;
    DesignationNameHindi: string;
}
