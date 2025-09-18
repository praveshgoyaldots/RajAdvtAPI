
export class ComplainEntryTypeMasterViewModel {
  Id: number;
  Name: string;
  NameHindi: string;
  IsActive: boolean | null;
  IsDelete: boolean | null;
  CreatedDate: string | null;
  CreatedBy: number | null;
  ModifiedDate: string | null;
  ModifiedBy: number | null;
  constructor() {
    this.IsActive = false;
    this.Id = 0;
  }
}
