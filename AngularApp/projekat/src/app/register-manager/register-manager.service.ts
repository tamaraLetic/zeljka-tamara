import {Injectable} from '@angular/core';
import {User} from '../user/user.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {PortService} from '../port.service'

@Injectable()
export class RegisterManagerService{

    constructor(private http: Http){    }


    create(user: User): Observable<Response>
    {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.post(`http://localhost:${PortService.portNumber}/api/Account/Register/Manager`, JSON.stringify(user), opts);
    }
    
}