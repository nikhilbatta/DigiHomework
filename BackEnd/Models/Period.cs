using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BackEnd.Models
{
    public class Period 
    {
        public int PeriodID {get;set;}
        public int TeacherID {get;set;}
        public string Name{get;set;}
        public string Subject {get;set;}
        public ICollection<Student> Students {get;set;}
        public Period()
        {
            this.Students = new HashSet<Student>();
        }
    }
}