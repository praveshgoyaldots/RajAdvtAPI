using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class DepartmentContactDetailsController : ApiController
	{
        #region /// Variable ///

        private readonly IDepartmentContactDetails _departmentContactService;
		IndexModel model = null;

        #endregion

        #region /// Cunstroctor  ///

        public DepartmentContactDetailsController(IDepartmentContactDetails departmentContactService, IndexModel indexModel)
		{
			this._departmentContactService = departmentContactService;
			this.model = indexModel;
		}

        #endregion

        #region Method

        /// <summary>
        /// Get department contact details List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentContactDetailsViewModel>>();
            try
            {
                objReturn = _departmentContactService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// Get department contact details by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<DepartmentContactDetailsModel> GetById(long id)
        {
			ServiceResponse<DepartmentContactDetailsModel> objReturn = new ServiceResponse<DepartmentContactDetailsModel>();
			try
			{
				objReturn = _departmentContactService.GetById(id);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				objReturn.Data = null;
			}
			return objReturn;
		}

        /// <summary>
        /// Department contact details add and update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(DepartmentContactDetailsModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _departmentContactService.AddUpdate(model);
				}
				else
				{
					var errors = ModelState.Select(x => x.Value.Errors)
											 .Where(y => y.Count > 0)
											 .ToList();
					List<string> err = new List<string>();

					objReturn.IsSuccess = false;
					objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
					return objReturn;
				}
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

        /// <summary>
        /// Update department contact details status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _departmentContactService.UpdateStatus(id);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

        /// <summary>
        /// Get department website details by code
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<DepartmentWebsiteDetailsModel> GetDepartmentByCode(int id)
        {
            ServiceResponse<DepartmentWebsiteDetailsModel> objReturn = new ServiceResponse<DepartmentWebsiteDetailsModel>();
            try
            {
                objReturn = _departmentContactService.GetDepartmentByCode(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        /// <summary>
        /// Get department officer contact details by department code for scheme module
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<DepartmentContactOfficerModel>> GetDepartmentOfficerByDepartment(int departmentCode)
        {
            ServiceResponse<List<DepartmentContactOfficerModel>> objReturn = new ServiceResponse<List<DepartmentContactOfficerModel>>();
            try
            {
                objReturn = _departmentContactService.GetDepartmentOfficerByDepartment(departmentCode);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion
    }
}

