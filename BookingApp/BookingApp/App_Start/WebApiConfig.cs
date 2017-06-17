﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using System.Web.Http.OData.Builder;
using BookingApp.Models;
using System.Web.Http.OData.Extensions;

namespace BookingApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Accommodation>("Search");
            builder.EntitySet<AccommodationType>("AccommodationTypes");
            builder.EntitySet<AppUser>("AppUsers");
            builder.EntitySet<Comment>("Comments");
            builder.EntitySet<Place>("Places");
            builder.EntitySet<Room>("Rooms");
           // builder.EntitySet<Accommodation>("Accommodations");
            builder.EntitySet<Country>("Countrys");
            builder.EntitySet<Region>("Regions");
            builder.EntitySet<RoomReservations>("RoomReservations");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

           // var cors = new EnableCorsAttribute("*", "*", "*");
           // config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
			
			config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
    }
}
