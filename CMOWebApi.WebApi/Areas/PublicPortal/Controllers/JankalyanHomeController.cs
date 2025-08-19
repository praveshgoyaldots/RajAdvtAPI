using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{

    public class JankalyanHomeController : ApiController
    {
        #region /// variable  ///
        IAdvAchievementService _advAchievementService;
        IVisitorCountService _visitorCountService;
        IndexModel model = null;
        IDepartmentProfile _departmentProfile;
        IUserManagementService _userManagementService;
        IChiefMinisterProfileService _chiefMinisterProfileService;
        IJankalyanPortalService _jankalyanPortalService;
        #endregion

        #region /// constructor  //
        public JankalyanHomeController(IndexModel Model, IAdvAchievementService advAchievementService, IVisitorCountService visitorCountService, IDepartmentProfile departmentProfile, IUserManagementService userManagementService, ICMISMuduleService cmisMuduleService, IChiefMinisterProfileService chiefMinisterProfileService, IJankalyanPortalService jankalyanPortalService)
        {
            model = Model;
            _advAchievementService = advAchievementService;
            _visitorCountService = visitorCountService;
            _departmentProfile = departmentProfile;
            _userManagementService = userManagementService;

            _chiefMinisterProfileService = chiefMinisterProfileService;
            _jankalyanPortalService = jankalyanPortalService;
        }
        #endregion

        // GET: api/JankalyanHome

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetBannerImageList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAchievementImageList(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.BannerImage), false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAwardList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Awards), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {


                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.DepartmentalAchievements), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementListByCategory(int id, IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {


                objReturn = _advAchievementService.GetAllByCategory(model, id, isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetNewsTickerList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {


                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.NewsTicker), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetExternalLinkList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {


                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.ExternalLink), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetUpcomingEventList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.UpcomingEvents), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetPublicationsList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Publications), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAnnualProgressReportList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.AnnualProgressReport), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetImportantDecisionList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.ImportantDecisions), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetPostersList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Posters), isImageRequired: true, isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAudioList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Audio), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAdvertisementList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Advertisement), isImageRequired: true, isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetVideoList(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllByCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Videos), isBase64File: false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }


        [HttpGet]
        public ServiceResponse<Adv_AchievementViewModel> GetById(long id)
        {
            ServiceResponse<Adv_AchievementViewModel> objReturn = new ServiceResponse<Adv_AchievementViewModel>();
            try
            {
                if (id > 0)
                {
                    return _advAchievementService.GetById(id, true);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }


        [HttpPost]
        public IHttpActionResult GetAchievementListGroupBySubCategory(IndexModel model)
        {
            ServiceResponse<PagedData<SubCategoryGroupAchievementListViewModel>> objReturn = new ServiceResponse<PagedData<SubCategoryGroupAchievementListViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAchievementListGroupBySubCategory(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.DepartmentalAchievements));
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                return InternalServerError(ex);

            }
            return Ok(objReturn);
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementListBySearchFilter(AchievementSearchModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _advAchievementService.GetAllBySearch(model, model.IsBase64File);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public async Task<ServiceResponse<VisitorCountViewModel>> GetVisitorCount(string ipAddress, string logId = null)
        {
            ServiceResponse<VisitorCountViewModel> objReturn = new ServiceResponse<VisitorCountViewModel>();
            try
            {

                return await _visitorCountService.GetVisitorInfo(ipAddress, logId);

            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<List<RajAdvtSideBarModel>> GetRajAdvtSideBarData(int deptCode = 0, int pageSize = 0)
        {
            ServiceResponse<List<RajAdvtSideBarModel>> objReturn = new ServiceResponse<List<RajAdvtSideBarModel>>();
            try
            {
                return _advAchievementService.GetRajAdvtSideBarData(deptCode, pageSize);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public IHttpActionResult GetLastUpdatedWebsiteInfo()
        {
            ServiceResponse<WebsiteUpdateInfoViewModel> objReturn = new ServiceResponse<WebsiteUpdateInfoViewModel>();
            try
            {
                objReturn = _visitorCountService.GetLastUpdatedWebsiteInfo();
                return Ok(objReturn);

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        public IHttpActionResult GetDepartmentProfileList(DepartmentProfileFilterModel model, int excludeEntryType = 0, bool isBase64Files = false)
        {
            ServiceResponse<PagedData<DepartmentProfileViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentProfileViewModel>>();
            try
            {

                return Ok(_departmentProfile.GetAll(model, excludeEntryType, isBase64Files));
            }
            catch

            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                return Ok(objReturn);
            }

        }

        [HttpGet]
        public IHttpActionResult GetDepartmentProfileById(long id, bool isBase64Files = true)
        {
            ServiceResponse<DepartmentProfileViewModel> objReturn = new ServiceResponse<DepartmentProfileViewModel>();
            try
            {
                if (id > 0)
                {
                    return Ok(_departmentProfile.GetById(id, isBase64Files));
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return Ok(objReturn);
        }

        [HttpPost]
        public IHttpActionResult GetDepartmentContactList(DepartmentContactFilterModel model)
        {
            ServiceResponse<PagedData<DepartmentContactViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentContactViewModel>>();
            try
            {

                return Ok(_departmentProfile.GetAllDepartmentContacts(model));
            }
            catch

            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                return Ok(objReturn);
            }

        }

        [HttpGet]
        public IHttpActionResult GetDepartmentContactById(long id)
        {
            ServiceResponse<DepartmentContactViewModel> objReturn = new ServiceResponse<DepartmentContactViewModel>();
            try
            {
                if (id > 0)
                {
                    return Ok(_departmentProfile.GetDepartmentContactById(id));
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return Ok(objReturn);
        }

        [HttpPost]
        public IHttpActionResult GetAchievementListGroupByCategory(IndexModel model)

        {
            ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>> objReturn = new ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>>();
            try
            {
                return Ok(_advAchievementService.GetAchievementListGroupByCategory(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAchievementListGroupByDepartment(IndexModel model)

        {
            ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>> objReturn = new ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>>();
            try
            {
                return Ok(_advAchievementService.GetAchievementListGroupByDepartment(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.DepartmentalAchievements)));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetImportantDecisionListGroupByDepartment(IndexModel model)

        {
            ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>> objReturn = new ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>>();
            try
            {
                return Ok(_advAchievementService.GetAchievementListGroupByDepartment(model, Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.ImportantDecisions)));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }




        [HttpPost]
        public IHttpActionResult GetAchievementDynamicListByCategory(int AchievementCategoryCode, IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                return Ok(_advAchievementService.GetAchievementListGroupByCategory(model, AchievementCategoryCode, isImageRequired: false));
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetDepartmentGroupAchievementListByCategory(int AchievementCategoryCode, IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                return Ok(_advAchievementService.GetAchievementListGroupByDepartment(model, AchievementCategoryCode, isImageRequired: false));
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllUserDetailList(UserDetailFilterModel model)
        {
            ServiceResponse<PagedData<UserViewModel>> objReturn = new ServiceResponse<PagedData<UserViewModel>>();
            try
            {

                return Ok(_userManagementService.GetAllUserDetailByFilter(model));
            }
            catch

            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                return Ok(objReturn);
            }

        }


        [HttpGet]
        public IHttpActionResult GetCMProfile(bool isbase64File = false)
        {
            ServiceResponse<ChiefMinisterProfileViewModel> objReturn = new ServiceResponse<ChiefMinisterProfileViewModel>();
            try
            {

                return Ok<ServiceResponse<ChiefMinisterProfileViewModel>>(_chiefMinisterProfileService.GetActiveDetail(isbase64File));


            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// get achievement attachments by department code 
        /// </summary>
        /// <param name="dptCode"></param>
        /// <created by>Tanmaya</created>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAchievementAttachmentsByDepartmentCode(int dptCode, int categoryCode, long subCatCode = 0)
        {
            ServiceResponse<AchievementAttachmentModel> objReturn = new ServiceResponse<AchievementAttachmentModel>();
            try
            {
                return Ok(_advAchievementService.GetAchievementAttachmentsByDepartmentCode(dptCode, categoryCode, subCatCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllLatestUpdate()
        {
            try
            {
                return Ok(_jankalyanPortalService.GetAllLatestUpdate());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAndSetChiranjeeviVisitorInfo()
        {
            try
            {
                return Ok(_visitorCountService.GetAndSetChiranjeeviVisitorInfo());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult SaveTestimonial(TestimonialModel model)
        {
            try
            {
                return Ok(_jankalyanPortalService.Create(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateTestimonialStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _jankalyanPortalService.UpdateTestimonialStatus(id);
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
        /// Get All Testimonial Record
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetAllTestimonial(IndexModel model)
        {
            ServiceResponse<PagedData<TestimonialViewModel>> objReturn = new ServiceResponse<PagedData<TestimonialViewModel>>();
            try
            {
                return Ok(_jankalyanPortalService.GetAllTestimonial(model));
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Get All Testimonial Record
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetAllTestimonialForBackend(IndexModel model)
        {
            ServiceResponse<PagedData<TestimonialViewModel>> objReturn = new ServiceResponse<PagedData<TestimonialViewModel>>();
            try
            {
                return Ok(_jankalyanPortalService.GetAllTestimonialForBackend(model));
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetRegistrationData(string id = "")
        {
            try
            {
                return Ok(_jankalyanPortalService.GetRegistrationData(id));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        /// <summary>
        /// This Service for show count of enrolled in cherajeevi portal category vise.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetCountOfCherajeevi()
        {
            try
            {
                return Ok(_jankalyanPortalService.GetCountOfCherajeevi());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// This for getting District name and code
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetHospitalDistrictList()
        {
            try
            {
                return Ok(_jankalyanPortalService.GetDistrictListInHospital());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// This method create for get speciality hospital list.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetHospitalSpecislityList()
        {
            try
            {
                return Ok(_jankalyanPortalService.GetHospitalSpecislityList());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// This method create for get Package list.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetHospitalPackageList(int specialityCode)
        {
            try
            {
                return Ok(_jankalyanPortalService.GetHospitalPackageList(specialityCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// This method create for get all hospital data list.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetHospitalDataList(HospitalFilterSearchModel model)
        {
            try
            {
                return Ok(_jankalyanPortalService.GetHospitalDataList(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}
