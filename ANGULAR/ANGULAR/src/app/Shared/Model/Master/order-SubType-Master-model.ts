export class OrderSubTypeMasterModel {
  Id: number;
  TypeCode: number|string;
  DepartmentCode: number|string;
  Name: string;
  NameHindi: string;
  IsApplicableToAllDPT: boolean;
}


export class OrderSubTypeMasterViewModel {
  Id: number;
  TypeName: string;
  Name: string;
  NameHindi: string;
  CreatedByName: string;
  ModifiedDate: Date | string;
  IsActive: boolean;
  IsDelete: boolean;

}
