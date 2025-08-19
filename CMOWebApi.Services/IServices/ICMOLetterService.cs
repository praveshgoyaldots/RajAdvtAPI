using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
    public interface ICMOLetterService
    {

        ServiceResponse<List<CMOLetterViewModel>> GetAllCMOLetter(string DepartmentId);

    }
}
