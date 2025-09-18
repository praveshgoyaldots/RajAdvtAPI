export class CreatedByUsersModel {
  Name: string;
  User_Type: string;
  Department_Name: string;
  Date: Date;
  Total_Entries: number | null;
  Total_Records: number;
}

export class CategorySubCategoryModel {
  Category_Name: string;
  Sub_category_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class DeptCatSubcatModel {
  Department_Name: string;
  Category_Name: string;
  Sub_category_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class LookupCategoryModel {
  Lookup_Category: string;
  Total_Entries: number;
  Total_Records: number;
}

export class DeptLookupCatModel {
  Department_Name: string;
  Lookup: string;
  Total_Entries: number;
  Total_Records: number;
}

export class VIPDepartmentModel {
  VIP_Person: string;
  Department_Name: string;
  Category_Name: string;
  Sub_category_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class DistCatSubcatModel {
  District_Name: string;
  Category_Name: string;
  Sub_category_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class DistLookupCategoryModel {
  District_Name: string;
  Lookup_Category: string;
  Total_Entries: number;
  Total_Records: number;
}

export class DepartmentDistrictModel {
  Department_Name: string;
  District_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class VIPDistrictModel {
  VIP_Person: string;
  District_Name: string;
  Category_Name: string;
  Sub_category_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class VIPDeptDistModel {
  VIP_Person: string;
  Department_Name: string;
  District_Name: string;
  Total_Entries: number;
  Total_Records: number;
}

export class UsersDateModel {
  Name: string;
  User_Type: string;
  Date: Date;
  Total_Entries: number | null;
  Total_Records: number;
}

