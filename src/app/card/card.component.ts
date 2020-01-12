import { Component, OnInit, Input } from '@angular/core';
import { Suit } from '../constants/suit';
import { Value } from '../constants/value';
import { Card } from '../models/card.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    public backImagePath = "/assets/img/b.gif"
    @Input() private card: Card;
    @Input() private hidden = false;
    public frontImagePath = "/assets/img/2c.gif";

    constructor(
    ) {
    }

    ngOnInit() {
        if (this.card) {
            this.frontImagePath = "/assets/img/" + this.card.value + this.card.suit + ".gif";
        }
    }

    public isHidden(): boolean {
        return this.hidden;
    }

    public show(shouldShow: boolean): void {
        this.hidden = !shouldShow;
    }

    public getCard(): Card {
        return this.card;
    }

    public toggleShow($event): void {
        this.show(this.hidden);
    }

    public isRedSuit(): boolean {
        return this.card.suit === "d" || this.card.suit === "h";
    }

    public getDisplayValue() {
        return Value[this.card.value];
    }

    public getDisplaySuit() {
        return Suit[this.card.suit];
    }
}
