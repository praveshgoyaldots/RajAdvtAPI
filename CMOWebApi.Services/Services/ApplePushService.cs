using System;
using System.IO;
using System.Text;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using System.Net;
using System.Collections.Generic;
using JdSoft.Apple.Apns.Notifications;
using Newtonsoft.Json;
using System.Configuration;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Services.IServices;
using System.Net.Sockets;
using System.Security.Authentication;


namespace CMOWebApi.Services.Services
{
    public class ApplePushService : BaseService, IApplePushService
    {
        public bool SendOnIOS(Dictionary<string, string> dictionary, string deviceId, string Title)
        {
            try
            {

                //True if you are using sandbox certificate, or false if using production
                bool sandbox = true;

                //Put your device token in here
                string testDeviceToken = deviceId;

                //Put your PKCS12 .p12 or .pfx filename here.
                // Assumes it is in the same directory as your app
                string path = ConfigurationManager.AppSettings["IosCertificatePath"];
                string p12File = path;

                //This is the password that you protected your p12File 
                //  If you did not use a password, set it as null or an empty string
                string p12FilePassword = ConfigurationManager.AppSettings["IosCertificatePassword"];

                //Number of notifications to send          

                //Number of milliseconds to wait in between sending notifications in the loop
                // This is just to demonstrate that the APNS connection stays alive between messages
                int sleepBetweenNotifications = 1;


                //Actual Code starts below:
                //--------------------------------

                string p12Filename = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, p12File);

                NotificationService service = new NotificationService(sandbox, p12Filename, p12FilePassword, 1);

                service.SendRetries = 5; //5 retries before generating notificationfailed event
                service.ReconnectDelay = 1; //5 seconds

                service.Error += new NotificationService.OnError(service_Error);
                service.NotificationTooLong += new NotificationService.OnNotificationTooLong(service_NotificationTooLong);

                service.BadDeviceToken += new NotificationService.OnBadDeviceToken(service_BadDeviceToken);
                service.NotificationFailed += new NotificationService.OnNotificationFailed(service_NotificationFailed);
                service.NotificationSuccess += new NotificationService.OnNotificationSuccess(service_NotificationSuccess);
                service.Connecting += new NotificationService.OnConnecting(service_Connecting);
                service.Connected += new NotificationService.OnConnected(service_Connected);
                service.Disconnected += new NotificationService.OnDisconnected(service_Disconnected);


                var jsonData = JsonConvert.SerializeObject(dictionary);
                //Create a new notification to send
                Notification alertNotification = new Notification(testDeviceToken);
                alertNotification.Payload.Alert.Body = Title;
                //alertNotification.Payload.Sound = "b.mp3";
                //alertNotification.Payload.Badge = 0;
                alertNotification.Payload.AddCustom("dic", jsonData);
                //Sleep in between each message

                service.QueueNotification(alertNotification);
                System.Threading.Thread.Sleep(sleepBetweenNotifications);
                service.Close();
                //Clean up
                service.Dispose();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }     

        static void service_BadDeviceToken(object sender, BadDeviceTokenException ex)
        {
            //Console.WriteLine("Bad Device Token: {0}", ex.Message);
        }

        static void service_Disconnected(object sender)
        {
            //Console.WriteLine("Disconnected...");
        }

        static void service_Connected(object sender)
        {
            //Console.WriteLine("Connected...");
        }

        static void service_Connecting(object sender)
        {
            //Console.WriteLine("Connecting...");
        }

        static void service_NotificationTooLong(object sender, NotificationLengthException ex)
        {
            //Console.WriteLine(string.Format("Notification Too Long: {0}", ex.Notification.ToString()));
        }

        static void service_NotificationSuccess(object sender, Notification notification)
        {
            //Console.WriteLine(string.Format("Notification Success: {0}", notification.ToString()));
        }

        static void service_NotificationFailed(object sender, Notification notification)
        {
            //Console.WriteLine(string.Format("Notification Failed: {0}", notification.ToString()));
        }

        static void service_Error(object sender, Exception ex)
        {
            //Console.WriteLine(string.Format("Error: {0}", ex.Message));
        }

    }
}
