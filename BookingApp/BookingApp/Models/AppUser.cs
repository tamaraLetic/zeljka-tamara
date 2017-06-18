using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }

        public bool Baned { get; set; }

        public List<Comment> Comments { get; set; }

        public List<Accommodation> Accommodations { get; set; }
    }
}