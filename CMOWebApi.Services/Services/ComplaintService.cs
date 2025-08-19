using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.ComplaintModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CMOWebApi.Core.Enums.ComplaintEnum;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
	public class ComplaintService : BaseService,IComplaintService
	{
		#region /// Variable ///
		IUnitofWork _uow;
		#endregion

		#region  /// Constructor ///
		public ComplaintService(IUnitofWork uow)
		{
			_uow = uow;
		}
        #endregion

        #region /// Method ///

        public ServiceResponse<PagedData<ComplaintEntryListModel>> GetAll(CompliantSearchModel model)

        {
            ServiceResponse<PagedData<ComplaintEntryListModel>> objReturn = new ServiceResponse<PagedData<ComplaintEntryListModel>>();
            try
            {
                PagedData<ComplaintEntryListModel> responsedata = new PagedData<ComplaintEntryListModel>();

                object[] @sp_params = new object[13];
                @sp_params[0] = model.LoginUserCode;

                @sp_params[1] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToString("MM-dd-yyyy");
                @sp_params[2] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToString("MM-dd-yyyy");
                @sp_params[3] = string.IsNullOrEmpty(model.ActionFromDate) ? string.Empty : Convert.ToDateTime(model.ActionFromDate).ToString("MM-dd-yyyy");
                @sp_params[4] = string.IsNullOrEmpty(model.ActionToDate) ? string.Empty : Convert.ToDateTime(model.ActionToDate).ToString("MM-dd-yyyy");
                @sp_params[5] = model.ApplicationCode;
                @sp_params[6] = model.StatusId;
                @sp_params[7] = model.EntryTypeId;
                @sp_params[8] = model != null && model.indexModel != null && model.indexModel.Page > 0 ? model.indexModel.Page : 1;
                @sp_params[9] = model != null && model.indexModel != null && model.indexModel.PageSize > 0 ? model.indexModel.PageSize : 101;
                @sp_params[10] = string.IsNullOrEmpty(model.indexModel.OrderBy) ? string.Empty : model.indexModel.OrderBy.Trim();
                @sp_params[11] = model.indexModel.OrderByAsc > 0 ? true : false;
                @sp_params[12] = model.SearchText;

                PagedData<sp_GetComplaintListbySearchFilter_Result> objresult = GenericGridCall<sp_GetComplaintListbySearchFilter_Result>.SPListView(@sp_params, model.indexModel.PageSize, x => x.CreatedDate, null, model.indexModel.Search, model.indexModel.OrderBy, model.indexModel.OrderByAsc, model.indexModel.Page, true, true);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_GetComplaintListbySearchFilter_Result, ComplaintEntryListModel>().AfterMap((src, des) =>
                    {
                        des.CreatedDate = src.CreatedDate;
                        des.ModifiedDate = src.ModifiedDate;
                    });
                });

                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(objresult.Data, responsedata.Data);
                #region Get Attachments
                if (responsedata.Data != null && responsedata.Data.Count() > 0)
                {
                    foreach (var record in responsedata.Data)
                    {
                        var files = _uow.GenericRepository<tblCOMPS_AttachmentsLookUp>().GetAll(filter: f => f.ComplaintEntryId == record.Id).ToList();
                        if (files != null && files.Count() > 0)
                        {
                            List<string> filePathList = new List<string>();
                            foreach (var file in files)
                            {
                                filePathList.Add(file.Path.ToAbsolutePath());
                            }
                            record.AttachmentList = filePathList;
                        }
                    }
                }
                #endregion


                responsedata.TotalRecords = objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : objresult.TotalRecords;
                PagedData<ComplaintEntryListModel>.ReturnCustomizeData(responsedata, model.indexModel.PageSize, responsedata.TotalRecords);


                PagedData<ComplaintEntryListModel>.ReturnCustomizeData(responsedata, model.indexModel.PageSize, (objresult != null && objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : 0), page: model.indexModel.Page);

               


                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);


            }
            catch
            {
                objReturn = SetResultStatus<PagedData<ComplaintEntryListModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }
        public ServiceResponse<PagedData<ComplaintEntryListModel>> GetAll(IndexModel model)

		{
			ServiceResponse<PagedData<ComplaintEntryListModel>> objReturn = new ServiceResponse<PagedData<ComplaintEntryListModel>>();
			try
			{

				PagedData<ComplaintEntryListModel> resulData = new PagedData<ComplaintEntryListModel>();
				PagedData<vw_COMPS_ComplaintEntry> data = new PagedData<vw_COMPS_ComplaintEntry>();

				string statusIds=model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("StatusIds") ? (model.AdvanceSearchModel["StatusIds"].ToString()) : string.Empty) : string.Empty;

				List<long?> ids = JsonConvert.DeserializeObject<List<long?>>(statusIds);

				if (_loginUserDetail.SSOID.ToLower() == "CMISNEWTEST1".ToLower())
				{
					 data = GenericGridCall<vw_COMPS_ComplaintEntry>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false && (ids != null && ids.Count>0?ids.Contains(x.StatusId): true) && x.IsDevFilter==true , model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				}
               
                else if (_loginUserDetail.UserType.ToLower() == UserTypeEnum.ADM.ToString().ToLower() || _loginUserDetail.UserType.ToLower() == UserTypeEnum.SADM.ToString().ToLower())
				{
					 data = GenericGridCall<vw_COMPS_ComplaintEntry>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false && (ids != null && ids.Count > 0 ? ids.Contains(x.StatusId) : true) && x.IsAdmFilter == true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				}
				else if (_loginUserDetail.UserType.ToLower() != UserTypeEnum.ADM.ToString().ToLower() || _loginUserDetail.UserType.ToLower() != UserTypeEnum.SADM.ToString().ToLower())
				{
				    data = GenericGridCall<vw_COMPS_ComplaintEntry>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false && (ids != null && ids.Count > 0 ? ids.Contains(x.StatusId) : true) && x.IsUserFilter == true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				}

				var config = new MapperConfiguration(cfg =>
				{
                    cfg.CreateMap<vw_COMPS_ComplaintEntry, ComplaintEntryListModel>()
                     .ForMember(des => des.AttachmentList, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Attachments) ? x.Attachments.Split(',') : null));
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<ComplaintEntryListModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<ComplaintEntryListModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}
        public ServiceResponse<ComplaintEntryListModel> GetById(int id)
        {
            ServiceResponse<ComplaintEntryListModel> objReturn = new ServiceResponse<ComplaintEntryListModel>();
            try
            {
                vw_COMPS_ComplaintEntry objMaster = _uow.GenericRepository<vw_COMPS_ComplaintEntry>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (objMaster != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vw_COMPS_ComplaintEntry, ComplaintEntryListModel>().AfterMap((src, des) =>
                        {
                            des.CreatedDate = src.CreatedDate;
                            des.ModifiedDate = src.ModifiedDate;
                        });

                    });
                    objReturn.Data = Mapper.Map<vw_COMPS_ComplaintEntry, ComplaintEntryListModel>(objMaster);


                    #region Get Attachments
                    if (objReturn.Data != null)
                    {
                        var files = _uow.GenericRepository<tblCOMPS_AttachmentsLookUp>().GetAll().Where(f => f.ComplaintEntryId == objReturn.Data.Id).ToList();
                        if (files != null && files.Count() > 0)
                        {
                            List<string> filePathList = new List<string>();
                            foreach (var file in files)
                            {
                                filePathList.Add(file.Path.ToAbsolutePath());
                            }
                            objReturn.Data.AttachmentList = filePathList;
                        }
                    }
                    #endregion
                    #region Get Action List
                    if (objReturn.Data != null)
                    {
                        var actions = _uow.GenericRepository<vwComplaintActionHistory>().GetAll().Where(f => f.ComplaintEntryId == id).ToList();
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<vwComplaintActionHistory, ComplaintActionHistory>();
                        });
                        objReturn.Data.ActionList = Mapper.Map<List<vwComplaintActionHistory>, List<ComplaintActionHistory>>(actions);
                        foreach (var file in objReturn.Data.ActionList)
                        {
                            file.AttachmentURL = file.AttachmentURL.ToAbsolutePath();
                        }
                    }
                    #endregion
                    //_commonService.AddTransactionLog(null, id, "Search Project");//#LogViewCode
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Create Compliant by user 
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(CompliantEntryModel model)
		{
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<CompliantEntryModel, tblCOMPS_ComplaintEntry>();
				});
				tblCOMPS_ComplaintEntry obj = Mapper.Map<CompliantEntryModel, tblCOMPS_ComplaintEntry>(model);
				obj.CreatedDate = DateTime.Now;
				obj.CreatedBy = _loginUserDetail.UserId;
				obj.StatusId = Convert.ToInt32(StatusEnum.Pending);
				_uow.GenericRepository<tblCOMPS_ComplaintEntry>().Add(obj);
				_uow.save();

				var ModuleName = _uow.GenericRepository<tblApplicationMaster>().GetAll(filter: x => x.ApplicationCode == model.ApplicationCode).OrderBy(x => x.ApplicationTitle).FirstOrDefault();
				if (model.AttachmentList != null && model.AttachmentList.Count > 0)
				{

					foreach (var item in model.AttachmentList)
					{
						if (!string.IsNullOrEmpty(item.AttachmentsUrl) || !string.IsNullOrEmpty(item.AttachmentsUrl))
						{
							tblCOMPS_AttachmentsLookUp objchild = new tblCOMPS_AttachmentsLookUp();

							var isValid = CommonUtility.IsAllowedMimeType(item.AttachmentsUrl, false, _loginUserDetail.FileSize);
							if (isValid.IsSuccess)
							{

								item.AttachmentsUrl = CommonUtility.UploadComplaint(item.AttachmentsUrl, ModuleName.ApplicationTitle.Replace(" ",""), string.Empty );
							}
							else if (CommonUtility.IsAllowedMimeType(item.AttachmentsUrl, true, _loginUserDetail.FileSize).IsSuccess)
							{
								item.AttachmentsUrl = CommonUtility.UploadComplaint(item.AttachmentsUrl, ModuleName.ApplicationTitle.Replace(" ", ""), string.Empty);
							}
							else
							{
								return isValid;
							}
							objchild.ComplaintEntryId = obj.Id;
							objchild.Path = item.AttachmentsUrl;
							await _uow.GenericRepository<tblCOMPS_AttachmentsLookUp>().AddAsync(objchild);
						}
					}
				}

				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Create, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// take action by user, developer and administrator for compliant.
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> CreateAction(CompliantActionModel model)
		{
			try
			{ 

				var compliantObj = _uow.GenericRepository<tblCOMPS_ComplaintEntry>().GetByID(model.ComplaintEntryId);
				if (!string.IsNullOrEmpty(model.AttachmentURL ))
				{
					var isValid = CommonUtility.IsAllowedMimeType(model.AttachmentURL, false, _loginUserDetail.FileSize);
					if (isValid.IsSuccess)
					{
                        //model.AttachmentURL = CommonUtility.UploadAction(model.AttachmentURL, compliantObj.tblCOMPS_ModuleMaster.Name, string.Empty);
                        var applicationName = _uow.GenericRepository<tblApplicationMaster>().GetAll(filter: x => x.ApplicationCode == compliantObj.ApplicationCode).OrderBy(x => x.ApplicationTitle).FirstOrDefault();

                        model.AttachmentURL = CommonUtility.UploadAction(model.AttachmentURL, applicationName.ApplicationCode, string.Empty);

                    }
				}
			
				Mapper.Initialize(x =>
				{
					x.CreateMap<CompliantActionModel, tblCOMPS_ActionLookUp>();
				});
				tblCOMPS_ActionLookUp obj = Mapper.Map<CompliantActionModel, tblCOMPS_ActionLookUp>(model);
				obj.CreatedDate = DateTime.Now;
				obj.CreatedBy = _loginUserDetail.UserId;
				_uow.GenericRepository<tblCOMPS_ActionLookUp>().Add(obj);

				 compliantObj.StatusId= obj.StatusId;
				await _uow.GenericRepository<tblCOMPS_ComplaintEntry>().UpdateAsync(compliantObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Create, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}


		#endregion


	}
}
