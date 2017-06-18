import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [NotificationService]
})
export class NotificationComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];

  constructor(private notifService: NotificationService,private ngZone: NgZone) { 

    this.isConnected = false;
    this.notifications = [];
  }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
  }

  private checkConnection(){
    this.notifService.connectionEstablished.subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notifService.sendHello()
        }
    });
  }

  private subscribeForNotifications () {
    this.notifService.notificationReceivedAdmin.subscribe(e => this.onNotification(e));
    this.notifService.notificationReceivedManager.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) {

     this.ngZone.run(() => { 
       this.notifications.push(notif);  
    });  
  }

}
