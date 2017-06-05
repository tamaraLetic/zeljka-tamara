namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAccommodationType : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AccommodationTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 200),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Accommodations", "AccommodationTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accommodations", "AccommodationTypeId");
            AddForeignKey("dbo.Accommodations", "AccommodationTypeId", "dbo.AccommodationTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accommodations", "AccommodationTypeId", "dbo.AccommodationTypes");
            DropIndex("dbo.Accommodations", new[] { "AccommodationTypeId" });
            DropColumn("dbo.Accommodations", "AccommodationTypeId");
            DropTable("dbo.AccommodationTypes");
        }
    }
}
