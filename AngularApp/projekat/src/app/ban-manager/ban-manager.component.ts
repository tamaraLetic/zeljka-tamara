import { Component, OnInit, Input } from '@angular/core';
import {AppUser} from '../appuser/appuser.model';
import {BanManagerService} from './ban-manager.service';

@Component({
  selector: 'app-ban-manager',
  templateUrl: './ban-manager.component.html',
  styleUrls: ['./ban-manager.component.css'],
  providers: [BanManagerService]
})
export class BanManagerComponent implements OnInit {

  users : AppUser[]

  constructor(private banService: BanManagerService) {

    this.users = [];
   }

  ngOnInit() {

    this.banService.getManager().subscribe(x => this.users = x.json());
  }

  hasRight(): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let auth = false;

    if (role=="Admin")
    {
      auth = true;
    }

    return auth;
  }

  banUser(id: number){

    let user = this.users.filter(x => x.Id == id)[0];

    if ((user as AppUser).Baned == false)
      {
          (user as AppUser).Baned = true;
      }
    else if ((user as AppUser).Baned == true)
    {
      (user as AppUser).Baned = false;
    }

    this.banService.ban((user as AppUser)).subscribe();
  }

}
