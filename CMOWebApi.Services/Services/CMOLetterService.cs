using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace CMOWebApi.Services.Services
{
    public class CMOLetterService : BaseService, ICMOLetterService
    {
        #region ________Declare Variables_______
        IUnitofWork _uow;
        public readonly Jankalyan_DBEntities _context;
        # endregion

        #region ________Form Constructor_______
        public CMOLetterService(IUnitofWork uow)
        {
            _uow = uow;
        }
        # endregion


        public ServiceResponse<List<CMOLetterViewModel>> GetAllCMOLetter(string DepartmentId)
        {
            ServiceResponse<List<CMOLetterViewModel>> objReturn = new ServiceResponse<List<CMOLetterViewModel>>();

            try
                {
                var data = _uow.ExeccuteStoreProcedure<CMOLetterViewModel>("spCMD_CMOLetter @DepartmentId",
                                        new SqlParameter("@DepartmentId", SqlDbType.VarChar) { Value = DepartmentId }).ToList();
                objReturn = SetResultStatus(data, MessageStatus.Success, true);
                }
            catch(Exception ex)
                {

                }
                return objReturn;
        }


    }
}
