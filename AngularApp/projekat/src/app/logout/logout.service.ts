import {Injectable} from '@angular/core';
import { AuthData } from '../auth-data.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LogoutService{
    constructor(private http: Http){
         
    }

    logout(): Observable<Response>
    {
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));

        let opts = new RequestOptions();
        opts.headers = header;
        console.log(localStorage.getItem("token"));
        let ret = this.http.post(`http://localhost:54042/api/Account/Logout`, "", opts);
        localStorage.removeItem("token");

        return ret;
    }
}