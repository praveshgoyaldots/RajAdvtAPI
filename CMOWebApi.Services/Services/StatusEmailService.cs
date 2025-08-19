using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.Services
{
    public class StatusEmailService : BaseService, IStatusEmailService
    {
        #region /// Variable ///

        IUnitofWork _uow;

		#endregion

		#region /// Cunstroctor  ///

		public StatusEmailService(IUnitofWork uow)
        {
            _uow = uow;

        }

        #endregion

        #region Methods

        /// <summary>
        /// Send Jankalyan Status email to all selected departments users
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> SendEmailToDepartment(StatusEmailModel model)
        {
            try
            {
                CreateLogHelper.CreateLogFile("Send Jankalyan Status email to all selected departments users :" + DateTime.Now.ToString() + " \n");
                // Jankalyan Summary Report of All Department
                List<sp_JAN_JankalyanSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_JankalyanSummaryReport_Result>("sp_JAN_JankalyanSummaryReport @DepartmentCode,@Status"
                  , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = 0 }
                  , new SqlParameter("Status", SqlDbType.Int) { Value = -1 }).ToList();
                if (data != null)
                {
                    string readerString = string.Empty;
                    using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Templates/StatusEmail.html")))
                    {
                        //Email Template of All Department Status Report [Start]
                        readerString = reader.ReadToEnd();
                        string allDptReportTable = string.Empty;
                        int count = 0;
                        foreach (var item in data)
                        {
                            ++count;
                            string row = string.Format(@"<tr><td align=""center"" style=""border: solid 1px #ccc; height: 25px;"">{0} </td><td align=""center"" style=""border: solid 1px #ccc; height: 25px;"" > {1} </td><td align=""center"" style=""border: solid 1px #ccc; height: 25px;"" > {2}  </td ></tr> ", count, item.ModuleName, item.TotalCount);
                            allDptReportTable += row;
                        }
                        readerString = readerString.Replace("{AllDptReportTable}", allDptReportTable);

                        long? allTotal = data.Sum(x => x.TotalCount);

                        readerString = readerString.Replace("{AllTotal}", Convert.ToString(allTotal));

                        //Email Template of All Department Status Report [End]


                        foreach (var dptItem in model.DepartmentCodeList)
                        {
                            //Email Template of specific Department Status Report [Start]

                            List<Sp_JAN_StatusEmailData_Result> objDptUserList = new List<Sp_JAN_StatusEmailData_Result>();
                            List<Sp_JAN_StatusEmailJankalyanSummaryReport_Result> jankalyanSummaryReport = new List<Sp_JAN_StatusEmailJankalyanSummaryReport_Result>();

                            int dptcode = Convert.ToInt32(dptItem);
                            tblDepartmentMaster dptObject = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == dptcode).FirstOrDefault();
                            string readerDptString = readerString;
                            ObjectResult<Sp_JAN_StatusEmailData_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<Sp_JAN_StatusEmailData_Result>("Sp_JAN_StatusEmailData", new ObjectParameter("DepartmentCode", Convert.ToInt32(dptItem)));
                            objDptUserList.AddRange(spResult.ToList());

                            ObjectResult<Sp_JAN_StatusEmailJankalyanSummaryReport_Result> reportData = spResult.GetNextResult<Sp_JAN_StatusEmailJankalyanSummaryReport_Result>();
                            jankalyanSummaryReport.AddRange(reportData.ToList());

                            readerDptString = readerDptString.Replace("{DptName}", Convert.ToString(dptObject.DepartmentTitle));
                            string dptReportTable = string.Empty;
                            count = 0;
                            foreach (var item in jankalyanSummaryReport)
                            {
                                ++count;
                                string row = string.Format(@"<tr><td align=""center"" style=""border: solid 1px #ccc; height: 25px;"">{0} </td><td align=""center"" style=""border: solid 1px #ccc; height: 25px;"" > {1} </td><td align=""center"" style=""border: solid 1px #ccc; height: 25px;"" > {2}  </td></tr> ", count, item.ModuleName, item.TotalCount);
                                dptReportTable += row;
                            }
                            readerDptString = readerDptString.Replace("{DptReportTable}", dptReportTable);

                            long? dptTotal = jankalyanSummaryReport.Sum(x => x.TotalCount);

                            readerDptString = readerDptString.Replace("{DeptTotal}", Convert.ToString(dptTotal));

                            var toDptUsersEmailId = objDptUserList.Where(x => !string.IsNullOrEmpty(x.UserEmail)).Select(x => x.UserEmail).ToList();
                            string[] cCEmail = null;
                            if (model.CCEmail!=null)
                            {
                                string[] ccmail = { model.CCEmail };
                                cCEmail = ccmail;
                            }

                            //List<string> toMail = new List<string>();//TODO
                            //toMail.Add("tanmaya.arya@dotsquares.com");//TODO
                            string subject = "Jankalyan Portal Status as on Date: " + DateTime.Now.ToString("dd/MM/yyyy");
                            CreateLogHelper.CreateLogFile("Email For Department" + dptObject.DepartmentTitle + " \n");
							
							CreateLogHelper.CreateLogFile("CC Email" + model.CCEmail + " \n");
                            if (model.ImportantOfficerList !=null && model.ImportantOfficerList.Count>0)
                            {
                                var impOfficers = model.ImportantOfficerList.Where(x => x.DepartmentCode == dptcode).Select(x=>x.Email).ToList();
                                toDptUsersEmailId.AddRange(impOfficers);
                                CreateLogHelper.CreateLogFile("Important officer email id" + string.Join(",", impOfficers) + " \n");
                            }
						
							CreateLogHelper.CreateLogFile("Email To EmailId" + string.Join(",", toDptUsersEmailId) + " \n");
							if (toDptUsersEmailId != null && toDptUsersEmailId.Count > 0)
                            {
                                EmailHelper.SendMail("Jankalyan", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), toDptUsersEmailId, cCEmail, null, subject, readerDptString, null);
                            }

                            //Email Template of specific Department Status Report [End]
                        }
                    }
                    return SetResultStatus(string.Empty, MessageStatus.EmailSendSuccess, true);
                }
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

		/// <summary>
		///  Get List of department contact detail list with filter.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> GetAllDepartmentContactDetailList(ImportantDepartmentContactFilterModel model)
		{
			try
			{
				PagedData<DepartmentContactDetailsViewModel> resultData = new PagedData<DepartmentContactDetailsViewModel>();


				PagedData<vwJAN_DepartmentContactDetails> data = GenericGridCall<vwJAN_DepartmentContactDetails>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false  && (model.DepartmentCode > 0 ? x.DepartmentCode == model.DepartmentCode : true) && (model.DesignationCode > 0 ? x.DesignationCode == model.DesignationCode : true)
				, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwJAN_DepartmentContactDetails, DepartmentContactDetailsViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				resultData.Data = mapper.Map(data.Data, resultData.Data);

				PagedData<DepartmentContactDetailsViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resultData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<DepartmentContactDetailsViewModel>>(null, MessageStatus.Error, false);
			}
		}


		#endregion

		#region Private Methods

		#endregion
	}
}
