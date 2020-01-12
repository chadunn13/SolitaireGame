import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckRowComponent } from '../../../src/app/deck-row/deck-row.component';

describe('DeckRowComponent', () => {
    let component: DeckRowComponent;
    let fixture: ComponentFixture<DeckRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeckRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeckRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
