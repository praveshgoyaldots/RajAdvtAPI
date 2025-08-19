using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.CommonModel
{
    public class CommonIdModel
    {
        public long Id { get; set; }
        
        public string Paasword { get; set; }
    }

    public class CommonDDlModel
    {
        public string Value { get; set; }

        public string Name { get; set; }
    }

    public class FilterdDDlModel
    {
        public string FilterFor { get; set; }
        public string Value { get; set; }
        public string FilterFrom { get; set; }
    }


    public class DocumentUrlModel
    {
         public string Url { get; set; }
        public string Extension { get; set; }
        public string DisplayName { get; set; }
        public bool IsAnnexure { get; set; }
    }

    public class AdvanceSearchParameter
    {
        public string FieldName { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
    }


    public class GeneratePdfModel
    {
        public string Header { get; set; }
        public string Footer { get; set; }
        public string Content { get; set; }
    }

    public class GeneratedPdfModel
    {
        public string Url { get; set; }
    }
    public class ESignPdfModel
    {
        public long Id { get; set; }
        public string AdharNo { get; set; }
    }

    public class CommonDocModel
	{
		public string Url { get; set; }
		public string BlankDocUrl { get; set; }
	}

	public class NotificationPreviewModel
	{
		public string Subject { get; set; }
		public string Content { get; set; }
        public object DataList { get; set; }
	}

	public class TypeModel
	{
		public int NotificationType { get; set; }
		public int TypeCode { get; set; }
        public int ModuleName { get; set; }
        public long FilterId { get; set; }
	}


    public class GetNotificationGenericModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Reference { get; set; }
        public string ReferenceHindi { get; set; }
        public Nullable<int> OrderBy { get; set; }
        public string Post { get; set; }
        public string MobileNumber1 { get; set; }
        public string MobileNumber2 { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string DepartmentTitle { get; set; }
    }

    public class NotificationFinalSubmissionModel
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public List<string> MobileNumberList { get; set; }
        public List<string> EmailList { get; set; }
        public int NotificationType { get; set; }
    }

    public class SendNotificationToDeptOfficerModel
    {
        public string Content { get; set; }
        public int DepartmentCode { get; set; }
    }

    public class AchievementCategoryModel
    {
        public int CategoryCode { get; set; }
        public string Title { get; set; }
        public string HelpFileURL { get; set; }
        public Nullable<bool> IsVisibleDate { get; set; }
        public Nullable<bool> IsVisibleDescriptionHindi { get; set; }
        public string LabelAchievementHindi { get; set; }
        public string LabelDescriptionHindi { get; set; }
        public string LabelDate { get; set; }
        public string LabelURL { get; set; }
        public string LabelAddPDF { get; set; }
        public string LabelAttachImage { get; set; }
        public Nullable<bool> IsShowConnectWithCMIS { get; set; }
        public Nullable<bool> IsShowBeneficiaryCategory { get; set; }
        public Nullable<bool> IsPDFMandatory { get; set; }
        public Nullable<bool> IsURLMandatory { get; set; }
        public Nullable<bool> IsImageMandatory { get; set; }
    }

    public class ExportToExcelModel
    {
        public object DataSet { get; set; }
        public string SheetName { get; set; }
        public string FileName { get; set; }
    }

    #region Connect With CMIS Service

    public class ConnectWithCMISFilterModel
    {
        public string ModuleName { get; set; }
        public decimal Department { get; set; }
        public string YearText { get; set; }
    }

    public class ConnectWithCMISListModel
    {
        public string Para_No { get; set; }
        public string File_Number { get; set; }
        public string Announcement_Description { get; set; }
        public string modulename { get; set; }
        public int CMISNewTransCoreId { get; set; }
    }

    #endregion

}
