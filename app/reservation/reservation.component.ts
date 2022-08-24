import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { Animation, AnimationDefinition } from "ui/animation";
import { Color } from 'color';
import * as enums from "ui/enums";
//import { ReservationService } from '../services/reservation.service';
import { Reservation } from '~/shared/reservation';
import { CouchbaseService } from '../services/couchbase.service';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    reservationForm: FormGroup;
    resForm: View;
    resSubmitted: View;
    showSubmittedRes: boolean = false;
    docId: string = "reservations";

    //Couchbase persisted reservation list
    reservations: Reservation[];
    reservation: Reservation = {
        "guests" : 4,
        "smoking" : false,
        "dateTime" : ""
    };
    
    constructor(private formBuilder: FormBuilder,
        private modalService: ModalDialogService, 
        private page: Page,
        //private reservationService: ReservationService,
        private couchbaseService: CouchbaseService,
        private vcRef: ViewContainerRef) {

            this.reservationForm = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });

            //this.reservationService....
            this.reservations = [];
            //WRONG! THIS IS NOT A GOOD WAY -- THIS WORK SHOULD BE DONE IN A SERVICE!!
            //CORRECT WAY IS WITH RESERVATION SERVICE
            let doc = this.couchbaseService.getDocument(this.docId);
            if (doc == null) {
                this.couchbaseService.createDocument({ "reservations": [] }, this.docId);
            }
            else {
                this.reservations.push(doc.reservations);
            }  
            //WRONG! THIS IS NOT A GOOD WAY -- THIS WORK SHOULD BE DONE IN A SERVICE!!
            //CORRECT WAY IS WITH RESERVATION SERVICE
    }

    ngOnInit() {

    }

    onSubmit() {    
        
        //WRONG! THIS LOGIC SHOULD BE IN SERVICE NOT HERE
        this.addReservation(this.reservationForm.value);
        //WRONG! THIS LOGIC SHOULD BE IN SERVICE NOT HERE

        this.animateReservation();
        console.log(JSON.stringify(this.reservation));
    }

    addReservation(reservation: any): boolean {
         
        this.reservation = reservation;
        this.reservations.push(reservation);
        this.couchbaseService.updateDocument(this.docId, { "reservations": this.reservations });

        return true;
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservationForm.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservationForm.patchValue({ dateTime: result});
                }
            });

    }

    animateReservation() {
     
        console.log('animating reservation submission...');

        this.resForm = this.page.getViewById<View>('resForm');
        this.resSubmitted = this.page.getViewById<View>('resSubmitted');
		
		this.resForm.animate({
                duration: 500,
                opacity: 0,
                curve: enums.AnimationCurve.easeInOut,
                scale: { x: 0, y: 0}
            }).then(()=>{
                this.showSubmittedRes = true;
                this.resSubmitted.animate({
                    duration: 500,
                    opacity: 1,
                    curve: enums.AnimationCurve.easeInOut,
                    scale: { x: 1, y: 1}
                });
            });

    }
    
    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservationForm.patchValue({ smoking: true });
        }
        else {
            this.reservationForm.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservationForm.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservationForm.patchValue({ dateTime: textField.text});
    }

}