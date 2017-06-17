using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BookingApp.Hubs
{
    [HubName("notifications")]
    public class Notification : Hub
    {

        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<Notification>();
        public void Hello()
        {
            Clients.All.hello();
        }

        public static void NotifyAdmin(int accId)
        {
            hubContext.Clients.Group("Admins").checkAccNotification(accId);
        }


        public void Register(string id, string role)
        {
            if (role.Equals("Admin"))
            {
                Groups.Add(Context.ConnectionId, "Admins");
            }
            else if (role.Equals("Manager"))
            {
                Groups.Add(Context.ConnectionId, id);
            }
        }

    }
}