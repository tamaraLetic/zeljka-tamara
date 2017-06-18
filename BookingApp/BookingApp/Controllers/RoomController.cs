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
    public class RoomController : ApiController
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
        [Route("Rooms")]
        public IQueryable<Room> m1()
        {
            return db.Rooms;
        }

        [HttpGet]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult m2(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult m3(int id, Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != room.Id)
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

            Accommodation acc = db.Accommodations.FirstOrDefault(a => a.Id == room.AccommodationId);

            if (!baUser.appUserId.Equals(acc.AppUserId))
            {
                return Unauthorized();
            }

            db.Entry(room).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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

        [Authorize (Roles = "Manager")]
        [HttpPost]
        [Route("Rooms")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom(Room room)
        {
            IdentityUser user = UserManager.FindById(User.Identity.GetUserId());
            BAIdentityUser baUser = new BAIdentityUser();
            baUser = user as BAIdentityUser;

            if (baUser == null)
            {
                return null;
            }

            if (baUser.appUser.Baned)
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                        
            db.Rooms.Add(room);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Room", id = room.Id }, room);
        }

        [Authorize]
        [HttpDelete]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
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

            Accommodation acc = db.Accommodations.FirstOrDefault(a => a.Id == room.AccommodationId);

            if (!baUser.appUserId.Equals(acc.AppUserId))
            {
                return Unauthorized();
            }

            db.Rooms.Remove(room);
            db.SaveChanges();

            return Ok(room);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.Id == id) > 0;
        }
    }
}
