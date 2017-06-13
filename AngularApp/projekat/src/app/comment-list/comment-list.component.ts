import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Comment} from '../comment/comment.model';
import {Accommodation} from '../accommodation/accommodation.model';
import {CommentListService} from './comment-list.service';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';

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
  accommodations: Accommodation [];
  selectedAccommodation: Accommodation;

  @Output()select: EventEmitter<string>;

   constructor(private commentListService: CommentListService, private accommodationService: AccommodationService) { 

    this.comments=[]  
    this.accommodations=[]
    this.select = new EventEmitter();
  }

  ngOnInit() {

    this.commentListService.getAll().subscribe(res => this.comments = res.json());
    this.accommodationService.getAll().subscribe(res => this.accommodations = res.json());
  }

  onSubmit(){
    let token=localStorage.getItem("token");
    let userId=JSON.parse(token).id;
    console.log(userId);
    this.commentListService.create(new Comment(1, this.grade, this.text, this.selectedAccommodation.Id, +userId)).subscribe(res => this.comments.push(res.json()));
  }

  deletePlace(id: number){

    
    this.commentListService.delete(id).subscribe(res => this.comments.splice(this.findIndex(res.json() as Comment),1));
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

  findIndex(comment: Comment): number{
    for(let i =0; i<=this.comments.length; i++){
      if(this.comments[i].Id==comment.Id){
        return i;
      }
    }
    return -1;
  }

}
