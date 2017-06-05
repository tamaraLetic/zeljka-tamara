namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddOwner : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accommodations", "AppUserId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accommodations", "AppUserId");
            AddForeignKey("dbo.Accommodations", "AppUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accommodations", "AppUserId", "dbo.AppUsers");
            DropIndex("dbo.Accommodations", new[] { "AppUserId" });
            DropColumn("dbo.Accommodations", "AppUserId");
        }
    }
}
