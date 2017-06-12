import {Injectable} from '@angular/core';
import {AccommodationType} from '../accommodation-type/accommodation-type.model';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import {PortService} from '../port.service';

@Injectable()
export class AccommodationTypeListService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/accommodationtypes`); //prima url ka nasem serveru, vraca observable objekat               
    }

    getById(id: number):Observable<any>{
        let ret=this.http.get(`http://localhost:${PortService.portNumber}/api/accommodationtypes/${id}`);
       // return this.http.get(`http://localhost:${PortService.portNumber}/api/accommodationtypes/${id}`);
       return ret;
    }
    
    create(accommodationType: AccommodationType): Observable<Response>
    {

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        console.log(JSON.stringify(accommodationType));
        return this.http.post(`http://localhost:${PortService.portNumber}/api/accommodationTypes`, JSON.stringify(accommodationType), opts);
    }

    update(accommodationType: AccommodationType): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/accommodationTypes/${accommodationType.Id}`, accommodationType, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/accommodationTypes/${id}`, opts);
    }
}