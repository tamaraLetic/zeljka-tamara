import {Injectable} from '@angular/core';
import {Country} from '../country/country.model';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CountryListService{
    //private countries: Country []


    constructor(private http: Http){
         //this.countries=[
            // new Country(1, "Serbia","srb"), new Country(2, "USA", "usa")
            
        //];
    }

    getAll(): Observable<any>{
        //return this.countries;
        return this.http.get("http://localhost:54042/api/countries"); //prima url ka nasem serveru, vraca observable objekat
        
        
    }
    getById(id: number){
        //return this.countries.find(c=>c.Id == id);
        return this.http.get(`http://localhost:54042/api/countries/${id}`);
    }
    create(country: Country): Observable<any>
    {
        //this.countries.push(country);

        let heade=new Headers();
        heade.append('Content-type', 'application/json');
        let opts=new RequestOptions();
        opts.headers=heade;
        return this.http.post(`http://localhost:54042/api/countries`, JSON.stringify(country), opts);
    }
    update(){}
}