namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddComment : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        AppUserId = c.Int(nullable: false),
                        AccommodationId = c.Int(nullable: false),
                        Grade = c.Int(nullable: false),
                        Text = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => new { t.AppUserId, t.AccommodationId })
                .ForeignKey("dbo.Accommodations", t => t.AccommodationId, cascadeDelete: false)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: true)
                .Index(t => t.AppUserId)
                .Index(t => t.AccommodationId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "AccommodationId", "dbo.Accommodations");
            DropIndex("dbo.Comments", new[] { "AccommodationId" });
            DropIndex("dbo.Comments", new[] { "AppUserId" });
            DropTable("dbo.Comments");
        }
    }
}
