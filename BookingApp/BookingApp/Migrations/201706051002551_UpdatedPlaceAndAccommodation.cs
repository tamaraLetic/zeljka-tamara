namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedPlaceAndAccommodation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accommodations", "PlaceId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accommodations", "PlaceId");
            AddForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places");
            DropIndex("dbo.Accommodations", new[] { "PlaceId" });
            DropColumn("dbo.Accommodations", "PlaceId");
        }
    }
}
