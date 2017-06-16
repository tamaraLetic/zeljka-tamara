import {Injectable} from '@angular/core';
import {Place} from '../place/place.model';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import {PortService} from '../port.service';

@Injectable()
export class PlaceListService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/places`); //prima url ka nasem serveru, vraca observable objekat               
    }

    getById(id: number):Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/places?$filter=Id eq ${id} &$expand=Region`).map(res=>res.json());
    }
    
    create(place: Place): Observable<Response>
    {

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        console.log(JSON.stringify(place));
        return this.http.post(`http://localhost:${PortService.portNumber}/api/places`, JSON.stringify(place), opts);
    }

    update(place: Place): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/places/${place.Id}`, place, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/places/${id}`, opts);
    }
}