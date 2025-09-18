export class DepartmentSetupModel {
    Id: number;
    DepartmentCode: string|number;
    Address1: string;
    AddressHindi1: string;
    Address2: string;
    AddressHindi2: string;
    Address3: string;
    AddressHindi3: string;
    FooterLine1: string;
    FooterLineHindi1: string;
    FooterLine2: string;
    FooterLineHindi2: string;
    Logo1: string;
    Logo2: string;
    OfficeCode: number|string;
    FileSize: number;
    FacebookUrl: string;
    Twitter: string;
    Youtube: string;
    Backgroundcolor: string;
    SerialNumber: string;
    IsAutoEmail: boolean;
    IsAutoSMS: boolean;
}


export class DepartmentSetupViewModel {
    Id: number;
    Address1: string;
    Address2: string;
    FooterLine1: string;
    FooterLine2: string;
    DepartmentTitle: string;
    OfficeName: string;
    IsActive: boolean;
    IsDeleted: boolean;
}
