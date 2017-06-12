import {  Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {Place} from '../place/place.model';
import {PlaceListService} from '../place-list/place-list.service';

@Component({
  selector: 'edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css'],
  providers:[PlaceListService] //dodali servis
})
export class EditPlaceComponent implements OnInit {

  place: Place;
  id: number=-1;

  @Output()select: EventEmitter<string>;
  constructor(private placeService: PlaceListService,private router: Router, private activatedRoute: ActivatedRoute) {
    
      this.place=new Place();    
   }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.placeService.getById(this.id).subscribe(x =>  this.place = x[0] as Place);
      
  }
  
  onSubmit(){

      this.placeService.update(this.place).subscribe(x => this.router.navigate(['/place']));
  }
}
