using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models
{
    public class BackEndContext : DbContext 
    {
        public BackEndContext(DbContextOptions<BackEndContext> options) : base (options)
        {

        }
        public DbSet<Period> Periods {get;set;}
        public DbSet<Student> Students {get;set;}
        public DbSet<Teacher> Teachers {get;set;}
        public DbSet<User> Users {get;set;}
        public DbSet<PeriodStudents> PeriodStudents {get;set;}
        public DbSet<PeriodHomework> PeriodHomeworks {get;set;}
        public DbSet<StudentPeriodHw> StudentPeriodHw{get;set;}
    }
}