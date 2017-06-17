using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System.Web.Http.Results;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using BookingApp.Hubs;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AccommodationController : ApiController
    {
        private BAContext db = new BAContext();

        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [EnableQuery]
        [HttpGet]
        [Route("Accommodations")]
        public IQueryable<Accommodation> m1()
        {
            return db.Accommodations;
        }

        [EnableQuery]
        [HttpGet]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult m2(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            return Ok(accommodation);
        }

        [Authorize (Roles = "Manager")]
        [HttpPut]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult m3(int id, Accommodation accommodation)
        {
            IdentityUser user = UserManager.FindById(User.Identity.GetUserId());
            BAIdentityUser baUser = new BAIdentityUser();
            baUser = user as BAIdentityUser;

            if (baUser == null)
            {
                return null;
            }

            var userRole = baUser.Roles.FirstOrDefault().RoleId;
            var roleName = db.Roles.FirstOrDefault(a => a.Id == userRole);

            if (!roleName.Name.Equals("Manager"))
            {
                return Unauthorized();
            }

            if (!baUser.appUserId.Equals(accommodation.AppUserId))
            {
                return Unauthorized();
            }          

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accommodation.Id)
            {
                return BadRequest();
            }

            db.Entry(accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("Accommodations/approve")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Approve(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(accommodation.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("Accommodations")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation()
        {
            Accommodation accommodation = new Accommodation();         

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            accommodation = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);

            foreach (string file in httpRequest.Files)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                var postedFile = httpRequest.Files[file];
                if (postedFile != null && postedFile.ContentLength > 0)
                {

                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                    var extension = ext.ToLower();
                    if (!AllowedFileExtensions.Contains(extension))
                    {
                        return BadRequest();
                    }
                    else
                    {
                        var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                        accommodation.ImageURL = "Content/AccommodationPictures/" + postedFile.FileName;
                        postedFile.SaveAs(filePath);
                    }
                }
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            Notification.NotifyAdmin(accommodation.Id);

            return CreatedAtRoute("DefaultApi", new {controller = "Accommodation", id = accommodation.Id }, accommodation);
        }

        [Authorize (Roles = "Manager")]
        [HttpDelete]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            IdentityUser user = UserManager.FindById(User.Identity.GetUserId());
            BAIdentityUser baUser = new BAIdentityUser();
            baUser = user as BAIdentityUser;

            if (baUser == null)
            {
                return null;
            }

            var userRole = baUser.Roles.FirstOrDefault().RoleId;
            var roleName = db.Roles.FirstOrDefault(a => a.Id == userRole);

            if (!roleName.Name.Equals("Manager"))
            {
                return Unauthorized();
            }

            if (!baUser.appUserId.Equals(accommodation.AppUserId))
            {
                return Unauthorized();
            }

            db.Accommodations.Remove(accommodation);

            db.Comments.RemoveRange(db.Comments.Where(a => a.AccommodationId == id));
            db.Rooms.RemoveRange(db.Rooms.Where(a => a.AccommodationId == id));
            db.SaveChanges();

            return Ok(accommodation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }       

    }
}
