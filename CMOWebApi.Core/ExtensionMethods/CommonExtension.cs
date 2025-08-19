using CMOWebApi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Core.ExtensionMethods
{
    public static class CommonExtension
    {
        public static string ToThumbnailPath(this string filePath, string ThumbnailFolder = "Thumbnail", string ThumbnailPrifix = "Th_")
        {
            try
            {
                //string fileFullpath = HttpContext.Current.Server.MapPath(filePath);
                if (!string.IsNullOrEmpty(filePath))
                {
                    return filePath.Substring(0, filePath.LastIndexOf("/")) + "/" + (!string.IsNullOrEmpty(ThumbnailFolder) ? ThumbnailFolder + "/" : string.Empty) + (!string.IsNullOrEmpty(ThumbnailPrifix) ? ThumbnailPrifix : string.Empty) + filePath.Split('/')[filePath.Split('/').Length - 1];
                }
            }
            catch
            {
                return string.Empty;

            }
            return string.Empty;
        }

        #region <API File Uploader Local>
        /// <summary>
        /// Get full  file name with base  path, You have to pass only folder path without server map path
        /// </summary>
        /// <param name="filePath">file path  without server.MapPath</param>
        /// <returns>domain.com/yourPath</returns>
        public static string ToAbsolutePath(this string filePath)
        {
            string fileServerBasePath = FilePath.FileServerBasePath.GetStringValue();
            try
            {
                if (!string.IsNullOrEmpty(filePath))
                {
                    return string.Concat(fileServerBasePath, filePath.Trim().Replace("~", "").Replace(@"\", "/"));
                }
                return null;
            }
            catch (Exception)
            {
                return string.Concat(fileServerBasePath, filePath.Replace("~", "").Replace(@"\", "/"));
            }

            #region Old Code
            //try
            //{
            //    if (!string.IsNullOrEmpty(filePath))
            //    {
            //        HttpRequest request = HttpContext.Current.Request;
            //        return request.Url.AbsoluteUri.Replace(request.AppRelativeCurrentExecutionFilePath.Replace("~", "") + request.Url.Query, "/") + filePath.Trim().Replace("~", "");
            //    }
            //    return null;
            //}
            //catch (Exception)
            //{
            //    return ConfigurationManager.AppSettings["BaseUrl"].ToString() + filePath.Replace("~", "");
            //}
            #endregion
        }

        #endregion

        public static string ToPhysicalPath(this string filePath)
        {
            try
            {
                HttpRequest request = HttpContext.Current.Request;
                filePath = filePath.Replace(request.Url.AbsoluteUri.Replace(request.AppRelativeCurrentExecutionFilePath.Replace("~", "") + request.Url.Query, "/"), "~");
                return HttpContext.Current.Server.MapPath(filePath);

            }
            catch (Exception)
            {
                return HttpContext.Current.Server.MapPath(filePath);

            }
        }

        public static string ToRemoveBasePath(this string filePath)
        {
            // string ext = string.Empty;
            try
            {
                return filePath.Replace(HttpContext.Current.Server.MapPath("~\\"), "~\\");
            }
            catch (Exception)
            {

            }
            return string.Empty;

        }

        public static string ToHindiDate(this DateTime date, string format = null)
        {

            try
            {
                if (date.Month == 10)
                {
                    return date.ToString(format, new System.Globalization.CultureInfo("hi-IN")).Replace("अक्तूबर", "अक्टूबर");
                }
                else
                {
                    return date.ToString(format, new System.Globalization.CultureInfo("hi-IN"));
                }





            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public static bool CheckFileExist(this string filePath)
        {
            try
            {
                if (!string.IsNullOrEmpty(filePath) && File.Exists(HttpContext.Current.Server.MapPath(filePath)))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {


            }
            return false;
        }

    }
}
