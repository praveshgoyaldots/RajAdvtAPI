namespace CMOWebApi.Core.Enums
{
    public enum AttributeType
    {
        [StringValue("SingleLine")]
        SingleLine=1,
        [StringValue("MultiLine")]
        MultiLine=2,
        [StringValue("MultiLinePlainText")]
        MultiLinePlainText = 22,
        [StringValue("MultiLineRichText")]
        MultiLineRichText = 23,
        [StringValue("YesNo")]
        YesNo = 8,
        [StringValue("Choice")]
        Choice = 3,
        [StringValue("DropDownMenu")]
        DropDownMenu = 12,
        [StringValue("RadioButtons")]
        RadioButtons = 13,
        [StringValue("Checkboxes")]
        Checkboxes = 14,
        [StringValue("DropDownMenuwithSerachBox")]
        DropDownMenuwithSerachBox = 33,
        [StringValue("MultiSelectDropdownwithSearchBox")]
        MultiSelectDropdownwithSearchBox = 34,
        [StringValue("Date")]
        Date = 6,
        [StringValue("DateOnly")]
        DateOnly = 31,
        [StringValue("DateTime")]
        DateTime = 32,
        [StringValue("Number")]
        Number = 4,
        [StringValue("Currency")]
        Currency = 5,
        [StringValue("WholeNumber")]
        WholeNumber = 35,
        [StringValue("IntergerNumber")]
        IntergerNumber =36,
        [StringValue("DecimalNumber")]
        DecimalNumber =37,
        [StringValue("Attachments")]
        Attachments = 26,
        [StringValue("HyperlinkPicture")]
        HyperlinkPicture = 10,
        [StringValue("Hyperlink")]
        Hyperlink = 24,
        [StringValue("Picture")]
        Picture =25,
       
    }
 
}
