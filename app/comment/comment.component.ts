import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ListPicker } from 'ui/list-picker';
import { Page } from 'ui/page';
import { Comment } from '../shared/comment';
import { EventData } from "tns-core-modules/data/observable";
import { Slider } from "tns-core-modules/ui/slider";
import { TextField } from "tns-core-modules/ui/text-field";
import { Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    comment: Comment = {
        rating: 5,
        comment: '',
        author: '',
        date: ''
    };

    cForm: FormGroup;

    constructor(
        private params: ModalDialogParams,
        private page: Page,
        private formBuilder: FormBuilder
    ) {
        this.cForm = this.formBuilder.group({
            author: ['', Validators.required],
            rating: 5,
            comment: ['', Validators.required]
        });

    }

    ngOnInit() {}

    public onSubmit() {

        if(this.cForm.valid) {
            this.comment.author = this.cForm.value.author;
            this.comment.rating = this.cForm.value.rating;
            this.comment.comment = this.cForm.value.comment;
            this.comment.date = new Date().toISOString();
            
            this.params.closeCallback(this.comment);
        }
    }

}