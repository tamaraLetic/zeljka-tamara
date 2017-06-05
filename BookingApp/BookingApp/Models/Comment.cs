using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Comment
    {
        [Required]
        [Range(0,5)]
        public int Grade { get; set; }

        [StringLength(1000)]
        public string Text { get; set; }

        [Key]
        [Column(Order = 1)]
        [ForeignKey("AppUser")]       
        public int AppUserId { get; set; }

        [Required]
        public AppUser AppUser { get; set; }

        [Key]
        [Column(Order = 2)]
        [ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }

        [Required]
        public Accommodation Accommodation { get; set; }
    }
}