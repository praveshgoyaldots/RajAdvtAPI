using System;
using System.Data;
using RAJSSO;
using System.Configuration;
using System.Web;

public partial class Ssointegration : System.Web.UI.Page
{
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

    //for bypass login
    if (Request.QueryString["operation"] != null && Request.QueryString["operation"].ToLower().Equals("bypass") && Request.QueryString["ssoid"] != null)
    {
      hdnSSOID.Value = Request.QueryString["ssoid"];
    }
    //for Direct Login
    else
    {
      if (!IsPostBack)
      {

        RAJSSO.SSO SSO = new RAJSSO.SSO();
        if (SSO.CreateSSOSession())
        {
          SSOTokenDetail ssoDetails = SSO.GetSessionValue();
          if (ssoDetails != null)
          {
            hdnSSOID.Value = ssoDetails.SSOID;
            //hdnSSOUserType.Value = string.Join(",", ssoDetails.Roles);
          }
        }
      }
    } 
    #endregion

    hdnBaseUrl.Value = ConfigurationManager.AppSettings["ClientBaseUrl"].ToString();
  }

  private void BackTOSSO()
  {
    RAJSSO.SSO SSO = new RAJSSO.SSO();
    string SSOID = Request.Cookies["RAJSSO"] != null ? Request.Cookies["RAJSSO"].Value : string.Empty;
    Session.Clear();     //clear session
    Session.Abandon();   //Abandon session
    SSO.BackToSSO(SSOID);//redirect to SSO
  }
  private void LogOut()
  {
    RAJSSO.SSO SSO = new RAJSSO.SSO();
    string SSOID = Request.Cookies["RAJSSO"] != null ? Request.Cookies["RAJSSO"].Value : string.Empty;
    Session.Clear();        //clear session
    Session.Abandon();      //Abandon session
    SSO.SSOSignout(SSOID); //redirect Login Page Of SSO
  }
}

