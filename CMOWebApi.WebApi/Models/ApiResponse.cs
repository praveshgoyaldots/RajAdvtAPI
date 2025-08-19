using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMOWebApi.WebAPI.Models
{
    public class ApiResponse
    {

        public class TResponse
        {
            public TResponse()
            {
                //this.Status = ResponseStatus.ok;
                this.Message = ResponseMessage.success;
            }
            public object ResponseData { get; set; }
            public int Status { get; set; }
            public string Message { get; set; }

        }

        public static class ResponseMessage
        {

            public static string SessionTimeOut = "Session TimeOut";
            public static string SessionExpired = "Session Expired ";
            public static string success = "Success";
            public static string Loginsuccess = "Login Success";
            public static string Logoutsuccess = "Logout Successfully";
            public static string EmailVerified = "Your Email is Successfully Verified.";
            public static string EmailNotVerified = "Your email is not verified, please verify your email.";
            public static string fail = "Fail";
            public static string error = "Error";
            public static string notFound = "No record found";
            public static string RequestNotFound = "No requests found";
            public static string Invalidemail_Password = "Invalid email or password";
            public static string UserRegister = "You are successfully registered. Please verify your email account by visiting mailbox.";
            public static string UserNotRegister = "You are not registered";
            public static string forgotPasswordSuccess = " Reset password link send to your email inbox.";
            public static string ChangePasswordSuccess = "Password successfully changed";
            public static string ChangePasswordSame = "Password you entered is similar to the old password";
            public static string PasswordNotMatch = "Old password does not match";
            public static string ProfileUpdated = "Profile successfully updated";
            public static string ApiAccessInvalid = "Api access token invalid";
            public static string UserSessionTokenInvalid = "Your session is time out";


        }

        
    }
}