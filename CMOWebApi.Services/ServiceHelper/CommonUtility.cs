using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using static CMOWebApi.Core.Enums.FileValiodation;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.OrderEnum;

namespace CMOWebApi.Services.ServiceHelper
{
    public static class CommonUtility
    {
        private static readonly string _advImgPath = FilePath.AdvImgBaseLocation.GetStringValue();
        private static readonly string _advPdfPath = FilePath.AdvPdfBaseLocation.GetStringValue();
        private static readonly string _schemePath = FilePath.SchemeLocation.GetStringValue();
        private static readonly string _orderPath = FilePath.OrderLocation.GetStringValue();
        private static readonly string _generateOrderPath = FilePath.GenerateOrderLocation.GetStringValue();
        private static readonly string _generateComplaintPath = FilePath.GenerateComplaintLocation.GetStringValue();
        private static readonly string _generateActionPath = FilePath.GenerateActionLocation.GetStringValue();
        private static readonly string _orderTypePath = FilePath.OrderTypePathLocation.GetStringValue();
        private static readonly string _achntPath = FilePath.AchievementLocation.GetStringValue();
        private static readonly string _achntCatPath = FilePath.AchievementCategoryMasterLocation.GetStringValue();
        private static readonly string _achntSubCatPath = FilePath.AchievementSubCategoryMasterLocation.GetStringValue();
        private static readonly string _departmentProfileImagePath = FilePath.DepartmentProfileImagePath.GetStringValue();
        private static readonly string _departmentProfilePDFPath = FilePath.DepartmentProfilePDFPath.GetStringValue();
        private static readonly string _testimonialFilePDFPath = FilePath.TestimonialPDFPath.GetStringValue();
        private static readonly string _testimonialFileImagePath = FilePath.TestimonialImagePath.GetStringValue();
        private static readonly string _newsModulePath = FilePath.NewsModulePath.GetStringValue();
        private static readonly string _CMProfileFilePath = FilePath.CMProfileFilePath.GetStringValue();
        private static readonly string _projectMasterPath = FilePath.ProjectMasterPath.GetStringValue();
        private static readonly string _mPConstituencyPath = FilePath.MPConstituencyPath.GetStringValue();
        private static readonly string _mLAConstituencyPath = FilePath.MLAConstituencyPath.GetStringValue();
        private static readonly string _childPageMasterPath = FilePath.ChildPageMasterPath.GetStringValue();
        private static readonly string _tenderFilePath = FilePath.TenderFilePath.GetStringValue();
        private static readonly string _departmentMenuFilePath = FilePath.DepartmentMenuPath.GetStringValue();
        private static readonly string _pressReleaseFilePath = FilePath.PressReleaseFilePath.GetStringValue();

        //public static CMOWebApiEntities db = new CMOWebApiEntities();
        //public static readonly string ApiKeyForAndroid = ConfigurationManager.AppSettings["ApiKeyforAndroid"];
        //public static List<tblSystemFunctionality> GetAssignedRoles(string RoleId)
        //{
        //    var result = db.tblRoleFunctionalities.Where(c => c.RoleID == RoleId && c.tblSystemFunctionality.ActiveStatus == 1).Select(t => t.tblSystemFunctionality).Distinct().OrderBy(c => c.FunctionalityOrderID).ToList();
        //    return result;
        //}
        //public static tblPermission GetPermissionByName(string PermissionDescription)
        //{
        //    var result = db.tblPermissions.Where(x => x.PermissionDescription == PermissionDescription).FirstOrDefault();
        //    return result;
        //}
        //public static tblPermission AddPermission(tblPermission model)
        //{
        //    try
        //    {
        //        db.tblPermissions.Add(model);
        //        db.SaveChanges();
        //        return model;
        //    }
        //    catch
        //    {
        //        return model;
        //    }
        //}
        //public static bool GetRoleByName(string RoleName)
        //{
        //    var RoleArray = RoleName.Split(',');
        //    bool IsAllowed = false;
        //    foreach (var item in RoleArray)
        //    {
        //        AspNetRole User = db.AspNetRoles.Where(x => x.Name == item).OrderBy(x => x.RoleLevel).FirstOrDefault();
        //        if (User != null && User.Allowtologin == true)
        //        {
        //            IsAllowed = true;
        //            return IsAllowed;
        //        }
        //        else if (User != null && User.Allowtologin == false)
        //        {
        //            IsAllowed = false;
        //        }
        //        else
        //        {
        //            return IsAllowed = false;
        //        }
        //    }
        //    db.Dispose();
        //    return IsAllowed;
        //}

        /// <summary>
        /// Base 64 to File 
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="SavePath"></param>
        /// <returns></returns>
        public static string SaveFileFromBase64str_old(string strBase64, string SavePath)
        {
            string FileName = string.Empty;
            try
            {
                if (!string.IsNullOrEmpty(strBase64) && !string.IsNullOrEmpty(SavePath))
                {
                    string[] Fileinfo = strBase64.Split(';');
                    byte[] byteArr = Convert.FromBase64String(Fileinfo[1].Substring(Fileinfo[1].IndexOf(',') + 1));
                    FileName = Guid.NewGuid().ToString() + "." + Fileinfo[0].Split('/')[1];
                    File.WriteAllBytes(SavePath + FileName, byteArr);
                }
            }
            catch
            {

                throw;
            }
            return FileName;
        }




        public static ServiceResponse<string> IsAllowedMimeType(this string base64string, bool isDoc = false, long? fileSize = 0)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn.IsSuccess = false;
                objReturn.Message = CustomMessageStatus.FileNotValid;
                long? attachmentSize = Convert.ToInt64(SchemeValueTypeEnumKeyForFile.Size);
                //if (fileSize != null && fileSize > 0)
                //{
                //    attachmentSize = fileSize;
                //}
                var size = attachmentSize * 1024 * 1024;

                string[] Fileinfo = base64string.Split(';');
                byte[] byteArr = Convert.FromBase64String(Fileinfo[1].Substring(Fileinfo[1].IndexOf(',') + 1));
                MemoryStream ms = new MemoryStream(byteArr);
                string data = base64string.Split(',')[1].Substring(0, 5);
                if (isDoc)
                {
                    switch (data.ToUpper())
                    {
                        case "JVBER":
                            //pdf
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "pdf";
                                return objReturn;
                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;


                        case "0M8R4":
                            //ppt and doc
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = Fileinfo[0].Split(':')[1] == "application/msword" ? "doc" : "ppt";
                                return objReturn;
                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;


                        case "UESDB":
                            //pptx and  docx
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = Fileinfo[0].Split(':')[1] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" : "pptx";
                                return objReturn;
                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;




                        default:
                            //other types

                            return objReturn;
                    }

                }
                else
                {
                    switch (data.ToUpper())
                    {
                        case "IVBOR":
                            //png
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "png";
                                return objReturn;
                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "/9J/4":
                            //jpg
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "jpg";
                                return objReturn;
                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "AAAAG": //mp4
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "mp4";

                                return objReturn;

                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "AAAAH": //3gp
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "3gp";
                                return objReturn;

                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;

                        case "RKXWA":  //flv
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "flv";
                                return objReturn;

                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "UKLGR":  //avi
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "avi";
                                return objReturn;

                            }
                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "GKXFO"://mkv
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "mkv";
                                return objReturn;


                            }

                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "AAAAF"://mov
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "mov";
                                return objReturn;

                            }

                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;
                        case "AAABU"://mpeg
                            if (ms.Length < size)
                            {
                                objReturn.IsSuccess = true;
                                objReturn.Data = "mpeg";
                                return objReturn;

                            }

                            objReturn.Message = CustomMessageStatus.FileSize + attachmentSize + " MB";
                            return objReturn;

                        default:
                            //other types
                            objReturn.IsSuccess = true;
                            return objReturn;
                    }
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("CommonUtility/ IsAllowedMimeType", ex);
                objReturn.IsSuccess = false;
                objReturn.Exception = ex.Message;
                return objReturn;
            }
        }

        public static string GetExtenstion(this string Base64, bool isDoc)
        {
            try
            {
                var fileInfo = IsAllowedMimeType(Base64, isDoc);
                if (fileInfo.IsSuccess)
                {
                    return fileInfo.Data;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception)
            {

                return null;
            }

        }

        /// <summary>
        /// GetMime Type From File
        /// </summary>
        /// <param name="filePath">Full FilePath</param>
        /// <returns>string</returns>
        private static string GetMimeType(string filePath)
        {
            try
            {
                string[] Path = filePath.Split('\\');
                return MimeMapping.GetMimeMapping(Path[Path.Length - 1]);
            }
            catch (Exception)
            {

                throw;
            }

        }



        /// <summary>
        /// Build AdvanceSearchParameter list to database query.
        /// </summary>
        /// <param name="searchParamList"></param>
        /// <returns>Method return string value</returns>
        /// <developer>Harry</developer>
        public static string BuildAdvanceSearchText(List<AdvanceSearchParameter> searchParamList)
        {
            string AdvSearchText = "";
            if (searchParamList != null && searchParamList.Count > 0)
            {
                foreach (var param in searchParamList)
                {
                    if (!string.IsNullOrEmpty(param.Value) && param.Value != "0")
                    {
                        if (param.Type.ToLower() == DBFilterType.DateFrom_MultiDateString.GetStringValue().ToLower())
                        {
                            AdvSearchText += " ((SELECT COUNT(item) FROM(SELECT * FROM dbo.fnSplit(" + param.FieldName + ", '~')) AS temp WHERE '" + param.Value + "'<=item) > 0) AND ";
                        }
                        else if (param.Type.ToLower() == DBFilterType.DateTo_MultiDateString.GetStringValue().ToLower())
                        {
                            AdvSearchText += " ((SELECT COUNT(item) FROM(SELECT * FROM dbo.fnSplit(" + param.FieldName + ", '~')) AS temp WHERE '" + param.Value + "'>=item) > 0) AND ";
                        }

                        else if (param.Type.ToLower() == DBFilterType.Number_From.GetStringValue().ToLower())
                        {
                            AdvSearchText += " " + param.FieldName + " >= " + param.Value + " AND ";
                        }
                        else if (param.Type.ToLower() == DBFilterType.Number_To.GetStringValue().ToLower())
                        {
                            AdvSearchText += " " + param.FieldName + " <= " + param.Value + " AND ";
                        }

                        else if (param.Type.ToLower() == DBFilterType.MultiSelect.GetStringValue().ToLower())
                        {
                            AdvSearchText += " '" + param.Value + "' IN (SELECT Item FROM dbo.fnSplit(" + param.FieldName + ", ',')) AND ";
                        }
                        else if (isNumeric(param.Value, System.Globalization.NumberStyles.Integer))
                        {
                            if (param.Type.ToLower() == DBFilterType.nVarChar.GetStringValue().ToLower())
                            {
                                AdvSearchText += " " + param.FieldName + " LIKE N'%CONVERT(NTEXT," + param.Value.Replace("'", "''") + ")%' AND ";
                            }
                            else if (param.Type.ToLower() == DBFilterType.VarChar.GetStringValue().ToLower())
                            {
                                AdvSearchText += " " + param.FieldName + " LIKE '%" + param.Value.Replace("'", "''") + "%' AND ";
                            }
                            else
                            {
                                AdvSearchText += " " + param.FieldName + " = " + param.Value + " AND ";
                            }
                        }
                        else if (param.Type.ToLower() == DBFilterType.Date_From.GetStringValue().ToLower())
                        {
                            AdvSearchText += " FLOOR(CONVERT(FLOAT, CONVERT(DATETIME, " + param.FieldName + ", 103))) >= FLOOR(CONVERT(FLOAT, CONVERT(DATETIME, '" + DateFromString(param.Value).ToString("dd/MM/yyyy") + "', 103))) AND ";
                        }
                        else if (param.Type.ToLower() == DBFilterType.Date_To.GetStringValue().ToLower())
                        {
                            AdvSearchText += " FLOOR(CONVERT(FLOAT, CONVERT(DATETIME, " + param.FieldName + ", 103))) <= FLOOR(CONVERT(FLOAT, CONVERT(DATETIME, '" + DateFromString(param.Value).ToString("dd/MM/yyyy") + "', 103))) AND ";
                        }
                        else if (param.Type.ToLower() == DBFilterType.Bit.GetStringValue().ToLower())
                        {
                            if (param.Value == "true")
                            { AdvSearchText += " " + param.FieldName + " = 1 AND "; }
                            else
                            { AdvSearchText += " " + param.FieldName + " = 0 AND "; }
                        }
                        else
                        {
                            AdvSearchText += " " + param.FieldName + " LIKE N'%" + param.Value.Replace("'", "''") + "%' AND ";
                        }
                    }
                }
            }

            if (AdvSearchText.Trim().EndsWith("AND"))
            {
                AdvSearchText = AdvSearchText.Trim().Substring(0, AdvSearchText.LastIndexOf("AND") - 1);
            }
            return AdvSearchText;
        }

        /// <summary>
        /// Check value is numeric or not
        /// </summary>
        /// <param name="val"></param>
        /// <param name="numberStyle"></param>
        /// <returns>Method return bool value</returns>
        /// <developer>Harry</developer>
        public static bool isNumeric(string val, System.Globalization.NumberStyles numberStyle)
        {
            Int64 result;
            return Int64.TryParse(val, numberStyle, System.Globalization.CultureInfo.CurrentCulture, out result);
        }

        /// <summary>
        /// Convert date string to datetime 
        /// </summary>
        /// <param name="strDate"></param>
        /// <returns>Method return datetime value</returns>
        /// <developer>Harry</developer>
        public static DateTime DateFromString(string strDate)
        {
            try
            {
                DateTime dtNew;
                char[] ch = { '/', '-' };
                if (strDate != "")
                {
                    var date = strDate.Split('T')[0];
                    // universal date format: yyyy/mm/dd
                    dtNew = new DateTime(Convert.ToInt32(date.Split(ch)[0]), Convert.ToInt32(date.Split(ch)[1]), Convert.ToInt32(date.Split(ch)[2]), DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
                }
                else
                {
                    dtNew = DateTime.Now;
                }
                return dtNew;
            }
            catch
            {
                return DateTime.Now;
            }
        }

        public static DateTime ToValidDate(this string value)
        {
            try
            {
                if (!string.IsNullOrEmpty(value))
                {
                    return Convert.ToDateTime(DateTime.ParseExact(value, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                }
            }
            catch
            { }
            return System.DateTime.MinValue;
        }

        public static string GenerateRandomString(int length = 20)
        {
            try
            {
                Random random = new Random();
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
                return new string(Enumerable.Repeat(chars, length)
                  .Select(s => s[random.Next(s.Length)]).ToArray());
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static string GetIpAddress()
        {
            string ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ip))
            {
                ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            return ip;
        }

        public static string UploadScheme(string strBase64, long key, string dept, string schemeShotName, string imgType)
        {
            string path = string.Empty;
            string fileName = string.Empty;
            try
            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                dept = reg.Replace(dept, "_");

                path = _schemePath + dept.Trim() + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + schemeShotName.Trim() + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                fileName = imgType + "_" + key + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];

                bool result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);

                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static string UploadOrder(string strBase64, string orderNumber, string dept, string orderType, bool IsOldOrder, DateTime orderDate)
        {
            string path = string.Empty;
            string fileName = string.Empty;
            string year = DateTime.Now.ToString("yyyy");

            try

            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                dept = reg.Replace(dept, "_");
                orderType = reg.Replace(orderType, "_");

                path = _orderPath + dept.Trim() + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + orderType.Trim() + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                if (IsOldOrder)
                {

                    fileName = "O" + "_" + (orderDate != null ? (orderDate.ToString("dd") + orderDate.ToString("MM") + orderDate.ToString("yy")) : string.Empty) + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    int length = Convert.ToInt32(OrderTypeEnum.Length);
                    // string substr = orderNumber.Substring(orderNumber.Length - 2);
                    var substr = orderNumber.Replace(orderNumber.Substring(0, Convert.ToInt32(OrderNumberEnum.Length)), "");
                    fileName = "N" + "_" + substr.PadLeft(length, '0') + "_" + (orderDate != null ? (orderDate.ToString("dd") + orderDate.ToString("MM") + orderDate.ToString("yy")) : string.Empty) + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                bool result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);

                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public static string UploadAdvertisement(string strBase64, long key, bool isPdf = false, bool isredesign = false)
        {
            bool result = true;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                if (isPdf)
                {
                    path = _advImgPath + year + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    path = path + month + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                }
                else
                {
                    path = _advImgPath + year + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    path = path + month + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                }

                if (isredesign)
                {
                    fileName = key + "_ADV_RED_" + Guid.NewGuid().ToString();
                }
                else
                {
                    fileName = key + "_ADV_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                    result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                }

                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("CommonUtility/ UploadAdvertisement", ex);
                return null;
            }
        }

        public static string UploadAchievement(string strBase64, long recordId, bool isDoc = false, string RemoveFilePath = "", int catId = 0)
        {
            bool result = true;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                if (isDoc)
                {
                    path = _achntPath + year + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    path = path + month + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                }
                else
                {
                    path = _achntPath + year + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    path = path + month + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                }

                if (isDoc)
                {
                    fileName = recordId + "_ACH_" + Guid.NewGuid().ToString() + "." + strBase64.GetExtenstion(isDoc);

                }
                else
                {
                    fileName = recordId + "_ACH_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!isDoc)
                {
                    if (catId == Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Advertisement) || catId == Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.Posters))
                    {
                        SaveThumbnailImage(path, fileName, "Th_", 580, 700);

                    }
                    else if (catId == Convert.ToInt32(AchievementsEnum.AchievementCategoryEnum.BannerImage))
                    {
                        SaveThumbnailImage(path, fileName, "Th_");

                    }
                    else
                    {
                        //SaveThumbnailImage(path, fileName, "Th_", 580, 700);
                        SaveThumbnailImage(path, fileName, "Th_", 350, 0, "W");
                    }
                }

                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                    if (!isDoc)
                    {

                        if (File.Exists(RemoveFilePath.ToThumbnailPath("Thumbnail")))
                        {
                            DeleteExistingFile(RemoveFilePath.ToThumbnailPath("Thumbnail"));
                        }

                    }

                }
                CreateLogHelper.CreateLogFile("UploadAchievement path + fileName :" + path + fileName + " \n");
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("UploadAchievement ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadAchievement ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadAchievement ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }


        public static string UploadCMProfilePhoto(string strBase64, long recordId, string RemoveFilePath = "")
        {
            bool result = true;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(_CMProfileFilePath)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(_CMProfileFilePath));
                }
                path = _CMProfileFilePath + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }


                fileName = recordId + "_CM_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);

                SaveThumbnailImage(path, fileName, "Th_", 400, 400);




                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));

                    if (File.Exists(RemoveFilePath.ToThumbnailPath("Thumbnail")))
                    {
                        DeleteExistingFile(RemoveFilePath.ToThumbnailPath("Thumbnail"));
                    }

                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        public static void UserActivityLog(string moduleName, string pageName, string pageType, string SystemIp, string Url, string status, string remarks)
        {

        }

        public static string UploadAchievementMaster(string strBase64, long recordId, bool isPdf = false, bool isMaster = true, string RemoveFilePath = "")
        {
            bool result = true;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                if (isPdf)
                {
                    path = (isMaster ? _achntCatPath : _achntSubCatPath) + year + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    path = path + month + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                }
                else
                {
                    path = (isMaster ? _achntCatPath : _achntSubCatPath) + year + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    path = path + month + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path + "/Thumbnail"));

                    }
                }

                fileName = recordId + "_ACH_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));

                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static string UploadGenerateOrder(string strBase64, string orderNumber, string dept, string orderType, DateTime orderDate)
        {
            string path = string.Empty;
            string fileName = string.Empty;
            string year = DateTime.Now.ToString("yyyy");

            try
            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                dept = reg.Replace(dept, "_");
                path = _generateOrderPath + dept + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + orderType + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                int length = Convert.ToInt32(OrderTypeEnum.Length);
                var substr = orderNumber.Replace(orderNumber.Substring(0, Convert.ToInt32(OrderNumberEnum.Length)), "");
                // string substr = orderNumber.Substring(orderNumber.Length - 2);
                fileName = substr.PadLeft(length, '0') + "_" + (orderDate != null ? (orderDate.ToString("dd") + orderDate.ToString("MM") + orderDate.ToString("yy")) : string.Empty) + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                bool result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);

                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// <summary>dep
        /// complaint Software auto folder generation
        /// </summary>
        /// <param name="fileWithPath"></param>
        public static string UploadComplaint(string strBase64, string moduleName, string RemoveFilePath = "")
        {
            bool result = false;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {

                Regex reg = new Regex("[*'\",_&#^@. ]");
                moduleName = reg.Replace(moduleName, "_");
                path = _generateComplaintPath + moduleName + "/";

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                fileName = moduleName + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));

                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// complaint Software auto folder generation
        /// </summary>
        /// <param name="fileWithPath"></param>
        public static string UploadAction(string strBase64, string moduleName, string RemoveFilePath = "")
        {
            bool result = false;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {

                Regex reg = new Regex("[*'\",_&#^@. ]");
                moduleName = reg.Replace(moduleName, "_");
                path = _generateActionPath + moduleName + "/";

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                fileName = moduleName + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));

                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// Order Type master auto folder generation
        /// </summary>
        /// <param name="fileWithPath"></param>
        public static string UploadOrderType(string strBase64, string name, string RemoveFilePath = "")
        {
            bool result = false;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {

                Regex reg = new Regex("[*'\",_&#^@. ]");
                name = reg.Replace(name, "_");
                path = _orderTypePath;

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                fileName = Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));

                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #region Department Profile

        /// <summary>
        /// Generate Folder structure with file name
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="dept">Department short name</param>
        /// <param name="IsPDF"></param>
        /// <param name="RemoveFilePath"></param>
        /// <returns></returns>
        public static string DepartmentProfileFolderStructure(string strBase64, string dept, bool IsPDF = false, string RemoveFilePath = "")
        {

            bool result = false;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                dept = reg.Replace(dept, "_");
                if (IsPDF)
                {
                    path = _departmentProfilePDFPath + dept + "/";
                }
                else
                {
                    path = _departmentProfileImagePath + dept + "/";
                }
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                fileName = dept + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);

                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion

        #region Testimonial File Path

        /// <summary>
        /// Generate Folder structure with file name
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="dept">Department short name</param>
        /// <param name="IsPDF"></param>
        /// <param name="RemoveFilePath"></param>
        /// <returns></returns>
        public static string TestimonialFolderStructure(string strBase64, bool IsPDF = false, string RemoveFilePath = "")
        {
            bool result = false;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                //dept = reg.Replace(dept, "_");
                if (IsPDF)
                {
                    path = _testimonialFilePDFPath + "/";
                }
                else
                {
                    path = _testimonialFileImagePath + "/";
                }
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                fileName = Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);

                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("TestimonialFolderStructure ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("TestimonialFolderStructure ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("TestimonialFolderStructure ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }

        #endregion




        public static bool RemoveExistingFile(string filePath, bool isImage = false)
        {
            if (File.Exists(HttpContext.Current.Server.MapPath(filePath)))
            {
                // If file found, delete it    
                File.Delete(HttpContext.Current.Server.MapPath(filePath));
            }

            if (isImage)
            {

                if (File.Exists(HttpContext.Current.Server.MapPath(filePath.ToThumbnailPath("Thumbnail"))))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(filePath.ToThumbnailPath("Thumbnail")));
                }

            }
            return true;
        }

        /// <summary>
        /// Upload Document
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="DocName"></param>
        /// <param name="PhysicalFolderPath"></param>
        /// <returns></returns>
        public static string UploadDocument(string strBase64, string DocName, string PhysicalFolderPath)
        {
            string path = string.Empty;
            string fileName = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            Regex reg = new Regex("[*'\",_&#^@. ]");
            DocName = reg.Replace(DocName, "_").Trim();
            try
            {
                path = PhysicalFolderPath;
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                fileName = Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                bool result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        /// <summary>
        /// News Module auto folder generation
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="department"></param>
        /// <returns></returns>
        public static string GenerateNewsModuleFolderAndName(string strBase64, long? newspaperId, string removePath = "")
        {
            bool result = false;
            string path = _newsModulePath;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                fileName = Convert.ToString(newspaperId) + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(removePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(removePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// File structure for help document of Achievement category
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="recordId"></param>
        /// <param name="category"></param>
        /// <param name="isPdf"></param>
        /// <param name="RemoveFilePath"></param>
        /// <returns></returns>
        public static string UploadAchievementHelpFile(string strBase64, long recordId, string category, bool isPdf = false, string RemoveFilePath = "")
        {
            bool result = true;
            string path = _achntCatPath;
            string fileName = string.Empty;

            Regex reg = new Regex("[*'\",_&#^@. ]");
            category = reg.Replace(category, "_").Replace(" ", "");

            try
            {
                fileName = recordId + "_" + category + "_HelpFile_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// News Module auto folder generation
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="department"></param>
        /// <returns></returns>
        public static string GenerateProjectMasterFolderAndName(string strBase64, int projectId, bool isProgressAttachment = false)
        {
            bool result = false;
            string path = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMM");
            string fileName = string.Empty;
            try
            {
                path = _projectMasterPath;

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                if (isProgressAttachment)
                {
                    fileName = projectId.ToString() + "_ProgressImage_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    fileName = projectId.ToString() + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// Generate Constituency File Name for MLA and MP
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="name"></param>
        /// <param name="isMLA"></param>
        /// <param name="removePath"></param>
        /// <returns></returns>
        public static string GenerateConstituencyFileName(string strBase64, string name, bool isMLA = false, string removePath = "", bool isPhoto = false)
        {
            bool result = false;
            try
            {
                string path = string.Empty, fileName = string.Empty;
                if (isMLA)
                {
                    path = _mLAConstituencyPath;
                    if (isPhoto)
                    {
                        fileName = "_MLA_" + name + "_Photo_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                    }
                    else
                    {
                        fileName = "_MLA_" + name + "_MAP_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                    }

                }
                else
                {
                    path = _mPConstituencyPath;
                    if (isPhoto)
                    {
                        fileName = "_MP_" + name + "_Photo_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                    }
                    else
                    {
                        fileName = "_MP_" + name + "_MAP_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                    }

                }
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(removePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(removePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("MLAConstituency GenerateConstituencyFileName ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency GenerateConstituencyFileName ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency GenerateConstituencyFileName ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }

        /// <summary>
        /// Generate Child Page Master FileName
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="pageName"></param>
        /// <param name="isPDF"></param>
        /// <param name="removePath"></param>
        /// <returns></returns>
        public static string GenerateChildPageMasterFileName(string strBase64, string pageName, bool isPDF = true, string removePath = "")
        {
            bool result = false;
            try
            {
                string path = string.Empty, fileName = string.Empty;
                path = _childPageMasterPath;
                if (isPDF)
                {
                    fileName = "_PDF_" + pageName + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    fileName = "_Image_" + pageName + "_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(removePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(removePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GenerateChildPageMasterFileName ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GenerateChildPageMasterFileName ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GenerateChildPageMasterFileName ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }

        public static DataTable ToDataTable<T>(this IList<T> data)
        {
            try
            {
                PropertyDescriptorCollection props =
                            TypeDescriptor.GetProperties(typeof(T));
                DataTable table = new DataTable();
                for (int i = 0; i < props.Count; i++)
                {
                    PropertyDescriptor prop = props[i];
                    table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(
            prop.PropertyType) ?? prop.PropertyType);
                }
                object[] values = new object[props.Count];
                foreach (T item in data)
                {
                    for (int i = 0; i < values.Length; i++)
                    {
                        values[i] = props[i].GetValue(item);
                        var dfdfs = Convert.ToString(props[i].GetValue(item));
                        var dfd = props[i].GetValue(item).ToString();
                    }
                    table.Rows.Add(values);
                }
                return table;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ToDataTable ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ToDataTable ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ToDataTable ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }


        public static DataTable ConvertJSONToDataTable(string jsonString)
        {
            DataTable dt = new DataTable();
            //strip out bad characters
            string[] jsonParts = Regex.Split(jsonString.Replace("[", "").Replace("]", ""), "},{");

            //hold column names
            List<string> dtColumns = new List<string>();

            //get columns
            foreach (string jp in jsonParts)
            {
                //only loop thru once to get column names
                string[] propData = Regex.Split(jp.Replace("{", "").Replace("}", ""), ",");
                foreach (string rowData in propData)
                {
                    try
                    {
                        int idx = rowData.IndexOf(":");
                        string n = rowData.Substring(0, idx - 1);
                        string v = rowData.Substring(idx + 1);
                        if (!dtColumns.Contains(n))
                        {
                            dtColumns.Add(n.Replace("\"", ""));
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(string.Format("Error Parsing Column Name : {0}", rowData));
                    }

                }
                break; // TODO: might not be correct. Was : Exit For
            }

            //build dt
            foreach (string c in dtColumns)
            {
                dt.Columns.Add(c);
            }
            //get table data
            foreach (string jp in jsonParts)
            {
                string[] propData = Regex.Split(jp.Replace("{", "").Replace("}", ""), ",");
                DataRow nr = dt.NewRow();
                foreach (string rowData in propData)
                {
                    try
                    {
                        int idx = rowData.IndexOf(":");
                        string n = rowData.Substring(0, idx - 1).Replace("\"", "");
                        string v = rowData.Substring(idx + 1).Replace("\"", "");
                        nr[n] = v;
                    }
                    catch (Exception ex)
                    {
                        continue;
                    }

                }
                dt.Rows.Add(nr);
            }
            return dt;
        }

        public static string UploadTenderFile(string strBase64, long recordId, bool isChild = false, string RemoveFilePath = "")
        {
            bool result = true;
            string path = _tenderFilePath;
            string fileName = string.Empty;

            try
            {
                if (isChild)
                {
                    fileName = recordId + "_Child_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    fileName = recordId + "_Main_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("UploadTenderFile ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadTenderFile ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadTenderFile ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }


        public static string UploadPressReleaseFile(string strBase64, long recordId, bool? isHome, string RemoveFilePath = "")
        {
            bool result = true;
            string path = _pressReleaseFilePath;
            string fileName = string.Empty;
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MMMM");
            string HomePageImage = "HomeImage";
            string Image = "supportImage";
            string Document = "Attachment";

            try
            {

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + year + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }
                path = path + month + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                if (isHome == true)
                {
                    path = path + HomePageImage + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    fileName = recordId + "_HomePage_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else if (isHome == false)
                {
                    path = path + Image + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    fileName = recordId + "_Image_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    path = path + Document + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                    }
                    fileName = recordId + "_ATTACH_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("UploadTenderFile ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadTenderFile ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadTenderFile ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }

        public static string UploadDepartmentMenuFile(string strBase64, long recordId, string dept, bool isMenu, string RemoveFilePath = "")
        {
            bool result = true;
            string path = _departmentMenuFilePath;
            string fileName = string.Empty;


            try
            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                dept = reg.Replace(dept, "_");

                path = _departmentMenuFilePath + dept.Trim() + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                if (isMenu)
                {
                    fileName = recordId + "_Menu_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    fileName = recordId + "_SubMenu_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("UploadDepartmentMenuFile ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadDepartmentMenuFile ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadDepartmentMenuFile ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }

        public static string UploadDepartmentSectionmapping(string strBase64, long recordId, string dept, bool isMenu, string RemoveFilePath = "")
        {
            bool result = true;
            string path = _departmentMenuFilePath;
            string fileName = string.Empty;

            try
            {
                Regex reg = new Regex("[*'\",_&#^@. ]");
                dept = reg.Replace(dept, "_");

                path = _departmentMenuFilePath + dept.Trim() + "/";
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(path)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(path));
                }

                if (isMenu)
                {
                    fileName = recordId + "_Menu_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }
                else
                {
                    fileName = recordId + "_SubMenu_" + Guid.NewGuid().ToString() + "." + strBase64.Split(';')[0].Split('/')[1];
                }

                result = SaveFileFromBase64strWithFileName(strBase64, HttpContext.Current.Server.MapPath(path), fileName);
                if (!string.IsNullOrEmpty(RemoveFilePath))
                {
                    DeleteExistingFile(HttpContext.Current.Server.MapPath(RemoveFilePath));
                }
                return result ? path + fileName : null;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("UploadDepartmentMenuFile ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadDepartmentMenuFile ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("UploadDepartmentMenuFile ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }





        #region <<API File Uploader Local Old>>


        public static string SaveFileFromBase64str(string strBase64, string SavePath)
        {
            string FileName = string.Empty;
            try
            {
                if (!string.IsNullOrEmpty(strBase64) && !string.IsNullOrEmpty(SavePath))
                {
                    string[] Fileinfo = strBase64.Split(';');
                    byte[] byteArr = Convert.FromBase64String(Fileinfo[1].Substring(Fileinfo[1].IndexOf(',') + 1));
                    FileName = Guid.NewGuid().ToString() + "." + Fileinfo[0].Split('/')[1];
                    File.WriteAllBytes(SavePath + FileName, byteArr);
                }
            }
            catch
            {

                throw;
            }
            return FileName;
        }


        /// <summary>
        /// Base 64 to File 
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="SavePath"></param>
        /// <returns></returns>
        public static bool SaveFileFromBase64strWithFileName(string strBase64, string SavePath, string FileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(strBase64) && !string.IsNullOrEmpty(SavePath))
                {
                    string[] Fileinfo = strBase64.Split(';');
                    byte[] byteArr = Convert.FromBase64String(Fileinfo[1].Substring(Fileinfo[1].IndexOf(',') + 1));
                    //MemoryStream ms = new MemoryStream(byteArr);
                    File.WriteAllBytes(SavePath + FileName, byteArr);
                }
            }
            catch (Exception ex)
            {
                var param = "SavePath: " + SavePath + ", FileName: " + FileName;
                CreateLogHelper.CreateErrorLogFile("CommonUtility/ SaveFileFromBase64strWithFileName", ex, param);

                return false;
            }
            return true;
        }

        public static void DeleteExistingFile(string fileWithPath)
        {
            try
            {
                foreach (var item in fileWithPath.Split(','))
                {
                    if (File.Exists(item))
                    {
                        // If file found, delete it    
                        File.Delete(item);
                    }
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("CommonUtility/ DeleteExistingFile", ex, fileWithPath);
            }
        }


        /// <summary>
        /// Get Base64 string(Data url) String
        /// </summary>
        /// <param name="filePath">Full File path</param>
        /// <returns>string</returns>
        public static string GetBase64strFromFilePath(string filePath)
        {
            string base64 = string.Empty;
            try
            {
                if (File.Exists(filePath))
                {
                    base64 = "Data:" + GetMimeType(filePath) + ";base64,";
                    byte[] bytarr = File.ReadAllBytes(filePath);
                    base64 += Convert.ToBase64String(bytarr);
                }
            }
            catch
            {
                base64 = string.Empty;
            }
            return base64;
        }


        /// <summary>
        /// Save thumbnai from existing image
        /// </summary>
        /// <param name="existingFilePath">exisitng File Path</param>
        /// <param name="existingfileName">exisitng Image Name</param>
        /// <param name="preFix">prifix image file name</param>
        /// <param name="width">width of image</param>
        /// <param name="height">height of image</param>
        /// <param name="mode">HW= Height and width, H= Height, W= width, cut= crop</param>
        /// <returns>Thumbnail File name save inside existing file folder</returns>
        public static string SaveThumbnailImage(string existingFilePath, string existingfileName, string preFix, int width = 0, int height = 0, string mode = "HW")
        {
            string _filePath = HttpContext.Current.Server.MapPath(existingFilePath);
            string thumbnailImage = preFix + existingfileName;
            System.Drawing.Image originalImage = System.Drawing.Image.FromFile(_filePath + existingfileName);
            int towidth = width > 0 ? width : originalImage.Width;
            int toheight = height > 0 ? height : originalImage.Height;
            int x = 0;
            int y = 0;
            int ow = originalImage.Width;
            int oh = originalImage.Height;
            switch (mode)
            {
                case "HW":
                    break;
                case "W":
                    toheight = originalImage.Height * width / originalImage.Width;
                    break;
                case "H":
                    towidth = originalImage.Width * height / originalImage.Height;
                    break;
                case "Cut":
                    if ((double)originalImage.Width / (double)originalImage.Height > (double)towidth / (double)toheight)
                    {
                        oh = originalImage.Height;
                        ow = originalImage.Height * towidth / toheight;
                        y = 0;
                        x = (originalImage.Width - ow) / 2;
                    }
                    else
                    {
                        ow = originalImage.Width;
                        oh = originalImage.Width * height / towidth;
                        x = 0;
                        y = (originalImage.Height - oh) / 2;
                    }
                    break;
                default:
                    break;
            }

            System.Drawing.Image bitmap = new System.Drawing.Bitmap(towidth, toheight);
            Graphics g = System.Drawing.Graphics.FromImage(bitmap);
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.Low;
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighSpeed;
            g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighSpeed;
            g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighSpeed;

            //g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;
            //g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            //g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighSpeed;
            //g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.Low;


            g.Clear(Color.Transparent);
            g.DrawImage(originalImage, new Rectangle(0, 0, towidth, toheight), new Rectangle(x, y, ow, oh), GraphicsUnit.Pixel);

            try
            {
                if (!Directory.Exists(_filePath + "Thumbnail\\"))
                {
                    Directory.CreateDirectory(_filePath + "Thumbnail\\");
                }
                bitmap.Save(_filePath + "Thumbnail\\" + thumbnailImage, System.Drawing.Imaging.ImageFormat.Jpeg);

            }

            catch (System.Exception e)
            {
                //throw e;
                return e.Message;
            }
            finally
            {

                originalImage.Dispose();
                bitmap.Dispose();
                g.Dispose();

            }
            return thumbnailImage;
        }



        #endregion

        #region <<API File Uploader server>>

        ////Provide path Withouit server map path
        //public static string SaveFileFromBase64str(string strBase64, string SavePath, List<string> deleteFilePath = null)
        //{
        //    string FileName = string.Empty;
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(strBase64) && !string.IsNullOrEmpty(SavePath))
        //        {
        //            var obj = FileHelper.Save(new FilePostModel() { Base64String = strBase64, LocationPath = SavePath, DeleteFilePath = deleteFilePath });
        //            if (obj.IsSuccess)
        //            {
        //                FileName = obj.Data;
        //            }
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    return FileName;
        //}


        //public static bool SaveFileFromBase64strWithFileName(string strBase64, string SavePath, string FileName)
        //{
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(strBase64) && !string.IsNullOrEmpty(SavePath))
        //        {
        //            var obj = FileHelper.Save(new FilePostModel() { Base64String = strBase64, LocationPath = SavePath, FileName = FileName });
        //            if (obj.IsSuccess)
        //            {
        //                FileName = obj.Data;
        //            }
        //        }
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //    return true;
        //}

        //public static void DeleteExistingFile(string fileWithPath)
        //{
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(fileWithPath))
        //        {



        //            FileHelper.delete(new List<string>() { fileWithPath });

        //        }

        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}
        //public static string GetBase64strFromFilePath(string filePath)
        //{
        //    string base64 = null;
        //    try
        //    {

        //        var obj = FileHelper.Get(filePath);
        //        if (obj.IsSuccess)
        //        {
        //            base64 = obj.Data;
        //        }

        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //    return base64;
        //}


        ///// <summary>
        ///// Save Thumbnail Image
        ///// </summary>
        ///// <param name="filePath"></param>
        ///// <param name="fileName"></param>
        ///// <param name="preFix"></param>
        ///// <param name="width"></param>
        ///// <param name="height"></param>
        ///// <param name="mode"></param>
        ///// <returns></returns>
        //public static string SaveThumbnailImage(string filePath, string fileName, string preFix, int width = 0, int height = 0, string mode = "HW")
        //{

        //    try
        //    {

        //        var obj = FileHelper.SaveThumbnailImage(filePath, fileName, preFix, width, height, mode);
        //        if (obj.IsSuccess)
        //        {
        //            return obj.Data;
        //        }

        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //    return null;
        //}


        #endregion
    }

}
