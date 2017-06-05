using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Region
    {
        public int Id { get; set; }


        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [ForeignKey("Country")]
        public int CountryId { get; set; }

        [Required]
        public Country Country { get; set; }

        public List<Place> Places { get; set; }
    }
}