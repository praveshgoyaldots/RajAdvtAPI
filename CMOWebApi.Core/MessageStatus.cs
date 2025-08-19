namespace CMOWebApi.Core
{
    public static class MessageStatus
    {
        public static string Success
        {
            get
            {
                return "Data Retrieved Successfully !";
            }
            set { }
        }
        public static string Error {

            get
            {
                return "An Error Occurred !";
            }
            set { }
        }
        public static string Create
        {
            get
            {
                return "Record Created Successfully !";
            }
            set { }
        }
        public static string Update
        {
            get
            {
                return "Data Update Successfully !";
            }
            set { }
        }
        public static string Delete
        {
            get
            {
                return "Data Deleted Successfully !";
            }
            set { }
        }
        public static string NoRecord
        {
            get
            {
                return "No Record Found!";
            }
            set { }
        }
        public static string InvalidData
        {
            get
            {
                return "Invalid Data Passed!";
            }
            set { }
        }
        public static string TransferData
        {
            get
            {
                return "Data Transferd Successfully!";
            }
            set { }
        }

        public static string ImportData
        {
            get
            {
                return "Data Import Successfully!";
            }
            set { }
        }

        public static string Save
        {
            get
            {
                return "Record Saved Successfully";
            }
            set { }
        }

        public static string Exist
        {
            get
            {
                return "Data Already Exist !";
            }
            set { }
        }

		public static string NameExist
		{
			get
			{
				return "Same Name Already Exist !";
			}
			set { }
		}

        public static string DepartmentSectionExist
        {
            get
            {
                return "Department and Section Already Exist !";
            }
            set { }
        }



        public static string NameWihDepExist
        {
            get
            {
                return "Same Name With Same Department Already Exist !";
            }
            set { }
        }

		public static string DeptWithYearExist
		{
			get
			{
				return "Same Department And Year Already Exist !";
			}
			set { }
		}

		public static string SchemeExist
        {
            get
            {
                return "Scheme Name Already Exist !";
            }
            set { }
        }
        public static string DepartmentExist
        {
            get
            {
                return "Department Already Exist !";
            }
            set { }
        }
        public static string ModuleExist
        {
            get
            {
                return "Module Name Already Exist !";
            }
            set { }
        }

        public static string NotExist
        {
            get
            {
                return "Data Not Exist !";
            }
            set { }
        }

        public static string UserNOTMAP
        {
            get
            {
                return "User Not Map !";
            }
            set { }
        }

        public static string PSWDNOTMATCH
        {
            get
            {
                return "Password not matched !";
            }
            set { }
        }

        public static string DeletePSWD
        {
            get
            {
                return "Please enter currect paasword ...!";
            }
            set { }
        }

        public static string ErrorValidation
        {
            get
            {
                return "Required fields are null or empty !";
            }
            set { }
        }

        public static string Uploaded
        {
            get
            {
                return "Record Uploaded Successfully";
            }
            set { }
        }

        public static string StatusUpdate
        {
            get
            {
                return "Status Update Successfully";
            }
            set { }
        }

        public static string MarkPresent
        {
            get
            {
                return "This participant marked as present";
            }
            set { }
        }

        public static string MarkAbsent
        {
            get
            {
                return "This participant marked as absent";
            }
            set { }
        }

        public static string Publish
        {
            get
            {
                return "Record Publish Successfully";
            }
            set { }
        }
        public static string FinalAproval
        {
            get
            {
                return "Record Successfully Sent For Final Aproval";
            }
            set { }
        }

        public static string Lock
        {
            get
            {
                return "Data Lock Successfully";
            }
            set { }
        }

        public static string AllowToEdit
        {
            get
            {
                return "Record Allow For Edit Successfully";
            }
            set { }
        }

        public static string BlockToEdit
        {
            get
            {
                return "Record Block For Edit Successfully";
            }
            set { }
        }

        public static string ErrorMandatoryField
        {
            get
            {
                return "Mandatory fields are null or empty";
            }
            set { }
        }

        public static string ExistType
        {
            get
            {
                return "Type Already Available";
            }
            set { }
        }


        public static string UnauthorizedUser
        {

            get
            {
                return "An Error Occurred !";
            }
            set { }
        }
        public static string DistrictNotAvailable
        {

            get
            {
                return "District/Office not assigned to this user !";
            }
            set { }
        }
        public static string EmailSendSuccess
        {
            get
            {
                return "Email Send Successfully";
            }
            set { }
        }
        public static string SMSSendSuccess
        {
            get
            {
                return "SMS Send Successfully";
            }
            set { }
        }

        public static string OTPSendSuccess
        {
            get
            {
                return "OTP Send Successfully";
            }
            set { }
        }
        public static string VerifyOTP
        {
            get
            {
                return "Invalid OTP Entered!";
            }
            set { }
        }
        public static string CancelOrder
        {
            get
            {
                return "Order Cancelled Successfully";
            }
            set { }
        }
        public static string OTPTemplateNotAvailable
        {
            get
            {
                return "OTP Template Not Available ! Please make entry for it";
            }
            set { }
        }
        public static string ExcelFormat
        {
            get
            {
                return "This file format is not supported";
            }
            set { }
        }

        public static string ParticipantExistForLocation
        {
            get
            {
                return "Participants exist for this location !";
            }
            set { }
        }
        public static string ParticipantExistForVC
        {
            get
            {
                return "Participants exist for this VC !";
            }
            set { }
        }
        public static string ExportSuccess
        {
            get
            {
                return "Data exported successfully";
            }
            set { }
        }
        public static string UnthothorizedForActivity
        {
            get
            {
                return "You are not authorized for this activity";
            }
            set { }
        }
        public static string YearMonthExist
        {
            get
            {
                return "Record already exist with same year and month !";
            }
            set { }
        }
        public static string ResetUserSpecificPermission
        {
            get
            {
                return "Specific permission for this user removed successfully !";
            }
            set { }
        }
    }

    public static class CustomMessageStatus
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

        public static string FileNotValid = "Selected file type not valid";

        public static string FileSize = "Selected file must be less than ";

        #region User Permission
        public static string DefaultPagePermissionUpdated = "User default permissions updated successfully.";
        public static string DefaultPagePermissionUpdateFailed = "Failed to update user default permissions.";

        public static string UserPagePermissionUpdated = "User page permissions updated successfully.";
        public static string UserPagePermissionUpdateFailed = "Failed to update user page permissions.";
        #endregion

    }

    public static class ResponseStatusCode
    {
        public static int warning = -1;
        public static int ok = 200;
        public static int error = 201;
        public static int DeactivatedAccount = 202;
        public static int sessionexpire = 203;
        public static int notajaxrequest = 204;
        public static int accountNotVerifiedCode = 206;
        public static int ApiAccessToken = 207;
        public static int UserSessionToken = 208;
        public static int unauthorized = 401;
    }

}
