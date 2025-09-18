export class StatisticalReport {
}

export class StatisticalReportModel {
    GroupBy1_Code: string;
    GroupBy1_Title: string;
    GroupBy1_TitleHindi: string;
    GroupBy2_Code: string;
    GroupBy2_Title: string;
    GroupBy2_TitleHindi: string;
    Total: number;
    Department_Total: number;
    Department_Pending: number;
    Department_Interim: number;
    Department_Disposed: number;
    CMO_Total: number;
    CMO_Pending: number;
    CMO_Interim: number;
    CMO_Disposed: number;
}

export class DetailReportModel {
    LetterId: number;
    LetterCode: number;
    LetterType: string;
    LetterSenderRefNo: string;
    LetterBarcode: string;
    Letter_DirectSent: boolean;
    Letter_IsVideoConf: boolean;
    LetterSenderName: string;
    LetterSenderAddress: string;
    LetterSenderTown: string;
    LetterDate: string;
    Letter_DistrictCode: number;
    Letter_PriorityCode: number;
    LetterRefNo: string;
    LetterEntryDate: string;
    LetterSubject: string;
    LetterCommentDate: string;
    LetterComment: string;
    LetterTourDate: string;
    Letter_TourDistrictCode: number;
    LetterTourPlace: string;
    LetterSender_Gender: string;
    LetterSender_Phone: string;
    LetterSender_Mobile: string;
    LetterSender_Email: string;
    LetterStatus: string;
    LetterAccepted: boolean;
    Letter_DisposedCategoryCode: number;
    Letter_PendingCategoryCode: number;
    Public_UserID: number;
    CMIS_AddRefNumber: string;
    GrievanceDetails: string;
    PinCode: string;
    VillageID: number;
    Letter_ReferenceeCode: number;
    ReferenceePortfolio: string;
    ReferenceePortfolioHindi: string;
    ReferenceeName: string;
    ReferenceeNameHindi: string;
    Letter_LetterTypeCode: number;
    GrievanceType: string;
    GrievanceTypeHindi: string;
    Letter_DepartmentCode: number;
    DepartmentTitle: string;
    DepartmentTitleHindi: string;
    Letter_VIPCategoryCode: number;
    VIPCategoryTitle: string;
    VIPCategoryTitleHindi: string;
    Letter_GroupCode: number;
    GroupTitle: string;
    GroupTitleHindi: string;
    LetterSource: number;
    SourceTitle: string;
    SourceTitleHindi: string;
    LetterVisibleTo_Code: number;
    LetterVisibleToGroupTitle: string;
    LetterVisibleToGroupTitleHindi: string;
    Letter_CommentGroupCode: number;
    LetterCommentGroupTitle: string;
    LetterCommentGroupTitleHindi: string;
    Letter_CommentCategoryCode: number;
    CommentCategoryTitle: string;
    CommentCategoryTitleHindi: string;
    LetterSender_DistrictCode: number;
    LetterSenderDistrictTitle: string;
    LetterSenderDistrictTitleHindi: string;
    LetterSender_DivisionCode: number;
    LetterSenderDivisionTitle: string;
    LetterSenderDivisionTitleHindi: string;
    LetterSender_Tehsil: number;
    TehsilTitle: string;
    TehsilTitleHindi: string;
    LetterDepartmentGroupOfficerEmail: string;
    LetterDepartmentGroupOfficerMobile: string;
    Letter_UserCode: number;
    LetterCreatedByUsername: string;
    HeadLetterTypeId: number;
    HeadLetterTypeName: string;
    HeadLetterTypeNameHindi: string;
    Letter_SentToDepartmentDateTime: string;
    Letter_SentToDepartmentDate: string;
    IsSentToDepartment: boolean;
    DepartmentActions: string;
    DepartmentActionDates: string;
    CMOActions: string;
    CMOActionDates: string;
    Last_CMOActionStatus: string;
    Last_CMOActionDetail: string;
    Last_CMOActionDateTime: string;
    Last_CMOActionDate: string;
    Last_DepartmentActionStatus: string;
    Last_DepartmentActionDetail: string;
    Last_DepartmentActionDateTime: string;
    Last_DepartmentActionDate: string;
    Letter_ActionStatus: string;
    Letter_ActionDetails: string;
    Letter_ActionDate: string;
    Letter_ActionUserId: number;
    CurrentCMOStatus: string;
    CurrentDepartmentStatus: string;
    TotalAttachments: number;
    HaveAttachment: boolean;
    ActionHistoryModelList: ActionHistoryModel[] = [];
}

export class AgeWiseCountReportModel {
    Code: number;
    Title: string;
    TitleHindi: string;
    Total: number;
    Letter_0to7_Pending: number;
    Letter_0to7_Interim: number;
    Letter_0to7_Disposed: number;
    Letter_7to15_Pending: number;
    Letter_7to15_Interim: number;
    Letter_7to15_Disposed: number;
    Letter_15to30_Pending: number;
    Letter_15to30_Interim: number;
    Letter_15to30_Disposed: number;
    Letter_30to_Pending: number;
    Letter_30to_Interim: number;
    Letter_30to_Disposed: number;
}

export class ActionHistoryModel {
    ActionId: number;
    Action_Detail: string;
    Action_Status: string;
    Action_IsActionTaken: boolean;
    Action_IsReminderDisposed: boolean;
    Action_UserId: number;
    Action_UserName: string;
    Action_UserType: string;
    Action_Date: string;
    Action_DateTime: string;
    Action_NxtRemDate: string;
    Action_NxtRemDateTime: string;
    IsDepartmentAction: boolean;
}

export class Last6MonthCountReportModel {
    Code: number;
    Title: string;
    TitleHindi: string;
    TotalReceived: number;
    Action_CurrentMonth: number;
    Action_Last1Month: number;
    Action_Last2Month: number;
    Action_Last3Month: number;
    Action_Last4Month: number;
    Action_Last5Month: number;
}