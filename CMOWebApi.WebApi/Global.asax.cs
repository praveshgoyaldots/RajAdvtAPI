using CMOWebApi.WebAPI;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace CMOWebApi.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            MvcHandler.DisableMvcResponseHeader = true;
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Error;
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            UnityConfig.RegisterComponents();
        }

        // this is use for purpose of "Security Audit 
        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("Server");
            Response.Headers.Remove("X-AspNet-Version");
            Response.Headers.Remove("Expires");
            Response.Headers.Remove("Cache-Control");
            Response.Headers.Remove("Connection");
            Response.Headers.Remove("Date");
            Response.Headers.Remove("Content-Type");

            //Response.Headers.Remove("ETag");
            //Response.Headers.Remove("X-Powered-By");
            //Response.Headers.Remove("X-AspNetMvc-Version");
            //Response.Headers.Remove("X-Content-Type-Options");
            //Response.Headers.Add("ETag", "&quot;&quot;");
            //Response.Headers.Add("ETag", " ");
            //Response.Headers.Add("X-Content-Type-Options", "nosniff");
            //Response.Headers.Add("X-XSS-Protection", "1; mode=block");
            //Response.Headers.Add("Content-Security-Policy", "style-src 'self' 'unsafe-inline';");
            //Response.Headers.Add("X-Frame-Options", "DENY");
            //Response.Headers.Add("X-Powered-By", "");
            //Response.Headers.Add("X-AspNetMvc-Version", "");
            //Response.Headers.Add("X-AspNet-Version", "");
            //Response.Headers.Add("Access-Control-Request-Method", "GET,POST");
            //Response.Headers.Add("Access-Control-Allow-Headers", "*");
            //Response.Headers.Add("Referrer-Policy", "SAMEORIGIN");
            //Response.Headers.Add("X-Permitted-Cross-Domain-Policies", "none");
            //Response.Headers.Add("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        }
    }
}
