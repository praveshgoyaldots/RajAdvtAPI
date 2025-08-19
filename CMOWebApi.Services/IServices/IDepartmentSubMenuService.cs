using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentSubMenuService
    {
        /// <summary>
        /// Get all Department Sub Menu master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<DepartmentSubMenuListModel>> GetAll(DepartmentSubMenuFilterModel model);

        /// <summary>
        /// Craete new Department Sub Menu
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(DepartmentSubMenuModel model);

        /// <summary>
        /// Department Sub Menu  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<DepartmentSubMenuModel> GetById(long id);

        /// <summary>
        /// Update existing Department Sub Menu
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(DepartmentSubMenuModel model);

        /// <summary>
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        #region ImportSectionMenuAndSubMenu
        ServiceResponse<string> ImportSectionMenuAndSubMenu(ImportSectionMenuAndSubMenuFilterModel model);
        #endregion

    }
}
