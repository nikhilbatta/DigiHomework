using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BackEnd.Services;
using BackEnd.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BackEnd;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
      private readonly IUserService _userService;
      private readonly BackEndContext _db;
      public TeacherController(BackEndContext db, IUserService userService)
      {
          _userService = userService;
          _db = db;
      }
      [HttpPost]
      public ActionResult <IEnumerable<Period>> Post([FromBody] User userparam)
      {
          // will use claims identity here to find the periods for that specific teacher.
          Console.WriteLine(userparam.Username);
          Console.WriteLine(userparam.Password);
          var user = _userService.Authenticate(userparam.Username, userparam.Password);
          return Ok(user);
      }
      [Authorize]
      [HttpGet]
      public ActionResult <IEnumerable<Period>> Get()
      {
          // will use claims identity here to find the periods for that specific teacher.
          var identity = (ClaimsIdentity)User.Identity;
          var foundId = identity.FindFirst(ClaimTypes.Name).Value;
          Teacher foundTeacher = _db.Teachers.FirstOrDefault(t => t.UserID == Convert.ToInt32(foundId));
          List <Period> foundPeriods = _db.Periods.Include(p => p.Students).Where(p => p.TeacherID == foundTeacher.TeacherID).ToList();
          return foundPeriods;
      }
      [Authorize]
      [HttpGet("homework")]
      public ActionResult <IEnumerable<PeriodHomework>> GetAllHomeWorks()
      {
          var identity = (ClaimsIdentity)User.Identity;
          var foundId = identity.FindFirst(ClaimTypes.Name).Value;
          Teacher foundTeacher = _db.Teachers.FirstOrDefault(t => t.UserID == Convert.ToInt32(foundId));
          Period foundPeriod = _db.Periods.FirstOrDefault(p => p.TeacherID == foundTeacher.TeacherID);
          List<PeriodHomework>  foundHomework = _db.PeriodHomeworks.Where(ph => ph.PeriodID == foundPeriod.PeriodID).ToList();
          return foundHomework;
      }
      [Authorize]
      [HttpPost("create")]
      public void Post([FromBody] PeriodHomework newHomework) 
      {
          var identity = (ClaimsIdentity)User.Identity;
          var foundId = identity.FindFirst(ClaimTypes.Name).Value;
          Teacher foundTeacher = _db.Teachers.FirstOrDefault(t => t.UserID == Convert.ToInt32(foundId));
          Console.WriteLine(newHomework);
        //   _db.PeriodHomework.add(newHomework);
      }
    }
}