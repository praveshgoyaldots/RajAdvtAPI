using CMOWebApi.Services.ServiceHelper;
using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CMOWebApi.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            // var cors =
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            config.MessageHandlers.Add(new TokenValidationHandler());
            // config.SuppressDefaultHostAuthentication();
            // config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional });
        }
    }
}
