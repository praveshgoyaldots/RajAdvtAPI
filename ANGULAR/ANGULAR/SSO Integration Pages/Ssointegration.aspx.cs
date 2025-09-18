using System;
using System.Data;
using RAJSSO;
using System.Configuration;
using System.Web;

public partial class Ssointegration : System.Web.UI.Page
{
    SSO SSO = new SSO();
    protected void Page_Load(object sender, EventArgs e)
    {
        #region <<   BackToSSO or LogOut   >>
        //for BackTOSSO
        if (Request.QueryString["operation"] != null && Request.QueryString["operation"].ToLower().Equals("backtosso"))
        {
            BackTOSSO();
        }
        //for Logout 
        else if (Request.QueryString["operation"] != null && Request.QueryString["operation"].ToLower().Equals("logout"))
        {
            LogOut();
        }

        #endregion

        #region <<   Login   >>

        ////for bypass login
        //if (Request.QueryString["operation"] != null && Request.QueryString["operation"].ToLower().Equals("bypass") && Request.QueryString["ssoid"] != null)
        //{
        //    hdnSSOID.Value = Request.QueryString["ssoid"];
        //}
        ////for Direct Login
        //else
        //{
        if (!IsPostBack)
        {
            string ssoDetails = string.Empty;
            SSO.CreateSSOSession();
            SSO.ClientSideSession();
            ssoDetails = SSO.GetSessionValue();
            string SSOId = ssoDetails.Split(';')[0].Split('=')[1];
            string Role = ssoDetails.Split(';')[1].Split('=')[1].Split('|')[0];
            if (ssoDetails != null)
            {
                hdnSSOID.Value = SSOId;
            }
            else
            {
                BackTOSSO();
            }

        }
        //}
        #endregion

        hdnBaseUrl.Value = ConfigurationManager.AppSettings["ClientBaseUrl"].ToString();
    }

    private void BackTOSSO()
    {
        string SSOID = Request.Cookies["RAJSSO"] != null ? Request.Cookies["RAJSSO"].Value : string.Empty;
        Session.Clear();     //clear session
        Session.Abandon();   //Abandon session
        SSO.BackToSSO(SSOID);//redirect to SSO
    }
    private void LogOut()
    {

        string SSOID = Request.Cookies["RAJSSO"] != null ? Request.Cookies["RAJSSO"].Value : string.Empty;
        Session.Clear();        //clear session
        Session.Abandon();      //Abandon session
        SSO.SSOSignout(SSOID); //redirect Login Page Of SSO
    }
}

