using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.ComplaintModel
{
    public class CompliantEntryModel
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
        public Nullable<int> EntryTypeId { get; set; }
        public Nullable<int> PriorityId { get; set; }
        public Nullable<int> ModuleId { get; set; }
        public string ScreenURL { get; set; }
        public Nullable<int> StatusId { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public List<ComplaintAttachmentModel> AttachmentList { get; set; }
        public string ApplicationCode { get; set; }
        public Nullable<long> PageCode { get; set; }
        public string createdByName { get; set; }
        public string CreatedUserContact { get; set; }
    }

    public class ComplaintAttachmentModel
    {
        public long Id { get; set; }
        public long ComplaintEntryId { get; set; }
        public string AttachmentsUrl { get; set; }
    }

    public class ComplaintEntryListModel
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public Nullable<int> EntryTypeId { get; set; }
        public Nullable<int> PriorityId { get; set; }
        public string PriorityName { get; set; }
        public string EntryTypeName { get; set; }
        public string ModuleName { get; set; }
        public Nullable<int> ModuleId { get; set; }
        public string ScreenURL { get; set; }
        public Nullable<int> StatusId { get; set; }
        public string StatusName { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationTitle { get; set; }
        public List<string> AttachmentList { get; set; }
        public string createdByName { get; set; }
        public string CreatedUserContact { get; set; }



        public string PermissionTitle { get; set; }

        public List<ComplaintActionHistory> ActionList { get; set; }
        public string UserName { get; set; }
        public string UserMobile { get; set; }

        public string SSOID { get; set; }

        public string UserDepartmentName { get; set; }
        public string UserType { get; set; }
        public Nullable<System.DateTime> ActionDate { get; set; }
        public string ActionBy { get; set; }
        public string ActionBySSOID { get; set; }
        public string ActionUserMobile { get; set; }
    }

    public class CompliantActionModel
    {
        public long Id { get; set; }
        public long ComplaintEntryId { get; set; }
        public string AttachmentURL { get; set; }
        public string Comment { get; set; }
        public Nullable<int> StatusId { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }

    }
    public class ComplaintActionHistory
    {
        public long Id { get; set; }
        public long ComplaintEntryId { get; set; }
        public string AttachmentURL { get; set; }
        public string Comment { get; set; }
        public Nullable<int> StatusId { get; set; }
        public string Status { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public string UserTypeTitle { get; set; }
        public string FromBaseUserType { get; set; }
        public string FromBaseUserTypeTitle { get; set; }
        public string FromUser { get; set; }
    }
    public partial class CompliantSearchModel
    {
        public int LoginUserCode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string ActionFromDate { get; set; }
        public string ActionToDate { get; set; }
        public string ApplicationCode { get; set; }
        public string StatusId { get; set; }
        public string EntryTypeId { get; set; }
        public string SearchText { get; set; }
        public IndexModel indexModel { get; set; }
    }
}

