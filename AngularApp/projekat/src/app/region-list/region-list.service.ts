import {Injectable} from '@angular/core';
import {Region} from '../region/region.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {PortService} from '../port.service';

@Injectable()
export class RegionService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/regions`); //prima url ka nasem serveru, vraca observable objekat               
    }

    getById(id: number){

        return this.http.get(`http://localhost:${PortService.portNumber}/api/regions/${id}`);
    }
    
    create(region: Region): Observable<Response>
    {

        let header = new Headers();
        header.append('Content-type', 'application/json');
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.post(`http://localhost:${PortService.portNumber}/api/regions`, JSON.stringify(region), opts);
    }

    update(){}

    delete(id: number): Observable<Response>{

        let header = new Headers();
        header.append('Content-type', 'application/json');
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/regions${id}`, opts);
    }
}