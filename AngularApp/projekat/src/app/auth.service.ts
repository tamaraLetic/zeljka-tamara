export class AuthService{
    loggedIn : boolean;

    constructor(){
        
    }

    logIn(): void{
        localStorage.setItem("token","myToken");//mytoken ce biti pravi token, onaj dugacki
    }

    logOut(): void{
        localStorage.removeItem("token");
    }

    isLoggedIn(): boolean{
        if(localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }
}