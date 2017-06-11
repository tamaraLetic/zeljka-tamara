import {Injectable} from '@angular/core';
import {User} from '../user/user.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService{
    constructor(private http: Http){
         
    }

    create(user: User): Observable<Response>
    {
        let heade=new Headers();
        heade.append('Content-type', 'application/x-www-form-urlencoded');
        let opts=new RequestOptions();
        opts.headers=heade;
        console.log(user.password);
        let data = `Username=${user.email}&Password=${user.password}&Grant_type=password`;
        return this.http.post(`http://localhost:54042/oauth/token`, data, opts);
    }
}