import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { Cards } from '../models/card.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

    private subscriptions: Subscription;
    private deck = Cards;

    constructor(
        private deckService: DeckService,
    ) { }

    ngOnInit() {

    }

}
