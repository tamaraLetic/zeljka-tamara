using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class FilterController : ODataController
    {
        private BAContext db = new BAContext();

        [EnableQuery]
        [HttpGet]
        public IQueryable<Accommodation> m1()
        {
            return db.Accommodations;
        }
    }
}
