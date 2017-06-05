namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRoom : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rooms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoomNumber = c.Int(nullable: false),
                        BedCount = c.Int(nullable: false),
                        Description = c.String(maxLength: 1024),
                        PricePerNight = c.Single(nullable: false),
                        AccommodationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accommodations", t => t.AccommodationId, cascadeDelete: false)
                .Index(t => t.AccommodationId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rooms", "AccommodationId", "dbo.Accommodations");
            DropIndex("dbo.Rooms", new[] { "AccommodationId" });
            DropTable("dbo.Rooms");
        }
    }
}
