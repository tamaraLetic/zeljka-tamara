import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Room } from '../room/room.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { Router, ActivatedRoute } from "@angular/router";
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import {AccommodationTypeListService} from '../accommodation-type-list/accommodation-type-list.service';
import {AuthService}from '../auth.service';
import {Comment} from '../comment/comment.model';
import {CommentListService} from '../comment-list/comment-list.service';

@Component({
  selector: 'app-show-reviews',
  templateUrl: './show-reviews.component.html',
  styleUrls: ['./show-reviews.component.css'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService,AccommodationTypeListService,AuthService , CommentListService] 
})
export class ShowReviewsComponent implements OnInit {
   acc: Accommodation;
   id: number = -1;
   comments: Comment [];

  constructor(private authService: AuthService,private accService: AccommodationService, private accTypeService: AccommodationTypeListService, private router: Router, private activatedRoute: ActivatedRoute, private commentService: CommentListService) { 
    this.acc = new Accommodation();
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.accService.getById(this.id).subscribe(res => 
    {
      this.acc = res[0];
      this.comments = res[0].Comments;
      console.log(this.comments);
    });
  }
  isUser():boolean{

    return this.authService.isUser();
  }
    isLoggedIn() : boolean{

    return this.authService.isLoggedIn();
  }
  deleteComment(appUserId: number, accommodationId:number){

    //console.log(id);
    this.commentService.delete(appUserId,accommodationId).subscribe(res => this.comments.splice(this.comments.indexOf(res.json() as Comment),1));
  }

  hasRight(id: number): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let userID = JSON.parse(token).id;
    let auth = false;

    if (role=="User" && userID == id)
    {
      auth = true;
    }

    return auth;
  }
    findIndex(comment: Comment): number{
    for(let i =0; i<=this.comments.length; i++){
      if(this.comments[i].Id==comment.Id){
        return i;
      }
    }
    return -1;
  }
}
