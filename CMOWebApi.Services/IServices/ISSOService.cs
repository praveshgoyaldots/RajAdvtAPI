using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ISSOService
    {
        /// <summary>
        /// Get SSOId of logged-in user.
        /// </summary>
        /// <returns>Method returns string value.</returns>
        string GetLoggedInUserSSOId();

        /// <summary>
        /// Logout user from SSO.
        /// </summary>
        /// <returns>Method returns void.</returns>
        void Logout();

        /// <summary>
        /// User back to SSO.
        /// </summary>
        /// <returns>Method returns void.</returns>
        void BackToSSO();

    }
}
