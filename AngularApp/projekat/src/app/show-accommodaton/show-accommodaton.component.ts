import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Room } from '../room/room.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { Router, ActivatedRoute } from "@angular/router";
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import {AccommodationTypeListService} from '../accommodation-type-list/accommodation-type-list.service';
import {AuthService}from '../auth.service';
import {Comment} from '../comment/comment.model';

@Component({
  selector: 'app-show-accommodaton',
  templateUrl: './show-accommodaton.component.html',
  styleUrls: ['./show-accommodaton.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService,AccommodationTypeListService,AuthService ] //dodali servis
})
export class ShowAccommodatonComponent implements OnInit {

  acc: Accommodation;
  id: number = -1;
  accType : AccommodationType;
  rooms: Room [];
  comments: Comment [];
  averageGrade: number;

  constructor(private authService: AuthService,private accService: AccommodationService, private accTypeService: AccommodationTypeListService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.acc = new Accommodation();
    this.acc.AccommodationType = {} as AccommodationType;
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.accService.getById(this.id).subscribe(res => 
    {
      this.acc = res[0];
      this.rooms = res[0].Rooms;
      console.log("ShowAcc rooms"+this.rooms);
      this.comments = res[0].Comments;
      console.log("ShowAcc comments"+this.comments);
      this.acc.AvargeGrade=this.getAverageGrade(this.comments);
    });
  }
 isUser():boolean{

    return this.authService.isUser();
  }
    isLoggedIn() : boolean{

    return this.authService.isLoggedIn();
  }

  getAverageGrade(comments:Comment[]):number{
    let returnAverageGrade=0;
    let counter=0;
      if(comments){
        if(comments.length>0){
          for(let i=0; i<comments.length;i++){
            returnAverageGrade+=comments[i].Grade;
            counter++;
          }
          return Math.round( (returnAverageGrade/counter));
        }
        return 0;
      }
      return 0;
  }
}
