import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Comment} from '../comment/comment.model';
import {Accommodation} from '../accommodation/accommodation.model';
import {CommentListService} from './comment-list.service';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  providers:[CommentListService, AccommodationService] //dodali servis
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

   constructor(private commentListService: CommentListService, private accommodationService: AccommodationService,private router: Router, private activatedRoute: ActivatedRoute) { 

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
    this.commentListService.create(new Comment(1, this.grade, this.text, this.selectedAccommodation.Id, +userId)).subscribe(res => this.comments.push(res.json()));
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

}
