using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.ComplaintSoftware
{
    public class ComplaintSoftwareAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ComplaintSoftware";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
		
			GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
			context.Routes.MapHttpRoute(
			   name: "ComplaintSoftware_default",
			   routeTemplate: "ComplaintSoftware/{controller}/{action}/{id}",
			   defaults: new { id = RouteParameter.Optional }
		   );
		}
    }
}