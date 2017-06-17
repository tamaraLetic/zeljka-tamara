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
import { FilterParamsService } from './filter-params.service';

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
import { EditRoomComponent } from './edit-room/edit-room.component';
import { FilterComponent } from './filter/filter.component';
import { ShowAccommodatonComponent } from './show-accommodaton/show-accommodaton.component';
import { ShowAccommodationsComponent } from './show-accommodations/show-accommodations.component';
import { ShowRoomReservationsComponent } from './show-room-reservations/show-room-reservations.component';
import { NotificationComponent } from './notification/notification.component';
import { ApproveAccommodationComponent } from './approve-accommodation/approve-accommodation.component';
import { HelpSearchComponent } from './help-search/help-search.component';


const Routes = [
  {path: "login", component: LoginComponent},
  {path: "countryList", component: CountryListComponent, LoggedInGuard, AdminGuard},
  {path: "home", component: HomeComponent} ,
  {path: "register", component: RegisterAppuserComponent},
  {path: "logout", component: LogoutComponent},
  {path: "region", component: RegionListComponent, AdminGuard},
  {path: "room", component: RoomListComponent, ManagerGuard},
  {path: "roomReservations/:Id", component: RoomReservationsListComponent},
  {path: "comment", component: CommentListComponent},
  {path: "editRegion/:Id", component: EditRegionComponent, AdminGuard},
  {path: "country", component: CountryListComponent, AdminGuard},
  {path: "editCountry/:Id", component: EditCountryComponent, AdminGuard},
  {path: "place", component: PlaceListComponent, AdminGuard},
  {path: "editPlace/:Id", component: EditPlaceComponent, AdminGuard},
  {path: "accommodation", component: AccommodationListComponent, ManagerGuard},
  {path: "editAccommodation/:Id", component: EditAccommodationComponent, ManagerGuard},
  {path: "editAccommodationType/:Id", component: EditAccommodationTypeComponent, AdminGuard},
  {path: "editRoom/:Id", component: EditRoomComponent, ManagerGuard},
  {path: "accommodationType", component: AccommodationTypeListComponent, AdminGuard},
  {path: "register-manager", component: RegisterManagerComponent},
  {path: "showAccommodation/:Id", component: ShowAccommodatonComponent},
  {path: "showRoomReservations", component: ShowRoomReservationsComponent},
  {path: "showAccommodations", component: ShowAccommodationsComponent},
  {path: "helpShowAccommodations", component: HelpSearchComponent},
  {path: "approveAccommodations", component: ApproveAccommodationComponent, AdminGuard}
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
    EditRoomComponent,
    FilterComponent,
    ShowAccommodatonComponent,
    ShowAccommodationsComponent,
    ShowRoomReservationsComponent,
    NotificationComponent,
    ApproveAccommodationComponent,
    HelpSearchComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [AuthService, LoggedInGuard, FilterParamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
