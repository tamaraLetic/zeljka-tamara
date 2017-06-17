import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Place } from '../place/place.model';
import { Filter } from '../filter/filter.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from '../accommodation-type-list/accommodation-type-list.service';
import { PlaceListService } from '../place-list/place-list.service';
import { FilterParamsService } from '../filter-params.service';
import { FilterService } from '../filter/filter.service';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';


@Component({
  selector: 'app-show-accommodations',
  templateUrl: './show-accommodations.component.html',
  styleUrls: ['./show-accommodations.component.css'],
   styles: ['agm-map {height: 300px; width: 500px;}'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService,FilterService] //dodali servis
})
export class ShowAccommodationsComponent implements OnInit {
  accommodations : Accommodation [];
  accLenght: number = 0;
  numOfPages : number = 0;
  pageNumbers: number[];

  constructor(private accService: AccommodationService, private filterService: FilterService) { 
    this.accommodations = [];
    this.pageNumbers = [];
  }

  ngOnInit() {

    if (!FilterParamsService.filterParams.AccName)
    {
       FilterParamsService.filterParams.AccName = "";
    }
    if (!FilterParamsService.filterParams.AccType)
    {
       FilterParamsService.filterParams.AccType = "";
    }
    if (!FilterParamsService.filterParams.BedCount)
    {
       FilterParamsService.filterParams.BedCount = 0;
    }
    if (!FilterParamsService.filterParams.Country)
    {
       FilterParamsService.filterParams.Country = "";
    }
    if (!FilterParamsService.filterParams.Place)
    {
       FilterParamsService.filterParams.Place = "";
    }
    if (!FilterParamsService.filterParams.Grade)
    {
       FilterParamsService.filterParams.Grade = 0;
    }
    if (!FilterParamsService.filterParams.PageNum)
    {
       FilterParamsService.filterParams.PageNum = 10;
    }
    if (!FilterParamsService.filterParams.Region)
    {
       FilterParamsService.filterParams.Region = "";
    }
    if (!FilterParamsService.filterParams.PriceMax)
    {
       FilterParamsService.filterParams.PriceMax = 0;
    }
    if (!FilterParamsService.filterParams.PriceMin)
    {
       FilterParamsService.filterParams.PriceMin = 0;
    }
    if (!FilterParamsService.filterParams.Approved)
    {
       FilterParamsService.filterParams.Approved = true;
    }
  
        
    let filterEl = this.filterService.generateQuery(FilterParamsService.filterParams,1);
    console.log(filterEl);
    this.filterService.getAll(filterEl).subscribe(x => 
    {
      this.accLenght = x.json()["odata.count"];
      this.accommodations = x.json().value;   
      this.numOfPages = Math.ceil(this.accLenght/FilterParamsService.filterParams.PageNum);

      if (this.numOfPages <= 5)
      {
        for (let i = 1; i <= this.numOfPages; i++)
        {
          this.pageNumbers.push(i);
        }
      }
      else
      {
        for (let i = 1; i <= 5; i++)
        {
          this.pageNumbers.push(i);
        }
      }
    });
    
  }

  getNextPage(currentPageNum: number){

    let filterEl = this.filterService.generateQuery(FilterParamsService.filterParams, currentPageNum);//1 = koji je trenutno broj stranice
        this.filterService.getAll(filterEl).subscribe(x => 
        {
          this.accommodations = x.json().value;  
          this.setActive(currentPageNum);                
        });

  }

  getNextRange(){

    let pageNumbersLenght = this.pageNumbers.length;
    let lastValue = this.pageNumbers[pageNumbersLenght-1];
    let restNumPages = 0

    if (this.numOfPages > lastValue)
    {
      restNumPages = this.numOfPages - lastValue;
    }

    if (restNumPages > 0)
    {
        this.pageNumbers.splice(0,pageNumbersLenght);

        if (restNumPages <= 5)
        {
          for (let i = lastValue + 1; i <= lastValue + restNumPages; i++)
          {
            this.pageNumbers.push(i);
          }
        }
        else
        {
          for (let i = lastValue + 1; i <= 5; i++)
          {
            this.pageNumbers.push(i);
          }
        }

        let filterEl = this.filterService.generateQuery(FilterParamsService.filterParams, lastValue + 1);
            this.filterService.getAll(filterEl).subscribe(x => 
            {
              this.accommodations = x.json().value; 
              this.setActive(this.pageNumbers[0]); 
            });
    }
  }

  getPreviousRange(){

    let pageNumbersLenght = this.pageNumbers.length;
    let lastValue = this.pageNumbers[pageNumbersLenght-1];
    let firstValue = this.pageNumbers[0];

    if (lastValue > 5)
    {
        this.pageNumbers.splice(0,pageNumbersLenght);

        for (let i = firstValue - 5; i <= 5; i++)
        {
          this.pageNumbers.push(i);
        }

        let filterEl = this.filterService.generateQuery(FilterParamsService.filterParams, firstValue - 1);
            this.filterService.getAll(filterEl).subscribe(x => 
            {
              this.accommodations = x.json().value; 
              this.setActive(this.pageNumbers[4]);
            });
    }
  }

  setActive(currentPageNum){

    var element = document.getElementById(currentPageNum.toString());
    var elements = document.getElementsByName("liStyle");

    for (let i = 0; i < this.pageNumbers.length; i++)
    {
      if (elements[i].id == currentPageNum.toString())
      {
        element.setAttribute("class","active");
      }
      else
      {
        elements[i].setAttribute("class","");
      }
    }
  }

}
