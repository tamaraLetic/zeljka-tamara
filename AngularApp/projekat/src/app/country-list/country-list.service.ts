import {Injectable} from '@angular/core';
import {Country} from '../country/country.model';
import {PortService} from '../port.service'
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CountryListService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/countries`); //prima url ka nasem serveru, vraca observable objekat            
    }

    getById(id: number){

        return this.http.get(`http://localhost:${PortService.portNumber}/api/countries/${id}`);
    }

    create(country: Country): Observable<Response>
    {

        let heade=new Headers();
        heade.append('Content-type', 'application/json');
        let opts=new RequestOptions();
        opts.headers=heade;
        return this.http.post(`http://localhost:${PortService.portNumber}/api/countries`, JSON.stringify(country), opts);
    }
    
    update(country: Country): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/countries/${country.Id}`, country, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/countries/${id}`, opts);
    }
}