import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'

@Injectable()//This must be here, if we want to inject authService!
export class LoggedInGuard implements CanActivate{
    
    constructor(private authService: AuthService){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isLoggedIn();
    }
}