
export class LookupModel {
Id?:number;
LookupType:string;
Lookup:string;
Desc:string;
isActive?:Boolean;
lookupTypeId?:number|string;
sortOrder?:number;
NameHindi: string;
 }


export class LookupViewModel {
    Id?:number;
    lookupTypeId:string|number;
    lookup:string;
    IsActive:boolean;
    IsDeleted:boolean;
    NameHindi: string;
    lookupTypeName:string;
    CreatedModifiedByName: string;
    desc:string;
    CreatedModifiedDate: Date|string;
     }

     export class LookUpFilterModel{
      lookupTypeId: number;
     }
