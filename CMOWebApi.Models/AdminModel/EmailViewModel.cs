namespace CMOWebApi.Models.AdminModel
{
    public class EmailViewModel
    {
       // public EmailTemplateView EmailTemplate { get; set; }
      //  public List<GlobalMacro> AllMacro { get; set; }
    }
    public class EmailTemplateModel
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string EmailTypeCode { get; set; }
        public bool IsActive { get; set; }
        public int TemplateId { get; set; }
        public int EmailTypeId { get; set; }
        public string Subject { get; set; }
        public string EmailContent { get; set; }


    }
}
