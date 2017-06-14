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
    public class RoomReservationController : ApiController
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
        [Route("RoomReservations")]
        public IQueryable<RoomReservations> m1()
        {
            return db.RoomReservations;
        }

        [HttpGet]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult m2(int id)
        {
            RoomReservations roomReservations = db.RoomReservations.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            return Ok(roomReservations);
        }

        [Authorize(Roles = "AppUser")]
        [HttpPut]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult m3(int id, RoomReservations roomReservations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomReservations.Id)
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
           
            if (!baUser.appUserId.Equals(roomReservations.AppUserId))
            {
                return Unauthorized();
            }

            db.Entry(roomReservations).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationsExists(id))
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
        [Route("RoomReservations")]
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult PostRoomReservations(RoomReservations roomReservations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomReservations.Add(roomReservations);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "RoomReservations", id = roomReservations.Id }, roomReservations);
        }

        [Authorize(Roles = "AppUser")]
        [HttpDelete]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult DeleteRoomReservations(int id)
        {
            RoomReservations roomReservations = db.RoomReservations.Find(id);
            if (roomReservations == null)
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

            if (!baUser.appUserId.Equals(roomReservations.AppUserId))
            {
                return Unauthorized();
            }

            db.RoomReservations.Remove(roomReservations);
            db.SaveChanges();

            return Ok(roomReservations);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationsExists(int id)
        {
            return db.RoomReservations.Count(e => e.Id == id) > 0;
        }
    }
}
