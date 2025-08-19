using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
	{
		public override string AreaName
		{
			get
			{
				return "Admin";
			}
		}

		public override void RegisterArea(AreaRegistrationContext context)
		{

			GlobalConfiguration.Configuration.Formatters.Add
(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
			context.Routes.MapHttpRoute(
			   name: "Admin_default",
			   routeTemplate: "Admin/{controller}/{action}/{id}",
			   defaults: new
			   {
				   id = RouteParameter.Optional
			   }
		   );

		}
	}


}