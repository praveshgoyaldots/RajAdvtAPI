using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.VendorPressReleaseModule
{
    public class VendorPressReleaseModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "TenderPressReleaseModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            //context.MapRoute(
            //    "VendorPressReleaseModule_default",
            //    "VendorPressReleaseModule/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //);

            GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            context.Routes.MapHttpRoute(
               name: "VendorPressReleaseModule_default",
               routeTemplate: "TenderPressReleaseModule/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
        }
    }
}