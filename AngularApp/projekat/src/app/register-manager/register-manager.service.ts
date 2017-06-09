import {Injectable} from '@angular/core';
import {User} from '../user/user.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegisterManagerService{

    constructor(private http: Http){    }


    create(user: User): Observable<Response>
    {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.post(`http://localhost:54042/api/Account/Register`, JSON.stringify(user), opts);
    }
    
}