using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using esign;
using System;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Xml.Linq;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.API.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            return View();

        }

        [ValidateInput(false)]
        public ActionResult Esign(int id=0)
        {
            try
            {
                string PhysicalFolderPath = Server.MapPath(FilePath.EsignPath.GetStringValue());
                string fileName = string.Empty;
                if (Request.Form["esignData"] != null)
                {
                    string esignRes = Request.Form["esignData"].ToString();
                    String pattern = "(<DocSignature .*>)(.*)(<\\/DocSignature>)";
                    Match match = Regex.Match(esignRes, pattern);
                    string docInfo = "";
                    if (match.Success)
                    {
                        docInfo = match.Groups[0].Value;
                        System.Console.WriteLine(docInfo);
                        //Response.Write(docInfo);
                    }

                    String sign = docInfo;
                    String patternNew = "\\<DocSignature (.*)\\>([^\\<\\>]+)\\</DocSignature\\>";

                    Match matchNew = Regex.Match(sign, patternNew);
                    string finalSign = "";
                    if (match.Success)
                    {
                        finalSign = match.Groups[2].Value;
                        System.Console.WriteLine(finalSign);
                        // Response.Write(finalSign);
                    }
                    var rootElement = XElement.Parse(esignRes);
                    string cert = rootElement.Element("UserX509Certificate").Value.ToString();
                    string txn = rootElement.Attribute("txn").Value;
                    string aadharno = eSignHelper.Decrypt(txn);
                    aadharno = aadharno.Substring(13);
                  
                    Esigner esigner = new Esigner();
                    esigner.signDetachedStage2(finalSign);
                    String signgedDoc = esigner.visibleSign(cert, 400, 100, 100, 150, 1, true);
                     fileName = Guid.NewGuid().ToString() + "_Signed.pdf";
                    string finalSignFile = PhysicalFolderPath + fileName;

                    System.IO.File.WriteAllBytes(finalSignFile, Convert.FromBase64String(signgedDoc));

                }
                if (id>0)
                {
                    eSignHelper.SaveEsign(fileName, id);
                    return Redirect(ConfigurationManager.AppSettings["AngularBaseUrl"] + "#/order/generateorderauthoritylistesign");
                }
                else
                {
                    return Redirect(ConfigurationManager.AppSettings["AngularBaseUrl"] + "#/order/generateauthoritylistesignex");
                }
              
            }
            catch (Exception ex)
            {
                return Redirect(ConfigurationManager.AppSettings["AngularBaseUrl"] + "#/order/generateauthoritylistesignex");
            }
        }
    }
}
