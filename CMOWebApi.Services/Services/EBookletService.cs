using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class EBookletService : BaseService , IEbookletService
	{
		#region /// Variable ///

		IUnitofWork _uow;

		#endregion

		#region /// Constructor  ///

		public EBookletService(IUnitofWork uow)
		{
			_uow = uow;
		}

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Get E-booklet by Beneficiary Category and Department
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<EBookletResponseModel> GeEbooklet(EBookletFilterModel model)
		{
			EBookletResponseModel objReturn = new EBookletResponseModel();
			try
			{
				if (model.DepartmentCode>0)
				{
					var details=_uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f=>f.DepartmentCode==model.DepartmentCode).Select(x => new EBookletResponseModel { Name = x.DepartmentTitle, Logo = x.LogoUrl.ToAbsolutePath() }).FirstOrDefault();
                    if (details!=null)
                    {
                        objReturn = details;
                    }
                }
				else if(model.BeneficiaryCategoryCode>0)
				{
					var details = _uow.GenericRepository<tblBeneficiaryCagegory>().GetAll(filter: f => f.cm_ansmtcategoryid == model.BeneficiaryCategoryCode).Select(x => new EBookletResponseModel { Name = x.ansmtcategory, Logo = x.AttachmentURL }).FirstOrDefault(); //TODO AttachmentURL path
                    if (details != null)
                    {
                        objReturn = details;
                    }
                }
                else if (model.KPICategoryCode > 0)
                {
                   var details = _uow.GenericRepository<vw_GetAchievementSubCategoryImage>().GetAll(filter: x=>x.KPICategoryCode==model.KPICategoryCode).OrderByDescending(x=>x.ID).Select(x => new EBookletResponseModel { Name = x.KPICategoryName, Logo =x.ImagePath.ToAbsolutePath() }).FirstOrDefault(); if (details != null)
                    {
                        objReturn = details;
                    }
                }
                List<SP_CPT_E_BookletReport_Result> data = _uow.ExeccuteStoreProcedure<SP_CPT_E_BookletReport_Result>("SP_CPT_E_BookletReport @DepartmentCode ,@BeneficiaryCategoryCode ,@KPICategoryCode,@YearWiseCode,@GrandTotalCode,@GeneralEntryEBookletCode,@GeneralEntryEBookletVariableCode,@ParameterCategoryCode"
                 , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
				 , new SqlParameter("BeneficiaryCategoryCode", SqlDbType.Int) { Value = model.BeneficiaryCategoryCode > 0 ? model.BeneficiaryCategoryCode : 0 }
				 , new SqlParameter("KPICategoryCode", SqlDbType.Int) { Value = model.KPICategoryCode > 0 ? model.KPICategoryCode : 0 }
                  , new SqlParameter("YearWiseCode", SqlDbType.BigInt) { Value = model.YearWiseCode > 0 ? model.YearWiseCode : 0 }
                  , new SqlParameter("GrandTotalCode", SqlDbType.BigInt) { Value = model.GrandTotalCode > 0 ? model.GrandTotalCode : 0 }
                    , new SqlParameter("GeneralEntryEBookletCode", SqlDbType.Int) { Value = model.GeneralEntryEBookletCode > 0 ? model.GeneralEntryEBookletCode : 0 }
					 , new SqlParameter("GeneralEntryEBookletVariableCode", SqlDbType.Int) { Value = model.GeneralEntryEBookletVariableCode > 0 ? model.GeneralEntryEBookletVariableCode : 0 }
                      , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = model.ParameterCategoryCode > 0 ? model.ParameterCategoryCode : 0 }
                 ).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SP_CPT_E_BookletReport_Result, BookletDataModel>();
				});
				IMapper mapper = config.CreateMapper();
				objReturn.EBookletList = mapper.Map(data, objReturn.EBookletList);

				return SetResultStatus(objReturn, MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				objReturn = null;
				return SetResultStatus<EBookletResponseModel>(null, MessageStatus.Error, false);
			}
		}

        #endregion

        #region Front

        /// <summary>
        /// Get E-booklet KPI Category, Beneficiary Category and Department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<EBookletCategoryModel>> GeEbookletCategory(EBookletCategoryFilterModel model)
        {
            ServiceResponse<List<EBookletCategoryModel>> objReturn = new ServiceResponse<List<EBookletCategoryModel>>();
            try
            {
                
                List<SP_CPT_FrontEBookletExistingCategories_Result> data = _uow.ExeccuteStoreProcedure<SP_CPT_FrontEBookletExistingCategories_Result>("SP_CPT_FrontEBookletExistingCategories @GeneralEntryEBookletCode ,@GeneralEntryEBookletVariableCode ,@Type"
                 , new SqlParameter("GeneralEntryEBookletCode", SqlDbType.Int) { Value = model.GeneralEntryEBookletCode > 0 ? model.GeneralEntryEBookletCode : 0 }
                 , new SqlParameter("GeneralEntryEBookletVariableCode", SqlDbType.Int) { Value = model.GeneralEntryEBookletVariableCode > 0 ? model.GeneralEntryEBookletVariableCode : 0 }
                 , new SqlParameter("Type", SqlDbType.Int) { Value = model.Type > 0 ? model.Type : 0 }
                  
                 ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_CPT_FrontEBookletExistingCategories_Result, EBookletCategoryModel>()
                    .ForMember(des => des.LogoURL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.LogoURL) ? model.IsLogoURLBase64 ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.LogoURL))) : x.LogoURL.ToAbsolutePath() : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                objReturn.Data = mapper.Map(data, objReturn.Data);

                return SetResultStatus(objReturn.Data, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                return SetResultStatus<List<EBookletCategoryModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get E-booklet list by KPI Category, Beneficiary Category and Department with category details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<FrontBookletDetailModel> GetEBookletandCategoryDetail(EBookletFronFilterModel model)
        {
            try
            {
                List<FrontBookletDetailListModel> dataList = new List<FrontBookletDetailListModel>();
                FrontBookletDetailModel responsedata = new FrontBookletDetailModel();

                List<SP_CPT_E_Front_BookletDetail_Result> eBookletDetail = new List<SP_CPT_E_Front_BookletDetail_Result>();
                SP_CPT_E_Front_BookletCategory_Result categoryDetail = new SP_CPT_E_Front_BookletCategory_Result();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("DepartmentCode", model.DepartmentCode>0 ? model.DepartmentCode:0));
                spParams.Add(new ObjectParameter("BeneficiaryCategoryCode", model.BeneficiaryCategoryCode > 0 ? model.BeneficiaryCategoryCode:0));
                spParams.Add(new ObjectParameter("KPICategoryCode", model.KPICategoryCode > 0 ? model.KPICategoryCode : 0));
                spParams.Add(new ObjectParameter("YearWiseCode", model.YearWiseCode > 0 ? model.YearWiseCode : 0));
                spParams.Add(new ObjectParameter("GrandTotalCode", model.GrandTotalCode > 0 ? model.GrandTotalCode : 0));
                spParams.Add(new ObjectParameter("GeneralEntryEBookletCode", model.GeneralEntryEBookletCode > 0 ? model.GeneralEntryEBookletCode : 0));
                spParams.Add(new ObjectParameter("GeneralEntryEBookletVariableCode", model.GeneralEntryEBookletVariableCode > 0 ? model.GeneralEntryEBookletVariableCode : 0));
                spParams.Add(new ObjectParameter("PageNumber", model.PageNumber > 0 ? model.PageNumber : 0));
                spParams.Add(new ObjectParameter("PageSize", model.PageSize > 0 ? model.PageSize : 0));
                spParams.Add(new ObjectParameter("ParameterCategoryCode", model.ParameterCategoryCode > 0 ? model.ParameterCategoryCode : 0));

                ObjectResult<SP_CPT_E_Front_BookletDetail_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<SP_CPT_E_Front_BookletDetail_Result>("SP_CPT_E_Front_BookletDetail", spParams.ToArray());
                eBookletDetail.AddRange(spResult.ToList());

                ObjectResult<SP_CPT_E_Front_BookletCategory_Result> ORD_OrderRelatedResult = spResult.GetNextResult<SP_CPT_E_Front_BookletCategory_Result>();
                categoryDetail = ORD_OrderRelatedResult.FirstOrDefault();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_CPT_E_Front_BookletCategory_Result, FrontBookletDetailModel>()
                    .ForMember(des => des.LogoURL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.LogoURL) ? model.IsLogoURLBase64 ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.LogoURL))) : x.LogoURL.ToAbsolutePath() : string.Empty));

                    cfg.CreateMap<SP_CPT_E_Front_BookletDetail_Result, FrontBookletDetailListModel>();
                });
                IMapper mapper = config.CreateMapper();
                if (categoryDetail!=null)
                {
                    responsedata = mapper.Map(categoryDetail, responsedata);
                }
                responsedata.DetailListModel = mapper.Map(eBookletDetail, responsedata.DetailListModel);


                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<FrontBookletDetailModel>(null, MessageStatus.Error, false);
            }
        }

        #endregion

    }



}
