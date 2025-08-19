
namespace CMOWebApi.Models.AdminModel
{
   public class RecruitmentStatusViewModel
    {
        public string Department { get; set; }
        public int TotalVacancy { get; set; }
        public int Recruitment_Institution { get; set; }
        public int Advertisement_Published { get; set; }
        public int Examination_Conducted { get; set; }
        public int Appointment_Letters_Issued { get; set; }
        public int Court_Cases { get; set; }
     
    }
}
