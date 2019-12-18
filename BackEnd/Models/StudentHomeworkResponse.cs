namespace BackEnd.Models
{
    public class StudentHomeworkResponse
    {
        public int StudentID {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string HomeworkDescription {get;set;}
        public string HomeworkTitle {get;set;}
        public string AssignedDate {get;set;}
        public string DueDate {get;set;}
        public string ImageID {get;set;}
    }
}