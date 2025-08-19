using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
    {
    public class ImportantDecisionSubCategoryModel
        {
        public long ImpSubCategoryId { get; set; }
        public int SubCategoryCode { get; set; }

        public int DepartmentCode { get; set; }

        public int CategoryCode { get; set; }
        public int SectorCode { get; set; }

        public string Title { get; set; }
        public string TitleHindi { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string ImagePath { get; set; }
		public Nullable<bool> IsApplicableToAllDPT { get; set; } = false;

	}

    public class ImportantDecisionSubCategoryMasterViewModel
        {
        public long ImpSubCategoryId { get; set; }
        public int SubCategoryCode { get; set; }
        public int CategoryCode { get; set; }

        public int SectorCode { get; set; }
        public int DepartmentCode { get; set; }

        public string DepartmentTitle { get; set; }

        public string Title { get; set; }
        public string TitleHindi { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string CategoryName { get; set; }

        public string SectorName { get; set; }
        public string CategoryTitleHindi { get; set; }
        public string ImagePath { get; set; }
		public Nullable<bool> IsApplicableToAllDPT { get; set; } 
	}
    }

