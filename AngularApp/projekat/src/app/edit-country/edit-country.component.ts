import {  Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Country} from '../country/country.model';
import {CountryListService} from '../country-list/country-list.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css'],
  providers:[CountryListService]
})
export class EditCountryComponent implements OnInit {

   country: Country;
   name : string;
   code : string;
   id: number=-1;

  @Output()select: EventEmitter<string>;
  constructor(private countryService: CountryListService,private router: Router, private activatedRoute: ActivatedRoute) {
    
      this.country = new Country();

   }

  ngOnInit() {
    
     this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
     this.countryService.getById(this.id).subscribe(x =>  this.country= x.json());    
  }
  
  onSubmit(){

    this.countryService.update(this.country).subscribe(x => this.router.navigate(['/country']));
  }

}
