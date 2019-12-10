using System.Collections.Generic;
using System.Linq;

namespace BackEnd.Models
{
    public class PeriodHomework
    {
        public int PeriodHomeworkID {get;set;}
        public int PeriodID {get;set;}
        public string Description {get;set;}
        public string AssignedDate{get;set;}
        public string DueDate{get;set;}
        public string ImageId{get;set;}
    }

}