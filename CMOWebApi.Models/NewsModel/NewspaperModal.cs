using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.NewsModel
{
    public class NewspaperModal
    {
        public NewspaperModal()
        {
            IsActive = true;
            IsDeleted = false;
        }
        public long Id { get; set; }
        public string Topic { get; set; }
        public Nullable<int> SubjectCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<long> SourceTypeCode { get; set; }
        public string Summary { get; set; }
        public Nullable<bool> IsVisibleToPublic { get; set; }
        public string SearchKeyword { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public List<string> ChairpersonList { get; set; }
        public List<string> ChairpersonCategoryCodes { get; set; }
        public List<string> NodalDepartmentCodes { get; set; }
        public List<string> AdminDepartmentCodes { get; set; }
    }

    public class NewspaperViewModal
    {
        public long Id { get; set; }
        public string DepartmentTitle { get; set; }
        public string SubjectName { get; set; }
        public string Topic { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Summary { get; set; }
        public Nullable<bool> IsVisibleToPublic { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> ProgressCount { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string ModifiedName { get; set; }
    }

    public class NewspaperTransactionDetailViewModel
    {
        public NewspaperTransactionDetailModel TransactionModel { get; set; }
        public List<NewspaperTransactionProgressListModel> ProgressList { get; set; }
    }

    public class NewspaperTransactionDetailModel
    {
        public long Id { get; set; }
        public string SubjectName { get; set; }
        public Nullable<long> Code { get; set; }
        public string Topic { get; set; }
        public Nullable<int> SubjectCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<long> SourceTypeCode { get; set; }
        public string Summary { get; set; }
        public Nullable<bool> IsVisibleToPublic { get; set; }
        public string SearchKeyword { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string SourceTypeName { get; set; }
        public string NewspaperChairpersonName { get; set; }
        public string ChairpersonCategoryName { get; set; }
        public string NewspaperDepartmentName { get; set; }
        public string NewspaperAdminDepartmentName { get; set; }
    }

    public class NewspaperTransactionProgressListModel
    {
        public long Id { get; set; }
        public Nullable<long> NewspaperTransId { get; set; }
        public string NewsHeadline { get; set; }
        public Nullable<long> PublicationTypeCode { get; set; }
        public string URL { get; set; }
        public string Caption { get; set; }
        public Nullable<int> NewspaperCode { get; set; }
        public Nullable<long> EditionCode { get; set; }
        public Nullable<long> PageNumberCode { get; set; }
        public string PDF { get; set; }
        public Nullable<long> NewsTypeCode { get; set; }
        public Nullable<int> ClassificationCode { get; set; }
        public string KeyPoint { get; set; }
        public string ActionRequiredIfAny { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsVisibleToPublic { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string NewsContent { get; set; }
        public string PublicationName { get; set; }
        public string NewspaperName { get; set; }
        public string EditionName { get; set; }
        public string PageNumberName { get; set; }
        public string NewsTypeName { get; set; }
        public string ClassificationName { get; set; }
        public string CoverageName { get; set; }
        public string CoverageCodes { get; set; }
        public List<string> AttachmentImages { get; set; }
    }

    public class NewsProgressListViewModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public string Topic { get; set; }
        public Nullable<int> SubjectCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<long> SourceTypeCode { get; set; }
        public string Summary { get; set; }
        public Nullable<bool> IsVisibleToPublic { get; set; }
        public string SearchKeyword { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string SubjectName { get; set; }
        public string SubjectNameHindi { get; set; }
        public string SourceTypeName { get; set; }
        public string SourceTypeNameHindi { get; set; }
        public string AdmDepartmentCodes { get; set; }
        public string AdmDepartmentTitle { get; set; }
        public string AdmDepartmentTitleHindi { get; set; }
        public string DepartmentCodes { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string VIPCategoryCodes { get; set; }
        public string VIPCategoryName { get; set; }
        public string VIPCategoryNameHindi { get; set; }
        public string VIPCode { get; set; }
        public string VIPName { get; set; }
        public string VIPNameHindi { get; set; }
        public long ProgressID { get; set; }
        public string NewsHeadline { get; set; }
        public Nullable<long> PublicationTypeCode { get; set; }
        public string PublicationTypeTitle { get; set; }
        public string PublicationTypeTitleHindi { get; set; }
        public Nullable<long> EditionCode { get; set; }
        public string EditionTitle { get; set; }
        public string EditionTitleHindi { get; set; }
        public Nullable<long> PageNumberCode { get; set; }
        public string PageNumberTitle { get; set; }
        public string PageNumberTitleHindi { get; set; }
        public Nullable<int> NewsPaperCode { get; set; }
        public string NewsPaperName { get; set; }
        public string NewsPaperNameHindi { get; set; }
        public string CoverageTypeCode { get; set; }
        public string CoverageTypeName { get; set; }
        public string CoverageTypeNameHindi { get; set; }
        public Nullable<System.DateTime> ProgressDate { get; set; }
        public bool ProgressIsVisibleToPublic { get; set; }
        public string url { get; set; }
        public string PDF { get; set; }
        public List<string> Images { get; set; }
        public string NewsContent { get; set; }
        public string AllSearch { get; set; }

        public string DateHindi { get; set; }
        public string ProgressDateHindi { get; set; }
    }

    public partial class NewsProgressSearchModel
    {
        public int AdmDepartmentCode { get; set; }
        public int DepartmentCode { get; set; }
        public int SubjectCode { get; set; } = 0;
        public long PublicationTypeCode { get; set; }
        public int NewspaperCode { get; set; }
        public long CoverageTypeCode { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string KeywordSearch { get; set; }

        public bool? IsVisibleToPublic { get; set; }
        public bool? ProgressIsVisibleToPublic { get; set; }

        public bool? IsActive { get; set; }

        public IndexModel IndexModel { get; set; }

    }

    #region Update Progress

    public class NewspaperProgressMappingModel
    {
        public NewspaperProgressMappingModel()
        {
            IsActive = true;
            IsDeleted = false;
        }

        public long Id { get; set; }
        public Nullable<long> NewspaperTransId { get; set; }
        public string NewsHeadline { get; set; }
        public Nullable<long> PublicationTypeCode { get; set; }
        public string URL { get; set; }
        public string Caption { get; set; }
        public Nullable<int> NewspaperCode { get; set; }
        public Nullable<long> EditionCode { get; set; }
        public Nullable<long> PageNumberCode { get; set; }
        public string PDF { get; set; }
        public Nullable<long> NewsTypeCode { get; set; }
        public Nullable<int> ClassificationCode { get; set; }
        public string KeyPoint { get; set; }
        public string ActionRequiredIfAny { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsVisibleToPublic { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public List<string> Images { get; set; }
        public List<string> CoverageTypes { get; set; }
        public string NewsContent { get; set; }
    }

    #endregion
}
