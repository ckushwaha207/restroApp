import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DiningTable } from './dining-table.model';
import { DiningTableService } from './dining-table.service';

@Component({
    selector: 'jhi-dining-table-detail',
    templateUrl: './dining-table-detail.component.html'
})
export class DiningTableDetailComponent implements OnInit, OnDestroy {

    diningTable: DiningTable;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private diningTableService: DiningTableService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['diningTable']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.diningTableService.find(id).subscribe(diningTable => {
            this.diningTable = diningTable;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
