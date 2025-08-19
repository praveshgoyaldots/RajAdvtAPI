using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.LMSModel
{
    public class DashboardViewModel
    {
    }

    public class DepartmentDashboardViewModel
    {
        public List<DepartmentNotificaionCountViewModel> NotificaionCountList { get; set; }
        public List<DepartmentActionStatusCountViewModel> ActionStatusCountList { get; set; }
        public List<DepartmentActionAgeWiseCountViewModel> ActionAgeWiseCountList { get; set; }
        public List<DepartmentLast6MonthActionCountViewModel> Last6MonthActionCountList { get; set; }
    }

    public class DepartmentNotificaionCountViewModel
    {
        public string ApplicationCode { get; set; }
        public string ApplicationName { get; set; }
        public Nullable<int> TotalReceived { get; set; }
        public Nullable<int> TodayReceived { get; set; }
        public Nullable<int> TodayReceived_ActionTaken { get; set; }
        public Nullable<int> TodayReceived_NotActionTaken { get; set; }
        public Nullable<int> PreviousReceived { get; set; }
        public Nullable<int> PreviousReceived_ActionTaken { get; set; }
        public Nullable<int> PreviousReceived_NotActionTaken { get; set; }
        public Nullable<int> TotalReceived_ActionTaken { get; set; }
    }

    public class DepartmentActionStatusCountViewModel
    {
        public string ApplicationCode { get; set; }
        public string ApplicationName { get; set; }
        public Nullable<int> TotalReceived { get; set; }
        public Nullable<int> TotalReceived_NotActionTakenByDepartment { get; set; }
        public Nullable<int> TotalReceived_ActionTakenByDepartment { get; set; }
        public Nullable<int> DepartmentAction_Pending { get; set; }
        public Nullable<int> DepartmentAction_Interim { get; set; }
        public Nullable<int> DepartmentAction_Disposed { get; set; }
        public Nullable<int> CMOAction_Pending { get; set; }
        public Nullable<int> CMOAction_Interim { get; set; }
        public Nullable<int> CMOAction_Disposed { get; set; }
    }

    public class DepartmentActionAgeWiseCountViewModel
    {
        public string ApplicationCode { get; set; }
        public string ApplicationName { get; set; }
        public Nullable<int> TotalReceived { get; set; }
        public Nullable<int> TotalReceived_NotActionTakenByDepartment { get; set; }
        public Nullable<int> TotalReceived_ActionTakenByDepartment { get; set; }
        public Nullable<int> DepartmentAction_0to7_Pending { get; set; }
        public Nullable<int> DepartmentAction_0to7_Interim { get; set; }
        public Nullable<int> DepartmentAction_0to7_Disposed { get; set; }
        public Nullable<int> DepartmentAction_7to15_Pending { get; set; }
        public Nullable<int> DepartmentAction_7to15_Interim { get; set; }
        public Nullable<int> DepartmentAction_7to15_Disposed { get; set; }
        public Nullable<int> DepartmentAction_15to30_Pending { get; set; }
        public Nullable<int> DepartmentAction_15to30_Interim { get; set; }
        public Nullable<int> DepartmentAction_15to30_Disposed { get; set; }
        public Nullable<int> DepartmentAction_30to_Pending { get; set; }
        public Nullable<int> DepartmentAction_30to_Interim { get; set; }
        public Nullable<int> DepartmentAction_30to_Disposed { get; set; }
    }

    public class DepartmentLast6MonthActionCountViewModel
    {
        public string ApplicationCode { get; set; }
        public string ApplicationName { get; set; }
        public Nullable<int> TotalReceived { get; set; }
        public Nullable<int> DepartmentAction_CurrentMonth { get; set; }
        public Nullable<int> DepartmentAction_Last1Month { get; set; }
        public Nullable<int> DepartmentAction_Last2Month { get; set; }
        public Nullable<int> DepartmentAction_Last3Month { get; set; }
        public Nullable<int> DepartmentAction_Last4Month { get; set; }
        public Nullable<int> DepartmentAction_Last5Month { get; set; }
    }

}
