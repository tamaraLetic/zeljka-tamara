﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Accommodation
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

        [StringLength(256)]
        public string Address { get; set; }

        [Range(0,5)]
        public decimal AvargeGrade { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }


        public string ImageURL { get; set; }

        [Required]
        public bool Approved { get; set; }

        [Required]
        [ForeignKey("Place")]
        public int PlaceId { get; set; }

        
        public Place Place { get; set; }

        [Required]
        [ForeignKey("AccommodationType")]
        public int AccommodationTypeId { get; set; }

        
        public AccommodationType AccommodationType { get; set; }

        public List<Room> Rooms { get; set; }
        public List<Comment> Comments { get; set; }

        [Required]
        [ForeignKey("AppUser")]
        public int AppUserId { get; set; }
      
        public AppUser AppUser { get; set; }

    }
}