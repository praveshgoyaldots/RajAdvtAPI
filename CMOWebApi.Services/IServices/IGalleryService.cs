using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IGalleryService
    {
        /// <summary>
        /// Get All Gallery data in list Format
        /// </summary>
        /// <param name="model">IndexModel: default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
        /// <returns>Method returns ServiceResponse.</returns>
        ServiceResponse<PagedData<GalleryViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Get Gallery Detail
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        ServiceResponse<GalleryViewModel> GetById(int id);

        /// <summary>
        /// Add/Update Gallery Detail
        /// </summary>
        /// <param name="model">GalleryViewModel</param>
        /// <returns>Method returns ServiceResponse.</returns>
        ServiceResponse<string> AddUpdate(GalleryViewModel model);

        /// <summary>
        /// Update Delete Status of Gallery
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        Task<ServiceResponse<string>> UpdateDeleteStatus(int id);

        /// <summary>
        /// Update Active Status of Gallery
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(int id);
        /// <summary>
        /// Get All Details
        /// </summary>
        /// <param name="model">IndexModel: default value: Page=1; PageSize = 10;OrderByAsc = 1; AdvanceSearchModel { "UploadType" : Value ,"TypeCode":value}</param>
        /// <returns>Method returns ServiceResponse.</returns>
        ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllDetails(IndexModel model, string excludeUploadType = null);
    }
}
