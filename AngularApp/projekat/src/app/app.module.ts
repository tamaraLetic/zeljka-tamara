import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterAppuserComponent } from './register-appuser/register-appuser.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';

import { AuthService } from './auth.service';

import { LoggedInGuard } from './logged-in.guard';
import { AdminGuard } from './admin.guard';
import { ManagerGuard } from './manager.guard';

import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationTypeComponent } from './accommodation-type/accommodation-type.component';
import { AccommodationTypeListComponent } from './accommodation-type-list/accommodation-type-list.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { PlaceComponent } from './place/place.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { RegionComponent } from './region/region.component';
import { RegionListComponent } from './region-list/region-list.component';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomReservationsComponent } from './room-reservations/room-reservations.component';
import { RoomReservationsListComponent } from './room-reservations-list/room-reservations-list.component';
import { EditRegionComponent } from './edit-region/edit-region.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { EditAccommodationComponent } from './edit-accommodation/edit-accommodation.component'
import { EditAccommodationTypeComponent } from './edit-accommodation-type/edit-accommodation-type.component';
import { EditRoomComponent } from './edit-room/edit-room.component'

const Routes = [
  {path: "login", component: LoginComponent},
  {path: "countryList", component: CountryListComponent, LoggedInGuard},
  {path: "home", component: HomeComponent} ,
  {path: "register", component: RegisterAppuserComponent},
  {path: "logout", component: LogoutComponent},
  {path: "region", component: RegionListComponent},
  {path: "room", component: RoomListComponent},
  {path: "comment", component: CommentListComponent},
  {path: "editRegion/:Id", component: EditRegionComponent, AdminGuard},
  {path: "country", component: CountryListComponent},
  {path: "editCountry/:Id", component: EditCountryComponent, AdminGuard},
  {path: "place", component: PlaceListComponent},
  {path: "editPlace/:Id", component: EditPlaceComponent, AdminGuard},
  {path: "accommodation", component: AccommodationListComponent},
  {path: "editAccommodation/:Id", component: EditAccommodationComponent, ManagerGuard},
  {path: "editAccommodationType/:Id", component: EditAccommodationTypeComponent},
  {path: "editRoom/:Id", component: EditRoomComponent},
  {path: "accommodationType", component: AccommodationTypeListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryComponent,
    LoginComponent,
    UserComponent,
    RegisterAppuserComponent,
    RegisterManagerComponent,
    HomeComponent,
    LogoutComponent,
    AccommodationComponent,
    AccommodationListComponent,
    AccommodationTypeComponent,
    AccommodationTypeListComponent,
    CommentComponent,
    CommentListComponent,
    PlaceComponent,
    PlaceListComponent,
    RegionComponent,
    RegionListComponent,
    RoomComponent,
    RoomListComponent,
    RoomReservationsComponent,
    RoomReservationsListComponent,
    EditRegionComponent,
    EditCountryComponent,
    EditPlaceComponent,
    EditAccommodationComponent,
    EditAccommodationTypeComponent,
    EditRoomComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
