using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.LMSModel
{
    public class ReprotViewModel
    {
    }

    public class ReportIndexModel<T> where T : class
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; }
        public string OrderBy { get; set; }
        public int OrderByAsc { get; set; }
        public T AdvanceSearchModel { get; set; }
        public ReportIndexModel()
        {
            PageSize = 10;
            OrderByAsc = 1;
        }
    }

    public class ReportSearchViewModel
    {
        public string RefNoFrom { get; set; }
        public string RefNoTo { get; set; }
        public string Subject { get; set; }
        public string SenderName { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string ActionTakenByDepartment { get; set; }
        public string ActionTakenByCMO { get; set; }
        public string CommentingOfficerCode { get; set; }
        public string ReferenceeCode { get; set; }
        public string DepartmentCode { get; set; }
        public string DepartmentStatusCode { get; set; }
        public string CMOStatusCode { get; set; }
        public string OfficerGroupCode { get; set; }
        public string EntryDateFrom { get; set; }
        public string EntryDateTo { get; set; }
        public string DepartmentActionDateFrom { get; set; }
        public string DepartmentActionDateTo { get; set; }
        public string CMOActionDateFrom { get; set; }
        public string CMOActionDateTo { get; set; }
        public string LetterType { get; set; }
        public string haveAttachment { get; set; }
    }

    public class DetailReportViewModel
    {
        public int LetterId { get; set; }
        public int LetterCode { get; set; }
        public string LetterType { get; set; }
        public string LetterSenderRefNo { get; set; }
        public string LetterBarcode { get; set; }
        public bool Letter_DirectSent { get; set; }
        public Nullable<bool> Letter_IsVideoConf { get; set; }
        public string LetterSenderName { get; set; }
        public string LetterSenderAddress { get; set; }
        public string LetterSenderTown { get; set; }
        public Nullable<System.DateTime> LetterDate { get; set; }
        public Nullable<int> Letter_DistrictCode { get; set; }
        public Nullable<int> Letter_PriorityCode { get; set; }
        public string LetterRefNo { get; set; }
        public Nullable<System.DateTime> LetterEntryDate { get; set; }
        public string LetterSubject { get; set; }
        public Nullable<System.DateTime> LetterCommentDate { get; set; }
        public string LetterComment { get; set; }
        public Nullable<System.DateTime> LetterTourDate { get; set; }
        public Nullable<int> Letter_TourDistrictCode { get; set; }
        public string LetterTourPlace { get; set; }
        public string LetterSender_Gender { get; set; }
        public string LetterSender_Phone { get; set; }
        public string LetterSender_Mobile { get; set; }
        public string LetterSender_Email { get; set; }
        public string LetterStatus { get; set; }
        public Nullable<bool> LetterAccepted { get; set; }
        public int Letter_DisposedCategoryCode { get; set; }
        public int Letter_PendingCategoryCode { get; set; }
        public long Public_UserID { get; set; }
        public string CMIS_AddRefNumber { get; set; }
        public string GrievanceDetails { get; set; }
        public string PinCode { get; set; }
        public Nullable<int> VillageID { get; set; }
        public Nullable<int> Letter_ReferenceeCode { get; set; }
        public string ReferenceePortfolio { get; set; }
        public string ReferenceePortfolioHindi { get; set; }
        public string ReferenceeName { get; set; }
        public string ReferenceeNameHindi { get; set; }
        public Nullable<int> Letter_LetterTypeCode { get; set; }
        public string GrievanceType { get; set; }
        public string GrievanceTypeHindi { get; set; }
        public Nullable<int> Letter_DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<int> Letter_VIPCategoryCode { get; set; }
        public string VIPCategoryTitle { get; set; }
        public string VIPCategoryTitleHindi { get; set; }
        public Nullable<int> Letter_GroupCode { get; set; }
        public string GroupTitle { get; set; }
        public string GroupTitleHindi { get; set; }
        public Nullable<int> LetterSource { get; set; }
        public string SourceTitle { get; set; }
        public string SourceTitleHindi { get; set; }
        public Nullable<int> LetterVisibleTo_Code { get; set; }
        public string LetterVisibleToGroupTitle { get; set; }
        public string LetterVisibleToGroupTitleHindi { get; set; }
        public Nullable<int> Letter_CommentGroupCode { get; set; }
        public string LetterCommentGroupTitle { get; set; }
        public string LetterCommentGroupTitleHindi { get; set; }
        public Nullable<int> Letter_CommentCategoryCode { get; set; }
        public string CommentCategoryTitle { get; set; }
        public string CommentCategoryTitleHindi { get; set; }
        public Nullable<int> LetterSender_DistrictCode { get; set; }
        public string LetterSenderDistrictTitle { get; set; }
        public string LetterSenderDistrictTitleHindi { get; set; }
        public Nullable<int> LetterSender_DivisionCode { get; set; }
        public string LetterSenderDivisionTitle { get; set; }
        public string LetterSenderDivisionTitleHindi { get; set; }
        public Nullable<int> LetterSender_Tehsil { get; set; }
        public string TehsilTitle { get; set; }
        public string TehsilTitleHindi { get; set; }
        public string LetterDepartmentGroupOfficerEmail { get; set; }
        public string LetterDepartmentGroupOfficerMobile { get; set; }
        public Nullable<int> Letter_UserCode { get; set; }
        public string LetterCreatedByUsername { get; set; }
        public Nullable<long> HeadLetterTypeId { get; set; }
        public string HeadLetterTypeName { get; set; }
        public string HeadLetterTypeNameHindi { get; set; }
        public Nullable<System.DateTime> Letter_SentToDepartmentDateTime { get; set; }
        public string Letter_SentToDepartmentDate { get; set; }
        public int IsSentToDepartment { get; set; }
        public string DepartmentActions { get; set; }
        public string DepartmentActionDates { get; set; }
        public string CMOActions { get; set; }
        public string CMOActionDates { get; set; }
        public string Last_CMOActionStatus { get; set; }
        public string Last_CMOActionDetail { get; set; }
        public Nullable<System.DateTime> Last_CMOActionDateTime { get; set; }
        public string Last_CMOActionDate { get; set; }
        public string Last_DepartmentActionStatus { get; set; }
        public string Last_DepartmentActionDetail { get; set; }
        public Nullable<System.DateTime> Last_DepartmentActionDateTime { get; set; }
        public string Last_DepartmentActionDate { get; set; }
        public string Letter_ActionStatus { get; set; }
        public string Letter_ActionDetails { get; set; }
        public string Letter_ActionDate { get; set; }
        public Nullable<System.DateTime> Letter_ActionDateTime { get; set; }
        public Nullable<int> Letter_ActionUserId { get; set; }
        public string CurrentCMOStatus { get; set; }
        public string CurrentDepartmentStatus { get; set; }
        public Nullable<int> TotalAttachments { get; set; }
        public int HaveAttachment { get; set; }

        public List<ActionHistoryViewModel> ActionHistoryModelList { get; set; }
    }

    public class StatisticalReportViewModel
    {
        public string GroupBy1_Code { get; set; }
        public string GroupBy1_Title { get; set; }
        public string GroupBy1_TitleHindi { get; set; }
        public string GroupBy2_Code { get; set; }
        public string GroupBy2_Title { get; set; }
        public string GroupBy2_TitleHindi { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<int> Department_Total { get; set; }
        public Nullable<int> Department_Pending { get; set; }
        public Nullable<int> Department_Interim { get; set; }
        public Nullable<int> Department_Disposed { get; set; }
        public Nullable<int> CMO_Total { get; set; }
        public Nullable<int> CMO_Pending { get; set; }
        public Nullable<int> CMO_Interim { get; set; }
        public Nullable<int> CMO_Disposed { get; set; }
    }

    public class AgeWiseCountReportViewModel
    {
        public Nullable<int> Code { get; set; }
        public string Title { get; set; }
        public string TitleHindi { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<int> Letter_0to7_Pending { get; set; }
        public Nullable<int> Letter_0to7_Interim { get; set; }
        public Nullable<int> Letter_0to7_Disposed { get; set; }
        public Nullable<int> Letter_7to15_Pending { get; set; }
        public Nullable<int> Letter_7to15_Interim { get; set; }
        public Nullable<int> Letter_7to15_Disposed { get; set; }
        public Nullable<int> Letter_15to30_Pending { get; set; }
        public Nullable<int> Letter_15to30_Interim { get; set; }
        public Nullable<int> Letter_15to30_Disposed { get; set; }
        public Nullable<int> Letter_30to_Pending { get; set; }
        public Nullable<int> Letter_30to_Interim { get; set; }
        public Nullable<int> Letter_30to_Disposed { get; set; }
    }

    public class ActionHistoryViewModel
    {
        public int ActionId { get; set; }
        public string Action_Detail { get; set; }
        public string Action_Status { get; set; }
        public bool Action_IsActionTaken { get; set; }
        public bool Action_IsReminderDisposed { get; set; }
        public Nullable<int> Action_UserId { get; set; }
        public string Action_UserName { get; set; }
        public string Action_UserType { get; set; }
        public string Action_Date { get; set; }
        public System.DateTime Action_DateTime { get; set; }
        public string Action_NxtRemDate { get; set; }
        public Nullable<System.DateTime> Action_NxtRemDateTime { get; set; }
        public bool IsDepartmentAction { get; set; }
    }

    public class Last6MonthCountReportViewModel
    {
        public int Code { get; set; }
        public string Title { get; set; }
        public string TitleHindi { get; set; }
        public Nullable<int> TotalReceived { get; set; }
        public Nullable<int> Action_CurrentMonth { get; set; }
        public Nullable<int> Action_Last1Month { get; set; }
        public Nullable<int> Action_Last2Month { get; set; }
        public Nullable<int> Action_Last3Month { get; set; }
        public Nullable<int> Action_Last4Month { get; set; }
        public Nullable<int> Action_Last5Month { get; set; }
    }

}
