using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.DepartmentWebsite
{
    public class DepartmentWebsiteAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "DepartmentWebsite";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
          
			GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
			context.Routes.MapHttpRoute(
			   name: "DepartmentWebsite_default",
			   routeTemplate: "DepartmentWebsite/{controller}/{action}/{id}",
			   defaults: new { id = RouteParameter.Optional }
		   );
		}
    }
}