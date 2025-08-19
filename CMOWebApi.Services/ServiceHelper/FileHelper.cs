using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Models.GeneralModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net;

namespace CMOWebApi.Services.ServiceHelper
{
    public static class FileHelper
    {
        private static string _fileServerUrl = ConfigurationManager.AppSettings["FileServerURL"];

        /// <summary>
        /// Save File
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static ServiceResponse<string> Save(FilePostModel model)
        {
            ServiceResponse<string> objResponse = new ServiceResponse<string>();


            try
            {
                string responseData = string.Empty;
              //  SmsExternalApiInfo content = new SmsExternalApiInfo();
                model.LocationPath = model.LocationPath.ToRemoveBasePath();
                string url = string.Concat(_fileServerUrl, "api/file/save");
                string jsonData = JsonConvert.SerializeObject(model);
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                if (!string.IsNullOrEmpty(jsonData))
                {
                    StreamWriter requestWriter = new StreamWriter(httpWebRequest.GetRequestStream());
                    requestWriter.Write(jsonData);
                    requestWriter.Close();
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    objResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(responseData);
                }
            }
            catch (Exception ex)
            {

            }

            return objResponse;
        }
        /// <summary>
        /// get files from file path in base64
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static ServiceResponse<string> Get(string filePath)
        {
            ServiceResponse<string> objResponse = new ServiceResponse<string>();


            try
            {
                string responseData = string.Empty;

                filePath = filePath.ToRemoveBasePath();


                string url = _fileServerUrl + "api/file/get?filePath=" + filePath;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.Method = "get";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    objResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(responseData);
                }
            }
            catch (Exception ex)
            {

            }

            return objResponse;
        }
        /// <summary>
        /// delete files
        /// </summary>
        /// <param name="paths">file name with path</param>
        /// <returns>true or false </returns>
        public static ServiceResponse<object> delete(List<string> paths)
        {
            ServiceResponse<object> objResponse = new ServiceResponse<object>();


            try
            {
                string responseData = string.Empty;
               // SmsExternalApiInfo content = new SmsExternalApiInfo();

                for (int i = 0; i < paths.Count; i++)
                {
                    paths[i] = paths[i].ToRemoveBasePath();
                }

                string url = string.Concat(_fileServerUrl, "api/file/delete");
                string jsonData = JsonConvert.SerializeObject(paths);
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "DELETE";

                if (!string.IsNullOrEmpty(jsonData))
                {
                    StreamWriter requestWriter = new StreamWriter(httpWebRequest.GetRequestStream());
                    requestWriter.Write(jsonData);
                    requestWriter.Close();
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    objResponse = JsonConvert.DeserializeObject<ServiceResponse<object>>(responseData);
                }
            }
            catch (Exception ex)
            {

            }

            return objResponse;
        }

        public static ServiceResponse<string> SaveThumbnailImage(string filePath, string fileName, string preFix, int width = 0, int height = 0, string mode = "HW")
        {
            ServiceResponse<string> objResponse = new ServiceResponse<string>();


            try
            {
                string responseData = string.Empty; 
                filePath = filePath.ToRemoveBasePath();  
                string url = string.Concat(_fileServerUrl, "api/file/SaveThumbnailImage?filePath=", filePath, "&fileName=", fileName, "&preFix=", preFix ?? "", "&width=", width.ToString(), "&height=", height.ToString(), "&mode=", mode);
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.Method = "get";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    objResponse = JsonConvert.DeserializeObject<ServiceResponse<string>>(responseData);
                }
            }
            catch (Exception ex)
            {

            }

            return objResponse;
        }

    }
}
