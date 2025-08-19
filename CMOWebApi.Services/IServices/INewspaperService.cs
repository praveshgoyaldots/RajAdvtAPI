using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.NewsModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface INewspaperService
    {
        /// <summary>
        /// Get all newspaper list 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<NewspaperViewModal>> GetAll(IndexModel model);

        /// <summary>
        /// Add new newspaper
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(NewspaperModal model);

        /// <summary>
        /// Update existing newspaper
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(NewspaperModal model);

        /// <summary>
        /// get newspaper by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<NewspaperModal> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);

        /// <summary>
        /// Get Newspaper Transaction Detail With Progress List by Transaction Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<NewspaperTransactionDetailViewModel> GetNewspaperTransactionDetailWithProgressList(long id, bool isBase64File = true);

        #region Update Progress

        /// <summary>
        /// Update news progress
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       Task<ServiceResponse<string>> UpdateNewsProgress(NewspaperProgressMappingModel model);

        /// <summary>
        /// Edit existing news progress record by id
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       Task<ServiceResponse<string>> EditNewsProgress(NewspaperProgressMappingModel model);

        /// <summary>
        /// Get News Progress by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<NewspaperProgressMappingModel> GetNewsProgressById(long id);

        /// <summary>
        /// get newspaper short detail by Id for progress screen
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<NewspaperViewModal> GetNewspaperShortDetailById(long id);
        ServiceResponse<PagedData<NewsProgressListViewModel>> GetAllNewsProgressListByFilter(NewsProgressSearchModel model, bool isAllRecords = false, bool isBase64File = true);
        #endregion
    }
}
