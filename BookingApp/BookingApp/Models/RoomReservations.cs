using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservations
    {
        public int Id { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Timestamp]
        public byte[] TimeStamp { get; set; }

        
        [ForeignKey("AppUser")]
        public int AppUserId { get; set; }

        [Required]
        public AppUser AppUser { get; set; }

        
        [ForeignKey("Room")]
        public int RoomId { get; set; }

        [Required]
        public Room Room { get; set; }
    }
}