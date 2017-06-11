import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PortService{

    public static portNumber: number = 54042;

    constructor(private http: Http){

    }
}