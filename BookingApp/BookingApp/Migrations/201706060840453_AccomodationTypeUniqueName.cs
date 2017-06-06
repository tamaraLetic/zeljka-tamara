namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccomodationTypeUniqueName : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.AccommodationTypes", "Name", unique: true, name: "ATname");
        }
        
        public override void Down()
        {
            DropIndex("dbo.AccommodationTypes", "ATname");
        }
    }
}
