namespace BackEnd.Models
{
    public class StudentPeriodHw
    {
        public int StudentPeriodHwId {get;set;}
        public int StudentID{get;set;}
        public int PeriodHwID{get;set;}
        public string Shortcode {get;set;}
        public string StudentResponse {get;set;}
        public string Grade {get;set;}
        public string TeacherComments{get;set;}
    }
}