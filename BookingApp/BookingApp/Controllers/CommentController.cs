using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class CommentController : ApiController
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
        [Route("Comments")]
        public IQueryable<Comment> m1()
        {
            return db.Comments;
        }

        [HttpGet]
        [Route("Comments/{id}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult m2(int id)
        {
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [Authorize (Roles = "AppUser")]
        [HttpPut]
        [Route("Comments/{idUser}/{idAccommodation}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult m3(int idUser, int idAccommodation, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (idUser != comment.AppUserId || idAccommodation != comment.AccommodationId)
            {
                return BadRequest();
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

            if (!roleName.Name.Equals("AppUser"))
            {
                return Unauthorized();
            }

            if (!baUser.appUserId.Equals(comment.AppUserId))
            {
                return Unauthorized();
            }

            db.Entry(comment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(idUser, idAccommodation))
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

        [Authorize (Roles = "AppUser")]
        [HttpPost]
        [Route("Comments")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(comment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new {controller = "Comment", id = comment.AppUserId, id2 = comment.AccommodationId }, comment);
        }

        [Authorize (Roles = "AppUser")]
        [HttpDelete]
        [Route("Comments/{id},{ida}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int id, int ida)
        {
            Comment comment = db.Comments.Find(id,ida);
            if (comment == null)
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

            if (!roleName.Name.Equals("AppUser"))
            {
                return Unauthorized();
            }

            if (!baUser.appUserId.Equals(comment.AppUserId))
            {
                return Unauthorized();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int idUser, int idAccomm)
        {
            return db.Comments.Count(e => e.AppUserId == idUser && e.AccommodationId == idAccomm) > 0;
        }
    }
}
