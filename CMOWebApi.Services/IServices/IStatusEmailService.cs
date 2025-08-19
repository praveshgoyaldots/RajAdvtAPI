using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CMOWebApi.Services.IServices
{
    public interface IStatusEmailService
    {
        /// <summary>
        /// Send Jankalyan Status email to all selected departments users
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<string> SendEmailToDepartment(StatusEmailModel model);

		/// <summary>
		/// Get List of department contact detail list with filter.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> GetAllDepartmentContactDetailList(ImportantDepartmentContactFilterModel model);
	}
}
