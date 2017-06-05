﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Place
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [ForeignKey("Region")]
        public int RegionId { get; set; }

        [Required]
        public Region Region { get; set; }

        public List<Accommodation> Accommodations { get; set; }
    }
}