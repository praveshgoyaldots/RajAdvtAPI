using System;

namespace CMOWebApi.Core.Enums
{
    public class FixedValues
    {
        public enum DBFilterType
        {
            [StringValue("int")]
            Int,
            [StringValue("decimal")]
            Decimal,
            [StringValue("numberfrom")]
            Number_From,
            [StringValue("numberto")]
            Number_To,
            [StringValue("multiselect")]
            MultiSelect,
            [StringValue("date")]
            Date,
            [StringValue("datefrom")]
            Date_From,
            [StringValue("dateto")]
            Date_To,
            [StringValue("bit")]
            Bit,
            [StringValue("text")]
            Text,
            [StringValue("varchar")]
            VarChar,
            [StringValue("nvarchar")]
            nVarChar,
            [StringValue("datefrom_multidatestring")]
            DateFrom_MultiDateString,
            [StringValue("dateto_multidatestring")]
            DateTo_MultiDateString,
        }

        public enum FilePath
        {
            [StringValue("https://rajadvt.rajasthan.gov.in/rajadvtapi/")]
            FileServerBasePath,

            [StringValue("~/Content/UploadFolder/UserProfile/")]
            UserProFileSavePath,

            [StringValue("~/Content/UploadFolder/AdvRedesign/")]
            RedesignLocation,

            [StringValue("~/Content/UploadFolder/AdvertisementEntry/")]
            AdvLocation,

            [StringValue("~/Content/UploadFolder/AdvertisementEntry/")]
            AdvViewLocation,

            [StringValue("~/Content/UploadFolder/OrderEntry/")]
            OrderLocation,

            [StringValue("~/Content/UploadFolder/Scheme/")]
            SchemeLocation,

            [StringValue("~/Content/UploadFolder/SchemeFaq/")]
            SchemefaqLocation,

            [StringValue("~/Content/UploadFolder/Scheme/Logo/")]
            SchemeLogoLocation,

            [StringValue("~/Content/UploadFolder/Scheme/Banner/")]
            SchemeBannerLocation,

            [StringValue("~/Content/UploadFolder/HelpDocument/")]
            HelpDocLocation,

            [StringValue("~/Content/UploadFolder/ExcelUpload/DemoExcelFormat.xlsx")]
            ExcelDocLocation,

            [StringValue("~/Content/Images/No-Image-Available1.png")]
            NoImages,

            [StringValue("~/Content/Images/defaultscheme.jpg")]
            FlagShipImages,

            [StringValue("~/Content/Images/Banner2-min.jpg")]
            BannerDefaultImages,

            [StringValue("~/Content/UploadFolder/PhotoVideoGallery/")]
            GalleryFilePath,

            [StringValue("~/Content/UploadFolder/FlagShipSchemeImage/")]
            FlagShipSchemeImageFilePath,

            [StringValue("~/Content/UploadFolder/PhotoVideoGallery/Thumbnail/")]
            GalleryThumbnailPath,

            [StringValue("~/Content/UploadFolder/Advertisement/Images/")]
            AdvImgBaseLocation,

            [StringValue("~/Content/UploadFolder/Advertisement/Pdf/")]
            AdvPdfBaseLocation,

            [StringValue("~/Content/UploadFolder/OrderEntry/GenerateOrder/")]
            GenerateOrderLocation,

            [StringValue("~/Content/UploadFolder/ComplaintSoftware/Complaint/")]
            GenerateComplaintLocation,

            [StringValue("~/Content/UploadFolder/ComplaintSoftware/Action/")]
            GenerateActionLocation,

            [StringValue("~/Content/UploadFolder/OrderTypeMaster/")]
            OrderTypePathLocation,

            [StringValue("~/Content/UploadFolder/ComplaintSoftware/Action/")]
            GenerateComplaintActionLocation,

            [StringValue("~/Content/Images/cancel.jpg")]
            CancelOrderwatermark,

            [StringValue("~/Content/UploadFolder/DepartmentSetup/")]
            DptSetupLocation,

            [StringValue("~/Content/UploadFolder/OrderEntry/GenerateOrder/GeneratePdf/")]
            GeneratePdfLocation,

            [StringValue("~/Content/UploadFolder/Advertisement/Achievements/")]
            AchievementLocation,

            [StringValue("~/Content/UploadFolder/AchievementCategoryMaster/")]
            AchievementCategoryMasterLocation,

            [StringValue("~/Content/UploadFolder/AchievementSubCategoryMaster/")]
            AchievementSubCategoryMasterLocation,

            [StringValue("~/Content/UploadFolder/Report/AchievementReport/")]
            GenerateachievementxlsxLocation,

            [StringValue("~/Content/UploadFolder/Report/VCReport/")]
            GeneratevcxlsxLocation,

            [StringValue("~/Content/UploadFolder/LogFiles/")]
            LogFilesPath,

            [StringValue("~/Content/UploadFolder/Department/Images/")]
            DepartmentProfileImagePath,

            [StringValue("~/Content/UploadFolder/Department/PDF/")]
            DepartmentProfilePDFPath,

            [StringValue("~/Content/UploadFolder/Report/User/")]
            UserReportPath,

            [StringValue("~/Content/UploadFolder/Report/GovDocument/")]
            DocumentReportPath,

            [StringValue("~/Content/UploadFolder/NewsModule/")]
            NewsModulePath,

            [StringValue("~/Content/UploadFolder/CMProfile/")]
            CMProfileFilePath,

            [StringValue("~/Content/UploadFolder/ProjectMaster/")]
            ProjectMasterPath,

            [StringValue("~/Content/UploadFolder/MPConstituency/")]
            MPConstituencyPath,

            [StringValue("~/Content/UploadFolder/MLAConstituency/")]
            MLAConstituencyPath,

            [StringValue("~/Content/UploadFolder/ChildPageMaster/")]
            ChildPageMasterPath,

            [StringValue("~/Content/UploadFolder/Report/ProjectReport/")]
            ProjectReport,

            [StringValue("~/Content/UploadFolder/Report/")]
            CommonReport,

            [StringValue("~/Content/UploadFolder/Testimonial/PDF/")]
            TestimonialPDFPath,

            [StringValue("~/Content/UploadFolder/Testimonial/Images/")]
            TestimonialImagePath,

            [StringValue("~/Content/UploadFolder/Tender/")]
            TenderFilePath,

            [StringValue("~/Content/UploadFolder/DepartmentMenu/")]
            DepartmentMenuPath,

            [StringValue("~/Content/UploadFolder/PressRelease/")]
            PressReleaseFilePath,

            [StringValue("~/Content/UploadFolder/OrderEntry/GenerateOrder/Esign/")]
            EsignPath,

            [StringValue("~/Content/UploadFolder/HelpDocument/")]
            AdvtDefaultFilePath,
        }
    }
}
