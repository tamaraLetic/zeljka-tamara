import {  Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Region} from '../region/region.model';
import {Country} from '../country/country.model';
import {RegionService} from '../region-list/region-list.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css'],
  providers:[RegionService] //dodali servis
})
export class EditRegionComponent implements OnInit {

  region: Region;
  id: number=-1;

  @Output()select: EventEmitter<string>;
  constructor(private RegionService: RegionService,private router: Router, private activatedRoute: ActivatedRoute) {
    
      this.region=new Region();
      activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
      this.RegionService.getById(this.id).subscribe(x =>  this.region = x[0] as Region);
      
   }

  ngOnInit() {
    
  }
  
  onSubmit(){

      this.RegionService.update(this.region).subscribe(x => this.router.navigate(['/region']));
  }
}
