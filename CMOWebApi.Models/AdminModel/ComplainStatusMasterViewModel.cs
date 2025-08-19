using System;

namespace CMOWebApi.Models.AdminModel
{
    public class ComplainStatusMasterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsDevFilter { get; set; }
        public Nullable<bool> IsAdmFilter { get; set; }
        public Nullable<bool> IsUserFilter { get; set; }
        public Nullable<bool> IsDevAction { get; set; }
        public Nullable<bool> IsAdmAction { get; set; }
        public Nullable<bool> IsUserAction { get; set; }
        public Nullable<bool> IsSMS { get; set; }
        public string SMSContent { get; set; }
        public Nullable<int> NoOfDaysForAutoClose { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }

    }
    public class ChangeStatus
    {
        public int Id { get; set; }
        public string UserType { get; set; }
        public string ActionType { get; set; }
        public int UserId { get; set; }
    }
}
