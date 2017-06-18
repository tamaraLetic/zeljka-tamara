import {Injectable} from '@angular/core';
import {User} from '../user/user.model';
import {PortService} from '../port.service'
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BanManagerService{

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

        let token = localStorage.getItem("token");
        let heade=new Headers();
        heade.append('Content-type', 'application/json');
        heade.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts=new RequestOptions();
        opts.headers=heade;
        return this.http.post(`http://localhost:${PortService.portNumber}/api/countries`, JSON.stringify(country), opts);
    }
    
}