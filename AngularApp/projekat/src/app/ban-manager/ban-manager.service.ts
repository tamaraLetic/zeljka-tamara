import {Injectable} from '@angular/core';
import {AppUser} from '../appuser/appuser.model';
import {PortService} from '../port.service'
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BanManagerService{

    constructor(private http: Http){
    }

    getManager(): Observable<any>{

        let token = localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.get(`http://localhost:${PortService.portNumber}/api/getmanager`, opts); //prima url ka nasem serveru, vraca observable objekat            
    }

    getManagerById(id: number): Observable<any>{

        let token = localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.get(`http://localhost:${PortService.portNumber}/api/getmanager/${id}`, opts); //prima url ka nasem serveru, vraca observable objekat            
    }

    getUser(id: number){

        let token = localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.get(`http://localhost:${PortService.portNumber}/api/getuser`, opts);
    }

    ban(user: AppUser): Observable<Response>
    {

        let token = localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/banmanager`, JSON.stringify(user), opts);
    }

}