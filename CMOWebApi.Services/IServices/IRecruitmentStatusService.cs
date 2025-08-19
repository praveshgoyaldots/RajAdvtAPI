using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
  public  interface IRecruitmentStatusService
    {
        ServiceResponse<List<RecruitmentStatusViewModel>> GetAllRecruitmentStatus(string DepartmentCode, DateTime? sentstartdate, DateTime? sentenddate);
    }
}
