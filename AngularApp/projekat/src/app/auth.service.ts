import { Response } from '@angular/http'
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    loggedIn : boolean;

    constructor(){
        
    }

    logIn(response: Response) : void {

        let response_json = response.json();
        let access_token = response_json['access_token'];

        let role = response.headers.get('Role');
        console.log(role);
        let authdata = new AuthData(role, access_token);

        console.log(response);
        console.log('role: ' + role);


        localStorage.setItem("token", JSON.stringify(authdata));
    }

    logOut(): void {
        if(this.isLoggedIn() === true) {
            localStorage.removeItem("token");
        }
    }

    isLoggedIn(): boolean{
        if(localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }
    
}