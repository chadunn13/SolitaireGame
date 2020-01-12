import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-foundation-row',
    templateUrl: './foundation-row.component.html',
    styleUrls: ['./foundation-row.component.css']
})
export class FoundationRowComponent implements OnInit {

    public foundations = [];

    constructor() { }

    ngOnInit() {
        this.foundations.push("1");
        this.foundations.push("2");
        this.foundations.push("3");
        this.foundations.push("4");
    }

}
