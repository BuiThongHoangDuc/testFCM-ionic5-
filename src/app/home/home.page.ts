import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private fcm: FCM, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initFCM();
    })
    .catch(e => console.log('ErrorInitFCM', e));
  }

  initFCM() {
    this.fcm.getToken().then(token => {
      // backend.registerToken(token);
      console.log('token:',token);
    });

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      };
    });

    // this.fcm.onTokenRefresh().subscribe(token => {
    //   console.log('token:',token);
    // });

    this.fcm.hasPermission().then(hasPermission => {
      if (hasPermission) {
        console.log('Has permission!');
      }
    });
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('HoangDuc');
  }

  unSubscribeToTopic() {
    this.fcm.unsubscribeFromTopic('HoangDuc');
  }


}
