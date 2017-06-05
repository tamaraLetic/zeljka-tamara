using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int RoomNumber { get; set; }

        [Required]
        [Range(0, 10)]
        public int BedCount { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

        [Required]
        [Range(0, float.MaxValue)]
        public float PricePerNight { get; set; }

        [ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }

        [Required]
        public Accommodation Accommodation { get; set; }
    }
}