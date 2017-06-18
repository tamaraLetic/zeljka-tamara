// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import {PortService} from './port.service';

// declare the global variables  
declare var $: any;  

@Injectable()  
export class NotificationService {  
    // Declare the variables  
    private proxy: any;  
    private proxyName: string = 'notifications';  
    private connection: any;  

    // create the Event Emitter  
    public notificationReceivedAdmin: EventEmitter < string >;  
    public notificationReceivedManager: EventEmitter < string >;
    public connectionEstablished: EventEmitter < Boolean >;  
    public connectionExists: Boolean;  
   
    constructor() {  
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.notificationReceivedAdmin = new EventEmitter < string > (); 
        this.notificationReceivedManager = new EventEmitter < string > (); 
        this.connectionExists = false;  
        // create hub connection  
        this.connection = $.hubConnection(`http://localhost:${PortService.portNumber}/`);  
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        // register on server events  
        this.registerOnServerEvents();
        this.registerOnManagerServerEvents();
        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection(); 
        
    }  
    // method to hit from client  
    public sendAcc(id: number) {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('NotifyAdmin',id);  
    }  
    // check in the browser console for either signalr connected or not  
    private startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  
            this.connectionEstablished.emit(true);  
            this.connectionExists = true; 
            let token = localStorage.getItem("token");
            this.proxy.invoke('Register',JSON.parse(token).id, JSON.parse(token).role); 
        }).fail((error: any) => {  
            console.log('Could not connect ' + error);  
            this.connectionEstablished.emit(false);  
        });  
    }  

    private registerOnServerEvents(): void {  
        
        this.proxy.on('checkAccNotification', (data: string) => {  
            alert("Received notification: Added new accommodation, you need to approve it!");
            console.log('received notification: ' + data);  
            this.notificationReceivedAdmin.emit(data);  
        }); 
    }  

    private registerOnManagerServerEvents(): void {  
        
        this.proxy.on('managerNotification', (data: string) => {  
            alert("Received notification: Your accommodation has been approved!");
            console.log('received notification: ' + data);  
            this.notificationReceivedManager.emit(data);  
        }); 
    } 

    public sendHello() {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');  
    } 

}  