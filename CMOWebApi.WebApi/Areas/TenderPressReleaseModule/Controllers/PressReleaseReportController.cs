using CMOWebApi.Core;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.TenderPressRelease;
using CMOWebApi.Models.VendorPressRelease;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.IServices.ITenderPressRelease;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.TenderPressReleaseModule.Controllers
{
    public class PressReleaseReportController : ApiController
	{
        private readonly IPressReleaseReportService _pressReleaseReportService;

        public PressReleaseReportController(IPressReleaseReportService pressReleaseReportService)
        {
            this._pressReleaseReportService = pressReleaseReportService;
        }
		// GET: TenderPressReleaseModule/PressReleaseReport
		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>> CreatedByUser(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>> objReturn = new ServiceResponse<PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>>();
			try
			{
				return this._pressReleaseReportService.PressReleasesCreatedByUsers(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummaryReportCategorySubCategory>> CategorySubCategory(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummaryReportCategorySubCategory>> objReturn = new ServiceResponse<PagedData<PressReleaseSummaryReportCategorySubCategory>>();
			try
			{
				return this._pressReleaseReportService.CategorySubCategory(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummaryReportDeptCatSubcat>> DeptCatSubcat(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummaryReportDeptCatSubcat>> objReturn = new ServiceResponse<PagedData<PressReleaseSummaryReportDeptCatSubcat>>();
			try
			{
				return this._pressReleaseReportService.DeptCatSubcat(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummaryReportLookupCategory>> LookupCategory(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummaryReportLookupCategory>> objReturn = new ServiceResponse<PagedData<PressReleaseSummaryReportLookupCategory>>();
			try
			{
				return this._pressReleaseReportService.LookupCategory(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummaryReportDeptLookupCat>> DeptLookupCat(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummaryReportDeptLookupCat>> objReturn = new ServiceResponse<PagedData<PressReleaseSummaryReportDeptLookupCat>>();
			try
			{
				return this._pressReleaseReportService.DeptLookupCat(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		
		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDepartment>> VIPDepartment(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDepartment>> objReturn = new ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDepartment>>();
			try
			{
				return this._pressReleaseReportService.VIPDepartment(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummmaryReportDistCatSubcat>> DistCatSubcat(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummmaryReportDistCatSubcat>> objReturn = new ServiceResponse<PagedData<PressReleaseSummmaryReportDistCatSubcat>>();
			try
			{
				return this._pressReleaseReportService.DistCatSubcat(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		
		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummmaryReportDistLookupCategory>> DistLookupCategory(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummmaryReportDistLookupCategory>> objReturn = new ServiceResponse<PagedData<PressReleaseSummmaryReportDistLookupCategory>>();
			try
			{
				return this._pressReleaseReportService.DistLookupCategory(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		
		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummmaryReportDepartmentDistrict>> DepartmentDistrict(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummmaryReportDepartmentDistrict>> objReturn = new ServiceResponse<PagedData<PressReleaseSummmaryReportDepartmentDistrict>>();
			try
			{
				return this._pressReleaseReportService.DepartmentDistrict(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		
		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDistrict>> VIPDistrict(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDistrict>> objReturn = new ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDistrict>>();
			try
			{
				return this._pressReleaseReportService.VIPDistrict(model);
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		
		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDeptDist>> VIPDeptDist(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDeptDist>> objReturn = new ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDeptDist>>();
			try
			{
				return this._pressReleaseReportService.VIPDeptDist(model);
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpPost]
		public ServiceResponse<PagedData<PressReleaseSummaryReportUserDate>> UserDate(PressReleaseReportFilterModel model)
		{
			ServiceResponse<PagedData<PressReleaseSummaryReportUserDate>> objReturn = new ServiceResponse<PagedData<PressReleaseSummaryReportUserDate>>();
			try
			{
				return this._pressReleaseReportService.UserDate(model);
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
	}
}