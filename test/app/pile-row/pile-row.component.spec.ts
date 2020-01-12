import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PileRowComponent } from '../../../src/app/pile-row/pile-row.component';

describe('PileRowComponent', () => {
    let component: PileRowComponent;
    let fixture: ComponentFixture<PileRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PileRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PileRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
