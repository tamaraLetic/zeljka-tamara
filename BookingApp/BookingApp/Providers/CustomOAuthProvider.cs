using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BookingApp.Providers
{
    public class CustomOAuthProvider : Microsoft.Owin.Security.OAuth.OAuthAuthorizationServerProvider
    {
        private BAContext db = new BAContext();
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            var allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            var roleHeader = "Role";
            context.OwinContext.Response.Headers.Add("Access-Control-Expose-Headers", new[] { roleHeader });

            ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            BAIdentityUser user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.!!!!");
                return;
            }

            var userRole = user.Roles.FirstOrDefault().RoleId;
            var roleName = db.Roles.FirstOrDefault(a => a.Id == userRole );

            //bool isAdmin = await userManager.IsInRoleAsync(user.UserName, "Admin");

            if (roleName.Name.Equals("Admin"))
            {
                context.OwinContext.Response.Headers.Add("Role", new[] { "Admin" });
            }
            else
            {
               // bool isManager = await userManager.IsInRoleAsync(user.UserName, "Manager");
                if (roleName.Name.Equals("Manager"))
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "Manager" });
                }
                else
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "User" });
                }
            }

            //if (!user.EmailConfirmed)
            //{
            //    context.SetError("invalid_grant", "AppUser did not confirm email.");
            //    return;
            //}

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, "JWT");

            var ticket = new AuthenticationTicket(oAuthIdentity, null);

            context.Validated(ticket);

        }
    }
}