namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class appUserban : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "Baned", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AppUsers", "Baned");
        }
    }
}
