using CMOWebApi.Models.GeneralModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net;

namespace CMOWebApi.Services.ServiceHelper
{
    public class SmsHelper
    {
        #region /// Variable Declaration's ///
        private static string _username = ConfigurationManager.AppSettings["smsUserName"];
        private static string _smsPassword = ConfigurationManager.AppSettings["smsPassword"];
        private static string _smsClientid = ConfigurationManager.AppSettings["smsClientid"];
        private static string _smsUniqueID = ConfigurationManager.AppSettings["smsUniqueID"];
        private static string _smsServiceName = ConfigurationManager.AppSettings["smsServiceName"];
        private static string _smsLanguageHIN = ConfigurationManager.AppSettings["smsLanguageHIN"];
        private static string _smsLanguageENG = ConfigurationManager.AppSettings["smsLanguageENG"];
        #endregion

        public static SmsResponseModel SendSms(List<String> mobileNo, string message)
        {
            try
            {
                string responseData = string.Empty;
                SmsExternalApiInfo content = new SmsExternalApiInfo();
                content.UniqueID = _smsUniqueID;
                content.serviceName = _smsServiceName;
                content.language = _smsLanguageENG;
                content.message = message;
                content.mobileNo = mobileNo;

                string url = "https://api.sewadwaar.rajasthan.gov.in/app/live/eSanchar/Prod/api/OBD/CreateSMS/Request?client_id=" + _smsClientid;
                string jsonData = JsonConvert.SerializeObject(content);
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("username", _username);
                httpWebRequest.Headers.Add("password", _smsPassword);

                if (!string.IsNullOrEmpty(jsonData))
                {
                    // httpWebRequest.ContentLength = jsonData.Length;
                    StreamWriter requestWriter = new StreamWriter(httpWebRequest.GetRequestStream());
                    requestWriter.Write(jsonData);
                    requestWriter.Close();
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    SmsResponseModel result = JsonConvert.DeserializeObject<SmsResponseModel>(responseData);
                    return result;
                }
            }
            catch (Exception ex)
            {
                SmsResponseModel result = new SmsResponseModel();
                result.responseCode = 401;
                return result;
            }
        }

        public static SmsResponseModel SendSmsOld(string data)
        {
            try
            {

                string responseData = string.Empty;
                string url = "https://api.sewadwaar.rajasthan.gov.in/app/live/eSanchar/Prod/api/OBD/CreateSMS/Request?client_id=" + _smsClientid;
                string jsonData = data;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("username", _username);
                httpWebRequest.Headers.Add("password", _smsPassword);

                if (!string.IsNullOrEmpty(jsonData))
                {
                   // httpWebRequest.ContentLength = jsonData.Length;
                    StreamWriter requestWriter = new StreamWriter(httpWebRequest.GetRequestStream());
                    requestWriter.Write(jsonData);
                    requestWriter.Close();
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    SmsResponseModel result = JsonConvert.DeserializeObject<SmsResponseModel>(responseData);
                    return result;
                }
            }
            catch (Exception ex)
            {
                SmsResponseModel result = new SmsResponseModel();
                result.responseCode = 401;
                return result;
            }
        }
    }
}
