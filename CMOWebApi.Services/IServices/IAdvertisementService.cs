using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IAdvertisementService
    {

        Task<ServiceResponse<string>> AddUpdateAdvertisement(AdvertisementModel model);

        Task<ServiceResponse<string>> Delete(long id);

        Task<ServiceResponse<string>> LockToggle(long id);
        ServiceResponse<PagedData<AdvertisementListModel>> GetAll(IndexModel model);

        Task<ServiceResponse<AdvertisementViewModel>> GetById(long idModel);

        Task<ServiceResponse<string>> SendNotificationOnPublish(long id);

        ServiceResponse<string> RedesignRequestByPlatformUser(RedesignRequestModel model);

        ServiceResponse<PagedData<RedesignViewForAdminModel>> GetRedesignListForAdmin(IndexModel model);

        ServiceResponse<RedesignDetailModel> GetRedesignRequestDetailsForAdmin(AdvertisementRedesignRequestIdModel model);

        ServiceResponse<string> RedesignApproveByAdmin(ApproveByAdminModel model);

        ServiceResponse<PagedData<AdvListForAdmindeptDptPlatformUserModel>> GetAdvListForAdminDepartmentDepartmentPlatformUser(IndexModel model);

        Task<ServiceResponse<string>> UploadedService(long id);

		Task<ServiceResponse<string>> UpdateStatus(long id);

		ServiceResponse<List<AdvertisementByDateModel>> GetAdvertisementByDate(string date);

        ServiceResponse<List<AdvertisementByDateModel>> GetDataByDate(ApiGetDataModel model, HttpRequestHeaders header = null);

        ServiceResponse<AdvertisementAchievementModel> ServiceForGetAllAdvertisement();
        ServiceResponse<AdvertisementAchievementModel> ServiceForGetAllAdvertisement_Front();


        #region Goverment Achivement
        Task<ServiceResponse<string>> AddGovermentAchivement(GovermentAchievementModel model);

        Task<ServiceResponse<string>> UpdateGovermentAchivement(GovermentAchievementModel model);

        Task<ServiceResponse<GovermentAchievementModel>> GetByIdGovermentAchivement(long id);

        /// <summary>
        /// Set Active and De-Active status for show result on fron
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
         Task<ServiceResponse<string>> UpdateGovermentAchivementStatus(long id);

        Task<ServiceResponse<string>> DeleteGovermentAchivement(long id);

        ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement(IndexModel model);
        ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement_Front(IndexModel model);

        ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivementList(IndexModel model);

        Task<ServiceResponse<string>> AddGovermentAchivementOrAdvertisement(AdvertisementOrGovermentAchievementModel model);
        Task<ServiceResponse<string>> UpdateGovermentAchivementOrAdvertisement(AdvertisementOrGovermentAchievementModel model);
        ServiceResponse<PagedData<AdvertisementOrGovermentAchievementModel>> GetAllGovermentAchivementOrAdvertisement(IndexModel model);

        Task<ServiceResponse<AdvertisementOrGovermentAchievementModel>> GetByIdGovermentAchivementOrAdvertisement(long id);


        #endregion

        #region Service For All Department and other User

        /// <summary>
        /// Get the list of all Goverment Achievement, Advertisement and display status of
        /// Is Advertisement Or Goverment Achivement
        /// </summary>
        /// <returns></returns>
        ServiceResponse<AllAdvertisementAndGovAchievmentListModel> GetAllAdvertisementAndGovAchievment();

        /// <summary>
        /// Get the list of all Advertisement 
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<AdvertisementServiceModel>> GetAllAdvertisement();
        #endregion

        #region RajAdvt Site
        ServiceResponse<string> CreateRajAdvtPortalLog(RajAdvtPortalAddLogRequestModel model);
        Task<ServiceResponse<string>> CreateRajAdvtPortalLogV1(RajAdvtPortalAddLogRequestModel model);

        ServiceResponse<RajAdvtPortalLogCountModel> GetRajAdvtPortalLogCount();

        #endregion

        #region RajAdvt Visitor Counter Report

        /// <summary>
        /// get all visitor count according to websiteurl and add custom filter on todate ,fromdate, websiteurl
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<VisitorCountReportViewModel>> VisitorCountReport(VisitorCountSearchModel model);

		/// <summary>
		/// get all visitor count according to websiteurl and add filter and custom search also
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<VisitorCountDetailReportViewModel>> VisitorCountDetailReport(VisitorCountSearchModel model);
        ServiceResponse<List<VisitorCountReportViewModel>> DateWiseVisitorCountReport(VisitorCountSearchModel model);

        #endregion

        #region RajAdvt Service

        /// <summary>
        ///this service is used for making an entry in pledge table for SSO site only
        /// </summary>
        /// <returns></returns>
        ServiceResponse<string> CreateRajAdvtPortalLogServiceForSSO();

        /// <summary>
        /// get all Pledged count according to websiteurl for other users
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<PledgedCountReportViewModel>> PledgedCountReport();

        #endregion

        #region RajAdvt Pledge Register

        /// <summary>
        /// Save record of end-user when user wants to register for a certificate of taking Pledge
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> RajAdvtPledgeRegister(RajAdvtPledgeRegisterModel model);

        #endregion

        #region  RajAdvt Front
        ServiceResponse<GetAdvertisementPoppupDataModel> GetRajAdvtAdvertisementPopupData(int advtTypeCode = 0);
        #endregion
    }
}

