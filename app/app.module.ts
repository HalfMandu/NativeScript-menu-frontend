import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http'
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './aboutus/about.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationModalComponent } from "./reservationmodal/reservationmodal.component";
import { CommentComponent } from "./comment/comment.component";
import { UserAuthComponent } from "./userauth/userauth.component"; 

import { DishService } from "./services/dish.service";
import { ProcessHTTPMsgService  } from "./services/process-httpmsg.service";
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { FavoriteService } from './services/favorite.service';
import { CouchbaseService } from './services/couchbase.service';
import { ReservationService } from './services/reservation.service';
import { PlatformService } from './services/platform.service';

import { baseURL } from "./shared/baseurl";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        HttpClientModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.min.css'
        }),
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        DishdetailComponent,
        HomeComponent,
        ContactComponent,
        AboutComponent,
        FavoritesComponent,
        ReservationComponent,
        ReservationModalComponent,
        CommentComponent,
        UserAuthComponent
    ],
    entryComponents: [ReservationModalComponent, CommentComponent],
    providers: [
        DishService,
        ProcessHTTPMsgService,
        CouchbaseService,
        ReservationService,
        PlatformService,
        { provide: 'baseURL', useValue: baseURL },
        PromotionService,
        LeaderService,
        FavoriteService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
