using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.CMDashboard
{
    public class CMDashboardAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "CMDashboard";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            //context.MapRoute(
            //    "CMDashboard_default",
            //    "CMDashboard/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //);



            GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            context.Routes.MapHttpRoute(
               name: "CMDashboard_default",
               routeTemplate: "CMDashboard/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );

        }
    }
}