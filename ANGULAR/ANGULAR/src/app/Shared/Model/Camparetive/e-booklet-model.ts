import { environment } from 'src/environments/environment';
import { EbookletFilterProdEnum, EbookletFilterEnum, EbookletEnum, EbookletEnumProd } from '../../Enum/ebooklet.enum';

export class EBookletFilterModel {
  CategoryWiseRadio:number;
  DepartmentCode: number ;
  BeneficiaryCategoryCode: number ;
  KPICategoryCode: number;
  YearWiseCode:number;
  GrandTotalCode: number;
  GeneralEntryEBookletCode: number;
  GeneralEntryEBookletVariableCode: number;
  ParameterCategoryCode: number;
  constructor(){
   const ebookletEnum = environment.production?EbookletFilterProdEnum:EbookletFilterEnum;
   this.YearWiseCode=ebookletEnum.YearWiseCode;
   this.GrandTotalCode=ebookletEnum.GrandTotalCode;
   this.GeneralEntryEBookletCode=ebookletEnum.GeneralEntryEBookletCode;
   this.GeneralEntryEBookletVariableCode =ebookletEnum.GeneralEntryEBookletVariableCode;

   const enums =environment.production?EbookletEnumProd: EbookletEnum;
   this.ParameterCategoryCode=enums.EbookletCategory;
  }
}

export class EBookletResponseModel {
  Logo: string;
  Name: string;
  EBookletList: BookletDataModel[] = [];
}

export class BookletDataModel {
  Description: string;
  YearName: string;
}
