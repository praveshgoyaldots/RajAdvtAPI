using CMOWebApi.Core.Enums;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Configuration;
using System.Data;
using System.IO;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.ServiceHelper
{
    public class ExportHelper
    {
        private static readonly string _xlsxPath = FilePath.GenerateachievementxlsxLocation.GetStringValue();

        public static SheetData TableRowData(DataTable dt)
        {
            try
            {
                SheetData sd = new SheetData();
                UInt32Value rowIndex = 2u;

                for (int dtrow = 0; dt.Rows.Count > dtrow; dtrow++)
                {
                    Row row = new Row() { RowIndex = rowIndex };
                    for (int col = 0; dt.Columns.Count > col; col++)
                    {
                        Cell cellSNo = new Cell();
                        cellSNo.DataType = CellValues.InlineString;
                        cellSNo.InlineString = new InlineString { Text = new Text(Convert.ToString(dt.Rows[dtrow][col])) };
                        row.Append(cellSNo);
                    }
                    sd.Append(row);
                    rowIndex++;
                }
                return sd;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                throw;
            }
        }

        /// <summary>
        /// Export Data XLS
        /// </summary>
        /// <param name="Data"></param>
        /// <param name="StrSlag"></param>
        public static string ExportData(string sheetName, DataTable dT_Export, string fileName = "", string path = "")
        {
            try
            {
                MemoryStream ms = new MemoryStream();
                SpreadsheetDocument xl = SpreadsheetDocument.Create(ms, SpreadsheetDocumentType.Workbook);
                WorkbookPart wbp = xl.AddWorkbookPart();
                Workbook wb = new Workbook();
                FileVersion fv = new FileVersion();
                Sheets sheets = new Sheets();
                Sheet sheet1 = new Sheet();    // Sheet Data
                WorksheetPart wspData = wbp.AddNewPart<WorksheetPart>();
                Worksheet wsData = new Worksheet();
                SheetData sdData = TableRowData(dT_Export);

                wsData.Append(sdData);
                wspData.Worksheet = wsData;
                wspData.Worksheet.Save();
                sheet1.Name = sheetName;
                sheet1.SheetId = 0;
                sheet1.Id = wbp.GetIdOfPart(wspData);

                sheets.Append(sheet1);
                wb.Append(fv);
                wb.Append(sheets);
                xl.WorkbookPart.Workbook = wb;
                xl.WorkbookPart.Workbook.Save();
                xl.Close();
                fileName = fileName + "_" + DateTime.Now.ToString("MM-dd-yyyy") + ".xlsx";
                HttpContext.Current.Response.Clear();
                byte[] dt = ms.ToArray();
                var savePath = HttpContext.Current.Server.MapPath(!string.IsNullOrEmpty(path) ? path : _xlsxPath) + fileName;
                using (FileStream stream = new FileStream(savePath, FileMode.Create))
                {
                    stream.Write(dt, 0, dt.Length);
                }
                return savePath;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }




    }
}
