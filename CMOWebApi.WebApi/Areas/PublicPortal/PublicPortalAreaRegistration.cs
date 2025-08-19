using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.PublicPortal
{
    public class PublicPortalAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "PublicPortal";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {

			GlobalConfiguration.Configuration.Formatters.Add
(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
			context.Routes.MapHttpRoute(
			   name: "PublicPortal_default",
			   routeTemplate: "PublicPortal/{controller}/{action}/{id}",
			   defaults: new
			   {
				   id = RouteParameter.Optional
			   });

			//context.MapRoute(
			//             "PublicPortal_default",
			//             "PublicPortal/{controller}/{action}/{id}",
			//             new { action = "Index", id = UrlParameter.Optional }
			//         );
		}
    }
}