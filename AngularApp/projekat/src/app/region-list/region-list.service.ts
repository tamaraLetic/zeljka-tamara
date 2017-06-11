import {Injectable} from '@angular/core';
import {Region} from '../region/region.model';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import {PortService} from '../port.service';

@Injectable()
export class RegionService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/regions`); //prima url ka nasem serveru, vraca observable objekat               
    }

    getById(id: number):Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/regions?$filter=id eq ${id} &$expand=Country`).map(res=>res.json());
    }
    
    create(region: Region): Observable<Response>
    {

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        console.log(JSON.stringify(region));
        return this.http.post(`http://localhost:${PortService.portNumber}/api/regions`, JSON.stringify(region), opts);
    }

    update(region: Region): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/regions/${region.Id}`, region, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/regions/${id}`, opts);
    }
}