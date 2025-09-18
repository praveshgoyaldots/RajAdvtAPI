export class DepartmentDashboardModel {
    NotificaionCountList: DepartmentNotificaionCountModel[];
    ActionStatusCountList: DepartmentActionStatusCountModel[];
    ActionAgeWiseCountList: DepartmentActionAgeWiseCountModel[];
    Last6MonthActionCountList: DepartmentLast6MonthActionCountModel[];
}

export class DepartmentNotificaionCountModel {
    ApplicationCode: string;
    ApplicationName: string;
    TotalReceived: number;
    TodayReceived: number;
    TodayReceived_ActionTaken: number;
    TodayReceived_NotActionTaken: number;
    PreviousReceived: number;
    PreviousReceived_ActionTaken: number;
    PreviousReceived_NotActionTaken: number;
    TotalReceived_ActionTaken: number;
}

export class DepartmentActionStatusCountModel {
    ApplicationCode: string;
    ApplicationName: string;
    TotalReceived: number;
    TotalReceived_NotActionTakenByDepartment: number;
    TotalReceived_ActionTakenByDepartment: number;
    DepartmentAction_Pending: number;
    DepartmentAction_Interim: number;
    DepartmentAction_Disposed: number;
    CMOAction_Pending: number;
    CMOAction_Interim: number;
    CMOAction_Disposed: number;
}

export class DepartmentActionAgeWiseCountModel {
    ApplicationCode: string;
    ApplicationName: string;
    TotalReceived: number;
    TotalReceived_NotActionTakenByDepartment: number;
    TotalReceived_ActionTakenByDepartment: number;
    DepartmentAction_0to7_Pending: number;
    DepartmentAction_0to7_Interim: number;
    DepartmentAction_0to7_Disposed: number;
    DepartmentAction_7to15_Pending: number;
    DepartmentAction_7to15_Interim: number;
    DepartmentAction_7to15_Disposed: number;
    DepartmentAction_15to30_Pending: number;
    DepartmentAction_15to30_Interim: number;
    DepartmentAction_15to30_Disposed: number;
    DepartmentAction_30to_Pending: number;
    DepartmentAction_30to_Interim: number;
    DepartmentAction_30to_Disposed: number;
}

export class DepartmentLast6MonthActionCountModel {
    ApplicationCode: string;
    ApplicationName: string;
    TotalReceived: number;
    DepartmentAction_CurrentMonth: number;
    DepartmentAction_Last1Month: number;
    DepartmentAction_Last2Month: number;
    DepartmentAction_Last3Month: number;
    DepartmentAction_Last4Month: number;
    DepartmentAction_Last5Month: number;
}