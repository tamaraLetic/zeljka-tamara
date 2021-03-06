import { Filter } from "./filter.model";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PortService} from '../port.service';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';

@Injectable()
export class FilterService {

    constructor(private http: Http) {}

    generateQuery(filterParams: Filter, pageNum?: number):string  //pageNum ==> number of current page
    {
        let filter= "";

        if (filterParams.AccName != "")
        {                 
            filter += `filter=Name eq '${filterParams.AccName}'`;
        }
             
        filter += `filter=Approved eq true`;       

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
          filter += `AvargeGrade ge ${filterParams.Grade}`;
        }

        if (filterParams.PriceMin || filterParams.PriceMax)
        {
          if (filterParams.PriceMin != 0 || filterParams.PriceMax != 0)
          {
            console.log(filterParams.PriceMin);
            console.log(filterParams.PriceMax);
            let min = 0;
            let max = 1000000;
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
        }

        if(filter != "")
        {
           filter = '?$inlinecount=allpages&$' + filter; 
        }
        else
        {
           filter = '?$inlinecount=allpages';
        }

        filter += `&$top=${filterParams.PageNum}`;

        if ((filterParams.PageNum*pageNum-filterParams.PageNum) != 0)//first page
        {
          filter += `&$skip=${filterParams.PageNum*pageNum-filterParams.PageNum}`;
        }

        return filter;
    }

    getAll(filter: string): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/odata/Search${filter}`);              
    }

}