namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedbooltoRoomReservation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RoomReservations", "Reserved", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RoomReservations", "Reserved");
        }
    }
}
