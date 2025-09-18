export class ReportAdvanceSearchModel {
    RefNoFrom: string;
    RefNoTo: string;
    Subject: string;
    SenderName: string;
    Address: string;
    Mobile: string;
    ActionTakenByDepartment: string;
    ActionTakenByCMO: string;
    CommentingOfficerCode: number;
    ReferenceeCode: number;
    DepartmentCode: number;
    DepartmentStatusCode: number;
    CMOStatusCode: number;
    OfficerGroupCode: number;
    EntryDateFrom: Date | string;
    EntryDateTo: Date | string;
    DepartmentActionDateFrom: Date | string;
    DepartmentActionDateTo: Date | string;
    CMOActionDateFrom: Date | string;
    CMOActionDateTo: Date | string;
    LetterType: string;
    haveAttachment: string;
}
