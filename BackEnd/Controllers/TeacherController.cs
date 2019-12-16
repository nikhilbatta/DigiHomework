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
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Http;
using System.Net;

namespace BackEnd.Controllers
{
    [Route("api")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        IAmazonS3 _S3Client { get; set; }
        private readonly IUserService _userService;
        private readonly BackEndContext _db;
        public TeacherController(BackEndContext db, IUserService userService, IAmazonS3 s3Client)
        {
            _S3Client = s3Client;
            _userService = userService;
            _db = db;
        }
        [HttpPost("authenticate")]
        public ActionResult<User> Authenticate([FromBody] User userparam)
        {
            // will use claims identity here to find the periods for that specific teacher.
            Console.WriteLine(userparam.Username);
            Console.WriteLine(userparam.Password);
            var user = _userService.Authenticate(userparam.Username, userparam.Password);
            return Ok(user);
        }
        [Authorize]
        [HttpGet("periods")]
        public ActionResult<IEnumerable<Period>> Get()
        {
            // will use claims identity here to find the periods for that specific teacher.
            var identity = (ClaimsIdentity)User.Identity;
            var foundId = identity.FindFirst(ClaimTypes.Name).Value;
            Teacher foundTeacher = _db.Teachers.FirstOrDefault(t => t.UserID == Convert.ToInt32(foundId));
            List<Period> foundPeriods = _db.Periods.Include(p => p.Students).Where(p => p.TeacherID == foundTeacher.TeacherID).ToList();
            return foundPeriods;
        }
        [Authorize]
        [HttpGet("period/{id}")]
        // pass period id in the url, only return homework for that specific period.
        // return other information about the period like name subject teachername, etc.
        public ActionResult<IEnumerable<PeriodHomework>> GetAllHomeWorks()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var foundId = identity.FindFirst(ClaimTypes.Name).Value;
            Teacher foundTeacher = _db.Teachers.FirstOrDefault(t => t.UserID == Convert.ToInt32(foundId));
            Period foundPeriod = _db.Periods.FirstOrDefault(p => p.TeacherID == foundTeacher.TeacherID);
            List<PeriodHomework> foundHomework = _db.PeriodHomeworks.Where(ph => ph.PeriodID == foundPeriod.PeriodID).ToList();
            return foundHomework;
        }


        [HttpPost("period/{id}/homework")]
        public void CreateHWImage([FromForm] PeriodHomework hw, int id)
        {
            Console.WriteLine(hw.HWImage.FileName);

            hw.PeriodID = id;
            _db.PeriodHomeworks.Add(hw);
            _db.SaveChanges();
            SaveFileToAWS("HOMEWORK-" + hw.PeriodHomeworkID, hw.HWImage);
        }
        [HttpGet("period/homework/{id}/image")]
        public HttpResponseMessage GetHwImage(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ByteArrayContent(GetFileFromAWS("HOMEWORK-" + id).ToArray());
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
            Console.WriteLine("returning tati");
            return response;
        }
        private MemoryStream GetFileFromAWS(string fileid)
        {
            var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.USWest2);
            var fileTransfer = new TransferUtility(client);
           GetObjectRequest request = new GetObjectRequest
        {
            BucketName = "testerbuckettt",
            Key = fileid
        };
        
            var task = client.GetObjectAsync(request);
            task.Wait();
            MemoryStream memoryStream = new MemoryStream();

            using (Stream responseStream = task.Result.ResponseStream)
            {
                responseStream.CopyTo(memoryStream);
            }
            Console.WriteLine("return memeory");
            return memoryStream;

        }
        private void SaveFileToAWS(string fileID, IFormFile file)
        {
            var client = new AmazonS3Client("AKIAIRBJILX3OKHCMNMQ", "t+WgTzSfXxKdKRXnF/4MjevQ/EYtlg5Ss7K+SBwe", Amazon.RegionEndpoint.USWest2);
            var fileTransfer = new TransferUtility(client);
            var stream = new MemoryStream();
            file.CopyTo(stream);
            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = stream,
                Key = fileID,
                BucketName = "testerbuckettt",
                CannedACL = S3CannedACL.PublicRead
            };


            fileTransfer.UploadAsync(uploadRequest);
        }
        [HttpPost("sender")]
        public void Send()
        {
            const string accountSid = "";
            const string authToken = "";
            TwilioClient.Init(accountSid, authToken);
            var mediaUrl = new[] {
              new Uri("https://m.media-amazon.com/images/M/MV5BMzRjYjcyZTItNTA1Mi00YTVkLWE2Y2MtMmRlMzllODkyYzQ2XkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_UX182_CR0,0,182,268_AL_.jpg")
          }.ToList();
            var message = MessageResource.Create(
                body: "Check if you can click that link and see that image.",
                from: new Twilio.Types.PhoneNumber("+15025144572"),
                mediaUrl: mediaUrl,
                to: new Twilio.Types.PhoneNumber("+19714207970")
            );
            Console.WriteLine(message.Sid);
        }
        [HttpPost("testingaws")]
        public void TestingAws()
        {
            var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.USWest2);
            var fileTransfer = new TransferUtility(client);
            fileTransfer.UploadAsync("/Users/Guest/Downloads/asdf.jpeg", "testerbuckettt");
            Console.WriteLine(fileTransfer);
            //   var putRequest = new PutObjectRequest 
            //   {
            //       BucketName = "testerbuckettt", 
            //       Key = "testerrrr",
            //       ContentBody = "sampletext"
            //   };
            //   client.PutObjectAsync(putRequest);
            //   Console.WriteLine(client);
        }
    }
}