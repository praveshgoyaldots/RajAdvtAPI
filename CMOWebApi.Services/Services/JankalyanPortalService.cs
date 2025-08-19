using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class JankalyanPortalService : BaseService, IJankalyanPortalService
    {
        IUnitofWork _uow;

        public JankalyanPortalService(IUnitofWork uow)
        {
            _uow = uow;
        }

        public ServiceResponse<List<JankalyanPortalLatestUpdateModel>> GetAllLatestUpdate()
        {
            try
            {

                List<JankalyanPortalLatestUpdateModel> responsedata = new List<JankalyanPortalLatestUpdateModel>();

                List<sp_JAN_Front_LatestUpdateOfAllModule_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_Front_LatestUpdateOfAllModule_Result>("sp_JAN_Front_LatestUpdateOfAllModule").ToList();


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_Front_LatestUpdateOfAllModule_Result, JankalyanPortalLatestUpdateModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata = mapper.Map(data, responsedata);

                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<JankalyanPortalLatestUpdateModel>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        #region calling external API for cheranjeevi portal
        public ServiceResponse<RegistrationModel> GetRegistrationData(string id = "")
        {
            ServiceResponse<RegistrationModel> objReturn = new ServiceResponse<RegistrationModel>();
            try
            {

                string shortUrl = string.Empty;
                string responseData = string.Empty;
                RegistrationModel response = new RegistrationModel();
                string url = "http://abmgrsbyapp.health.rajasthan.gov.in/BSBY/service/schemeService/eidstatus/" + id + "/";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    response = JsonConvert.DeserializeObject<RegistrationModel>(responseData);

                    objReturn = SetResultStatus(response, MessageStatus.Success, true);
                    return objReturn;
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<RegistrationModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }

        }

        /// <summary>
        /// This Service for show count of enrolled in cherajeevi portal category vise.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<CheranjeeviCountModel> GetCountOfCherajeevi()
        {
            ServiceResponse<CheranjeeviCountModel> objReturn = new ServiceResponse<CheranjeeviCountModel>();
            try
            {

                string shortUrl = string.Empty;
                string responseData = string.Empty;
                CheranjeeviCountModel response = new CheranjeeviCountModel();
                string url = "http://abmgrsbyapp.health.rajasthan.gov.in/BSBY/service/schemeService/benificiaryStatusCountData/";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    response = JsonConvert.DeserializeObject<CheranjeeviCountModel>(responseData);

                    objReturn = SetResultStatus(response, MessageStatus.Success, true);
                    return objReturn;
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<CheranjeeviCountModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }

        }

        /// <summary>
        /// This for getting District name and code
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<DistrictModelOnHospitalSearch>> GetDistrictListInHospital()
        {
            ServiceResponse<List<DistrictModelOnHospitalSearch>> objReturn = new ServiceResponse<List<DistrictModelOnHospitalSearch>>();
            try
            {

                string shortUrl = string.Empty;
                string responseData = string.Empty;
                List<DistrictModelOnHospitalSearch> response = new List<DistrictModelOnHospitalSearch>();
                string url = "http://abmgrsbyapp.health.rajasthan.gov.in/bsbyServices/services/v1/districtmaster/";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    var serviceResponse = JsonConvert.DeserializeObject<DistrictHospitalSearchModel>(responseData);

                    response = serviceResponse.data;


                    objReturn = SetResultStatus(response, MessageStatus.Success, true);

                    return objReturn;
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<DistrictModelOnHospitalSearch>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }

        }

        /// <summary>
        /// This method create for get speciality hospital list.
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<HospitalSpecialitySearchModel>> GetHospitalSpecislityList()
        {
            ServiceResponse<List<HospitalSpecialitySearchModel>> objReturn = new ServiceResponse<List<HospitalSpecialitySearchModel>>();
            try
            {

                string shortUrl = string.Empty;
                string responseData = string.Empty;
                List<HospitalSpecialitySearchModel> response = new List<HospitalSpecialitySearchModel>();
                string url = "http://abmgrsbyapp.health.rajasthan.gov.in/bsbyServices/services/v1/specialitymaster/";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    var serviceResponse = JsonConvert.DeserializeObject<SpecialitySearchModel>(responseData);

                    response = serviceResponse.data;

                    objReturn = SetResultStatus(response, MessageStatus.Success, true);

                    return objReturn;
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<HospitalSpecialitySearchModel>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }

        }

        /// <summary>
        /// This method create for get package hospital list.
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<PackageSearchModel>> GetHospitalPackageList(int specialityCode)
        {
            ServiceResponse<List<PackageSearchModel>> objReturn = new ServiceResponse<List<PackageSearchModel>>();
            try
            {

                string shortUrl = string.Empty;
                string responseData = string.Empty;
                List<PackageSearchModel> response = new List<PackageSearchModel>();
                string url = "http://abmgrsbyapp.health.rajasthan.gov.in/bsbyServices/services/v1/packagemaster/?specialityCode=" + specialityCode;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    var serviceResponse = JsonConvert.DeserializeObject<PackageSearchMainModel>(responseData);

                    response = serviceResponse.data;

                    objReturn = SetResultStatus(response, MessageStatus.Success, true);

                    return objReturn;
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<PackageSearchModel>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }

        }

        /// <summary>
        /// This method create for get package hospital list.
        /// </summary>
        /// <returns></returns>
        public async Task<ServiceResponse<List<HospitalSearchListModel>>> GetHospitalDataList(HospitalFilterSearchModel model)
        {
            ServiceResponse<List<HospitalSearchListModel>> objReturn = new ServiceResponse<List<HospitalSearchListModel>>();
            try
            {

                string shortUrl = string.Empty;
                string responseData = string.Empty;
                List<HospitalSearchListModel> response = new List<HospitalSearchListModel>();
                string url = "http://abmgrsbyapp.health.rajasthan.gov.in/bsbyServices/services/v1/hospitalsearch/";

                var values = new Dictionary<string, Object>();

                if (model.district > 0)
                {
                    values.Add("district", model.district.ToString());
                }
                if (model.hospitalType >= 0)
                {
                    values.Add("hospitalType", model.hospitalType.ToString());
                }
                if (!string.IsNullOrEmpty(model.empanelmentType))
                {
                    values.Add("empanelmentType", model.empanelmentType);
                }
                if (model.specialityCode > 0)
                {
                    values.Add("specialityCode", model.specialityCode.ToString());
                }
                if (model.packageCode > 0)
                {
                    values.Add("packageCode", model.packageCode.ToString());
                }

                string json = JsonConvert.SerializeObject(values);
                
                //Needed to setup the body of the request
                StringContent data = new StringContent(json, Encoding.UTF8, "application/json");
                using (var client = new HttpClient())
                {
                    var resultResponse = client.PostAsync(url, data).Result.Content.ReadAsStringAsync();
                   
                        var serviceResponse = JsonConvert.DeserializeObject<HospitalSearchGetAllDataListModel>(resultResponse.Result);
                        response = serviceResponse.data;
                   
                }

                objReturn = SetResultStatus(response, MessageStatus.Success, true);

                return objReturn;


            }
            catch (Exception ex)
            {

                return SetResultStatus<List<HospitalSearchListModel>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }

        }




        #endregion

        #region Testormonial section 
        public async Task<ServiceResponse<string>> Create(TestimonialModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (!string.IsNullOrEmpty(model.PdfUrl))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.PdfUrl, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.PdfUrl = CommonUtility.TestimonialFolderStructure(model.PdfUrl, true, model.Name);
                    }
                    else
                    {
                        return isValid;
                    }
                }

                if (!string.IsNullOrEmpty(model.ImageUrl))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ImageUrl, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.ImageUrl = CommonUtility.TestimonialFolderStructure(model.ImageUrl, false, model.Name);
                    }
                    else
                    {
                        return isValid;
                    }
                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<TestimonialModel, tbltestimonial>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tbltestimonial data = Mapper.Map<TestimonialModel, tbltestimonial>(model);

                data = await _uow.GenericRepository<tbltestimonial>().AddAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
		/// Get all testimonial record
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<TestimonialModel>> GetAllTestimonial(IndexModel model)
        {
            ServiceResponse<PagedData<TestimonialModel>> objReturn = new ServiceResponse<PagedData<TestimonialModel>>();
            try
            {
                PagedData<TestimonialModel> resulData = new PagedData<TestimonialModel>();



                PagedData<tbltestimonial> data = GenericGridCall<tbltestimonial>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false && x.IsActive == true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tbltestimonial, TestimonialModel>()
                    .ForMember(des => des.ImageUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.ImageUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.ImageUrl))) : string.Empty))
                    .ForMember(des => des.PdfUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PdfUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.PdfUrl))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<TestimonialModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<TestimonialModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Get all testimonial record
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<TestimonialModel>> GetAllTestimonialForBackend(IndexModel model)
        {
            ServiceResponse<PagedData<TestimonialModel>> objReturn = new ServiceResponse<PagedData<TestimonialModel>>();
            try
            {
                PagedData<TestimonialModel> resulData = new PagedData<TestimonialModel>();



                PagedData<tbltestimonial> data = GenericGridCall<tbltestimonial>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tbltestimonial, TestimonialModel>()
                    .ForMember(des => des.ImageUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.ImageUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.ImageUrl))) : string.Empty))
                    .ForMember(des => des.PdfUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PdfUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.PdfUrl))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<TestimonialModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<TestimonialModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateTestimonialStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tbltestimonial objResult = _uow.GenericRepository<tbltestimonial>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tbltestimonial>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }
        #endregion
    }
}
