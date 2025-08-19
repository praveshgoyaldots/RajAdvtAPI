using CMOWebApi.Core.Enums;
using CMOWebApi.Models.LoginModel;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.ServiceHelper
{
    public class CreateLogHelper
    {
        static string _logFilesPath = HttpContext.Current.Server.MapPath(FilePath.LogFilesPath.GetStringValue());

        public static void CreateLogFile(string strMsg)
        {
            try
            {
                StreamWriter log;

                var path = string.Concat(_logFilesPath, "logfile-" + DateTime.Now.ToString("MM-dd-yyyy") + ".txt");

                //    var directory = Path.Combine( HttpContext.Current.Server.MapPath("~/Content/"), "UploadFolder/LogFiles/");              

                if (!Directory.Exists(_logFilesPath))
                {
                    Directory.CreateDirectory(_logFilesPath);
                }

                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }

                log = System.IO.File.AppendText(path);
                log.WriteLine(strMsg);
                log.Close();
            }
            catch
            {
                throw;
            }
        }

        public static void CreateErrorLogFile(string serviceName, Exception ex, string otherInfo = "")
        {
            try
            {
                StreamWriter log;
                var path = string.Concat(_logFilesPath, "logfile-" + DateTime.Now.ToString("MM-dd-yyyy") + ".txt");

                if (!Directory.Exists(_logFilesPath))
                {
                    Directory.CreateDirectory(_logFilesPath);
                }
                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }

                StringBuilder err = new StringBuilder();

                err.Append("LogTime : " + DateTime.Now.ToString() + " \n");
                err.Append("UserId : " + CurruntUserViewModel.UserId.ToString() + " \n");
                err.Append("LogType : Error \n");

                //string serverIP = CommonUtility.GetIpAddress();     // User IP 
                string serverIP = GetServerIPAddress();
                if (!string.IsNullOrEmpty(serverIP))
                {
                    err.Append("Server IP : " + serverIP + " \n");
                }

                if (!string.IsNullOrEmpty(serviceName))
                {
                    err.Append("API : " + serviceName + " \n\n");
                }
                if (ex != null)
                {
                    var st = new System.Diagnostics.StackTrace(ex, true);
                    var frame = st.GetFrame(0);                                             // Get the top stack frame
                    err.Append("Line Number : " + frame.GetFileLineNumber() + " \n");       // Get the line number from the stack frame 

                    err.Append("\n" + "Exception ex : " + ex.ToString() + " \n");

                    if (!string.IsNullOrEmpty(ex.Source))
                    {
                        err.Append("\n" + "ex.Source : " + ex.Source + " \n");
                    }

                    if (ex.InnerException != null)
                    {
                        var innerEx = ex.InnerException;
                        do
                        {
                            err.Append("ex.InnerException : " + innerEx.Message + " \n");
                            innerEx = innerEx.InnerException;
                        }
                        while (innerEx != null);
                    }
                }

                if (!string.IsNullOrEmpty(otherInfo))
                {
                    err.Append("\n" + "Other Info : " + otherInfo + " \n");
                }

                log = System.IO.File.AppendText(path);
                log.WriteLine(err.ToString());
                log.WriteLine("--------------------------------------------------------------------------------" + " \n");
                log.Close();
            }
            catch
            {
                throw;
            }
        }

        public static string GetServerIPAddress()
        {
            string serverIP = string.Empty;
            try
            {
                string hostName = Dns.GetHostName();
                IPHostEntry hostInfo = Dns.GetHostEntry(hostName);
                IPAddress ipAddress = hostInfo.AddressList[0];

                serverIP = ipAddress.ToString();
            }
            catch { }
            return serverIP;
        }

    }

}
