using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using esign;
using System;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Web;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.ServiceHelper
{
    public class eSignHelper
    {
        private readonly static string _path = FilePath.EsignPath.GetStringValue();

        public eSignHelper()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        /// <summary>
        /// Encrypts a string value
        /// </summary>
        /// <param name="toEncrypt">String to encrypt</param>
        /// <returns>The method returns string value</returns>
        public static string Encrypt(string toEncrypt)
        {
            string retVal = string.Empty;
            try
            {
                byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(toEncrypt);
                string encrypted = Convert.ToBase64String(b);
                retVal = encrypted;
            }
            catch (Exception ex)
            {
                //throw new EncryptionException(EncryptionException.Code.EncryptionFailure, ex, MethodBase.GetCurrentMethod());
            }
            return retVal;
        }

        /// <summary>
        /// Decrypts a specified key against the original security key, with the option to hash.
        /// </summary>
        /// <param name="encrString">String to decrypt</param>
        /// <returns>The method returns string value</returns>
        public static string Decrypt(string encrString)
        {
            string retVal = string.Empty;
            try
            {
                byte[] b;
                string decrypted;
                try
                {
                    b = Convert.FromBase64String(encrString);
                    decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
                }
                catch (FormatException fe)
                {
                    decrypted = "";
                }
                retVal = decrypted;
            }
            catch (Exception ex)
            {
                // throw new EncryptionException(EncryptionException.Code.DecryptionFailure, ex, MethodBase.GetCurrentMethod());
            }
            return retVal;
        }

        /// <summary>
        /// Create eSign Request 
        /// </summary>
        /// <param name="inputFilePath"></param>
        public static string Create_eSignRequest(string userAadharNo, string inputFilePath, long id)
        {
            string result = string.Empty;

            string msg = string.Empty;
            string PhysicalFolderPath = HttpContext.Current.Server.MapPath(_path);// "D:\\Harry\\eSign\\ESIGN\\Data\\"; //TODOD:\Tanmaya\Api\cmo\cmo-webapi\cmo-webapi\CMOWebApi.WebApi\Content\UploadFolder\OrderEntry\GenerateOrder\Esign\
            if (!string.IsNullOrEmpty(inputFilePath))
                try
                {
                    string tickImage = HttpContext.Current.ApplicationInstance.Server.MapPath("~/UploadFile/") + "tick.png";

                    DateTime utcdate = DateTime.UtcNow;
                    var istdate = TimeZoneInfo.ConvertTimeFromUtc(utcdate, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                    var docBytes = System.IO.File.ReadAllBytes(inputFilePath);
                    string docBase64 = Convert.ToBase64String(docBytes);
                    string hex = "";
                    try
                    {
                        Esigner esigner = new Esigner();
                        hex = esigner.signDetachedStage1(docBase64, tickImage);
                    }
                    catch (NullReferenceException ex)
                    {
                        ex.Message.ToString();
                    }

                    XElement inputXml = new XElement("Esign", new XAttribute("AuthMode", "1"),
                        new XAttribute("aspId", "asp1"),
                        new XAttribute("ekycId", ""),
                        new XAttribute("ekycIdType", "A"),
                        new XAttribute("responseSigType", "pkcs7"),
                        new XAttribute("responseUrl", ConfigurationManager.AppSettings["BaseUrl"] + "Home/Esign/" + id),//TODO ConfigurationManager.AppSettings["BaseUrl"]
                        new XAttribute("sc", "Y"),
                        new XAttribute("ts", istdate.ToString("yyyy-MM-dd'T'HH:mm:ss")),
                        new XAttribute("txn", Encrypt(Guid.NewGuid().ToString("N").Substring(0, 12) + "-" + userAadharNo)),
                        new XAttribute("ver", 2.1),
                        new XElement("Docs", new XElement("InputHash", new XAttribute("docInfo", "test"),
                        new XAttribute("hashAlgorithm", "SHA256"),
                        new XAttribute("id", "1"), hex))
                     );

                    XDocument doc = new XDocument(inputXml);
                    doc.Save(PhysicalFolderPath + "" + "input.xml");

                    // Create a new XML document.
                    XmlDocument xmlDoc = new XmlDocument();

                    X509Certificate2 uidCert = new X509Certificate2(HttpContext.Current.ApplicationInstance.Server.MapPath("~/UploadFile/") + "Class 1 Certificate.pfx", "RISL@123",
                        X509KeyStorageFlags.DefaultKeySet | X509KeyStorageFlags.Exportable | X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet);

                    // Load an XML file into the XmlDocument object.
                    xmlDoc.Load(PhysicalFolderPath + "" + "input.xml");
                    xmlDoc.PreserveWhitespace = false;

                    // Sign the XML document. 
                    SignXml(xmlDoc, uidCert);

                    Console.WriteLine("XML file signed.");

                    // Save the document.
                    xmlDoc.Save(PhysicalFolderPath + "" + "test-signed.xml");
                    //Session["XMLData"] = "";
                    //Session["XMLData"] = xmlDoc.InnerXml.ToString();
                    //Response.Redirect("Request.aspx");

                    //Console.WriteLine(inputXml);
                    result = xmlDoc.InnerXml.ToString();
                }
                catch (Exception ex)
                {
                    msg = "File Not Uploaded!!" + ex.GetBaseException();
                }
            else
            {
                msg = "Please Select File and Upload Again";
            }
            return result;
        }

        /// <summary>
        /// Sign an XML file. 
        /// This document cannot be verified unless the verifying code has the key with which it was signed. 
        /// </summary>
        /// <param name="xmlDoc"></param>
        /// <param name="uidCert"></param>
        public static void SignXml(XmlDocument xmlDoc, X509Certificate2 uidCert)
        {
            RSACryptoServiceProvider rsaKey = (RSACryptoServiceProvider)uidCert.PrivateKey;

            // Check arguments. 
            if (xmlDoc == null)
                throw new ArgumentException("xmlDoc");
            if (rsaKey == null)
                throw new ArgumentException("Key");

            // Create a SignedXml object.
            SignedXml signedXml = new SignedXml(xmlDoc);

            // Add the key to the SignedXml document.
            signedXml.SigningKey = rsaKey;

            // Create a reference to be signed.
            Reference reference = new Reference();
            reference.Uri = "";

            // Add an enveloped transformation to the reference.
            XmlDsigEnvelopedSignatureTransform env = new XmlDsigEnvelopedSignatureTransform();
            reference.AddTransform(env);

            // Add the reference to the SignedXml object.
            signedXml.AddReference(reference);

            // Add an RSAKeyValue KeyInfo (optional; helps recipient find key to validate).
            KeyInfo keyInfo = new KeyInfo();

            KeyInfoX509Data clause = new KeyInfoX509Data();
            clause.AddSubjectName(uidCert.Subject);
            clause.AddCertificate(uidCert);
            keyInfo.AddClause(clause);
            signedXml.KeyInfo = keyInfo;

            // Compute the signature.
            signedXml.ComputeSignature();

            // Get the XML representation of the signature and save 
            // it to an XmlElement object.
            XmlElement xmlDigitalSignature = signedXml.GetXml();

            System.Console.WriteLine(signedXml.GetXml().InnerXml);

            // Append the element to the XML document.
            xmlDoc.DocumentElement.AppendChild(xmlDoc.ImportNode(xmlDigitalSignature, true));
        }


        public static bool SaveEsign(string url, long id)
        {
            using (Jankalyan_DBEntities db = new Jankalyan_DBEntities())
            {
                var obj = db.tblODR_OrderEntryMaster.Where(x => x.Id == id).FirstOrDefault();
                if (string.IsNullOrEmpty(obj.ESignedUrl1))
                {
                    obj.ESignedUrl1 = FilePath.EsignPath.GetStringValue() + url;
                }
                else if (string.IsNullOrEmpty(obj.ESignedUrl2))
                {
                    obj.ESignedUrl2 = FilePath.EsignPath.GetStringValue() + url;
                }
                else if (string.IsNullOrEmpty(obj.ESignedUrl3))
                {
                    obj.ESignedUrl3 = FilePath.EsignPath.GetStringValue() + url;
                }
                else if (string.IsNullOrEmpty(obj.ESignedUrl4))
                {
                    obj.ESignedUrl4 = FilePath.EsignPath.GetStringValue() + url;
                }
                else if (string.IsNullOrEmpty(obj.ESignedUrl5))
                {
                    obj.ESignedUrl5 = FilePath.EsignPath.GetStringValue() + url;
                }
                obj.ESignedFinalUrl = FilePath.EsignPath.GetStringValue() + url;
                db.SaveChanges();
            }
            return true;
        }

    }
}
