using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.ComparetiveModule
{
	public class ComparetiveModuleAreaRegistration : AreaRegistration
	{
		public override string AreaName
		{
			get
			{
				return "ComparetiveModule";
			}
		}

		public override void RegisterArea(AreaRegistrationContext context)
		{
			GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
			context.Routes.MapHttpRoute(
			   name: "ComparetiveModule_default",
			   routeTemplate: "ComparetiveModule/{controller}/{action}/{id}",
			   defaults: new { id = RouteParameter.Optional }
		   );
		}
	}
}