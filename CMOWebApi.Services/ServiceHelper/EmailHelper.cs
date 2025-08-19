using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Mail;
using System.Threading;

namespace CMOWebApi.Services.ServiceHelper
{
    public class EmailHelper
    {


        #region Variable Declaration's
        
        private static string _DisplayName = "Jankalyan";

        private static string _SmtpUser = ConfigurationManager.AppSettings["FUser"];
        private static string _SmtpPassword = ConfigurationManager.AppSettings["FPassword"];
        private static int _SmtpPort = Convert.ToInt32(ConfigurationManager.AppSettings["FPort"]);
        private static bool _EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["FEnableSsl"]);
        private static string _SmtpHost = ConfigurationManager.AppSettings["FHost"];

        #endregion

        #region SendMail

        public static bool SendMail(string FromName, string FromEmail,List<string>  ToEmail, string[] CC, string[] BCC, string Subject, string Content, Attachment[] Attachement)
        {
            bool resFlag = false;
            SmtpClient smtpClient = new SmtpClient();
            MailMessage message = new MailMessage();

            try
            {
                MailAddress fromAddres = new MailAddress(FromEmail, _DisplayName);
                smtpClient.Host = _SmtpHost;
                
                smtpClient.Port = _SmtpPort;
                smtpClient.EnableSsl = false;

                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = new System.Net.NetworkCredential(_SmtpUser, _SmtpPassword);
                message.From = fromAddres;

                if (ToEmail != null)
                {
                    foreach (string Email in ToEmail)
                    {
                        message.To.Add(Email);
                    }
                    if (CC != null)
                        foreach (string cc in CC)
                        {
                            if (!String.IsNullOrEmpty(cc))
                                message.CC.Add(cc);
                        }
                    if (BCC != null)
                        foreach (string bcc in BCC)
                        {
                            if (!String.IsNullOrEmpty(bcc))
                                message.Bcc.Add(bcc);
                        }
                    
                    if (Attachement != null)
                        foreach (Attachment att in Attachement)
                        {
                            if (att != null)
                                message.Attachments.Add(att);
                        }
                    
                    message.Subject = Subject;
                    message.IsBodyHtml = true;
                    message.Body = Content;
                    new Thread(() => { smtpClient.Send(message); }).Start();
                    //await smtpClient.SendMailAsync(message);
                    resFlag = true;
                }

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("send mail ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("send mail ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("send mail ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
            }

            return resFlag;
        }

        #endregion

        
    }
}
