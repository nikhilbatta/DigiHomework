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
      public ActionResult <IEnumerable<Period>> Get([FromBody] User userparam)
      {
          // will use claims identity here to find the periods for that specific teacher.
          Console.WriteLine(userparam.Username);
          Console.WriteLine(userparam.Password);
          var user = _userService.Authenticate(userparam.Username, userparam.Password);
          return Ok(user);
      }
    }
}