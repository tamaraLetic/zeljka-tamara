import {Injectable} from '@angular/core';
import {Comment} from '../comment/comment.model';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import {PortService} from '../port.service';

@Injectable()
export class CommentListService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/comments`); //prima url ka nasem serveru, vraca observable objekat               
    }

    getById(id: number):Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/comments?$filter=id eq ${id} &$expand=Accommodation`).map(res=>res.json());
    }
    
    create(comment: Comment): Observable<Response>
    {

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        console.log(JSON.stringify(comment));
        return this.http.post(`http://localhost:${PortService.portNumber}/api/comments`, JSON.stringify(comment), opts);
    }

    update(comment: Comment): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/comments/${comment.Id}`, comment, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/comments/${id}`, opts);
    }
}