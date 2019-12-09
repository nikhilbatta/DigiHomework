using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BackEnd.Services;
using BackEnd.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
      private readonly BackEndContext _db;
      public TeacherController(BackEndContext db)
      {
          _db = db;
      }
      [HttpGet]
      public ActionResult <IEnumerable<Teacher>> Get()
      {
          var teachers = _db.Teachers.ToList();
          return teachers;
      }
    }
}