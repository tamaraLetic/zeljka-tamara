import {  Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationType} from '../accommodation-type/accommodation-type.model';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import {AccommodationTypeListService} from '../accommodation-type-list/accommodation-type-list.service';

@Component({
  selector: 'edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  providers:[AccommodationService,AccommodationTypeListService] //dodali servis
})
export class EditAccommodationComponent implements OnInit {

  acc: Accommodation;
  SelectedAccType : Accommodation;
  accTypes : AccommodationType [];
  id: number = -1;

  @Output()select: EventEmitter<string>;
  constructor(private accService: AccommodationService, private accTypeService: AccommodationTypeListService, private router: Router, private activatedRoute: ActivatedRoute) {
    
      this.SelectedAccType = new Accommodation();
      this.acc = new Accommodation();    
      this.accTypes = [];
   }

  ngOnInit() {
    
    this.accTypeService.getAll().subscribe(x => this.accTypes = x.json());
    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.accService.getById(this.id).subscribe(res => 
    {
      this.acc = res[0];
    });
  }
  
  onSubmit(){

      this.accService.update(this.acc).subscribe(x => this.router.navigate(['/accommodation']));
  }

}
