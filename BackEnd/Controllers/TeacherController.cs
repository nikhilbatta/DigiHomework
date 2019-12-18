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
using System.Threading.Tasks;
using System.Text;

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
            var user = _userService.Authenticate(userparam.Username, userparam.Password);
            return Ok(user);
        }
        [Authorize]
        [HttpGet("periods")]
        public ActionResult<IEnumerable<Period>> Get()
        {
           
            var identity = (ClaimsIdentity)User.Identity;
            var foundId = identity.FindFirst(ClaimTypes.Name).Value;
            Teacher foundTeacher = _db.Teachers.FirstOrDefault(t => t.UserID == Convert.ToInt32(foundId));
            List<Period> foundPeriods = _db.Periods.Include(p => p.Students).Where(p => p.TeacherID == foundTeacher.TeacherID).ToList();
            return foundPeriods;
        }
        [Authorize]
        [HttpGet("period/{id}")]
        public ActionResult<IEnumerable<PeriodHomework>> GetAllHomeWorks(int id)
        {
            Period foundPeriod = _db.Periods.FirstOrDefault(p => p.PeriodID == id);
            List<PeriodHomework> foundHomework = _db.PeriodHomeworks.Where(ph => ph.PeriodID == foundPeriod.PeriodID).ToList();
            return foundHomework;
        }

        [HttpGet("periods/homework/{id}")]
        public ActionResult <PeriodHomework> GetSpecificHomework(int id)
        {
            PeriodHomework foundHomework = _db.PeriodHomeworks.FirstOrDefault(ph => ph.PeriodHomeworkID == id);
            return foundHomework;
        }

        [HttpPost("period/{id}/homework")]
        public void CreateHWImage([FromForm] PeriodHomework hw, int id)
        {
            Console.WriteLine(hw.HWImage.FileName);

            hw.PeriodID = id;
            hw.ImageId = "https://testerbuckettt.s3-us-west-2.amazonaws.com/" + "HOMEWORK-" + hw.PeriodHomeworkID + ".jpeg";
            _db.PeriodHomeworks.Add(hw);
            _db.SaveChanges();
            SaveFileToAWS(hw.ImageId, hw.HWImage);
        }
        [HttpGet("period/homework/{id}/image")]
        public async Task GetObjectFromS3Async(int id)
        {
            // PeriodHomework foundHomework 
            var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.USWest2);
            string keyName = "HOMEWORK-" + id + ".jpeg";
            var request = new GetObjectRequest 
            {
                BucketName = "testerbuckettt",
                Key = keyName
            };
            string responseBody;

            using (var response = await client.GetObjectAsync(request))
            using (var responseStream = response.ResponseStream)
            using (var reader = new StreamReader(responseStream))
            {
                var title = response.Metadata["x-amz"];
                var contentType = response.Headers["Content-Type"];
                Console.WriteLine($"Object meta, {title}");
                 responseBody = reader.ReadToEnd();
            // Console.WriteLine(responseBody);
            };
            var pathAndFileName = $"/Users/Guest/Desktop/{keyName}";
            var createText = responseBody;

            System.IO.File.WriteAllText(pathAndFileName, createText);
            WebClient myWebber = new WebClient();
            byte[] myDataBuffer = myWebber.DownloadData("https://testerbuckettt.s3-us-west-2.amazonaws.com/HOMEWORK-3.jpeg");
            string download = Encoding.ASCII.GetString(myDataBuffer);
            Console.WriteLine(download);
           
        }
         private void SaveFileToAWS(string fileID, IFormFile file)
        {
            var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.USWest2);
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
        [HttpPost("period/{id}/homework/{hwID}")]
        // hwID is actually periodHomeworkID
        public void Send(int id, int hwID)
        {
            List<PeriodStudents> foundStudentPeriod = _db.PeriodStudents.Where(p => p.PeriodID == id).ToList();
          
            foreach(PeriodStudents found1 in foundStudentPeriod)
            {
                List<Student> foundStudents = _db.Students.Where(s => s.StudentID == found1.StudentID).ToList();
                foreach(Student found in foundStudents)
            {
                StudentPeriodHw newSPHomework = new StudentPeriodHw();
                newSPHomework.StudentID = found.StudentID;
                newSPHomework.PeriodHwID = hwID;
                _db.StudentPeriodHw.Add(newSPHomework);
                 _db.SaveChanges();
                newSPHomework.Shortcode = newSPHomework.StudentPeriodHwId.ToString() + found.FirstName[0] + found.LastName[0];
                _db.Entry(newSPHomework).State = EntityState.Modified;
                _db.SaveChanges();
                
                Console.WriteLine(found.PhoneNumber);
            const string accountSid = "";
            const string authToken = "";
            TwilioClient.Init(accountSid, authToken);
        //     var mediaUrl = new[] {
        //       new Uri("https://testerbuckettt.s3-us-west-2.amazonaws.com/HOMEWORK-{hwID}.jpeg")
        //   }.ToList();
            var message = MessageResource.Create(
                body: $"Testing more and youre in the class so youre receiving it ;). http://localhost:8080/#/period/homework/student/{newSPHomework.Shortcode}/",
                from: new Twilio.Types.PhoneNumber("+15025144572"),
                // mediaUrl: mediaUrl,
                to: new Twilio.Types.PhoneNumber("+1" + found.PhoneNumber)
            );
            }
            }
            
            
            // Console.WriteLine(message.Sid);
        }
        [HttpGet("sh/{shortcode}")]
        public ActionResult <StudentHomeworkResponse> GetStudentHomeworkData(string shortcode)
        {
            Console.WriteLine(shortcode);
            StudentPeriodHw foundStudentHomework = _db.StudentPeriodHw.FirstOrDefault(p => p.Shortcode == shortcode);
            Student foundStudent = _db.Students.FirstOrDefault(s => s.StudentID == foundStudentHomework.StudentID);
            PeriodHomework foundPeriodHomework = _db.PeriodHomeworks.FirstOrDefault(ph => ph.PeriodHomeworkID == foundStudentHomework.PeriodHwID);
            var shr = new StudentHomeworkResponse();
            shr.StudentID = foundStudent.StudentID;
            shr.FirstName = foundStudent.FirstName;
            shr.LastName = foundStudent.LastName;
            shr.HomeworkDescription = foundPeriodHomework.Description;
            shr.HomeworkTitle = foundPeriodHomework.Title;
            shr.AssignedDate = foundPeriodHomework.AssignedDate;
            shr.DueDate = foundPeriodHomework.DueDate;
            
            return shr;

        }
        // public HttpResponseMessage GetHwImage(int id)
        // {
        //     HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
        //     response.Content = new ByteArrayContent(GetFileFromAWS("HOMEWORK-" + id).ToArray());
        //     response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
        //     Console.WriteLine("returning tati");
        //     return response;
        // }
        // private MemoryStream GetFileFromAWS(string fileid)
        // {
        //     var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.USWest2);
        //     var fileTransfer = new TransferUtility(client);
        //    GetObjectRequest request = new GetObjectRequest
        // {
        //     BucketName = "testerbuckettt",
        //     Key = fileid
        // };
        
        //     Task tasker = client.GetObjectAsync(request);
        //     tasker.Wait();
        //     MemoryStream memoryStream = new MemoryStream();

        //     using (Stream responseStream = tasker.ResponseStream)
        //     {
        //         responseStream.CopyTo(memoryStream);
        //     }
        //     Console.WriteLine("return memeory");
        //     return memoryStream;

        // }
       
        // [HttpPost("testingaws")]
        // public void TestingAws()
        // {
        //     var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.USWest2);
        //     var fileTransfer = new TransferUtility(client);
        //     fileTransfer.UploadAsync("/Users/Guest/Downloads/asdf.jpeg", "testerbuckettt");
        //     Console.WriteLine(fileTransfer);
        //     //   var putRequest = new PutObjectRequest 
        //     //   {
        //     //       BucketName = "testerbuckettt", 
        //     //       Key = "testerrrr",
        //     //       ContentBody = "sampletext"
        //     //   };
        //     //   client.PutObjectAsync(putRequest);
        //     //   Console.WriteLine(client);
        // }
    }
}