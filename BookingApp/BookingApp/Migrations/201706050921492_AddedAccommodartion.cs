namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedAccommodartion : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accommodations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Description = c.String(maxLength: 1024),
                        Address = c.String(maxLength: 256),
                        AvargeGrade = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        ImageURL = c.String(),
                        Approved = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Accommodations");
        }
    }
}
