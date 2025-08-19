using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using RAJSSO;

namespace CMOWebApi.Services.Services
{
    public class SSOService : BaseService, ISSOService
    {
        IUnitofWork _uow;
        public SSOService(IUnitofWork uow)
        {
            _uow = uow;
        }

        /// <summary>
        /// Get SSOId of logged-in user.
        /// </summary>
        /// <returns>Method returns string value.</returns>
        public string GetLoggedInUserSSOId()
        {
            string ssoId = string.Empty;
            try
            {
                RAJSSO.SSO SSO = new RAJSSO.SSO();
                if (SSO.CreateSSOSession())
                {
                    SSOTokenDetail ssoDetails = SSO.GetSessionValue();
                    if (ssoDetails != null)
                    {
                        ssoId = ssoDetails.SSOID;
                        var roles = ssoDetails.Roles;
                    }
                }
            }
            catch
            {
            }
            return ssoId;
        }

        /// <summary>
        /// Logout user from SSO.
        /// </summary>
        /// <returns>Method returns void.</returns>
        public void Logout()
        {
            try
            {
                RAJSSO.SSO SSO = new RAJSSO.SSO();
                SSO.SSOSignout();
            }
            catch
            {
            }
        }

        /// <summary>
        /// User back to SSO.
        /// </summary>
        /// <returns>Method returns void.</returns>
        public void BackToSSO()
        {
            try
            {
                RAJSSO.SSO SSO = new RAJSSO.SSO();
                SSO.BackToSSO();
            }
            catch
            {
            }
        }

    }
}
