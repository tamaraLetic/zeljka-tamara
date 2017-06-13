import {Injectable} from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {PortService} from '../port.service';


@Injectable()
export class AccommodationService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{
        return this.http.get(`http://localhost:${PortService.portNumber}/api/accommodations`); //prima url ka nasem serveru, vraca observable objekat
               
    }
    getById(id: number):Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/accommodations/${id}`).map(res=>res.json());
    }

    create(acc: Accommodation): Observable<Response>
    {
        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.post(`http://localhost:${PortService.portNumber}/api/accommodations`, JSON.stringify(acc), opts);
    }

    update(acc: Accommodation): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/accommodations/${acc.Id}`, acc, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/accommodations/${id}`, opts);
    }
}