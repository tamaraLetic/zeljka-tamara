import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Comment} from '../comment/comment.model';
import {Room} from '../room/room.model';
import {Accommodation} from '../accommodation/accommodation.model';
import {CommentListService} from './comment-list.service';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import { Router, ActivatedRoute } from "@angular/router";
import {RoomReservationsListService} from '../room-reservations-list/room-reservations-list.service';
import {RoomReservations} from '../room-reservations/room-reservations.model';


@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  providers:[CommentListService, AccommodationService,RoomReservationsListService] //dodali servis
})
export class CommentListComponent implements OnInit {

  comments: Comment [];
  grade: number;
  text: string;
  id: number;
  accName: string;
 // accommodations: Accommodation [];
  selectedAccommodation: Accommodation;

  @Output()select: EventEmitter<string>;

   constructor(private commentListService: CommentListService, private accommodationService: AccommodationService,private router: Router, private activatedRoute: ActivatedRoute, private roomReservationsListService:RoomReservationsListService) { 

    this.comments=[]  
   // this.accommodations=[]
    this.select = new EventEmitter();
    this.accName="";
  }

  ngOnInit() {

    //this.commentListService.getAll().subscribe(res => this.comments = res.json());
    //this.accommodationService.getAll().subscribe(res => this.accommodations = res.json());
     this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.accommodationService.getById(this.id).subscribe(res => 
    {
      this.selectedAccommodation = res[0];
      this.comments = res[0].Comments;
      this.accName=res[0].Name;
      console.log(this.comments);
    });
}

  //proveri da li korisnik ima pravo da napise komentar(ako je bio u tom smestaju (prodji kroz roomreservations i gledaj usere i room(accommodationId)))
  //pa proveris i ako postoji taj rr, da li je bio otkazan ili ne
  onSubmit(){
    let token=localStorage.getItem("token");
    let userId=JSON.parse(token).id;
    console.log(userId);
    this.canHeComent(userId, this.selectedAccommodation.Id);
         
    
   
  }

  deleteComment(appUserId: number, accommodationId:number){
    //console.log(id);
    
    this.commentListService.delete(appUserId,accommodationId).subscribe(res => this.comments.splice(this.findIndex(res.json() as Comment),1));
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
  canHeComent(appUserId:number, accommodationId:number){
    let roomReservations=[];
    let rooms=[];
    
    this.roomReservationsListService.getAllFiltered(appUserId).subscribe(res=>{
      roomReservations=res;
      //console.log(roomReservations);
      if(roomReservations){
          if(roomReservations.length>0){
              for(let i=0; i<roomReservations.length; i++){
                if(roomReservations[i].Reserved==true){
                    rooms[i]=roomReservations[i].Room;
                }
                  
              }

              if(rooms){
              //  console.log("Roooooms: "+rooms);
                for(let j=0; j<rooms.length; j++){
                  //pise da je AccommodationId undefined
                  console.log(rooms);
                  if(rooms[j]){
                       if((rooms[j] as Room).AccommodationId==accommodationId){
                            //return true;
                            this.commentListService.create(new Comment(1, this.grade, this.text, this.selectedAccommodation.Id, +appUserId)).subscribe(res => this.comments.push(res.json()));
 
                    }
                  }
                   
                }
                //return false;
              }
          }
     
      }
      //return false;
    
    });

   } 
}
