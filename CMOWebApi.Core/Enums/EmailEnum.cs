using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Core.Enums
{
    public class EmailEnum
    {
        public enum EmailParametersWelcomeEmail
        {

            Name = 10,
            ContactNo = 15
        }

        public enum EmailTemplatesType
        {
            WelcomeEmail = 1,
            ForgotPassword = 2,
            ChangePassword = 3,
            RegistrationEmail = 4
        }

        public enum EmailValueType
        {
            WelcomeEmail = 1,
            ForgotPassword = 2,
            ChangePassword = 3
        }
        public enum EmailTypeCode
        {
            [StringValue("forgotpassword")]
            forgotpassword = 1,
            [StringValue("registration")]
            registration = 2,
            [StringValue("contactus")]
            contactus = 3,
            [StringValue("resetpassword")]
            resetpassword = 8
        }
        public enum EnumMacors
        {
            [StringValue("UserEmail")]
            UserEmail = 1,
            [StringValue("UserPassword")]
            UserPassword = 2,
            [StringValue("UserFirstName")]
            UserFirstName = 3,
            [StringValue("UserLastName")]
            UserLastName = 4,
            [StringValue("CompanyName")]
            CompanyName = 5,
            [StringValue("CompanyURL")]
            CompanyURL = 6,
            [StringValue("CompanyAddress")]
            CompanyAddress = 7
        }
    }
}
