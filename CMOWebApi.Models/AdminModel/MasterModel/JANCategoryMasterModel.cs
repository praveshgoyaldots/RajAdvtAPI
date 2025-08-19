using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class JANCategoryMasterModel
    {
        JANCategoryMasterModel()
        {
            IsActive = true;
            IsDeleted = false;
        }
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

		public string SubMenuNameHindi { get; set; }
		public string SubMenuNameEnglish { get; set; }
		public Nullable<int> MenuClassificationCode { get; set; }
		public Nullable<int> MenuClassificationPageTypeCode { get; set; }
		public Nullable<long> GeneralDepartmentDistrictMapping { get; set; }
		public List<string> GeneralDepartmentDistrictMappingList { get; set; }

        public Nullable<bool> IsPressRelease { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }
        public Nullable<long> CommonCategoryCode { get; set; }
    }
}
