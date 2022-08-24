import { Injectable } from '@angular/core';
import { CouchbaseService } from '../services/couchbase.service';
import { Reservation } from "../shared/reservation";

@Injectable()
export class ReservationService {

    reservation: Reservation;
    docId: string = "reservations";

    constructor(private couchbaseService: CouchbaseService) {

        this.reservation = null;

        let doc = this.couchbaseService.getDocument(this.docId);
        if (doc == null) {
            this.couchbaseService.createDocument({ "reservations": [] }, this.docId);
        }
        else {
            this.reservation = doc.reservation;
        }     
    }

    addReservation(reservation: Reservation): boolean {
        
        this.couchbaseService.updateDocument(this.docId, { "reservations": this.reservation });

        return true;
    }

}