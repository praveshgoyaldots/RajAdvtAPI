using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.VideoConferencing
{
    public class VideoConferencingAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "VideoConferencing";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            //context.MapRoute(
            //    "VideoConferencing_default",
            //    "VideoConferencing/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //);

            GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            context.Routes.MapHttpRoute(
               name: "VideoConferencing_default",
               routeTemplate: "VideoConferencing/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
        }
    }
}