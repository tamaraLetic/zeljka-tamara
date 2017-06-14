using BookingApp.Models;
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
    public class AccommodationTypeController : ApiController
    {
        private BAContext db = new BAContext();

        [EnableQuery]
        [HttpGet]
        [Route("AccommodationTypes")]
        public IQueryable<AccommodationType> m1()
        {
            return db.AccommodationTypes;
        }

        [HttpGet]
        [Route("AccommodationTypes/{id}")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult m2(int id)
        {
            AccommodationType accomType = db.AccommodationTypes.Find(id);
            if (accomType == null)
            {
                return NotFound();
            }

            return Ok(accomType);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("AccommodationTypes/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult m3(int id, AccommodationType accomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accomType.Id)
            {
                return BadRequest();
            }

            db.Entry(accomType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationTypeExists(id))
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
        [HttpPost]
        [Route("AccommodationTypes")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult PostAccommodationType(AccommodationType accomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccommodationTypes.Add(accomType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new {controller = "AccommodationType", id = accomType.Id }, accomType);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("AccommodationTypes/{id}")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult DeleteAccommodationType(int id)
        {
            AccommodationType accomType = db.AccommodationTypes.Find(id);
            if (accomType == null)
            {
                return NotFound();
            }

            db.AccommodationTypes.Remove(accomType);
            db.SaveChanges();

            return Ok(accomType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationTypeExists(int id)
        {
            return db.AccommodationTypes.Count(e => e.Id == id) > 0;
        }
    }
}
