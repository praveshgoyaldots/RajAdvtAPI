using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class UserTypeService : BaseService, IUserTypeService
    {
        #region ///   Varaible   ///

        IUnitofWork _uow;
        #endregion

        #region /// Cunstructor ///

        public UserTypeService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region ///  method   ///

        /// <summary>
        /// Get all User type
        /// </summary>
        /// <returns>Usertype List with message </returns>
        public ServiceResponse<PagedData<UserTypeViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<UserTypeViewModel>> objReturn = new ServiceResponse<PagedData<UserTypeViewModel>>();

            try
            {
                var userTill =Convert.ToInt32(UserIdEnum.TillTheUser);
                var distItOfc = Convert.ToInt32(UserIdEnum.DistItOfc);
                var diptItOfc = Convert.ToInt32(UserIdEnum.DiptItOfc);

                PagedData<UserTypeViewModel> resulData = new PagedData<UserTypeViewModel>();
                PagedData<tblUserType> data = GenericGridCall<tblUserType>.ListView(model.PageSize, x => x.UserTypeTitle, x => x.IsDelete != true && x.UserTypeId> userTill && x.UserTypeId != distItOfc && x.UserTypeId != diptItOfc, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblUserType, UserTypeViewModel>();


                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<UserTypeViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);
                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<UserTypeViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }


        /// <summary>
        /// Get User type detail by userTypeId 
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>UserType Detail</returns>
        public async Task<ServiceResponse<UserTypeViewModel>> GetById(long id)
        {
            try
            {
                tblUserType sector = await _uow.GenericRepository<tblUserType>().GetByIdAsync(id);

                UserTypeViewModel obj = new UserTypeViewModel();
                MapperConfiguration config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblUserType, UserTypeViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(sector, obj);

                return SetResultStatus(obj, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus<UserTypeViewModel>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new userType 
        /// </summary>
        /// <param name="model">UserTypePostModel</param>
        /// <returns>Message</returns>
        public async Task<ServiceResponse<string>> Create(UserTypePostModel model)
        {
            ServiceResponse<tblUserType> objReturn = new ServiceResponse<tblUserType>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<UserTypePostModel, tblUserType>();
                });

                var UserType = Mapper.Map<UserTypePostModel, tblUserType>(model);
                UserType.IsActive = true;
                UserType.IsDelete = false;
                await _uow.GenericRepository<tblUserType>().AddAsync(UserType);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Edit/Update UserType Detail
        /// </summary>
        /// <param name="model">UserTypePostModel</param>
        /// <returns>Message</returns>
        public async Task<ServiceResponse<string>> Edit(UserTypePostModel model)

        {
            ServiceResponse<tblUserType> objReturn = new ServiceResponse<tblUserType>();
            try
            {
                tblUserType obj = new tblUserType();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<UserTypePostModel, tblUserType>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                await _uow.GenericRepository<tblUserType>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Edit/Update Delete status by Id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Message</returns>
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            try
            {
                tblUserType objUserType = await _uow.GenericRepository<tblUserType>().GetByIdAsync(id);
                if (objUserType.IsDelete)
                {
                    objUserType.IsDelete = false;
                }
                else
                {
                    objUserType.IsDelete = true;
                }

                await _uow.GenericRepository<tblUserType>().UpdateAsync(objUserType);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Edit/Update ISActive status by Id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Message</returns>
        public async Task<ServiceResponse<string>> UpdateIsActive(long id)
        {
            try
            {
                tblUserType objUserType = await _uow.GenericRepository<tblUserType>().GetByIdAsync(id);
                if (objUserType.IsActive)
                {
                    objUserType.IsActive = false;
                }
                else
                {
                    objUserType.IsActive = true;
                }
                await _uow.GenericRepository<tblUserType>().UpdateAsync(objUserType);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }
        /// <summary>
        /// Get Downlevel Usertpe 
        /// </summary>
        /// <param name="userType">Usertype</param>
        /// <returns>List of Downlevel User Type</returns>
        public ServiceResponse<List<UserTypeViewModel>> GetUserTypeDownLevel(string userType)
        {
            ServiceResponse<List<UserTypeViewModel>> objReturn = new ServiceResponse<List<UserTypeViewModel>>();
            try
            {
                List<spGetDownLevelUserType_Result> objResult = _uow.ExeccuteStoreProcedure<spGetDownLevelUserType_Result>("spGetDownLevelUserType @UserType", new SqlParameter("UserType", SqlDbType.NVarChar) { Value = userType }).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spGetDownLevelUserType_Result, UserTypeViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn.Data = mapper.Map(objResult, objReturn.Data);
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;

        }

        #endregion
    }
}
