import {  Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';

@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  providers:[AccommodationService] //dodali servis
})
export class EditAccommodationComponent implements OnInit {

  acc: Accommodation;
  id: number=-1;

  @Output()select: EventEmitter<string>;
  constructor(private accService: AccommodationService,private router: Router, private activatedRoute: ActivatedRoute) {
    
      this.acc = new Accommodation();    
   }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.accService.getById(this.id).subscribe(x =>  this.acc = x[0] as Accommodation);
      
  }
  
  onSubmit(){

      this.accService.update(this.acc).subscribe(x => this.router.navigate(['/accommodation']));
  }

}
