using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;

namespace CMOWebApi.Services.ServiceHelper
{
    public class URLShortenerHelper
    {
        public static string GetShorterUrl(string longUrl = "")
        {
            try
            {
                //longUrl = "https://cmo.rajasthan.gov.in/cmoadmin/Program/BannerImage/26644753202f4503ae1f2e513df9e494_Corona_Website_banner_(1).jpg";//for testing
                string shortUrl = string.Empty;
                string responseData = string.Empty;
                string url = "https://api.rebrandly.com/v1/links/new?apikey=0b07812074fa499da387c35187d30a1c&domain[FullName]=rebrand.ly&destination=" + longUrl;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
               
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();

                    var result = JsonConvert.DeserializeObject<dynamic>(responseData);
                    shortUrl = result.shortUrl;
                }
                return shortUrl;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
