import { Filter } from "./filter.model";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PortService} from '../port.service';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';

@Injectable()
export class FilterService {

    constructor(private http: Http) {}

    generateQuery(filterParams: Filter):string 
    {
        let filter= "";

        if (filterParams.AccName != "")
        {                 
            filter += `filter=Name eq '${filterParams.AccName}'`;
        }

        if (filterParams.Country != "")
        {
          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `Place/Region/Country/Name eq '${filterParams.Country}'`;
        }

        if (filterParams.Region != "")
        {
          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `Place/Region/Name eq '${filterParams.Region}'`;
        }
    
        if (filterParams.Place != "")
        {
          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `Place/Name eq '${filterParams.Place}'`;
        }

        if (filterParams.AccType != "")
        {
          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `AccommodationType/Name eq '${filterParams.AccType}'`;
        }

        if (filterParams.BedCount != 0)
        {
          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `Rooms/any(r: r/BedCount ge ${filterParams.BedCount})`;
        }

        if (filterParams.Grade != 0)
        {
          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `AverageGrade ge ${filterParams.Grade}`;
        }

        if (filterParams.PriceMin != 0 || filterParams.PriceMax != 0)
        {
          let min = Number.MIN_VALUE;
          let max = Number.MAX_VALUE;
          if(filterParams.PriceMin)
          {
            min = filterParams.PriceMin;
          }

          if(filterParams.PriceMax)
          {
            max = filterParams.PriceMax;
          }

          if (filter !="")
          {
            filter += " and ";
          }
          else
          {
            filter += `filter=`;
          }
          filter += `Rooms/any(r: r/PricePerNight ge ${min} and r/PricePerNight le ${max})`;
        }

        if(filter != "")
        {
          // filter = '?$inlinecount=allpages' + filter; 
           filter =  filter; 
        }
        else
        {
           filter = '?$inlinecount=allpages';
        }

        filter += `&$top=${filterParams.PageNum}`;
       // filter += `&$skip=${filterParams.PageNum}`;

        return filter;
    }

    getAll(filter: string): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/accommodations/${filter}`);              
    }

}