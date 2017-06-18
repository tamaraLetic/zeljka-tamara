import {Injectable} from '@angular/core';
import {Room} from '../room/room.model';
import {Http, Response, Headers, RequestOptions,Request } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import {PortService} from '../port.service';

@Injectable()
export class RoomListService{

    constructor(private http: Http){
    }

    getAll(): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/rooms`); //prima url ka nasem serveru, vraca observable objekat               
    }

     getAllAcc(id: number): Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/rooms?$filter=AccommodationId eq ${id}`); //prima url ka nasem serveru, vraca observable objekat               
    }

    getById(id: number):Observable<any>{

        return this.http.get(`http://localhost:${PortService.portNumber}/api/rooms/${id}`).map(res=>res.json());
    }
    
    create(room: Room): Observable<Response>
    {

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.post(`http://localhost:${PortService.portNumber}/api/rooms`, JSON.stringify(room), opts);
    }

    update(room: Room): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.put(`http://localhost:${PortService.portNumber}/api/rooms/${room.Id}`, room, opts);
      }

    delete(id: number): Observable<Response>{

        let header = new Headers();
        let token = localStorage.getItem("token");
       
        header.append('Authorization', 'Bearer ' + JSON.parse(token).token);
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.delete(`http://localhost:${PortService.portNumber}/api/rooms/${id}`, opts);
    }
}