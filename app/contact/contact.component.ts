import { Component, OnInit, Inject } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as TNSPhone from 'nativescript-phone';

@Component({
    selector: 'app-contact',
    moduleId: module.id,
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
  })
  export class ContactComponent implements OnInit {
  
    constructor(@Inject('baseURL') private baseURL,
      private routerExtensions: RouterExtensions,
      private fonticon: TNSFontIconService) { }
  
    ngOnInit() {}
      
    goBack(): void {
      this.routerExtensions.back();
    }

    sendEmail() {

      Email.available()
        .then((avail: boolean) => {
          if (avail) {
            Email.compose({
              to: ['confusion@food.net'],
              subject: '[ConFusion]: Query',
              body: 'Dear Sir/Madam...You need to check your functions...:'
            });
          }
          else
            console.log('No Email Configured');
        })
  
    }

    /// Dial a resturant number -- only works for resturants unfortunately =)
    public callRestaurant() {
      const phoneNumber = '415-123-4567';
      TNSPhone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
        .then(() => TNSPhone.dial(phoneNumber, false))
        .catch(() => TNSPhone.dial(phoneNumber, true));
    }

    // Text a number (or multiple numbers)
    public messageParents() {
      TNSPhone.sms(['212-555-1234', '212-555-0987'], "Text till your fingers bleed")
          .then((args) => {
              console.log(JSON.stringify(args));
          }, (err) => {
              console.log('Error: ' + err);
          })
    }    

  }
  