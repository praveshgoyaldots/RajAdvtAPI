using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.PublicPortalModel
{
  public  class ChiefMinisterProfileViewModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> TitleCode { get; set; }
        public Nullable<int> DesignationCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string Message { get; set; }
        public string MessageHindi { get; set; }
        public string PhotoPath { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public string TitleName { get; set; }
        public string TitleNameHindi { get; set; }
        public string DesignationName { get; set; }
        public string DesignationNameHindi { get; set; }
        public string PathUrl { get; set; }
        }

  public  class ChiefMinisterProfilePostModel
    {
     
        public Nullable<long> Code { get; set; }

        public Nullable<int> TitleCode { get; set; }

        public Nullable<int> DesignationCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string Message { get; set; }
        public string MessageHindi { get; set; }
        public string PhotoPath { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string PathUrl { get; set; }
        }
}
