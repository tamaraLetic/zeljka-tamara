import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Filter} from './filter/filter.model'
import { Injectable } from '@angular/core';

@Injectable()
export class FilterParamsService{

    static filterParams: Filter = new Filter();

    constructor(){
        
    }

           
}