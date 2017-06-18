using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class ManagerController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("getmanager")]
        public List<AppUser> GetManagers()
        {
            List<AppUser> appUsers = new List<AppUser>();

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.appUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();

            foreach (var user in users)
            {
                appUsers.Add(user.AppUser);
            }

            return appUsers;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("getuser")]
        public List<AppUser> GetUser()
        {
            List<AppUser> appUsers = new List<AppUser>();

            var role = db.Roles.Where(r => r.Name.Equals("AppUser")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.appUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();

            foreach (var user in users)
            {
                appUsers.Add(user.AppUser);
            }

            return appUsers;
        }
    }
}
