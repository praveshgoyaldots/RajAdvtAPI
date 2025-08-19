using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IJankalyanPortalService
    {
        ServiceResponse<List<JankalyanPortalLatestUpdateModel>> GetAllLatestUpdate();

        #region Call External API
        ServiceResponse<RegistrationModel> GetRegistrationData(string id = "");

        ServiceResponse<CheranjeeviCountModel> GetCountOfCherajeevi();

        ServiceResponse<List<DistrictModelOnHospitalSearch>> GetDistrictListInHospital();

        ServiceResponse<List<HospitalSpecialitySearchModel>> GetHospitalSpecislityList();

        ServiceResponse<List<PackageSearchModel>> GetHospitalPackageList(int specialityCode);

        //ServiceResponse<List<HospitalSearchListModel>> GetHospitalDataList(HospitalFilterSearchModel model);

        Task<ServiceResponse<List<HospitalSearchListModel>>> GetHospitalDataList(HospitalFilterSearchModel model);

        //ServiceResponse<HospitalSearchGetAllDataListModel> GetHospitalDataList(HospitalFilterSearchModel model);

        #endregion

        #region Testimonial Section
        Task<ServiceResponse<string>> Create(TestimonialModel model);
        ServiceResponse<PagedData<TestimonialModel>> GetAllTestimonial(IndexModel model);

        ServiceResponse<PagedData<TestimonialModel>> GetAllTestimonialForBackend(IndexModel model);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateTestimonialStatus(long id);
        #endregion


    }
}
