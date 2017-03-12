import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TableQR } from './table-qr.model';
import { TableQRService } from './table-qr.service';

@Component({
    selector: 'jhi-table-qr-detail',
    templateUrl: './table-qr-detail.component.html'
})
export class TableQRDetailComponent implements OnInit, OnDestroy {

    tableQR: TableQR;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tableQRService: TableQRService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tableQR']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.tableQRService.find(id).subscribe(tableQR => {
            this.tableQR = tableQR;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
