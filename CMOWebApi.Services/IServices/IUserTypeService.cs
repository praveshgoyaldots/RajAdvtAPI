using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IUserTypeService
	{
        /// <summary>
        /// Get all User type
        /// </summary>
        /// <returns>Usertype List with message </returns>
        ServiceResponse<PagedData<UserTypeViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add new userType 
        /// </summary>
        /// <param name="model">UserTypePostModel</param>
        /// <returns>Message</returns>
		Task<ServiceResponse<string>> Create(UserTypePostModel model);

        /// <summary>
        /// Get User type detail by userTypeId 
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>UserType Detail</returns>
        Task<ServiceResponse<UserTypeViewModel>> GetById(long id);

        /// <summary>
        /// Edit/Update UserType Detail
        /// </summary>
        /// <param name="model">UserTypePostModel</param>
        /// <returns>Message</returns>
        Task<ServiceResponse<string>> Edit(UserTypePostModel model);

        /// <summary>
        /// Edit/Update Delete status by Id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Message</returns>
		Task<ServiceResponse<string>> Delete(long id);

        /// <summary>
        /// Edit/Update ISActive status by Id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Message</returns>
        Task<ServiceResponse<string>> UpdateIsActive(long id);

        ServiceResponse<List<UserTypeViewModel>> GetUserTypeDownLevel(string userType);


    }
}
