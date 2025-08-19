using CMOWebApi.Core.Enums;
using iTextSharp.text.pdf;
using System;
using System.Configuration;
using System.IO;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.ServiceHelper
{
    public static class WaterMarkHelper
    {

        public static bool AddWaterMarkHelper(this string sourceFilePath, string watermarkLocation = "")
        {
            try
            {
                CreateLogHelper.CreateLogFile("Add Watermark :" + DateTime.Now.ToString() + " \n \n");
                if (string.IsNullOrEmpty(watermarkLocation))
                {
                    watermarkLocation = HttpContext.Current.Server.MapPath(FilePath.CancelOrderwatermark.GetStringValue());
                }

                byte[] bytes = File.ReadAllBytes(sourceFilePath);

                var img = iTextSharp.text.Image.GetInstance(watermarkLocation);
                img.SetAbsolutePosition(200, 350);
                img.ScaleToFit(200, 200);
                img.RotationDegrees = 25;
                PdfContentByte waterMark;
                using (MemoryStream stream = new MemoryStream())
                {
                    PdfReader reader = new PdfReader(bytes);
                    using (PdfStamper stamper = new PdfStamper(reader, stream))
                    {
                        int pages = reader.NumberOfPages;
                        for (int i = 1; i <= pages; i++)
                        {
                            waterMark = stamper.GetUnderContent(i);
                            waterMark.AddImage(img);
                        }
                    }
                    bytes = stream.ToArray();
                }
                File.WriteAllBytes(sourceFilePath, bytes);
                return true;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Add Watermark ex.Message:" + ex.Message + " \n \n");
                CreateLogHelper.CreateLogFile("Add Watermark  ex.InnerException.Message:" + ex.InnerException.Message + " \n \n");
                return false;
            }
        }
    }
}
